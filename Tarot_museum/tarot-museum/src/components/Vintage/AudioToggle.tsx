import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioToggleProps {
  audioSrc: string;
  volume?: number;
  className?: string;
  storageKey?: string;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({
  audioSrc,
  volume = 0.3,
  className = '',
  storageKey = 'museum-audio-enabled',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }

    // Check localStorage for saved state
    const saved = localStorage.getItem(storageKey);
    if (saved === 'true' && audioRef.current) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, volume, storageKey]);

  const toggle = () => {
    if (!audioRef.current) {
      setIsPlaying(!isPlaying);
      localStorage.setItem(storageKey, String(!isPlaying));
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }

    setIsPlaying(!isPlaying);
    localStorage.setItem(storageKey, String(!isPlaying));
  };

  return (
    <motion.button
      className={`relative w-12 h-12 rounded-full bg-[#1A1410] border-2 border-[#D3B77C] flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D3B77C] focus:ring-offset-2 focus:ring-offset-[#1A1410] transition-all duration-300 hover:bg-[#2A2010] ${className}`}
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
      aria-pressed={isPlaying}
    >
      {/* Breathing glow effect when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 10px rgba(211, 183, 124, 0.3)',
              '0 0 20px rgba(211, 183, 124, 0.6)',
              '0 0 10px rgba(211, 183, 124, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Icon */}
      <span className="text-2xl relative z-10" role="img" aria-hidden="true">
        {isPlaying ? '🔈' : '🔇'}
      </span>

      {/* Sound waves animation when playing */}
      {isPlaying && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#D3B77C] rounded-full"
              animate={{
                height: ['4px', '12px', '4px'],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Gold accent corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D3B77C] rounded-tl-full opacity-50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D3B77C] rounded-br-full opacity-50" />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .audio-animation {
            animation: none !important;
          }
        }
      `}</style>
    </motion.button>
  );
};

export default AudioToggle;
