import { useState, useEffect, useRef } from 'react';
import { fetchFullNetworkGraph } from '../services/api';

export const useGraph = () => {
    const [graphData, setGraphData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch full network graph
                const graphRes = await fetchFullNetworkGraph();
                
                if (graphRes.data && graphRes.data.data) {
                    setGraphData(graphRes.data.data);
                } else {
                    setGraphData({ nodes: [], links: [] });
                }
            } catch (err) {
                console.error("Failed to load graph data", err);
                setError("Failed to fetch data from server.");
                setGraphData({ nodes: [], links: [] });
            } finally {
                setLoading(false);
            }
        };

        // Initial load
        loadData();

        // Set up polling every 30 seconds for graph updates
        intervalRef.current = setInterval(loadData, 30000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return { graphData, loading, error };
};
