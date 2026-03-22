import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const GraphView = ({ data }) => {
    const containerRef = useRef();
    const graphRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 600, height: 380 });

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
        
        // Also update after a short delay to catch late renders
        const timeout = setTimeout(updateDimensions, 100);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearTimeout(timeout);
        };
    }, []);

    // If no nodes/links, just return message
    if (!data || !data.nodes || data.nodes.length === 0) {
        return (
            <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl mb-2">hub</span>
                <p className="text-sm">No transaction graph available.</p>
                <p className="text-xs mt-1">Select an account with transactions to view the network.</p>
            </div>
        );
    }

    // Format data for ForceGraph2D
    const graphParams = {
        nodes: data.nodes.map(n => ({ 
            ...n, 
            id: n.id || n.elementId,
            failCount: n.fail_count || 0,
            lastSeen: n.last_seen
        })),
        links: data.links.map(l => ({ 
            ...l, 
            source: l.source, 
            target: l.target,
            amount: l.amount || 0,
            subThreshold: l.sub_threshold || false
        }))
    };

    // Node color based on fail count
    const getNodeColor = (node) => {
        if (node.failCount > 5) return '#BA1A1A'; // Error red
        if (node.failCount > 2) return '#FF8800'; // Warning orange
        return '#3525CD'; // Primary purple
    };

    // Link color based on amount and flags
    const getLinkColor = (link) => {
        if (link.subThreshold) return '#BA1A1A'; // Suspicious sub-threshold
        if (link.amount > 50000) return '#FF8800'; // High value
        return '#B6B4FF'; // Normal
    };

    return (
        <div ref={containerRef} className="w-full h-full">
            <ForceGraph2D
                ref={graphRef}
                graphData={graphParams}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="transparent"
                linkDirectionalArrowLength={6}
                linkDirectionalArrowRelPos={1}
                linkWidth={link => link.subThreshold ? 3 : (link.amount > 50000 ? 2 : 1)}
                linkColor={getLinkColor}
                linkLabel={link => `$${(link.amount || 0).toLocaleString()}${link.subThreshold ? ' (Sub-threshold)' : ''}`}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    // Draw node circle
                    const radius = node.failCount > 2 ? 8 : 6;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = getNodeColor(node);
                    ctx.fill();
                    
                    // Draw border for high-risk nodes
                    if (node.failCount > 2) {
                        ctx.strokeStyle = '#fff';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }

                    // Draw label
                    const label = (node.id || '').substring(0, 8);
                    const fontSize = Math.max(10, 12 / globalScale);
                    ctx.font = `bold ${fontSize}px Manrope, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    
                    // Label background
                    const textWidth = ctx.measureText(label).width;
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.fillRect(node.x - textWidth/2 - 2, node.y + radius + 2, textWidth + 4, fontSize + 2);
                    
                    // Label text
                    ctx.fillStyle = '#191C1E';
                    ctx.fillText(label, node.x, node.y + radius + 3);

                    node.__bckgDimensions = [textWidth + 4, fontSize + radius + 4];
                }}
                nodePointerAreaPaint={(node, color, ctx) => {
                    const radius = node.failCount > 2 ? 12 : 10;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();
                }}
                onNodeClick={(node) => {
                    // Center on clicked node
                    if (graphRef.current) {
                        graphRef.current.centerAt(node.x, node.y, 500);
                        graphRef.current.zoom(2, 500);
                    }
                }}
                cooldownTicks={100}
                onEngineStop={() => {
                    if (graphRef.current) {
                        graphRef.current.zoomToFit(400, 50);
                    }
                }}
            />
        </div>
    );
};

export default GraphView;
