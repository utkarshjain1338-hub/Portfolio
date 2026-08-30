import React, { useRef, useState, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import {
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  IcosahedronGeometry,
  Color,
  Group,
} from 'three';
import { cameraStore } from '../../lib/cameraStore';

export interface NodeData {
  id: string;
  label: string;
  sublabel?: string;
  position: [number, number, number];
  color: string;
  isHub?: boolean;
}

interface NodeProps extends NodeData {
  onHover?: (id: string | null) => void;
}

export const Node: React.FC<NodeProps> = ({
  id,
  label,
  sublabel,
  position,
  color,
  isHub = false,
  onHover,
}) => {
  const groupRef = useRef<Group>(null);
  const innerRef = useRef<Mesh>(null);
  const outerRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const innerGeo = useMemo(
    () => new IcosahedronGeometry(isHub ? 0.28 : 0.18, 1),
    [isHub]
  );
  const outerGeo = useMemo(
    () => new IcosahedronGeometry(isHub ? 0.52 : 0.38, 1),
    [isHub]
  );

  const innerMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.8,
        metalness: 0.4,
        roughness: 0.3,
        toneMapped: false,
      }),
    [color]
  );

  const outerMat = useMemo(
    () =>
      new MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
        toneMapped: false,
      }),
    [color]
  );

  const isActive = useCallback(() => {
    return cameraStore.activeNode === id;
  }, [id]);

  useFrame((_, delta) => {
    if (!groupRef.current || !innerRef.current || !outerRef.current) return;

    const active = isActive();
    const targetScale = hovered ? 1.35 : active ? 1.2 : 1.0;
    const currentScale = groupRef.current.scale.x;
    const newScale = currentScale + (targetScale - currentScale) * delta * 4;
    groupRef.current.scale.setScalar(newScale);

    // Breathing animation on inner core
    const breathe = Math.sin(Date.now() * 0.001 * (isHub ? 0.7 : 1.0)) * 0.04;
    innerRef.current.scale.setScalar(1 + breathe);

    // Outer shell rotation
    outerRef.current.rotation.x += delta * (hovered ? 0.8 : active ? 0.5 : 0.25);
    outerRef.current.rotation.y += delta * (hovered ? 1.0 : active ? 0.65 : 0.35);

    // Emissive intensity
    const mat = innerRef.current.material as MeshStandardMaterial;
    const targetEmissive = hovered ? 2.5 : active ? 1.8 : 0.8;
    mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * delta * 4;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
        cameraStore.hoveredNode = id;
        onHover?.(id);
        document.body.style.cursor = 'none';
        // Dispatch custom event for cursor
        window.dispatchEvent(new CustomEvent('node-hover', { detail: { active: true } }));
      }}
      onPointerLeave={() => {
        setHovered(false);
        cameraStore.hoveredNode = null;
        onHover?.(null);
        document.body.style.cursor = 'none';
        window.dispatchEvent(new CustomEvent('node-hover', { detail: { active: false } }));
      }}
    >
      {/* Inner core */}
      <mesh ref={innerRef} geometry={innerGeo} material={innerMat} />

      {/* Outer wireframe shell */}
      <mesh ref={outerRef} geometry={outerGeo} material={outerMat} />

      {/* Point light for glow */}
      <pointLight
        color={color}
        intensity={hovered ? 2 : 0.6}
        distance={2.5}
        decay={2}
      />

      {/* Label */}
      <Html
        position={[0, (isHub ? 0.72 : 0.58), 0]}
        center
        distanceFactor={6}
        zIndexRange={[0, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: isHub ? '10px' : '8px',
            fontWeight: 500,
            color: hovered ? '#ffffff' : color,
            letterSpacing: '0.12em',
            textAlign: 'center',
            opacity: hovered ? 1 : 0.75,
            transition: 'opacity 0.3s, color 0.3s',
            whiteSpace: 'nowrap',
            textShadow: `0 0 12px ${color}`,
            userSelect: 'none',
          }}
        >
          {label}
          {sublabel && (
            <div style={{ fontSize: '7px', opacity: 0.6, marginTop: '2px' }}>
              {sublabel}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
