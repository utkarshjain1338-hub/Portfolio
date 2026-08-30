import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { cameraStore } from '../../lib/cameraStore';

const LERP_SPEED = 2.0;       // slower = floatier camera movement
const MOUSE_PARALLAX = 0.04;  // subtle parallax


export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const tempPos = useRef(new Vector3());
  const tempLook = useRef(new Vector3());
  const currentLook = useRef(new Vector3(0, 0, 0));
  const reducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion.current) return;

    // Mouse parallax offset
    const mx = mouseRef.current.x * MOUSE_PARALLAX;
    const my = mouseRef.current.y * MOUSE_PARALLAX;

    // Lerp camera position toward target + mouse offset
    tempPos.current.set(
      cameraStore.targetPosition.x + mx,
      cameraStore.targetPosition.y + my,
      cameraStore.targetPosition.z
    );
    camera.position.lerp(tempPos.current, delta * LERP_SPEED);

    // Lerp lookAt
    tempLook.current.copy(cameraStore.targetLookAt);
    currentLook.current.lerp(tempLook.current, delta * LERP_SPEED);
    camera.lookAt(currentLook.current);
  });

  return null;
};
