import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
});

// raph and detection endpoints
export const fetchGraphData = (accountId) => {
    return api.get(`/graph/${accountId}`);
};

export const fetchGraph = (limit = 50, time_window = 24 * 60 * 60, failed_only = false, fraud_only = false) => {
    const a = api.get('/graph', {
        params: {
            limit: limit,
            time_window: time_window,
            fraud_only: fraud_only,
            failed_only: failed_only,
        }
    })
    return a;
}

export const fetchGraphBetweenAccounts = (sourceAccountId, targetAccountId, limit = 100) => {
    return api.get(`/graph/${sourceAccountId}/${targetAccountId}`, {
        params: { limit }
    });
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

export const fetchAverageRisk = (windowSeconds = 24 * 60 * 60) => {
    return api.get('/stats/avg-risk', { params: { window_seconds: windowSeconds } });
};

// Accounts endpoints
export const fetchAccounts = (limit = 50) => {
    return api.get('/accounts', { params: { limit } });
};

// Investigations endpoints
export const fetchInvestigations = (limit = 20) => {
    return api.get('/investigation/list', { params: { limit } });
};

export const createInvestigation = (payload) => {
    return api.post('/investigation', payload);
};

export const updateInvestigation = (investigationId, payload) => {
    return api.patch(`/investigation/${investigationId}`, payload);
};

// Reports endpoints
export const fetchReportSummary = (filters = {}) => {
    const params = {
        account_id: filters.accountId || undefined,
        source_account: filters.sourceAccount || undefined,
        target_account: filters.targetAccount || undefined,
        start_date: filters.startDate || undefined,
        end_date: filters.endDate || undefined,
    };
    return api.get('/reports/summary', { params });
};

export const downloadReportPdf = (filters = {}) => {
    const params = {
        account_id: filters.accountId || undefined,
        source_account: filters.sourceAccount || undefined,
        target_account: filters.targetAccount || undefined,
        start_date: filters.startDate || undefined,
        end_date: filters.endDate || undefined,
    };
    return api.get('/reports/export/pdf', { params, responseType: 'blob' });
};

export const downloadReportExcel = (filters = {}) => {
    const params = {
        account_id: filters.accountId || undefined,
        source_account: filters.sourceAccount || undefined,
        target_account: filters.targetAccount || undefined,
        start_date: filters.startDate || undefined,
        end_date: filters.endDate || undefined,
    };
    return api.get('/reports/export/excel', { params, responseType: 'blob' });
};

// Health check
export const healthCheck = () => {
    return api.get('/health');
};

export default api;
