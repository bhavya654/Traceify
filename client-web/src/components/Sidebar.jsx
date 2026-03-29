import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
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
                <Link
                    to="/dashboard"
                    className={`${isActive('/dashboard') ? 'bg-[#B6B4FF]/20 text-primary border-r-4 border-primary' : 'text-on-surface/70 hover:bg-surface-container'} transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold`}
                >
                    <span className="material-symbols-outlined mr-4" data-icon="dashboard">dashboard</span>
                    Dashboard
                </Link>
                <Link
                    to="/investigation"
                    className={`${isActive('/investigation') ? 'bg-[#B6B4FF]/20 text-primary border-r-4 border-primary' : 'text-on-surface/70 hover:bg-surface-container'} transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold`}
                >
                    <span className="material-symbols-outlined mr-4" data-icon="security">security</span>
                    Investigations
                </Link>
                <a className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold" href="#">
                    <span className="material-symbols-outlined mr-4" data-icon="warning">warning</span>
                    Alerts
                </a>
                <Link
                    to="/transactions"
                    className={`${isActive('/transactions') ? 'bg-[#B6B4FF]/20 text-primary border-r-4 border-primary' : 'text-on-surface/70 hover:bg-surface-container'} transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold`}
                >
                    <span className="material-symbols-outlined mr-4" data-icon="payments">payments</span>
                    Transactions
                </Link>
                <Link
                    to="/reports"
                    className={`${isActive('/reports') ? 'bg-[#B6B4FF]/20 text-primary border-r-4 border-primary' : 'text-on-surface/70 hover:bg-surface-container'} transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold`}
                >
                    <span className="material-symbols-outlined mr-4" data-icon="analytics">analytics</span>
                    Reports
                </Link>
                <a className="text-on-surface/70 hover:bg-surface-container transition-all flex items-center px-6 py-4 font-manrope text-xs uppercase tracking-widest font-bold" href="#">
                    <span className="material-symbols-outlined mr-4" data-icon="settings">settings</span>
                    Settings
                </a>
            </nav>

            <div className="px-6 mb-6">
                <Link
                    to="/investigation"
                    className="block w-full bg-primary text-on-primary py-3 rounded-lg text-center font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-colors"
                >
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
    );
};

export default Sidebar;