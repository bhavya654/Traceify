import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import GraphView from '../components/GraphView';
import { useGraph } from '../hooks/useGraph';
import { fetchAccounts, fetchTransactions } from '../services/api';

const Investigator = () => {
    const [searchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState('');
    const [accountId, setAccountId] = useState(searchParams.get('account') || null);
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const { graphData, fraudAlert, loading, error } = useGraph(accountId);
    const intervalRef = useRef(null);

    // Fetch accounts list on mount
    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const res = await fetchAccounts(20);
                if (res.data && res.data.length > 0) {
                    setAccounts(res.data);
                    // Set first account if none selected
                    if (!accountId) {
                        setAccountId(res.data[0].account);
                    }
                }
            } catch (err) {
                console.error("Failed to load accounts", err);
            }
        };
        loadAccounts();

        intervalRef.current = setInterval(loadAccounts, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Fetch transactions for selected account
    useEffect(() => {
        if (!accountId) return;

        const loadTransactions = async () => {
            try {
                const res = await fetchTransactions(accountId);
                if (res.data && res.data.transactions) {
                    setTransactions(res.data.transactions);
                }
            } catch (err) {
                console.error("Failed to load transactions", err);
            }
        };
        loadTransactions();

        const txInterval = setInterval(loadTransactions, 3000);
        return () => clearInterval(txInterval);
    }, [accountId]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchInput.trim()) {
                setAccountId(searchInput.trim());
            }
        }
    };

    return (
        <div className="bg-surface font-body text-on-surface selection:bg-secondary-container min-h-screen">
            {/* SideNavBar Component */}
            <aside className="fixed left-0 top-0 h-full flex flex-col py-8 z-40 w-64 bg-surface-container-lowest shadow-[40px_0_40px_-20px_rgba(0,0,0,0.04)]">
                <div className="px-6 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg">
                            <span className="material-symbols-outlined text-on-primary" data-icon="clinical_notes">clinical_notes</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-primary leading-none">Traceify</h1>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 mt-1">Fraud Ops</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 space-y-1">
                    <Link to="/dashboard" className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all font-manrope text-xs uppercase tracking-widest font-bold">
                        <span className="material-symbols-outlined mr-4" data-icon="dashboard">dashboard</span>
                        Dashboard
                    </Link>
                    <Link to="/workspace" className="bg-[#B6B4FF]/20 text-primary rounded-none border-r-4 border-primary flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold">
                        <span className="material-symbols-outlined mr-4" data-icon="security">security</span>
                        Investigations
                    </Link>
                    <a className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all font-manrope text-xs uppercase tracking-widest font-bold" href="#">
                        <span className="material-symbols-outlined mr-4" data-icon="warning">warning</span>
                        Alerts
                    </a>
                    <a className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all font-manrope text-xs uppercase tracking-widest font-bold" href="#">
                        <span className="material-symbols-outlined mr-4" data-icon="payments">payments</span>
                        Transactions
                    </a>
                    <Link to="/reports" className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all font-manrope text-xs uppercase tracking-widest font-bold">
                        <span className="material-symbols-outlined mr-4" data-icon="analytics">analytics</span>
                        Reports
                    </Link>
                    <a className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all font-manrope text-xs uppercase tracking-widest font-bold" href="#">
                        <span className="material-symbols-outlined mr-4" data-icon="settings">settings</span>
                        Settings
                    </a>
                </nav>
                <div className="px-6 mt-auto space-y-4">
                    <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
                        New Investigation
                    </button>
                    <div className="pt-6 border-t border-outline-variant/20">
                        <a className="flex items-center gap-3 text-on-surface/70 text-xs font-bold uppercase tracking-widest mb-4" href="#">
                            <span className="material-symbols-outlined" data-icon="help">help</span> Help
                        </a>
                        <a className="flex items-center gap-3 text-on-surface/70 text-xs font-bold uppercase tracking-widest" href="#">
                            <span className="material-symbols-outlined" data-icon="logout">logout</span> Sign Out
                        </a>
                    </div>
                </div>
            </aside>

            {/* TopNavBar Component */}
            <header className="fixed top-0 right-0 left-64 h-16 bg-surface flex justify-between items-center px-10 z-30">
                <div className="flex items-center gap-8">
                    <span className="text-lg font-bold tracking-tighter text-on-surface">Traceify Bank</span>
                    <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-lg border-b-2 border-outline-variant/30 focus-within:border-primary transition-all">
                        <span className="material-symbols-outlined text-sm text-on-surface-variant/40" data-icon="search">search</span>
                        <input 
                            className="pl-2 pr-4 py-2 bg-surface-container-low border-none text-sm w-80 focus:ring-1 focus:ring-primary transition-all outline-none" 
                            placeholder="Search accounts or transaction hashes..." 
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-on-surface-variant/60">
                        <button className="hover:text-primary transition-colors duration-200">
                            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
                        </button>
                        <button className="hover:text-primary transition-colors duration-200">
                            <span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
                        </button>
                    </div>
                    <div className="h-6 w-px bg-outline-variant/30"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right flex-col justify-center items-end hidden md:flex">
                            <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-widest mb-0.5 font-bold">Traceify</p>
                            <p className="text-sm font-bold leading-none">Analyst Profile</p>
                        </div>
                        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                            <img alt="Analyst Profile" className="w-8 h-8 rounded-full object-cover" data-alt="Profile photo of a fraud analyst" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1855S-9s7F4uudn2U3O8JgwQzihMx-2WXs4tDjwUI9TBSc0G4ocwtBfDQet9UYfIy_73ZISXCiULj8zlAVY6WS3e0noxSS_6Aq0T1Db7xOWZi0OZuoFI_QQlJ0Xr6TSP9C80ZRqmHcgsqAxZekPq75fgc6SMS7-N8vwvvqWMBqv9fLtPZgb5rFmvDjXlFuL213nAUrffSe0_sHWTkScfpwetAdyLMQ_kKdZtG2q13eUvOT9-J_KjkyqIYl_jIx6av0X0vWg-F7mY"/>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-surface-container-lowest"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="ml-64 mt-16 p-10 flex gap-8 h-[calc(100vh-64px)] overflow-hidden">
                {/* Central Investigation Canvas */}
                <section className="flex-1 flex flex-col gap-6 h-full min-w-0">
                    {/* Header Info */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-light tracking-tight text-on-surface">Active Fund Flow Tracking</h2>
                            <p className="text-sm text-on-surface-variant/70 mt-1 uppercase tracking-widest font-medium">
                                {accountId ? `Target: ${accountId}` : 'Select an account to investigate'}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-surface-container-high rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-surface-container-highest transition-colors">
                                Recenter
                            </button>
                            <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold uppercase tracking-widest shadow-md shadow-primary/10">
                                Export Report
                            </button>
                        </div>
                    </div>
                    {/* Network Graph Visualizer */}
                    <div className="flex-1 bg-surface-container-lowest rounded-xl network-canvas relative border border-outline-variant/10 overflow-hidden" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #eceef0 1px, transparent 0)", backgroundSize: "32px 32px" }}>
                        {loading && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-container-lowest/50 backdrop-blur-sm">
                                <span className="px-4 py-2 bg-primary text-on-primary rounded text-xs font-bold uppercase tracking-widest shadow-lg">Mapping Network...</span>
                            </div>
                        )}
                        {error && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <span className="px-4 py-2 bg-error-container text-on-error-container rounded text-xs font-bold shadow-lg">{error}</span>
                            </div>
                        )}
                        {!loading && !error && graphData && (
                            <div className="absolute inset-0">
                                <GraphView data={graphData} />
                            </div>
                        )}
                        {!accountId && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">account_tree</span>
                                    <p className="text-sm text-on-surface-variant">Select an account from the sidebar to view network</p>
                                </div>
                            </div>
                        )}

                        {/* Floating Legend */}
                        <div className="absolute bottom-6 left-6 p-4 bg-surface-container-lowest/90 backdrop-blur rounded-lg border border-outline-variant/20 z-10 pointer-events-none">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Flow Indicators</p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    <span className="text-[10px] font-medium text-on-surface/70">Clean Transaction</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                                    <span className="text-[10px] font-medium text-on-surface/70">Potential Structuring</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-error"></span>
                                    <span className="text-[10px] font-medium text-on-surface/70">Known Sanctioned</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Controls */}
                        <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                            <button className="w-10 h-10 bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm flex items-center justify-center hover:bg-surface-container transition-colors">
                                <span className="material-symbols-outlined text-on-surface-variant" data-icon="zoom_in">zoom_in</span>
                            </button>
                            <button className="w-10 h-10 bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm flex items-center justify-center hover:bg-surface-container transition-colors">
                                <span className="material-symbols-outlined text-on-surface-variant" data-icon="zoom_out">zoom_out</span>
                            </button>
                            <div className="h-px w-full bg-outline-variant/20"></div>
                            <button className="w-10 h-10 bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm flex items-center justify-center hover:bg-surface-container transition-colors">
                                <span className="material-symbols-outlined text-on-surface-variant" data-icon="layers">layers</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Right Side Account Details Panel */}
                <aside className="w-96 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
                    {/* Account Summary Card */}
                    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm shrink-0">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant/40">Entity Detail</span>
                                <h3 className="text-xl font-bold text-on-surface mt-1">{accountId || 'No Account Selected'}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${fraudAlert?.risk_score > 75 ? 'bg-error-container/20' : 'bg-secondary-container/20'}`}>
                                <span className={`material-symbols-outlined ${fraudAlert?.risk_score > 75 ? 'text-error' : 'text-primary'}`} data-icon="gavel">gavel</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-on-surface-variant/50 tracking-wider">Risk Score</p>
                                <p className={`text-2xl font-light ${fraudAlert?.risk_score > 75 ? 'text-error' : 'text-primary'}`}>
                                    {fraudAlert?.risk_score ? Math.round(fraudAlert.risk_score) : '—'}<span className="text-sm font-bold">/100</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-on-surface-variant/50 tracking-wider">Alert Count</p>
                                <p className="text-sm font-bold text-on-surface">{fraudAlert?.alert_count || 0}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-on-surface-variant/50 tracking-wider">Total Volume</p>
                                <p className="text-sm font-bold text-on-surface">
                                    ${fraudAlert?.total_amount ? fraudAlert.total_amount.toLocaleString() : '0'}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-on-surface-variant/50 tracking-wider">Status</p>
                                <p className="text-sm font-bold text-on-surface uppercase">
                                    {fraudAlert?.status || (fraudAlert?.risk_score > 75 ? 'Critical' : 'Monitoring')}
                                </p>
                            </div>
                        </div>
                        <div className="bg-surface p-4 rounded-lg">
                            <p className="text-[10px] uppercase font-black text-on-surface-variant mb-2">Primary Red Flag</p>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                {fraudAlert?.reason || (fraudAlert?.explanations && fraudAlert.explanations.length > 0 ? fraudAlert.explanations[0] : 'No suspicious activity detected')}
                            </p>
                        </div>
                    </div>

                    {/* Account List for Selection */}
                    {accounts.length > 0 && (
                        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
                            <h4 className="text-xs font-black uppercase tracking-widest text-on-surface mb-4">Flagged Accounts</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {accounts.map((acc) => (
                                    <button
                                        key={acc.account}
                                        onClick={() => setAccountId(acc.account)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                                            acc.account === accountId 
                                                ? 'bg-primary/10 text-primary font-bold' 
                                                : 'hover:bg-surface-container text-on-surface'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-mono truncate">{acc.account}</span>
                                            <span className={`text-[10px] font-bold ${acc.max_risk_score > 75 ? 'text-error' : 'text-primary'}`}>
                                                {Math.round(acc.max_risk_score)}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Transaction Audit Trail */}
                    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-on-surface">Transaction Trail</h4>
                            <span className="text-[10px] text-on-surface-variant/60">{transactions.length} transactions</span>
                        </div>
                        
                        <div className="space-y-4 max-h-80 overflow-y-auto">
                            {transactions.length > 0 ? transactions.map((tx, idx) => (
                                <div key={tx.txn_id || idx} className="flex gap-4 group">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-2 h-2 rounded-full ${tx.direction === 'outgoing' ? 'bg-error' : 'bg-primary'} mb-1`}></div>
                                        {idx < transactions.length - 1 && <div className="w-px flex-1 bg-outline-variant/30"></div>}
                                    </div>
                                    <div className="pb-4 flex-1">
                                        <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase mb-1">
                                            {tx.direction === 'outgoing' ? 'Outgoing' : 'Incoming'}
                                        </p>
                                        <p className="text-xs font-bold text-on-surface">
                                            ${tx.amount?.toLocaleString() || '0'}
                                        </p>
                                        <p className="text-[10px] text-on-surface-variant font-mono mt-1 truncate">
                                            {tx.direction === 'outgoing' ? `To: ${tx.to}` : `From: ${tx.from}`}
                                        </p>
                                        {tx.timestamp && (
                                            <p className="text-[10px] text-on-surface-variant/60 mt-1">
                                                {new Date(tx.timestamp).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-on-surface-variant">
                                    <span className="material-symbols-outlined text-3xl mb-2 block">receipt_long</span>
                                    <p className="text-xs">No transactions found</p>
                                </div>
                            )}
                        </div>

                        <button className="w-full mt-8 py-3 text-xs font-bold text-primary uppercase tracking-[0.2em] border border-primary/20 rounded hover:bg-primary/5 transition-colors">
                            View Full Ledger
                        </button>
                    </div>
                </aside>
            </main>

            {/* Floating Action for Case Status */}
            <div className="fixed bottom-10 right-10 flex gap-4 z-50 pointer-events-none">
                <div className="flex flex-col gap-2 scale-90">
                    <div className="bg-surface-container-lowest px-4 py-2 rounded-full shadow-lg border border-outline-variant/20 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-tighter text-on-surface">Live Case Monitoring: Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Investigator;
