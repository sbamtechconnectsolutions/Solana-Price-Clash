'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header, GameContainer, IntroScreen } from '@/components';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="min-h-screen bg-[#0F0F19] text-white flex flex-col items-center px-3 sm:px-4 pt-4 sm:pt-6 pb-8 sm:pb-12">
      {/* Intro Screen */}
      <AnimatePresence>
        {showIntro && (
          <IntroScreen onStart={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/20 rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/20 rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-500/10 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Game Container */}
      <div className="w-full flex justify-center mt-4 sm:mt-6">
        <GameContainer />
      </div>
    </main>
  );
}
