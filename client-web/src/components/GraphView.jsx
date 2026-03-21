import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const GraphView = ({ data }) => {
    // If no nodes/links, just return message
    if (!data || !data.nodes || data.nodes.length === 0) {
        return <p>No transaction graph available.</p>;
    }

    // A simple hack to format links correctly for ForceGraph2D
    const graphParams = {
        nodes: data.nodes.map(n => ({ ...n, id: n.id || n.elementId })),
        links: data.links.map(l => ({ ...l, source: l.source, target: l.target }))
    };

    return (
        <ForceGraph2D
            graphData={graphParams}
            nodeAutoColorBy="label"
            linkDirectionalArrowLength={6}
            linkDirectionalArrowRelPos={1}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              const fontSize = 12/globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = node.color || '#000';
              ctx.fillText(label, node.x, node.y);

              node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
            }}
            nodePointerAreaPaint={(node, color, ctx) => {
              ctx.fillStyle = color;
              const bckgDimensions = node.__bckgDimensions;
              bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            }}
        />
    );
};

export default GraphView;
