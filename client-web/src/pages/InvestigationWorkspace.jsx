import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import GraphView from '../components/GraphView';
import Sidebar from '../components/Sidebar';
import { fetchAccounts, fetchGraphBetweenAccounts, fetchTransactions } from '../services/api';

const InvestigationWorkspace = () => {
    const [accounts, setAccounts] = useState([]);
    const [sourceAccount, setSourceAccount] = useState('');
    const [targetAccount, setTargetAccount] = useState('');
    const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const res = await fetchAccounts(100);
                const list = res.data || [];
                setAccounts(list);
                if (list.length > 0) {
                    setSourceAccount(list[0].account);
                    setTargetAccount(list.length > 1 ? list[1].account : list[0].account);
                }
            } catch (error) {
                console.error('Failed to load accounts', error);
            }
        };
        loadAccounts();
    }, []);

    useEffect(() => {
        if (!sourceAccount || !targetAccount) {
            return;
        }
        const loadWorkspace = async () => {
            setLoading(true);
            try {
                const [graphRes, txRes] = await Promise.all([
                    fetchGraphBetweenAccounts(sourceAccount, targetAccount, 300),
                    fetchTransactions(sourceAccount),
                ]);
                setGraphData(graphRes?.data?.data || { nodes: [], edges: [] });
                setTransactions(txRes?.data?.transactions || []);
            } catch (error) {
                console.error('Failed to load transaction workspace data', error);
                setGraphData({ nodes: [], edges: [] });
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };
        loadWorkspace();
    }, [sourceAccount, targetAccount]);

    const totalAmount = useMemo(() => {
        return transactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    }, [transactions]);

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <Sidebar />
            <div className="ml-64 p-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-primary/70">Operations</p>
                            <h1 className="text-3xl font-semibold tracking-tight">Transactions Workspace</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard" className="rounded-md bg-surface-container px-4 py-2 text-sm font-semibold">Dashboard</Link>
                            <Link to="/investigation" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary">Investigation</Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="rounded-lg bg-surface-container-lowest p-5 shadow-sm">
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant">Source</p>
                            <p className="mt-2 font-mono text-sm">{sourceAccount || 'N/A'}</p>
                        </div>
                        <div className="rounded-lg bg-surface-container-lowest p-5 shadow-sm">
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant">Target</p>
                            <p className="mt-2 font-mono text-sm">{targetAccount || 'N/A'}</p>
                        </div>
                        <div className="rounded-lg bg-surface-container-lowest p-5 shadow-sm">
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant">Transactions</p>
                            <p className="mt-2 text-2xl font-bold">{transactions.length}</p>
                        </div>
                        <div className="rounded-lg bg-surface-container-lowest p-5 shadow-sm md:col-span-2">
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant">Total Amount</p>
                            <p className="mt-2 text-2xl font-bold">${totalAmount.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-lg bg-surface-container-lowest p-6 shadow-sm">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Select source account</label>
                            <select
                                className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm"
                                value={sourceAccount}
                                onChange={(event) => setSourceAccount(event.target.value)}
                            >
                                {accounts.map((account) => (
                                    <option key={`source-${account.account}`} value={account.account}>
                                        {account.account}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="rounded-lg bg-surface-container-lowest p-6 shadow-sm">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Select target account</label>
                            <select
                                className="w-full rounded-md border border-outline-variant/30 bg-surface-container px-3 py-2 text-sm"
                                value={targetAccount}
                                onChange={(event) => setTargetAccount(event.target.value)}
                            >
                                {accounts.map((account) => (
                                    <option key={`target-${account.account}`} value={account.account}>
                                        {account.account}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="rounded-lg bg-surface-container-lowest p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold">Transaction Graph Between Selected Accounts</h2>
                        <div className="h-[380px] rounded-md border border-outline-variant/20 bg-surface-container-lowest">
                            <GraphView data={graphData} highlightAccount={sourceAccount} />
                        </div>
                        {loading && <p className="mt-3 text-xs font-semibold text-on-surface-variant">Loading account data...</p>}
                    </div>

                    <div className="rounded-lg bg-surface-container-lowest p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold">Recent Transactions</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-outline-variant/20 text-xs uppercase tracking-widest text-on-surface-variant">
                                        <th className="pb-3">Txn ID</th>
                                        <th className="pb-3">From</th>
                                        <th className="pb-3">To</th>
                                        <th className="pb-3">Amount</th>
                                        <th className="pb-3">Direction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx) => (
                                        <tr key={tx.txn_id} className="border-b border-outline-variant/10">
                                            <td className="py-3 font-mono text-xs">{tx.txn_id}</td>
                                            <td className="py-3 font-mono text-xs">{tx.from}</td>
                                            <td className="py-3 font-mono text-xs">{tx.to}</td>
                                            <td className="py-3">${Number(tx.amount || 0).toLocaleString()}</td>
                                            <td className="py-3 uppercase text-xs font-semibold">{tx.direction}</td>
                                        </tr>
                                    ))}
                                    {transactions.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="py-10 text-center text-xs text-on-surface-variant">
                                                No transactions available for this account.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestigationWorkspace;
