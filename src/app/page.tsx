import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { ShieldCheck, Zap, BarChart } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-pure-black text-pure-white selection:bg-neon-volt selection:text-pure-black">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between border-b border-deep-charcoal">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neon-volt flex items-center justify-center rounded">
            <span className="text-pure-black font-black text-xl">G</span>
          </div>
          <span className="text-xl font-bold tracking-tight">GenWin</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-semibold hover:text-neon-volt transition-colors">
            SIGN IN
          </Link>
          <Link href="/login">
            <Button variant="neon" size="sm">GET STARTED</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-32 md:py-48 flex flex-col items-center text-center">
        <h1 className="font-sans font-black text-6xl md:text-[96px] leading-[1.0] max-w-5xl tracking-tight mb-8">
          ASSESS TRUTH AT <span className="text-neon-volt">EXTREME</span> SPEED
        </h1>
        <p className="text-silver text-xl md:text-2xl max-w-2xl mb-12 font-medium">
          GenWin evaluates the trustworthiness of claims, news, and complex datasets in milliseconds using advanced AI integrity engines.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center">
          <Link href="/login">
            <Button variant="forest" size="lg" className="w-full sm:w-auto px-10">START ANALYZING</Button>
          </Link>
          <Link href="#features">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto px-10">VIEW FEATURES</Button>
          </Link>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="border-y border-charcoal/80 bg-near-black/50">
        <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-charcoal/80">
          <div className="flex flex-col items-center text-center px-4">
            <span className="font-sans font-black text-6xl md:text-7xl mb-2">99<span className="text-neon-volt">%</span></span>
            <span className="text-silver text-sm font-bold tracking-[1.4px] uppercase">Analysis Accuracy</span>
          </div>
          <div className="flex flex-col items-center text-center px-4 pt-12 md:pt-0">
            <span className="font-sans font-black text-6xl md:text-7xl mb-2">&lt;2<span className="text-neon-volt">s</span></span>
            <span className="text-silver text-sm font-bold tracking-[1.4px] uppercase">Average Latency</span>
          </div>
          <div className="flex flex-col items-center text-center px-4 pt-12 md:pt-0">
            <span className="font-sans font-black text-6xl md:text-7xl mb-2">∞</span>
            <span className="text-silver text-sm font-bold tracking-[1.4px] uppercase">Scalable Insights</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-6 py-32">
        <div className="mb-20 text-center">
          <p className="text-silver text-sm font-bold tracking-[1.4px] uppercase mb-4">Core Capabilities</p>
          <h2 className="font-heading font-semibold text-4xl md:text-5xl">Engineered for integrity.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card elevated>
            <CardHeader>
              <div className="w-12 h-12 rounded bg-near-black border border-charcoal/80 flex items-center justify-center mb-6 text-neon-volt">
                <BarChart size={24} />
              </div>
              <h3 className="font-heading font-semibold text-2xl mb-3">Trust Scoring</h3>
            </CardHeader>
            <CardContent>
              <p className="text-silver">
                Proprietary AI evaluation generates a rigorous 0-100 metric based on verifiable evidence, logic consistency, and source credibility.
              </p>
            </CardContent>
          </Card>
          
          <Card variant="highlighted" elevated>
            <CardHeader>
              <div className="w-12 h-12 rounded bg-near-black border border-charcoal/80 flex items-center justify-center mb-6 text-neon-volt">
                <Zap size={24} />
              </div>
              <h3 className="font-heading font-semibold text-2xl mb-3">Real-time Claims</h3>
            </CardHeader>
            <CardContent>
              <p className="text-silver">
                Paste any statement and instantly receive a structured breakdown identifying the core claim, contradictions, and missing context.
              </p>
            </CardContent>
          </Card>
          
          <Card elevated>
            <CardHeader>
              <div className="w-12 h-12 rounded bg-near-black border border-charcoal/80 flex items-center justify-center mb-6 text-neon-volt">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-heading font-semibold text-2xl mb-3">Immutable History</h3>
            </CardHeader>
            <CardContent>
              <p className="text-silver">
                Every analysis is securely logged to user dashboards via a high-performance NoSQL backend, guaranteeing traceable fact-checking.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-deep-charcoal py-12">
        <div className="container mx-auto px-6 text-center text-silver text-sm">
          <p>© {new Date().getFullYear()} GenWin Platform. Engineered for truth.</p>
        </div>
      </footer>
    </main>
  );
}
