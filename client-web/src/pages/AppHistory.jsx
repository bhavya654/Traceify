import React from 'react';
import { Link } from 'react-router-dom';

const AppHistory = () => {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="bg-[#f7f9fb] dark:bg-slate-900 fixed top-0 left-0 right-0 z-40">
        <div className="flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
              <img 
                alt="User profile" 
                className="w-full h-full object-cover" 
                data-alt="Portrait of a young professional man" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_kW1SBUoIdG1zs7BV7Hy7_vUT1HMg-9M7tPYMqbSTu0HqaYpd5bugdET59PgSW3C1RAVqMqEgol7Jb4EcY5ssAlzJXUxf32v72doRBzuEhj_bw5h7vP8d1zyFdZPSNfDRCML-Q_ufGdTIRPaxY7iHyBcr8mnpPUcLctJLKIdREGLVB3tayhrLU41OyIZMNMc_rTFtWveTra1uo_wKmr-IwmAZoiUHCCynb6o9-NONg9hWbc_H0xAvZfB4t7WDMldnCyC3HFpPEq4"
              />
            </div>
            <h1 className="font-manrope tracking-tight text-on-surface font-black text-xl">History</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors text-blue-600 dark:text-blue-400">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mt-20 px-6">
        {/* Search and Filter Section */}
        <section className="mb-8 space-y-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-none rounded-2xl focus:ring-2 focus:ring-primary text-body-md placeholder:text-outline outline-none" 
              placeholder="Search transactions..." 
              type="text"
            />
          </div>
          {/* Filter Tabs */}
          <div className="flex p-1 bg-surface-container rounded-full w-fit">
            <button className="px-6 py-2 rounded-full bg-surface-container-lowest shadow-sm text-primary font-semibold text-sm">All</button>
            <button className="px-6 py-2 rounded-full text-on-surface-variant font-medium text-sm hover:text-primary transition-colors">Sent</button>
            <button className="px-6 py-2 rounded-full text-on-surface-variant font-medium text-sm hover:text-primary transition-colors">Received</button>
          </div>
        </section>

        {/* Transaction Feed */}
        <div className="space-y-10">
          {/* Group: Today */}
          <section>
            <h2 className="font-headline font-bold text-label-md uppercase tracking-widest text-outline mb-4">Today</h2>
            <div className="space-y-4">
              {/* Transaction Item: Received */}
              <div className="bg-surface-container-lowest p-4 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_downward</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface tracking-tight">Elena Gilbert</h3>
                    <p className="text-label-md text-on-surface-variant">12:45 PM • Success</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-headline font-extrabold text-tertiary text-lg">+$1,240.00</p>
                </div>
              </div>

              {/* Transaction Item: Sent */}
              <div className="bg-surface-container-lowest p-4 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_upward</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface tracking-tight">Apple Store</h3>
                    <p className="text-label-md text-on-surface-variant">09:12 AM • Success</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-headline font-extrabold text-error text-lg">-$899.00</p>
                </div>
              </div>
            </div>
          </section>

          {/* Group: Yesterday */}
          <section>
            <h2 className="font-headline font-bold text-label-md uppercase tracking-widest text-outline mb-4">Yesterday</h2>
            <div className="space-y-4">
              {/* Transaction Item: Pending */}
              <div className="bg-surface-container-lowest p-4 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface tracking-tight">Stefan Salvatore</h3>
                    <p className="text-label-md text-on-surface-variant">04:30 PM • Pending</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-headline font-extrabold text-on-surface-variant text-lg">-$250.00</p>
                </div>
              </div>

              {/* Transaction Item: Received */}
              <div className="bg-surface-container-lowest p-4 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_downward</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface tracking-tight">Wealthfront Div</h3>
                    <p className="text-label-md text-on-surface-variant">01:15 PM • Success</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-headline font-extrabold text-tertiary text-lg">+$45.20</p>
                </div>
              </div>

              {/* Transaction Item: Sent */}
              <div className="bg-surface-container-lowest p-4 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface tracking-tight">Whole Foods</h3>
                    <p className="text-label-md text-on-surface-variant">10:05 AM • Success</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-headline font-extrabold text-error text-lg">-$124.50</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 flex justify-around items-center py-2 px-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_32px_64px_rgba(25,28,30,0.08)]">
        <Link to="/app" className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-4 hover:text-blue-500 transition-all active:scale-90 duration-200">
          <span className="material-symbols-outlined">home</span>
          <span className="font-inter text-[11px] font-medium tracking-wide">Home</span>
        </Link>
        <Link to="/app/transfer" className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-4 hover:text-blue-500 transition-all active:scale-90 duration-200">
          <span className="material-symbols-outlined">payments</span>
          <span className="font-inter text-[11px] font-medium tracking-wide">Pay</span>
        </Link>
        <Link to="/app/history" className="flex flex-col items-center justify-center bg-blue-600 text-white rounded-full h-12 w-12 shadow-lg active:scale-90 duration-200">
          <span className="material-symbols-outlined">history</span>
          <span className="font-inter text-[11px] font-medium tracking-wide hidden">History</span>
        </Link>
        <Link to="/app/profile" className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-4 hover:text-blue-500 transition-all active:scale-90 duration-200">
          <span className="material-symbols-outlined">person</span>
          <span className="font-inter text-[11px] font-medium tracking-wide">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default AppHistory;
