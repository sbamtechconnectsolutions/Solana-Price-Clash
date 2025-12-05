'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Timer, ArrowUp, ArrowDown } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { useSound, useHaptic } from '@/hooks/useSound';

interface GameTimerProps {
  onTimeUp: () => void;
}

export function GameTimer({ onTimeUp }: GameTimerProps) {
  const { timeLeft, setTimeLeft, userBet, startPrice, currentPrice } = useGameStore();
  const { playTick } = useSound();
  const { lightTap } = useHaptic();
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      
      // Sound and haptic feedback
      if (timeLeft <= 4) {
        playTick();
        lightTap();
        setIsUrgent(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, setTimeLeft, onTimeUp, playTick, lightTap]);

  // Calculate progress
  const progress = (timeLeft / 10) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Determine if currently winning
  const isWinning = userBet === 'UP' 
    ? currentPrice > startPrice 
    : currentPrice < startPrice;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-[#1A1A2E]/80 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/30"
    >
      {/* User's Bet Indicator */}
      <div className="flex justify-center mb-6">
        <div className={`
          flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg
          ${userBet === 'UP' 
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }
        `}>
          {userBet === 'UP' ? (
            <>
              <ArrowUp className="w-5 h-5" />
              <span>You bet UP</span>
            </>
          ) : (
            <>
              <ArrowDown className="w-5 h-5" />
              <span>You bet DOWN</span>
            </>
          )}
        </div>
      </div>

      {/* Circular Timer */}
      <div className="relative flex justify-center items-center mb-6">
        <svg className="w-32 h-32 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="45"
            stroke={isUrgent ? '#f43f5e' : '#8b5cf6'}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              filter: isUrgent ? 'drop-shadow(0 0 10px #f43f5e)' : 'drop-shadow(0 0 10px #8b5cf6)',
            }}
          />
        </svg>
        
        {/* Time Display */}
        <motion.div
          className="absolute flex flex-col items-center"
          animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0 }}
        >
          <span className={`text-5xl font-black ${isUrgent ? 'text-rose-400' : 'text-white'}`}>
            {timeLeft}
          </span>
          <span className="text-gray-400 text-xs uppercase tracking-wider">seconds</span>
        </motion.div>
      </div>

      {/* Current Status */}
      <motion.div
        animate={{
          backgroundColor: isWinning ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
          borderColor: isWinning ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)',
        }}
        className="p-4 rounded-xl border text-center"
      >
        <p className="text-gray-400 text-sm mb-1">Current Status</p>
        <p className={`text-lg font-bold ${isWinning ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isWinning ? '🔥 WINNING' : '😰 LOSING'}
        </p>
      </motion.div>

      {/* Price Comparison */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-gray-500 text-xs uppercase">Locked At</p>
          <p className="text-white font-mono font-bold">${startPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs uppercase">Current</p>
          <p className={`font-mono font-bold ${
            currentPrice > startPrice ? 'text-emerald-400' : currentPrice < startPrice ? 'text-rose-400' : 'text-white'
          }`}>
            ${currentPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Waiting Animation */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-6 flex items-center justify-center gap-2 text-purple-400"
      >
        <Timer className="w-4 h-4 animate-pulse" />
        <span className="text-sm">Waiting for result...</span>
      </motion.div>
    </motion.div>
  );
}
