import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchReportSummary, fetchAccounts } from '../services/api';

const ReportGenerator = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef(null);

    // Fetch accounts list
    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const res = await fetchAccounts(50);
                if (res.data) {
                    setAccounts(res.data);
                }
            } catch (err) {
                console.error("Failed to load accounts", err);
            }
        };
        loadAccounts();
    }, []);

    // Fetch report data
    useEffect(() => {
        const loadReport = async () => {
            setLoading(true);
            try {
                const res = await fetchReportSummary(selectedAccount);
                if (res.data) {
                    setReportData(res.data);
                }
            } catch (err) {
                console.error("Failed to load report", err);
            } finally {
                setLoading(false);
            }
        };

        loadReport();
        intervalRef.current = setInterval(loadReport, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [selectedAccount]);

    const stats = reportData?.stats || {};
    const timeline = reportData?.timeline || [];
    const topAlerts = reportData?.top_alerts || [];

    // Calculate max for chart scaling
    const maxTimelineCount = Math.max(...timeline.map(t => t.count), 1);

    return (
        <div className="bg-surface text-on-surface selection:bg-secondary-container min-h-screen font-body">
            {/* TopNavBar */}
            <header className="flex justify-between items-center w-full px-10 h-16 bg-[#F7F9FB] docked full-width top-0 z-50">
                <div className="flex items-center gap-8">
                    <span className="text-lg font-bold tracking-tighter text-[#191C1E]">Traceify Bank</span>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/reports" className="text-[#3525CD] font-bold border-b-2 border-[#3525CD] font-manrope tracking-tight text-sm px-1">Reports</Link>
                        <Link to="/workspace" className="text-[#191C1E]/60 font-manrope tracking-tight font-medium text-sm hover:text-[#3525CD] transition-colors duration-200">Investigations</Link>
                        <Link to="/dashboard" className="text-[#191C1E]/60 font-manrope tracking-tight font-medium text-sm hover:text-[#3525CD] transition-colors duration-200">Dashboard</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-surface-container-low px-3 py-1.5 rounded-lg border-b border-outline-variant/15">
                        <span className="material-symbols-outlined text-on-surface-variant text-sm mr-2">search</span>
                        <input className="bg-transparent border-none focus:ring-0 text-sm w-48 outline-none" placeholder="Search evidence..." type="text"/>
                    </div>
                    <button className="material-symbols-outlined text-[#191C1E]/60 hover:text-[#3525CD] transition-all">notifications</button>
                    <button className="material-symbols-outlined text-[#191C1E]/60 hover:text-[#3525CD] transition-all">help_outline</button>
                    <div className="h-8 w-8 bg-primary-fixed rounded-full overflow-hidden">
                        <img alt="Analyst Profile" className="w-full h-full object-cover" data-alt="Portrait of a professional fraud analyst" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo_qoiA-M3hzSYcBaSHVXRXhex0EpjIQbIx2yOdlhdVjTAk6kjPCILf-BEjAWdJQ2-oyZ74qFNZE7jVVIXLS10NXoIPz5mqIzmMCboR7uBuvjvCr4VcIKBPwRmKqCaXC-aGRB4FU0NAQ27ky9vng8pN6hloi_nLGtNuGUwUHUfksM5kkcb62Vz0crsNIzYoeC68ZrNcPKklXOL9F_eCBuKFBumIdGDYhiMomRJtzpIQeNSMzbZ9aJjPGQXqLEieHbjmpPKdIadQM8"/>
                    </div>
                </div>
            </header>

            <div className="flex min-h-[calc(100vh-4rem)]">
                {/* SideNavBar */}
                <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] flex flex-col py-8 z-40 bg-[#FFFFFF] w-64 shadow-[40px_0_40px_-20px_rgba(0,0,0,0.04)] overflow-y-auto custom-scrollbar">
                    <div className="px-6 mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-[#3525CD]">Traceify</h2>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Fraud Ops</p>
                            </div>
                        </div>
                    </div>
                    <nav className="flex-1 space-y-1">
                        <Link to="/dashboard" className="text-[#191C1E]/70 flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold hover:bg-[#ECEEF0] transition-all">
                            <span className="material-symbols-outlined mr-4">dashboard</span>
                            Dashboard
                        </Link>
                        <Link to="/workspace" className="text-[#191C1E]/70 flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold hover:bg-[#ECEEF0] transition-all">
                            <span className="material-symbols-outlined mr-4">security</span>
                            Investigations
                        </Link>
                        <a className="text-[#191C1E]/70 flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold hover:bg-[#ECEEF0] transition-all" href="#">
                            <span className="material-symbols-outlined mr-4">warning</span>
                            Alerts
                        </a>
                        <a className="text-[#191C1E]/70 flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold hover:bg-[#ECEEF0] transition-all" href="#">
                            <span className="material-symbols-outlined mr-4">payments</span>
                            Transactions
                        </a>
                        <Link to="/reports" className="bg-[#B6B4FF]/20 text-[#3525CD] rounded-none border-r-4 border-[#3525CD] flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold">
                            <span className="material-symbols-outlined mr-4">analytics</span>
                            Reports
                        </Link>
                        <a className="text-[#191C1E]/70 flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold hover:bg-[#ECEEF0] transition-all" href="#">
                            <span className="material-symbols-outlined mr-4">settings</span>
                            Settings
                        </a>
                    </nav>
                    <div className="px-4 mb-6">
                        <button className="w-full bg-primary text-on-primary py-3 rounded-md font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                            <span className="material-symbols-outlined text-sm">add</span>
                            New Investigation
                        </button>
                    </div>
                    <div className="border-t border-outline-variant/10 pt-4">
                        <a className="text-[#191C1E]/70 flex items-center px-6 py-3 font-manrope text-xs uppercase tracking-widest font-bold hover:bg-[#ECEEF0]" href="#">
                            <span className="material-symbols-outlined mr-4">help</span>
                            Help
                        </a>
                        <a className="text-[#191C1E]/70 flex items-center px-6 py-3 font-manrope text-xs uppercase tracking-widest font-bold hover:bg-[#ECEEF0]" href="#">
                            <span className="material-symbols-outlined mr-4">logout</span>
                            Sign Out
                        </a>
                    </div>
                </aside>

                {/* Main Content Canvas */}
                <main className="ml-64 flex-1 flex flex-row p-10 gap-10">
                    {/* Left Panel: Controls */}
                    <section className="w-[400px] flex flex-col gap-10">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-light tracking-tight text-on-surface">Report Builder</h1>
                            <p className="text-sm text-on-surface-variant font-medium">Configure parameters for fraud extraction.</p>
                        </div>
                        <div className="flex flex-col gap-8 bg-surface-container-low p-8 rounded-xl border border-outline-variant/15">
                            {/* Control Item */}
                            <div className="space-y-4">
                                <label className="block text-[10px] uppercase tracking-widest font-black text-on-surface-variant">Subject Account</label>
                                <div className="relative">
                                    <select 
                                        className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 py-3 pl-0 text-sm font-semibold transition-all appearance-none cursor-pointer outline-none"
                                        value={selectedAccount || ''}
                                        onChange={(e) => setSelectedAccount(e.target.value || null)}
                                    >
                                        <option value="">All Accounts (Global Report)</option>
                                        {accounts.map((acc) => (
                                            <option key={acc.account} value={acc.account}>
                                                {acc.account} (Risk: {Math.round(acc.max_risk_score)})
                                            </option>
                                        ))}
                                    </select>
                                    <span className="material-symbols-outlined absolute right-0 top-3 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                            {/* Control Item */}
                            <div className="space-y-4">
                                <label className="block text-[10px] uppercase tracking-widest font-black text-on-surface-variant">Time Range</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-0 top-3 text-sm text-primary">calendar_today</span>
                                        <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 py-3 pl-6 text-sm font-semibold transition-all outline-none" type="text" defaultValue="Last 7 days" readOnly/>
                                    </div>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-0 top-3 text-sm text-primary">event</span>
                                        <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 py-3 pl-6 text-sm font-semibold transition-all outline-none" type="text" defaultValue="Real-time" readOnly/>
                                    </div>
                                </div>
                            </div>
                            {/* Control Item: Patterns */}
                            <div className="space-y-4">
                                <label className="block text-[10px] uppercase tracking-widest font-black text-on-surface-variant">Detection Patterns</label>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-[#B6B4FF]/20 text-primary px-3 py-1.5 rounded-full text-[10px] font-bold tracking-tight flex items-center gap-1 border border-primary/10">
                                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        HIGH_RISK
                                    </span>
                                    <span className="bg-[#B6B4FF]/20 text-primary px-3 py-1.5 rounded-full text-[10px] font-bold tracking-tight flex items-center gap-1 border border-primary/10">
                                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        STRUCTURING
                                    </span>
                                    <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1.5 rounded-full text-[10px] font-bold tracking-tight hover:bg-secondary-container/30 transition-all cursor-pointer">
                                        FAILURE_PATTERN
                                    </span>
                                </div>
                            </div>
                            {/* Generate Button */}
                            <button 
                                className="mt-4 bg-primary text-on-primary py-4 rounded-lg font-bold text-sm tracking-tight flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                onClick={() => setSelectedAccount(selectedAccount)}
                            >
                                <span className="material-symbols-outlined">refresh</span>
                                {loading ? 'Loading...' : 'Update Live Preview'}
                            </button>
                        </div>
                        {/* Metadata Footer */}
                        <div className="p-6 bg-surface-container border-l-4 border-primary">
                            <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-tighter mb-1">
                                Status: {loading ? 'Syncing...' : 'Ready'}
                            </p>
                            <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-tighter">System: Traceify_Ops_v1.0</p>
                        </div>
                    </section>

                    {/* Right Panel: Preview (The Editorial Report) */}
                    <section className="flex-1 bg-surface-container-lowest shadow-2xl shadow-on-surface/5 p-16 overflow-y-auto max-h-[calc(100vh-10rem)] rounded-sm border border-outline-variant/10 relative custom-scrollbar">
                        {/* Report Header */}
                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <div>
                                <div className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 inline-block text-[10px] font-bold tracking-widest uppercase mb-4">
                                    {selectedAccount ? 'Account Intelligence' : 'Global Intelligence'}
                                </div>
                                <h2 className="text-5xl font-light -tracking-widest text-on-surface mb-2">
                                    FRAUD_SUMMARY
                                </h2>
                                <p className="text-sm text-on-surface-variant/70 font-medium">
                                    Generated on {new Date().toLocaleDateString()} • Real-time Data
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-surface-container hover:bg-surface-container-highest transition-all text-on-surface-variant">
                                    <span className="material-symbols-outlined">print</span>
                                </button>
                                <button className="px-6 h-10 flex items-center gap-2 rounded-lg bg-on-surface text-surface text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all">
                                    <span className="material-symbols-outlined text-sm">download</span>
                                    Export PDF
                                </button>
                            </div>
                        </div>

                        {/* Bento Grid Layout for Data */}
                        <div className="grid grid-cols-12 gap-8 relative z-10">
                            {/* Risk Score Component */}
                            <div className="col-span-4 bg-surface-container-low p-8 rounded-xl">
                                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-8">Max Risk Index</p>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-7xl font-light tracking-tighter ${stats.max_risk_score > 75 ? 'text-tertiary' : 'text-primary'}`}>
                                        {Math.round(stats.max_risk_score || 0)}
                                    </span>
                                    <span className="text-xl font-bold text-tertiary-container">/100</span>
                                </div>
                                <div className="mt-6 w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                                    <div className={`h-full ${stats.max_risk_score > 75 ? 'bg-tertiary' : 'bg-primary'}`} style={{ width: `${stats.max_risk_score || 0}%` }}></div>
                                </div>
                                <p className={`mt-4 text-xs font-medium uppercase tracking-tight ${stats.max_risk_score > 75 ? 'text-tertiary' : 'text-primary'}`}>
                                    Status: {stats.max_risk_score > 75 ? 'High Threat' : stats.max_risk_score > 50 ? 'Moderate' : 'Low Risk'}
                                </p>
                            </div>
                            
                            {/* Summary Findings */}
                            <div className="col-span-8 p-0">
                                <div className="grid grid-cols-2 gap-8 h-full">
                                    <div className="bg-primary/5 p-8 rounded-xl border-t-2 border-primary">
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-primary mb-4">Anomalies Detected</p>
                                        <span className="text-4xl font-light tracking-tight text-on-surface">{stats.total_anomalies || 0}</span>
                                        <p className="text-xs text-on-surface-variant mt-2">Total flagged events.</p>
                                    </div>
                                    <div className="bg-secondary-container/10 p-8 rounded-xl border-t-2 border-secondary">
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary mb-4">Accounts Affected</p>
                                        <span className="text-4xl font-light tracking-tight text-on-surface">{stats.nodes_affected || 0}</span>
                                        <p className="text-xs text-on-surface-variant mt-2">Unique entities flagged.</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Graph Snapshot (Large) */}
                            <div className="col-span-12 mt-4">
                                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant mb-6">Alert Timeline (Last 7 Days)</p>
                                <div className="h-64 w-full bg-surface-container-low rounded-xl relative overflow-hidden flex items-end px-4 pb-4 gap-2">
                                    {/* Data Visualization */}
                                    <div className="w-full h-full absolute inset-0 opacity-10 pointer-events-none">
                                        <div className="w-full h-full bg-[radial-gradient(#3525cd_1px,transparent_1px)]" style={{ backgroundSize: "20px 20px" }}></div>
                                    </div>
                                    {timeline.length > 0 ? timeline.map((day, idx) => (
                                        <div 
                                            key={idx}
                                            className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-all group relative"
                                            style={{ height: `${(day.count / maxTimelineCount) * 100}%`, minHeight: '10%' }}
                                        >
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100">
                                                {day.count}
                                            </div>
                                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-on-surface-variant whitespace-nowrap">
                                                {day.date ? new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }) : ''}
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="flex-1 flex items-center justify-center text-on-surface-variant">
                                            <p className="text-xs">No timeline data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Top Alerts Feed */}
                            <div className="col-span-12 mt-8 space-y-6">
                                <h3 className="text-lg font-bold tracking-tight text-on-surface border-b border-outline-variant/10 pb-4">Top Alerts</h3>
                                {topAlerts.length > 0 ? topAlerts.map((alert, idx) => (
                                    <div key={idx} className="flex gap-6 border-l-2 border-outline-variant/20 pl-8 relative ml-2">
                                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-surface-container-lowest ${alert.risk_score > 75 ? 'bg-tertiary' : 'bg-primary'}`}></div>
                                        <div className="w-32 text-[10px] font-black text-on-surface-variant uppercase tracking-widest pt-1">
                                            {alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString() : 'N/A'}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-on-surface mb-1">{alert.account}</p>
                                            <p className="text-sm text-on-surface-variant leading-relaxed">
                                                {alert.fail_reason || 'Suspicious activity detected'} — Amount: ${alert.amount?.toLocaleString() || '0'} — Risk: {Math.round(alert.risk_score)}
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-on-surface-variant">
                                        <p className="text-xs">No alerts to display</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Forensic Watermark */}
                        <div className="absolute bottom-8 right-8 pointer-events-none opacity-[0.03] z-0">
                            <span className="text-8xl font-black italic select-none">TRACEIFY</span>
                        </div>
                    </section>
                </main>
            </div>

            {/* Contextual FAB (Only for major action) */}
            <button className="fixed bottom-10 right-10 h-14 w-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>share</span>
            </button>
        </div>
    );
};

export default ReportGenerator;
