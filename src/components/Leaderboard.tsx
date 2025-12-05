'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

// Mock leaderboard data for demo
const MOCK_LEADERBOARD = [
  { wallet: '7xKX...9mPq', points: 15420, streak: 12, rank: 1 },
  { wallet: 'DeFi...King', points: 12800, streak: 8, rank: 2 },
  { wallet: '4nDy...hAcK', points: 11200, streak: 15, rank: 3 },
  { wallet: 'SoLa...NaFi', points: 9800, streak: 6, rank: 4 },
  { wallet: 'Moon...Shot', points: 8500, streak: 9, rank: 5 },
  { wallet: 'Apes...Tgth', points: 7200, streak: 4, rank: 6 },
  { wallet: 'DiAm...HaNd', points: 6100, streak: 7, rank: 7 },
  { wallet: 'Bull...Ish_', points: 5400, streak: 3, rank: 8 },
];

export function Leaderboard() {
  const { stats } = useGameStore();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 text-center text-gray-500 font-mono">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default:
        return 'bg-gray-800/50 border-gray-700/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-700/50">
        <Trophy className="w-5 h-5 text-purple-400" />
        <h3 className="font-bold text-white">Leaderboard</h3>
        <span className="text-xs text-gray-500 ml-auto">Top Players</span>
      </div>

      {/* Your Position */}
      <div className="p-3 bg-purple-500/10 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
            YOU
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Your Score</p>
            <p className="text-xs text-gray-400">Best Streak: {stats.bestStreak}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-purple-400">{stats.totalPoints}</p>
            <p className="text-xs text-gray-500">points</p>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="max-h-64 overflow-y-auto">
        {MOCK_LEADERBOARD.map((player, index) => (
          <motion.div
            key={player.wallet}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-3 p-3 border-b border-gray-700/30 ${getRankBg(player.rank)}`}
          >
            {/* Rank */}
            <div className="w-8 flex justify-center">
              {getRankIcon(player.rank)}
            </div>

            {/* Player Info */}
            <div className="flex-1">
              <p className="text-sm font-medium text-white font-mono">{player.wallet}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>🔥 {player.streak} streak</span>
              </div>
            </div>

            {/* Points */}
            <div className="text-right">
              <p className={`font-bold ${player.rank <= 3 ? 'text-yellow-400' : 'text-gray-300'}`}>
                {player.points.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">pts</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 text-center text-xs text-gray-500 border-t border-gray-700/50">
        Connect wallet to save your score
      </div>
    </motion.div>
  );
}
