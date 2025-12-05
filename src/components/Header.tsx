'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { Trophy, Volume2, VolumeX, Smartphone, Settings } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';

export function Header() {
  const { connected, publicKey } = useWallet();
  const { stats, soundEnabled, hapticEnabled, toggleSound, toggleHaptic } = useGameStore();
  const [showSettings, setShowSettings] = useState(false);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto px-2 sm:px-0"
    >
      <div className="flex justify-between items-center p-3 sm:p-4 bg-[#1A1A2E]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-purple-500/20">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="relative"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center">
              <span className="text-lg sm:text-xl font-black text-white">⚡</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-xl blur-lg opacity-30 -z-10" />
          </motion.div>
          <div>
            <h1 className="font-black text-base sm:text-lg text-white leading-tight">Price Clash</h1>
            <p className="text-[10px] sm:text-xs text-gray-400">on Solana</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Points */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-yellow-500/30">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
            <span className="font-mono font-bold text-sm sm:text-base text-yellow-400">{stats.totalPoints}</span>
          </div>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 sm:p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-4 bg-[#1A1A2E]/90 backdrop-blur-xl rounded-xl border border-purple-500/20"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Sound Effects</span>
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg transition-colors ${soundEnabled ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700/50 text-gray-500'}`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Haptic Feedback</span>
            <button
              onClick={toggleHaptic}
              className={`p-2 rounded-lg transition-colors ${hapticEnabled ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700/50 text-gray-500'}`}
            >
              <Smartphone className={`w-4 h-4 ${hapticEnabled ? '' : 'opacity-50'}`} />
            </button>
          </div>
          
          {/* Wallet Connection */}
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <WalletMultiButton className="!w-full !justify-center !bg-gradient-to-r !from-purple-600 !to-pink-600 !rounded-xl !py-3 !font-bold" />
            {connected && publicKey && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Connected: {truncateAddress(publicKey.toBase58())}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
