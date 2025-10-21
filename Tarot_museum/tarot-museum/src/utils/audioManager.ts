/**
 * Central Audio Management System
 *
 * Handles one-shot sound effects with:
 * - Audio object caching for performance
 * - User preference respect
 * - Volume control
 * - Graceful error handling
 */

const STORAGE_KEY = 'museum:audio';

// Sound effect paths
export const soundEffects = {
  hover: '/audio/paper.mp3',
  click: '/audio/card.mp3',
  enter: '/audio/door.mp3',
} as const;

export type SoundEffectType = keyof typeof soundEffects;

// Audio cache for performance
const audioCache = new Map<string, HTMLAudioElement>();

// Volume presets for different sound types
const VOLUMES = {
  hover: 0.12,
  click: 0.15,
  enter: 0.20,
} as const;

/**
 * Check if user has enabled audio
 */
function isAudioEnabled(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'true';
  } catch {
    return false;
  }
}

/**
 * Get or create cached audio element
 */
function getAudioElement(src: string): HTMLAudioElement {
  if (!audioCache.has(src)) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audioCache.set(src, audio);
  }
  return audioCache.get(src)!;
}

/**
 * Play a sound effect
 *
 * @param src - Path to audio file or SoundEffectType
 * @param volume - Optional volume override (0-1)
 * @returns Promise that resolves when sound starts playing
 */
export async function playSound(
  src: string,
  volume?: number
): Promise<void> {
  // Respect user's audio preference
  if (!isAudioEnabled()) {
    return;
  }

  try {
    const audio = getAudioElement(src);

    // Set volume (use provided or default)
    audio.volume = volume ?? 0.15;

    // Reset to beginning if already playing
    audio.currentTime = 0;

    // Clone for overlapping sounds
    const clone = audio.cloneNode() as HTMLAudioElement;
    clone.volume = audio.volume;

    await clone.play();

    // Cleanup after playback
    clone.addEventListener('ended', () => {
      clone.src = '';
    }, { once: true });

  } catch (err) {
    // Silently fail for better UX
    // Autoplay restrictions shouldn't break the UI
    if (err instanceof Error && err.name !== 'NotAllowedError') {
      console.warn('Sound effect playback failed:', err);
    }
  }
}

/**
 * Play a predefined sound effect
 *
 * @param type - Type of sound effect
 */
export async function playSoundEffect(type: SoundEffectType): Promise<void> {
  const src = soundEffects[type];
  const volume = VOLUMES[type];
  return playSound(src, volume);
}

/**
 * Preload all sound effects for instant playback
 * Call this during app initialization
 */
export function preloadSoundEffects(): void {
  Object.values(soundEffects).forEach(src => {
    getAudioElement(src);
  });
}

/**
 * Clear audio cache (useful for cleanup)
 */
export function clearAudioCache(): void {
  audioCache.forEach(audio => {
    audio.src = '';
  });
  audioCache.clear();
}

/**
 * Fade audio from current volume to target
 *
 * @param audio - Audio element to fade
 * @param targetVolume - Target volume (0-1)
 * @param duration - Fade duration in milliseconds
 */
export function fadeVolume(
  audio: HTMLAudioElement,
  targetVolume: number,
  duration: number = 500
): Promise<void> {
  return new Promise((resolve) => {
    const startVolume = audio.volume;
    const volumeDelta = targetVolume - startVolume;
    const startTime = Date.now();

    const fade = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out curve for smoother fade
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      audio.volume = Math.max(0, Math.min(1, startVolume + volumeDelta * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(fade);
      } else {
        audio.volume = targetVolume;
        resolve();
      }
    };

    requestAnimationFrame(fade);
  });
}

/**
 * Play sound with fade in
 *
 * @param src - Audio source path
 * @param targetVolume - Target volume after fade
 * @param duration - Fade duration in ms
 */
export async function playSoundWithFadeIn(
  src: string,
  targetVolume: number = 0.15,
  duration: number = 300
): Promise<void> {
  if (!isAudioEnabled()) return;

  try {
    const audio = getAudioElement(src);
    audio.volume = 0;
    audio.currentTime = 0;

    await audio.play();
    await fadeVolume(audio, targetVolume, duration);
  } catch (err) {
    if (err instanceof Error && err.name !== 'NotAllowedError') {
      console.warn('Fade-in playback failed:', err);
    }
  }
}

/**
 * Stop sound with fade out
 *
 * @param audio - Audio element to stop
 * @param duration - Fade duration in ms
 */
export async function stopSoundWithFadeOut(
  audio: HTMLAudioElement,
  duration: number = 300
): Promise<void> {
  await fadeVolume(audio, 0, duration);
  audio.pause();
  audio.currentTime = 0;
}
