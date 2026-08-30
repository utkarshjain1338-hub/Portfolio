import { Vector3 } from 'three';

// Module-level store — updated by GSAP ScrollTrigger, read by CameraRig in useFrame
export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  label: string;
}

export const CAMERA_STATES: CameraState[] = [
  // 0: Hero — full system overview
  { position: [0, 0, 7], target: [0, 0, 0], label: 'HERO' },
  // 1: About — AI/ML node focus
  { position: [0.3, 2.2, 3.8], target: [0, 2.5, 0], label: 'AI/ML' },
  // 2: Projects — Cybersecurity node focus
  { position: [-2.5, 0.2, 3.8], target: [-2.5, 0, 0], label: 'CYBERSECURITY' },
  // 3: Exploring — Systems node focus
  { position: [2.5, 0.2, 3.8], target: [2.5, 0, 0], label: 'SYSTEMS' },
  // 4: Experiments — Backend node focus
  { position: [0.3, -2.2, 3.8], target: [0, -2.5, 0], label: 'BACKEND' },
  // 5: Final — back to full system
  { position: [0, 0, 9], target: [0, 0, 0], label: 'OVERVIEW' },
];

export const cameraStore = {
  progress: 0,          // 0 to 1 overall scroll progress
  stateIndex: 0,        // current camera state
  targetPosition: new Vector3(0, 0, 7),
  targetLookAt: new Vector3(0, 0, 0),
  activeNode: null as string | null,
  hoveredNode: null as string | null,
};

export function setCameraState(index: number, t: number) {
  const clamped = Math.max(0, Math.min(CAMERA_STATES.length - 1, index));
  const next = Math.min(clamped + 1, CAMERA_STATES.length - 1);
  const from = CAMERA_STATES[clamped];
  const to = CAMERA_STATES[next];

  cameraStore.stateIndex = clamped;
  cameraStore.targetPosition.set(
    from.position[0] + (to.position[0] - from.position[0]) * t,
    from.position[1] + (to.position[1] - from.position[1]) * t,
    from.position[2] + (to.position[2] - from.position[2]) * t,
  );
  cameraStore.targetLookAt.set(
    from.target[0] + (to.target[0] - from.target[0]) * t,
    from.target[1] + (to.target[1] - from.target[1]) * t,
    from.target[2] + (to.target[2] - from.target[2]) * t,
  );

  // Map state to active node
  const nodeMap: Record<number, string | null> = {
    0: null,
    1: 'AIML',
    2: 'CYBER',
    3: 'SYSTEMS',
    4: 'BACKEND',
    5: null,
  };
  cameraStore.activeNode = nodeMap[clamped] ?? null;
}
