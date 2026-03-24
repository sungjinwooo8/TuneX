import React, { useState } from 'react';
import { Settings, Palette, Disc, ArrowLeft, Zap } from 'lucide-react';
import { useCarStore } from '../../store';

const options = [
  { id: 'paint', label: 'Paint', icon: Palette },
  { id: 'wheels', label: 'Wheels', icon: Disc },
  { id: 'interior', label: 'Interior', icon: Settings },
  { id: 'engine', label: 'Engine', icon: Zap },
];

export default function LeftPanel() {
  const [activeTab, setActiveTab] = useState('engine');

  const isWheelRotating = useCarStore((state) => state.isWheelRotating);
  const setIsWheelRotating = useCarStore((state) => state.setIsWheelRotating);
  
  const wheelColor = useCarStore((state) => state.wheelColor);
  const setWheelColor = useCarStore((state) => state.setWheelColor);

  const bodyColor = useCarStore((state) => state.bodyColor);
  const setBodyColor = useCarStore((state) => state.setBodyColor);

  const interiorColor = useCarStore((state) => state.interiorColor);
  const setInteriorColor = useCarStore((state) => state.setInteriorColor);

  const engine = useCarStore((state) => state.engine);
  const setEngine = useCarStore((state) => state.setEngine);

  return (
    <div className="pointer-events-auto h-full w-80 bg-black/60 backdrop-blur-xl border-r border-white/10 flex flex-col pt-12">
      {/* Header */}
      <div className="px-8 pb-8 flex items-center gap-4">
        <button className="text-white/50 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-light tracking-widest text-white uppercase">Configure</h1>
      </div>

      {/* Navigation */}
      <div className="px-4 flex flex-col gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setActiveTab(opt.id)}
            className={`flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-300 ${
              activeTab === opt.id
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <opt.icon size={20} className={activeTab === opt.id ? 'text-gold-500' : ''} />
            <span className="font-medium tracking-wide">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 mt-8 px-8 flex flex-col gap-6">
        <h2 className="text-sm font-semibold tracking-widest text-white/40 uppercase">Options</h2>
        
        {activeTab === 'paint' ? (
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-semibold tracking-widest text-white/30 uppercase">Exterior Paint</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: 'Obsidian', value: '#1c1c1c' },
                { name: 'Crimson', value: '#7f1d1d' },
                { name: 'Sapphire', value: '#1e3a8a' },
                { name: 'Pearl', value: '#e2e8f0' }
              ].map(color => (
                <button 
                  key={color.name}
                  onClick={() => setBodyColor(color.value)}
                  className={`w-10 h-10 rounded-full transition-all ${bodyColor === color.value ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-black/60 scale-110' : 'border border-white/20 hover:border-white'}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        ) : activeTab === 'wheels' ? (
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-semibold tracking-widest text-white/30 uppercase">Animation</h3>
            <button 
              onClick={() => setIsWheelRotating(!isWheelRotating)}
              className={`py-3 px-4 rounded-lg font-medium tracking-wider uppercase transition-all duration-300 text-sm ${isWheelRotating ? 'bg-gold-500 text-dark-900 shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {isWheelRotating ? 'Stop Rotation' : 'Rotate Wheels'}
            </button>

            <h3 className="text-xs font-semibold tracking-widest text-white/30 uppercase mt-4">Alloy Color</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: 'Silver', value: '#e5e7eb' },
                { name: 'Carbon', value: '#18181b' },
                { name: 'Gold', value: '#d4af37' },
                { name: 'Bronze', value: '#b08d57' }
              ].map(color => (
                <button 
                  key={color.name}
                  onClick={() => setWheelColor(color.value)}
                  className={`w-10 h-10 rounded-full transition-all ${wheelColor === color.value ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-black/60 scale-110' : 'border border-white/20 hover:border-white'}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        ) : activeTab === 'engine' ? (
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-semibold tracking-widest text-white/30 uppercase">Powertrain</h3>
            <div className="flex flex-col gap-3">
              {[
                { id: 'v6', name: '3.0L V6 Twin-Turbo', tag: 'V6' },
                { id: 'v8', name: '4.0L V8 Hybrid', tag: 'V8' },
                { id: 'v12', name: '8.0L W16 Quad-Turbo', tag: 'W16' }
              ].map(eng => (
                <button
                  key={eng.id}
                  onClick={() => setEngine(eng.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${engine === eng.id ? 'border-gold-500 bg-gold-500/10 shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                >
                  <span className={`font-medium text-sm tracking-wide transition-colors ${engine === eng.id ? 'text-gold-500' : 'text-white'}`}>{eng.name}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded bg-black/50 transition-colors ${engine === eng.id ? 'text-gold-500' : 'text-white/50'}`}>{eng.tag}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-semibold tracking-widest text-white/30 uppercase">Upholstery</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: 'Saddle', value: '#7c2d12' },
                { name: 'Onyx', value: '#18181b' },
                { name: 'Ivory', value: '#f4f4f5' },
                { name: 'Bordeaux', value: '#7f1d1d' }
              ].map(color => (
                <button 
                  key={color.name}
                  onClick={() => setInteriorColor(color.value)}
                  className={`w-10 h-10 rounded-full transition-all ${interiorColor === color.value ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-black/60 scale-110' : 'border border-white/20 hover:border-white'}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
