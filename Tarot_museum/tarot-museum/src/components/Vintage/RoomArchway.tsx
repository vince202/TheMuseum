import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface RoomArchwayProps {
  href: string;
  title: string;
  description: string;
  className?: string;
}

export const RoomArchway: React.FC<RoomArchwayProps> = ({
  href,
  title,
  description,
  className = '',
}) => {
  return (
    <Link href={href} className={`block ${className}`}>
      <motion.div
        className="relative group cursor-pointer overflow-hidden rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main archway container */}
        <div className="relative h-64 bg-black/30 backdrop-blur-sm border-2 border-[#D3B77C] rounded-lg overflow-hidden">
          {/* Glassmorphic background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />

          {/* Light sweep effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D3B77C]/20 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ y: '-100%' }}
            whileHover={{ y: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ willChange: 'transform' }}
          />

          {/* Floor ripple effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3">
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full bg-[#D3B77C]/30 blur-xl" />
            </motion.div>
          </div>

          {/* Content container */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
            {/* Archway decorative element */}
            <div className="mb-4">
              <svg
                width="80"
                height="60"
                viewBox="0 0 80 60"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              >
                {/* Arch shape */}
                <path
                  d="M 10 60 L 10 30 Q 10 10, 40 10 Q 70 10, 70 30 L 70 60"
                  fill="none"
                  stroke="#D3B77C"
                  strokeWidth="2"
                />
                {/* Decorative columns */}
                <rect x="8" y="50" width="4" height="10" fill="#D3B77C" />
                <rect x="68" y="50" width="4" height="10" fill="#D3B77C" />
                {/* Keystone */}
                <circle cx="40" cy="10" r="3" fill="#D3B77C" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-serif font-bold text-[#D3B77C] mb-2 group-hover:text-[#E8D5C0] transition-colors">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[#B8956A] group-hover:text-[#D3B77C] transition-colors max-w-xs">
              {description}
            </p>

            {/* Enter arrow indicator */}
            <motion.div
              className="mt-4 text-[#D3B77C]"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Gold accent corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D3B77C]" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D3B77C]" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D3B77C]" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D3B77C]" />
        </div>

        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .archway-animation {
              animation: none !important;
            }
          }
        `}</style>
      </motion.div>
    </Link>
  );
};

export default RoomArchway;
