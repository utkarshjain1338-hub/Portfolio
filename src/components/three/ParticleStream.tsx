import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3, Mesh, MeshBasicMaterial, SphereGeometry } from 'three';

interface ParticleStreamProps {
  curve: CatmullRomCurve3;
  count?: number;
  color: string;
  speed?: number;
}

interface Particle {
  t: number;
  speed: number;
  ref: React.RefObject<Mesh>;
}

export const ParticleStream: React.FC<ParticleStreamProps> = ({
  curve,
  count = 5,
  color,
  speed = 0.12,
}) => {
  const geo = useMemo(() => new SphereGeometry(0.025, 4, 4), []);
  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        color,
        toneMapped: false,
      }),
    [color]
  );

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      t: i / count,
      speed: speed * (0.7 + Math.random() * 0.6),
      ref: React.createRef<Mesh>(),
    }));
  }, [count, speed]);

  const tempVec = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    particles.forEach((p) => {
      p.t = (p.t + p.speed * delta) % 1;
      curve.getPoint(p.t, tempVec);
      if (p.ref.current) {
        p.ref.current.position.copy(tempVec);
      }
    });
  });

  return (
    <group>
      {particles.map((p, i) => (
        <mesh key={i} ref={p.ref} geometry={geo} material={mat} />
      ))}
    </group>
  );
};
