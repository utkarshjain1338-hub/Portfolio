/**
 * SystemGraph — the root Three.js canvas.
 *
 * Architecture:
 *   Canvas (position: fixed, z-index: 0)
 *     ├── ParticleField     — atmospheric depth layers
 *     ├── SceneLighting     — ambient + directional + per-node points
 *     ├── EdgeStreams        — connections between nodes
 *     ├── Nodes             — 5 domain nodes
 *     ├── CameraRig         — scroll-driven + mouse parallax
 *     ├── AutonomousTick    — runs the idle intelligence state machine
 *     └── PostProcessing    — bloom + vignette
 */
import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ParticleField }    from './ParticleField';
import { SceneLighting }    from './SceneLighting';
import { Nodes }            from './Nodes';
import { EdgeStreams }      from './EdgeStreams';
import { CameraRig }        from './CameraRig';
import { PostProcessing }   from './PostProcessing';
import { tickAutonomousSystem } from '../../lib/autonomousSystem';

/** Runs the autonomous state machine each frame — must be inside Canvas */
const AutonomousTick: React.FC = () => {
  useFrame(({ clock }, delta) => {
    tickAutonomousSystem(delta, clock.getElapsedTime());
  });
  return null;
};

export const SystemGraph: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      inset:    0,
      zIndex:   0,
      background: '#050508',
    }}
    aria-hidden="true"
  >
    <Canvas
      camera={{ position: [0, 0.5, 7.5], fov: 48, near: 0.1, far: 120 }}
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      gl={{
        antialias:       true,
        alpha:           false,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <AutonomousTick />
        <ParticleField />
        <SceneLighting />
        <CameraRig />
        <PostProcessing />
      </Suspense>
    </Canvas>
  </div>
);
