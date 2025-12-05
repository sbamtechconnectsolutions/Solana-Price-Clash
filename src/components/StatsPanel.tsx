'use client';

import { motion } from 'framer-motion';
import { Trophy, Flame, Target, TrendingUp, Award, Zap } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

export function StatsPanel() {
  const { stats } = useGameStore();
  const winRate = stats.totalGames > 0 
    ? ((stats.wins / stats.totalGames) * 100).toFixed(1) 
    : '0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-[#1A1A2E]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-purple-500/20 p-3 sm:p-4"
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {/* Total Points */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-purple-400 mb-0.5 sm:mb-1">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-white">{stats.totalPoints}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Points</p>
        </div>

        {/* Win Rate */}
        <div className="text-center border-x border-gray-700/50">
          <div className="flex items-center justify-center gap-1 text-emerald-400 mb-0.5 sm:mb-1">
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-white">{winRate}%</p>
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Win Rate</p>
        </div>

        {/* Current Streak */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-orange-400 mb-0.5 sm:mb-1">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-white">{stats.currentStreak}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Streak</p>
        </div>
      </div>

      {/* Detailed Stats (expandable) */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700/50 grid grid-cols-2 gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 bg-emerald-500/10 rounded-lg p-1.5 sm:p-2">
          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
          <div>
            <p className="text-[10px] sm:text-xs text-gray-400">Wins</p>
            <p className="text-xs sm:text-sm font-bold text-emerald-400">{stats.wins}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 bg-rose-500/10 rounded-lg p-1.5 sm:p-2">
          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 rotate-180" />
          <div>
            <p className="text-[10px] sm:text-xs text-gray-400">Losses</p>
            <p className="text-xs sm:text-sm font-bold text-rose-400">{stats.losses}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 bg-yellow-500/10 rounded-lg p-1.5 sm:p-2">
          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
          <div>
            <p className="text-[10px] sm:text-xs text-gray-400">Best Streak</p>
            <p className="text-xs sm:text-sm font-bold text-yellow-400">{stats.bestStreak}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 bg-purple-500/10 rounded-lg p-1.5 sm:p-2">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
          <div>
            <p className="text-[10px] sm:text-xs text-gray-400">Games</p>
            <p className="text-xs sm:text-sm font-bold text-purple-400">{stats.totalGames}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
