'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, Trophy, Users, Clock, ChevronDown } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-50 bg-[#0F0F19] flex flex-col items-center justify-center p-6"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-[100px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-md">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Zap className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 border-2 border-dashed border-purple-500/30 rounded-[2rem]"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-black text-white mb-3"
        >
          Price Clash
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mb-8"
        >
          Predict SOL price. Win points. Climb the leaderboard.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-gray-400">10 Second</p>
            <p className="text-sm font-bold text-white">Rounds</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-xs text-gray-400">Streak</p>
            <p className="text-sm font-bold text-white">Multipliers</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs text-gray-400">Global</p>
            <p className="text-sm font-bold text-white">Leaderboard</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl font-bold text-lg text-white shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 group"
          >
            Start Playing
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        )}

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xs text-gray-600"
        >
          Built on <span className="text-purple-400">Solana</span> ⚡ for Indie.fun Hackathon
        </motion.p>
      </div>
    </motion.div>
  );
}
