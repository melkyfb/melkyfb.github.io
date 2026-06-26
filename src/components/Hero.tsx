import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Server, Cpu, ChevronDown } from 'lucide-react';
import { CloudTopologyCanvas } from './CloudTopologyCanvas';
import { PERSONAL_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const handleScrollToDossier = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-clean-bg"
    >
      {/* Background Interactive Topology */}
      <CloudTopologyCanvas />

      {/* Floating Center Card */}
      <div className="relative z-20 px-4 max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="glass-panel border border-white/70 p-8 rounded-3xl shadow-neumorphic-out backdrop-blur-xl relative overflow-hidden"
        >
          {/* Decorative Corner Lights */}
          <div className="absolute top-3 left-3 h-2 w-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-slate-300" />
          
          <div className="flex justify-center mb-4">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-mono tracking-widest text-slate-500 border border-slate-200/50 flex items-center gap-1.5 shadow-neumorphic-sm-in">
              <Cpu className="h-3 w-3 text-cerulean" />
              SYSTEM_STATE: SECURE_VAULT_01
            </span>
          </div>

          {/* User Name */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-dark mb-2">
            {PERSONAL_DATA.name}
          </h1>

          {/* Titles */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs md:text-sm font-mono text-slate-medium mb-6">
            <span className="flex items-center gap-1 text-slate-dark">
              <Server className="h-3.5 w-3.5 text-cerulean" />
              Senior Software Engineer
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-slate-dark">
              <Cpu className="h-3.5 w-3.5 text-emerald-600" />
              AWS Cloud Architect
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-slate-dark">
              <ShieldAlert className="h-3.5 w-3.5 text-red-500" />
              DevSecOps
            </span>
          </div>

          <p className="text-xs md:text-sm font-mono text-slate-500 mb-8 max-w-lg mx-auto bg-slate-50/50 p-3 rounded-lg border border-slate-200/30">
            LOC_MUNIQUE // COMP_LATENCY: 0.04ms // PORT_STATUS: OPEN
          </p>

          {/* Principal Neumorphic Button */}
          <div className="flex justify-center">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleScrollToDossier}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-mono text-sm font-extrabold text-slate-dark bg-clean-bg border border-white transition-all select-none neu-button cursor-pointer"
            >
              <span>ACCESS_DECRYPTED_RESUME</span>
              <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center border border-white/60 shadow-neumorphic-sm-out">
                <ChevronDown className="h-3.5 w-3.5 text-cerulean animate-bounce" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid or Side Lines */}
      <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-slate-200/30 pointer-events-none hidden lg:block" />
      <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-slate-200/30 pointer-events-none hidden lg:block" />
    </section>
  );
};