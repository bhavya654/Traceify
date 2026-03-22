import React, { useRef, useEffect, useState, useMemo, memo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const GraphView = memo(({ data, highlightAccount }) => {
    const containerRef = useRef();
    const graphRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 600, height: 380 });
    const [isInitialized, setIsInitialized] = useState(false);

    // Update dimensions on mount and resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                setDimensions({
                    width: clientWidth || 600,
                    height: clientHeight || 380
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        
        const timeout = setTimeout(updateDimensions, 100);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearTimeout(timeout);
        };
    }, []);

    // Memoize graph data to prevent unnecessary re-renders
    const graphParams = useMemo(() => {
        if (!data || !data.nodes || data.nodes.length === 0) {
            return null;
        }
        
        return {
            nodes: data.nodes.map(n => ({ 
                ...n, 
                id: n.id || n.elementId,
                failCount: n.fail_count || 0,
                lastSeen: n.last_seen,
                isHighlighted: highlightAccount && n.id === highlightAccount
            })),
            links: data.links.map(l => ({ 
                ...l, 
                source: l.source, 
                target: l.target,
                amount: l.amount || 0,
                subThreshold: l.sub_threshold || false,
                isFraud: l.is_fraud || false
            }))
        };
    }, [data, highlightAccount]);

    // If no nodes/links, show loading or empty state
    if (!graphParams) {
        return (
            <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl mb-2 animate-pulse">hub</span>
                <p className="text-sm">Loading transaction network...</p>
                <p className="text-xs mt-1">Fetching data from Neo4j</p>
            </div>
        );
    }

    // Count fraud links for stats
    const fraudCount = graphParams.links.filter(l => l.isFraud).length;
    const totalLinks = graphParams.links.length;

    // Node color - highlight selected, show fail count
    const getNodeColor = (node) => {
        if (node.isHighlighted) return '#FF6B00'; // Orange for selected
        if (node.failCount > 5) return '#BA1A1A'; // Error red for high fail
        if (node.failCount > 2) return '#FF8800'; // Warning orange
        return '#6B7280'; // Gray for normal nodes
    };

    // Link color - RED for fraud, light gray for normal
    const getLinkColor = (link) => {
        if (link.isFraud) return '#EF4444'; // Bright red for fraud
        if (link.subThreshold) return '#F59E0B'; // Amber for sub-threshold
        return 'rgba(156, 163, 175, 0.3)'; // Light gray for normal
    };

    // Link width - thicker for fraud
    const getLinkWidth = (link) => {
        if (link.isFraud) return 3;
        if (link.subThreshold) return 2;
        return 0.5;
    };

    return (
        <div ref={containerRef} className="w-full h-full relative">
            {/* Stats overlay */}
            <div className="absolute top-2 left-2 z-10 bg-surface-container/90 backdrop-blur px-3 py-2 rounded-lg text-xs">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span className="text-on-surface-variant">{graphParams.nodes.length} nodes</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <span className="text-on-surface-variant">{totalLinks} edges</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-error font-bold">{fraudCount} fraud</span>
                    </div>
                </div>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-2 left-2 z-10 bg-surface-container/90 backdrop-blur px-3 py-2 rounded-lg text-[10px]">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-0.5 bg-red-500"></div>
                        <span>Fraud</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-0.5 bg-amber-500"></div>
                        <span>Sub-threshold</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-0.5 bg-gray-300"></div>
                        <span>Normal</span>
                    </div>
                </div>
            </div>

            <ForceGraph2D
                ref={graphRef}
                graphData={graphParams}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="transparent"
                linkDirectionalArrowLength={4}
                linkDirectionalArrowRelPos={1}
                linkWidth={getLinkWidth}
                linkColor={getLinkColor}
                linkLabel={link => `$${(link.amount || 0).toLocaleString()}${link.isFraud ? ' - FRAUD' : ''}${link.subThreshold ? ' (Sub-threshold)' : ''}`}
                nodeRelSize={6}
                enableNodeDrag={false}
                cooldownTicks={isInitialized ? 0 : 100}
                warmupTicks={isInitialized ? 0 : 50}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const radius = node.isHighlighted ? 10 : (node.failCount > 2 ? 7 : 5);
                    
                    // Draw node circle
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = getNodeColor(node);
                    ctx.fill();
                    
                    // Draw border for highlighted/high-risk nodes
                    if (node.isHighlighted || node.failCount > 2) {
                        ctx.strokeStyle = node.isHighlighted ? '#FF6B00' : '#fff';
                        ctx.lineWidth = node.isHighlighted ? 3 : 2;
                        ctx.stroke();
                    }

                    // Only show label for highlighted node or on zoom
                    if (node.isHighlighted || globalScale > 1.5) {
                        const label = (node.id || '').substring(0, 10);
                        const fontSize = Math.max(8, 10 / globalScale);
                        ctx.font = `bold ${fontSize}px Manrope, sans-serif`;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'top';
                        
                        const textWidth = ctx.measureText(label).width;
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                        ctx.fillRect(node.x - textWidth/2 - 2, node.y + radius + 2, textWidth + 4, fontSize + 2);
                        
                        ctx.fillStyle = '#191C1E';
                        ctx.fillText(label, node.x, node.y + radius + 3);
                    }

                    node.__bckgDimensions = [radius * 2, radius * 2];
                }}
                nodePointerAreaPaint={(node, color, ctx) => {
                    const radius = node.isHighlighted ? 14 : 10;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();
                }}
                onNodeClick={(node) => {
                    if (graphRef.current) {
                        graphRef.current.centerAt(node.x, node.y, 500);
                        graphRef.current.zoom(2.5, 500);
                    }
                }}
                d3AlphaDecay={0.05}
                d3VelocityDecay={0.4}
                onEngineStop={() => {
                    if (graphRef.current && !isInitialized) {
                        graphRef.current.centerAt(0, 0, 500);
                        graphRef.current.zoom(2, 600);
                        setIsInitialized(true);
                    }
                }}
            />
        </div>
    );
});

export default GraphView;
