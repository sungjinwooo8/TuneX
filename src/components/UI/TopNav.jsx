import React from 'react';
import { useCarStore } from '../../store';
import { carModelsInfo } from '../../data/models';

export default function TopNav() {
  const selectedModel = useCarStore(state => state.selectedModel) || 'bugatti';
  const modelInfo = carModelsInfo[selectedModel] || carModelsInfo.bugatti;

  return (
    <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start pointer-events-none z-50">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.25em] text-white uppercase drop-shadow-2xl">{modelInfo.brand}</h1>
        <p className="text-white/60 tracking-[0.3em] text-[10px] uppercase font-medium ml-1">{modelInfo.name}</p>
      </div>
    </div>
  );
}
