import React from 'react';

const TransactionList = ({ transactions }) => {
    if (!transactions || transactions.length === 0) {
        return <p>No transactions found.</p>;
    }

    return (
        <div>
            <h3>Recent Transactions</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {transactions.map((tx, idx) => (
                    <li key={idx} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                        <strong>{tx.from}</strong> &rarr; <strong>{tx.to}</strong>: ${tx.amount} <br/>
                        <small>{new Date(tx.timestamp).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
