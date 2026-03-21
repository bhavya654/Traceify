import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createTransaction } from '../services/api';

export default function TransferForm({ fromAccount, onSuccess }) {
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTransfer = async () => {
        if (!toAccount || !amount) {
            Alert.alert('Error', 'Please enter destination account and amount');
            return;
        }

        setLoading(true);
        try {
            const response = await createTransaction(fromAccount, toAccount, parseFloat(amount));
            const data = response.data;
            
            if (data && data.action === 'BLOCK') {
                // Highly impressive visual cue for demo
                Alert.alert(
                    '⚠️ SECURITY ALERT: TRANSFER BLOCKED', 
                    `AI Risk Score: ${data.risk_score}/100\n\n${data.explanations ? data.explanations.join('\\n') : 'Anomalous activity detected.'}\n\nPlease contact support.`
                );
            } else if (data && data.action === 'FLAG') {
                Alert.alert(
                    'Transfer Flagged for Review', 
                    `Your transfer was completed but flagged due to unusual behavior. (Score: ${data.risk_score})`
                );
                if(onSuccess) onSuccess();
            } else {
                Alert.alert('Success', 'Funds transferred successfully');
                if(onSuccess) onSuccess();
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Transfer Failed', 'Could not complete the transaction at this time');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.label}>To Account ID:</Text>
            <TextInput 
                style={styles.input} 
                value={toAccount} 
                onChangeText={setToAccount} 
                placeholder="e.g. ACC1002"
                autoCapitalize="characters"
            />

            <Text style={styles.label}>Amount ($):</Text>
            <TextInput 
                style={styles.input} 
                value={amount} 
                onChangeText={setAmount} 
                placeholder="0.00"
                keyboardType="numeric"
            />

            <View style={{ marginTop: 20 }}>
                <Button title={loading ? "Sending..." : "Confirm Transfer"} onPress={handleTransfer} disabled={loading} color="#0066cc" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    label: { fontSize: 16, marginBottom: 5, color: '#333' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15, fontSize: 16 }
});
