import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const fetchGraphData = (accountId) => {
    return axios.get(`${API_BASE}/graph/${accountId}`);
};

export const fetchFraudDetection = (accountId) => {
    return axios.get(`${API_BASE}/detect/${accountId}`);
};

export const fetchTransactions = (accountId) => {
    return axios.get(`${API_BASE}/transaction/${accountId}`);
};

export const fetchAlertsFeed = () => {
    return axios.get(`${API_BASE}/detect/alerts`);
};
