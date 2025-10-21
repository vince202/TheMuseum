import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface FloatingCardProps {
  src: string;
  alt: string;
  position?: { x: number; y: number };
  className?: string;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  src,
  alt,
  position = { x: 0, y: 0 },
  className = '',
}) => {
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      // Sine wave for smooth floating: amplitude = 10px, period = 4 seconds
      const newOffset = Math.sin(elapsed / 2000 * Math.PI) * 10;
      setOffset(newOffset);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        left: position.x,
        top: position.y,
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 10,
        rotateX: -5,
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="relative group cursor-pointer"
        style={{
          perspective: '1000px',
        }}
      >
        {/* Card container with vintage border */}
        <div className="relative w-40 h-64 rounded-lg overflow-hidden border-2 border-[#D3B77C] shadow-2xl bg-[#1A1410]">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />

          {/* Vintage overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />

          {/* Gold accent corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D3B77C]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D3B77C]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D3B77C]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D3B77C]" />
        </div>

        {/* Vintage museum-style tooltip */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <div className="relative bg-[#1A1410] border-2 border-[#D3B77C] rounded-md px-4 py-2 shadow-xl">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1A1410] border-t-2 border-l-2 border-[#D3B77C] transform rotate-45" />
            <p className="text-[#D3B77C] text-sm font-serif whitespace-nowrap">
              {alt}
            </p>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(211,183,124,0.3)]" />
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .floating-card {
            transform: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default FloatingCard;
