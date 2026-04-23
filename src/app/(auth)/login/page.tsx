'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Terminal, Lock, ChevronRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google Auth failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-pure-black text-pure-white flex items-center justify-center p-6 selection:bg-neon-volt selection:text-pure-black font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,255,105,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <Card className="w-full max-w-md bg-near-black border-charcoal/80" elevated>
        <CardContent className="p-10">
          <div className="flex flex-col items-center mb-10 text-center">
            <Link href="/" className="mb-8 group">
              <div className="w-12 h-12 bg-neon-volt flex items-center justify-center rounded-[2px] shadow-[0_0_20px_rgba(250,255,105,0.2)] group-hover:scale-105 transition-transform">
                <span className="text-pure-black font-black text-2xl">G</span>
              </div>
            </Link>
            <h1 className="font-sans font-black text-[32px] uppercase tracking-[-0.02em] leading-none mb-3">
              SESSION LOGIN
            </h1>
            <p className="text-silver text-[11.2px] font-black tracking-[2px] uppercase opacity-70">
              Integrity Engine v1.0.4
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-[2px] bg-red-900/20 border border-red-500/30 text-red-400 text-[11.2px] font-bold uppercase tracking-wider flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[2px] uppercase text-silver">Access Identifier</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-pure-black border border-charcoal/80 rounded-[2px] px-4 py-4 text-sm text-pure-white focus:outline-none focus:border-neon-volt focus:ring-0 transition-colors placeholder:text-near-black"
                  placeholder="operator@genwin.network"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[2px] uppercase text-silver">Security Credential</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-pure-black border border-charcoal/80 rounded-[2px] px-4 py-4 text-sm text-pure-white focus:outline-none focus:border-neon-volt focus:ring-0 transition-colors placeholder:text-near-black"
                placeholder="••••••••"
              />
            </div>

            <Button variant="neon" fullWidth type="submit" disabled={isLoading} className="h-14">
              {isLoading ? 'ESTABLISHING...' : 'AUTHORIZE SESSION'}
            </Button>
          </form>

          <div className="my-10 flex items-center gap-4">
            <div className="flex-1 h-px bg-charcoal/40"></div>
            <span className="text-[10px] font-black uppercase tracking-[3px] text-charcoal">X</span>
            <div className="flex-1 h-px bg-charcoal/40"></div>
          </div>

          <Button variant="ghost" fullWidth onClick={handleGoogleLogin} disabled={isLoading} className="h-14 border-charcoal/80 hover:border-neon-volt">
            <svg viewBox="0 0 24 24" className="w-4 h-4 mr-3" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Google Identity
          </Button>
          
          <div className="mt-10 text-center font-bold">
            <span className="text-[11.2px] uppercase tracking-[1.4px] text-silver">No current access? </span>
            <Link href="/signup" className="text-[11.2px] uppercase tracking-[1.4px] text-neon-volt hover:underline underline-offset-4">Create Identity</Link>
          </div>
        </CardContent>
      </Card>
      
      <div className="absolute bottom-10 flex items-center gap-4 opacity-30">
         <Terminal size={14} className="text-silver" />
         <span className="text-[10px] font-black uppercase tracking-[4px] text-silver">Terminal Session: RESTRICTED</span>
      </div>
    </main>
  );
}
