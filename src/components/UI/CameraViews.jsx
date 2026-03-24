import React from 'react';
import { useCarStore } from '../../store';

export default function CameraViews() {
  const cameraPreset = useCarStore(state => state.cameraPreset);
  const setCameraPreset = useCarStore(state => state.setCameraPreset);

  return (
    <div className="absolute top-8 right-12 pointer-events-auto flex gap-4">
      {['Orbit', 'Front', 'Side', 'Top'].map((preset) => (
        <button
          key={preset}
          onClick={() => setCameraPreset(preset)}
          className={`px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors rounded ${
            cameraPreset === preset || (!cameraPreset && preset === 'Orbit')
              ? 'bg-gold-500 text-black'
              : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
          }`}
        >
          {preset}
        </button>
      ))}
    </div>
  );
}
