/**
 * Enhanced 3D Card Viewer with Magical Effects
 * Features: 360° rotation, glow effects, particle system, smooth physics
 */

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Sparkles, shaderMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { TarotCard } from '@/types/tarot';
import { RotateCcw, ZoomIn, ZoomOut, Move3D, Maximize2 } from 'lucide-react';

interface Card3DViewerProps {
  card: TarotCard;
  className?: string;
  autoRotate?: boolean;
}

// Custom shader material for magical glow effect
const GlowMaterial = shaderMaterial(
  {
    color: new THREE.Color(0.0, 0.8, 1.0),
    glowIntensity: 1.5,
    time: 0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform vec3 color;
    uniform float glowIntensity;
    uniform float time;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      // Edge glow effect
      float edge = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
      edge = pow(edge, 2.0);

      // Pulsing animation
      float pulse = sin(time * 2.0) * 0.5 + 0.5;

      // Combine effects
      vec3 glow = color * edge * glowIntensity * (0.7 + pulse * 0.3);

      gl_FragColor = vec4(glow, edge * 0.8);
    }
  `
);

extend({ GlowMaterial });

// Floating particles component
interface MagicalParticlesProps {
  hovered: boolean;
}

const MagicalParticles: React.FC<MagicalParticlesProps> = ({ hovered }) => {
  return (
    <Sparkles
      count={hovered ? 100 : 50}
      scale={hovered ? 8 : 5}
      size={hovered ? 3 : 2}
      speed={hovered ? 1.5 : 0.5}
      opacity={hovered ? 0.8 : 0.4}
      color="#00ffff"
    />
  );
};

// 3D Card Model with magical effects
interface Card3DModelProps {
  card: TarotCard;
  isFlipped: boolean;
  onFlipComplete?: () => void;
}

const Card3DModel: React.FC<Card3DModelProps> = ({ card, isFlipped }) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  // Animate card rotation and effects
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth rotation for flip
      const targetRotation = isFlipped ? Math.PI : 0;
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * delta * 5;

      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;

      // Tilt on hover
      if (hovered) {
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.05;
      } else {
        groupRef.current.rotation.x += (0 - groupRef.current.rotation.x) * delta * 5;
      }
    }

    // Update glow shader
    if (glowRef.current) {
      glowRef.current.time = state.clock.elapsedTime;
      glowRef.current.glowIntensity = hovered ? 2.5 : 1.5;
    }
  });

  // Get suit color for glow
  const getSuitColor = (suit?: string): THREE.Color => {
    switch (suit) {
      case 'wands': return new THREE.Color(1.0, 0.4, 0.0);
      case 'cups': return new THREE.Color(0.0, 0.6, 1.0);
      case 'swords': return new THREE.Color(0.6, 0.6, 0.8);
      case 'pentacles': return new THREE.Color(0.0, 0.8, 0.4);
      case 'major': return new THREE.Color(0.6, 0.0, 1.0);
      default: return new THREE.Color(0.0, 0.8, 1.0);
    }
  };

  const cardColor = getSuitColor(card.suit);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Magical particles */}
      <MagicalParticles hovered={hovered} />

      {/* Card Front */}
      <mesh position={[0, 0, 0.026]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 3.5, 0.05]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.2}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Card content plane */}
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[2.3, 3.3]} />
        <meshStandardMaterial
          color={cardColor}
          roughness={0.4}
          metalness={0.2}
          emissive={cardColor}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Edge glow effect */}
      <mesh position={[0, 0, 0]} scale={[1.02, 1.02, 1.1]}>
        <boxGeometry args={[2.5, 3.5, 0.05]} />
        {/* @ts-ignore */}
        <glowMaterial
          ref={glowRef}
          color={cardColor}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Card Back */}
      <mesh position={[0, 0, -0.026]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
        <planeGeometry args={[2.3, 3.3]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          roughness={0.3}
          metalness={0.5}
          clearcoat={0.8}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Depth shadow */}
      <mesh position={[0, 0, -0.1]} receiveShadow>
        <planeGeometry args={[2.6, 3.6]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
};

// Main viewer component
const Card3DViewer: React.FC<Card3DViewerProps> = ({
  card,
  className = '',
  autoRotate = true
}: Card3DViewerProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(autoRotate);
  const [zoom, setZoom] = useState(1);
  const controlsRef = useRef<any>();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom * 1.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom / 1.2, 0.5));
  };

  const toggleAutoRotate = () => {
    setIsAutoRotate(!isAutoRotate);
  };

  return (
    <div className={`relative h-[500px] w-full ${className}`}>
      {/* 3D Canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-2xl overflow-hidden backdrop-blur-sm">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
        >
          {/* Enhanced lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00ffff" />
          <pointLight position={[5, -5, -5]} intensity={0.3} color="#ff00ff" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />

          {/* Environment for reflections */}
          <Environment preset="studio" />

          {/* 3D Card */}
          <Card3DModel card={card} isFlipped={isFlipped} />

          {/* Orbit controls */}
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={isAutoRotate}
            autoRotateSpeed={1.5}
            minDistance={3}
            maxDistance={12}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            dampingFactor={0.05}
            enableDamping={true}
          />
        </Canvas>
      </div>

      {/* Glassmorphic control panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-6 left-6 flex flex-col gap-2"
      >
        {[
          { icon: RotateCcw, action: resetCamera, label: 'Reset', active: false },
          { icon: ZoomIn, action: handleZoomIn, label: 'Zoom In', active: false },
          { icon: ZoomOut, action: handleZoomOut, label: 'Zoom Out', active: false },
          { icon: Move3D, action: toggleAutoRotate, label: 'Auto Rotate', active: isAutoRotate },
          { icon: Maximize2, action: handleFlip, label: 'Flip', active: isFlipped },
        ].map(({ icon: Icon, action, label, active }) => (
          <motion.button
            key={label}
            onClick={action}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`
              group relative p-3 rounded-xl backdrop-blur-md transition-all
              ${active
                ? 'bg-cyan-500/30 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/30'
                : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }
            `}
            aria-label={label}
          >
            <Icon
              className={`w-5 h-5 transition-colors ${
                active ? 'text-cyan-300' : 'text-white/80 group-hover:text-white'
              }`}
            />

            {/* Tooltip */}
            <span className="absolute left-full ml-3 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {label}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Instructions overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 right-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 max-w-xs"
      >
        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Move3D className="w-4 h-4" />
          3D Controls
        </h4>
        <ul className="text-white/80 text-sm space-y-1">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Drag to rotate
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Scroll to zoom
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Right-drag to pan
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Hover for magic
          </li>
        </ul>
      </motion.div>

      {/* Card info overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-6 right-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4"
      >
        <h3 className="text-white font-bold text-lg mb-1">{card.name}</h3>
        <p className="text-white/70 text-sm capitalize">
          {card.arcana === 'major' ? 'Major Arcana' : `${card.suit} Arcana`}
        </p>
      </motion.div>
    </div>
  );
};

export default Card3DViewer;
