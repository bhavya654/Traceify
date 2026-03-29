import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { GraphCanvas, lightTheme } from 'reagraph';

const GraphView = memo(({ data, highlightAccount }) => {
    const containerRef = useRef();
    const graphRef = useRef();
    const [activeNodeId, setActiveNodeId] = useState(null);

    // Keep active node in sync with highlighted account from parent.
    useEffect(() => {
        setActiveNodeId(highlightAccount || null);
    }, [highlightAccount]);

    const graphParams = useMemo(() => {
        if (!data || !Array.isArray(data.nodes) || data.nodes.length === 0) {
            return null;
        }

        const rawEdges = Array.isArray(data.edges) ? data.edges : (Array.isArray(data.links) ? data.links : []);
        const nodes = data.nodes.map((node) => {
            const nodeId = String(node.id || node.elementId || '');
            const failCount = Number(node.fail_count || 0);
            const isHighlighted = highlightAccount ? nodeId === highlightAccount : false;

            return {
                id: nodeId,
                label: nodeId.substring(0, 12),
                subLabel: `Fails: ${failCount}`,
                fill: isHighlighted ? '#FF6B00' : (failCount > 5 ? '#BA1A1A' : (failCount > 2 ? '#FF8800' : '#6B7280')),
                size: isHighlighted ? 10 : (failCount > 2 ? 8 : 6),
                data: {
                    ...node,
                    fail_count: failCount,
                },
            };
        });

        const nodeIds = new Set(nodes.map((node) => node.id));
        const edges = rawEdges
            .filter((edge) => edge && nodeIds.has(String(edge.source)) && nodeIds.has(String(edge.target)))
            .map((edge, index) => {
                const isFraud = Boolean(edge.is_fraud);
                const isSubThreshold = Boolean(edge.sub_threshold);
                const edgeId = String(edge.id || edge.txn_id || `${edge.source}-${edge.target}-${index}`);
                const amount = Number(edge.amount || 0);

                return {
                    id: edgeId,
                    source: String(edge.source),
                    target: String(edge.target),
                    label: amount > 0 ? `$${amount.toLocaleString()}` : '$0',
                    subLabel: isFraud ? 'FRAUD' : (isSubThreshold ? 'SUB-THRESHOLD' : undefined),
                    fill: isFraud ? '#EF4444' : (isSubThreshold ? '#F59E0B' : '#9CA3AF'),
                    size: isFraud ? 2 : (isSubThreshold ? 1.5 : 1),
                    arrowPlacement: 'end',
                    data: edge,
                };
            });

        return {
            nodes,
            edges,
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

    const fraudCount = graphParams.edges.filter((edge) => Boolean(edge.data?.is_fraud)).length;
    const totalEdges = graphParams.edges.length;
    const activeIds = activeNodeId ? [activeNodeId] : [];

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
                        <span className="text-on-surface-variant">{totalEdges} edges</span>
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

            <GraphCanvas
                ref={graphRef}
                actives={activeIds}
                animated
                cameraMode="pan"
                draggable={false}
                edgeArrowPosition="end"
                edgeLabelPosition="below"
                edges={graphParams.edges}
                labelType="all"
                layoutType="forceDirected2d"
                maxDistance={12000}
                minDistance={500}
                nodes={graphParams.nodes}
                onCanvasClick={() => setActiveNodeId(null)}
                onNodeClick={(node) => {
                    setActiveNodeId(node.id);
                    if (graphRef.current) {
                        graphRef.current.fitNodesInView([node.id], { animated: true });
                    }
                }}
                theme={lightTheme}
            />
        </div>
    );
});

export default GraphView;
