import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
});

// Graph and detection endpoints
export const fetchGraphData = (accountId) => {
    return api.get(`/graph/${accountId}`);
};

export const fetchFraudDetection = (accountId) => {
    return api.get(`/detect/${accountId}`);
};

export const fetchTransactions = (accountId) => {
    return api.get(`/transactions/${accountId}`);
};

// Alerts endpoints
export const fetchAlertsFeed = () => {
    return api.get('/alerts', { params: { limit: 50 } });
};

export const fetchAlerts = (params = {}) => {
    return api.get('/alerts', { params });
};

export const fetchAlertById = (txnId) => {
    return api.get(`/alerts/${txnId}`);
};

export const disposeAlert = (txnId, decision, note = '') => {
    return api.post(`/alerts/${txnId}/disposition`, { decision, note });
};

// Stats endpoints
export const fetchStats = () => {
    return api.get('/stats');
};

export const fetchDashboardStats = () => {
    return api.get('/stats/dashboard');
};

// Accounts endpoints
export const fetchAccounts = (limit = 50) => {
    return api.get('/accounts', { params: { limit } });
};

// Investigations endpoints
export const fetchInvestigations = (limit = 20) => {
    return api.get('/investigations', { params: { limit } });
};

// Reports endpoints
export const fetchReportSummary = (accountId = null) => {
    const params = accountId ? { account_id: accountId } : {};
    return api.get('/reports/summary', { params });
};

// Health check
export const healthCheck = () => {
    return api.get('/health');
};

export default api;
