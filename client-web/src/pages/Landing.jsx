import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-[#191C1E] font-sans selection:bg-[#3525CD]/20 selection:text-[#3525CD] overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-12 py-6 border-b border-black/5">
        <div className="text-xl font-bold tracking-tight">
          Forensic Intelligence Lab
        </div>
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-black/60">
          <a href="#features" className="hover:text-black transition-colors">Features</a>
          <a href="#methodology" className="hover:text-black transition-colors">Methodology</a>
          <a href="#solutions" className="hover:text-black transition-colors">Solutions</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-sm font-medium text-black/60 hover:text-black transition-colors">Login</Link>
          <Link to="/signup" className="bg-[#3525CD] text-white px-6 py-2.5 rounded text-sm font-bold tracking-wide hover:bg-[#2c1eb0] transition-colors shadow-lg shadow-[#3525CD]/20">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-12 pt-24 pb-32 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 pr-8">
          <div className="inline-flex items-center space-x-2 bg-[#F3F2FF] text-[#3525CD] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#3525CD]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3525CD] animate-pulse"></span>
            <span>Live Intelligence Feed</span>
          </div>
          
          <h1 className="text-6xl lg:text-[72px] font-medium leading-[1.05] tracking-tight text-[#191C1E]">
            Surface Truth in<br />
            <span className="italic text-[#3525CD] font-serif pr-2">Complex</span><br />
            Financial Flows
          </h1>
          
          <p className="text-lg text-black/60 max-w-lg leading-relaxed font-light">
            A clinical-grade intelligence platform for forensic investigators. Track, visualize, and report on money laundering and financial fraud with unprecedented precision.
          </p>
          
          <div className="flex items-center space-x-4 pt-4">
            <Link to="/login" className="bg-[#3525CD] text-white px-8 py-4 rounded text-sm font-bold tracking-wide hover:bg-[#2c1eb0] transition-colors shadow-xl shadow-[#3525CD]/30 flex items-center space-x-2">
              <span>Initiate Investigation</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <a href="#methodology" className="bg-[#F3F4F6] text-[#191C1E] px-8 py-4 rounded text-sm font-bold tracking-wide hover:bg-[#E5E7EB] transition-colors inline-block text-center">
              View Methodology
            </a>
          </div>
        </div>

        {/* Hero Graphic Container */}
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#1E2024] to-[#0A0B0E] rounded-2xl p-6 shadow-2xl shadow-black/10 overflow-hidden border border-white/10 ring-1 ring-black/5">
          {/* Top Bar inside graphic */}
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">Graph Node Analysis [V9.4]</div>
          </div>
          
          {/* Abstract Node Network SVG */}
          <div className="absolute inset-0 flex items-center justify-center opacity-80" style={{ perspective: '800px' }}>
             <svg className="w-[120%] h-[120%] opacity-80 animate-[spin_120s_linear_infinite]" viewBox="0 0 400 300" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(20deg)' }}>
               {/* Connections */}
               <path d="M100,150 L200,100 L300,150 L200,200 Z" stroke="rgba(182, 180, 255, 0.3)" strokeWidth="1" fill="none" />
               <path d="M50,100 L100,150 L150,50 L200,100" stroke="rgba(182, 180, 255, 0.4)" strokeWidth="1" fill="none" />
               <path d="M200,100 L250,50 L300,150 L350,100" stroke="rgba(182, 180, 255, 0.2)" strokeWidth="1" fill="none" />
               <path d="M150,250 L200,200 L250,250 L300,150" stroke="rgba(182, 180, 255, 0.5)" strokeWidth="1" fill="none" />
               <path d="M50,200 L100,150 L150,250" stroke="rgba(182, 180, 255, 0.3)" strokeWidth="1" fill="none" />
               <path d="M300,150 L350,200" stroke="rgba(182, 180, 255, 0.2)" strokeWidth="1" fill="none" />
               <path d="M150,50 L250,50" stroke="rgba(182, 180, 255, 0.4)" strokeWidth="1" fill="none" />
               <path d="M150,250 L250,250" stroke="rgba(53, 37, 205, 0.6)" strokeWidth="1.5" fill="none" />
               
               {/* Nodes */}
               <circle cx="100" cy="150" r="3" fill="#B6B4FF" className="animate-pulse" />
               <circle cx="200" cy="100" r="4" fill="#FFFFFF" />
               <circle cx="300" cy="150" r="3" fill="#B6B4FF" />
               <circle cx="200" cy="200" r="5" fill="#3525CD" className="animate-pulse" />
               <circle cx="50" cy="100" r="2" fill="#FFFFFF" opacity="0.5" />
               <circle cx="150" cy="50" r="3" fill="#B6B4FF" opacity="0.8" />
               <circle cx="250" cy="50" r="2" fill="#FFFFFF" opacity="0.6" />
               <circle cx="350" cy="100" r="2" fill="#B6B4FF" opacity="0.4" />
               <circle cx="150" cy="250" r="4" fill="#3525CD" />
               <circle cx="250" cy="250" r="3" fill="#B6B4FF" />
               <circle cx="50" cy="200" r="2" fill="#FFFFFF" opacity="0.3" />
               <circle cx="350" cy="200" r="3" fill="#B6B4FF" opacity="0.7" />
             </svg>
             <div className="absolute inset-0 bg-gradient-to-t from-[#1E2024] via-transparent to-transparent"></div>
          </div>

          {/* Floating UI Elements */}
          <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur shadow-2xl rounded-lg p-4 flex items-center space-x-4 border border-white/20 animate-[bounce_6s_infinite] pr-12">
            <div>
              <div className="text-[8px] font-bold uppercase tracking-widest text-[#3525CD] mb-1">Active Investigation</div>
              <div className="text-sm font-mono font-bold text-[#191C1E]">Operation_Cobalt_Blue</div>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 bg-[#3525CD] shadow-lg shadow-[#3525CD]/40 rounded-lg p-4 flex items-center justify-center animate-[bounce_5s_infinite_0.5s]">
            <span className="material-symbols-outlined text-white" data-icon="bar_chart">bar_chart</span>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section id="features" className="bg-[#F6F7F9] py-16 border-y border-black/5 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-12 grid grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40 mb-3">Processed Flow</div>
            <div className="text-[40px] font-bold tracking-tight text-[#191C1E]">$42.8B</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40 mb-3">Detection Latency</div>
            <div className="text-[40px] font-bold tracking-tight text-[#191C1E]">14ms</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40 mb-3">Entity Resolution</div>
            <div className="text-[40px] font-bold tracking-tight text-[#191C1E]">99.9%</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40 mb-3">Active Nodes</div>
            <div className="text-[40px] font-bold tracking-tight text-[#191C1E]">2.4M</div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="methodology" className="py-32 px-12 max-w-[1400px] mx-auto scroll-mt-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 space-y-4 lg:space-y-0">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#3525CD] mb-4">Core Capabilities</div>
            <h2 className="text-4xl lg:text-[44px] font-bold tracking-tight text-[#191C1E]">The Forensic Protocol</h2>
          </div>
          <div className="lg:text-right">
            <p className="text-sm font-serif italic text-black/50 pr-4">Interrogating data through a clinical lens.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Card 1 */}
          <div className="bg-[#F8F9FA] rounded-[24px] p-12 overflow-hidden relative group">
            <span className="material-symbols-outlined text-4xl text-[#3525CD] mb-8 block transition-transform group-hover:scale-110">hub</span>
            <h3 className="text-2xl font-bold mb-4 text-[#191C1E]">Network Visualization</h3>
            <p className="text-black/60 text-sm leading-relaxed max-w-sm relative z-10">
              Trace illicit funds through recursive shell layers and complex transactional webs with high-density interactive mapping.
            </p>
            {/* Background pattern for card 1 */}
            <div className="absolute -bottom-20 -right-20 w-[400px] h-[300px] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-500">
               <svg width="100%" height="100%" viewBox="0 0 200 200">
                 <path d="M10,100 Q50,50 100,100 T190,100" fill="none" stroke="##191C1E" strokeWidth="1" strokeDasharray="4" />
                 <path d="M10,120 Q50,70 100,120 T190,120" fill="none" stroke="##191C1E" strokeWidth="1" strokeDasharray="4" />
                 <path d="M10,140 Q50,90 100,140 T190,140" fill="none" stroke="##191C1E" strokeWidth="1" strokeDasharray="4" />
                 <path d="M10,160 Q50,110 100,160 T190,160" fill="none" stroke="##191C1E" strokeWidth="1" strokeDasharray="4" />
                 <path d="M10,180 Q50,130 100,180 T190,180" fill="none" stroke="##191C1E" strokeWidth="1" strokeDasharray="4" />
               </svg>
            </div>
            <div className="mt-12 w-full h-40 bg-gradient-to-b from-transparent to-[#E8EAEF] rounded-xl relative border border-black/5 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#3525CD]/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 to-transparent flex items-center justify-center">
                   <div className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center shadow-[#3525CD]/10">
                       <span className="material-symbols-outlined text-[#3525CD]">highlight</span>
                   </div>
                </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F8F9FA] rounded-[24px] p-12 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl text-[#3525CD] mb-8 block transition-transform group-hover:scale-110">psychology</span>
              <h3 className="text-2xl font-bold mb-4 text-[#191C1E]">AI Risk Detection</h3>
              <p className="text-black/60 text-sm leading-relaxed max-w-sm">
                Automated pattern recognition identifies "smurfing," layering, and integration techniques before the money moves.
              </p>
            </div>
            <div className="mt-16 flex items-end space-x-12">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3525CD] mb-2">Risk Score</div>
                <div className="text-3xl font-bold text-[#191C1E]">9.8</div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3525CD] mb-2">Certainty</div>
                <div className="text-3xl font-bold text-[#191C1E]">High</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 - Full Width */}
        <div id="solutions" className="bg-gradient-to-br from-[#402EED] to-[#25189D] rounded-[24px] p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#3525CD]/30 scroll-mt-24">
          {/* Decorative background circle */}
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-white/5 pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-[32px] font-medium tracking-tight mb-4">Automated FIU Reporting</h3>
              <p className="text-white/70 max-w-md text-sm leading-relaxed font-light">
                Generate court-admissible forensic dossiers automatically. Compliant with global financial intelligence unit standards.
              </p>
            </div>
            <div className="lg:text-right flex flex-col lg:items-end w-full lg:w-auto mt-8 lg:mt-0 space-y-4">
              <button className="bg-white text-[#3525CD] px-8 py-4 rounded text-sm font-bold tracking-wide hover:bg-gray-50 transition-colors shadow-xl text-center w-full lg:w-auto">
                Generate Report Sample
              </button>
              <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/50 text-center lg:text-right w-full">
                PDF / XML / CSV EXPORT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-white py-32 border-t border-black/5 text-center px-6 scroll-mt-20">
        <h2 className="text-4xl lg:text-[48px] font-bold tracking-tight text-[#191C1E] mb-6 max-w-2xl mx-auto">
          Ready to secure the financial frontier?
        </h2>
        <p className="text-black/60 mb-12 max-w-xl mx-auto text-sm leading-relaxed">
          Deploy the Forensic Intelligence Lab across your enterprise. Scale your investigation capability with clinical precision.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/signup" className="bg-[#3525CD] text-white px-8 py-4 rounded text-sm font-bold tracking-wide hover:bg-[#2c1eb0] transition-colors shadow-lg shadow-[#3525CD]/20 w-full sm:w-auto text-center inline-block">
            Sign Up for Access
          </Link>
          <button className="bg-[#F3F4F6] text-[#191C1E] px-8 py-4 rounded text-sm font-bold tracking-wide hover:bg-[#E5E7EB] transition-colors w-full sm:w-auto">
            Contact Sales
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F6F7F9] py-12 px-12 border-t border-black/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div>
            <div className="font-bold text-[#191C1E] mb-2 tracking-tight block">Digital Forensic Lab</div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-black/40">
              © 2026 DIGITAL FORENSIC LAB. ALL RIGHTS RESERVED. PRECISE. AUTHORITATIVE. CLINICAL.
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            <a href="#" className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/40 hover:text-[#3525CD] transition-colors">Privacy Protocol</a>
            <a href="#" className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/40 hover:text-[#3525CD] transition-colors">Terms of Service</a>
            <a href="#" className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/40 hover:text-[#3525CD] transition-colors">Security Whitepaper</a>
            <a href="#" className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/40 hover:text-[#3525CD] transition-colors">Contact Intelligence</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
