import React from 'react';
import { useCarStore } from '../../store';

export default function PriceDisplay() {
  useCarStore(state => state.selectedEngine);
  useCarStore(state => state.selectedWheels);
  useCarStore(state => state.selectedAero);
  useCarStore(state => state.selectedWeightSetup);
  
  const stats = useCarStore.getState().getComputedStats();
  
  let scoreColor = 'text-white';
  if (stats.totalScore < 40) scoreColor = 'text-red-500';
  else if (stats.totalScore < 70) scoreColor = 'text-yellow-500';
  else scoreColor = 'text-green-500';

  return (
    <div className="absolute bottom-0 left-0 p-8 md:p-12 flex flex-col gap-5 pointer-events-auto z-50">
      
      {/* Configuration Score */}
      <div className="flex flex-col gap-1 group">
        <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase font-bold group-hover:text-white/70 transition-colors">Total Configuration</span>
        <span className={`text-2xl md:text-3xl font-light tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500 ${scoreColor}`}>
          {stats.totalScore}
        </span>
      </div>

      {/* Build Total Cost */}
      <div className="flex flex-col gap-1 group relative">
        <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase font-bold group-hover:text-white/70 transition-colors">Total Cost</span>
        <span 
          key={stats.price}
          className="text-2xl md:text-3xl font-light text-gold-500 tracking-wider drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] animate-in fade-in zoom-in duration-300"
        >
          {stats.price}
        </span>
      </div>

    </div>
  );
}
