import React from 'react';
import { View, StyleSheet } from 'react-native';
import TransferForm from '../components/TransferForm';

export default function TransferScreen({ route, navigation }) {
    const { accountId } = route.params;

    const handleTransferSuccess = () => {
        navigation.navigate('History', { accountId });
    };

    return (
        <View style={styles.container}>
            <TransferForm fromAccount={accountId} onSuccess={handleTransferSuccess} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' }
});
