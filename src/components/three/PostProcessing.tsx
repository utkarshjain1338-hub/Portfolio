import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export const PostProcessing: React.FC = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.85}
        mipmapBlur
      />
      <Vignette
        offset={0.25}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};
