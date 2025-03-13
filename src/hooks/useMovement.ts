import { useEffect } from 'react';
import * as THREE from 'three';

interface UseMovementProps {
  cameraParent: THREE.Object3D;
}

export const useMovement = ({ cameraParent }: UseMovementProps) => {
  useEffect(() => {
    const moveSpeed = 1.0;
    const moveState = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      shift: false
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch(event.key.toLowerCase()) {
        case 'w': moveState.forward = true; break;
        case 's': moveState.backward = true; break;
        case 'a': moveState.left = true; break;
        case 'd': moveState.right = true; break;
        case 'shift': moveState.shift = true; break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch(event.key.toLowerCase()) {
        case 'w': moveState.forward = false; break;
        case 's': moveState.backward = false; break;
        case 'a': moveState.left = false; break;
        case 'd': moveState.right = false; break;
        case 'shift': moveState.shift = false; break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [cameraParent]);
};