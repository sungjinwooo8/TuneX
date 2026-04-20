import React from 'react';
import { useCarStore } from '../../store';
import { Palette, Disc, Wind, Zap, Settings, Gauge, Bot } from 'lucide-react';

const categories = [
  { id: 'paint', label: 'Paint', icon: Palette },
  { id: 'wheels', label: 'Wheels', icon: Disc },
  { id: 'aero', label: 'Aero', icon: Wind },
  { id: 'engine', label: 'Power', icon: Zap },
  { id: 'interior', label: 'Interior', icon: Settings },
  { id: 'weight', label: 'Weight', icon: Gauge },
  { id: 'ai', label: 'AI Advisor', icon: Bot },
];

export default function BottomDock() {
  const activeCategory = useCarStore(state => state.activeCategory);
  const setActiveCategory = useCarStore(state => state.setActiveCategory);

  return (
    <div className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none z-50">
      <div className="flex items-center gap-2 p-3 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full pointer-events-auto shadow-2xl">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const Icon = cat.icon;
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative flex flex-col items-center justify-center w-20 h-20 rounded-full transition-all duration-500 group overflow-hidden ${
                isActive ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-50" />
              )}
              
              <Icon 
                size={22} 
                className={`mb-1 transition-all duration-500 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-110' : 'text-white/50 group-hover:text-white/80'}`} 
              />
              <span className={`text-[9px] font-semibold tracking-[0.15em] uppercase transition-all duration-500 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
