'use client';

import React from 'react';
import Link from 'react-native-web'; // Wait, I should use next/link instead for consistency
import NextLink from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { 
  ShieldCheck, 
  Zap, 
  BarChart, 
  ArrowRight, 
  Search, 
  Database, 
  Activity, 
  FileText, 
  Users, 
  Briefcase, 
  Globe, 
  Lock,
  ChevronDown,
  CircleCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-pure-black text-pure-white selection:bg-neon-volt selection:text-pure-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-pure-black/80 backdrop-blur-md border-b border-deep-charcoal">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-volt flex items-center justify-center rounded">
              <span className="text-pure-black font-black text-xl">G</span>
            </div>
            <span className="text-xl font-bold tracking-tight">GenWin</span>
          </div>
          <div className="flex items-center gap-6">
            <NextLink href="/login" className="text-sm font-semibold hover:text-neon-volt transition-colors tracking-[1.4px] uppercase">
              Sign In
            </NextLink>
            <NextLink href="/signup">
              <Button variant="neon" size="sm">GET STARTED</Button>
            </NextLink>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="container mx-auto px-6 pt-40 pb-32 md:pt-56 md:pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-start text-left"
          >
            <h1 className="font-sans font-black text-6xl md:text-[96px] leading-[0.95] tracking-tight mb-8">
              A NEW <br /> 
              <span className="text-neon-volt">STANDARD</span> <br /> 
              FOR TRUST.
            </h1>
            <p className="text-silver text-xl md:text-2xl max-w-xl mb-12 font-medium leading-relaxed">
              GenWin evaluates the credibility of information, products, and claims—so you can make decisions with clarity, not assumption.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <NextLink href="/signup">
                <Button variant="forest" size="lg" className="w-full sm:w-auto px-10 group">
                  GET STARTED <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </NextLink>
              <NextLink href="#capabilities">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto px-10">
                  EXPLORE THE PLATFORM
                </Button>
              </NextLink>
            </div>
          </motion.div>

          {/* Minimal Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card elevated className="bg-near-black p-8 border-charcoal/80 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="px-3 py-1 bg-pure-black border border-charcoal/80 rounded text-[10px] uppercase font-bold tracking-widest text-silver">
                  Live Assessment
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-10 items-center">
                {/* Circular Meter */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle 
                      cx="80" cy="80" r="70" 
                      fill="transparent" 
                      stroke="#141414" 
                      strokeWidth="12" 
                    />
                    <motion.circle 
                      cx="80" cy="80" r="70" 
                      fill="transparent" 
                      stroke="#faff69" 
                      strokeWidth="12" 
                      strokeDasharray="440"
                      initial={{ strokeDashoffset: 440 }}
                      whileInView={{ strokeDashoffset: 440 - (440 * 62) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black">62</span>
                    <span className="text-[10px] font-bold text-silver uppercase">Trust Score</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4 w-full">
                  {[
                    { label: 'Source', value: 'Verified', color: 'text-green-500' },
                    { label: 'Evidence', value: 'Partial', color: 'text-yellow-500' },
                    { label: 'Context', value: 'Incomplete', color: 'text-red-500' },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      viewport={{ once: true }}
                      className="bg-pure-black border border-charcoal/80 rounded p-4 flex items-center justify-between"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-silver">{item.label}</span>
                      <span className={`text-xs font-bold uppercase ${item.color}`}>{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Subtle animated line */}
              <div className="mt-10 flex items-center justify-between px-6 relative">
                 <div className="absolute top-1/2 left-0 right-0 h-px bg-charcoal/30 -z-10" />
                 <motion.div 
                   className="absolute top-1/2 left-0 h-px bg-neon-volt -z-10 shadow-[0_0_10px_#faff69]"
                   initial={{ width: 0 }}
                   whileInView={{ width: '100%' }}
                   transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                 />
                 <div className="flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded bg-near-black border border-charcoal flex items-center justify-center">
                     <Search size={14} className="text-silver" />
                   </div>
                   <span className="text-[10px] uppercase font-bold text-silver">Input</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded bg-near-black border border-charcoal flex items-center justify-center">
                     <Activity size={14} className="text-neon-volt" />
                   </div>
                   <span className="text-[10px] uppercase font-bold text-silver">Analysis</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded bg-neon-volt border border-neon-volt flex items-center justify-center">
                     <Zap size={14} className="text-pure-black" />
                   </div>
                   <span className="text-[10px] uppercase font-bold text-neon-volt">Clarity</span>
                 </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-near-black/30 border-y border-charcoal/80">
        <div className="container mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-pure-black border border-charcoal rounded-xl p-8 relative overflow-hidden h-[400px]">
                {/* Visual Representation of Problem vs Solution */}
                <div className="grid grid-cols-2 h-full gap-4">
                  <div className="relative overflow-hidden flex flex-col gap-2">
                    <p className="text-[10px] font-bold text-silver uppercase mb-2">CHAOS</p>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className={`h-8 w-full bg-charcoal/20 border border-charcoal/40 rounded flex items-center px-3 blur-[2px]`} style={{ opacity: 1 - (i*0.1) }}>
                        <div className="h-2 w-1/2 bg-silver/20 rounded" />
                      </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-pure-black to-transparent" />
                  </div>
                  <div className="border-l border-charcoal pl-4 flex flex-col gap-3">
                    <p className="text-[10px] font-bold text-neon-volt uppercase mb-2 tracking-widest">STRUCTURE</p>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-neon-volt/10 border border-neon-volt/30 rounded p-3"
                    >
                      <div className="h-2 w-3/4 bg-neon-volt/60 rounded mb-2" />
                      <div className="h-1.5 w-1/2 bg-neon-volt/30 rounded" />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-charcoal/20 border border-charcoal/40 rounded p-3"
                    >
                      <div className="h-2 w-1/2 bg-silver/40 rounded mb-2" />
                      <div className="h-1.5 w-2/3 bg-silver/20 rounded" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-sans font-black text-5xl md:text-6xl mb-8 leading-tight">
                INFORMATION IS ABUNDANT. <br />
                <span className="text-neon-volt">TRUST</span> IS NOT.
              </h2>
              <div className="space-y-6 text-silver text-lg">
                <p>
                  Modern decisions are shaped by fragmented signals—headlines without context, reviews without verification, claims without evidence.
                </p>
                <p>
                  The result isn’t just misinformation. <br />
                  <span className="text-pure-white font-bold">It’s uncertainty at scale.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="container mx-auto px-6 py-32">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <p className="text-neon-volt text-sm font-bold tracking-[2px] uppercase mb-4">The Solution</p>
          <h2 className="font-sans font-black text-5xl md:text-6xl mb-8">CLARITY, ENGINEERED.</h2>
          <p className="text-silver text-xl">
            GenWin introduces a structured approach to evaluating trust. Instead of presenting conclusions, it analyzes the fundamentals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            {[
              { title: 'Source Credibility', desc: 'Detailed deconstruction of implicit and explicit source reputation.' },
              { title: 'Supporting Evidence', desc: 'Verification against known data points and verifiable facts.' },
              { title: 'Conflicting Reports', desc: 'Detection of major contradictions and opposing evidence.' },
              { title: 'Context Integrity', desc: 'Identification of missing context that alters interpretation.' },
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex gap-6 group"
              >
                <div className="text-neon-volt font-mono text-xl pt-1">0{i+1}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-neon-volt transition-colors">{item.title}</h3>
                  <p className="text-silver leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative h-[400px]">
            {/* Layered Cards Animation */}
            <AnimatePresence mode="wait">
              <div className="relative w-full h-full">
                {[
                  { label: "Source", offset: 0, color: "bg-near-black" },
                  { label: "Evidence", offset: 40, color: "bg-deep-charcoal" },
                  { label: "Contradictions", offset: 80, color: "bg-charcoal" },
                  { label: "Context", offset: 120, color: "bg-near-black border-neon-volt" },
                ].map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: card.offset }}
                    transition={{ delay: i * 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`absolute inset-x-0 mx-auto w-4/5 h-48 rounded-xl border border-charcoal p-6 shadow-2xl flex flex-col justify-end ${card.color}`}
                    style={{ zIndex: i }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-silver mb-1">Layer 0{i+1}</p>
                    <h4 className="text-xl font-bold">{card.label}</h4>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-near-black border-y border-charcoal py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
             <h2 className="font-sans font-black text-5xl md:text-6xl mb-8 uppercase tracking-tight">A SIMPLE INPUT. <br />A <span className="text-neon-volt">RIGOROUS</span> EVALUATION.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-20">
            {[
              { step: '01', title: 'Input', desc: 'Provide any claim, article, or product description for verification.' },
              { step: '02', title: 'Analysis', desc: 'GenWin deconstructs and cross-references the information against historical data.' },
              { step: '03', title: 'Output', desc: 'A clear trust score, supported by transparent and structured reasoning.' },
            ].map((item, i) => (
              <Card key={item.step} className="bg-pure-black border-charcoal/80 flex flex-col items-center text-center p-8">
                <span className="text-neon-volt font-black text-4xl mb-6">{item.step}</span>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-silver text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>

          {/* Pipeline Visualization */}
          <div className="relative max-w-4xl mx-auto h-32 flex items-center justify-between">
            <div className="absolute inset-x-0 top-1/2 h-px bg-charcoal -z-10" />
            <motion.div 
               className="absolute top-1/2 left-0 h-px bg-neon-volt -z-10"
               initial={{ width: 0 }}
               whileInView={{ width: '100%' }}
               transition={{ duration: 4, repeat: Infinity }}
            />
            {[
              { label: 'Input', icon: <Search size={20} /> },
              { label: 'Parsing', icon: <FileText size={20} /> },
              { label: 'Cross-verification', icon: <Database size={20} /> },
              { label: 'Scoring', icon: <BarChart size={20} /> },
              { label: 'Output', icon: <Zap size={20} /> },
            ].map((node, i) => (
              <div key={node.label} className="flex flex-col items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-near-black border border-charcoal flex items-center justify-center text-neon-volt">
                   {node.icon}
                 </div>
                 <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-silver text-center max-w-[80px]">
                   {node.label}
                 </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTPUT EXPERIENCE */}
      <section className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-sans font-black text-5xl md:text-6xl mb-8 leading-tight">DESIGNED FOR <span className="text-neon-volt">UNDERSTANDING</span>, NOT JUST ANSWERS.</h2>
            <p className="text-silver text-xl mb-12">
              The GenWin output engine provides a deep-dive assessment that explains the "why" behind every score. Every conclusion is accompanied by its reasoning.
            </p>
          </div>

          <Card elevated className="bg-near-black border-neon-volt overflow-hidden">
             <div className="p-8 border-b border-charcoal/80 bg-near-black flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xl mb-1">Assessment Engine</h4>
                  <p className="text-[10px] uppercase font-bold text-silver tracking-widest italic">Result: Inconclusive</p>
                </div>
                <div className="text-right">
                   <span className="text-3xl font-black text-neon-volt">62<span className="text-sm text-silver">/100</span></span>
                </div>
             </div>
             
             <div className="p-8 space-y-6">
                {[
                  { label: "Source Credibility", value: 40, status: "Limited" },
                  { label: "Supporting Evidence", value: 65, status: "Partial" },
                  { label: "Conflicting Reports", value: 75, status: "Present" },
                  { label: "Context", value: 30, status: "Incomplete" },
                ].map((item) => (
                  <div key={item.label} className="space-y-2 group cursor-pointer">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold uppercase tracking-widest text-silver">{item.label}</span>
                       <span className="text-xs font-bold text-pure-white">{item.status}</span>
                    </div>
                    <div className="h-1.5 w-full bg-pure-black border border-charcoal/50 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: `${item.value}%` }}
                         transition={{ duration: 1, delay: 0.5 }}
                         className={`h-full ${item.value > 60 ? 'bg-neon-volt' : 'bg-charcoal'}`}
                       />
                    </div>
                    <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
                       <p className="text-[10px] text-silver mt-2">Extended analysis: The source has a high variance in truthfulness scores across historical datasets.</p>
                    </div>
                  </div>
                ))}
             </div>
             <div className="p-4 bg-pure-black border-t border-charcoal/50 text-center">
                <p className="text-[10px] font-bold text-neon-volt tracking-[2px] uppercase">Every conclusion is accompanied by its reasoning.</p>
             </div>
          </Card>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES */}
      <section id="capabilities" className="bg-near-black/50 border-y border-charcoal py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-sans font-black text-5xl md:text-6xl mb-8 uppercase">A UNIFIED APPROACH TO TRUST.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { title: 'GenWin App', badge: 'Available', desc: 'Evaluate the credibility of information and claims in real-time.', icon: <Activity className="text-neon-volt" /> },
              { title: 'GenWin Food', badge: 'Planned', desc: 'Assess ingredient transparency, sourcing, and nutritional integrity.', icon: <Zap /> },
              { title: 'GenWin Shop', badge: 'Planned', desc: 'Verify product authenticity, reviews, and brand claims.', icon: <Search /> },
              { title: 'GenWin Verify', badge: 'Future', desc: 'A scalable trust layer for platforms and entire ecosystems.', icon: <ShieldCheck /> },
            ].map((item) => (
              <Card key={item.title} className="bg-pure-black border-charcoal/80 flex flex-col p-8 group hover:border-neon-volt/50 transition-all">
                <div className="w-12 h-12 bg-near-black border border-charcoal rounded flex items-center justify-center mb-8 text-silver group-hover:text-neon-volt transition-colors">
                   {item.icon}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-bold text-xl">{item.title}</h3>
                </div>
                <div className="inline-flex px-2 py-0.5 border border-charcoal rounded text-[8px] font-black uppercase tracking-[2px] text-silver mb-6 self-start">
                   {item.badge}
                </div>
                <p className="text-silver text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>

          {/* Ecosystem Wheel */}
          <div className="flex flex-col items-center">
             <div className="relative w-80 h-80 flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-2 border-dashed border-charcoal/40 rounded-full"
               />
               <div className="z-10 w-32 h-32 bg-neon-volt rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(250,255,105,0.2)]">
                  <span className="text-pure-black font-black text-2xl">CORE</span>
               </div>
               {[0, 90, 180, 270].map((angle, i) => (
                 <div 
                   key={angle}
                   className="absolute"
                   style={{ transform: `rotate(${angle}deg) translateY(-140px) rotate(-${angle}deg)` }}
                 >
                   <div className="w-16 h-16 bg-near-black border border-charcoal rounded-xl flex items-center justify-center text-silver">
                      {i === 0 ? <Activity /> : i === 1 ? <Search /> : i === 2 ? <Zap /> : <ShieldCheck />}
                   </div>
                 </div>
               ))}
               <div className="absolute inset-x-0 bottom-[-40px] text-center">
                 <p className="text-[10px] font-black uppercase tracking-[4px] text-silver"> Ecosystem Network </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="container mx-auto px-6 py-32">
        <h2 className="font-sans font-black text-5xl md:text-6xl mb-20 text-center uppercase tracking-tight">BUILT FOR DECISIONS <br /> THAT <span className="text-neon-volt">MATTER.</span></h2>
        
        <div className="space-y-px border-y border-charcoal">
          {[
            { tag: "Academia", title: "Research & academia", desc: "Validate sources and evaluate the integrity of cited information.", icon: <Globe size={24} /> },
            { tag: "Personal", title: "Consumers", desc: "Evaluate product claims and brand transparency before purchase.", icon: <Users size={24} /> },
            { tag: "Enterprise", title: "Professionals", desc: "Assess business information and signals with absolute confidence.", icon: <Briefcase size={24} /> },
            { tag: "Content", title: "Media & content", desc: "Ensure credibility and verify origins before amplification.", icon: <FileText size={24} /> },
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              whileHover={{ backgroundColor: "rgba(250, 255, 105, 0.03)" }}
              className="group cursor-pointer py-10 px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-colors border-b border-charcoal last:border-b-0"
            >
              <div className="flex gap-8 items-center flex-1">
                <div className="text-charcoal group-hover:text-neon-volt transition-colors shrink-0">
                   {item.icon}
                </div>
                <div>
                   <span className="text-[10px] font-black uppercase tracking-[3px] text-silver mb-2 block">{item.tag}</span>
                   <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-silver lg:px-12 group-hover:text-pure-white transition-colors">{item.desc}</p>
              </div>
              <div className="hidden md:block">
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                   VIEW CASE
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACCESS & TRUST */}
      <section className="bg-near-black/80 border-y border-charcoal py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1">
               <h2 className="font-sans font-black text-5xl md:text-6xl mb-8 leading-tight">ACCESS DESIGNED WITH <span className="text-neon-volt">INTENTION.</span></h2>
               <div className="space-y-6 text-silver text-lg">
                <p>To maintain quality and responsible usage, GenWin operates as an authenticated platform.</p>
                <div className="space-y-3 pt-4">
                   {[
                     "Analysis history per session",
                     "Saved insights to personal dashboard",
                     "Continuous AI engine improvements"
                   ].map(text => (
                     <div key={text} className="flex gap-3 items-center">
                        <div className="w-1 h-1 rounded-full bg-neon-volt" />
                        <span className="text-sm font-medium">{text}</span>
                     </div>
                   ))}
                </div>
               </div>
               <NextLink href="/signup" className="inline-block mt-12">
                 <Button variant="neon" size="lg" className="px-12 group">
                   CREATE AN ACCOUNT <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </NextLink>
            </div>
            <div className="w-full md:w-80 h-80 bg-pure-black border border-charcoal rounded-2xl p-8 flex items-center justify-center relative overflow-hidden group">
               <motion.div 
                 animate={{ 
                   scale: [1, 1.1, 1],
                   opacity: [0.3, 0.5, 0.3]
                 }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute inset-0 bg-neon-volt/5 blur-3xl"
               />
               <Lock size={80} className="text-charcoal group-hover:text-neon-volt transition-colors relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden pt-48 pb-64">
        <div className="absolute inset-0 bg-gradient-to-b from-pure-black via-near-black to-pure-black -z-20" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-sans font-black text-6xl md:text-[80px] mb-8 leading-none">MAKE CLARITY <br />YOUR DEFAULT.</h2>
            <p className="text-silver text-xl md:text-2xl max-w-2xl mx-auto mb-16 font-medium">
              Start using GenWin to evaluate information with confidence and precision.
            </p>
            <NextLink href="/signup">
              <Button variant="forest" size="lg" className="px-16 h-16 text-xl rounded-none shadow-[0_0_50px_rgba(22,101,52,0.3)]">
                TRY GENWIN
              </Button>
            </NextLink>
          </motion.div>
        </div>
        
        {/* Abstract design elements */}
        <div className="absolute top-1/2 left-0 w-1/4 h-px bg-gradient-to-r from-neon-volt to-transparent opacity-20" />
        <div className="absolute top-1/2 right-0 w-1/4 h-px bg-gradient-to-l from-neon-volt to-transparent opacity-20" />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-deep-charcoal py-20 bg-pure-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-neon-volt flex items-center justify-center rounded">
                  <span className="text-pure-black font-black text-xl">G</span>
                </div>
                <span className="text-xl font-bold tracking-tight">GenWin</span>
              </div>
              <p className="text-silver text-sm max-w-xs leading-relaxed font-bold tracking-tight mb-2">GenWin — A system for trust.</p>
              <p className="text-[10px] uppercase font-black text-charcoal tracking-[3px]">© 2026 Engine Integrity Network</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-20 gap-y-10">
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase text-silver tracking-[3px]">Product</p>
                <div className="flex flex-col gap-2">
                  <NextLink href="/login" className="text-sm font-medium text-charcoal hover:text-neon-volt transition-colors underline-offset-4 hover:underline">App</NextLink>
                  <NextLink href="/#capabilities" className="text-sm font-medium text-charcoal hover:text-neon-volt transition-colors underline-offset-4 hover:underline">Ecosystem</NextLink>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase text-silver tracking-[3px]">Platform</p>
                <div className="flex flex-col gap-2">
                  <NextLink href="#" className="text-sm font-medium text-charcoal hover:text-neon-volt transition-colors underline-offset-4 hover:underline">Privacy</NextLink>
                  <NextLink href="#" className="text-sm font-medium text-charcoal hover:text-neon-volt transition-colors underline-offset-4 hover:underline">Terms</NextLink>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase text-silver tracking-[3px]">Contact</p>
                <div className="flex flex-col gap-2">
                  <NextLink href="#" className="text-sm font-medium text-charcoal hover:text-neon-volt transition-colors underline-offset-4 hover:underline">Support</NextLink>
                  <NextLink href="#" className="text-sm font-medium text-charcoal hover:text-neon-volt transition-colors underline-offset-4 hover:underline">Corporate</NextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
