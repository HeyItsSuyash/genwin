'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

const logoPath = "/logo-volt.png";
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
      isScrolled ? 'bg-pure-black/90 backdrop-blur-md py-3 border-charcoal/80' : 'bg-transparent py-5 border-transparent'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <Image 
              src={logoPath} 
              alt="GenWin Logo" 
              width={32} 
              height={32} 
              className="object-contain"
            />
          </div>
          <span className="text-xl font-black tracking-tight uppercase group-hover:text-neon-volt transition-colors">GenWin</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          <Link href="/#analysis" className="text-[11.2px] font-black tracking-[1.4px] uppercase text-silver hover:text-neon-volt transition-colors">Protocol</Link>
          <Link href="/#capabilities" className="text-[11.2px] font-black tracking-[1.4px] uppercase text-silver hover:text-neon-volt transition-colors">Ecosystem</Link>
          <Link href="/login" className="text-[11.2px] font-black tracking-[1.4px] uppercase text-silver hover:text-neon-volt transition-colors">Session Login</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/signup">
            <Button variant="neon" size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
