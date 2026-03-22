import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchInvestigations, fetchAlertById, fetchTransactions, fetchFraudDetection } from '../services/api';

const InvestigationWorkspace = () => {
    const [searchParams] = useSearchParams();
    const [investigations, setInvestigations] = useState([]);
    const [selectedInvestigation, setSelectedInvestigation] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [fraudData, setFraudData] = useState(null);
    const intervalRef = useRef(null);

    // Fetch investigations list
    useEffect(() => {
        const loadInvestigations = async () => {
            try {
                const res = await fetchInvestigations(20);
                if (res.data && res.data.length > 0) {
                    setInvestigations(res.data);
                    // Auto-select first investigation if none selected
                    if (!selectedInvestigation) {
                        setSelectedInvestigation(res.data[0]);
                    }
                }
            } catch (err) {
                console.error("Failed to load investigations", err);
            }
        };

        loadInvestigations();
        intervalRef.current = setInterval(loadInvestigations, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Fetch details for selected investigation
    useEffect(() => {
        if (!selectedInvestigation?.account) return;

        const loadDetails = async () => {
            try {
                const [txRes, fraudRes] = await Promise.all([
                    fetchTransactions(selectedInvestigation.account),
                    fetchFraudDetection(selectedInvestigation.account)
                ]);
                
                if (txRes.data?.transactions) {
                    setTransactions(txRes.data.transactions);
                }
                if (fraudRes.data?.data) {
                    setFraudData(fraudRes.data.data);
                }
            } catch (err) {
                console.error("Failed to load investigation details", err);
            }
        };

        loadDetails();
        const detailInterval = setInterval(loadDetails, 3000);
        return () => clearInterval(detailInterval);
    }, [selectedInvestigation?.account]);

    const riskScore = selectedInvestigation?.risk_score || fraudData?.risk_score || 0;
    const patterns = [];
    if (riskScore > 75) patterns.push({ name: 'High Risk Activity', confidence: 94, type: 'error' });
    if (selectedInvestigation?.alert_type === 'FAILURE_PATTERN') patterns.push({ name: 'Failure Pattern', confidence: 87, type: 'warning' });
    if (transactions.some(t => t.sub_threshold)) patterns.push({ name: 'Sub-threshold Structuring', confidence: 82, type: 'warning' });

    return (
        <div className="bg-surface text-on-surface min-h-screen font-body">
            {/* SideNavBar (Shared Component) */}
            <aside className="fixed left-0 top-0 h-full flex flex-col py-8 z-40 bg-surface-container-lowest w-64 shadow-[40px_0_40px_-20px_rgba(0,0,0,0.04)] font-manrope text-xs uppercase tracking-widest font-bold">
                <div className="px-6 mb-10">
                    <h1 className="text-xl font-black text-primary">Traceify</h1>
                    <p className="text-[10px] text-on-surface-variant tracking-normal opacity-60">Fraud Ops</p>
                </div>
                <nav className="flex-1 space-y-1">
                    <Link to="/dashboard" className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all">
                        <span className="material-symbols-outlined mr-4" data-icon="dashboard">dashboard</span>
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/workspace" className="bg-secondary-container/20 text-primary rounded-none border-r-4 border-primary flex items-center px-6 py-4">
                        <span className="material-symbols-outlined mr-4" data-icon="security">security</span>
                        <span>Investigations</span>
                    </Link>
                    <a className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all" href="#">
                        <span className="material-symbols-outlined mr-4" data-icon="warning">warning</span>
                        <span>Alerts</span>
                    </a>
                    <a className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all" href="#">
                        <span className="material-symbols-outlined mr-4" data-icon="payments">payments</span>
                        <span>Transactions</span>
                    </a>
                    <Link to="/reports" className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all">
                        <span className="material-symbols-outlined mr-4" data-icon="analytics">analytics</span>
                        <span>Reports</span>
                    </Link>
                    <a className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all" href="#">
                        <span className="material-symbols-outlined mr-4" data-icon="settings">settings</span>
                        <span>Settings</span>
                    </a>
                </nav>
                <div className="px-6 py-4">
                    <button className="w-full bg-primary text-on-primary py-3 rounded-md text-[10px] font-bold tracking-widest uppercase">
                        New Investigation
                    </button>
                </div>
                <div className="mt-auto border-t border-outline-variant/10">
                    <a className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all" href="#">
                        <span className="material-symbols-outlined mr-4" data-icon="help">help</span>
                        <span>Help</span>
                    </a>
                    <a className="text-on-surface/70 flex items-center px-6 py-4 hover:bg-surface-container transition-all" href="#">
                        <span className="material-symbols-outlined mr-4" data-icon="logout">logout</span>
                        <span>Sign Out</span>
                    </a>
                </div>
            </aside>

            {/* Main Workspace */}
            <main className="ml-64 flex flex-col min-h-screen">
                {/* TopNavBar (Shared Component) */}
                <header className="flex justify-between items-center w-full px-10 h-16 bg-surface z-30 font-manrope tracking-tight font-medium text-sm">
                    <div className="flex items-center gap-8">
                        <span className="text-lg font-bold tracking-tighter text-on-background">Traceify Bank</span>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60">search</span>
                            <input className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-xs w-64 focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Search hash, wallet, or tx..." type="text"/>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4 text-on-surface/60">
                            <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined" data-icon="notifications">notifications</span></button>
                            <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined" data-icon="help_outline">help_outline</span></button>
                        </div>
                        <div className="h-4 w-px bg-outline-variant/20"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-on-background uppercase tracking-wider">Analyst</p>
                                <p className="text-[11px] text-on-surface-variant">ID: 992-FL</p>
                            </div>
                            <img className="w-8 h-8 rounded-full object-cover" data-alt="Analyst profile portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWqITy3JfTLy4t92KsOlx222k0KmQSZgM_gtjK0bBssTxzP-pQ8sYR-4WLPEiWIGDlLl5xN7dYqyQesOk0SbtQ1YiYd_rw579OR6ZE3hbOnTG8Z2d9XBTa4jo9MZxc3uNP17R-nASm99_LCgWJPKreVrXXkXSWCCbmFYqN9a3CSHNB8PvV7UHQjEWx9LuH926NK-vWRrRWnNxzvCibo7GHmt1ZS8ANoBc7wvhzqaGq5CtnNg2hn3GSGDE0JwXiiqfLhP2YYY63_Rw"/>
                        </div>
                    </div>
                </header>

                {/* Content Canvas */}
                <div className="flex-1 p-10 grid grid-cols-12 gap-10 overflow-hidden">
                    {/* Left Panel: Transaction Path Explorer */}
                    <section className="col-span-8 flex flex-col gap-6">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h2 className="text-3xl font-light tracking-tight text-on-background">TX Path Explorer</h2>
                                <p className="text-label-sm uppercase tracking-widest text-on-surface-variant mt-1">
                                    Investigation #{selectedInvestigation?.id || '—'} — {selectedInvestigation?.account || 'Select case'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-surface-container-highest px-4 py-2 rounded text-xs font-bold uppercase tracking-wider">Export PDF</button>
                                <button className="bg-primary text-on-primary px-4 py-2 rounded text-xs font-bold uppercase tracking-wider">Freeze Asset</button>
                            </div>
                        </div>

                        {/* Transaction Flow Visualizer (Bento Grid Style) */}
                        <div className="grid grid-cols-3 gap-6">
                            {/* Step 1 - Origin */}
                            <div className="bg-surface-container-lowest p-6 flex flex-col gap-8 group hover:shadow-xl transition-shadow border-b-2 border-transparent hover:border-primary/20">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Origin</span>
                                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">account_balance_wallet</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-mono tracking-tighter text-on-background">
                                        {selectedInvestigation?.account ? selectedInvestigation.account.substring(0, 10) + '...' : '—'}
                                    </p>
                                    <p className="text-label-sm text-on-surface-variant mt-2">Target Account</p>
                                </div>
                                <div className="pt-4 border-t border-outline-variant/10">
                                    <div className="flex justify-between text-[11px]">
                                        <span className="text-on-surface-variant">TOTAL VOL</span>
                                        <span className="font-bold">${fraudData?.total_amount?.toLocaleString() || '0'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Flow Arrow (Visual Connector) */}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-full h-px bg-gradient-to-r from-primary to-transparent"></div>
                                <div className="z-10 bg-surface-container-lowest p-2 rounded-full border border-outline-variant/10">
                                    <span className="material-symbols-outlined text-primary text-sm">double_arrow</span>
                                </div>
                            </div>

                            {/* Step 2 - Alert Info */}
                            <div className={`bg-surface-container-lowest p-6 flex flex-col gap-8 group hover:shadow-xl transition-shadow border-b-2 border-transparent ${riskScore > 75 ? 'hover:border-error/20' : 'hover:border-primary/20'}`}>
                                <div className="flex justify-between items-start">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${riskScore > 75 ? 'text-error' : 'text-primary'}`}>
                                        {riskScore > 75 ? 'High Risk' : 'Under Review'}
                                    </span>
                                    <span className={`material-symbols-outlined ${riskScore > 75 ? 'text-error' : 'text-primary'}`}>
                                        {riskScore > 75 ? 'warning' : 'info'}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-2xl font-mono tracking-tighter text-on-background">
                                        {selectedInvestigation?.alert_type || 'TRANSACTION'}
                                    </p>
                                    <p className="text-label-sm text-on-surface-variant mt-2">
                                        {selectedInvestigation?.fail_reason || 'Analyzing patterns...'}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-outline-variant/10">
                                    <div className="flex justify-between text-[11px]">
                                        <span className="text-on-surface-variant">RELATED</span>
                                        <span className="font-bold">{selectedInvestigation?.related_alerts || 0} Alerts</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Timeline: Transaction History */}
                        <div className="mt-4 bg-surface-container-lowest p-10 flex-1 overflow-auto custom-scrollbar">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-8">Temporal Audit Log</h3>
                            <div className="space-y-6">
                                {transactions.length > 0 ? transactions.slice(0, 10).map((tx, idx) => (
                                    <div key={tx.txn_id || idx} className="flex items-center gap-10 group cursor-pointer">
                                        <span className="text-[10px] font-mono text-on-surface-variant/60 w-32">
                                            {tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'N/A'}
                                        </span>
                                        <div className={`h-2 w-2 rounded-full ${tx.direction === 'outgoing' ? 'bg-error' : 'bg-primary'} ring-4 ${tx.direction === 'outgoing' ? 'ring-error/10' : 'ring-primary/10'}`}></div>
                                        <div className="flex-1 grid grid-cols-4 items-center">
                                            <span className="text-sm font-medium">{tx.direction === 'outgoing' ? 'Outbound' : 'Inbound'}</span>
                                            <span className="text-xs text-on-surface-variant">${tx.amount?.toLocaleString() || '0'}</span>
                                            <span className="text-xs font-mono text-outline truncate">{tx.txn_id || '—'}</span>
                                            <span className="text-right">
                                                <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${tx.sub_threshold ? 'bg-tertiary-fixed text-tertiary' : 'bg-surface-container'}`}>
                                                    {tx.sub_threshold ? 'Flagged' : 'Success'}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-on-surface-variant">
                                        <span className="material-symbols-outlined text-4xl mb-2 block">history</span>
                                        <p className="text-xs">No transaction history available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Right Panel: Fraud Insights */}
                    <section className="col-span-4 flex flex-col gap-6">
                        {/* AI Risk Score Card */}
                        <div className="bg-primary p-8 rounded-xl text-on-primary flex flex-col gap-6 relative overflow-hidden shadow-lg">
                            <div className="relative z-10">
                                <p className="text-label-sm uppercase tracking-widest opacity-70">AI Risk Assessment</p>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-7xl font-light tracking-tighter">{Math.round(riskScore)}</span>
                                    <span className="text-xl font-medium opacity-50">/100</span>
                                </div>
                                <p className="mt-4 text-sm font-medium leading-relaxed">
                                    {riskScore > 75 
                                        ? 'High probability of suspicious activity detected via pattern analysis.'
                                        : riskScore > 50
                                        ? 'Moderate risk indicators present. Further investigation recommended.'
                                        : 'Low risk profile. Standard monitoring applied.'}
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container blur-[80px] -mr-32 -mt-32 opacity-40"></div>
                        </div>

                        {/* Open Investigations List */}
                        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4">Open Cases ({investigations.length})</h3>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                {investigations.map((inv) => (
                                    <button
                                        key={inv.id}
                                        onClick={() => setSelectedInvestigation(inv)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                                            inv.id === selectedInvestigation?.id 
                                                ? 'bg-primary/10 text-primary font-bold' 
                                                : 'hover:bg-surface-container text-on-surface'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="truncate">{inv.account}</span>
                                            <span className={`text-[10px] font-bold ${inv.risk_score > 75 ? 'text-error' : 'text-primary'}`}>
                                                {Math.round(inv.risk_score)}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Patterns Detected */}
                        <div className="bg-surface-container-lowest p-8 rounded-xl flex-1 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-10">Detected Patterns</h3>
                            <div className="space-y-10">
                                {patterns.length > 0 ? patterns.map((pattern, idx) => (
                                    <div key={idx} className="flex gap-6">
                                        <div className={`p-3 rounded-lg h-fit ${pattern.type === 'error' ? 'bg-error-container' : 'bg-tertiary-fixed'}`}>
                                            <span className={`material-symbols-outlined ${pattern.type === 'error' ? 'text-error' : 'text-tertiary'}`}>
                                                {pattern.type === 'error' ? 'warning' : 'info'}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-on-background uppercase tracking-tight">{pattern.name}</h4>
                                            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                                                Confidence: {pattern.confidence}%
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-on-surface-variant">
                                        <span className="material-symbols-outlined text-4xl mb-2 block">shield</span>
                                        <p className="text-xs">No specific patterns detected</p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-12 pt-8 border-t border-outline-variant/10">
                                <Link to="/reports" className="text-primary text-xs font-bold uppercase tracking-widest flex items-center justify-between group">
                                    Generate Full Intel Report
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default InvestigationWorkspace;
