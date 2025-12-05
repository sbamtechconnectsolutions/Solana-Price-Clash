'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Wifi, WifiOff } from 'lucide-react';

interface PriceDisplayProps {
  price: number;
  previousPrice?: number;
  change24h?: number;
  isConnected?: boolean;
  lockedPrice?: number;
  showLocked?: boolean;
}

export function PriceDisplay({
  price,
  previousPrice,
  change24h = 0,
  isConnected = true,
  lockedPrice,
  showLocked,
}: PriceDisplayProps) {
  const prevPriceRef = useRef(price);
  const direction = price > prevPriceRef.current ? 'up' : price < prevPriceRef.current ? 'down' : 'neutral';

  useEffect(() => {
    prevPriceRef.current = price;
  }, [price]);

  const priceColor = direction === 'up' 
    ? 'text-emerald-400' 
    : direction === 'down' 
      ? 'text-rose-400' 
      : 'text-white';

  const formatPrice = (p: number) => {
    if (p === 0) return '---';
    return p.toFixed(2);
  };

  return (
    <div className="relative">
      {/* Connection Status */}
      <div className="absolute -top-2 right-0 flex items-center gap-1.5">
        {isConnected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 text-emerald-400 text-xs"
          >
            <Wifi className="w-3 h-3" />
            <span>LIVE</span>
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-1 text-yellow-400 text-xs"
          >
            <WifiOff className="w-3 h-3" />
            <span>CONNECTING...</span>
          </motion.div>
        )}
      </div>

      {/* Main Price Display */}
      <div className="text-center py-2 sm:py-4">
        <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1 sm:mb-2 font-medium">
          SOL / USD
        </p>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={price.toFixed(2)}
            initial={{ opacity: 0.5, y: direction === 'up' ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tight ${priceColor} transition-colors duration-200`}
            style={{
              textShadow: direction === 'up' 
                ? '0 0 30px rgba(16, 185, 129, 0.5)' 
                : direction === 'down'
                  ? '0 0 30px rgba(244, 63, 94, 0.5)'
                  : 'none',
            }}
          >
            ${formatPrice(price)}
          </motion.div>
        </AnimatePresence>

        {/* 24h Change */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          {change24h >= 0 ? (
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
          )}
          <span className={`text-xs sm:text-sm font-medium ${change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}% (24h)
          </span>
        </div>
      </div>

      {/* Locked Price Display (during game) */}
      {showLocked && lockedPrice !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 sm:mt-4 p-3 sm:p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl sm:rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs sm:text-sm">Locked Price</span>
            <span className="text-purple-400 font-mono font-bold text-base sm:text-lg">
              ${formatPrice(lockedPrice)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1.5 sm:mt-2">
            <span className="text-gray-400 text-xs sm:text-sm">Current Diff</span>
            <span className={`font-mono font-bold text-base sm:text-lg ${
              price > lockedPrice ? 'text-emerald-400' : price < lockedPrice ? 'text-rose-400' : 'text-gray-400'
            }`}>
              {price > lockedPrice ? '+' : ''}{(price - lockedPrice).toFixed(4)}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Mini price chart using canvas
export function MiniPriceChart({ history }: { history: number[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate min/max for scaling
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = history[history.length - 1] >= history[0] ? '#10b981' : '#f43f5e';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    history.forEach((price, i) => {
      const x = (i / (history.length - 1)) * width;
      const y = height - ((price - min) / range) * height * 0.8 - height * 0.1;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Add gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, history[history.length - 1] >= history[0] ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

  }, [history]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={60}
      className="w-full h-16 rounded-lg"
    />
  );
}
