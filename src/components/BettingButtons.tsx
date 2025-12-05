'use client';

import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Zap } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { useSound, useHaptic } from '@/hooks/useSound';

interface BettingButtonsProps {
  currentPrice: number;
  disabled?: boolean;
}

export function BettingButtons({ currentPrice, disabled }: BettingButtonsProps) {
  const { startGame, stats } = useGameStore();
  const { playClick } = useSound();
  const { mediumTap } = useHaptic();
  const multiplier = useGameStore((state) => state.getMultiplier());

  const handleBet = (direction: 'UP' | 'DOWN') => {
    if (disabled) return;
    playClick();
    mediumTap();
    startGame(direction, currentPrice);
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Multiplier Banner */}
      {multiplier > 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg sm:rounded-xl border border-yellow-500/30"
        >
          <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
          <span className="text-yellow-400 font-bold text-sm sm:text-base">
            {multiplier}x MULTIPLIER!
          </span>
          <span className="text-gray-400 text-xs sm:text-sm">
            ({stats.currentStreak} streak)
          </span>
        </motion.div>
      )}

      {/* Betting Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* UP Button */}
        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onClick={() => handleBet('UP')}
          disabled={disabled}
          className={`
            relative h-32 xs:h-36 sm:h-44 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3
            transition-all duration-300 overflow-hidden group
            ${disabled 
              ? 'bg-gray-700 cursor-not-allowed opacity-50' 
              : 'bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 cursor-pointer'
            }
          `}
          style={{
            boxShadow: disabled ? 'none' : '0 0 40px rgba(16, 185, 129, 0.4)',
          }}
        >
          {/* Animated Background */}
          {!disabled && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/10 to-white/0"
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}
          
          {/* Icon */}
          <motion.div
            animate={disabled ? {} : { y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowUp className="w-10 h-10 sm:w-16 sm:h-16 text-white drop-shadow-lg" strokeWidth={3} />
          </motion.div>
          
          {/* Label */}
          <span className="text-white font-black text-lg sm:text-2xl tracking-wide drop-shadow-lg">
            GO UP
          </span>
          
          {/* Points Preview */}
          <span className="text-white/80 text-xs sm:text-sm font-medium">
            +{100 * multiplier} pts
          </span>
        </motion.button>

        {/* DOWN Button */}
        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onClick={() => handleBet('DOWN')}
          disabled={disabled}
          className={`
            relative h-32 xs:h-36 sm:h-44 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3
            transition-all duration-300 overflow-hidden group
            ${disabled 
              ? 'bg-gray-700 cursor-not-allowed opacity-50' 
              : 'bg-gradient-to-br from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 cursor-pointer'
            }
          `}
          style={{
            boxShadow: disabled ? 'none' : '0 0 40px rgba(244, 63, 94, 0.4)',
          }}
        >
          {/* Animated Background */}
          {!disabled && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/10 to-white/0"
              animate={{
                y: ['100%', '-100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}
          
          {/* Icon */}
          <motion.div
            animate={disabled ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowDown className="w-10 h-10 sm:w-16 sm:h-16 text-white drop-shadow-lg" strokeWidth={3} />
          </motion.div>
          
          {/* Label */}
          <span className="text-white font-black text-lg sm:text-2xl tracking-wide drop-shadow-lg">
            GO DOWN
          </span>
          
          {/* Points Preview */}
          <span className="text-white/80 text-xs sm:text-sm font-medium">
            +{100 * multiplier} pts
          </span>
        </motion.button>
      </div>

      {/* Helper Text */}
      <p className="text-center text-gray-500 text-xs sm:text-sm">
        Predict if SOL price will go up or down in 10 seconds
      </p>
    </div>
  );
}
