import React, { useMemo } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';
import { ParticleStream } from './ParticleStream';

const NODE_POSITIONS: Record<string, [number, number, number]> = {
  HUB: [0, 0, 0],
  AIML: [0, 2.5, 0],
  CYBER: [-2.5, 0, 0],
  SYSTEMS: [2.5, 0, 0],
  BACKEND: [0, -2.5, 0],
};

const EDGES: Array<{
  from: string;
  to: string;
  color: string;
  speed: number;
}> = [
  { from: 'HUB', to: 'AIML', color: '#00d4ff', speed: 0.14 },
  { from: 'HUB', to: 'CYBER', color: '#ff3c5c', speed: 0.10 },
  { from: 'HUB', to: 'SYSTEMS', color: '#f0a500', speed: 0.12 },
  { from: 'HUB', to: 'BACKEND', color: '#00ff88', speed: 0.09 },
];

interface EdgeProps {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  speed: number;
}

const Edge: React.FC<EdgeProps> = ({ from, to, color, speed }) => {
  const curve = useMemo(() => {
    const start = new Vector3(...from);
    const end = new Vector3(...to);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    // Offset midpoint slightly in Z for visual curvature
    mid.z += 0.6;
    return new CatmullRomCurve3([start, mid, end]);
  }, [from, to]);

  const tubePoints = useMemo(() => curve.getPoints(64), [curve]);

  return (
    <group>
      {/* Tube path */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.008, 6, false]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </mesh>
      {/* Particle stream */}
      <ParticleStream curve={curve} color={color} speed={speed} count={6} />
    </group>
  );
};

export const EdgeStreams: React.FC = () => {
  return (
    <group>
      {EDGES.map((edge) => (
        <Edge
          key={`${edge.from}-${edge.to}`}
          from={NODE_POSITIONS[edge.from] as [number, number, number]}
          to={NODE_POSITIONS[edge.to] as [number, number, number]}
          color={edge.color}
          speed={edge.speed}
        />
      ))}
    </group>
  );
};

export { NODE_POSITIONS };
