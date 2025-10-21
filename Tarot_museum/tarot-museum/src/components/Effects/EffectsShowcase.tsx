/**
 * EffectsShowcase Component
 *
 * Demo component showing all available visual effects.
 * Can be used for testing or as a reference for other developers.
 *
 * NOT FOR PRODUCTION - This is a showcase/demo component
 */

import React from 'react';
import { ScrollReveal, ParallaxLayer } from './ScrollReveal';

export const EffectsShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Header */}
        <ScrollReveal direction="fade" duration={1200}>
          <h1 className="text-6xl font-bold text-center glow-mystical mb-4">
            Visual Effects Showcase
          </h1>
          <p className="text-center text-gray-400 text-lg">
            Demo of all available atmospheric effects
          </p>
        </ScrollReveal>

        {/* Parallax Demo */}
        <section className="relative h-96 overflow-hidden rounded-lg">
          <ParallaxLayer speed={0.2} className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 opacity-50" />
          <ParallaxLayer speed={0.5} className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl glow-cyan">Parallax Layer 1</div>
          </ParallaxLayer>
          <ParallaxLayer speed={0.8} className="absolute inset-0 flex items-center justify-center pt-32">
            <div className="text-2xl glow-purple">Parallax Layer 2</div>
          </ParallaxLayer>
        </section>

        {/* ScrollReveal Directions */}
        <section>
          <h2 className="text-3xl font-bold mb-8 glow-cyan">Scroll Reveal Directions</h2>
          <div className="grid grid-cols-2 gap-6">
            <ScrollReveal direction="up" delay={0}>
              <div className="p-6 bg-gray-800 rounded-lg border border-cyan-500/30">
                <h3 className="text-xl mb-2">↑ From Bottom</h3>
                <p className="text-gray-400">direction="up"</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="down" delay={100}>
              <div className="p-6 bg-gray-800 rounded-lg border border-cyan-500/30">
                <h3 className="text-xl mb-2">↓ From Top</h3>
                <p className="text-gray-400">direction="down"</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <div className="p-6 bg-gray-800 rounded-lg border border-purple-500/30">
                <h3 className="text-xl mb-2">← From Right</h3>
                <p className="text-gray-400">direction="left"</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300}>
              <div className="p-6 bg-gray-800 rounded-lg border border-purple-500/30">
                <h3 className="text-xl mb-2">→ From Left</h3>
                <p className="text-gray-400">direction="right"</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Text Glows */}
        <section>
          <h2 className="text-3xl font-bold mb-8 glow-purple">Text Glow Effects</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl glow-cyan mb-2">Cyan Glow</h3>
              <code className="text-sm text-gray-400">className="glow-cyan"</code>
            </div>
            <div>
              <h3 className="text-2xl glow-purple mb-2">Purple Glow</h3>
              <code className="text-sm text-gray-400">className="glow-purple"</code>
            </div>
            <div>
              <h3 className="text-2xl glow-mystical mb-2">Mystical Glow</h3>
              <code className="text-sm text-gray-400">className="glow-mystical"</code>
            </div>
          </div>
        </section>

        {/* Box Glows */}
        <section>
          <h2 className="text-3xl font-bold mb-8 glow-cyan">Box Glow Effects</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="box-glow-cyan p-8 rounded-lg bg-gray-800">
              <h3 className="text-xl mb-2">Cyan Box Glow</h3>
              <code className="text-sm text-gray-400">className="box-glow-cyan"</code>
            </div>
            <div className="box-glow-purple p-8 rounded-lg bg-gray-800">
              <h3 className="text-xl mb-2">Purple Box Glow</h3>
              <code className="text-sm text-gray-400">className="box-glow-purple"</code>
            </div>
          </div>
        </section>

        {/* Hover Effects */}
        <section>
          <h2 className="text-3xl font-bold mb-8 glow-purple">Hover Glow Effects</h2>
          <div className="grid grid-cols-2 gap-6">
            <button className="hover-glow-cyan p-8 rounded-lg bg-gray-800 border border-cyan-500/30 transition-all">
              <h3 className="text-xl mb-2">Hover Me (Cyan)</h3>
              <code className="text-sm text-gray-400">className="hover-glow-cyan"</code>
            </button>
            <button className="hover-glow-purple p-8 rounded-lg bg-gray-800 border border-purple-500/30 transition-all">
              <h3 className="text-xl mb-2">Hover Me (Purple)</h3>
              <code className="text-sm text-gray-400">className="hover-glow-purple"</code>
            </button>
          </div>
        </section>

        {/* Pulsing Effects */}
        <section>
          <h2 className="text-3xl font-bold mb-8 glow-cyan">Pulsing Glow Effects</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="pulse-glow-cyan p-8 rounded-lg bg-gray-800">
              <h3 className="text-xl mb-2">Pulsing Cyan</h3>
              <code className="text-sm text-gray-400">className="pulse-glow-cyan"</code>
            </div>
            <div className="pulse-glow-purple p-8 rounded-lg bg-gray-800">
              <h3 className="text-xl mb-2">Pulsing Purple</h3>
              <code className="text-sm text-gray-400">className="pulse-glow-purple"</code>
            </div>
          </div>
        </section>

        {/* Card Effects */}
        <section>
          <h2 className="text-3xl font-bold mb-8 glow-mystical">Card Effects</h2>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="card-mystical p-6 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer">
                  <div className="text-4xl mb-4 text-center">✦</div>
                  <h3 className="text-lg text-center mb-2">Mystical Card {i}</h3>
                  <p className="text-sm text-gray-400 text-center">
                    Hover for shimmer effect
                  </p>
                  <code className="text-xs text-gray-500 block mt-2">
                    .card-mystical
                  </code>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Border Glow */}
        <section>
          <h2 className="text-3xl font-bold mb-8 glow-purple">Border Glow Effect</h2>
          <div className="border-glow p-12 rounded-lg bg-gray-800 border-2 border-gray-700 cursor-pointer">
            <h3 className="text-2xl mb-4 text-center glow-cyan">Hover for Border Glow</h3>
            <p className="text-gray-400 text-center">
              Animated gradient border appears on hover
            </p>
            <code className="text-sm text-gray-500 block mt-4 text-center">
              className="border-glow"
            </code>
          </div>
        </section>

        {/* Staggered Reveals */}
        <section>
          <h2 className="text-3xl font-bold mb-8 glow-cyan">Staggered Reveals</h2>
          <div className="space-y-4">
            {[0, 100, 200, 300, 400].map((delay, i) => (
              <ScrollReveal key={i} direction="up" delay={delay}>
                <div className="p-6 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-lg border border-cyan-500/20">
                  <p className="text-lg">
                    Item {i + 1} - Delay: {delay}ms
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Performance Info */}
        <ScrollReveal direction="fade" delay={200}>
          <section className="p-8 bg-gray-800 rounded-lg border border-gray-700">
            <h2 className="text-3xl font-bold mb-4 glow-mystical">Performance Features</h2>
            <ul className="space-y-2 text-gray-300">
              <li>✅ GPU-accelerated animations (translate3d, will-change)</li>
              <li>✅ RequestAnimationFrame for 60fps</li>
              <li>✅ Intersection Observer for scroll reveals</li>
              <li>✅ Passive event listeners</li>
              <li>✅ Mobile-optimized (50% particle reduction)</li>
              <li>✅ Respects prefers-reduced-motion</li>
              <li>✅ Auto-cleanup after reveals</li>
            </ul>
          </section>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal direction="fade" delay={400}>
          <footer className="text-center text-gray-500 py-8">
            <p className="mb-2">Visual Effects System v1.0</p>
            <p className="text-sm">
              Created by Visual Effects Specialist Agent
            </p>
          </footer>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default EffectsShowcase;
