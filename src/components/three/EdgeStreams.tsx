/**
 * EdgeStreams — connections between system nodes.
 *
 * Each edge consists of:
 *   - A semi-transparent curved tube (TubeGeometry)
 *   - A continuous slow particle stream (ambient data flow)
 *   - A signal burst particle (from autonomous system events)
 *
 * Signal bursts travel along the curve rapidly and cause
 * the tube to briefly brighten, then return to normal.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ParticleStream } from './ParticleStream';
import { autonomousSystem, NodeId } from '../../lib/autonomousSystem';

export const NODE_POSITIONS: Record<string, [number, number, number]> = {
  HUB:     [0,    0,   0],
  AIML:    [0,    2.5, 0],
  CYBER:   [-2.5, 0,   0],
  SYSTEMS: [2.5,  0,   0],
  BACKEND: [0,   -2.5, 0],
};

interface EdgeConfig {
  nodeA:  NodeId;
  nodeB:  NodeId;
  color:  string;
  speed:  number;
}

const EDGES: EdgeConfig[] = [
  { nodeA: 'HUB', nodeB: 'AIML',    color: '#00d4ff', speed: 0.13 },
  { nodeA: 'HUB', nodeB: 'CYBER',   color: '#ff3c5c', speed: 0.09 },
  { nodeA: 'HUB', nodeB: 'SYSTEMS', color: '#f0a500', speed: 0.11 },
  { nodeA: 'HUB', nodeB: 'BACKEND', color: '#00ff88', speed: 0.10 },
];

/* ── Single edge ── */
interface EdgeProps extends EdgeConfig {}

const Edge: React.FC<EdgeProps> = ({ nodeA, nodeB, color, speed }) => {
  const tubeRef    = useRef<THREE.Mesh>(null);
  const burstRef   = useRef<THREE.Mesh>(null);
  const burstLight = useRef<THREE.PointLight>(null);

  const curve = useMemo(() => {
    const a   = new THREE.Vector3(...NODE_POSITIONS[nodeA]);
    const b   = new THREE.Vector3(...NODE_POSITIONS[nodeB]);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.z += 0.5; // gentle Z arc
    return new THREE.CatmullRomCurve3([a, mid, b]);
  }, [nodeA, nodeB]);

  const tubeGeo  = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.007, 5, false), [curve]);
  const burstGeo = useMemo(() => new THREE.SphereGeometry(0.05, 8, 8), []);
  const tempVec  = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    /* ── Find any autonomous signal on this edge ── */
    const activeSignal = autonomousSystem.signals.find(s => {
      return (s.from === nodeA && s.to === nodeB) ||
             (s.from === nodeB && s.to === nodeA);
    });

    const signalActive = !!activeSignal;

    /* ── Burst particle position ── */
    if (burstRef.current) {
      if (activeSignal) {
        // If signal is going nodeB→nodeA (reversed) flip t
        const t = (activeSignal.from === nodeA) ? activeSignal.t : 1 - activeSignal.t;
        curve.getPoint(t, tempVec);
        burstRef.current.position.copy(tempVec);
        burstRef.current.visible = true;
        (burstRef.current.material as THREE.MeshBasicMaterial).color.set(activeSignal.color);
      } else {
        burstRef.current.visible = false;
      }
    }

    /* ── Burst point light ── */
    if (burstLight.current) {
      const targetIntensity = signalActive ? 1.5 : 0;
      burstLight.current.intensity +=
        (targetIntensity - burstLight.current.intensity) * delta * 8;
      if (activeSignal) {
        const t = (activeSignal.from === nodeA) ? activeSignal.t : 1 - activeSignal.t;
        curve.getPoint(t, tempVec);
        burstLight.current.position.copy(tempVec);
        burstLight.current.color.set(activeSignal.color);
      }
    }

    /* ── Tube opacity: brightens while signal passes ── */
    if (tubeRef.current) {
      const mat = tubeRef.current.material as THREE.MeshBasicMaterial;
      const target = signalActive ? 0.45 : 0.14;
      mat.opacity += (target - mat.opacity) * delta * 5;
    }
  });

  return (
    <group>
      {/* Tube path */}
      <mesh ref={tubeRef} geometry={tubeGeo}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.14}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      {/* Ambient particle stream (always flowing) */}
      <ParticleStream curve={curve} color={color} speed={speed} count={5} />

      {/* Signal burst particle */}
      <mesh ref={burstRef} geometry={burstGeo} visible={false}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      {/* Burst point light for local glow */}
      <pointLight
        ref={burstLight}
        color={color}
        intensity={0}
        distance={1.5}
        decay={2}
      />
    </group>
  );
};

/* ── All edges ── */
export const EdgeStreams: React.FC = () => (
  <group>
    {EDGES.map(e => (
      <Edge key={`${e.nodeA}-${e.nodeB}`} {...e} />
    ))}
  </group>
);
