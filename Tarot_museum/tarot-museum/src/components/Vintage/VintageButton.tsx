'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface VintageButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  playSound?: boolean;
}

export const VintageButton: React.FC<VintageButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  ariaLabel,
  playSound = false,
}) => {
  const handleClick = () => {
    if (disabled) return;

    // Optional click sound
    if (playSound && typeof window !== 'undefined') {
      try {
        const audio = new Audio('/sounds/click.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Ignore audio playback errors
        });
      } catch (error) {
        // Ignore audio errors
      }
    }

    onClick?.();
  };

  const baseStyles = "relative px-6 py-3 font-serif font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D3B77C] focus:ring-offset-2 focus:ring-offset-[#1A1410] disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-[#1A1410] text-[#D3B77C] border-2 border-[#D3B77C] hover:bg-[#2A2010] hover:text-[#E8D5C0]",
    secondary: "bg-[#D3B77C] text-[#1A1410] border-2 border-[#D3B77C] hover:bg-[#E8D5C0]",
    ghost: "bg-transparent text-[#D3B77C] border-2 border-[#D3B77C]/50 hover:border-[#D3B77C] hover:bg-[#D3B77C]/10",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Breathing glow effect */}
      <motion.div
        className="absolute inset-0 rounded-md pointer-events-none"
        animate={disabled ? {} : {
          boxShadow: [
            '0 0 10px rgba(211, 183, 124, 0.3)',
            '0 0 20px rgba(211, 183, 124, 0.5)',
            '0 0 10px rgba(211, 183, 124, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ willChange: 'box-shadow' }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Hover background overlay */}
      <motion.div
        className="absolute inset-0 rounded-md bg-[#D3B77C]/0 pointer-events-none"
        whileHover={disabled ? {} : { backgroundColor: 'rgba(211, 183, 124, 0.1)' }}
        transition={{ duration: 0.3 }}
      />

      {/* Gold accent corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D3B77C] opacity-50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D3B77C] opacity-50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D3B77C] opacity-50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D3B77C] opacity-50" />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .button-glow {
            animation: none !important;
          }
        }
      `}</style>
    </motion.button>
  );
};

export default VintageButton;
