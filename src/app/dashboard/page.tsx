'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { TrustAnalysisResult } from '@/lib/ai/groq';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Search, 
  Activity, 
  Clock, 
  ChevronRight, 
  LogOut, 
  ShieldCheck, 
  AlertCircle,
  Database,
  Cpu
} from 'lucide-react';

type HistoryItem = TrustAnalysisResult & { _id: string; createdAt: string };

export default function DashboardPage() {
  const { user, loading, token } = useAuth();
  const router = useRouter();
  
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<TrustAnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (token) {
      fetchHistory();
    }
  }, [token]);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setHistory(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setError('');
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ inputText })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to analyze');
      
      setResult({
        claim: data.data.claim,
        trustScore: data.data.trustScore,
        verdict: data.data.verdict,
        sourceCredibility: data.data.sourceCredibility,
        supportingEvidence: data.data.supportingEvidence,
        contradictions: data.data.contradictions,
        missingContext: data.data.missingContext
      });
      
      fetchHistory(); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-pure-black flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 bg-neon-volt flex items-center justify-center rounded-[2px] animate-pulse">
           <span className="text-pure-black font-black text-2xl">G</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[4px] text-silver">Initializing Node...</span>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-forest-green border-forest-green shadow-[0_0_10px_rgba(22,101,52,0.3)]';
    if (score >= 40) return 'text-pale-yellow border-pale-yellow shadow-[0_0_10px_rgba(244,246,146,0.3)]';
    return 'text-red-500 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
  };

  return (
    <main className="min-h-screen bg-pure-black text-pure-white selection:bg-neon-volt selection:text-pure-black flex flex-col h-screen overflow-hidden font-sans">
      {/* Dynamic Topbar */}
      <nav className="h-20 border-b border-charcoal/80 bg-near-black flex items-center justify-between px-8 shrink-0 relative z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 bg-neon-volt flex items-center justify-center rounded-[2px]">
              <span className="text-pure-black font-black text-xl">G</span>
            </div>
            <span className="font-black text-lg uppercase tracking-tight hidden sm:block">GenWin Engine </span>
          </div>
          <div className="h-6 w-px bg-charcoal/40 hidden md:block" />
          <div className="hidden md:flex items-center gap-3">
             <span className="text-[10px] font-black uppercase tracking-[2px] text-silver border border-charcoal/80 px-2 py-0.5 rounded-[2px]">ID: {user.email?.split('@')[0]}</span>
             <span className="text-[10px] font-black uppercase tracking-[2px] text-neon-volt border border-neon-volt/30 px-2 py-0.5 rounded-[2px] bg-neon-volt/5">● ACTIVE_NODE_v1.0.4</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="group border-charcoal/80">
            <LogOut size={14} className="mr-2 group-hover:text-neon-volt" /> 
            QUIT_SESSION
          </Button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden h-full relative">
        {/* Abstract Workspace Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,65,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(65,65,65,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Left Sidebar: Operational Logs */}
        <div className="hidden xl:flex flex-col w-72 border-r border-charcoal/80 bg-pure-black h-full z-10">
           <div className="p-6 border-b border-charcoal/80 flex items-center gap-3">
              <Clock size={14} className="text-silver" />
              <h3 className="font-black text-[10px] tracking-[2px] uppercase text-silver">Operation logs</h3>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {history.length === 0 ? (
                <div className="p-4 border border-dashed border-charcoal/40 rounded-[4px] text-center">
                   <p className="text-[10px] font-black uppercase text-charcoal tracking-widest">No signals detected</p>
                </div>
              ) : (
                history.map((item) => (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={item._id}
                    onClick={() => setResult(item)}
                    className="w-full text-left p-4 bg-near-black/50 border border-charcoal/40 rounded-[2px] hover:border-neon-volt transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-charcoal group-hover:bg-neon-volt transition-colors" />
                    <p className="text-[8px] font-black font-mono text-silver mb-2 opacity-60">{new Date(item.createdAt).toISOString()}</p>
                    <p className="text-[11px] font-bold line-clamp-1 group-hover:text-neon-volt transition-colors uppercase tracking-tight">{item.claim}</p>
                    <div className="mt-3 flex items-center justify-between">
                       <span className={`text-[8px] font-black px-1.5 py-0.5 border ${getScoreColor(item.trustScore)} bg-pure-black`}>SC:{item.trustScore}</span>
                       <span className="text-[8px] font-black text-silver uppercase tracking-widest">v.{item.verdict.split(' ')[0]}</span>
                    </div>
                  </motion.button>
                ))
              )}
           </div>
           <div className="p-4 bg-near-black border-t border-charcoal/80">
              <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[2px] text-silver">
                 <span>Packets Analyzed</span>
                 <span className="text-neon-volt">{history.length}</span>
              </div>
           </div>
        </div>

        {/* Central Assessment Chamber */}
        <div className="flex-1 overflow-y-auto w-full z-10 custom-scrollbar relative">
          <div className="max-w-5xl mx-auto p-6 md:p-12">
            
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-12 flex items-center gap-4"
            >
               <Terminal size={18} className="text-neon-volt" />
               <h2 className="font-sans font-black text-3xl uppercase tracking-[-0.03em]">Execution Chamber</h2>
            </motion.div>
            
            <div className="space-y-12">
              <Card className="bg-near-black border-charcoal/80 p-1 relative overflow-hidden group">
                 <div className="bg-pure-black p-6 rounded-[6px]">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="w-2 h-2 rounded-full bg-neon-volt animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-[3px] text-silver">Awaiting signal input...</span>
                    </div>
                    <textarea
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder="Input claims, headlines, or brand descriptions for integrity deconstruction..."
                      className="w-full h-48 bg-transparent resize-none p-0 text-xl md:text-2xl font-medium text-pure-white focus:outline-none placeholder:text-charcoal placeholder:font-black placeholder:uppercase placeholder:tracking-[2px] placeholder:text-sm"
                    />
                    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-charcoal/40 pt-6">
                       <div className="flex gap-4">
                          <button className="text-[10px] font-black uppercase tracking-[2px] text-silver hover:text-neon-volt transition-colors flex items-center gap-2">
                             <Database size={12} /> External_Reference_On
                          </button>
                          <button className="text-[10px] font-black uppercase tracking-[2px] text-silver hover:text-neon-volt transition-colors flex items-center gap-2">
                             <Cpu size={12} /> Llama_v3.3_70B
                          </button>
                       </div>
                       <Button 
                        variant="neon" 
                        size="lg"
                        className="w-full md:w-auto h-16 group shadow-[0_0_30px_rgba(250,255,105,0.05)]"
                        onClick={handleAnalyze} 
                        disabled={isAnalyzing || !inputText.trim()}
                      >
                        {isAnalyzing ? (
                          <span className="flex items-center gap-3">
                            <Activity className="animate-spin" size={18} /> INITIALIZING_ANALYSIS
                          </span>
                        ) : (
                          <span className="flex items-center gap-3">
                            EXECUTE_DECONSTRUCTION <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </Button>
                    </div>
                 </div>
              </Card>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 bg-red-900/10 border border-red-500/30 text-red-400 rounded-[4px] flex items-center gap-4"
                >
                  <AlertCircle size={20} />
                  <span className="text-[11.2px] font-black uppercase tracking-[2px]">Error detected: {error}</span>
                </motion.div>
              )}

              {/* Assessment Visualization Zone */}
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-32 flex flex-col items-center justify-center gap-8 border border-dashed border-charcoal/40 rounded-2xl"
                  >
                    <div className="relative w-24 h-24">
                       <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 border-4 border-neon-volt border-t-transparent rounded-full shadow-[0_0_20px_#faff69/0.2]"
                       />
                       <div className="absolute inset-4 bg-near-black border border-charcoal/80 flex items-center justify-center">
                          <Activity className="text-neon-volt" size={20} />
                       </div>
                    </div>
                    <div className="text-center space-y-2">
                       <p className="text-[11.2px] font-black tracking-[4px] uppercase text-silver">Cross-referencing global Signal database...</p>
                       <p className="text-[10px] font-mono text-neon-volt/60 tracking-[2px] uppercase">Allocating Core-Llama Compute Resources</p>
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    {/* Header Score Block */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                       <div className="lg:col-span-8">
                          <Card className="h-full bg-near-black border-charcoal/80 p-8 flex flex-col justify-between">
                             <div>
                               <p className="text-[10px] font-black uppercase tracking-[3px] text-silver mb-4">Signal Content</p>
                               <h3 className="font-sans font-black text-2xl md:text-3xl leading-tight uppercase tracking-tight">{result.claim}</h3>
                             </div>
                             <div className="mt-12 flex items-center gap-6">
                                <div className="px-6 py-2 bg-pure-black border border-charcoal/80 flex flex-col items-center">
                                   <span className="text-[8px] font-black text-silver uppercase mb-1">Verdict</span>
                                   <span className="text-xs font-black text-neon-volt uppercase">{result.verdict}</span>
                                </div>
                                <div className="px-6 py-2 bg-pure-black border border-charcoal/80 flex flex-col items-center">
                                   <span className="text-[8px] font-black text-silver uppercase mb-1">Integrity_v</span>
                                   <span className="text-xs font-black text-neon-volt uppercase tracking-widest">v1.2.0</span>
                                </div>
                             </div>
                          </Card>
                       </div>
                       <div className="lg:col-span-4">
                          <Card className="h-full bg-near-black border-charcoal/80 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                             <div className="absolute inset-0 bg-neon-volt/5 pointer-events-none" />
                             <div className={`w-32 h-32 rounded-full border-4 ${getScoreColor(result.trustScore)} flex items-center justify-center bg-pure-black relative z-10`}>
                                <span className="font-sans font-black text-5xl">{result.trustScore}</span>
                             </div>
                             <span className="mt-6 text-[10px] font-black uppercase tracking-[4px] text-silver relative z-10">Calculated Score</span>
                          </Card>
                       </div>
                    </div>

                    {/* Deep Analysis Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <Card className="bg-near-black/50 border-charcoal/80 p-8 space-y-8">
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                               <ShieldCheck size={14} className="text-neon-volt" />
                               <h4 className="text-[11.2px] font-black uppercase tracking-[2px]">Source Credibility</h4>
                            </div>
                            <p className="text-silver text-sm leading-relaxed font-medium">{result.sourceCredibility}</p>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                               <Activity size={14} className="text-neon-volt" />
                               <h4 className="text-[11.2px] font-black uppercase tracking-[2px]">Supporting Evidence</h4>
                            </div>
                            <ul className="space-y-4">
                               {result.supportingEvidence.map((ev, i) => (
                                 <li key={i} className="flex gap-4 p-3 bg-pure-black border border-charcoal/40 rounded-[2px] text-xs font-medium group">
                                    <span className="text-neon-volt group-hover:rotate-45 transition-transform duration-300">#</span>
                                    {ev}
                                 </li>
                               ))}
                            </ul>
                          </div>
                       </Card>

                       <Card className="bg-near-black/50 border-charcoal/80 p-8 space-y-8 border-b-red-500/20">
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                               <AlertCircle size={14} className="text-red-500" />
                               <h4 className="text-[11.2px] font-black uppercase tracking-[2px] text-red-500">Atomic Contradictions</h4>
                            </div>
                            <div className="space-y-3">
                               {result.contradictions.length > 0 ? (
                                  result.contradictions.map((ct, i) => (
                                    <div key={i} className="p-3 bg-red-900/5 border border-red-500/20 text-xs font-medium text-red-200">
                                       ● {ct}
                                    </div>
                                  ))
                               ) : (
                                  <div className="p-3 bg-pure-black border border-charcoal/40 text-xs text-silver opacity-50 uppercase tracking-widest text-[9px] text-center">
                                     Zero significant contradictions detected
                                  </div>
                               )}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-3 mb-4">
                               <Search size={14} className="text-neon-volt" />
                               <h4 className="text-[11.2px] font-black uppercase tracking-[2px]">Missing Context Leakage</h4>
                            </div>
                            <div className="p-4 bg-pure-black border border-charcoal/80 rounded-[4px] relative">
                               <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center opacity-20"><Terminal size={12}/></div>
                               <p className="text-silver text-xs leading-relaxed font-mono">
                                  {result.missingContext}
                               </p>
                            </div>
                          </div>
                       </Card>
                    </div>
                  </motion.div>
                ) : (
                  <div className="py-40 flex flex-col items-center justify-center border border-dashed border-charcoal/40 rounded-2xl opacity-20">
                     <Search size={48} className="text-charcoal mb-6" />
                     <p className="text-[11.2px] font-black uppercase tracking-[4px] text-charcoal">Establish signal above to begin chamber deconstruction</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
