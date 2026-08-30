import React from 'react';

export const SceneLighting: React.FC = () => {
  return (
    <>
      {/* Ambient — very dark, just enough to see geometry */}
      <ambientLight intensity={0.08} color="#0a0a20" />

      {/* Main directional — cool blue-white */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.4}
        color="#8af0ff"
      />

      {/* Rim light from behind — slight violet */}
      <directionalLight
        position={[-5, -2, -5]}
        intensity={0.2}
        color="#7b2fff"
      />

      {/* Point lights for node glow atmosphere */}
      <pointLight position={[0, 2.5, 1]} intensity={0.6} color="#00d4ff" distance={6} />
      <pointLight position={[-2.5, 0, 1]} intensity={0.4} color="#ff3c5c" distance={5} />
      <pointLight position={[2.5, 0, 1]} intensity={0.4} color="#f0a500" distance={5} />
      <pointLight position={[0, -2.5, 1]} intensity={0.4} color="#00ff88" distance={5} />
    </>
  );
};
