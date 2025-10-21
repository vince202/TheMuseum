import React, { useEffect, useRef, useState } from 'react';

interface ClockDialProps {
  className?: string;
  size?: number;
}

export const ClockDial: React.FC<ClockDialProps> = ({
  className = '',
  size = 120
}) => {
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastTimeRef.current;

      // Rotate 1 degree every 2 seconds (0.5 degrees per second)
      const degreesPerMs = 0.5 / 1000;
      const newRotation = rotation + (deltaTime * degreesPerMs);

      setRotation(newRotation % 360);
      lastTimeRef.current = now;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [rotation]);

  const radius = size / 2;
  const innerRadius = radius * 0.85;
  const numeralRadius = radius * 0.7;

  const romanNumerals = ['XII', 'III', 'VI', 'IX'];
  const angles = [0, 90, 180, 270]; // 12, 3, 6, 9 o'clock positions

  return (
    <div className={`inline-block ${className}`} role="img" aria-label="Decorative vintage clock">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .clock-rotation {
            animation: none !important;
          }
        }
      `}</style>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle with gold border */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - 2}
          fill="#1A1410"
          stroke="#D3B77C"
          strokeWidth="3"
        />

        {/* Inner decorative circle */}
        <circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill="none"
          stroke="#D3B77C"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = radius + (radius - 15) * Math.cos(angle);
          const y1 = radius + (radius - 15) * Math.sin(angle);
          const x2 = radius + (radius - 8) * Math.cos(angle);
          const y2 = radius + (radius - 8) * Math.sin(angle);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#D3B77C"
              strokeWidth={i % 3 === 0 ? '2' : '1'}
              opacity={i % 3 === 0 ? '0.9' : '0.5'}
            />
          );
        })}

        {/* Roman numerals at key positions */}
        {romanNumerals.map((numeral, i) => {
          const angle = (angles[i] - 90) * (Math.PI / 180);
          const x = radius + numeralRadius * Math.cos(angle);
          const y = radius + numeralRadius * Math.sin(angle);

          return (
            <text
              key={numeral}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#D3B77C"
              fontSize={size * 0.15}
              fontFamily="Georgia, serif"
              fontWeight="bold"
            >
              {numeral}
            </text>
          );
        })}

        {/* Rotating center mechanism */}
        <g
          transform={`rotate(${rotation}, ${radius}, ${radius})`}
          className="clock-rotation"
          style={{ willChange: 'transform' }}
        >
          {/* Hour hand */}
          <line
            x1={radius}
            y1={radius}
            x2={radius}
            y2={radius - radius * 0.4}
            stroke="#D3B77C"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Minute hand */}
          <line
            x1={radius}
            y1={radius}
            x2={radius}
            y2={radius - radius * 0.6}
            stroke="#B8956A"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Center cap */}
        <circle
          cx={radius}
          cy={radius}
          r="4"
          fill="#D3B77C"
        />

        {/* Decorative corner details */}
        <circle
          cx={radius}
          cy={radius}
          r="2"
          fill="#1A1410"
        />
      </svg>

      <span className="sr-only">Vintage clock dial showing time passage in the museum</span>
    </div>
  );
};

export default ClockDial;
