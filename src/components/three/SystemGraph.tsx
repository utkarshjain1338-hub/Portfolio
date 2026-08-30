import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneLighting } from './SceneLighting';
import { Nodes } from './Nodes';
import { EdgeStreams } from './EdgeStreams';
import { CameraRig } from './CameraRig';
import { PostProcessing } from './PostProcessing';

export const SystemGraph: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: '#050508',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneLighting />
          <EdgeStreams />
          <Nodes />
          <CameraRig />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  );
};
