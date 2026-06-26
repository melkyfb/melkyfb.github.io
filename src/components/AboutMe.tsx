import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Terminal, Shield, KeyRound } from 'lucide-react';
import { PERSONAL_DATA, SKILL_MATRIX } from '../data/portfolioData';

export const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const originalText = PERSONAL_DATA.tacticalSummary;
  const [displayText, setDisplayText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    setIsDecrypting(true);
    let iterations = 0;
    const chars = '0123456789ABCDEFabcdef//<>_[]{}*#%';
    
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsDecrypting(false);
      }
      
      // Decrypt 3 characters per frame to make it dynamic but legible
      iterations += 3;
    }, 25);

    return () => clearInterval(interval);
  }, [isInView, originalText]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-24 px-6 md:px-12 max-w-6xl mx-auto w-full flex flex-col items-center"
    >
      {/* Title */}
      <div className="w-full flex items-center justify-between mb-12">
        <div className="flex flex-col">
          <span className="font-mono text-xs text-cerulean font-bold uppercase tracking-widest">// DECRYPTION_DOSSIER</span>
          <h2 className="text-3xl font-extrabold text-slate-dark font-sans mt-1">Audit Log & Profiler</h2>
        </div>
        <div className="h-10 w-10 rounded-xl bg-clean-bg shadow-neumorphic-sm-out border border-white/60 flex items-center justify-center text-slate-400">
          <Terminal className="h-5 w-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {/* Dossier Left panel - Tactile engraved Neumorphic Panel */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-clean-bg border border-white/60 shadow-neumorphic-in flex flex-col justify-between min-h-[350px]">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200/50 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <span className="font-mono text-xs text-slate-400">ENCRYPTION_CIPHER: SHA-256</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-mono text-xs text-slate-400 mb-2 uppercase tracking-wide">
              {isDecrypting ? "> DECRYPTING TACTICAL_SUMMARY..." : "> DECRYPTION COMPLETED"}
            </h3>
            
            <p className="font-mono text-slate-dark text-sm md:text-base leading-relaxed tracking-tight whitespace-pre-wrap max-w-xl">
              {displayText || "..."}
            </p>
          </div>

          <div className="h-[1px] bg-slate-200/50 my-6" />

          {/* User Meta Data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-slate-500 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 uppercase">SUBJECT ID / DOB:</span>
              <span className="text-slate-dark font-semibold">{PERSONAL_DATA.name} // {PERSONAL_DATA.birthDate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 uppercase">CONTACT:</span>
              <a href={`mailto:${PERSONAL_DATA.email}`} className="text-cerulean font-semibold hover:underline">{PERSONAL_DATA.email}</a>
              <span className="text-slate-dark">{PERSONAL_DATA.phone}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 uppercase">LANGUAGES:</span>
              <span className="text-slate-dark font-semibold">{PERSONAL_DATA.languages}</span>
            </div>
          </div>

          <div className="h-[1px] bg-slate-200/50 my-4" />

          {/* Downloadable Supporting Attachments */}
          <div className="flex flex-wrap gap-3 mt-2">
            <a 
              href={PERSONAL_DATA.documents.coverLetter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-clean-bg border border-white text-[10px] font-mono text-slate-dark shadow-neumorphic-sm-out hover:shadow-neumorphic-sm-in transition-all"
            >
              <span>[VIEW_COVER_LETTER.PDF]</span>
            </a>
            <a 
              href={PERSONAL_DATA.documents.presentationLetter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-clean-bg border border-white text-[10px] font-mono text-slate-dark shadow-neumorphic-sm-out hover:shadow-neumorphic-sm-in transition-all"
            >
              <span>[VIEW_PRESENTATION_LETTER.PDF]</span>
            </a>
            <a 
              href="/references/ZAB Análise e Desenvolvimento de Sistemas.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-clean-bg border border-white text-[10px] font-mono text-slate-dark shadow-neumorphic-sm-out hover:shadow-neumorphic-sm-in transition-all"
            >
              <span>[ZAB_GERMAN_VALIDATION.PDF]</span>
            </a>
          </div>
        </div>

        {/* Dossier Right Panel - Security Badge & Competence Matrices */}
        <div className="flex flex-col gap-6">
          {/* Virtual Identity Smartcard */}
          <div className="glass-panel border border-white/70 p-6 rounded-3xl shadow-neumorphic-out backdrop-blur-md relative overflow-hidden flex flex-col gap-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cerulean/5 rounded-full blur-2xl" />
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-clean-bg shadow-neumorphic-sm-out border border-white flex items-center justify-center text-cerulean">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-dark">ACCESS LEVEL</h4>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">ROOT_GRANTED</span>
                </div>
              </div>
              <KeyRound className="h-5 w-5 text-slate-300" />
            </div>

            <div className="font-mono text-xs text-slate-500 flex flex-col gap-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-200/20">
              <div className="flex justify-between">
                <span>SECTOR:</span>
                <span className="text-slate-dark font-bold">DEV-SEC-OPS</span>
              </div>
              <div className="flex justify-between">
                <span>IDENTITY:</span>
                <span className="text-slate-dark font-bold">MF-2026-SA</span>
              </div>
              <div className="flex justify-between">
                <span>NODE_SYNC:</span>
                <span className="text-emerald-600 font-bold">STABLE</span>
              </div>
            </div>
          </div>

          {/* Competence Matrix - Soft tags instead of progress bars */}
          <div className="p-6 rounded-3xl bg-clean-bg border border-white/60 shadow-neumorphic-out flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold text-slate-dark uppercase tracking-wider">// CORE_COMPETENCY_MATRIX</h4>
            <div className="flex flex-col gap-4">
              {SKILL_MATRIX.map((group, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{group.category}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, id) => (
                      <span 
                        key={id} 
                        className="font-mono text-[10px] px-2.5 py-1.5 rounded-lg bg-clean-bg border border-white shadow-neumorphic-sm-out hover:shadow-neumorphic-sm-in text-slate-dark font-semibold transition-all"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
