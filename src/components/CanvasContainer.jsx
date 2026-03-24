import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Loader } from '@react-three/drei';
import { EffectComposer, DepthOfField, Vignette, Noise } from '@react-three/postprocessing';
import CarModel from './CarModel';
import CameraAnimator from './CameraAnimator';
import { useCarStore } from '../store';

export default function CanvasContainer() {
  const controlsRef = React.useRef();
  const activeCategory = useCarStore(state => state.activeCategory);
  
  const isEngine = activeCategory === 'engine';

  return (
    <>
      <Canvas
        camera={{ position: [5, 1.5, 6], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <color attach="background" args={['#030303']} />
        
        <Suspense fallback={null}>
          <CarModel />
          
          <Environment preset="studio" environmentIntensity={isEngine ? 0.4 : 1.2} />
          
          <ContactShadows 
            resolution={1024} 
            scale={12} 
            blur={3} 
            opacity={0.7} 
            far={10} 
            color="#000000" 
          />
        </Suspense>

        <OrbitControls 
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <CameraAnimator controls={controlsRef} />
        
        <EffectComposer disableNormalPass>
          <Noise opacity={0.015} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
      <Loader 
        containerStyles={{ background: '#0a0a0a' }} 
        innerStyles={{ background: '#fff', width: '300px' }} 
        barStyles={{ background: '#d4af37' }} 
        dataInterpolation={(p) => `Loading Excellence ${p.toFixed(0)}%`} 
      />
    </>
  );
}
