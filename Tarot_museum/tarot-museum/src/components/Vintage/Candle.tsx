import React from 'react';

interface CandleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { width: 24, height: 60 },
  md: { width: 32, height: 80 },
  lg: { width: 40, height: 100 },
};

export const Candle: React.FC<CandleProps> = ({ className = '', size = 'md' }) => {
  const { width, height } = sizes[size];
  const candleWidth = width * 0.6;
  const candleHeight = height * 0.7;
  const flameHeight = height * 0.3;

  return (
    <div className={`inline-block ${className}`} aria-hidden="true">
      <style>{`
        @keyframes flicker {
          0%, 100% {
            transform: scaleY(1) translateY(0);
            opacity: 1;
          }
          25% {
            transform: scaleY(1.1) translateY(-2px);
            opacity: 0.9;
          }
          50% {
            transform: scaleY(0.95) translateY(1px);
            opacity: 0.95;
          }
          75% {
            transform: scaleY(1.05) translateY(-1px);
            opacity: 0.92;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(255, 140, 0, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(255, 140, 0, 0.8));
          }
        }

        .candle-flame {
          animation: flicker 2.5s ease-in-out infinite, glow-pulse 2s ease-in-out infinite;
          transform-origin: center bottom;
        }

        @media (prefers-reduced-motion: reduce) {
          .candle-flame {
            animation: none;
          }
        }
      `}</style>

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Candle body */}
        <rect
          x={(width - candleWidth) / 2}
          y={flameHeight}
          width={candleWidth}
          height={candleHeight}
          fill="#F5E6D3"
          stroke="#D3B77C"
          strokeWidth="1"
          rx="2"
        />

        {/* Wax drips */}
        <ellipse
          cx={width / 2 - 3}
          cy={flameHeight + 5}
          rx="2"
          ry="4"
          fill="#E8D5C0"
          opacity="0.7"
        />
        <ellipse
          cx={width / 2 + 4}
          cy={flameHeight + 8}
          rx="1.5"
          ry="5"
          fill="#E8D5C0"
          opacity="0.6"
        />

        {/* Wick */}
        <line
          x1={width / 2}
          y1={flameHeight}
          x2={width / 2}
          y2={flameHeight - 6}
          stroke="#3D2817"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Flame */}
        <g className="candle-flame">
          {/* Outer flame (orange) */}
          <ellipse
            cx={width / 2}
            cy={flameHeight - 12}
            rx="6"
            ry="10"
            fill="url(#flameGradient)"
          />

          {/* Inner flame (yellow) */}
          <ellipse
            cx={width / 2}
            cy={flameHeight - 11}
            rx="3"
            ry="6"
            fill="url(#innerFlameGradient)"
          />
        </g>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF4500" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="innerFlameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFACD" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Glow effect */}
        <ellipse
          cx={width / 2}
          cy={flameHeight - 12}
          rx="10"
          ry="14"
          fill="url(#glowGradient)"
          opacity="0.3"
        />

        <defs>
          <radialGradient id="glowGradient">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Candle;
