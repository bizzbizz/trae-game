import React, { useEffect } from 'react';
import * as THREE from 'three';
import { parse } from 'yaml';

interface SceneProps {
  scene: THREE.Scene;
  debug: boolean;
}

interface Node {
  [key: string]: [number, number];
}

interface Polygon {
  [key: string]: string[];
}

export const Scene: React.FC<SceneProps> = ({ scene, debug }) => {
  useEffect(() => {
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(0, 100, 0);
    scene.add(directionalLight);

    // Add ground plane
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d5a27,  // Dark green color
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;  // Rotate to horizontal
    ground.position.y = -0.1;  // Slightly below houses to prevent z-fighting
    scene.add(ground);

    // Load and parse YAML files
    const loadMapData = async () => {
      try {
        const [nodesResponse, polygonsResponse] = await Promise.all([
          fetch('/map/nodes.yaml'),
          fetch('/map/polygons.yaml')
        ]);

        const nodesText = await nodesResponse.text();
        const polygonsText = await polygonsResponse.text();

        const nodesData = parse(nodesText) as { nodes: Node };
        const polygonsData = parse(polygonsText) as { polygons: Polygon };

        // Create houses
        Object.entries(polygonsData.polygons).forEach(([id, nodeIds]) => {
          if (id === 'properties') return; // Skip metadata

          const shape = new THREE.Shape();
          const nodes = nodeIds.map(nodeId => nodesData.nodes[nodeId]);

          // Create shape from nodes
          nodes.forEach(([x, z], index) => {
            if (index === 0) {
              shape.moveTo(x, z);
            } else {
              shape.lineTo(x, z);
            }
          });

          // Create extruded geometry for 3D houses
          const extrudeSettings = {
            depth: 10,
            bevelEnabled: false
          };
          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          const material = new THREE.MeshStandardMaterial({
            color: 0x808080,
            side: THREE.DoubleSide,
            wireframe: false,
            metalness: 0.1,
            roughness: 0.8
          });

          const house = new THREE.Mesh(geometry, material);
          house.rotation.x = -Math.PI / 2; // Rotate to horizontal plane
          house.userData.houseId = id; // Store house ID for raycasting
          scene.add(house);
        });
      } catch (error) {
        console.error('Error loading map data:', error);
      }
    };

    loadMapData();

    return () => {
      // Cleanup scene objects
      while(scene.children.length > 0) { 
        scene.remove(scene.children[0]);
      }
    };
  }, [scene, debug]);

  return null;
};