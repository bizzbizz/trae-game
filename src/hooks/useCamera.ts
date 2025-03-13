import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface UseCameraProps {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

export const useCamera = ({ scene, camera, renderer }: UseCameraProps) => {
  useEffect(() => {
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Position camera
    camera.position.set(0, 50, 0);
    camera.lookAt(1, 0, 1);

    // Create camera parent for movement
    const cameraParent = new THREE.Object3D();
    scene.add(cameraParent);
    cameraParent.add(camera);
    cameraParent.position.set(0, 0, 0);

    return () => {
      controls.dispose();
    };
  }, [scene, camera, renderer]);
};