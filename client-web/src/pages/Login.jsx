import React, { useState } from 'react';
import { Microscope, Shield, AtSign, Fingerprint, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login and redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center font-sans">
      {/* Background Grid Svg */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-md px-6 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          {/* <div className="mb-4 text-[#3b28cc]">
            <Microscope size={36} strokeWidth={2} />
          </div> */}
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-gray-900 mb-2">
            TRACEIFY LOGIN
          </h1>
          <div className="flex items-center text-xs font-semibold text-gray-400 tracking-[0.2em] w-full">
            <div className="h-px bg-gray-300 flex-grow mr-4"></div>
            FRAUD INVESTIGATION UNIT
            <div className="h-px bg-gray-300 flex-grow ml-4"></div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white w-full shadow-lg rounded-sm overflow-hidden flex flex-col">
          
          {/* Card Banner */}
          <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex justify-between items-center text-[10px] font-bold tracking-widest text-gray-500 uppercase">
            <div className="flex items-center space-x-2 text-[#3b28cc]">
              <Shield size={12} fill="currentColor" />
              <span className="text-gray-600">Secure Investigator Access Only</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 bg-[#ae9dff] rounded-full"></div>
              <span>Terminal 01-A</span>
            </div>
          </div>

          {/* Card Body */}
          <form className="p-8 pb-6 flex flex-col space-y-6" onSubmit={handleLogin}>
            
            {/* Email Input */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-wider mb-2 uppercase">
                Corporate Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investigator@forensic-lab.int"
                  className="w-full bg-gray-50 border-none text-sm px-4 py-3 pb-3 outline-none focus:bg-gray-100 transition-colors rounded-sm text-gray-800 placeholder-gray-300"
                  required
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none text-gray-300">
                  <AtSign size={16} />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                  Investigator Credentials
                </label>
                <a href="#" className="text-[10px] font-bold text-[#3b28cc] hover:underline uppercase">
                  Recover Key
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full bg-gray-50 border-none text-sm px-4 py-3 outline-none focus:bg-gray-100 transition-colors rounded-sm text-gray-800 placeholder-gray-300"
                  required
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-4 pointer-events-none text-gray-300">
                  <Fingerprint size={16} />
                </div>
              </div>
            </div>

            {/* 2FA Warning */}
            <div className="bg-[#fff5f2] border-l-4 border-[#b75836] p-4 flex items-start space-x-3 rounded-r-sm">
              <div className="text-[#b75836] flex-shrink-0 mt-0.5">
                <ShieldCheck size={18} fill="currentColor" className="text-[#fff5f2] bg-[#b75836] rounded-full p-[2px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#8d3e20] mb-1">2FA Required</span>
                <p className="text-[10px] text-[#9a5b42] leading-relaxed">
                  Multi-factor authentication via hardware token or biometric sync is mandatory for this session.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3b28cc] hover:bg-[#2e1ea8] text-white font-semibold py-4 text-sm rounded-sm transition-colors flex justify-center items-center space-x-2"
            >
              <span>Authorize Session</span>
              <ArrowRight size={16} />
            </button>
            
          </form>

          {/* Signup Link */}
          <div className="px-8 pb-4 pt-2 flex justify-center text-xs font-semibold text-gray-500">
            <span>Need investigation clearance? <Link to="/signup" className="text-[#3b28cc] hover:underline ml-1">Request Access</Link></span>
          </div>

          {/* Card Footer */}
          <div className="px-8 pb-8 pt-2 flex justify-between items-center text-[9px] font-bold tracking-widest text-gray-400 uppercase">
            <span>IP LOGGED: 192.168.0.244</span>
            <span>LAT: 40.7128° N</span>
          </div>

        </div>
        
      </div>

      {/* Bottom Global Footer */}
      <div className="absolute bottom-8 w-full px-12 flex justify-center md:justify-center items-center text-[9px] font-bold tracking-widest text-gray-400 uppercase space-x-4 md:space-x-8 z-10 w-full max-w-5xl">
        <span>© 2024 DIGITAL FORENSIC LAB</span>
        <span>PRIVACY PROTOCOL</span>
        <span>SECURITY WHITEPAPER</span>
      </div>

      {/* Background Watermark/Logo */}
      <div className="absolute bottom-0 right-0 pointer-events-none z-0 opacity-[0.03]">
        <svg width="400" height="400" viewBox="0 0 100 100" className="text-gray-900 fill-current">
          <path d="M10,10 h80 v80 h-80 z M30,30 h40 v40 h-40 z" fill="none" stroke="currentColor" strokeWidth="4"/>
          <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="4" />
          <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>

    </div>
  );
};

export default Login;
