/**
 * Camera store — 8 states (one per section), updated by GSAP ScrollTrigger.
 * Read by CameraRig in useFrame via lerp.
 *
 * Sections:
 *   0: Hero        — full system overview, slightly elevated
 *   1: About       — zoom toward hub, AI/ML node accent
 *   2: Projects    — angle toward cybersecurity node
 *   3: Exploring   — pull back, full network visible
 *   4: Experiments — closer, see individual signals
 *   5: Skills      — level medium shot
 *   6: Journey     — slight elevation, wider, calmer
 *   7: Contact     — full pullback, complete system
 */
import { Vector3 } from 'three';

export interface CameraState {
  position: [number, number, number];
  target:   [number, number, number];
  label:    string;
}

export const CAMERA_STATES: CameraState[] = [
  // 0 — Hero: full system, slight elevation
  { position: [0,     0.5,  7.8], target: [0,  0,    0],   label: 'HERO' },
  // 1 — About: gentle zoom, focus on hub area
  { position: [0.4,   1.2,  5.8], target: [0,  0.6,  0],   label: 'ABOUT' },
  // 2 — Projects: angle toward cybersecurity node
  { position: [-1.6,  0.3,  5.2], target: [-2, 0,    0],   label: 'PROJECTS' },
  // 3 — Exploring: pull back, full network
  { position: [0,     0.4, 10.2], target: [0,  0,    0],   label: 'EXPLORING' },
  // 4 — Experiments: closer, focus on backend region
  { position: [0.6,  -1.0,  5.6], target: [0.2, -1.8, 0], label: 'EXPERIMENTS' },
  // 5 — Skills: level, medium distance
  { position: [0,     0.2,  6.8], target: [0,  0,    0],   label: 'SKILLS' },
  // 6 — Journey: elevated wider shot, slight tilt
  { position: [-0.4,  1.2,  7.4], target: [0,  0.2,  0],  label: 'JOURNEY' },
  // 7 — Contact: full pullback, entire system visible
  { position: [0,     0.8, 11.0], target: [0,  0,    0],   label: 'CONTACT' },
];

export const cameraStore = {
  progress:       0,
  stateIndex:     0,
  targetPosition: new Vector3(0, 0.5, 7.8),
  targetLookAt:   new Vector3(0, 0, 0),
  activeNode:     null as string | null,
  hoveredNode:    null as string | null,
};

// Maps camera state to which node should be highlighted
const STATE_NODE_MAP: Record<number, string | null> = {
  0: null,
  1: 'AIML',
  2: 'CYBER',
  3: null,
  4: 'BACKEND',
  5: null,
  6: null,
  7: null,
};

export function setCameraState(index: number, t: number, p: number = 0) {
  const clamped = Math.max(0, Math.min(CAMERA_STATES.length - 2, index));
  const next    = clamped + 1;
  const from    = CAMERA_STATES[clamped];
  const to      = CAMERA_STATES[next];

  // Smooth step for more cinematic easing
  const st = t * t * (3 - 2 * t);

  cameraStore.stateIndex = clamped;
  cameraStore.progress = p;
  
  cameraStore.targetPosition.set(
    from.position[0] + (to.position[0] - from.position[0]) * st,
    from.position[1] + (to.position[1] - from.position[1]) * st,
    from.position[2] + (to.position[2] - from.position[2]) * st,
  );
  cameraStore.targetLookAt.set(
    from.target[0] + (to.target[0] - from.target[0]) * st,
    from.target[1] + (to.target[1] - from.target[1]) * st,
    from.target[2] + (to.target[2] - from.target[2]) * st,
  );

  cameraStore.activeNode = STATE_NODE_MAP[clamped] ?? null;
}
