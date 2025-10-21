import React, { useEffect, useRef } from 'react';

interface AuroraBackgroundProps {
  className?: string;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Aurora wave parameters
    let time = 0;
    const waves = [
      { amplitude: 100, frequency: 0.002, speed: 0.001, color: 'rgba(0, 255, 255, 0.15)' },
      { amplitude: 80, frequency: 0.003, speed: 0.0015, color: 'rgba(138, 43, 226, 0.12)' },
      { amplitude: 120, frequency: 0.0015, speed: 0.0008, color: 'rgba(75, 0, 130, 0.1)' }
    ];

    // Noise function for organic movement
    const noise = (x: number, y: number, time: number): number => {
      return (
        Math.sin(x * 0.01 + time) *
        Math.cos(y * 0.01 + time * 0.5) *
        Math.sin((x + y) * 0.005 + time * 0.3)
      );
    };

    // Draw aurora waves
    const drawAuroraWave = (
      wave: typeof waves[0],
      offsetY: number,
      time: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 5) {
        const y =
          offsetY +
          Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
          noise(x, offsetY, time) * 20;

        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, wave.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      // Fade previous frame for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 1;

      // Draw multiple aurora layers
      waves.forEach((wave, index) => {
        const offsetY = canvas.height * 0.3 + index * 50;
        drawAuroraWave(wave, offsetY, time);
      });

      // Add radial gradient overlay for depth
      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );
      radialGradient.addColorStop(0, 'rgba(138, 43, 226, 0.05)');
      radialGradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.03)');
      radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');

      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        zIndex: 0,
        transform: 'translate3d(0, 0, 0)', // GPU acceleration
        willChange: 'transform',
        filter: 'blur(40px)' // Soft blur for aurora effect
      }}
    />
  );
};

export default AuroraBackground;
