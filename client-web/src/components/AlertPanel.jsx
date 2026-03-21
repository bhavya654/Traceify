import React from 'react';

const AlertPanel = ({ alert }) => {
    if (!alert) {
        return (
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#eaffea' }}>
                <h4>Status</h4>
                <p>No account selected or assessing...</p>
            </div>
        );
    }

    const isHighRisk = alert.risk === 'HIGH';

    return (
        <div style={{ 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            backgroundColor: isHighRisk ? '#ffeaea' : '#eaffea' 
        }}>
            <h3 style={{ color: isHighRisk ? '#d00' : '#0a0' }}>
                Risk Level: {alert.risk}
            </h3>
            <p><strong>Reason:</strong> {alert.reason}</p>
            
            {alert.aiScore && (
                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ccc' }}>
                    <h4>AI Model Analysis</h4>
                    <p>Score: {alert.aiScore.risk_score}</p>
                    <p>Label: {alert.aiScore.label}</p>
                    <p>Tx Analyzed: {alert.aiScore.tx_count}</p>
                </div>
            )}
        </div>
    );
};

export default AlertPanel;
