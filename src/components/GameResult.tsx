'use client';

import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, TrendingUp, Flame, RotateCcw, Share2, Twitter } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { useSound, useHaptic } from '@/hooks/useSound';

export function GameResult() {
  const { gameState, stats, resetGame, startPrice, currentPrice, userBet } = useGameStore();
  const { playWin, playLose } = useSound();
  const { success, error } = useHaptic();
  const multiplier = useGameStore((state) => state.getMultiplier());

  const isWin = gameState === 'WON';
  const priceDiff = currentPrice - startPrice;
  const pointsEarned = isWin ? 100 * multiplier : 0;

  // Trigger effects on mount
  useEffect(() => {
    if (isWin) {
      playWin();
      success();
      
      // Confetti explosion!
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10b981', '#34d399', '#6ee7b7'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10b981', '#34d399', '#6ee7b7'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    } else {
      playLose();
      error();
    }
  }, [isWin, playWin, playLose, success, error]);

  const handleShare = useCallback(() => {
    const text = isWin
      ? `🎮 I just won ${pointsEarned} points on Solana Price Clash! 🚀\n\nMy streak: ${stats.currentStreak} 🔥\n\nThink you can beat me? Try it at:`
      : `😤 I'm on a comeback mission on Solana Price Clash!\n\nTotal points: ${stats.totalPoints}\n\nJoin me at:`;

    const url = typeof window !== 'undefined' ? window.location.href : '';

    // Try native share first
    if (navigator.share) {
      navigator.share({
        title: 'Solana Price Clash',
        text,
        url,
      }).catch(() => {
        // Fallback to Twitter
        openTwitterShare(text, url);
      });
    } else {
      openTwitterShare(text, url);
    }
  }, [isWin, pointsEarned, stats]);

  const openTwitterShare = (text: string, url: string) => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        relative overflow-hidden p-8 rounded-3xl border-2 text-center
        ${isWin 
          ? 'bg-gradient-to-b from-emerald-900/30 to-emerald-950/50 border-emerald-500/50' 
          : 'bg-gradient-to-b from-rose-900/30 to-rose-950/50 border-rose-500/50'
        }
      `}
    >
      {/* Background Glow */}
      <div
        className={`absolute inset-0 opacity-20 ${isWin ? 'bg-emerald-500' : 'bg-rose-500'}`}
        style={{
          filter: 'blur(100px)',
        }}
      />

      {/* Result Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative z-10 mb-4"
      >
        {isWin ? (
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500">
            <Trophy className="w-10 h-10 text-emerald-400" />
          </div>
        ) : (
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500">
            <span className="text-4xl">😢</span>
          </div>
        )}
      </motion.div>

      {/* Result Title */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`relative z-10 text-4xl font-black mb-2 ${isWin ? 'text-emerald-400' : 'text-rose-400'}`}
      >
        {isWin ? 'YOU WON!' : 'YOU LOST'}
      </motion.h2>

      {/* Prediction Result */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-gray-300 mb-6"
      >
        You predicted <span className={userBet === 'UP' ? 'text-emerald-400' : 'text-rose-400'}>{userBet}</span>
        {' '}• Price went{' '}
        <span className={priceDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
          {priceDiff >= 0 ? 'UP' : 'DOWN'} ${Math.abs(priceDiff).toFixed(4)}
        </span>
      </motion.p>

      {/* Points Earned (if won) */}
      {isWin && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="relative z-10 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 rounded-full border border-emerald-500/30">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-2xl font-black text-emerald-400">+{pointsEarned}</span>
            <span className="text-emerald-400/80">points</span>
          </div>
        </motion.div>
      )}

      {/* Streak Info */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 flex justify-center gap-6 mb-6"
      >
        {isWin && stats.currentStreak > 1 && (
          <div className="flex items-center gap-1 text-orange-400">
            <Flame className="w-5 h-5" />
            <span className="font-bold">{stats.currentStreak} streak!</span>
          </div>
        )}
        <div className="text-gray-400">
          Total: <span className="text-white font-bold">{stats.totalPoints}</span> pts
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 flex flex-col gap-3"
      >
        <button
          onClick={resetGame}
          className={`
            w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2
            transition-all duration-200 active:scale-95
            ${isWin 
              ? 'bg-emerald-500 hover:bg-emerald-400 text-black' 
              : 'bg-white hover:bg-gray-100 text-black'
            }
          `}
        >
          <RotateCcw className="w-5 h-5" />
          {isWin ? 'Keep Winning!' : 'Try Again'}
        </button>

        <button
          onClick={handleShare}
          className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white transition-all duration-200 active:scale-95"
        >
          <Twitter className="w-4 h-4" />
          Share on Twitter
        </button>
      </motion.div>
    </motion.div>
  );
}
