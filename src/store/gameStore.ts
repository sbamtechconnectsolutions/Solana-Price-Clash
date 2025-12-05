import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameState = 'IDLE' | 'BETTING' | 'PLAYING' | 'WON' | 'LOST';
export type BetDirection = 'UP' | 'DOWN' | null;

interface GameStats {
  totalGames: number;
  wins: number;
  losses: number;
  currentStreak: number;
  bestStreak: number;
  totalPoints: number;
}

interface LeaderboardEntry {
  wallet: string;
  points: number;
  streak: number;
  timestamp: number;
}

interface GameStore {
  // Game State
  gameState: GameState;
  userBet: BetDirection;
  startPrice: number;
  currentPrice: number;
  timeLeft: number;
  roundDuration: number;
  
  // Stats
  stats: GameStats;
  
  // Leaderboard
  leaderboard: LeaderboardEntry[];
  
  // Settings
  soundEnabled: boolean;
  hapticEnabled: boolean;
  
  // Actions
  setGameState: (state: GameState) => void;
  setUserBet: (bet: BetDirection) => void;
  setStartPrice: (price: number) => void;
  setCurrentPrice: (price: number) => void;
  setTimeLeft: (time: number) => void;
  startGame: (bet: BetDirection, price: number) => void;
  endGame: (won: boolean) => void;
  resetGame: () => void;
  updateStats: (won: boolean) => void;
  addToLeaderboard: (entry: LeaderboardEntry) => void;
  toggleSound: () => void;
  toggleHaptic: () => void;
  getMultiplier: () => number;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial State
      gameState: 'IDLE',
      userBet: null,
      startPrice: 0,
      currentPrice: 0,
      timeLeft: 0,
      roundDuration: 10, // 10 seconds for fast-paced fun
      
      stats: {
        totalGames: 0,
        wins: 0,
        losses: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalPoints: 0,
      },
      
      leaderboard: [],
      soundEnabled: true,
      hapticEnabled: true,
      
      // Actions
      setGameState: (state) => set({ gameState: state }),
      setUserBet: (bet) => set({ userBet: bet }),
      setStartPrice: (price) => set({ startPrice: price }),
      setCurrentPrice: (price) => set({ currentPrice: price }),
      setTimeLeft: (time) => set({ timeLeft: time }),
      
      startGame: (bet, price) => set({
        gameState: 'PLAYING',
        userBet: bet,
        startPrice: price,
        timeLeft: get().roundDuration,
      }),
      
      endGame: (won) => {
        const multiplier = get().getMultiplier();
        const points = won ? 100 * multiplier : 0;
        
        set({
          gameState: won ? 'WON' : 'LOST',
        });
        
        get().updateStats(won);
      },
      
      resetGame: () => set({
        gameState: 'IDLE',
        userBet: null,
        startPrice: 0,
        timeLeft: 0,
      }),
      
      updateStats: (won) => set((state) => {
        const multiplier = state.getMultiplier();
        const pointsEarned = won ? 100 * multiplier : 0;
        const newStreak = won ? state.stats.currentStreak + 1 : 0;
        
        return {
          stats: {
            totalGames: state.stats.totalGames + 1,
            wins: state.stats.wins + (won ? 1 : 0),
            losses: state.stats.losses + (won ? 0 : 1),
            currentStreak: newStreak,
            bestStreak: Math.max(state.stats.bestStreak, newStreak),
            totalPoints: state.stats.totalPoints + pointsEarned,
          },
        };
      }),
      
      addToLeaderboard: (entry) => set((state) => ({
        leaderboard: [...state.leaderboard, entry]
          .sort((a, b) => b.points - a.points)
          .slice(0, 100), // Keep top 100
      })),
      
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleHaptic: () => set((state) => ({ hapticEnabled: !state.hapticEnabled })),
      
      getMultiplier: () => {
        const streak = get().stats.currentStreak;
        if (streak >= 10) return 5;
        if (streak >= 7) return 4;
        if (streak >= 5) return 3;
        if (streak >= 3) return 2;
        return 1;
      },
    }),
    {
      name: 'solana-price-clash-storage',
      partialize: (state) => ({
        stats: state.stats,
        soundEnabled: state.soundEnabled,
        hapticEnabled: state.hapticEnabled,
      }),
    }
  )
);
