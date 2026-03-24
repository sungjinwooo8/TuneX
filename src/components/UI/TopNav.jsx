import React from 'react';
import { useCarStore } from '../../store';

export default function TopNav() {
  // Subscribing to properties so the TopNav price updates reactively
  useCarStore(state => state.selectedEngine);
  useCarStore(state => state.selectedWheels);
  useCarStore(state => state.selectedAero);
  useCarStore(state => state.selectedWeightSetup);
  
  const stats = useCarStore.getState().getComputedStats();

  return (
    <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start pointer-events-none z-50">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.25em] text-white uppercase drop-shadow-2xl">Bugatti</h1>
        <p className="text-white/60 tracking-[0.3em] text-[10px] uppercase font-medium ml-1">Veyron Super Sport</p>
      </div>
      
      <div className="flex flex-col items-end gap-1 pointer-events-auto">
        <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase font-bold">Total Configuration</span>
        <span className="text-2xl md:text-3xl font-light text-white tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          {stats.price}
        </span>
      </div>
    </div>
  );
}
