import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { modificationsData, baseStats } from './data/modifications';

export const useCarStore = create(
  persist(
    (set, get) => ({
      // --- THREE.JS REFERENCES (DO NOT PERSIST) ---
      meshes: {},
      wheelMeshes: {},
      wheelGroups: {},
      bodyMeshes: {},
      interiorMeshes: {},
      aeroMeshes: {},
      setMeshes: (meshes) => set({ meshes }),
      setWheelMeshes: (wheelMeshes) => set({ wheelMeshes }),
      setWheelGroups: (wheelGroups) => set({ wheelGroups }),
      setBodyMeshes: (bodyMeshes) => set({ bodyMeshes }),
      setInteriorMeshes: (interiorMeshes) => set({ interiorMeshes }),
      setAeroMeshes: (aeroMeshes) => set({ aeroMeshes }),

      // --- VISUAL UI STATE ---
      isWheelRotating: false,
      setIsWheelRotating: (val) => set({ isWheelRotating: val }),
      wheelColor: '#e5e7eb', // Default alloy color
      setWheelColor: (color) => set({ wheelColor: color }),
      bodyColor: '#1c1c1c', // Default obsidian color
      setBodyColor: (color) => set({ bodyColor: color }),
      interiorColor: '#7c2d12', // Default Saddle color
      setInteriorColor: (color) => set({ interiorColor: color }),
      cameraPreset: null,
      setCameraPreset: (preset) => set({ cameraPreset: preset }),
      
      activeCategory: 'paint', // controls bottom dock and right panel context
      setActiveCategory: (cat) => set({ activeCategory: cat }),

      // --- MODIFICATIONS (PERSISTED) ---
      engine: 'v12', // Backward compatibility for UI
      selectedEngine: 'v12',
      selectedWheels: 'stock',
      selectedAero: 'stock',
      selectedWeightSetup: 'stock',

      setEngine: (eng) => set({ engine: eng, selectedEngine: eng }), // Backwards compatibility for ui
      setSelectedEngine: (id) => {
        set({ selectedEngine: id, engine: id });
        try {
          const audio = new Audio('/sounds/rev.mp3');
          audio.volume = 0.3;
          audio.play().catch(() => {});
        } catch(e) {}
      },
      setSelectedWheels: (id) => {
         const wheelObj = modificationsData.wheels.find(w => w.id === id);
         set({ selectedWheels: id, wheelColor: wheelObj ? wheelObj.color : '#e5e7eb' });
      },
      setSelectedAero: (id) => set({ selectedAero: id }),
      setSelectedWeightSetup: (id) => set({ selectedWeightSetup: id }),

      // --- COMPUTED PERFORMANCE STATS ---
      getComputedStats: () => {
        const state = get();
        const engineMod = modificationsData.engine.find(e => e.id === state.selectedEngine) || modificationsData.engine[2];
        const wheelMod = modificationsData.wheels.find(w => w.id === state.selectedWheels) || modificationsData.wheels[0];
        const aeroMod = modificationsData.aero.find(a => a.id === state.selectedAero) || modificationsData.aero[0];
        const weightMod = modificationsData.weight.find(w => w.id === state.selectedWeightSetup) || modificationsData.weight[0];

        const totalWeight = baseStats.weight + engineMod.weightImpact + wheelMod.weightImpact + aeroMod.weightImpact + weightMod.weightImpact;
        const totalHp = engineMod.hp;
        const totalGrip = baseStats.grip + wheelMod.gripImpact + aeroMod.gripImpact;
        const totalDrag = aeroMod.dragCoefficientImpact; 

        // Raw calculations
        const rawTopSpeed = (totalHp / totalWeight) * 450; 
        const rawZts = totalWeight / (totalHp * 1.5); 
        const rawAccel = totalHp / totalWeight * 100;
        
        let totalPrice = engineMod.price + wheelMod.price + aeroMod.price + weightMod.price;
        
        // Convert to percentage values (0-100) for progress bars based on min/max expectations
        return {
          topSpeedValue: Math.round(rawTopSpeed),
          zeroToSixtyValue: rawZts.toFixed(1),
          accelerationValue: Math.round(rawAccel),
          gripValue: totalGrip,
          
          topSpeedPercent: Math.min(100, Math.max(0, (rawTopSpeed - 150) / (280 - 150) * 100)),
          zeroToSixtyPercent: Math.min(100, Math.max(0, 100 - ((rawZts - 2.0) / (8.0 - 2.0) * 100))), 
          accelerationPercent: Math.min(100, Math.max(0, rawAccel)),
          gripPercent: Math.min(100, Math.max(0, totalGrip)),
          
          weight: totalWeight,
          hp: totalHp,
          price: `$${totalPrice.toLocaleString()}`
        };
      }
    }),
    {
      name: 'car-tuning-storage', // key in local storage
      partialize: (state) => ({
        selectedEngine: state.selectedEngine,
        engine: state.engine,
        selectedWheels: state.selectedWheels,
        selectedAero: state.selectedAero,
        selectedWeightSetup: state.selectedWeightSetup,
        bodyColor: state.bodyColor,
        interiorColor: state.interiorColor,
        wheelColor: state.wheelColor,
        cameraPreset: state.cameraPreset
      }),
    }
  )
);
