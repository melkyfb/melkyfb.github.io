import React from 'react';
import { Download, ShieldCheck } from 'lucide-react';
import { PERSONAL_DATA } from '../data/portfolioData';
import { motion } from 'framer-motion';

type navElements = {
  id: string;
  displayName: string;
};

type NavbarProps = {
  navElements: navElements[];
};

export const Navbar: React.FC<NavbarProps> = ({ navElements }) => {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/40 h-16 flex items-center justify-between px-6 md:px-12">
      {/* Brand logo / Identidade */}
      <motion.div 
        onClick={() => handleScroll('home')} 
        className="flex items-center gap-2 cursor-pointer select-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="h-9 w-9 rounded-lg bg-clean-bg shadow-neumorphic-sm-out flex items-center justify-center border border-white/60">
          <ShieldCheck className="h-5 w-5 text-cerulean" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono font-bold text-slate-dark text-sm leading-tight">MF // SEC-OPS</span>
          <span className="text-[9px] text-slate-medium font-mono uppercase tracking-wider">AWS Architecture</span>
        </div>
      </motion.div>

      {/* Nav Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-mono">
        {navElements.map(({ id, displayName }) => (
          <motion.button 
            key={id}
            onClick={() => handleScroll(id)}
            className="cursor-pointer hover:text-cerulean transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {displayName}
          </motion.button>
        ))}
      </div>

      {/* Action shortcuts & Neumorphic Download CV */}
      <div className="flex items-center gap-4">
        {/* Social Link icons */}
        <motion.a 
          href={PERSONAL_DATA.socials.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="h-8 w-8 rounded-full bg-clean-bg shadow-neumorphic-sm-out hover:shadow-neumorphic-sm-in flex items-center justify-center border border-white/60 text-slate-medium hover:text-slate-dark transition-all cursor-pointer"
          title="GitHub Profile"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </motion.a>
        <motion.a 
          href={PERSONAL_DATA.socials.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="h-8 w-8 rounded-full bg-clean-bg shadow-neumorphic-sm-out hover:shadow-neumorphic-sm-in flex items-center justify-center border border-white/60 text-slate-medium hover:text-slate-dark transition-all cursor-pointer"
          title="LinkedIn Profile"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </motion.a>


        {/* Neumorphic Button Download CV */}
        <motion.a
          href={PERSONAL_DATA.documents.cv}
          download="Curriculum_Vitae_Melky_Fernandes.pdf"
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-dark bg-clean-bg border border-white/80 transition-all select-none neu-button cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Download className="h-3.5 w-3.5 text-cerulean" />
          <span>DOWNLOAD_CV</span>
        </motion.a>
      </div>
    </nav>
  );
};
