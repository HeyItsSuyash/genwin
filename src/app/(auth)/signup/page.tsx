'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Terminal, Shield, Zap } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const siteKey = '6LdtrMYsAAAAAGGTaihkE9LTYphc3gbLmsIcPlHE';
      const token = await window.grecaptcha.enterprise.execute(siteKey, { action: 'SIGNUP' });

      const verifyRes = await fetch('/api/recaptcha/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action: 'SIGNUP' }),
      });
      
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        throw new Error(verifyData.error || 'Verification failed');
      }

      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const siteKey = '6LdtrMYsAAAAAGGTaihkE9LTYphc3gbLmsIcPlHE';
      const token = await window.grecaptcha.enterprise.execute(siteKey, { action: 'SIGNUP' });

      const verifyRes = await fetch('/api/recaptcha/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action: 'SIGNUP' }),
      });
      
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        throw new Error(verifyData.error || 'Verification failed');
      }

      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google Auth failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-pure-black text-pure-white flex items-center justify-center p-6 selection:bg-neon-volt selection:text-pure-black font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-volt/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-green/5 blur-[120px] -z-10" />
      
      <Card className="w-full max-w-md bg-near-black border-charcoal/80" elevated>
        <CardContent className="p-10">
          <div className="flex flex-col items-center mb-10 text-center">
            <Link href="/" className="mb-8 group">
              <div className="w-12 h-12 bg-neon-volt flex items-center justify-center rounded-[2px] shadow-[0_0_20px_rgba(250,255,105,0.2)] group-hover:rotate-90 transition-transform duration-500">
                <span className="text-pure-black font-black text-2xl">G</span>
              </div>
            </Link>
            <h1 className="font-sans font-black text-[32px] uppercase tracking-[-0.02em] leading-none mb-3">
              IDENTITY CREATION
            </h1>
            <p className="text-silver text-[11.2px] font-black tracking-[2px] uppercase opacity-70">
              Network Access Protocol v1.0
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-[2px] bg-red-900/20 border border-red-500/30 text-red-400 text-[11.2px] font-bold uppercase tracking-wider flex items-center gap-3">
              <Shield size={14} />
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[2px] uppercase text-silver">Operator Name</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-pure-black border border-charcoal/80 rounded-[2px] px-4 py-4 text-sm text-pure-white focus:outline-none focus:border-neon-volt focus:ring-0 transition-colors placeholder:text-near-black"
                placeholder="Full Name / Identification"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[2px] uppercase text-silver">Identifier (Email)</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-pure-black border border-charcoal/80 rounded-[2px] px-4 py-4 text-sm text-pure-white focus:outline-none focus:border-neon-volt focus:ring-0 transition-colors placeholder:text-near-black"
                placeholder="operator@genwin.network"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[2px] uppercase text-silver">Access Key (Password)</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-pure-black border border-charcoal/80 rounded-[2px] px-4 py-4 text-sm text-pure-white focus:outline-none focus:border-neon-volt focus:ring-0 transition-colors placeholder:text-near-black"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <Button variant="forest" fullWidth type="submit" disabled={isLoading} className="h-14 mt-4">
              {isLoading ? 'PROTOCOL INITIATING...' : 'ESTABLISH IDENTITY'}
            </Button>
          </form>

          <div className="my-10 flex items-center gap-4">
            <div className="flex-1 h-px bg-charcoal/40"></div>
            <span className="text-[10px] font-black uppercase tracking-[3px] text-charcoal">OR</span>
            <div className="flex-1 h-px bg-charcoal/40"></div>
          </div>

          <Button variant="ghost" fullWidth onClick={handleGoogleSignup} disabled={isLoading} className="h-14 border-charcoal/80 hover:border-border-olive group">
            <Zap size={14} className="mr-3 text-silver group-hover:text-neon-volt transition-colors" />
            Quick Identity (Google)
          </Button>
          
          <div className="mt-10 text-center font-bold">
            <span className="text-[11.2px] uppercase tracking-[1.4px] text-silver">Active Session? </span>
            <Link href="/login" className="text-[11.2px] uppercase tracking-[1.4px] text-neon-volt hover:underline underline-offset-4">Resume Login</Link>
          </div>
        </CardContent>
      </Card>
      
      <div className="absolute bottom-10 flex items-center gap-4 opacity-30">
         <Terminal size={14} className="text-silver" />
         <span className="text-[10px] font-black uppercase tracking-[4px] text-silver">Node Status: INITIALIZING</span>
      </div>
    </main>
  );
}
