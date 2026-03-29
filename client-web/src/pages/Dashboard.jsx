import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GraphView from '../components/GraphView';
import { useGraph } from '../hooks/useGraph';
import { fetchAlertsFeed, fetchDashboardStats, fetchAverageRisk } from '../services/api';

const timeWindowPresets = [
  { label: "Last 1min", value: 60 },
  { label: "Last 5min", value: 5 * 60 },
  { label: "Last 30min", value: 30 * 60 },
  { label: "Last 1hr", value: 60 * 60 },
  { label: "Last 12hr", value: 12 * 60 * 60 },
  { label: "Last 24hr", value: 24 * 60 * 60 },
]

const customUnitOptions = [
  { label: 'Seconds', value: 'seconds', multiplier: 1, max: 24 * 60 * 60 },
  { label: 'Minutes', value: 'minutes', multiplier: 60, max: 24 * 60 },
  { label: 'Hours', value: 'hours', multiplier: 60 * 60, max: 24 },
];


const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [avgRisk, setAvgRisk] = useState(null);
  const [newAlertIds, setNewAlertIds] = useState(new Set());
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isCustomPopoverOpen, setIsCustomPopoverOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [customUnit, setCustomUnit] = useState('minutes');
  const [customValidationError, setCustomValidationError] = useState('');
  const {
    graphData,
    loading,
    timeWindow,
    setTimeWindow,
    failedOnly,
    setFailedOnly,
    fraudOnly,
    setFraudOnly,
  } = useGraph();
  const intervalRef = useRef(null);
  const prevAlertIdsRef = useRef(new Set());
  const customPopoverRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch alerts
        const alertsRes = await fetchAlertsFeed();
        if (alertsRes.data) {
          // Detect new alerts for highlighting
          const currentIds = new Set(alertsRes.data.map(a => a.txn_id || a.id));
          const newIds = new Set();
          currentIds.forEach(id => {
            if (!prevAlertIdsRef.current.has(id)) {
              newIds.add(id);
            }
          });

          if (newIds.size > 0 && prevAlertIdsRef.current.size > 0) {
            setNewAlertIds(newIds);
            // Clear highlight after 3 seconds
            setTimeout(() => setNewAlertIds(new Set()), 3000);
          }

          prevAlertIdsRef.current = currentIds;
          setAlerts(alertsRes.data);
          setLastUpdate(new Date());

          // Set default selected account only on first load
          if (!selectedAccount && alertsRes.data.length > 0) {
            setSelectedAccount(alertsRes.data[0].from || alertsRes.data[0].account);
          }
        }

        // Fetch dashboard stats
        const statsRes = await fetchDashboardStats();
        if (statsRes.data) {
          setStats(statsRes.data);
        }

        const avgRiskRes = await fetchAverageRisk(timeWindow.value);
        if (avgRiskRes.data) {
          setAvgRisk(avgRiskRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
    // Poll every 2 seconds for more real-time feel
    intervalRef.current = setInterval(fetchData, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeWindow.value]);

  useEffect(() => {
    const onDocumentClick = (event) => {
      if (customPopoverRef.current && !customPopoverRef.current.contains(event.target)) {
        setIsCustomPopoverOpen(false);
      }
    };

    if (isCustomPopoverOpen) {
      document.addEventListener('mousedown', onDocumentClick);
    }

    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
    };
  }, [isCustomPopoverOpen]);

  const selectedUnitConfig = customUnitOptions.find((opt) => opt.value === customUnit) || customUnitOptions[1];

  const applyCustomTimeWindow = () => {
    const parsedAmount = Number(customAmount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setCustomValidationError('Enter a valid number greater than 0.');
      return;
    }

    if (!Number.isInteger(parsedAmount)) {
      setCustomValidationError('Please use whole numbers only.');
      return;
    }

    if (parsedAmount > selectedUnitConfig.max) {
      setCustomValidationError('Maximum allowed window is 24 hours.');
      return;
    }

    const totalSeconds = parsedAmount * selectedUnitConfig.multiplier;
    if (totalSeconds > 24 * 60 * 60) {
      setCustomValidationError('Maximum allowed window is 24 hours.');
      return;
    }

    const shortUnitLabel = customUnit === 'hours' ? 'h' : customUnit === 'minutes' ? 'm' : 's';
    setTimeWindow({
      label: `Last ${parsedAmount} ${shortUnitLabel}`,
      value: totalSeconds,
    });
    setCustomValidationError('');
    setIsCustomPopoverOpen(false);
  };

  const isCustomWindowSelected = !timeWindowPresets.some((preset) => preset.value === timeWindow.value);

  // Calculate metrics from real data
  const totalAlerts = stats?.total_transactions || alerts.length || 0;
  const flaggedAccounts = stats?.flagged_accounts || 0;
  // risk_score from API is 0-1, convert to percentage for display
  const highSeverityAlerts = stats?.high_severity_alerts || alerts.filter(a => (a.risk_score || 0) > 0.75).length || 0;
  const criticalAlerts = stats?.critical_alerts || alerts.filter(a => (a.risk_score || 0) > 0.90).length || 0;
  const activeCases = stats?.active_cases || alerts.length || 0;
  const weeklyChangePct = stats?.weekly_change_pct || 0;
  const avgRiskPct = avgRisk?.avg_risk_pct || 0;

  // Risk distribution
  const riskDistribution = stats?.risk_distribution || {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };
  const totalRisk = riskDistribution.low + riskDistribution.medium + riskDistribution.high + riskDistribution.critical || 1;
  const lowPct = Math.round((riskDistribution.low / totalRisk) * 100);
  const mediumPct = Math.round((riskDistribution.medium / totalRisk) * 100);
  const criticalPct = Math.round(((riskDistribution.high + riskDistribution.critical) / totalRisk) * 100);

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
          <Link to="/investigation" className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold">
            <span className="material-symbols-outlined mr-4" data-icon="security">security</span>
            Investigations
          </Link>
          <a className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold" href="#">
            <span className="material-symbols-outlined mr-4" data-icon="warning">warning</span>
            Alerts
          </a>
          <Link to="/transactions" className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold">
            <span className="material-symbols-outlined mr-4" data-icon="payments">payments</span>
            Transactions
          </Link>
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
          <Link to="/investigation" className="block w-full bg-primary text-on-primary py-3 rounded-lg text-center font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-colors">
            New Investigation
          </Link>
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
              <input className="bg-surface-container-low border-0 border-b border-outline-variant/20 focus:border-primary focus:ring-0 text-sm pl-10 pr-4 py-2 w-80 font-manrope transition-all" placeholder="Search account, transaction ID, or user..." type="text" />
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
                <img alt="Analyst Profile" className="w-8 h-8 rounded-full border border-outline-variant/20 object-cover" data-alt="Close up portrait of a professional fraud analyst" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnRWXQ1tUseE7YsuF4wlijAq21HzyJLj6CkXCCtaEWd-1GCwHt78ngFmVH328i9A-DkO4RDNuQBzGFK2NaD5OtpMNv_BmGWeySX8NXGPOdexfa_2KszvddcnZ3xthjO-Ne9ebUXZTgqRyWe5FQzmcL3shMiaQI4vDLwtt8msbVr_njK9d0xfMin0cZJF8q6-sQzRGCncRBZtG7nU3w7zUCJ_hu3wEx03GMEy7DaKD43Vxy9VaaBGxTcYA6wLNFgIvq5oMuqlV8qiI" />
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
                <span className="text-sm font-medium text-on-surface">Real-time</span>
              </div>
            </div>
          </section>

          {/* High-Level Metrics Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-surface-container-lowest p-8 flex flex-col justify-between min-h-[160px] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total Alerts</span>
                  <span className="material-symbols-outlined text-primary/40" data-icon="payments">payments</span>
                </div>
                <div className="text-3xl font-bold tracking-tight">{totalAlerts.toLocaleString()}</div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={`text-xs font-bold ${weeklyChangePct >= 0 ? 'text-primary' : 'text-error'}`}>
                  {weeklyChangePct >= 0 ? '+' : ''}{weeklyChangePct}%
                </span>
                <span className="text-[10px] text-on-surface-variant font-medium">vs last week</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 flex flex-col justify-between min-h-[160px] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Avg Risk ({timeWindow.label})</span>
                  <span className="material-symbols-outlined text-secondary/50" data-icon="monitoring">monitoring</span>
                </div>
                <div className="text-3xl font-bold tracking-tight">{avgRiskPct.toFixed(1)}%</div>
              </div>
              <div className="mt-4 w-full bg-surface-container h-1 rounded-full overflow-hidden">
                <div className="bg-secondary h-full" style={{ width: `${Math.min(100, avgRiskPct)}%` }}></div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 flex flex-col justify-between min-h-[160px] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Flagged Accounts</span>
                  <span className="material-symbols-outlined text-tertiary/40" data-icon="group_work">group_work</span>
                </div>
                <div className="text-3xl font-bold tracking-tight">{flaggedAccounts.toLocaleString()}</div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-bold text-tertiary">Active</span>
                <span className="text-[10px] text-on-surface-variant font-medium">unique accounts</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 flex flex-col justify-between min-h-[160px] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">High Severity Alerts</span>
                  <span className="material-symbols-outlined text-error/40" data-icon="emergency_home">emergency_home</span>
                </div>
                <div className="text-3xl font-bold tracking-tight text-error">{highSeverityAlerts}</div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-1">
                  <div className="w-4 h-4 rounded-full bg-error ring-2 ring-surface"></div>
                  <div className="w-4 h-4 rounded-full bg-error opacity-60 ring-2 ring-surface"></div>
                </div>
                <span className="text-[10px] text-error font-bold">{criticalAlerts} CRITICAL</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 flex flex-col justify-between min-h-[160px] shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Active Cases</span>
                  <span className="material-symbols-outlined text-primary/40" data-icon="search_insights">search_insights</span>
                </div>
                <div className="text-3xl font-bold tracking-tight">{activeCases}</div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${Math.min(100, (activeCases / Math.max(totalAlerts, 1)) * 100)}%` }}></div>
                </div>
                <span className="text-[10px] text-on-surface-variant font-bold whitespace-nowrap">OPEN</span>
              </div>
            </div>
          </section>

          {/* Main Intelligence Hub */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Network Graph (Large) */}
            <div className="lg:col-span-2 bg-surface-container-lowest p-10 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-1">Transaction Network</h3>
                  <p className="text-xs text-on-surface-variant font-medium">
                    Live network from Neo4j • <span className="text-error font-bold">Red edges = Fraud</span>
                    {selectedAccount && <span className="text-primary ml-2">• Highlighting: {selectedAccount}</span>}
                  </p>
                </div>
                <div className="bg-surface-container-highest px-4 py-2 rounded-lg flex items-center gap-4">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant" data-icon="filter_list">filter_list</span>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-on-surface cursor-pointer">
                    <input
                      checked={fraudOnly}
                      className="h-3.5 w-3.5 accent-primary"
                      onChange={(e) => setFraudOnly(e.target.checked)}
                      type="checkbox"
                    />
                    Fraud only
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-on-surface cursor-pointer">
                    <input
                      checked={failedOnly}
                      className="h-3.5 w-3.5 accent-primary"
                      onChange={(e) => setFailedOnly(e.target.checked)}
                      type="checkbox"
                    />
                    Failed only
                  </label>
                </div>
                <div className="flex gap-2">
                  {
                    timeWindowPresets.map((preset, idx) => {
                      return <button key={idx} className={`px-3 py-1 text-[12px] font-bold ${timeWindow.value === preset.value ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}  rounded uppercase`}
                        onClick={() => { setTimeWindow(preset) }}
                      >
                        {preset.label}
                      </button>
                    })
                  }
                  <div className="relative" ref={customPopoverRef}>
                    <button
                      className={`px-3 py-1 text-[12px] font-bold rounded uppercase ${isCustomWindowSelected ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}
                      onClick={() => {
                        setIsCustomPopoverOpen((prev) => !prev);
                        setCustomValidationError('');
                      }}
                      type="button"
                    >
                      Custom
                    </button>
                    {isCustomPopoverOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant/20 rounded-lg shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)] p-4 z-40">
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Custom Window (Max 24h)</p>
                          <div className="grid grid-cols-[1fr_auto] gap-2">
                            <input
                              className="bg-surface-container px-3 py-2 rounded text-xs font-medium text-on-surface border border-transparent focus:border-primary focus:outline-none"
                              max={selectedUnitConfig.max}
                              min="1"
                              onChange={(e) => {
                                setCustomAmount(e.target.value);
                                if (customValidationError) {
                                  setCustomValidationError('');
                                }
                              }}
                              placeholder="Enter value"
                              type="number"
                              value={customAmount}
                            />
                            <select
                              className="bg-surface-container px-3 py-2 rounded text-xs font-bold text-on-surface border border-transparent focus:border-primary focus:outline-none uppercase"
                              onChange={(e) => {
                                setCustomUnit(e.target.value);
                                if (customValidationError) {
                                  setCustomValidationError('');
                                }
                              }}
                              value={customUnit}
                            >
                              {customUnitOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                              ))}
                            </select>
                          </div>
                          {customValidationError && (
                            <p className="text-[10px] font-bold text-error uppercase tracking-tight">{customValidationError}</p>
                          )}
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                              onClick={() => {
                                setIsCustomPopoverOpen(false);
                                setCustomValidationError('');
                              }}
                              type="button"
                            >
                              Cancel
                            </button>
                            <button
                              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded bg-primary text-on-primary hover:bg-primary-container"
                              onClick={applyCustomTimeWindow}
                              type="button"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-[400px] w-full relative border border-outline-variant/20 rounded-lg overflow-hidden flex items-center justify-center bg-surface-container-lowest">
                <GraphView data={graphData} highlightAccount={selectedAccount} />
                {loading && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface-container/80 text-on-surface px-4 py-2 rounded shadow-lg backdrop-blur text-xs font-bold uppercase tracking-widest">Loading Network...</div>}
              </div>
            </div>

            {/* Risk Distribution Donut */}
            <div className="bg-surface-container-lowest p-10 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)]">
              <h3 className="text-xl font-bold tracking-tight mb-1">Risk Distribution</h3>
              <p className="text-xs text-on-surface-variant font-medium mb-10">Assessment of alert risk levels</p>
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-10">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#ECEEF0" strokeWidth="4"></circle>
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#3525CD" strokeDasharray={`${lowPct}, 100`} strokeLinecap="round" strokeWidth="4" transform="rotate(-90 18 18)"></circle>
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#B6B4FF" strokeDasharray={`${mediumPct}, 100`} strokeDashoffset={`-${lowPct}`} strokeLinecap="round" strokeWidth="4" transform="rotate(-90 18 18)"></circle>
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#BA1A1A" strokeDasharray={`${criticalPct}, 100`} strokeDashoffset={`-${lowPct + mediumPct}`} strokeLinecap="round" strokeWidth="4" transform="rotate(-90 18 18)"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-on-surface">{totalAlerts}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Alerts</span>
                  </div>
                </div>
                <div className="w-full space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="font-medium text-on-surface">Low Risk</span>
                    </div>
                    <span className="font-bold">{lowPct}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
                      <span className="font-medium text-on-surface">Medium Risk</span>
                    </div>
                    <span className="font-bold">{mediumPct}%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-error"></div>
                      <span className="font-medium text-on-surface">Critical</span>
                    </div>
                    <span className="font-bold">{criticalPct}%</span>
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
                <p className="text-xs text-on-surface-variant font-medium">
                  <span className="inline-flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Live - {alerts.length} alerts
                    {lastUpdate && <span className="text-on-surface-variant/50 ml-2">• Updated {lastUpdate.toLocaleTimeString()}</span>}
                  </span>
                </p>
              </div>
              <a className="text-xs font-bold text-primary uppercase tracking-widest border-b border-primary/20 pb-1" href="#">Review All Events</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-outline-variant/10">
                  <tr className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
                    <th className="pb-4">Timestamp</th>
                    <th className="pb-4">Txn ID</th>
                    <th className="pb-4">Account</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Level</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Flag Reason</th>
                    <th className="pb-4">Risk Score</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {alerts.length > 0 ? alerts.map((a, i) => {
                    const alertId = a.txn_id || a.id;
                    const isNew = newAlertIds.has(alertId);
                    const isSelected = (a.from || a.account) === selectedAccount;
                    return (
                      <tr key={alertId || i} className={`group transition-all duration-500 ${isNew ? 'bg-primary/10 animate-pulse' : ''} ${isSelected ? 'bg-surface-container-high' : 'hover:bg-surface-container-low'}`}>
                        <td className="py-4 text-xs font-medium text-on-surface whitespace-nowrap">
                          {a.timestamp || a.created_at ? new Date(a.timestamp || a.created_at).toLocaleString() : 'N/A'}
                        </td>
                        <td className="py-4 font-mono text-[10px] text-on-surface-variant">
                          {(a.txn_id || '').substring(0, 12)}{(a.txn_id || '').length > 12 ? '...' : ''}
                        </td>
                        <td className="py-4 font-mono text-xs font-bold text-primary">
                          {(a.from || a.account || '').substring(0, 12)}{(a.from || a.account || '').length > 12 ? '...' : ''}
                        </td>
                        <td className="py-4 text-xs font-bold text-on-surface whitespace-nowrap">
                          ${(a.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-4">
                          {(() => {
                            const riskPct = Math.round((a.risk_score || 0) * 100);
                            return (
                              <span className={`${riskPct > 75 ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'} px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight`}>
                                {a.type || a.alert_type || 'TXN'}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight ${a.level === 'HIGH' ? 'bg-error-container text-on-error-container' :
                            a.level === 'MEDIUM' ? 'bg-tertiary-container text-on-tertiary-container' :
                              'bg-surface-container text-on-surface-variant'
                            }`}>
                            {a.level || 'N/A'}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight ${a.status === 'OPEN' ? 'bg-primary-container text-on-primary-container' :
                            a.status === 'TRUE_POSITIVE' ? 'bg-error-container text-on-error-container' :
                              a.status === 'FALSE_POSITIVE' ? 'bg-surface-container text-on-surface-variant' :
                                'bg-surface-container text-on-surface-variant'
                            }`}>
                            {a.status || 'OPEN'}
                          </span>
                        </td>
                        <td className="py-4 text-xs font-medium text-on-surface-variant max-w-[200px] truncate" title={a.fail_reason || a.explanations?.[0] || ''}>
                          {a.explanations && a.explanations.length > 0 ? a.explanations[0] : (a.fail_reason || 'Anomalous activity')}
                        </td>
                        <td className="py-4">
                          {(() => {
                            const riskPct = Math.round((a.risk_score || 0) * 100);
                            return (
                              <div className="flex items-center gap-2">
                                <div className="w-12 bg-surface-container h-1.5 rounded-full">
                                  <div className={`${riskPct > 75 ? 'bg-error' : riskPct > 50 ? 'bg-tertiary' : 'bg-primary'} h-full rounded-full transition-all`} style={{ width: `${riskPct}%` }}></div>
                                </div>
                                <span className={`text-[10px] font-bold ${riskPct > 75 ? 'text-error' : ''}`}>{riskPct}</span>
                              </div>
                            );
                          })()}
                        </td>
                        <td className="py-4 text-right">
                          <button onClick={() => setSelectedAccount(a.from || a.account)} className="text-primary hover:underline font-bold text-[10px] uppercase tracking-widest">Investigate</button>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="10" className="py-12 text-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-4xl mb-2 block">inbox</span>
                        No alerts found. The system is monitoring for suspicious activity.
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
