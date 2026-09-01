import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { cameraStore } from '../../lib/cameraStore';

const COUNT = 280;

/* ── Shaders ── */
const VERT = /* glsl */`
  attribute float aSize;
  attribute float aAlpha;
  varying float vAlpha;
  uniform float uPhase;
  uniform float uScroll;
  uniform float uSection;
  uniform float uWarp;
  uniform float uSpeed;

  void main() {
    vAlpha = aAlpha;
    vec3 pos = position;
    
    // Subtle evolution based on scroll, theme warp, and acceleration speed
    float warp = sin(pos.x * 0.2 + uScroll * 3.0) * cos(pos.y * 0.2 + uPhase * 0.1);
    
    // Stretch along Z when accelerating
    pos.z += warp * uWarp * (1.0 + sin(uSection * 1.5) * 0.5);
    pos.z += (uSpeed - 1.0) * 10.0 * sin(pos.x + pos.y);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (200.0 / -mvPos.z);
    gl_Position  = projectionMatrix * mvPos;
  }
`;

const FRAG = /* glsl */`
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r  = length(uv);
    if (r > 0.5) discard;
    // Soft circular falloff
    float a = smoothstep(0.5, 0.1, r) * vAlpha;
    gl_FragColor = vec4(uColor, a);
  }
`;

interface PData {
  pos:          Float32Array;
  vel:          Float32Array;
  baseAlpha:    Float32Array;
  flickPhase:   Float32Array;
  flickSpeed:   Float32Array;
}

export const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Track cursor without React state
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouse       = useRef({ x: 0, y: 0 }); 
  const mouseVel    = useRef({ x: 0, y: 0 });
  
  const pdata     = useRef<PData | null>(null);

  // ── Build geometry + material (once) ────────────────────────
  const { geo, mat } = useMemo(() => {
    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const actualCount = isMobile ? Math.floor(COUNT * 0.5) : COUNT;

    const pos        = new Float32Array(actualCount * 3);
    const vel        = new Float32Array(actualCount * 3);
    const sizes      = new Float32Array(actualCount);
    const alphas     = new Float32Array(actualCount);
    const baseAlpha  = new Float32Array(actualCount);
    const flickPhase = new Float32Array(actualCount);
    const flickSpeed = new Float32Array(actualCount);

    for (let i = 0; i < actualCount; i++) {
      const layer  = Math.random();

      // Depth layer assignment
      const z = layer < 0.45
        ? -(6  + Math.random() * 6)   // far:  -12 → -6
        : layer < 0.80
        ? -(2  + Math.random() * 4)   // mid:  -6  → -2
        : -(0.2 + Math.random() * 1.8); // near: -2  → -0.2

      pos[i * 3 + 0] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = z;

      // Very slow drift
      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.007;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = 0;

      const depthN = Math.min(1, -z / 12);
      sizes[i] = 0.5 + (1 - depthN) * 2.8;

      const a = layer < 0.45
        ? Math.random() * 0.045
        : layer < 0.80
        ? Math.random() * 0.085
        : Math.random() * 0.13;
      baseAlpha[i]   = a;
      alphas[i]      = a;

      flickPhase[i]  = Math.random() * Math.PI * 2;
      flickSpeed[i]  = 0.08 + Math.random() * 0.35;
    }

    pdata.current = { pos, vel, baseAlpha, flickPhase, flickSpeed };

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos,   3));
    g.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1));
    g.setAttribute('aAlpha',   new THREE.BufferAttribute(alphas, 1));

    const m = new THREE.ShaderMaterial({
      uniforms:     { 
        uColor: { value: new THREE.Color('#00d4ff') },
        uPhase: { value: 0 },
        uScroll: { value: 0 },
        uSection: { value: 0 },
        uWarp: { value: 0.5 },
        uSpeed: { value: 1.0 },
      },
      vertexShader:   VERT,
      fragmentShader: FRAG,
      transparent:    true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending,
    });

    return { geo: g, mat: m };
  }, []);

  // ── Mouse & Theme listeners ───────────────────────────────────────────
  const targetColor = useRef(new THREE.Color('#00d4ff'));
  const targetWarp = useRef(0.5);
  const targetSpeed = useRef(1.0);
  const phase = useRef(0.0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseTarget.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    
    const onTheme = (e: any) => {
      const theme = e.detail;
      if (theme === 'organic') {
        targetColor.current.set('#00ff88');
        targetWarp.current = 1.8;
      } else if (theme === 'structured') {
        targetColor.current.set('#7b2fff');
        targetWarp.current = 0.1;
      } else if (theme === 'empty') {
        targetColor.current.set('#4a5060');
        targetWarp.current = 0.02;
      } else {
        targetColor.current.set('#00d4ff');
        targetWarp.current = 0.5;
      }
    };
    
    const onAccelerate = (e: any) => {
      if (e.detail) {
        targetSpeed.current = 8.0;
        targetWarp.current = 4.0;
      } else {
        targetSpeed.current = 1.0;
        targetWarp.current = 0.5;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('project-theme', onTheme);
    window.addEventListener('accelerate', onAccelerate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('project-theme', onTheme);
      window.removeEventListener('accelerate', onAccelerate);
    };
  }, []);

  // ── Per-frame update ─────────────────────────────────────────
  useFrame(({ clock }, delta) => {
    // Pause rendering if tab is hidden (performance)
    if (document.visibilityState === 'hidden') return;
    
    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeScale = reducedMotion ? 0.3 : 1.0;
    
    if (!pdata.current) return;
    const { pos, vel, baseAlpha, flickPhase, flickSpeed } = pdata.current;
    const posAttr   = geo.attributes.position as THREE.BufferAttribute;
    const alphaAttr = geo.attributes.aAlpha as THREE.BufferAttribute;
    const t = clock.getElapsedTime() * timeScale;
    
    // Smoothly interpolate theme uniforms
    mat.uniforms.uColor.value.lerp(targetColor.current, delta * 1.5);
    mat.uniforms.uWarp.value += (targetWarp.current - mat.uniforms.uWarp.value) * delta * 1.5;
    mat.uniforms.uSpeed.value += (targetSpeed.current - mat.uniforms.uSpeed.value) * delta * 3.0;

    // Integrate phase manually to avoid jump
    phase.current += delta * timeScale * mat.uniforms.uSpeed.value;
    
    mat.uniforms.uPhase.value = phase.current;
    mat.uniforms.uScroll.value = cameraStore.progress;
    mat.uniforms.uSection.value = cameraStore.stateIndex;
    
    // Cursor inertia physics
    const dx = mouseTarget.current.x - mouse.current.x;
    const dy = mouseTarget.current.y - mouse.current.y;
    mouseVel.current.x += dx * delta * 5.0;
    mouseVel.current.y += dy * delta * 5.0;
    mouseVel.current.x *= 0.85; // friction
    mouseVel.current.y *= 0.85;
    mouse.current.x += mouseVel.current.x * delta * 15.0;
    mouse.current.y += mouseVel.current.y * delta * 15.0;

    // Field evolution intensity based on section (0 to 7)
    // About (1) -> more movement, Projects (2) -> structured, etc.
    // We keep it subtle as requested.
    const sectionWarp = 1.0 + Math.sin(cameraStore.stateIndex * 0.8) * 0.3;

    for (let i = 0; i < posAttr.count; i++) {
      const ix = i * 3;

      // ── Drift ──
      pos[ix]     += vel[ix]     * delta * timeScale * sectionWarp;
      pos[ix + 1] += vel[ix + 1] * delta * timeScale * sectionWarp;

      // Mouse displacement (inertia pushes particles slightly)
      // distance from cursor to particle (projected to 2D)
      const px = pos[ix] / 10;
      const py = pos[ix + 1] / 6;
      const dist = Math.sqrt((px - mouse.current.x)*(px - mouse.current.x) + (py - mouse.current.y)*(py - mouse.current.y));
      if (dist < 0.5 && !reducedMotion) {
        const force = (0.5 - dist) * 0.05;
        pos[ix]     += mouseVel.current.x * force;
        pos[ix + 1] += mouseVel.current.y * force;
      }

      // ── Soft boundary wrap ──
      if (pos[ix]     >  14) pos[ix]     = -14;
      else if (pos[ix]     < -14) pos[ix]     =  14;
      if (pos[ix + 1] >   8) pos[ix + 1] =  -8;
      else if (pos[ix + 1] <  -8) pos[ix + 1] =   8;

      // ── Occasional brightening ──
      const flicker = Math.sin(t * flickSpeed[i] + flickPhase[i]);
      const flash   = Math.pow(Math.max(0, flicker), 10);
      (alphaAttr.array as Float32Array)[i] =
        baseAlpha[i] * (0.55 + flash * 3.5);
    }

    posAttr.needsUpdate   = true;
    alphaAttr.needsUpdate = true;

    // ── Mouse parallax on the whole group ──
    if (pointsRef.current && !reducedMotion) {
      const tx = mouse.current.x * 0.3;
      const ty = mouse.current.y * 0.2;
      pointsRef.current.position.x += (tx - pointsRef.current.position.x) * delta * 2.0;
      pointsRef.current.position.y += (ty - pointsRef.current.position.y) * delta * 2.0;
    }
  });

  return <points ref={pointsRef} geometry={geo} material={mat} />;
};
