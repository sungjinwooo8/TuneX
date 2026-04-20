import React, { useState } from 'react';
import { Settings2, X } from 'lucide-react';
import { useCarStore } from '../../store';
import { cars } from '../../data/cars';

export default function ModificationsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('engine');

  const selectedEngine = useCarStore(state => state.selectedEngine);
  const selectedWheels = useCarStore(state => state.selectedWheels);
  const selectedAero = useCarStore(state => state.selectedAero);
  const selectedWeight = useCarStore(state => state.selectedWeightSetup);

  const setSelectedEngine = useCarStore(state => state.setSelectedEngine);
  const setSelectedWheels = useCarStore(state => state.setSelectedWheels);
  const setSelectedAero = useCarStore(state => state.setSelectedAero);
  const setSelectedWeight = useCarStore(state => state.setSelectedWeightSetup);

  const selectedModel = useCarStore(state => state.selectedModel);
  const currentCar = cars[selectedModel] || cars['bugatti'];

  const categories = [
    { id: 'engine', label: 'Engine', current: selectedEngine, setter: setSelectedEngine, data: currentCar.engines },
    { id: 'wheels', label: 'Wheels', current: selectedWheels, setter: setSelectedWheels, data: currentCar.wheels },
    { id: 'aero', label: 'Aerodynamics', current: selectedAero, setter: setSelectedAero, data: currentCar.aero },
    { id: 'weight', label: 'Weight Reduction', current: selectedWeight, setter: setSelectedWeight, data: currentCar.weight },
  ];

  const activeData = categories.find(c => c.id === activeCategory);

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`absolute right-12 top-24 pointer-events-auto flex items-center gap-3 px-6 py-3 bg-black/60 hover:bg-black/90 border border-white/10 hover:border-gold-500/50 backdrop-blur-md rounded-xl text-white font-medium tracking-widest uppercase transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none translate-x-10' : 'opacity-100 translate-x-0'}`}
      >
        <Settings2 size={18} className="text-gold-500" />
        Performance Tuning
      </button>

      {/* Drawer */}
      <div className={`absolute top-0 right-0 h-full w-[450px] bg-black/85 backdrop-blur-2xl border-l border-white/10 pointer-events-auto flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/10">
          <h2 className="text-xl font-light tracking-widest text-white uppercase">Modifications</h2>
          <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex px-8 pt-8 gap-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-[11px] font-semibold tracking-widest uppercase rounded-full whitespace-nowrap transition-all duration-300 ${activeCategory === cat.id ? 'bg-gold-500 text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/15 border border-white/5'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Options List */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-5 pb-32">
          {activeData.data.map((item) => (
            <button
              key={item.id}
              onClick={() => activeData.setter(item.id)}
              className={`p-6 rounded-2xl border text-left transition-all duration-500 relative overflow-hidden group ${
                activeData.current === item.id 
                  ? 'border-gold-500 bg-gradient-to-br from-gold-500/10 to-transparent shadow-[0_0_25px_rgba(212,175,55,0.1)]' 
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-5 relative z-10">
                <h3 className={`font-medium tracking-wider uppercase text-sm ${activeData.current === item.id ? 'text-gold-400' : 'text-white'}`}>{item.name}</h3>
                {activeData.current === item.id && <div className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_10px_#d4af37]" />}
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs relative z-10">
                {item.effect && Object.entries(item.effect).map(([key, val]) => val !== 0 && (
                  <div key={key} className="flex justify-between">
                     <span className="text-white/40 uppercase tracking-wider text-[10px]">{key}</span>
                     <span className={val > 0 ? "text-green-400 font-medium" : "text-red-400 font-medium"}>{val > 0 ? '+' : ''}{val}</span>
                  </div>
                ))}
              </div>
              
              {item.price > 0 && (
                <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
                   <span className="text-white/40 uppercase tracking-wider text-[10px] font-semibold">Upgrade Cost</span>
                   <span className="text-white font-light tracking-wide text-sm">+${item.price.toLocaleString()}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
