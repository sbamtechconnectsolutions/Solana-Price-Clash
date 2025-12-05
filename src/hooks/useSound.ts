'use client';

import { useCallback, useRef, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

// Sound effects using Web Audio API for reliability
const SOUND_CONFIGS = {
  click: { frequency: 800, duration: 0.05, type: 'sine' as OscillatorType },
  tick: { frequency: 600, duration: 0.03, type: 'sine' as OscillatorType },
  countdown: { frequency: 440, duration: 0.1, type: 'sine' as OscillatorType },
  win: { frequencies: [523, 659, 784, 1047], duration: 0.15, type: 'sine' as OscillatorType }, // C-E-G-C victory chord
  lose: { frequencies: [392, 349, 330, 294], duration: 0.2, type: 'sawtooth' as OscillatorType }, // Descending sad tones
};

type SoundType = keyof typeof SOUND_CONFIGS;

export function useSound() {
  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context on first interaction
  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', delay: number = 0) => {
    const ctx = getAudioContext();
    if (!ctx || !soundEnabled) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    const startTime = ctx.currentTime + delay;
    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }, [getAudioContext, soundEnabled]);

  const playSound = useCallback((type: SoundType) => {
    if (!soundEnabled || typeof window === 'undefined') return;

    const config = SOUND_CONFIGS[type];
    
    if ('frequencies' in config) {
      // Play chord/melody (for win/lose)
      config.frequencies.forEach((freq, i) => {
        playTone(freq, config.duration, config.type, i * 0.1);
      });
    } else {
      // Play single tone
      playTone(config.frequency, config.duration, config.type);
    }
  }, [soundEnabled, playTone]);

  // Preload (initialize audio context)
  const preloadAll = useCallback(() => {
    getAudioContext();
  }, [getAudioContext]);

  return {
    playSound,
    preloadAll,
    playClick: () => playSound('click'),
    playWin: () => playSound('win'),
    playLose: () => playSound('lose'),
    playCountdown: () => playSound('countdown'),
    playTick: () => playSound('tick'),
  };
}

export function useHaptic() {
  const hapticEnabled = useGameStore((state) => state.hapticEnabled);

  const vibrate = useCallback((pattern: number | number[] = 50) => {
    if (!hapticEnabled || typeof window === 'undefined') return;
    
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, [hapticEnabled]);

  return {
    vibrate,
    lightTap: () => vibrate(10),
    mediumTap: () => vibrate(50),
    heavyTap: () => vibrate(100),
    success: () => vibrate([50, 50, 100]),
    error: () => vibrate([100, 50, 100, 50, 100]),
  };
}
