import { useState, useEffect, useRef } from 'react';
import { fetchGraphData, fetchFraudDetection } from '../services/api';

export const useGraph = (accountId) => {
    const [graphData, setGraphData] = useState(null);
    const [fraudAlert, setFraudAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!accountId) {
            setGraphData(null);
            setFraudAlert(null);
            return;
        }

        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch graph nodes/links
                const graphRes = await fetchGraphData(accountId);
                
                if (graphRes.data && graphRes.data.data) {
                    setGraphData(graphRes.data.data);
                } else {
                    setGraphData({ nodes: [], links: [] });
                }

                // Fetch fraud alert
                const alertRes = await fetchFraudDetection(accountId);
                if (alertRes.data && alertRes.data.data) {
                    setFraudAlert(alertRes.data.data);
                } else {
                    setFraudAlert(null);
                }
            } catch (err) {
                console.error("Failed to load graph or fraud data", err);
                setError("Failed to fetch data from server.");
                setGraphData({ nodes: [], links: [] });
            } finally {
                setLoading(false);
            }
        };

        // Initial load
        loadData();

        // Set up polling every 2 seconds for real-time updates
        intervalRef.current = setInterval(loadData, 2000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [accountId]);

    return { graphData, fraudAlert, loading, error };
};
