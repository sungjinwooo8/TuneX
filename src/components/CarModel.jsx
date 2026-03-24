import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCarStore } from '../store';

export default function CarModel(props) {
  const { scene } = useGLTF('/models/car.glb');
  const groupRef = useRef();

  // Load User Tectures
  const textures = useTexture({
    wheel: '/textures/wheel.png',
    chrome: '/textures/Chrome_Main.png',
    brake: '/textures/brakedisc_s.png',
    t9: '/textures/9.png',
    t7: '/textures/7.png',
    t4: '/textures/4.png',
    t1: '/textures/1.png'
  });

  // GLTF models require flipY = false for proper UV mapping
  useEffect(() => {
    Object.values(textures).forEach(tex => {
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  }, [textures]);

  const setMeshes = useCarStore((state) => state.setMeshes);
  const setWheelMeshes = useCarStore((state) => state.setWheelMeshes);
  const setWheelGroups = useCarStore((state) => state.setWheelGroups);
  const setBodyMeshes = useCarStore((state) => state.setBodyMeshes);
  const setInteriorMeshes = useCarStore((state) => state.setInteriorMeshes);
  const setAeroMeshes = useCarStore((state) => state.setAeroMeshes);
  
  const wheelMeshes = useCarStore((state) => state.wheelMeshes);
  const wheelGroups = useCarStore((state) => state.wheelGroups);
  const isWheelRotating = useCarStore((state) => state.isWheelRotating);
  const wheelColor = useCarStore((state) => state.wheelColor);
  
  const bodyMeshes = useCarStore((state) => state.bodyMeshes);
  const bodyColor = useCarStore((state) => state.bodyColor);

  const interiorMeshes = useCarStore((state) => state.interiorMeshes);
  const interiorColor = useCarStore((state) => state.interiorColor);

  const aeroMeshes = useCarStore((state) => state.aeroMeshes);
  const selectedAero = useCarStore((state) => state.selectedAero);

  const targetBodyColor = useRef(new THREE.Color(bodyColor));
  const targetInteriorColor = useRef(new THREE.Color(interiorColor));

  useEffect(() => {
    targetBodyColor.current.set(bodyColor);
  }, [bodyColor]);

  useEffect(() => {
    targetInteriorColor.current.set(interiorColor);
  }, [interiorColor]);

  useEffect(() => {
    if (scene) {
      window.CAR_SCENE = scene;
      scene.position.set(0, 0, 0);
      
      const allMeshes = {};
      const wMeshes = {};
      const wGroups = {};
      const bMeshes = {};
      const iMeshes = {};
      const aMeshes = {};

      scene.traverse((child) => {
        const n = child.name.toLowerCase();

        // 1. Identify Top-Level Wheel Groups for Rotation
        const isSuspicious = n.includes('steer') || n.includes('arch') || n.includes('brake') || n.includes('suspension') || n.includes('caliper');
        const hasWheelName = n.includes('wheel') || n.includes('tire') || n.includes('rim');
        
        if (hasWheelName && !isSuspicious) {
           let parentIsWheelNode = false;
           let curr = child.parent;
           while (curr) {
             const pn = curr.name.toLowerCase();
             if ((pn.includes('wheel') || pn.includes('tire') || pn.includes('rim')) &&
                 !pn.includes('steer') && !pn.includes('arch') && !pn.includes('brake') && !pn.includes('suspension') && !pn.includes('caliper')) {
                parentIsWheelNode = true;
                break;
             }
             curr = curr.parent;
           }
           if (!parentIsWheelNode) {
              wGroups[child.uuid] = child;
           }
        }

        // 2. Identify Meshes for Coloring
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          allMeshes[child.uuid] = child;

          let isWheelMesh = false;
          let isBodyMesh = false;
          let isInteriorMesh = false;
          let isAeroMesh = false;
          
          let matName = '';
          if (child.material) {
             if (Array.isArray(child.material)) {
                matName = child.material.map(m => m.name ? m.name.toLowerCase() : '').join(' ');
             } else {
                matName = child.material.name ? child.material.name.toLowerCase() : '';
             }
             
             // Apply User Textures
             if (!Array.isArray(child.material)) {
                const n = child.name.toLowerCase();
                
                if (n.includes('rim') || matName.includes('rim') || matName.includes('wheel')) {
                   child.material.map = textures.wheel;
                } else if (n.includes('brake') || n.includes('disc') || matName.includes('brake')) {
                   child.material.map = textures.brake;
                } else if (matName.includes('chrome') || n.includes('chrome')) {
                   if (!child.material.map) child.material.map = textures.chrome;
                }
                
                // Specific Logo/Badge Restoration
                if (n.includes('logo') || n.includes('emblem') || n.includes('badge') || matName === '1' || matName.includes('_1')) {
                   child.material.map = textures.t1;
                   child.material.transparent = true;
                   child.material.opacity = 1;
                }
                
                child.material.needsUpdate = true;
             }
          }

          if (matName.includes('paint') || matName.includes('body') || matName.includes('exterior') || matName.includes('carpaint') || matName.includes('primary')) {
            isBodyMesh = true;
          }

          if (
            matName.includes('interior') || 
            matName.includes('leather') || 
            matName.includes('seat') ||
            matName.includes('upholstery') ||
            matName.includes('fabric') ||
            matName.includes('dash') ||
            matName.includes('carpet') ||
            matName.includes('stitching') ||
            matName.includes('steer') ||
            matName.includes('secondary')
          ) {
            isInteriorMesh = true;
          }

          let curr = child;
          while (curr) {
            const cn = curr.name.toLowerCase();
            
            if (cn.includes('wheel') || cn.includes('tire') || cn.includes('rim')) {
               isWheelMesh = true;
               if (cn.includes('steer')) {
                  isWheelMesh = false; // Steering wheel is NOT a tire.
               }
            }
            if (cn.includes('body') || cn.includes('shell') || cn.includes('exterior')) {
               isBodyMesh = true;
            }
            if (
              cn.includes('interior') || 
              cn.includes('seat') || 
              cn.includes('leather') || 
              cn.includes('upholstery') ||
              cn.includes('fabric') ||
              cn.includes('dash') ||
              cn.includes('carpet') ||
              cn.includes('steer')
            ) {
               isInteriorMesh = true;
            }
            if (cn.includes('arch') || cn.includes('brake') || cn.includes('suspension') || cn.includes('caliper')) {
              isWheelMesh = false;
            }
            if (cn.includes('spoiler') || cn.includes('wing') || cn.includes('diffuser') || cn.includes('splitter') || cn.includes('aero')) {
              isAeroMesh = true;
            }
            curr = curr.parent;
          }

          if (isWheelMesh) wMeshes[child.uuid] = child;
          if (isBodyMesh) bMeshes[child.uuid] = child;
          if (isInteriorMesh) iMeshes[child.uuid] = child;
          if (isAeroMesh) aMeshes[child.uuid] = child;
        }
      });

      setMeshes(allMeshes);
      setWheelMeshes(wMeshes);
      setWheelGroups(wGroups);
      setBodyMeshes(bMeshes);
      setInteriorMeshes(iMeshes);
      setAeroMeshes(aMeshes);
    }
  }, [scene, setMeshes, setWheelMeshes, setWheelGroups, setBodyMeshes, setInteriorMeshes, setAeroMeshes]);

  // Sync wheel colors dynamically
  useEffect(() => {
    Object.values(wheelMeshes).forEach(mesh => {
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => {
            if (mat.color) mat.color.set(wheelColor);
          });
        } else if (mesh.material.color) {
          mesh.material.color.set(wheelColor);
        }
      }
    });
  }, [wheelMeshes, wheelColor]);

  // Toggle Aero Visibility
  useEffect(() => {
    Object.values(aeroMeshes).forEach(mesh => {
      // If selectedAero is 'stock', hide aero add-ons. If 'sport' or 'track', show them.
      // (This assumes the base model spoiler is separated. For a perfect system we'd swap meshes)
      mesh.visible = selectedAero !== 'stock';
    });
  }, [aeroMeshes, selectedAero]);

  // Apply continuous rotation to wheel GROUPS and smooth body & interior color transitions
  useFrame((state, delta) => {
    if (isWheelRotating) {
      Object.values(wheelGroups).forEach(group => {
         group.rotation.x += delta * 5;
      });
    }

    Object.values(bodyMeshes).forEach(mesh => {
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => {
            if (mat.color) mat.color.lerp(targetBodyColor.current, delta * 3);
          });
        } else if (mesh.material.color) {
          mesh.material.color.lerp(targetBodyColor.current, delta * 3);
        }
      }
    });

    Object.values(interiorMeshes).forEach(mesh => {
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(mat => {
            if (mat.color) mat.color.lerp(targetInteriorColor.current, delta * 3);
          });
        } else if (mesh.material.color) {
          mesh.material.color.lerp(targetInteriorColor.current, delta * 3);
        }
      }
    });
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/car.glb');
