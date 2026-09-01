import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = [
  'BOOT',
  'WEBGL INITIALIZED',
  'ASSETS LOADED',
  'ENVIRONMENT READY',
  '100%'
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { progress, total } = useProgress(); // Real three.js loading progress
  const [stageIndex, setStageIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // We want the loader to take *at least* 1.2s to feel intentional,
    // but not stall artificially for 10 seconds.
    // We'll advance stages based on time, but wait for progress to reach 100 for the final stages.

    const minStageTime = 300; // ms per stage

    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage++;
      
      // If we're at the last real stage (before 100%), wait for Three.js progress ONLY if there are assets to load
      const isLoadingAssets = total > 0 && progress < 100;
      if (currentStage >= 3 && isLoadingAssets) {
        currentStage = 2; // hold at ASSETS LOADED
      }

      if (currentStage < STAGES.length) {
        setStageIndex(currentStage);
      }

      if (currentStage >= STAGES.length - 1 && !isLoadingAssets) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800); // Wait for fade out
        }, 400); // Hold on 100% briefly
      }
    }, minStageTime);

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#000',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
          }}
        >
          <div style={{ marginBottom: '40px', fontSize: '24px', fontWeight: 'bold' }}>UJ</div>
          <div style={{ opacity: 0.7, fontSize: '12px', marginBottom: '16px', height: '14px' }}>
            {STAGES[stageIndex]}
          </div>
          
          <div style={{ width: '200px', height: '1px', background: '#333', position: 'relative' }}>
            <motion.div 
              style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: '#fff' }}
              animate={{ width: `${(stageIndex / (STAGES.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
