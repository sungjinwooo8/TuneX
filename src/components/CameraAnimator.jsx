import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { useCarStore } from '../store';

export default function CameraAnimator({ controls }) {
  const { camera } = useThree();
  const activeCategory = useCarStore(state => state.activeCategory);
  const cameraPreset = useCarStore(state => state.cameraPreset);

  useEffect(() => {
    if (!controls.current) return;

    let targetPos = { x: 5, y: 1.5, z: 6 };
    let lookTarget = { x: 1.2, y: 0.5, z: 0 }; // Right of car to put car on left
    
    // Map categories to camera angles if no hard preset is set
    if (!cameraPreset || cameraPreset === 'Orbit') {
       controls.current.autoRotate = true;
       controls.current.autoRotateSpeed = 0.4; // Premium slow rotation

       switch (activeCategory) {
         case 'wheels':
           targetPos = { x: 3, y: 0.5, z: 4.5 };
           lookTarget = { x: 0.8, y: 0.3, z: 1.8 }; // Front-left wheel focus
           controls.current.autoRotate = false;
           break;
         case 'engine':
           targetPos = { x: -4, y: 2.5, z: -5.5 };
           lookTarget = { x: 0, y: 0.8, z: -1 }; // Rear focus
           break;
         case 'aero':
           targetPos = { x: 4.5, y: 1.8, z: -5 };
           lookTarget = { x: 1, y: 0.5, z: -1.5 };
           break;
         case 'interior':
           targetPos = { x: -2.5, y: 1.8, z: 2.5 };
           lookTarget = { x: 0, y: 0.8, z: 0.5 };
           controls.current.autoRotate = false;
           break;
         case 'weight':
           targetPos = { x: -4, y: 3, z: 4 };
           lookTarget = { x: 0, y: 0.5, z: 0 };
           break;
         case 'paint':
         default:
           targetPos = { x: 5.5, y: 1.6, z: 6.5 };
           lookTarget = { x: 1.5, y: 0.4, z: 0 };
           break;
       }
    } else {
       controls.current.autoRotate = false;
       switch (cameraPreset) {
         case 'Front':
           targetPos = { x: 0, y: 1.2, z: 7 };
           lookTarget = { x: 0, y: 0.5, z: 0 };
           break;
         case 'Side':
           targetPos = { x: 7, y: 1.2, z: 0 };
           lookTarget = { x: 0, y: 0.5, z: 0 };
           break;
         case 'Top':
           targetPos = { x: 0.1, y: 8, z: 0 };
           lookTarget = { x: 0, y: 0, z: 0 };
           break;
       }
    }

    // Animate Position
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 3,
      ease: 'power3.inOut',
      onUpdate: () => controls.current.update()
    });
    
    // Animate Target
    gsap.to(controls.current.target, {
      x: lookTarget.x,
      y: lookTarget.y,
      z: lookTarget.z,
      duration: 3,
      ease: 'power3.inOut'
    });
    
  }, [activeCategory, cameraPreset, camera, controls]);

  // Subtle breathing idle animation using stable timestamp
  useFrame((state) => {
    if (!controls.current) return;
    // Use internal state.clock gracefully or fallback to performance
    const t = (state.clock ? state.clock.getElapsedTime() : performance.now() / 1000);
    
    // Inject tiny bobbing motion to simulate breathing
    camera.position.y += Math.sin(t * 1.5) * 0.001;
    camera.position.x += Math.cos(t * 1.2) * 0.001;
  });

  return null;
}
