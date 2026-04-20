import React from 'react';
import { useCarStore } from '../../store';
import { carModelsInfo } from '../../data/models';

export default function Sidebar() {
  const selectedModel = useCarStore(state => state.selectedModel) || 'bugatti';
  const setSelectedModel = useCarStore(state => state.setSelectedModel);

  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 p-8 pointer-events-auto z-40">
      {Object.values(carModelsInfo).map((car) => {
        const isActive = selectedModel === car.id;
        return (
          <button
            key={car.id}
            onClick={() => setSelectedModel(car.id)}
            className={`group relative flex flex-col self-start items-start px-6 py-4 transition-all duration-500 ease-out border-l-2
              ${isActive 
                ? 'border-white bg-white/5 scale-105' 
                : 'border-white/20 hover:border-white/50 hover:bg-white/5 hover:translate-x-2'
              }
            `}
          >
            <span className={`text-[10px] tracking-[0.2em] uppercase font-bold transition-colors duration-500
              ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}
            `}>
              {car.brand}
            </span>
            <span className={`text-sm md:text-md font-light tracking-wider transition-colors duration-500 whitespace-nowrap
              ${isActive ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'text-white/60 group-hover:text-white/90'}
            `}>
              {car.name}
            </span>
            
            {/* Active Glow Effect */}
            {isActive && (
              <div className="absolute inset-0 left-[-2px] w-[2px] bg-white blur-[2px] pointer-events-none" />
            )}
          </button>
        );
      })}
    </div>
  );
}
