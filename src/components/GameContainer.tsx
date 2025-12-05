'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useSolanaPrice, useSimulatedPrice } from '@/hooks/useSolanaPrice';
import { useSound } from '@/hooks/useSound';
import { PriceDisplay, MiniPriceChart } from './PriceDisplay';
import { BettingButtons } from './BettingButtons';
import { GameTimer } from './GameTimer';
import { GameResult } from './GameResult';
import { StatsPanel } from './StatsPanel';
import { Leaderboard } from './Leaderboard';
import { Sparkles, Info } from 'lucide-react';

export function GameContainer() {
  const { 
    gameState, 
    setCurrentPrice, 
    endGame, 
  } = useGameStore();
  
  // Use real price from Binance WebSocket/REST API
  const { price: livePrice, change24h, isConnected } = useSolanaPrice();
  
  // Also track simulated price for smooth display during connection issues
  const { price: simulatedPrice, priceHistory } = useSimulatedPrice(livePrice || 245);
  
  // Use live price if available (price > 0 means we have data), otherwise simulated
  const hasLivePrice = livePrice > 0;
  const displayPrice = hasLivePrice ? livePrice : simulatedPrice;
  
  // Determine connection status - we're "connected" if we have live price data
  const isLive = hasLivePrice || isConnected;
  
  const { preloadAll } = useSound();

  // Preload sounds on mount
  useEffect(() => {
    preloadAll();
  }, [preloadAll]);

  // Update current price in store continuously
  useEffect(() => {
    setCurrentPrice(displayPrice);
  }, [displayPrice, setCurrentPrice]);

  // Handle game end - use currentPrice from store to avoid stale closure
  const handleTimeUp = useCallback(() => {
    const { currentPrice: finalPrice, startPrice: lockedPrice, userBet: bet } = useGameStore.getState();
    
    console.log('🎮 Game ended:', { bet, lockedPrice, finalPrice, diff: finalPrice - lockedPrice });
    
    const isWin = 
      (bet === 'UP' && finalPrice > lockedPrice) || 
      (bet === 'DOWN' && finalPrice < lockedPrice);
    
    console.log('🎮 Result:', isWin ? 'WIN! ✅' : 'LOSE ❌');
    
    endGame(isWin);
  }, [endGame]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Price Display */}
      <motion.div
        layout
        className="bg-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-purple-500/20 p-4 sm:p-6"
      >
        <PriceDisplay
          price={displayPrice}
          change24h={change24h}
          isConnected={isLive}
          lockedPrice={useGameStore.getState().startPrice}
          showLocked={gameState === 'PLAYING'}
        />
        
        {/* Mini Chart */}
        <div className="mt-4">
          <MiniPriceChart history={priceHistory} />
        </div>
      </motion.div>

      {/* Game Area */}
      <AnimatePresence mode="wait">
        {gameState === 'IDLE' && (
          <motion.div
            key="betting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BettingButtons currentPrice={displayPrice} disabled={!isLive} />
          </motion.div>
        )}

        {gameState === 'PLAYING' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <GameTimer onTimeUp={handleTimeUp} />
          </motion.div>
        )}

        {(gameState === 'WON' || gameState === 'LOST') && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <GameResult />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Panel - Always visible */}
      <StatsPanel />

      {/* Leaderboard */}
      <Leaderboard />

      {/* How to Play */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-[#1A1A2E]/60 backdrop-blur rounded-xl sm:rounded-2xl border border-gray-700/30 p-3 sm:p-4"
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
          <h3 className="font-bold text-xs sm:text-sm text-gray-300">How to Play</h3>
        </div>
        <ol className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
          <li className="flex items-start gap-1.5 sm:gap-2">
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] sm:text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
            <span>Predict if SOL price will go <span className="text-emerald-400">UP</span> or <span className="text-rose-400">DOWN</span></span>
          </li>
          <li className="flex items-start gap-1.5 sm:gap-2">
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] sm:text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
            <span>Wait 10 seconds for the result</span>
          </li>
          <li className="flex items-start gap-1.5 sm:gap-2">
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] sm:text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
            <span>Win to earn points and build your streak!</span>
          </li>
        </ol>
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-700/50 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-purple-400">
          <Sparkles className="w-3 h-3" />
          <span>Longer streaks = Higher multipliers (up to 5x!)</span>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="text-center text-[10px] sm:text-xs text-gray-600 pb-6 sm:pb-8">
        <p>Built on Solana ⚡ for Indie.fun Hackathon</p>
        <p className="mt-1">Prices from Pyth Oracle • Demo Mode</p>
      </footer>
    </div>
  );
}
