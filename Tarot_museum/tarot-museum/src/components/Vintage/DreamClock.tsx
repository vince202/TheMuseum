import React, { useEffect, useRef, useState } from 'react';

interface DreamClockProps {
  size?: number;
  className?: string;
}

/**
 * Horloge Onirique Métamorphique
 * Une horloge mystérieuse qui se transforme lentement,
 * avec des formes organiques et des lueurs dorées
 */
const DreamClock: React.FC<DreamClockProps> = ({ size = 240, className = '' }) => {
  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  const secondHandRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const lastRef = useRef<number>(0);

  // Vitesses des aiguilles (degrés par seconde)
  const V_SEC = 6;
  const V_MIN = 0.1;
  const V_HOUR = 0.0083333333;
  const MAX_DT = 0.05;

  const anglesRef = useRef({ s: 0, m: 0, h: 0 });

  const computeAnglesFromNow = () => {
    const now = new Date();
    const ms = now.getMilliseconds();
    const s = now.getSeconds() + ms / 1000;
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;
    return {
      s: (s / 60) * 360 - 90,
      m: (m / 60) * 360 - 90,
      h: (h / 12) * 360 - 90,
    };
  };

  const setAngles = (aS: number, aM: number, aH: number) => {
    if (secondHandRef.current) secondHandRef.current.style.setProperty('--angle', `${aS}deg`);
    if (minuteHandRef.current) minuteHandRef.current.style.setProperty('--angle', `${aM}deg`);
    if (hourHandRef.current) hourHandRef.current.style.setProperty('--angle', `${aH}deg`);
  };

  const softResync = (duration = 300) => {
    const target = computeAnglesFromNow();
    const startS = anglesRef.current.s;
    const startM = anglesRef.current.m;
    const startH = anglesRef.current.h;
    const dS = target.s - startS;
    const dM = target.m - startM;
    const dH = target.h - startH;
    const t0 = performance.now();

    const tween = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      setAngles(startS + dS * k, startM + dM * k, startH + dH * k);
      if (k < 1) {
        requestAnimationFrame(tween);
      } else {
        anglesRef.current = target;
        lastRef.current = performance.now();
      }
    };
    requestAnimationFrame(tween);
  };

  useEffect(() => {
    // Initialisation
    const init = computeAnglesFromNow();
    anglesRef.current = init;
    setAngles(init.s, init.m, init.h);
    lastRef.current = performance.now();

    // Animation frame loop
    const tick = (t: number) => {
      let dt = (t - lastRef.current) / 1000;
      lastRef.current = t;
      if (dt > MAX_DT) dt = MAX_DT;

      anglesRef.current.s += V_SEC * dt;
      anglesRef.current.m += V_MIN * dt;
      anglesRef.current.h += V_HOUR * dt;

      setAngles(anglesRef.current.s, anglesRef.current.m, anglesRef.current.h);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    // Resync périodique (toutes les 30s)
    const resyncInterval = setInterval(() => {
      const target = computeAnglesFromNow();
      anglesRef.current.s += (target.s - anglesRef.current.s) * 0.02;
      anglesRef.current.m += (target.m - anglesRef.current.m) * 0.02;
      anglesRef.current.h += (target.h - anglesRef.current.h) * 0.02;
    }, 30000);

    // Resync au retour de tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        softResync(350);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      clearInterval(resyncInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className={`dream-clock ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ['--clock-size' as string]: `${size}px`
      }}
      role="img"
      aria-label="Horloge mystique animée"
    >
      <div className="dream-clock-inner">
        <div className="dream-clock-frame"></div>
        <div ref={hourHandRef} className="dream-clock-hand hour-hand"></div>
        <div ref={minuteHandRef} className="dream-clock-hand minute-hand"></div>
        <div ref={secondHandRef} className="dream-clock-hand second-hand"></div>
        <div className="dream-clock-center"></div>
      </div>
    </div>
  );
};

export default DreamClock;
