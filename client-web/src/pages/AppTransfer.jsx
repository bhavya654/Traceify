import React from 'react';
import { Link } from 'react-router-dom';

const AppTransfer = () => {
  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen">
      {/* Top Navigation Header */}
      <header className="bg-surface-container-low dark:bg-slate-800 flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/app" className="hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors p-2 rounded-full active:scale-95 duration-150 relative -left-2">
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">arrow_back</span>
          </Link>
          <h1 className="font-manrope font-black tracking-tight text-blue-600 dark:text-blue-400 text-xl">Transfer</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-tertiary-container/10 rounded-full">
          <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          <span className="text-tertiary font-label text-[11px] font-bold tracking-wide">SECURE TRANSFER</span>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 pt-8 pb-32 space-y-8">
        {/* From Account Section */}
        <section className="space-y-3">
          <span className="font-label text-xs font-bold text-outline tracking-widest uppercase">FROM ACCOUNT</span>
          <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/15 flex items-center justify-between group cursor-pointer hover:bg-surface-container-low transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-on-surface tracking-tight">Savings Account</h3>
                <p className="font-label text-sm text-on-surface-variant">....4532 • Available: <span className="font-semibold text-primary">$12,450.00</span></p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline">expand_more</span>
          </div>
        </section>

        {/* To Account / Contact Selector */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="font-label text-xs font-bold text-outline tracking-widest uppercase">TO CONTACT</span>
            <button className="text-primary font-label text-xs font-bold hover:underline">Manage Contacts</button>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 placeholder:text-outline/60 text-sm" 
              placeholder="Name, @handle, or account number" 
              type="text" 
            />
          </div>

          {/* Recent Contacts Bento-ish Grid */}
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <button className="flex-shrink-0 flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center border-2 border-dashed border-outline-variant group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-outline group-hover:text-primary">add</span>
              </div>
              <span className="text-[11px] font-medium">New</span>
            </button>

            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <img 
                className="w-14 h-14 rounded-full object-cover p-0.5 border-2 border-primary" 
                data-alt="User profile photo of a smiling man" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfVzjUdzIyiEoLaGHGplWcj4obT9PLJElYKuBVL_Hxn2c5rVTfSksmjIyD9cdiiSf6tn768PqU8urcPyTz83h8daVrLGQH4-_xgo5OdAYW74nnIKhLF9pPyc9XbMRj-5Ow9xfSfw1VkNoH1DVzQ_r3j4BlNqA3VqYPuesrAyaX0eUUph27p_smIvxGTv1UTdStbDHNt621O96Nc3xHZdDbvPrJHhpmpWkrN9kbbwHeEL3_VZof2Nk1ifyjjUl-kbiPo3jB6bzhfek" 
                alt="Alex M."
              />
              <span className="text-[11px] font-medium">Alex M.</span>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <img 
                className="w-14 h-14 rounded-full object-cover p-0.5 border-2 border-transparent" 
                data-alt="User profile photo of a woman with glasses" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLL7_jZBd5z_I6I2o_DrIUOTAPPMDSOdqfP8gj9CY3Er_XVm92gI55ZzjkA2inkNhSkDrjaAzJ-L5nnElqsBmrvrangM2iE5bKGTtb3EruE53ERVpttT8iQfebgOrPNDM50I7KJu3A-Wf_YWCMQhiJUKQ2PJT0I4RJvd5hvIMgLdzS6OpYkcXBsWFI17k42HhWPcYBkru-eoBIXe6qicVmeT1r8IH2rTY4KCISgA1SSXm4REOedDIC2aZQSQ4u7vyfLgH7D9oS0I4" 
                alt="Sarah W."
              />
              <span className="text-[11px] font-medium">Sarah W.</span>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-white font-bold">JD</div>
              <span className="text-[11px] font-medium">John D.</span>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <img 
                className="w-14 h-14 rounded-full object-cover p-0.5 border-2 border-transparent" 
                data-alt="User profile photo of a person in a hat" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxBnmmnGmIS60nC2NSqamCOzRN0gkppcj0nNgSajD63bQ3O_Wu6ezZwgFVZPTnN4XM9xYdTor5dN_iOUdVCNgXxGn_BuEIfwcTqRKGjDpBvBmWvSDquQcaa5RFKKq9WFw8Ac4AFrbQER2OACOXtX-VBRhRZFFJnCifWrSs_Zz6SoL7zo6L41AXFv8fbilRVXbmFMKaIJQ2dJO8G69Yt1Ycmxln9AMvfY-cVgvo9OZd4CeuCw5NnnBURiJNK0Q5wbJooXj1MFufNg4" 
                alt="Mike R."
              />
              <span className="text-[11px] font-medium">Mike R.</span>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}} />
        </section>

        {/* Amount Input Section */}
        <section className="flex flex-col items-center justify-center py-6 space-y-2">
          <span className="font-label text-xs font-bold text-outline tracking-widest uppercase">ENTER AMOUNT</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-manrope font-extrabold text-on-surface-variant">$</span>
            <input 
              className="w-full text-center text-6xl font-manrope font-extrabold tracking-tighter text-on-surface border-none bg-transparent focus:ring-0 p-0 max-w-[300px]" 
              type="text" 
              value="1,250.00" 
              readOnly
            />
          </div>
          <div className="px-3 py-1 bg-surface-container rounded-full flex items-center gap-2">
            <span className="text-xs font-medium text-on-surface-variant">Fee:</span>
            <span className="text-xs font-bold text-tertiary">$0.00</span>
          </div>
        </section>

        {/* Note Input */}
        <section className="space-y-3">
          <div className="bg-surface-container-low rounded-[1rem] p-1 flex items-center gap-3 px-4">
            <span className="material-symbols-outlined text-outline text-lg">notes</span>
            <input 
              className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 placeholder:text-outline/50" 
              placeholder="Add a note (Optional)" 
              type="text" 
            />
          </div>
        </section>

        {/* Custom Numeric Keypad (UI Only) */}
        <section className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
            <button key={num} className="h-14 flex items-center justify-center font-headline text-xl font-bold hover:bg-surface-container transition-colors rounded-lg">
              {num}
            </button>
          ))}
          <button className="h-14 flex items-center justify-center font-headline text-xl font-bold hover:bg-surface-container transition-colors rounded-lg">
            <span className="material-symbols-outlined">backspace</span>
          </button>
        </section>
      </main>

      {/* Fixed Action Button at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
        <div className="max-w-xl mx-auto">
          <Link to="/app/success" className="w-full bg-gradient-to-br from-primary to-secondary text-white font-manrope font-bold text-lg py-4 rounded-full shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3">
            <span>Send Money</span>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppTransfer;
