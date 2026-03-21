import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GraphView from '../components/GraphView';
import { useGraph } from '../hooks/useGraph';
import { fetchAlertsFeed } from '../services/api';

const Dashboard = () => {
    const [alerts, setAlerts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const { graphData, fraudAlert, loading } = useGraph(selectedAccount);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetchAlertsFeed();
                if (res.data) setAlerts(res.data);
                if (!selectedAccount && res.data.length > 0) {
                    setSelectedAccount(res.data[0].from);
                }
            } catch (err) {
                console.error("Failed to fetch alerts feed", err);
            }
        };
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 3000);
        return () => clearInterval(interval);
    }, [selectedAccount]);

    return (
        <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen">
          {/* SideNavBar (Traceify) */}
          <aside className="w-64 bg-surface-container-lowest h-screen fixed left-0 top-0 border-r border-outline-variant/20 flex flex-col py-6 z-20 shadow-[20px_0_40px_-20px_rgba(0,0,0,0.05)]">
            <div className="px-6 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-lg" data-icon="troubleshoot">troubleshoot</span>
                </div>
                <div>
                  <h1 className="text-xl font-black text-primary leading-none">Traceify</h1>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">Fraud Ops</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 space-y-1">
              <Link to="/dashboard" className="bg-[#B6B4FF]/20 text-primary border-r-4 border-primary flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined mr-4" data-icon="dashboard">dashboard</span>
                Dashboard
              </Link>
              <Link to="/workspace" className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined mr-4" data-icon="security">security</span>
                Investigations
              </Link>
              <a className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold" href="#">
                <span className="material-symbols-outlined mr-4" data-icon="warning">warning</span>
                Alerts
              </a>
              <a className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold" href="#">
                <span className="material-symbols-outlined mr-4" data-icon="payments">payments</span>
                Transactions
              </a>
              <Link to="/reports" className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined mr-4" data-icon="analytics">analytics</span>
                Reports
              </Link>
              <a className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold" href="#">
                <span className="material-symbols-outlined mr-4" data-icon="settings">settings</span>
                Settings
              </a>
            </nav>
            <div className="px-6 mb-6">
              <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-colors">
                New Investigation
              </button>
            </div>
            <div className="mt-auto border-t border-outline-variant/10 pt-4">
              <a className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-3 font-manrope text-xs uppercase tracking-widest font-bold" href="#">
                <span className="material-symbols-outlined mr-4" data-icon="help">help</span>
                Help
              </a>
              <Link to="/login" className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-3 font-manrope text-xs uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined mr-4" data-icon="logout">logout</span>
                Sign Out
              </Link>
            </div>
          </aside>

          {/* Main Canvas */}
          <main className="ml-64 min-h-screen bg-surface flex flex-col">
            {/* TopAppBar */}
            <header className="flex justify-between items-center w-full px-10 h-16 bg-[#F7F9FB] sticky top-0 z-30">
              <div className="flex items-center gap-8">
                <h2 className="text-lg font-bold tracking-tighter text-[#191C1E]">Traceify Bank</h2>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="search">search</span>
                  <input className="bg-surface-container-low border-0 border-b border-outline-variant/20 focus:border-primary focus:ring-0 text-sm pl-10 pr-4 py-2 w-80 font-manrope transition-all" placeholder="Search account, transaction ID, or user..." type="text"/>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <nav className="flex gap-6">
                  <a className="text-primary font-bold border-b-2 border-primary py-5 text-sm font-manrope tracking-tight" href="#">Overview</a>
                  <a className="text-on-surface/60 hover:text-primary transition-colors py-5 text-sm font-manrope tracking-tight" href="#">Network Map</a>
                  <a className="text-on-surface/60 hover:text-primary transition-colors py-5 text-sm font-manrope tracking-tight" href="#">Timeline</a>
                </nav>
                <div className="h-6 w-px bg-outline-variant/30"></div>
                <div className="flex items-center gap-4">
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
                  </button>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
                  </button>
                  <button className="flex items-center gap-3 hover:bg-surface-container px-2 py-1.5 rounded-lg transition-all text-left">
                    <img alt="Analyst Profile" className="w-8 h-8 rounded-full border border-outline-variant/20 object-cover" data-alt="Close up portrait of a professional fraud analyst" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnRWXQ1tUseE7YsuF4wlijAq21HzyJLj6CkXCCtaEWd-1GCwHt78ngFmVH328i9A-DkO4RDNuQBzGFK2NaD5OtpMNv_BmGWeySX8NXGPOdexfa_2KszvddcnZ3xthjO-Ne9ebUXZTgqRyWe5FQzmcL3shMiaQI4vDLwtt8msbVr_njK9d0xfMin0cZJF8q6-sQzRGCncRBZtG7nU3w7zUCJ_hu3wEx03GMEy7DaKD43Vxy9VaaBGxTcYA6wLNFgIvq5oMuqlV8qiI"/>
                  </button>
                </div>
              </div>
            </header>

            {/* Dashboard Content */}
            <div className="px-10 py-10 space-y-10">
              {/* Page Title & Intelligence Briefing */}
              <section className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">Fraud Overview</p>
                  <h1 className="text-4xl font-light tracking-tight text-on-surface">Fraud Dashboard</h1>
                </div>
                <div className="flex gap-3">
                  <div className="bg-surface-container px-4 py-2 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-sm text-on-surface-variant" data-icon="calendar_today">calendar_today</span>
                    <span className="text-sm font-medium text-on-surface">Oct 24, 2023 - Oct 31, 2023</span>
                  </div>
                  <button className="bg-surface-container-highest px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm" data-icon="filter_list">filter_list</span>
                    Filters
                  </button>
                </div>
              </section>

              {/* High-Level Metrics Bento Grid */}
              <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-surface-container-lowest p-8 flex flex-col justify-between min-h-[160px] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total Transactions</span>
                      <span className="material-symbols-outlined text-primary/40" data-icon="payments">payments</span>
                    </div>
                    <div className="text-3xl font-bold tracking-tight">1.28M</div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">+12.4%</span>
                    <span className="text-[10px] text-on-surface-variant font-medium">vs last week</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-8 flex flex-col justify-between min-h-[160px] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Fraudulent Accounts</span>
                      <span className="material-symbols-outlined text-tertiary/40" data-icon="group_work">group_work</span>
                    </div>
                    <div className="text-3xl font-bold tracking-tight">4,812</div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs font-bold text-tertiary">+3.1%</span>
                    <span className="text-[10px] text-on-surface-variant font-medium">high velocity increase</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-8 flex flex-col justify-between min-h-[160px] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">High Severity Alerts</span>
                      <span className="material-symbols-outlined text-error/40" data-icon="emergency_home">emergency_home</span>
                    </div>
                    <div className="text-3xl font-bold tracking-tight text-error">{alerts.length > 0 ? alerts.filter(a => a.risk_score > 75).length : 128}</div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 rounded-full bg-error ring-2 ring-surface"></div>
                      <div className="w-4 h-4 rounded-full bg-error opacity-60 ring-2 ring-surface"></div>
                    </div>
                    <span className="text-[10px] text-error font-bold">{alerts.length > 0 ? alerts.filter(a => a.risk_score > 75).length : 12} CRITICAL</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-8 flex flex-col justify-between min-h-[160px] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Active Cases</span>
                      <span className="material-symbols-outlined text-primary/40" data-icon="search_insights">search_insights</span>
                    </div>
                    <div className="text-3xl font-bold tracking-tight">{alerts.length || 34}</div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[65%]"></div>
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-bold whitespace-nowrap">65% CAP</span>
                  </div>
                </div>
              </section>

              {/* Main Intelligence Hub */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Network Graph (Large) */}
                <div className="lg:col-span-2 bg-surface-container-lowest p-10 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)] flex flex-col">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight mb-1">{selectedAccount ? "Transaction Network" : "Transaction Volume"}</h3>
                      <p className="text-xs text-on-surface-variant font-medium">{selectedAccount ? "Visualizing transaction flows and relationships" : "Temporal flow of cross-border data nodes"}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-[10px] font-bold bg-surface-container rounded uppercase">Hourly</button>
                      <button className="px-3 py-1 text-[10px] font-bold bg-primary text-on-primary rounded uppercase">Daily</button>
                    </div>
                  </div>
                  
                  {selectedAccount ? (
                    <div className="h-[400px] w-full relative border border-outline-variant/20 rounded-lg overflow-hidden flex items-center justify-center bg-surface-container-lowest">
                      <GraphView data={graphData} />
                      {loading && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface-container/80 text-on-surface px-4 py-2 rounded shadow-lg backdrop-blur text-xs font-bold uppercase tracking-widest">Building Network...</div>}
                    </div>
                  ) : (
                    <div className="h-[400px] w-full relative">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 400">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#3525CD" stopOpacity="0.2"></stop>
                            <stop offset="100%" stopColor="#3525CD" stopOpacity="0"></stop>
                          </linearGradient>
                        </defs>
                        <line stroke="#ECEEF0" strokeDasharray="4" x1="0" x2="800" y1="100" y2="100"></line>
                        <line stroke="#ECEEF0" strokeDasharray="4" x1="0" x2="800" y1="200" y2="200"></line>
                        <line stroke="#ECEEF0" strokeDasharray="4" x1="0" x2="800" y1="300" y2="300"></line>
                        <path d="M0,360 Q100,320 200,280 T400,300 T600,160 T800,80 L800,400 L0,400 Z" fill="url(#chartGradient)"></path>
                        <path d="M0,360 Q100,320 200,280 T400,300 T600,160 T800,80" fill="none" stroke="#3525CD" strokeLinecap="round" strokeWidth="3"></path>
                      </svg>
                      <div className="flex justify-between mt-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Risk Distribution Donut */}
                <div className="bg-surface-container-lowest p-10 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
                  <h3 className="text-xl font-bold tracking-tight mb-1">Fraud Risk Distribution</h3>
                  <p className="text-xs text-on-surface-variant font-medium mb-10">Assessment of potential fraud risk</p>
                  <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48 mb-10">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" fill="none" r="16" stroke="#ECEEF0" strokeWidth="4"></circle>
                        <circle cx="18" cy="18" fill="none" r="16" stroke="#3525CD" strokeDasharray="70, 100" strokeLinecap="round" strokeWidth="4" transform="rotate(-90 18 18)"></circle>
                        <circle cx="18" cy="18" fill="none" r="16" stroke="#B6B4FF" strokeDasharray="20, 100" strokeDashoffset="-70" strokeLinecap="round" strokeWidth="4" transform="rotate(-90 18 18)"></circle>
                        <circle cx="18" cy="18" fill="none" r="16" stroke="#BA1A1A" strokeDasharray="10, 100" strokeDashoffset="-90" strokeLinecap="round" strokeWidth="4" transform="rotate(-90 18 18)"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-on-surface">4.8k</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Accounts</span>
                      </div>
                    </div>
                    <div className="w-full space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="font-medium text-on-surface">Low Risk</span>
                        </div>
                        <span className="font-bold">70%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
                          <span className="font-medium text-on-surface">Medium Risk</span>
                        </div>
                        <span className="font-bold">20%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-error"></div>
                          <span className="font-medium text-on-surface">Critical</span>
                        </div>
                        <span className="font-bold">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent High-Risk Activity Table */}
              <section className="bg-surface-container-lowest p-10 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-1">Fraud Alert Feed</h3>
                    <p className="text-xs text-on-surface-variant font-medium">Real-time critical alerts from the fraud detection engine</p>
                  </div>
                  <a className="text-xs font-bold text-primary uppercase tracking-widest border-b border-primary/20 pb-1" href="#">Review All Events</a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-outline-variant/10">
                      <tr className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
                        <th className="pb-4">Timestamp</th>
                        <th className="pb-4">Entity ID</th>
                        <th className="pb-4">Activity Type</th>
                        <th className="pb-4">Flag Reason</th>
                        <th className="pb-4">Risk Score</th>
                        <th className="pb-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                      {alerts.length > 0 ? alerts.map((a, i) => (
                        <tr key={i} className={`group transition-colors ${a.from === selectedAccount ? 'bg-surface-container-high' : 'hover:bg-surface-container-low'}`}>
                          <td className="py-6 text-xs font-medium text-on-surface">{new Date(a.timestamp).toLocaleString()}</td>
                          <td className="py-6 font-mono text-xs font-bold text-primary">{a.from.substring(0, 16)}...</td>
                          <td className="py-6">
                            <span className={`${a.risk_score > 75 ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'} px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight`}>
                              {a.risk_score > 75 ? 'Rapid Outflow' : 'Struct. Violation'}
                            </span>
                          </td>
                          <td className="py-6 text-xs font-medium text-on-surface-variant max-w-sm truncate">
                             {a.explanations && a.explanations.length > 0 ? a.explanations[0] : 'Anomalous volume/velocity detected.'}
                          </td>
                          <td className="py-6">
                            <div className="flex items-center gap-2">
                              <div className="w-12 bg-surface-container h-1.5 rounded-full">
                                <div className={`${a.risk_score > 75 ? 'bg-error' : 'bg-primary'} h-full rounded-full`} style={{ width: `${a.risk_score}%` }}></div>
                              </div>
                              <span className="text-[10px] font-bold">{a.risk_score}/100</span>
                            </div>
                          </td>
                          <td className="py-6 text-right">
                            <button onClick={() => setSelectedAccount(a.from)} className="text-primary hover:underline font-bold text-[10px] uppercase tracking-widest">Investigate</button>
                          </td>
                        </tr>
                      )) : (
                        <tr className="group hover:bg-surface-container-low transition-colors">
                          <td className="py-6 text-xs font-medium text-on-surface">2023-10-31 14:22:01</td>
                          <td className="py-6 font-mono text-xs font-bold text-primary">WX-92831-P</td>
                          <td className="py-6">
                            <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight">Rapid Outflow</span>
                          </td>
                          <td className="py-6 text-xs font-medium text-on-surface-variant">Unusual withdrawal volume to high-risk wallet cluster.</td>
                          <td className="py-6">
                            <div className="flex items-center gap-2">
                              <div className="w-12 bg-surface-container h-1.5 rounded-full">
                                <div className="bg-primary h-full w-[94%] rounded-full"></div>
                              </div>
                              <span className="text-[10px] font-bold">94/100</span>
                            </div>
                          </td>
                          <td className="py-6 text-right">
                            <button className="text-primary hover:underline font-bold text-[10px] uppercase tracking-widest">Investigate</button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>
        </div>
    );
};

export default Dashboard;
