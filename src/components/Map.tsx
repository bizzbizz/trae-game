import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Scene } from './Scene';
import { useCamera } from '../hooks/useCamera';
import { useMovement } from '../hooks/useMovement';

interface MapProps {
  width?: number;
  height?: number;
  debug?: boolean;
}

interface TooltipState {
  visible: boolean;
  text: string;
  position: { x: number; y: number };
}

const Map: React.FC<MapProps> = ({ width = window.innerWidth, height = window.innerHeight, debug = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, text: '', position: { x: 0, y: 0 } });
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    renderer.setSize(width, height);
    renderer.setClearColor(0xf0f0f0); // Set background color
    containerRef.current.appendChild(renderer.domElement);

    // Initialize camera and movement controls
    useCamera({ scene, camera, renderer });
    useMovement({ cameraParent: scene });

    // Mouse move handler for raycasting
    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (debug) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
          const object = intersects[0].object;
          if (object.userData.houseId) {
            setTooltip({
              visible: true,
              text: `${object.userData.houseId}\n(${Math.round(object.position.x)}, ${Math.round(object.position.z)})`,
              position: { x: event.clientX + 10, y: event.clientY + 10 }
            });
            return;
          }
        }
        setTooltip({ visible: false, text: '', position: { x: 0, y: 0 } });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Click handler for houses
    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData.houseId) {
          setSelectedHouse(object.userData.houseId);
          const material = object.material as THREE.MeshBasicMaterial;
          material.color.setHex(Math.random() * 0xaaafff);
        }
      }
    };

    window.addEventListener('click', onClick);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [width, height]);

  return (
    <div ref={containerRef} style={{ width, height }}>
      <Scene scene={scene} debug={debug} />
      {tooltip.visible && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.position.x,
            top: tooltip.position.y,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '5px',
            borderRadius: '3px',
            fontSize: '12px',
            pointerEvents: 'none',
            whiteSpace: 'pre-line'
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default Map;
