import React from 'react';
import { Link } from 'react-router-dom';

const AppProfile = () => {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
      <style dangerouslySetInnerHTML={{__html: `
        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
        }
      `}} />

      {/* TopAppBar */}
      <header className="bg-[#f7f9fb] dark:bg-slate-900 flex justify-between items-center px-6 py-4 w-full docked full-width top-0 sticky z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-surface-container-lowest">
            <img 
              alt="User profile photo" 
              className="w-full h-full object-cover" 
              data-alt="Portrait of a smiling professional male user" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxYWSbfwqD8uuUWdqyBBfKoJefnmVYXiL5iZ2ESO2Ix8CwqGdXSchGO7PcncCgFw7QVM9Ml3QEUHDJDEVU80XOpHN_R0Kj3dLYqTYMhYAu7CTchfaD8AwVE9OskFVjY8LcTX9Io8kzVTbIUaXHo6fzlhu2tAEVmYNCWeu70pwe8Ts8DvPH2ivSJ5yhgKO-7KdzuiGWrpxt7Nye5xWtvacWEmJF4XmbOaoyGBPpgDSYJNwPj9qB-0outnpE8agXEmCWjvECEs4Kijc"
            />
          </div>
          <h1 className="font-manrope tracking-tight text-on-surface font-extrabold text-xl">Good Morning</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors p-2 rounded-full active:scale-95 duration-150">
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">notifications</span>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-8 pb-32">
        {/* Hero Profile Section */}
        <section className="mb-10 text-center flex flex-col items-center">
          <div className="relative mb-4 group">
            <div className="w-32 h-32 rounded-xl bg-surface-container-lowest p-1 shadow-xl rounded-2xl">
              <img 
                className="w-full h-full object-cover rounded-xl" 
                data-alt="High resolution profile picture of a young man" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPadc-8YZBJIFtA3k128e9UY57fReQr_P6XefYzJIlZ73DVmoLuZLgdo24hPbZItHIvzfNOqTjPi1osX_oWRdiT_JEoCFDxPPUrqHEUAowg1tfGf19fgmAS5gQhhd9NyOgRJu3cE6-XswjYkRDkdvGVm8TTDScC6T2E2qzOpcJRYmsJebKkrxyBjpBjB3R8-q2ByTUvvKxsqgROyiu7_PDyLR6_FzJJo2S3L-eO3PLvXEwpJA6c27TEpkn0d2-f8tK6Tq6Ezvzd6E"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-lg border-4 border-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">edit</span>
            </div>
          </div>
          <h2 className="font-headline font-extrabold text-3xl tracking-tight text-on-surface">Alex Thompson</h2>
          <p className="font-body text-on-surface-variant mt-1">alex.thompson@premium-fintech.com</p>
          <div className="mt-6 flex gap-3">
            <span className="bg-tertiary-container/10 text-tertiary px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              Verified Member
            </span>
            <span className="bg-secondary-container/10 text-secondary px-4 py-1.5 rounded-full text-xs font-semibold">
              Gold Tier
            </span>
          </div>
        </section>

        {/* Premium Bento Stats */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-surface-container-lowest p-6 rounded-3xl flex flex-col justify-between aspect-square md:aspect-auto">
            <span className="material-symbols-outlined text-primary mb-4 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            <div>
              <p className="text-label-md text-on-surface-variant font-medium">Total Balance</p>
              <p className="font-headline font-bold text-2xl tracking-tight">$42,950.00</p>
            </div>
          </div>
          <div className="bg-primary text-on-primary p-6 rounded-3xl flex flex-col justify-between aspect-square md:aspect-auto shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-on-primary-container mb-4 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <div>
              <p className="text-label-md opacity-80 font-medium">Rewards Points</p>
              <p className="font-headline font-bold text-2xl tracking-tight">12,480</p>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="space-y-4">
          <h3 className="font-headline font-bold text-lg px-2 text-on-surface-variant">Account Management</h3>
          <div className="bg-surface-container-low rounded-[2rem] overflow-hidden py-2">
            
            {/* Linked Bank Accounts */}
            <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-high transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-surface-container-lowest transition-colors">
                  <span className="material-symbols-outlined text-primary">account_balance</span>
                </div>
                <div className="text-left">
                  <span className="font-body font-semibold text-on-surface block">Linked Bank Accounts</span>
                  <span className="text-xs text-on-surface-variant">3 Accounts connected</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </button>

            {/* Security & Privacy */}
            <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-high transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-surface-container-lowest transition-colors">
                  <span className="material-symbols-outlined text-primary">shield_person</span>
                </div>
                <div className="text-left">
                  <span className="font-body font-semibold text-on-surface block">Security &amp; Privacy</span>
                  <span className="text-xs text-on-surface-variant">Biometrics &amp; 2FA enabled</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </button>

            {/* App Settings */}
            <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-high transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-surface-container-lowest transition-colors">
                  <span className="material-symbols-outlined text-primary">settings</span>
                </div>
                <div className="text-left">
                  <span className="font-body font-semibold text-on-surface block">App Settings</span>
                  <span className="text-xs text-on-surface-variant">Notifications &amp; Theme</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </button>

            {/* Help & Support */}
            <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-high transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-surface-container-lowest transition-colors">
                  <span className="material-symbols-outlined text-primary">support_agent</span>
                </div>
                <div className="text-left">
                  <span className="font-body font-semibold text-on-surface block">Help &amp; Support</span>
                  <span className="text-xs text-on-surface-variant">24/7 Chat available</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Logout & Security Badge */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <button className="w-full py-4 bg-surface-container-high text-error font-headline font-bold rounded-full flex items-center justify-center gap-2 hover:bg-error-container hover:text-error transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
          <div className="flex items-center gap-2 bg-surface-container-low px-6 py-3 rounded-full border border-outline-variant/10">
            <span className="material-symbols-outlined text-tertiary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-xs font-medium text-on-surface-variant tracking-wide">Securely protected by 256-bit encryption</span>
          </div>
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
        <Link to="/app/history" className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-4 hover:text-blue-500 transition-all active:scale-90 duration-200">
          <span className="material-symbols-outlined">history</span>
          <span className="font-inter text-[11px] font-medium tracking-wide">History</span>
        </Link>
        <Link to="/app/profile" className="flex flex-col items-center justify-center bg-blue-600 text-white rounded-full h-12 w-12 active:scale-90 duration-200 shadow-lg">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          <span className="sr-only">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default AppProfile;
