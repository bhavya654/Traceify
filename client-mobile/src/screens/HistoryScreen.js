import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchTransactions } from '../services/api';

export default function HistoryScreen({ route }) {
    const { accountId } = route.params;
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTx = async () => {
            try {
                const res = await fetchTransactions(accountId);
                if (res.data && res.data.data) {
                    setTransactions(res.data.data);
                }
            } catch(e) {
                setError('Failed to fetch transactions');
            } finally {
                setLoading(false);
            }
        };
        loadTx();
    }, [accountId]);

    if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
    if (error) return <View style={styles.center}><Text style={styles.error}>{error}</Text></View>;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Recent Activity</Text>
            {transactions.length === 0 ? (
                <Text>No transaction history found.</Text>
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.txRow}>
                            <Text>{item.from.id} &rarr; {item.to.id}</Text>
                            <Text style={styles.amount}>${item.rel.amount}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    center: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
    txRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    amount: { fontWeight: 'bold' },
    error: { color: 'red' }
});
