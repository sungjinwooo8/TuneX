import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useCarStore } from '../store';

export default function CarModel(props) {
  const selectedModel = useCarStore((state) => state.selectedModel) || 'bugatti';
  const { scene } = useGLTF(`/models/${selectedModel}.glb`);
  const carbonWheelGltf = useGLTF('/models/carbon_fiber_bugatti.glb');
  const paxWheelGltf = useGLTF('/models/stock_mitchlin_pax.glb');
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
  const selectedWheels = useCarStore((state) => state.selectedWheels);

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

      // Auto-scale and center the models
      // 1. Reset scale and position just in case
      scene.scale.set(1, 1, 1);
      scene.position.set(0, 0, 0);
      scene.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      // Target max length for a car (typically around 4.5 to 5 units)
      const scale = 4.8 / maxDim;
      scene.scale.set(scale, scale, scale);
      scene.updateMatrixWorld(true);

      // Recompute bounding box after scaling
      const scaledBox = new THREE.Box3().setFromObject(scene);
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
      
      // Center X, Z, and align Y to ground (0)
      scene.position.x -= scaledCenter.x;
      scene.position.y -= scaledBox.min.y;
      scene.position.z -= scaledCenter.z;

      
      const allMeshes = {};
      const wMeshes = {};
      const wGroups = {};
      const bMeshes = {};
      const iMeshes = {};
      const aMeshes = {};

      scene.traverse((child) => {
        const n = child.name.toLowerCase();

        // 1. Identify Top-Level Wheel Groups for Rotation
        const isSuspicious = n.includes('steer') || n.includes('arch') || n.includes('brake') || n.includes('suspension') || n.includes('caliper') || n.includes('wheelhouse');
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
          let isTireMesh = false;
          
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

          if (matName.includes('paint') || matName.includes('body') || matName.includes('exterior') || matName.includes('carpaint') || matName.includes('primary') || matName.includes('secondary')) {
            isBodyMesh = true;
          }
          if (matName.includes('tire') || matName.includes('tyre') || matName.includes('rubber') || matName.includes('tread')) {
            isTireMesh = true;
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
            matName.includes('steer')
          ) {
            isInteriorMesh = true;
          }

          let curr = child;
          while (curr) {
            const cn = curr.name.toLowerCase();
            
            if (cn.includes('wheel') || cn.includes('rim')) {
               isWheelMesh = true;
               if (cn.includes('steer')) {
                  isWheelMesh = false; // Steering wheel is NOT a tire.
               }
            }
            if (cn.includes('tire') || cn.includes('tyre') || cn.includes('rubber') || cn.includes('tread')) {
               isTireMesh = true;
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

          // Check mesh's exact name for body since parent inheritance is too broad
          const exactName = child.name.toLowerCase();
          if (exactName.includes('body') || exactName.includes('shell') || exactName.includes('exterior')) {
             isBodyMesh = true;
          }
          
          // Enforce mutual exclusivity to prevent parts from getting dual colors!
          if (isTireMesh) {
             isWheelMesh = false;
             isBodyMesh = false;
             isInteriorMesh = false;
          } else if (isWheelMesh) {
             isBodyMesh = false;
             isInteriorMesh = false;
          } else if (isBodyMesh) {
             isInteriorMesh = false;
          }

          const enhanceMaterial = (mesh, type) => {
            // Clone materials so shared atlases don't bleed across categories
            if (!Array.isArray(mesh.material)) {
               mesh.material = mesh.material.clone();
            } else {
               mesh.material = mesh.material.map(m => m.clone());
            }

            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach(m => {
               if (type === 'body') {
                  m.metalness = 0.6;
                  m.roughness = 0.25;
                  m.envMapIntensity = 0.8;
               } else if (type === 'interior') {
                  m.metalness = 0.05;
                  m.roughness = 0.8;
                  m.envMapIntensity = 0.3;
               } else if (type === 'wheel') {
                  m.metalness = 0.8;
                  m.roughness = 0.3;
                  m.envMapIntensity = 1.0;
               } else if (type === 'tire') {
                  if (m.color) m.color.set('#0a0a0a');
                  m.metalness = 0.0;
                  m.roughness = 0.95;
                  m.envMapIntensity = 0.05;
               }
               m.needsUpdate = true;
            });
          };

          // Apply categories
          if (isTireMesh) {
             enhanceMaterial(child, 'tire');
          } else if (isWheelMesh) {
             wMeshes[child.uuid] = child;
             enhanceMaterial(child, 'wheel');
          } else if (isBodyMesh) {
             bMeshes[child.uuid] = child;
             enhanceMaterial(child, 'body');
          } else if (isInteriorMesh) {
             iMeshes[child.uuid] = child;
             enhanceMaterial(child, 'interior');
          }

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
            if (mat.color && !mesh.userData.isTire) mat.color.set(wheelColor);
          });
        } else if (mesh.material.color && !mesh.userData.isTire) {
          mesh.material.color.set(wheelColor);
        }
      }
    });

    // Also update any custom wheels injected
    Object.values(wheelGroups).forEach(group => {
      group.traverse(child => {
        if (child.isMesh && child.userData.isCustom) {
          let matName = '';
          if (child.material && !Array.isArray(child.material)) matName = child.material.name ? child.material.name.toLowerCase() : '';
          
          if (!matName.includes('tire') && !matName.includes('rubber') && !matName.includes('tread')) {
             if (child.material && child.material.color) {
                child.material.color.set(wheelColor);
             }
          }
        }
      });
    });

  }, [wheelMeshes, wheelGroups, wheelColor]);

  // Dynamic Custom Wheel Injection (Bugatti and Mercedes Specific)
  useEffect(() => {
    if (!scene) return;

    let targetWheelScene = null;
    if (selectedModel === 'bugatti') {
       // Swapped mapping as requested by user
       if (selectedWheels === 'wheels_0') targetWheelScene = carbonWheelGltf.scene; // Actual PAX
       if (selectedWheels === 'wheels_2') targetWheelScene = paxWheelGltf.scene;    // Actual Carbon
    } else if (selectedModel === 'mercedes') {
       // User requested to use standard tires ONLY for all Mercedes wheel options.
       // We leave targetWheelScene = null so original meshes remain visible.
    }

    const clones = [];

    Object.values(wheelGroups).forEach(group => {
       let originalMeshes = [];
       group.traverse(c => {
         if (c.isMesh && !c.userData.isCustom) {
           originalMeshes.push(c);
         }
       });

       if (targetWheelScene) {
         originalMeshes.forEach(m => m.visible = false);

         group.updateMatrixWorld(true);
         const groupWorldInv = group.matrixWorld.clone().invert();
         const boundsBox = new THREE.Box3();
         
         originalMeshes.forEach(m => {
            m.updateMatrixWorld(true);
            if (!m.geometry.boundingBox) m.geometry.computeBoundingBox();
            const box = m.geometry.boundingBox.clone();
            const relMatrix = m.matrixWorld.clone().premultiply(groupWorldInv);
            box.applyMatrix4(relMatrix);
            boundsBox.union(box);
         });
         
         let tCenter = boundsBox.getCenter(new THREE.Vector3());
         let tSize = boundsBox.getSize(new THREE.Vector3());
         let tDiam = Math.max(tSize.y, tSize.z);

         const clone = SkeletonUtils.clone(targetWheelScene);
         if (selectedModel === 'mercedes') {
             clone.rotation.y = Math.PI / 2;
             clone.updateMatrixWorld(true);
         }
         
         // Mark all meshes inside clone as custom
         clone.traverse(c => {
            if (c.isMesh) {
              c.userData.isCustom = true;
              c.castShadow = true;
              c.receiveShadow = true;
              
              if (!Array.isArray(c.material)) {
                c.material = c.material.clone();
                let mName = c.material.name ? c.material.name.toLowerCase() : '';
                if (mName.includes('tire') || mName.includes('rubber')) {
                   c.material.color.set('#0a0a0a');
                   c.material.metalness = 0.0;
                   c.material.roughness = 0.95;
                } else {
                   c.material.color.set(wheelColor);
                   c.material.metalness = 0.8;
                   c.material.roughness = 0.3;
                   c.material.envMapIntensity = 1.0;
                }
                c.material.needsUpdate = true;
              }
            }
         });

         const newBox = new THREE.Box3().setFromObject(clone);
         let newCenter = newBox.getCenter(new THREE.Vector3());
         let nSize = newBox.getSize(new THREE.Vector3());
         let nDiam = Math.max(nSize.y, nSize.z);

         if (nDiam > 0 && tDiam > 0) {
            let scaleFac = tDiam / nDiam;
            clone.scale.set(scaleFac, scaleFac, scaleFac);
            clone.position.copy(tCenter).sub(newCenter.clone().multiplyScalar(scaleFac));
         }

         group.add(clone);
         clones.push({ group, clone });

       } else {
         originalMeshes.forEach(m => m.visible = true);
         // Clean up existing custom clones if switching back to default
         let toRemove = [];
         group.traverse(c => {
            if (c.isMesh && c.userData.isCustom) toRemove.push(c);
         });
         toRemove.forEach(c => {
             if (c.parent) c.parent.remove(c);
         });
       }
    });

    return () => {
       // Cleanup clones when unmounting or changing wheels
       clones.forEach(({ group, clone }) => {
          group.remove(clone);
       });
    };

  }, [scene, selectedWheels, selectedModel, wheelGroups, paxWheelGltf, carbonWheelGltf]);

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

useGLTF.preload('/models/bugatti.glb');
useGLTF.preload('/models/ferrari.glb');
useGLTF.preload('/models/porsche.glb');
useGLTF.preload('/models/mercedes.glb');
useGLTF.preload('/models/mclaren.glb');
useGLTF.preload('/models/carbon_fiber_bugatti.glb');
useGLTF.preload('/models/stock_mitchlin_pax.glb');
