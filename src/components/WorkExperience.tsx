import React from 'react';
import { motion } from 'framer-motion';
import { Server, Activity, Database, Calendar } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const WorkExperience: React.FC = () => {
  return (
    <section 
      id="experience" 
      className="py-24 px-6 md:px-12 max-w-6xl mx-auto w-full relative"
    >
      {/* Title */}
      <div className="w-full flex items-center justify-between mb-16">
        <div className="flex flex-col">
          <span className="font-mono text-xs text-cerulean font-bold uppercase tracking-widest">// SYSTEM_TOPOLOGY</span>
          <h2 className="text-3xl font-extrabold text-slate-dark font-sans mt-1">Node Clusters & Deployments</h2>
        </div>
        <div className="h-10 w-10 rounded-xl bg-clean-bg shadow-neumorphic-sm-out border border-white/60 flex items-center justify-center text-slate-400">
          <Server className="h-5 w-5" />
        </div>
      </div>

      {/* Node Cluster Diagram / Connective cables layout */}
      <div className="relative w-full flex flex-col gap-16 md:gap-24">
        {/* Animated Connecting SVG Cable */}
        <div className="absolute top-12 bottom-12 left-8 md:left-1/2 w-1 -translate-x-1/2 pointer-events-none hidden md:block">
          <svg className="w-6 h-full overflow-visible" style={{ strokeDasharray: '6,6' }}>
            <line 
              x1="3" 
              y1="0" 
              x2="3" 
              y2="100%" 
              stroke="#0ea5e9" 
              strokeOpacity="0.4"
              strokeWidth="2" 
              className="animate-[dash_10s_linear_infinite]"
            />
          </svg>
        </div>

        {/* Experience Nodes */}
        {EXPERIENCES.map((exp, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <div 
              key={idx}
              className={`flex flex-col md:flex-row items-start md:items-center justify-between w-full relative ${
                isLeft ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Connector Node Dot on center axis */}
              <div className="absolute left-8 md:left-1/2 top-4 md:top-auto md:-translate-x-1/2 h-8 w-8 rounded-full bg-clean-bg border-4 border-white shadow-neumorphic-sm-out flex items-center justify-center z-10">
                <Activity className={`h-3 w-3 ${idx === 0 ? 'text-emerald-500 animate-pulse' : 'text-cerulean'}`} />
              </div>

              {/* Glassy Server Node Card */}
              <motion.div 
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, type: "spring" }}
                whileHover={{ y: -4 }}
                className={`w-full md:w-[45%] ml-16 md:ml-0 glass-panel border border-white/60 p-6 md:p-8 rounded-3xl shadow-neumorphic-out backdrop-blur-md relative overflow-hidden`}
              >
                {/* Node Status Header */}
                <div className="flex items-center justify-between mb-4 border-b border-slate-200/50 pb-3">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-cerulean" />
                    <span className="font-mono text-xs font-bold text-slate-dark">{exp.company}</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wide">
                    {idx === 0 ? 'ACTIVE_NODE' : 'ARCHIVED_NODE'}
                  </span>
                </div>

                {/* Role Details */}
                <h3 className="text-lg font-bold text-slate-dark font-sans mb-1">{exp.role}</h3>
                
                {/* Period */}
                <div className="flex items-center gap-1 text-slate-400 font-mono text-xs mb-4">
                  <Calendar className="h-3 w-3" />
                  <span>{exp.period}</span>
                </div>

                {/* Description Bullets */}
                <ul className="text-xs md:text-sm text-slate-500 font-mono space-y-2 mb-6">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-cerulean font-bold mt-0.5">&gt;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Reference / Verification File */}
                {exp.referenceFile && (
                  <div className="mb-4">
                    <a 
                      href={exp.referenceFile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200/50 text-[10px] font-mono text-slate-700 font-semibold transition-all rounded"
                    >
                      <span>[VIEW_REFERENCE_DEC.PDF]</span>
                    </a>
                  </div>
                )}

                {/* Node Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/50">
                  {exp.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="font-mono text-[9px] px-2 py-1 rounded bg-slate-50 border border-slate-200/40 text-slate-400 font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Offset space holder for alignment */}
              <div className="hidden md:block w-[45%]" />
            </div>
          );
        })}
      </div>
    </section>
  );
};
