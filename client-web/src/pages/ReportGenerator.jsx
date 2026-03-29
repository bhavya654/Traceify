import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
    downloadReportExcel,
    downloadReportPdf,
    fetchAccounts,
    fetchReportSummary,
} from '../services/api';

const toPercent = (value) => {
    const n = Number(value || 0);
    return Math.round(n <= 1 ? n * 100 : n);
};

const ReportGenerator = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [sourceAccount, setSourceAccount] = useState('');
    const [targetAccount, setTargetAccount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef(null);

    const filters = useMemo(
        () => ({
            accountId: selectedAccount || null,
            sourceAccount: sourceAccount || null,
            targetAccount: targetAccount || null,
            startDate: startDate || null,
            endDate: endDate || null,
        }),
        [selectedAccount, sourceAccount, targetAccount, startDate, endDate]
    );

    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const res = await fetchAccounts(100);
                setAccounts(res.data || []);
            } catch (error) {
                console.error('Failed to load accounts', error);
            }
        };
        loadAccounts();
    }, []);

    useEffect(() => {
        const loadReport = async () => {
            setLoading(true);
            try {
                const res = await fetchReportSummary(filters);
                setReportData(res.data || null);
            } catch (error) {
                console.error('Failed to load report', error);
            } finally {
                setLoading(false);
            }
        };

        loadReport();
        intervalRef.current = setInterval(loadReport, 7000);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [filters]);

    const stats = reportData?.stats || {};
    const timeline = reportData?.timeline || [];
    const topAlerts = reportData?.top_alerts || [];
    const transactions = reportData?.transactions || [];
    const maxTimelineCount = Math.max(...timeline.map((entry) => entry.count), 1);

    const triggerDownload = (blob, fileName) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    };

    const handleDownloadPdf = async () => {
        try {
            const res = await downloadReportPdf(filters);
            triggerDownload(res.data, 'traceify_report.pdf');
        } catch (error) {
            console.error('Failed to export PDF', error);
        }
    };

    const handleDownloadExcel = async () => {
        try {
            const res = await downloadReportExcel(filters);
            triggerDownload(res.data, 'traceify_report.xlsx');
        } catch (error) {
            console.error('Failed to export Excel', error);
        }
    };

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <Sidebar />
            <div className="ml-64 p-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-primary/70">Reports</p>
                            <h1 className="text-3xl font-semibold tracking-tight">Fraud Report Generator</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard" className="rounded-md bg-surface-container px-4 py-2 text-sm font-semibold">Dashboard</Link>
                            <Link to="/transactions" className="rounded-md bg-surface-container px-4 py-2 text-sm font-semibold">Transactions</Link>
                            <Link to="/investigation" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary">Investigation</Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <section className="space-y-4 rounded-lg bg-surface-container-lowest p-6 shadow-sm lg:col-span-1">
                            <h2 className="text-lg font-semibold">Filters</h2>

                            <div>
                                <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Subject account</label>
                                <select
                                    className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm"
                                    value={selectedAccount}
                                    onChange={(event) => setSelectedAccount(event.target.value)}
                                >
                                    <option value="">All Accounts</option>
                                    {accounts.map((account) => (
                                        <option key={account.account} value={account.account}>
                                            {account.account} (risk {toPercent(account.max_risk_score)})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Start date</label>
                                    <input
                                        className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm"
                                        type="date"
                                        value={startDate}
                                        onChange={(event) => setStartDate(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">End date</label>
                                    <input
                                        className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm"
                                        type="date"
                                        value={endDate}
                                        onChange={(event) => setEndDate(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Source account</label>
                                    <input
                                        className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm font-mono"
                                        placeholder="optional"
                                        value={sourceAccount}
                                        onChange={(event) => setSourceAccount(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Target account</label>
                                    <input
                                        className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm font-mono"
                                        placeholder="optional"
                                        value={targetAccount}
                                        onChange={(event) => setTargetAccount(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <button className="rounded-md bg-on-surface px-4 py-2 text-sm font-semibold text-surface" onClick={handleDownloadPdf}>Export PDF</button>
                                <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary" onClick={handleDownloadExcel}>Export Excel</button>
                            </div>

                            <p className="text-xs font-semibold text-on-surface-variant">{loading ? 'Syncing report...' : 'Report ready'}</p>
                        </section>

                        <section className="space-y-6 rounded-lg bg-surface-container-lowest p-6 shadow-sm lg:col-span-2">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-md bg-surface-container p-4">
                                    <p className="text-xs uppercase tracking-widest text-on-surface-variant">Total anomalies</p>
                                    <p className="mt-2 text-2xl font-bold">{stats.total_anomalies || 0}</p>
                                </div>
                                <div className="rounded-md bg-surface-container p-4">
                                    <p className="text-xs uppercase tracking-widest text-on-surface-variant">Nodes affected</p>
                                    <p className="mt-2 text-2xl font-bold">{stats.nodes_affected || 0}</p>
                                </div>
                                <div className="rounded-md bg-surface-container p-4">
                                    <p className="text-xs uppercase tracking-widest text-on-surface-variant">Max risk</p>
                                    <p className="mt-2 text-2xl font-bold">{toPercent(stats.max_risk_score)}%</p>
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-3 text-lg font-semibold">Timeline</h2>
                                <div className="flex h-44 items-end gap-2 rounded-md bg-surface-container p-4">
                                    {timeline.length > 0 ? (
                                        timeline.map((entry, index) => (
                                            <div key={`${entry.date}-${index}`} className="group relative flex-1 rounded-t-sm bg-primary/30" style={{ height: `${(entry.count / maxTimelineCount) * 100}%` }}>
                                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold opacity-0 group-hover:opacity-100">{entry.count}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="m-auto text-xs text-on-surface-variant">No timeline data available.</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-3 text-lg font-semibold">Top Alerts</h2>
                                <div className="space-y-2">
                                    {topAlerts.map((alert) => (
                                        <div key={`${alert.txn_id}-${alert.timestamp}`} className="rounded-md border border-outline-variant/20 bg-surface-container p-3">
                                            <p className="text-sm font-semibold">{alert.account}</p>
                                            <p className="text-xs text-on-surface-variant">
                                                {alert.fail_reason || 'Suspicious activity'} | Amount ${Number(alert.amount || 0).toLocaleString()} | Risk {toPercent(alert.risk_score)}%
                                            </p>
                                        </div>
                                    ))}
                                    {topAlerts.length === 0 && <p className="text-xs text-on-surface-variant">No top alerts found.</p>}
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-3 text-lg font-semibold">Transactions</h2>
                                <div className="max-h-64 overflow-auto rounded-md border border-outline-variant/20">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-surface-container text-xs uppercase tracking-widest text-on-surface-variant">
                                            <tr>
                                                <th className="px-3 py-2">Txn ID</th>
                                                <th className="px-3 py-2">From</th>
                                                <th className="px-3 py-2">To</th>
                                                <th className="px-3 py-2">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.map((tx) => (
                                                <tr key={tx.txn_id} className="border-t border-outline-variant/10">
                                                    <td className="px-3 py-2 font-mono text-xs">{tx.txn_id}</td>
                                                    <td className="px-3 py-2 font-mono text-xs">{tx.from}</td>
                                                    <td className="px-3 py-2 font-mono text-xs">{tx.to}</td>
                                                    <td className="px-3 py-2">${Number(tx.amount || 0).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                            {transactions.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="px-3 py-8 text-center text-xs text-on-surface-variant">No transactions for selected filters.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportGenerator;
