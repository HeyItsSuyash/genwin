'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

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
      // 1. Execute reCAPTCHA
      const siteKey = '6LdtrMYsAAAAAGGTaihkE9LTYphc3gbLmsIcPlHE';
      const token = await window.grecaptcha.enterprise.execute(siteKey, { action: 'SIGNUP' });

      // 2. Verify reCAPTCHA on server
      const verifyRes = await fetch('/api/recaptcha/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action: 'SIGNUP' }),
      });
      
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        throw new Error(verifyData.error || 'Verification failed');
      }

      // 3. Proceed with Firebase signup
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      // The auto-login will trigger the token and backend sync in AuthContext
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
      // reCAPTCHA execution
      const siteKey = '6LdtrMYsAAAAAGGTaihkE9LTYphc3gbLmsIcPlHE';
      const token = await window.grecaptcha.enterprise.execute(siteKey, { action: 'SIGNUP' });

      // Verification
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
    <main className="min-h-screen bg-pure-black text-pure-white flex items-center justify-center p-6 selection:bg-neon-volt selection:text-pure-black">
      <Card className="w-full max-w-md bg-near-black" elevated>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:text-neon-volt transition-colors">
              <div className="w-8 h-8 bg-neon-volt flex items-center justify-center rounded">
                <span className="text-pure-black font-black text-xl">G</span>
              </div>
              <span className="text-xl font-bold tracking-tight">GenWin</span>
            </Link>
            <h1 className="font-heading font-semibold text-3xl mb-2">Create Account</h1>
            <p className="text-silver text-sm text-balance">Join the integrity engine network.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded bg-red-900/30 border border-red-500/50 text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold tracking-[1.4px] uppercase text-silver">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-pure-black border border-charcoal/80 rounded px-4 py-3 text-pure-white focus:outline-none focus:border-neon-volt focus:ring-1 focus:ring-neon-volt transition-colors"
                placeholder="Operator Name"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold tracking-[1.4px] uppercase text-silver">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-pure-black border border-charcoal/80 rounded px-4 py-3 text-pure-white focus:outline-none focus:border-neon-volt focus:ring-1 focus:ring-neon-volt transition-colors"
                placeholder="operator@genwin.ai"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold tracking-[1.4px] uppercase text-silver">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-pure-black border border-charcoal/80 rounded px-4 py-3 text-pure-white focus:outline-none focus:border-neon-volt focus:ring-1 focus:ring-neon-volt transition-colors"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <Button variant="forest" fullWidth type="submit" disabled={isLoading} className="mt-2">
              {isLoading ? 'INITIALIZING...' : 'CREATE ACCOUNT'}
            </Button>
          </form>

          <div className="my-6 flex items-center text-silver text-xs font-semibold tracking-[1.4px] uppercase">
            <div className="flex-1 border-t border-charcoal/80"></div>
            <span className="px-4">Or</span>
            <div className="flex-1 border-t border-charcoal/80"></div>
          </div>

          <Button variant="ghost" fullWidth onClick={handleGoogleSignup} disabled={isLoading} className="border-charcoal hover:border-border-olive">
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            CONTINUE WITH GOOGLE
          </Button>
          
          <div className="mt-8 text-center text-sm text-silver">
            Already have an account? <Link href="/login" className="text-pure-white font-medium hover:text-neon-volt transition-colors">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
