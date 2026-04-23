'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { 
  ArrowRight, 
  Search, 
  Activity, 
  ShieldAlert,
  Terminal,
  Zap,
  CheckCircle2,
  Lock,
  Globe,
  Database,
  Briefcase,
  Users,
  FileSearch,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-pure-black text-pure-white selection:bg-neon-volt selection:text-pure-black overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-pure-black border-b border-charcoal/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neon-volt flex items-center justify-center rounded-[2px] shadow-[0_0_15px_rgba(250,255,105,0.15)]">
              <span className="text-pure-black font-black text-xl">G</span>
            </div>
            <span className="text-xl font-black tracking-[-0.04em] uppercase">GenWin</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/login" className="text-[11.2px] font-black tracking-[1.4px] uppercase text-silver hover:text-neon-volt transition-colors">
              Session Login
            </Link>
            <Link href="/signup">
              <Button variant="neon" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-48 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="font-sans font-black text-[64px] md:text-[96px] leading-[0.9] tracking-[-0.05em] uppercase mb-10 max-w-6xl">
            A NEW <span className="text-neon-volt">STANDARD</span> <br />FOR TRUST.
          </h1>
          <p className="text-silver text-xl md:text-2xl max-w-2xl mb-12 font-medium leading-relaxed">
            GenWin evaluates the credibility of information, products, and claims—so you can make decisions with clarity, not assumption.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/signup">
              <Button variant="forest" size="lg" className="px-12 group">
                Establish Access <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/#analysis">
              <Button variant="ghost" size="lg" className="px-12">
                Explore Platform
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Preview Overlay */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-24 max-w-6xl mx-auto relative"
        >
          <div className="absolute inset-0 bg-neon-volt/5 blur-[100px] -z-10" />
          <Card elevated className="bg-near-black border-charcoal/80 p-0 overflow-hidden">
             <div className="bg-pure-black border-b border-charcoal/80 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="flex gap-1.5 px-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-charcoal/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-charcoal/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-charcoal/50" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[2px] text-silver border-l border-charcoal/80 pl-4">integrity_engine_v1.0.4</span>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-black uppercase tracking-[2px] text-neon-volt animate-pulse">● System Online</span>
                </div>
             </div>
             <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-charcoal/80 pb-8 lg:pb-0 lg:pr-12">
                   <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="96" cy="96" r="88" fill="transparent" stroke="#161616" strokeWidth="16" />
                        <motion.circle 
                          cx="96" cy="96" r="88" 
                          fill="transparent" 
                          stroke="#faff69" 
                          strokeWidth="16" 
                          strokeDasharray="552.9"
                          initial={{ strokeDashoffset: 552.9 }}
                          animate={{ strokeDashoffset: 552.9 - (552.9 * 62) / 100 }}
                          transition={{ duration: 2, ease: "circOut" }}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-6xl font-black tracking-tighter">62</span>
                        <span className="text-[10px] font-black tracking-[2.5px] uppercase text-silver">Trust Score</span>
                      </div>
                   </div>
                </div>
                <div className="lg:col-span-7 space-y-6 py-4">
                   <div className="flex items-center justify-between">
                      <span className="text-[11.2px] font-black tracking-[1.4px] uppercase text-silver">Assessment:</span>
                      <span className="text-[11.2px] font-black tracking-[1.4px] uppercase text-pale-yellow border border-border-olive px-2 py-0.5 rounded-[2px] bg-olive-dark/50">INCONCLUSIVE</span>
                   </div>
                   <div className="space-y-4">
                      {[
                        { label: 'Source Credibility', val: 40, status: 'Limited' },
                        { label: 'Evidence Strength', val: 68, status: 'Partial' },
                        { label: 'Context Integrity', val: 32, status: 'Incomplete' },
                      ].map((item) => (
                        <div key={item.label} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-[1.5px]">
                              <span className="text-silver">{item.label}</span>
                              <span className="text-pure-white">{item.status}</span>
                           </div>
                           <div className="h-1.5 w-full bg-pure-black border border-charcoal/50 rounded-none overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.val}%` }}
                                transition={{ duration: 1.5, delay: 0.6 }}
                                className={`h-full ${item.val < 40 ? 'bg-charcoal' : 'bg-neon-volt'}`}
                              />
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="pt-4 mt-6 border-t border-charcoal/80">
                      <p className="text-[11.2px] font-medium text-silver leading-relaxed italic italic">
                        Every conclusion is accompanied by structured reasoning deconstructed via Engine v1.0.
                      </p>
                   </div>
                </div>
             </div>
          </Card>
        </motion.div>
      </section>

      {/* Performance Stats */}
      <section className="bg-near-black border-y border-charcoal/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-volt/5 blur-[120px] -z-10" />
        <div className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-charcoal/80">
          <div className="flex flex-col items-center text-center px-8 border-charcoal/40 pt-12 md:pt-0">
            <span className="font-sans font-black text-[72px] md:text-[88px] leading-tight tracking-tighter">99<span className="text-neon-volt">%</span></span>
            <span className="text-silver text-[12px] font-black tracking-[2px] uppercase">Analysis Accuracy</span>
          </div>
          <div className="flex flex-col items-center text-center px-8 pt-12 md:pt-0">
            <span className="font-sans font-black text-[72px] md:text-[88px] leading-tight tracking-tighter">&lt;2<span className="text-neon-volt">s</span></span>
            <span className="text-silver text-[12px] font-black tracking-[2px] uppercase">Average Latency</span>
          </div>
          <div className="flex flex-col items-center text-center px-8 pt-12 md:pt-0">
            <span className="font-sans font-black text-[72px] md:text-[88px] leading-tight tracking-tighter">1.4<span className="text-neon-volt">M</span></span>
            <span className="text-silver text-[12px] font-black tracking-[2px] uppercase">Signals Evaluated</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-6 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="max-w-2xl">
            <span className="text-neon-volt text-[12px] font-black tracking-[3px] uppercase mb-6 block">Critical Threshold</span>
            <h2 className="font-sans font-black text-[48px] md:text-[64px] leading-[0.95] tracking-[-0.04em] uppercase mb-10">
              Information is abundant. <br />
              <span className="text-charcoal">Trust is not.</span>
            </h2>
            <div className="space-y-8 text-silver text-xl leading-relaxed">
              <p>
                Modern decisions are shaped by fragmented signals—headlines without context, reviews without verification, claims without evidence.
              </p>
              <p>
                The result isn’t just misinformation. <br />
                <span className="text-pure-white font-bold uppercase tracking-tight">It’s uncertainty at scale.</span>
              </p>
            </div>
          </div>
          <div className="relative">
             <Card elevated className="bg-near-black/50 border-charcoal/80 p-8 h-96 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-3 opacity-30 blur-[1px]">
                   {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-6 w-full bg-charcoal/20 border border-charcoal/40 rounded-[2px]" />
                   ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 bg-pure-black border-2 border-neon-volt rounded-full flex items-center justify-center shadow-[0_0_30px_#faff69]">
                      <ShieldAlert className="text-neon-volt" size={24} />
                   </div>
                </div>
                <div className="self-end w-2/3 space-y-3">
                   <div className="h-4 w-full bg-neon-volt/20 border border-neon-volt/40 rounded-[2px]" />
                   <div className="h-4 w-1/2 bg-neon-volt/40 border border-neon-volt rounded-[2px]" />
                </div>
                <div className="absolute bottom-4 left-4">
                   <span className="text-[10px] font-black uppercase tracking-[2px] text-silver">System Failure Analysis</span>
                </div>
             </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-near-black border-y border-charcoal/80 py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-24">
            <span className="text-neon-volt text-[12px] font-black tracking-[3px] uppercase mb-6 block">Engine Methodology</span>
            <h2 className="font-sans font-black text-[48px] md:text-[64px] leading-[0.95] tracking-[-0.04em] uppercase mb-10">
              CLARITY, <br />ENGINEERED.
            </h2>
            <p className="text-silver text-2xl leading-relaxed">
              GenWin introduces a structured approach to evaluating trust. Instead of presenting conclusions, it analyzes the fundamental inputs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Source Credibility', desc: 'Reputation analysis via cross-referenced historical data.', icon: <Users /> },
              { title: 'Evidence Strength', desc: 'Verification against known data points and verifiable facts.', icon: <Database /> },
              { title: 'Conflicting Signals', desc: 'Detection of major contradictions and opposing evidence.', icon: <Activity /> },
              { title: 'Context Integrity', desc: 'Identification of missing context that alters interpretation.', icon: <FileSearch /> },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ backgroundColor: '#161600', borderColor: '#4f5100' }}
                className="bg-pure-black border border-charcoal/80 p-8 flex flex-col justify-between h-80 group transition-all"
              >
                 <div className="text-charcoal group-hover:text-neon-volt transition-colors">
                    {item.icon}
                 </div>
                 <div>
                    <h3 className="text-xl font-bold uppercase mb-4 tracking-tighter">{item.title}</h3>
                    <p className="text-sm text-silver leading-relaxed font-medium">{item.desc}</p>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="analysis" className="container mx-auto px-6 py-40">
        <div className="text-center mb-24">
          <h2 className="font-sans font-black text-[48px] md:text-[64px] leading-tight uppercase tracking-tight">
            A SIMPLE <span className="text-charcoal">INPUT.</span> <br />
            A <span className="text-neon-volt">RIGOROUS</span> EVALUATION.
          </h2>
        </div>

        <div className="max-w-5xl mx-auto space-y-4">
          {[
            { id: '01', title: 'Input Protocol', desc: 'Provide any claim, article, or content. Our system ingests the raw data for decomposition.' },
            { id: '02', title: 'Recursive Analysis', desc: 'GenWin deconstructs and cross-references the information against millions of data points.' },
            { id: '03', title: 'Structured Output', desc: 'A clear trust score, supported by absolute Reasoning Logs and structured data.' },
          ].map((step) => (
            <div key={step.id} className="bg-near-black border border-charcoal/80 p-10 flex flex-col md:flex-row items-start gap-12 group hover:border-charcoal transition-colors">
               <span className="font-sans font-black text-6xl text-charcoal/30 group-hover:text-neon-volt/20 transition-colors uppercase leading-none">{step.id}</span>
               <div className="flex-1">
                  <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-silver text-lg leading-relaxed">{step.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="bg-near-black border-y border-charcoal/80 py-40 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-2xl">
              <span className="text-neon-volt text-[12px] font-black tracking-[3px] uppercase mb-6 block">Unified Architecture</span>
              <h2 className="font-sans font-black text-[48px] md:text-[64px] leading-none tracking-[-0.04em] uppercase">Ecosystem <br />Intelligence.</h2>
            </div>
            <div className="text-silver text-xl max-w-sm mb-2">
              A unified approach to trust assessment across every critical information sector.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal/40 border border-charcoal/40">
             {[
               { name: 'GenWin App', status: 'Available', desc: 'Real-time credibility evaluation engine.' },
               { name: 'GenWin Food', status: 'Planned', desc: 'Ingredient transparency and sourcing integrity.' },
               { name: 'GenWin Shop', status: 'Planned', desc: 'Product authenticity and review verification.' },
               { name: 'GenWin Verify', status: 'Future', desc: 'Scalable API layer for external ecosystems.' },
             ].map((cap) => (
               <div key={cap.name} className="bg-pure-black p-10 group hover:bg-near-black transition-colors min-h-[300px] flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <h4 className="text-xl font-black uppercase tracking-tight max-w-[100px] leading-none">{cap.name}</h4>
                     <span className={`text-[9px] font-black uppercase tracking-[2px] px-2 py-0.5 rounded-[2px] ${cap.status === 'Available' ? 'bg-neon-volt text-pure-black shadow-[0_0_10px_rgba(250,255,105,0.3)]' : 'bg-charcoal/20 text-silver border border-charcoal/40'}`}>
                       {cap.status}
                     </span>
                  </div>
                  <p className="text-sm text-silver leading-relaxed font-medium">{cap.desc}</p>
               </div>
             ))}
          </div>

          {/* Ecosystem Visualization Replacement */}
          <div className="mt-20 flex justify-center opacity-30">
             <div className="w-full h-px bg-gradient-to-r from-transparent via-charcoal to-transparent" />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-6 py-40">
        <h2 className="font-sans font-black text-[48px] md:text-[64px] leading-tight uppercase tracking-tight text-center mb-24">
          Built for <span className="text-neon-volt">Decisions</span> <br />that matter.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-6xl mx-auto">
          {[
            { tag: 'ACADEMIA', title: 'Research Validaton', desc: 'Authenticate sources and verify citations with absolute certainty.', icon: <Globe /> },
            { tag: 'PERSONAL', title: 'Consumer Intelligence', desc: 'Evaluate product claims and brand legitimacy before exposure.', icon: <FileSearch /> },
            { tag: 'ENTERPRISE', title: 'Data Integrity', desc: 'Assess business signals and internal data points with precision.', icon: <Zap /> },
            { tag: 'MEDIA', title: 'Information Security', desc: 'Deconstruct claims and verify origin signals before broadcasting.', icon: <Activity /> },
          ].map((use) => (
            <div key={use.title} className="bg-near-black border border-charcoal/40 p-12 group hover:border-charcoal transition-colors">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-pure-black border border-charcoal/80 flex items-center justify-center text-charcoal group-hover:text-neon-volt transition-colors">
                     {use.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[3px] text-silver">{use.tag}</span>
               </div>
               <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{use.title}</h3>
               <p className="text-silver leading-relaxed">{use.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Access & Trust */}
      <section className="bg-near-black border-y border-charcoal/80 py-40">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-24">
           <div className="flex-1">
             <span className="text-neon-volt text-[12px] font-black tracking-[3px] uppercase mb-6 block">Access Protocol</span>
             <h2 className="font-sans font-black text-[48px] md:text-[64px] leading-[0.95] tracking-[-0.04em] uppercase mb-10">
               Authenticated <br />Intelligence.
             </h2>
             <p className="text-silver text-2xl leading-relaxed mb-12 max-w-xl">
               To maintain quality and responsible usage, GenWin operates as an authenticated platform for verified signal analysts.
             </p>
             <Link href="/signup">
               <Button variant="neon" size="lg" className="px-16">Create Account</Button>
             </Link>
           </div>
           <div className="w-full max-w-sm">
              <div className="aspect-square bg-pure-black border-2 border-charcoal/80 rounded-2xl flex items-center justify-center p-12 group">
                 <div className="w-full h-full border border-neon-volt/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <motion.div 
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-neon-volt blur-3xl opacity-20"
                    />
                    <Lock size={120} className="text-charcoal group-hover:text-neon-volt transition-colors relative z-10" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-64 text-center">
        <h2 className="font-sans font-black text-[64px] md:text-[96px] leading-[0.9] tracking-[-0.05em] uppercase mb-12">
          MAKE CLARITY <br />YOUR <span className="text-neon-volt">DEFAULT.</span>
        </h2>
        <Link href="/signup">
          <Button variant="forest" size="lg" className="px-16 h-20 text-xl rounded-none shadow-[0_0_80px_rgba(22,101,52,0.2)]">
            Try GenWin Now
          </Button>
        </Link>
        <div className="mt-20 flex justify-center gap-12">
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-[3px] text-silver mb-2">Build Environment</span>
              <span className="text-xs font-mono text-neon-volt">v1.0.4 PRODUCTION</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-[3px] text-silver mb-2">Uptime Status</span>
              <span className="text-xs font-mono text-neon-volt">99.99% ONLINE</span>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-charcoal/80 py-24 bg-pure-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between gap-24">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neon-volt flex items-center justify-center rounded-[2px] shadow-[0_0_15px_rgba(250,255,105,0.15)]">
                  <span className="text-pure-black font-black text-xl">G</span>
                </div>
                <span className="text-xl font-black tracking-[-0.04em] uppercase">GenWin</span>
              </div>
              <p className="text-silver text-sm max-w-xs font-bold leading-relaxed italic italic">
                A system for trust designed for decisions that matter.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-32 gap-y-12">
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[3px] text-silver">Protocol</span>
                <div className="flex flex-col gap-3">
                  <Link href="/login" className="text-sm font-bold text-charcoal hover:text-neon-volt transition-colors">Session Terminal</Link>
                  <Link href="/signup" className="text-sm font-bold text-charcoal hover:text-neon-volt transition-colors">Identity Creation</Link>
                </div>
              </div>
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[3px] text-silver">Infrastructure</span>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="text-sm font-bold text-charcoal hover:text-neon-volt transition-colors">Integrity Engine</Link>
                  <Link href="#" className="text-sm font-bold text-charcoal hover:text-neon-volt transition-colors">Trust Layer API</Link>
                </div>
              </div>
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[3px] text-silver">Privacy</span>
                <div className="flex flex-col gap-3">
                  <Link href="#" className="text-sm font-bold text-charcoal hover:text-neon-volt transition-colors">Security Audit</Link>
                  <Link href="#" className="text-sm font-bold text-charcoal hover:text-neon-volt transition-colors">Terms of Usage</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-charcoal/20 flex flex-col md:flex-row justify-between items-center gap-6">
             <span className="text-[10px] font-black uppercase tracking-[3px] text-charcoal">Design by Samaroh Integrity Network</span>
             <div className="flex gap-8">
                <Link href="#" className="text-charcoal hover:text-neon-volt transition-colors"><Globe size={18}/></Link>
                <Link href="#" className="text-charcoal hover:text-neon-volt transition-colors"><Database size={18}/></Link>
                <Link href="#" className="text-charcoal hover:text-neon-volt transition-colors"><Zap size={18}/></Link>
             </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
