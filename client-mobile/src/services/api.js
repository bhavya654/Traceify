import axios from 'axios';

// In React Native, localhost points to the device itself.
// You often need to replace this with your development machine's local IP address
// e.g. 192.168.1.100 if testing on a real device or a different address for Android emulators (10.0.2.2).
const API_BASE = 'http://10.0.2.2:5000'; // Default for Android Emulator to host

export const createTransaction = (from, to, amount) => {
    return axios.post(`${API_BASE}/transaction`, {
        from,
        to,
        amount,
        timestamp: new Date().toISOString()
    });
};

export const fetchTransactions = (accountId) => {
    return axios.get(`${API_BASE}/transaction/${accountId}`);
};
