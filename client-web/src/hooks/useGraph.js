import { useState, useEffect } from 'react';
import { fetchGraphData, fetchFraudDetection } from '../services/api';

export const useGraph = (accountId) => {
    const [graphData, setGraphData] = useState(null);
    const [fraudAlert, setFraudAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!accountId) return;

        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch graph nodes/links
                const graphRes = await fetchGraphData(accountId);
                
                // Set default empty graph if missing
                if (graphRes.data && graphRes.data.data) {
                    setGraphData(graphRes.data.data);
                } else {
                    setGraphData({ nodes: [], links: [] });
                }

                // Fetch fraud alert
                const alertRes = await fetchFraudDetection(accountId);
                if (alertRes.data && alertRes.data.data) {
                    setFraudAlert(alertRes.data.data);
                }
            } catch (err) {
                console.error("Failed to load graph or fraud data", err);
                setError("Failed to fetch data connecting to server.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [accountId]);

    return { graphData, fraudAlert, loading, error };
};
