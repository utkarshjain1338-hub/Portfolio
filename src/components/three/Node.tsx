/**
 * Node — individual system node with three physical layers:
 *   1. Core — dark metallic icosahedron with emissive rim
 *   2. Wireframe shell — slowly rotating outer cage
 *   3. Energy field — Fresnel glow sphere reacting to activity
 *
 * Responds to:
 *   - Hover (from pointer events)
 *   - Autonomous system activity (from autonomousSystem.nodeActivity)
 *   - Camera's active section (from cameraStore.activeNode)
 */
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { cameraStore } from '../../lib/cameraStore';
import { autonomousSystem } from '../../lib/autonomousSystem';

/* ── Fresnel glow shader ── */
const FRESNEL_VERT = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vNormal  = normalize(normalMatrix * normal);
    vec4 mv  = modelViewMatrix * vec4(position, 1.0);
    vViewPos = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRESNEL_FRAG = /* glsl */`
  uniform vec3  uColor;
  uniform float uIntensity;
  varying vec3  vNormal;
  varying vec3  vViewPos;
  void main() {
    vec3  n       = normalize(vNormal);
    vec3  v       = normalize(vViewPos);
    float fresnel = 1.0 - abs(dot(n, v));
    fresnel       = pow(fresnel, 2.2);
    gl_FragColor  = vec4(uColor, fresnel * uIntensity);
  }
`;

export interface NodeData {
  id:       string;
  label:    string;
  sublabel?: string;
  position: [number, number, number];
  color:    string;
  isHub?:   boolean;
}

interface NodeProps extends NodeData {
  onHover?: (id: string | null) => void;
}

export const Node: React.FC<NodeProps> = ({
  id, label, sublabel, position, color, isHub = false, onHover,
}) => {
  const groupRef   = useRef<THREE.Group>(null);
  const innerRef   = useRef<THREE.Mesh>(null);
  const outerRef   = useRef<THREE.Mesh>(null);
  const fresnelRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  /* ── Geometry (memoised) ── */
  const innerGeo   = useMemo(() => new THREE.IcosahedronGeometry(isHub ? 0.24 : 0.15, 2), [isHub]);
  const outerGeo   = useMemo(() => new THREE.IcosahedronGeometry(isHub ? 0.50 : 0.36, 1), [isHub]);
  const fresnelGeo = useMemo(() => new THREE.SphereGeometry(isHub ? 0.68 : 0.50, 24, 24), [isHub]);

  /* ── Materials (memoised) ── */
  const innerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:            '#070d18',
    emissive:         color,
    emissiveIntensity: 0.7,
    metalness:         0.85,
    roughness:         0.12,
    toneMapped:        false,
  }), [color]);

  const outerMat = useMemo(() => new THREE.MeshBasicMaterial({
    color,
    wireframe:   true,
    transparent: true,
    opacity:     0.18,
    toneMapped:  false,
  }), [color]);

  const fresnelMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uColor:     { value: new THREE.Color(color) },
      uIntensity: { value: 0.55 },
    },
    vertexShader:   FRESNEL_VERT,
    fragmentShader: FRESNEL_FRAG,
    transparent:    true,
    depthWrite:     false,
    side:           THREE.FrontSide,
    blending:       THREE.AdditiveBlending,
  }), [color]);

  const isActive = useCallback(() => cameraStore.activeNode === id, [id]);

  /* ── Per-frame animation ── */
  useFrame((_, delta) => {
    if (!groupRef.current || !innerRef.current || !outerRef.current || !fresnelRef.current) return;

    const hov    = hovered;
    const active = isActive();
    const autonomous = autonomousSystem.nodeActivity[id as keyof typeof autonomousSystem.nodeActivity] ?? 0;

    // Combined activity level
    const activity = Math.max(hov ? 1 : 0, active ? 0.7 : 0, autonomous);

    // Scale
    const targetScale = 1 + activity * 0.32;
    const curScale    = groupRef.current.scale.x;
    groupRef.current.scale.setScalar(curScale + (targetScale - curScale) * delta * 4.5);

    // Inner breathing + activity pulse
    const breathe = Math.sin(Date.now() * 0.001 * (isHub ? 0.6 : 0.9)) * 0.035;
    const pulse   = autonomous > 0.5
      ? Math.sin(Date.now() * 0.008) * 0.08
      : 0;
    innerRef.current.scale.setScalar(1 + breathe + pulse);

    // Outer wireframe rotation — spins faster when active
    const spinBase  = isHub ? 0.12 : 0.18;
    const spinBoost = activity * 0.7;
    outerRef.current.rotation.x += delta * (spinBase + spinBoost);
    outerRef.current.rotation.y += delta * (spinBase * 1.4 + spinBoost * 0.8);
    outerRef.current.rotation.z += delta * (spinBase * 0.7);

    // Emissive intensity
    const mat = innerRef.current.material as THREE.MeshStandardMaterial;
    const targetEmissive = 0.6 + activity * 2.2;
    mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * delta * 5;

    // Outer wireframe opacity
    const outerM = outerRef.current.material as THREE.MeshBasicMaterial;
    outerM.opacity += ((0.12 + activity * 0.35) - outerM.opacity) * delta * 4;

    // Fresnel intensity
    const fresnelU = (fresnelRef.current.material as THREE.ShaderMaterial).uniforms;
    const targetFresnel = 0.4 + activity * 1.2;
    fresnelU.uIntensity.value += (targetFresnel - fresnelU.uIntensity.value) * delta * 4;
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
        window.dispatchEvent(new CustomEvent('node-hover', { detail: { active: true } }));
      }}
      onPointerLeave={() => {
        setHovered(false);
        cameraStore.hoveredNode = null;
        onHover?.(null);
        window.dispatchEvent(new CustomEvent('node-hover', { detail: { active: false } }));
      }}
    >
      {/* Energy field — Fresnel glow */}
      <mesh ref={fresnelRef} geometry={fresnelGeo} material={fresnelMat} />

      {/* Outer wireframe shell */}
      <mesh ref={outerRef} geometry={outerGeo} material={outerMat} />

      {/* Core */}
      <mesh ref={innerRef} geometry={innerGeo} material={innerMat} />

      {/* Node point light */}
      <pointLight color={color} intensity={hovered ? 1.8 : 0.45} distance={2.2} decay={2} />

      {/* Label */}
      <Html
        position={[0, (isHub ? 0.85 : 0.65), 0]}
        center
        distanceFactor={7}
        zIndexRange={[0, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          fontFamily:  "'JetBrains Mono', monospace",
          fontSize:    isHub ? '9px' : '7.5px',
          fontWeight:  600,
          color:       hovered ? '#ffffff' : color,
          letterSpacing: '0.14em',
          textAlign:   'center',
          whiteSpace:  'nowrap',
          textShadow:  `0 0 10px ${color}`,
          userSelect:  'none',
          opacity:     hovered ? 1 : 0.72,
          transition:  'opacity 0.3s, color 0.3s',
        }}>
          {label}
          {sublabel && (
            <div style={{ fontSize: '6.5px', opacity: 0.55, marginTop: '2px' }}>
              {sublabel}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
