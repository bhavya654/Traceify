import { useState, useEffect, useRef } from 'react';
import { fetchGraph } from '../services/api';

export const useGraph = () => {
    const [graphData, setGraphData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(50);
    const [timeWindow, setTimeWindow] = useState({ label: '24h', value: 24 * 60 * 60 });
    const [failedOnly, setFailedOnly] = useState(false);
    const [fraudOnly, setFraudOnly] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch full network graph
                const graphRes = await fetchGraph(limit, timeWindow.value, failedOnly, fraudOnly);

                if (graphRes.data && graphRes.data.data) {
                    setGraphData(graphRes.data.data);
                } else {
                    setGraphData({ nodes: [], edges: [] });
                }
            } catch (err) {
                console.error("Failed to load graph data", err);
                setError("Failed to fetch data from server.");
                setGraphData({ nodes: [], edges: [] });
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
    }, [timeWindow, failedOnly, fraudOnly, limit]);
    console.log("Graph data updated", graphData);
    return { graphData, loading, error, timeWindow, setTimeWindow, failedOnly, setFailedOnly, fraudOnly, setFraudOnly, limit, setLimit };
};
