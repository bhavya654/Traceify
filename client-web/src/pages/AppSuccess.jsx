import React from 'react';
import { Link } from 'react-router-dom';

const AppSuccess = () => {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        .liquid-gradient {
            background: linear-gradient(135deg, #0058be 0%, #6b38d4 100%);
        }
        .success-glow {
            filter: drop-shadow(0 0 20px rgba(0, 105, 71, 0.2));
        }
      `}} />

      {/* Success Celebration Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-tertiary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Main Success Canvas */}
      <main className="relative w-full max-w-lg z-10">
        
        {/* Celebratory Icon Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 bg-tertiary-container/10 rounded-full flex items-center justify-center success-glow mb-6 relative">
            {/* Inner Pulse Effect */}
            <div className="absolute inset-0 rounded-full bg-tertiary/10 animate-ping opacity-20"></div>
            <span className="material-symbols-outlined text-tertiary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-center tracking-tight text-on-surface mb-2 px-4">
            $500.00 Sent Successfully
          </h1>
          <p className="font-label text-on-surface-variant tracking-wide mt-2">Transaction completed on Oct 24, 2023 • 10:42 AM</p>
        </div>

        {/* Receipt Card (Liquid Vault Architecture) */}
        <div className="bg-surface-container-lowest rounded-[2rem] p-8 mb-8 shadow-[0_32px_64px_rgba(25,28,30,0.04)] relative overflow-hidden group">
          {/* Subtle Texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-lowest to-surface-container-low opacity-50 pointer-events-none"></div>
          
          <div className="relative space-y-8">
            {/* Receiver Profile */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-headline font-bold text-xl overflow-hidden">
                <img 
                  alt="Receiver profile picture" 
                  className="w-full h-full object-cover" 
                  data-alt="Portrait of a smiling professional male receiver" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSue8HOd2mWPQnr6oUCYtWwrj3pdxjvRtS4Lh4G9gqwmz8WY0klvVrtCEBAcueRTutejIwViQPeyl0sA3CWmZeen3tezCBJOVqmO6W9J0F1lVZwsjG_t9NFlbHKWIZBLPEBu5nRhEIW28PSONtQxrIB2Vy9zRai3cAYoHoW1g-ZWKfhMOsdI05E4EiM8Igf_88C5GK6imtSILUommZ0tv5ifU2Mqs8Bw5CgbkrddcbHcKlV_0kBaB6brsFHUJOsNNPtm2dMtiM1do"
                />
              </div>
              <div>
                <p className="text-on-surface-variant font-label uppercase tracking-widest text-[10px]">Receiver</p>
                <h3 className="font-headline font-bold text-xl text-on-surface tracking-tight">Jordan Sterling</h3>
                <p className="text-on-surface-variant text-sm font-medium">Chase Bank • •••• 8821</p>
              </div>
            </div>

            {/* Transaction Metadata Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low/50 rounded-2xl p-4 transition-colors hover:bg-surface-container-high/50">
                <p className="text-on-surface-variant font-label text-[11px] uppercase tracking-wider mb-2">Status</p>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-3 rounded-full bg-tertiary"></span>
                  <p className="font-headline font-bold text-on-surface text-lg">Completed</p>
                </div>
              </div>
              <div className="bg-surface-container-low/50 rounded-2xl p-4 transition-colors hover:bg-surface-container-high/50">
                <p className="text-on-surface-variant font-label text-[11px] uppercase tracking-wider mb-2">Method</p>
                <p className="font-headline font-bold text-on-surface text-lg">Wallet Balance</p>
              </div>
              <div className="col-span-2 bg-surface-container-low/50 rounded-2xl p-4 transition-colors hover:bg-surface-container-high/50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-on-surface-variant font-label text-[11px] uppercase tracking-wider mb-2">Transaction ID</p>
                    <p className="font-body font-mono text-sm text-on-surface">TXN-8821-4490-332X</p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-on-secondary-container">
                    <span className="material-symbols-outlined text-[20px] text-primary">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Matrix */}
        <div className="flex flex-col space-y-3 px-2">
          <Link to="/app" className="liquid-gradient w-full py-4 rounded-xl font-headline font-bold text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center">
            Done
          </Link>
          <button className="w-full py-4 rounded-xl font-headline font-bold text-primary bg-transparent outline-variant border-[1.5px] border-outline-variant/30 hover:bg-surface-container hover:border-outline-variant transition-all">
            View Details
          </button>
        </div>

        {/* Footnote */}
        <p className="mt-12 text-center text-on-surface-variant/60 font-label text-xs max-w-[280px] mx-auto leading-relaxed">
          Funds are usually available within seconds. For security, this transaction is protected by 256-bit encryption.
        </p>
      </main>

      {/* Success Confetti Elements (Abstract CSS implementation) */}
      <div className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-tertiary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-1 bg-secondary rotate-45 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary rounded-sm rotate-12" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-tertiary-fixed rounded-full" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute bottom-1/3 right-10 w-2 h-2 bg-secondary-container rounded-sm -rotate-12" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

export default AppSuccess;
