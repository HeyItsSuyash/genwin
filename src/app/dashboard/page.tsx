'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { TrustAnalysisResult } from '@/lib/ai/groq';

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
      
      fetchHistory(); // Refresh history
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
    return <div className="min-h-screen bg-pure-black flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-neon-volt border-t-transparent animate-spin"></div>
    </div>;
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-forest-green border-forest-green';
    if (score >= 40) return 'text-pale-yellow border-pale-yellow';
    return 'text-red-500 border-red-500';
  };

  return (
    <main className="min-h-screen bg-pure-black text-pure-white selection:bg-neon-volt selection:text-pure-black flex flex-col h-screen overflow-hidden">
      {/* Topbar */}
      <nav className="h-16 border-b border-deep-charcoal flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-neon-volt flex items-center justify-center rounded">
            <span className="text-pure-black font-black text-xs">G</span>
          </div>
          <span className="font-bold tracking-tight">GenWin Engine</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-silver hidden sm:inline-block">{user.email}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>EXEC QUIT</Button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden h-full">
        {/* Main Workspace */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col max-w-4xl mx-auto w-full">
          
          <h2 className="font-heading font-semibold text-2xl mb-6">Execution Terminal</h2>
          
          <div className="flex flex-col gap-6 w-full">
            {error && (
              <div className="p-4 bg-red-900/30 border border-red-500/50 text-red-200 rounded text-sm">
                {error}
              </div>
            )}
            
            <div className="relative group">
              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Paste news, claim, or tweet here..."
                className="w-full h-40 bg-near-black border border-charcoal/80 rounded resize-none p-4 text-pure-white focus:outline-none focus:border-neon-volt focus:ring-1 focus:ring-neon-volt transition-colors font-mono text-sm leading-relaxed"
              />
              <div className="absolute bottom-4 right-4">
                <Button 
                  variant="neon" 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !inputText.trim()}
                >
                  {isAnalyzing ? 'ANALYZING...' : 'ANALYZE'}
                </Button>
              </div>
            </div>

            {/* Results Section */}
            {isAnalyzing ? (
              <div className="py-20 flex flex-col items-center justify-center text-silver">
                <div className="w-8 h-8 rounded border-2 border-neon-volt border-t-transparent animate-spin mb-4"></div>
                <p className="font-mono text-sm tracking-[1.4px]">PROCESSING INTELLIGENCE...</p>
              </div>
            ) : result ? (
              <Card variant="highlighted" elevated className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader className="border-b border-charcoal/80 bg-near-black rounded-t-lg flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
                  <div>
                    <p className="text-silver text-xs font-bold tracking-[1.4px] uppercase mb-1">Extracted Claim</p>
                    <h3 className="font-semibold text-xl">{result.claim}</h3>
                  </div>
                  <div className={`shrink-0 flex items-center justify-center w-20 h-20 rounded-full border-4 ${getScoreColor(result.trustScore)} bg-pure-black`}>
                    <span className="font-sans font-black text-2xl">{result.trustScore}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0 bg-pure-black grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-charcoal/80 rounded-b-lg">
                  <div className="p-6">
                    <div className="mb-6">
                      <p className="text-silver text-xs font-bold tracking-[1.4px] uppercase mb-2">Verdict</p>
                      <span className={`inline-flex px-3 py-1 text-sm font-bold uppercase tracking-wider rounded border ${getScoreColor(result.trustScore)} bg-near-black`}>
                        {result.verdict}
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-silver text-xs font-bold tracking-[1.4px] uppercase mb-2">Source Credibility</p>
                      <p className="text-sm leading-relaxed">{result.sourceCredibility}</p>
                    </div>

                    <div>
                      <p className="text-silver text-xs font-bold tracking-[1.4px] uppercase mb-2">Evidence</p>
                      <ul className="list-disc pl-4 space-y-2 text-sm">
                        {result.supportingEvidence.map((ev, i) => (
                          <li key={i}>{ev}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-near-black/30">
                    <div className="mb-6">
                      <p className="text-silver text-xs font-bold tracking-[1.4px] uppercase mb-2">Contradictions</p>
                      {result.contradictions.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-2 text-sm text-red-200">
                          {result.contradictions.map((ct, i) => (
                            <li key={i}>{ct}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-silver">No major contradictions found.</p>
                      )}
                    </div>

                    <div>
                      <p className="text-silver text-xs font-bold tracking-[1.4px] uppercase mb-2">Missing Context</p>
                      <p className="text-sm leading-relaxed bg-charcoal/30 border border-charcoal/80 rounded p-3">
                        {result.missingContext}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}

          </div>
        </div>

        {/* History Sidebar */}
        <div className="hidden lg:flex flex-col w-80 border-l border-deep-charcoal bg-near-black/40 h-full">
          <div className="p-4 border-b border-deep-charcoal">
            <h3 className="font-semibold text-sm tracking-[1.4px] uppercase text-silver">Operation History</h3>
          </div>
          <div className="flex-1 overflow-y-auto w-full p-2 space-y-2">
            {history.length === 0 ? (
              <p className="text-xs text-silver p-4 text-center">No logs found.</p>
            ) : (
              history.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setResult(item)}
                  className="w-full text-left p-3 rounded hover:bg-hover-gray transition-colors border border-transparent hover:border-charcoal/80 group focus:outline-none focus:ring-1 focus:ring-neon-volt"
                >
                  <p className="text-xs font-mono text-silver mb-1 truncate">{new Date(item.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm font-medium line-clamp-2 leading-snug group-hover:text-neon-volt transition-colors">{item.claim}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                      item.trustScore >= 70 ? 'text-forest-green border-forest-green' : item.trustScore >= 40 ? 'text-pale-yellow border-pale-yellow' : 'text-red-500 border-red-500'
                    }`}>
                      {item.trustScore}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
