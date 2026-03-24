import React from 'react';
import { useCarStore } from '../../store';
import { modificationsData } from '../../data/modifications';

const colorsExternal = [
  { name: 'Obsidian Black', value: '#050505' },
  { name: 'Satin Silver', value: '#d1d5db' },
  { name: 'Rosso Corsa', value: '#991b1b' },
  { name: 'Liquid Bronze', value: '#785f3b' },
];

const colorsInternal = [
  { name: 'Saddle Tan', value: '#7c2d12' },
  { name: 'Carbon Black', value: '#18181b' },
  { name: 'Ivory White', value: '#f4f4f5' },
  { name: 'Bordeaux', value: '#7f1d1d' },
];

export default function ContextPanel() {
  const activeCategory = useCarStore(state => state.activeCategory);
  
  // Reactive hooks for visual updates inside the panel
  useCarStore(state => state.selectedEngine);
  useCarStore(state => state.selectedWheels);
  useCarStore(state => state.selectedAero);
  useCarStore(state => state.selectedWeightSetup);
  
  // Live stats from engine
  const stats = useCarStore.getState().getComputedStats();
  
  // State specific pickers
  const bodyColor = useCarStore(state => state.bodyColor);
  const setBodyColor = useCarStore(state => state.setBodyColor);
  
  const interiorColor = useCarStore(state => state.interiorColor);
  const setInteriorColor = useCarStore(state => state.setInteriorColor);

  const selectedWheels = useCarStore(state => state.selectedWheels);
  const setSelectedWheels = useCarStore(state => state.setSelectedWheels);

  const selectedAero = useCarStore(state => state.selectedAero);
  const setSelectedAero = useCarStore(state => state.setSelectedAero);

  const selectedEngine = useCarStore(state => state.selectedEngine);
  const setSelectedEngine = useCarStore(state => state.setSelectedEngine);

  const selectedWeight = useCarStore(state => state.selectedWeightSetup);
  const setSelectedWeight = useCarStore(state => state.setSelectedWeightSetup);

  // Modular Renders
  let title = 'Tuning Context';
  let ContentRender = null;

  switch (activeCategory) {
    case 'paint':
      title = 'Exterior Finish';
      ContentRender = <ColorPicker colors={colorsExternal} selected={bodyColor} onSelect={setBodyColor} />;
      break;
    case 'interior':
      title = 'Upholstery & Trim';
      ContentRender = <ColorPicker colors={colorsInternal} selected={interiorColor} onSelect={setInteriorColor} />;
      break;
    case 'wheels':
      title = 'Alloy Engineering';
      ContentRender = <HorizontalCards items={modificationsData.wheels} selected={selectedWheels} onSelect={setSelectedWheels} />;
      break;
    case 'aero':
      title = 'Active Aerodynamics';
      ContentRender = <HorizontalCards items={modificationsData.aero} selected={selectedAero} onSelect={setSelectedAero} />;
      break;
    case 'engine':
      title = 'Heart & Soul';
      ContentRender = <VerticalCards items={modificationsData.engine} selected={selectedEngine} onSelect={setSelectedEngine} />;
      break;
    case 'weight':
      title = 'Chassis Diet';
      ContentRender = <VerticalCards items={modificationsData.weight} selected={selectedWeight} onSelect={setSelectedWeight} />;
      break;
  }

  return (
    <div className="absolute top-0 right-0 h-full w-[420px] bg-gradient-to-l from-black/95 to-transparent pointer-events-none z-40 flex flex-col justify-center">
      <div className="mr-12 ml-6 p-8 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-2xl shadow-2xl pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform">
        
        {/* Module Title */}
        <h2 className="text-sm font-extralight tracking-[0.3em] uppercase text-white/80 mb-6 drop-shadow-md">
          {title}
        </h2>
        
        {/* Dynamic Controls Region */}
        <div className="min-h-[220px]">
          {ContentRender}
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-10" />

        {/* Live Segmented Performance Dashboard */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-5 font-bold">Telemetry</h3>
          <SegmentedGauge label="Velocity (Top Speed)" percent={stats.topSpeedPercent} value={`${stats.topSpeedValue} mph`} />
          <SegmentedGauge label="0-60 Sprint" percent={stats.zeroToSixtyPercent} value={`${stats.zeroToSixtyValue}s`} />
          <SegmentedGauge label="Kinetic Thrust" percent={stats.accelerationPercent} value={`${stats.accelerationValue}`} />
          <SegmentedGauge label="Mechanical Grip" percent={stats.gripPercent} value={`${stats.gripValue}`} />
        </div>
        
      </div>
    </div>
  );
}

// Subcomponents

const ColorPicker = ({ colors, selected, onSelect }) => (
  <div className="grid grid-cols-4 gap-4 mt-6">
    {colors.map(c => (
      <button 
        key={c.name}
        onClick={() => onSelect(c.value)}
        title={c.name}
        className={`w-12 h-12 rounded-full transition-all duration-500 relative group
          ${selected === c.value ? 'scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)] ring-[1.5px] ring-white/60 ring-offset-4 ring-offset-black/90' : 'border border-white/20 hover:scale-105'}
        `}
        style={{ backgroundColor: c.value }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none opacity-50" />
      </button>
    ))}
  </div>
);

const HorizontalCards = ({ items, selected, onSelect }) => (
  <div className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-4 mt-4 -mx-2 px-2">
    {items.map(item => (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        className={`shrink-0 w-[140px] aspect-[4/5] rounded-xl flex flex-col justify-end p-4 snap-center transition-all duration-500 overflow-hidden relative group border
          ${selected === item.id ? 'border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-white/50' : 'border-white/10 hover:border-white/30 bg-white/5'}
        `}
      >
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.15] opacity-30 mix-blend-luminosity" style={{ backgroundImage: `url(${item.image})` }} />
        {selected === item.id && <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent mix-blend-overlay" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        
        <div className="relative z-10 text-left">
          <h4 className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-1 drop-shadow-md ${selected === item.id ? 'text-white' : 'text-white/60'}`}>{item.name}</h4>
          {item.price > 0 && <p className="text-[10px] text-white/50 tracking-wider">${item.price.toLocaleString()}</p>}
        </div>
      </button>
    ))}
  </div>
);

const VerticalCards = ({ items, selected, onSelect }) => (
  <div className="flex flex-col gap-3 mt-4">
    {items.map(item => (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        className={`w-full p-4 rounded-xl border text-left transition-all duration-500 relative overflow-hidden group flex justify-between items-center
          ${selected === item.id ? 'border-white/50 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)]' : 'border-white/10 hover:border-white/30 bg-white/5'}
        `}
      >
        <div className="relative z-10">
          <h4 className={`text-[11px] font-bold tracking-[0.15em] uppercase drop-shadow-md ${selected === item.id ? 'text-white' : 'text-white/60'}`}>{item.name}</h4>
          {item.hp > 0 && <p className="text-[10px] text-white/60 tracking-wider mt-1">+{item.hp} HP</p>}
          {item.weightImpact !== 0 && !item.hp && <p className="text-[10px] text-white/60 tracking-wider mt-1">{item.weightImpact > 0 ? '+' : ''}{item.weightImpact} KG</p>}
        </div>
        {selected === item.id && <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />}
      </button>
    ))}
  </div>
);

const SegmentedGauge = ({ label, percent, value }) => {
  const segments = 18;
  const activeSegments = Math.round((percent / 100) * segments);
  return (
    <div className="flex flex-col gap-[6px] w-full mb-5">
      <div className="flex justify-between items-end">
        <span className="text-[9px] font-semibold tracking-[0.2em] text-white/50 uppercase">{label}</span>
        <span className="text-[11px] font-light tracking-wider text-white drop-shadow-md">{value}</span>
      </div>
      <div className="flex gap-[3px] h-[6px]">
        {Array.from({ length: segments }).map((_, i) => (
          <div 
            key={i}
            className={`flex-1 rounded-[1px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
              i < activeSegments 
                ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]' 
                : 'bg-white/10'
            }`}
            style={{ transitionDelay: `${i * 15}ms` }}
          />
        ))}
      </div>
    </div>
  );
};
