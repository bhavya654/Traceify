import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    // Mock user login
    const userAccount = 'ACC1001';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Account: {userAccount}</Text>
            <Text style={styles.balance}>Current Balance: $5,430.22</Text>

            <View style={styles.buttonContainer}>
                <Button 
                    title="Transfer Money" 
                    onPress={() => navigation.navigate('Transfer', { accountId: userAccount })} 
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title="View Transaction History" 
                    onPress={() => navigation.navigate('History', { accountId: userAccount })} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
    balance: { fontSize: 32, fontWeight: 'bold', color: 'green', textAlign: 'center', marginBottom: 40 },
    buttonContainer: { marginBottom: 15 }
});
