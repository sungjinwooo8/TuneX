import React from 'react';
import { useCarStore } from '../../store'; 
import { cars } from '../../data/cars';

export default function BottomPanel() {
  const selectedEngine = useCarStore(state => state.selectedEngine);
  const selectedWheels = useCarStore(state => state.selectedWheels);
  const selectedAero = useCarStore(state => state.selectedAero);
  const selectedWeightSetup = useCarStore(state => state.selectedWeightSetup);
  
  // Re-evaluates on render without subscribing to a new object instance directly
  const stats = useCarStore.getState().getComputedStats();
  
  const selectedModel = useCarStore(state => state.selectedModel);
  const currentCar = cars[selectedModel] || cars['bugatti'];
  const engineMod = currentCar.engines.find(e => e.id === selectedEngine) || currentCar.engines[0];

  return (
    <div className="pointer-events-auto absolute bottom-0 left-80 right-0 py-8 px-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-between transition-all duration-300">
      
      {/* Left Side: Car Info */}
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-light tracking-widest text-white uppercase transition-all duration-500">{currentCar.name}</h2>
        <p className="text-gold-500/80 tracking-wide font-medium transition-all duration-500">{engineMod.name}</p>
        <p className="text-white/50 text-[10px] font-semibold tracking-widest uppercase mt-2">Active Performance Config</p>
      </div>

      {/* Middle: Animated Stats Bars */}
      <div className="flex gap-10 items-end pb-2">
        <StatBar label="Top Speed" value={stats.topSpeedPercent} displayValue={`${stats.topSpeedValue}`} />
        <StatBar label="0-60 Time" value={stats.zeroToSixtyPercent} displayValue={`${stats.zeroToSixtyValue}`} />
        <StatBar label="Acceleration" value={stats.accelerationPercent} displayValue={`${stats.accelerationValue}`} />
        <StatBar label="Grip" value={stats.gripPercent} displayValue={`${stats.gripValue}`} />
      </div>

      {/* Right Side: Options/Price */}
      <div className="flex items-center gap-8">
        <div className="text-right flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">Total Price</span>
          <span className="text-2xl font-light tracking-wider text-gold-500 transition-all duration-500">{stats.price}</span>
        </div>
        
        <button className="px-8 py-4 bg-white text-black font-semibold tracking-widest uppercase text-sm hover:bg-gold-500 hover:text-white transition-all duration-300">
          Order Process
        </button>
      </div>

    </div>
  );
}

function StatBar({ label, value, displayValue }) {
  return (
    <div className="flex flex-col gap-3 w-32">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-semibold tracking-widest text-white/50 uppercase">{label}</span>
        <span className="text-[10px] font-medium text-white/90">{displayValue}</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
