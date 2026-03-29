import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GraphView from '../components/GraphView';
import Sidebar from '../components/Sidebar';
import {
    createInvestigation,
    fetchAccounts,
    fetchGraphBetweenAccounts,
    fetchInvestigations,
} from '../services/api';

const Investigator = () => {
    const [accounts, setAccounts] = useState([]);
    const [sourceAccount, setSourceAccount] = useState('');
    const [targetAccount, setTargetAccount] = useState('');
    const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
    const [investigations, setInvestigations] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', txnId: '', assignedTo: 'UNASSIGNED' });
    const [loadingGraph, setLoadingGraph] = useState(false);
    const [creating, setCreating] = useState(false);

    const loadInvestigations = async () => {
        try {
            const res = await fetchInvestigations(100);
            setInvestigations(res.data || []);
        } catch (error) {
            console.error('Failed to load investigations', error);
        }
    };

    useEffect(() => {
        const boot = async () => {
            try {
                const accountRes = await fetchAccounts(100);
                const accountList = accountRes.data || [];
                setAccounts(accountList);
                if (accountList.length > 1) {
                    setSourceAccount(accountList[0].account);
                    setTargetAccount(accountList[1].account);
                } else if (accountList.length === 1) {
                    setSourceAccount(accountList[0].account);
                    setTargetAccount(accountList[0].account);
                }
            } catch (error) {
                console.error('Failed to load accounts for investigation', error);
            }
            await loadInvestigations();
        };
        boot();
    }, []);

    useEffect(() => {
        if (!sourceAccount || !targetAccount) {
            return;
        }
        const loadGraph = async () => {
            setLoadingGraph(true);
            try {
                const res = await fetchGraphBetweenAccounts(sourceAccount, targetAccount, 300);
                setGraphData(res?.data?.data || { nodes: [], edges: [] });
            } catch (error) {
                console.error('Failed to load linked-account graph', error);
                setGraphData({ nodes: [], edges: [] });
            } finally {
                setLoadingGraph(false);
            }
        };
        loadGraph();
    }, [sourceAccount, targetAccount]);

    const handleCreateInvestigation = async () => {
        if (!form.title.trim()) {
            return;
        }
        setCreating(true);
        try {
            await createInvestigation({
                title: form.title,
                description: form.description || null,
                txn_id: form.txnId || null,
                assigned_to: form.assignedTo || 'UNASSIGNED',
            });
            setForm({ title: '', description: '', txnId: '', assignedTo: 'UNASSIGNED' });
            await loadInvestigations();
        } catch (error) {
            console.error('Failed to create investigation', error);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <Sidebar />
            <div className="ml-64 p-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-primary/70">Investigation</p>
                            <h1 className="text-3xl font-semibold tracking-tight">Account-to-Account Investigation</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/transactions" className="rounded-md bg-surface-container px-4 py-2 text-sm font-semibold">Transactions</Link>
                            <Link to="/dashboard" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary">Dashboard</Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-lg bg-surface-container-lowest p-5 shadow-sm">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Source account</label>
                            <select
                                className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm"
                                value={sourceAccount}
                                onChange={(event) => setSourceAccount(event.target.value)}
                            >
                                {accounts.map((account) => (
                                    <option key={`src-${account.account}`} value={account.account}>{account.account}</option>
                                ))}
                            </select>
                        </div>
                        <div className="rounded-lg bg-surface-container-lowest p-5 shadow-sm">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Target account</label>
                            <select
                                className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm"
                                value={targetAccount}
                                onChange={(event) => setTargetAccount(event.target.value)}
                            >
                                {accounts.map((account) => (
                                    <option key={`dst-${account.account}`} value={account.account}>{account.account}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="rounded-lg bg-surface-container-lowest p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold">Graph Path Between Selected Accounts</h2>
                        <div className="h-[380px] rounded-md border border-outline-variant/20 bg-surface-container-lowest">
                            <GraphView data={graphData} highlightAccount={sourceAccount} />
                        </div>
                        {loadingGraph && <p className="mt-3 text-xs font-semibold text-on-surface-variant">Loading investigation graph...</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-lg bg-surface-container-lowest p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold">New Investigation</h2>
                            <div className="space-y-3">
                                <input
                                    className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm"
                                    placeholder="Title"
                                    value={form.title}
                                    onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                                />
                                <textarea
                                    className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm"
                                    rows={3}
                                    placeholder="Description"
                                    value={form.description}
                                    onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                                />
                                <input
                                    className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm font-mono"
                                    placeholder="Associated transaction ID (optional)"
                                    value={form.txnId}
                                    onChange={(event) => setForm((prev) => ({ ...prev, txnId: event.target.value }))}
                                />
                                <input
                                    className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm"
                                    placeholder="Assigned to"
                                    value={form.assignedTo}
                                    onChange={(event) => setForm((prev) => ({ ...prev, assignedTo: event.target.value }))}
                                />
                                <button
                                    className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-60"
                                    onClick={handleCreateInvestigation}
                                    disabled={creating}
                                >
                                    {creating ? 'Creating...' : 'Create Investigation'}
                                </button>
                            </div>
                        </div>

                        <div className="rounded-lg bg-surface-container-lowest p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold">Open Investigations</h2>
                            <div className="max-h-[340px] space-y-3 overflow-auto pr-2">
                                {investigations.map((item) => (
                                    <div key={item.id} className="rounded-md border border-outline-variant/20 bg-surface-container p-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-sm font-semibold">{item.title}</p>
                                            <span className="rounded bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">{item.status}</span>
                                        </div>
                                        <p className="mt-2 text-xs text-on-surface-variant">{item.description || 'No description provided.'}</p>
                                        <div className="mt-2 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                                            <span>{item.issue_key}</span>
                                            <span>{item.txn_id || 'No TXN'}</span>
                                            <span>{item.assigned_to || 'UNASSIGNED'}</span>
                                        </div>
                                    </div>
                                ))}
                                {investigations.length === 0 && (
                                    <p className="py-10 text-center text-xs text-on-surface-variant">No investigations found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Investigator;
