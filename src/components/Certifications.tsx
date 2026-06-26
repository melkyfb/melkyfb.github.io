import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, Fingerprint, Award, CheckCircle, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  return (
    <section 
      id="education" 
      className="py-24 px-6 md:px-12 max-w-6xl mx-auto w-full"
    >
      {/* Title */}
      <div className="w-full flex items-center justify-between mb-16">
        <div className="flex flex-col">
          <span className="font-mono text-xs text-cerulean font-bold uppercase tracking-widest">// SECURE_VAULT</span>
          <h2 className="text-3xl font-extrabold text-slate-dark font-sans mt-1">Credentials & Access Badges</h2>
        </div>
        <div className="h-10 w-10 rounded-xl bg-clean-bg shadow-neumorphic-sm-out border border-white/60 flex items-center justify-center text-slate-400">
          <ShieldAlert className="h-5 w-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Certifications Vault */}
        <div>
          <div className="flex items-center gap-2 mb-6 font-mono text-sm font-bold text-slate-dark">
            <Award className="h-4 w-4 text-cerulean" />
            <span>// CERTIFICATIONS</span>
          </div>

          <div className="flex flex-col gap-8">
            {CERTIFICATIONS.map((cert, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-3xl bg-clean-bg border border-white/40 shadow-neumorphic-in"
              >
                {/* Levitating Access Badge Card */}
                <motion.div 
                  whileHover={{ y: -6 }}
                  className="glass-panel border border-white/80 p-6 rounded-2xl shadow-neumorphic-out backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-44"
                >
                  {/* Holographic line overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cerulean/5 via-transparent to-emerald-500/5 pointer-events-none" />

                  {/* Top Bar of ID Badge */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">CREDENTIAL KEY</span>
                      <span className="text-xs font-mono font-bold text-slate-medium">{cert.issuer}</span>
                    </div>
                    {/* Simulated RFID/Smart Chip */}
                    <div className="w-8 h-6 rounded bg-gradient-to-r from-amber-200 to-yellow-400 border border-amber-300 shadow-inner flex items-center justify-center opacity-85">
                      <Fingerprint className="h-4 w-4 text-amber-800" />
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <div className="my-2 relative z-10 flex justify-between items-start">
                    <h3 className="font-sans text-sm md:text-base font-extrabold text-slate-dark leading-snug pr-4">
                      {cert.name}
                    </h3>
                    {cert.credlyUrl && (
                      <a 
                        href={cert.credlyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-400 hover:text-cerulean transition-colors pt-0.5"
                        title="Verify badge on Credly"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* Footer metadata */}
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-3 mt-1 relative z-10">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-slate-400">
                        DATE: {cert.date || 'ROADMAP'}
                      </span>
                      {cert.referenceFile && (
                        <a 
                          href={cert.referenceFile} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[8px] font-mono text-cerulean hover:underline font-bold"
                        >
                          [VIEW_INFO_DEC.PDF]
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${cert.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'}`} />
                      <span className="text-[10px] font-mono font-bold text-slate-dark uppercase">
                        {cert.status === 'active' ? 'VERIFIED' : 'QUEUED_SEC'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Vault */}
        <div>
          <div className="flex items-center gap-2 mb-6 font-mono text-sm font-bold text-slate-dark">
            <BookOpen className="h-4 w-4 text-cerulean" />
            <span>// EDUCATION</span>
          </div>

          <div className="flex flex-col gap-8">
            {EDUCATION.map((edu, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-3xl bg-clean-bg border border-white/40 shadow-neumorphic-in"
              >
                {/* Levitating Access Badge Card */}
                <motion.div 
                  whileHover={{ y: -6 }}
                  className="glass-panel border border-white/80 p-6 rounded-2xl shadow-neumorphic-out backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-44"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-cerulean/5 pointer-events-none" />

                  {/* Top Bar */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">SECURE_DOSSIER_EDU</span>
                      <span className="text-xs font-mono font-bold text-slate-medium">{edu.institution}</span>
                    </div>
                    {/* Card logo holder */}
                    <div className="h-8 w-8 rounded-lg bg-clean-bg shadow-neumorphic-sm-out flex items-center justify-center border border-white">
                      <BookOpen className="h-4 w-4 text-cerulean" />
                    </div>
                  </div>

                  {/* Degree Title */}
                  <div className="my-2 relative z-10">
                    <h3 className="font-sans text-sm md:text-base font-extrabold text-slate-dark leading-snug">
                      {edu.degree}
                    </h3>
                  </div>

                  {/* Footer details */}
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-3 mt-1 relative z-10">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono text-slate-400">
                        PERIOD: {edu.period}
                      </span>
                      <div className="flex gap-2">
                        {edu.referenceFile && (
                          <a 
                            href={edu.referenceFile} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[8px] font-mono text-cerulean hover:underline font-bold"
                          >
                            [VIEW_DIPLOMA.PDF]
                          </a>
                        )}
                        {edu.degree.includes("Analysis") && (
                          <a 
                            href="/references/ZAB Análise e Desenvolvimento de Sistemas.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[8px] font-mono text-emerald-600 hover:underline font-bold"
                          >
                            [ZAB_GERMAN_VAL.PDF]
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-[10px] font-mono font-bold text-slate-dark uppercase">
                        COMPLETED
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
