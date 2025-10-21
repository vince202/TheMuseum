'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioToggleOptions {
  audioSrc: string;
  volume?: number;
  loop?: boolean;
  storageKey?: string;
}

interface UseAudioToggleReturn {
  isPlaying: boolean;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
}

export const useAudioToggle = ({
  audioSrc,
  volume = 0.3,
  loop = true,
  storageKey = 'museum-audio-enabled',
}: UseAudioToggleOptions): UseAudioToggleReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize audio element and restore state from localStorage
  useEffect(() => {
    if (!isClient) return;

    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = loop;
    audio.volume = volume;
    audioRef.current = audio;

    // Restore state from localStorage
    try {
      const savedState = localStorage.getItem(storageKey);
      if (savedState === 'true') {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.warn('Auto-play prevented:', error);
          // Auto-play was prevented, user needs to interact first
        });
      }
    } catch (error) {
      console.warn('localStorage not available:', error);
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isClient, audioSrc, loop, volume, storageKey]);

  // Play audio
  const play = useCallback(() => {
    if (!audioRef.current || !isClient) return;

    audioRef.current.play().then(() => {
      setIsPlaying(true);
      try {
        localStorage.setItem(storageKey, 'true');
      } catch (error) {
        console.warn('localStorage not available:', error);
      }
    }).catch((error) => {
      console.warn('Play failed:', error);
    });
  }, [isClient, storageKey]);

  // Pause audio
  const pause = useCallback(() => {
    if (!audioRef.current || !isClient) return;

    audioRef.current.pause();
    setIsPlaying(false);
    try {
      localStorage.setItem(storageKey, 'false');
    } catch (error) {
      console.warn('localStorage not available:', error);
    }
  }, [isClient, storageKey]);

  // Toggle audio
  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Set volume
  const setVolumeCallback = useCallback((newVolume: number) => {
    if (!audioRef.current) return;

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audioRef.current.volume = clampedVolume;
  }, []);

  return {
    isPlaying,
    toggle,
    play,
    pause,
    setVolume: setVolumeCallback,
  };
};

export default useAudioToggle;
