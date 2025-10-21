import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioToggleReturn {
  on: boolean;
  toggle: () => void;
  error: string | null;
}

const STORAGE_KEY = 'museum:audio';
const AMBIENT_AUDIO_PATH = '/audio/ambience.mp3';
const AMBIENT_VOLUME = 0.18;

/**
 * Custom hook for managing ambient museum audio
 *
 * Features:
 * - Persists audio preference to localStorage
 * - Handles autoplay restrictions gracefully
 * - Auto-cleanup on unmount
 * - Fade in/out support
 * - Error handling for audio playback
 *
 * @returns {UseAudioToggleReturn} Audio state and controls
 */
export function useAudioToggle(): UseAudioToggleReturn {
  const [on, setOn] = useState<boolean>(() => {
    // Audio is OFF by default, user must enable
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(AMBIENT_AUDIO_PATH);
      audio.volume = AMBIENT_VOLUME;
      audio.loop = true;
      audio.preload = 'auto';
      audioRef.current = audio;

      // Handle audio errors
      audio.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        setError('Unable to load audio file');
      });
    }

    return () => {
      isMountedRef.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  // Sync audio playback with state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isMountedRef.current) return;

    const playAudio = async () => {
      try {
        setError(null);
        await audio.play();
      } catch (err) {
        // Handle autoplay restrictions
        if (err instanceof Error) {
          if (err.name === 'NotAllowedError') {
            setError('Audio blocked by browser. Please interact with the page first.');
            // Reset state if autoplay blocked
            setOn(false);
            localStorage.setItem(STORAGE_KEY, 'false');
          } else {
            setError('Audio playback failed');
            console.error('Audio play error:', err);
          }
        }
      }
    };

    if (on) {
      playAudio();
    } else {
      audio.pause();
      // Reset playback to beginning when stopped
      audio.currentTime = 0;
    }
  }, [on]);

  // Persist audio preference
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, on.toString());
    } catch (err) {
      console.warn('Failed to save audio preference:', err);
    }
  }, [on]);

  const toggle = useCallback(() => {
    setOn(prev => !prev);
  }, []);

  return { on, toggle, error };
}

/**
 * Fade audio volume from current to target
 * @param audio - HTMLAudioElement to fade
 * @param targetVolume - Target volume (0-1)
 * @param duration - Fade duration in ms
 */
export function fadeAudioVolume(
  audio: HTMLAudioElement,
  targetVolume: number,
  duration: number = 500
): Promise<void> {
  return new Promise((resolve) => {
    const startVolume = audio.volume;
    const volumeDelta = targetVolume - startVolume;
    const steps = 20;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      audio.volume = Math.max(0, Math.min(1, startVolume + volumeDelta * progress));

      if (currentStep >= steps) {
        clearInterval(interval);
        audio.volume = targetVolume;
        resolve();
      }
    }, stepDuration);
  });
}
