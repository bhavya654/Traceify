import React from 'react';
import { Link } from 'react-router-dom';

const AppDashboard = () => {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="bg-[#f7f9fb] flex justify-between items-center px-6 py-4 w-full docked full-width top-0 sticky z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden">
            <img
              alt="User profile photo"
              className="w-full h-full object-cover"
              data-alt="Close up portrait of a smiling user"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmVeo76xYnLJA9E0hQuMIIfqYOftnl8kf_-R8tiGcGIJhV65U2KUQLaVgAcTUp9PjNFgvzf9vB7wfiZfWL-B3Mipyv41R_L4Cc-bahzGwmSP9jorSSmreYqcl_o3svRm6wBo4qSNDORQSCtJR9gi0ph3Xqfu00iUZsOC4Qm2Gs-llUo4oz5-E_h0GRWeD-XcvckH9oNa4RmCO-Nqm9sM8-8Sw6wZapWTrdK-_WRcsKMOMRk4E4a-zVBbCXWPzB1lnmi4Au-9aOTTI"
            />
          </div>
          <h1 className="font-headline tracking-tight text-on-surface font-extrabold text-lg">Good Morning</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors active:scale-95 duration-150">
          <span className="material-symbols-outlined text-blue-600">notifications</span>
        </button>
      </header>

      <main className="px-6 space-y-8 max-w-2xl mx-auto pt-4">
        {/* Greeting Section */}
        <section>
          <h2 className="font-headline text-headline-md font-extrabold tracking-tight">Hi, User 👋</h2>
          <p className="text-on-surface-variant font-label text-label-md">Welcome back to your digital vault.</p>
        </section>

        {/* Large Account Balance Card (Hero) */}
        <section className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-gradient-to-br from-primary to-secondary p-8 rounded-[2rem] shadow-xl overflow-hidden min-h-[200px] flex flex-col justify-between" style={{ borderRadius: '24px' }}>
            {/* Abstract visual elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div>
              <span className="text-on-primary/80 font-label text-label-md uppercase tracking-widest">Available Balance</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline text-display-lg font-black text-on-primary tracking-tight text-4xl">$12,450.00</span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-12">
              <div className="glass-card bg-white/20 px-4 py-2 rounded-full border border-white/10">
                <span className="text-on-primary text-xs font-medium tracking-wide">**** 4421</span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm"></div>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Action Grid (Bento Style) */}
        <section className="grid grid-cols-2 gap-4">
          <Link to="/app/transfer" className="bg-surface-container-lowest p-5 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-blue-50 transition-all active:scale-95 group shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined">send</span>
            </div>
            <span className="font-body font-semibold text-sm">Send Money</span>
          </Link>
          <button className="bg-surface-container-lowest p-5 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-blue-50 transition-all active:scale-95 group shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined">request_quote</span>
            </div>
            <span className="font-body font-semibold text-sm">Request Money</span>
          </button>
          <button className="bg-surface-container-lowest p-5 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-blue-50 transition-all active:scale-95 group shadow-sm">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center group-hover:bg-tertiary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined">qr_code_scanner</span>
            </div>
            <span className="font-body font-semibold text-sm">Scan &amp; Pay</span>
          </button>
          <button className="bg-surface-container-lowest p-5 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-blue-50 transition-all active:scale-95 group shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <span className="font-body font-semibold text-sm">Bill Pay</span>
          </button>
        </section>

        {/* Recent Transactions */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-headline text-title-lg font-bold tracking-tight">Recent Transactions</h3>
            <button className="text-primary font-label font-semibold text-sm hover:underline">See All</button>
          </div>
          <div className="space-y-3">
            {/* Transaction Item 1 */}
            <div className="bg-surface-container-lowest p-4 rounded-[1.5rem] flex items-center justify-between hover:bg-surface-container transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
                  <img
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                    data-alt="Portrait of a young male professional"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxwkbjWUdP5kHNnabxtMvWLXEyfbKDZPLlSsU46ZR4KQBJ5IG_dSJ044TvvbPh8a-T_jjZMQmiP9jutAzwZnW54HDRvTi3ahM1xIO-XzpclMeH1ECienN0nfsT-gCYn4SjjMpchDDAasn46vy52saf9uqBWP7dKit9camQJI1puwl7WBCO9Qjkqxee07mlJBaGL6i8gUOBeJnMWMI1ed88LDLLyi7A-IJ_taCGrkOcc_QMTvQ_J71RaoiMyddh31OLP9p2UP1PAaA"
                  />
                </div>
                <div>
                  <p className="font-body font-bold text-on-surface">Alex Thompson</p>
                  <p className="font-label text-xs text-on-surface-variant">Oct 24, 2023</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-on-surface">-$120.00</p>
                <p className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">Food &amp; Drink</p>
              </div>
            </div>

            {/* Transaction Item 2 */}
            <div className="bg-surface-container-lowest p-4 rounded-[1.5rem] flex items-center justify-between hover:bg-surface-container transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="font-body font-bold text-on-surface">Weekly Salary</p>
                  <p className="font-label text-xs text-on-surface-variant">Oct 23, 2023</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-tertiary">+$2,450.00</p>
                <p className="font-label text-[10px] uppercase tracking-wider text-tertiary">Deposit</p>
              </div>
            </div>

            {/* Transaction Item 3 */}
            <div className="bg-surface-container-lowest p-4 rounded-[1.5rem] flex items-center justify-between hover:bg-surface-container transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
                  <img
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                    data-alt="Portrait of a young woman smiling"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsT_F2Kbb0Y6YMj2W1KlR0s7FzW7aN5OPXRDO9WxL4uHSxBvf5bEpWOGzjT4LtXi_qA0FKfJqNuDM-nw_qscEoBLC7OR7xxSbPZ0HnuCGLnXt1vVqBvZ6B5ZQ0WF2_bQILDGW-LVvavLDJJmCQwHFLTJgLJms9VXeozBJ-OPg1F_wfELtIVyFI8cYfgMquIejy6V9veqrL5YTCQK0I4-3UCQQTjItdJE3zzEsPZQcPTzBTtftrzE9IjcKBSOvVKssI5jX-hsck7sA"
                  />
                </div>
                <div>
                  <p className="font-body font-bold text-on-surface">Sarah Jenkins</p>
                  <p className="font-label text-xs text-on-surface-variant">Oct 22, 2023</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-on-surface">-$45.50</p>
                <p className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant">Utilities</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 flex justify-around items-center py-2 px-4 bg-white/70 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_32px_64px_rgba(25,28,30,0.08)]">
        <Link to="/app" className="flex flex-col items-center justify-center bg-blue-600 text-white rounded-full h-12 w-12 hover:bg-blue-700 active:scale-90 transition-all duration-200">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="hidden">Home</span>
        </Link>
        <Link to="/app/transfer" className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-500 transition-all px-4">
          <span className="material-symbols-outlined">payments</span>
          <span className="font-inter text-[11px] font-medium tracking-wide">Pay</span>
        </Link>
        <Link to="/app/history" className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-500 transition-all px-4">
          <span className="material-symbols-outlined">history</span>
          <span className="font-inter text-[11px] font-medium tracking-wide">History</span>
        </Link>
        <Link to="/app/profile" className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-500 transition-all px-4">
          <span className="material-symbols-outlined">person</span>
          <span className="font-inter text-[11px] font-medium tracking-wide">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default AppDashboard;
