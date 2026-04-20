export const cars = {
  bugatti: {
    id: 'bugatti',
    name: "Bugatti Veyron Super Sport",
    baseStats: { velocity: 100, sprint: 85, thrust: 95, grip: 70 },
    engines: [
      { id: 'engine_0', name: "8.0L W16 Quad-Turbo", price: 0, image: '/images/engines/v12.png', effect: { velocity: 15, thrust: 35, sprint: 0, grip: 0 } },
      { id: 'engine_1', name: "Sport Tuned W16", price: 120000, image: '/images/engines/v8.png', effect: { velocity: 20, thrust: 40, sprint: 5, grip: 0 } }
    ],
    wheels: [
      { id: 'wheels_0', name: "Stock Michelin PAX", price: 0, image: '/images/wheels/stock.png', effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'wheels_1', name: "Sport Alloys", price: 15000, image: '/images/wheels/sport.png', effect: { grip: 3, sprint: 2, velocity: 0, thrust: 0 } },
      { id: 'wheels_2', name: "Carbon Fiber Wheels", price: 45000, image: '/images/wheels/carbon.png', effect: { grip: 5, sprint: 6, thrust: 3, velocity: 0 } }
    ],
    aero: [
      { id: 'aero_0', name: "Active Aero (Stock)", price: 0, image: '/images/aero/stock.png', effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'aero_1', name: "Street Aero", price: 25000, image: '/images/aero/sport.png', effect: { velocity: 5, grip: -3, thrust: 0, sprint: 0 } }
    ],
    weight: [
      { id: 'weight_0', name: "Standard Interior", price: 0, effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'weight_1', name: "Lightweight Trim", price: 30000, effect: { sprint: 5, thrust: 4, velocity: 0, grip: 0 } }
    ]
  },
  ferrari: {
    id: 'ferrari',
    name: "Ferrari P80/C",
    baseStats: { velocity: 92, sprint: 88, thrust: 82, grip: 95 },
    engines: [
      { id: 'engine_0', name: "3.9L Twin Turbo V8", price: 0, image: '/images/engines/v8.png', effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'engine_1', name: "Track Tuned V8", price: 80000, image: '/images/engines/v12.png', effect: { thrust: 15, sprint: 5, velocity: 0, grip: 0 } }
    ],
    wheels: [
      { id: 'wheels_0', name: "Racing Slicks", price: 10000, image: '/images/wheels/stock.png', effect: { grip: 8, velocity: 0, thrust: 0, sprint: 0 } },
      { id: 'wheels_1', name: "Carbon Racing Wheels", price: 40000, image: '/images/wheels/carbon.png', effect: { grip: 10, sprint: 4, velocity: 0, thrust: 0 } }
    ],
    aero: [
      { id: 'aero_0', name: "GT3 Aero", price: 20000, image: '/images/aero/sport.png', effect: { grip: 10, velocity: 0, thrust: 0, sprint: 0 } },
      { id: 'aero_1', name: "Extreme Track Aero", price: 50000, image: '/images/aero/track.png', effect: { grip: 15, velocity: -5, thrust: 0, sprint: 0 } }
    ],
    weight: [
      { id: 'weight_0', name: "Race Spec", price: 0, effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'weight_1', name: "Ultra Lightweight", price: 35000, effect: { sprint: 6, thrust: 6, velocity: 0, grip: 0 } }
    ]
  },
  porsche: {
    id: 'porsche',
    name: "Porsche 992 GT3 RS",
    baseStats: { velocity: 88, sprint: 80, thrust: 75, grip: 98 },
    engines: [
      { id: 'engine_0', name: "4.0L NA Flat-6", price: 0, image: '/images/engines/v6.png', effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'engine_1', name: "Track Tune Flat-6", price: 60000, image: '/images/engines/v8.png', effect: { thrust: 10, sprint: 5, velocity: 0, grip: 0 } }
    ],
    wheels: [
      { id: 'wheels_0', name: "Track Tires", price: 8000, image: '/images/wheels/stock.png', effect: { grip: 5, velocity: 0, thrust: 0, sprint: 0 } },
      { id: 'wheels_1', name: "Magnesium Wheels", price: 30000, image: '/images/wheels/sport.png', effect: { grip: 8, sprint: 3, velocity: 0, thrust: 0 } }
    ],
    aero: [
      { id: 'aero_0', name: "Active Aero", price: 15000, image: '/images/aero/stock.png', effect: { grip: 8, velocity: 0, thrust: 0, sprint: 0 } },
      { id: 'aero_1', name: "Full Track Aero", price: 45000, image: '/images/aero/track.png', effect: { grip: 15, velocity: -5, thrust: 0, sprint: 0 } }
    ],
    weight: [
      { id: 'weight_0', name: "Standard", price: 0, effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'weight_1', name: "Weissach Package", price: 40000, effect: { sprint: 5, thrust: 4, velocity: 0, grip: 0 } }
    ]
  },
  mercedes: {
    id: 'mercedes',
    name: "Mercedes AMG GT3",
    baseStats: { velocity: 85, sprint: 78, thrust: 80, grip: 96 },
    engines: [
      { id: 'engine_0', name: "6.3L NA V8", price: 0, image: '/images/engines/v8.png', effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'engine_1', name: "Race Tuned V8", price: 70000, image: '/images/engines/v12.png', effect: { thrust: 12, sprint: 4, velocity: 0, grip: 0 } }
    ],
    wheels: [
      { id: 'wheels_0', name: "Standard Tires", price: 0, image: '/images/wheels/stock.png', effect: { grip: 5, velocity: 0, thrust: 0, sprint: 0 } },
      { id: 'wheels_1', name: "Racing Slicks", price: 12000, image: '/images/wheels/sport.png', effect: { grip: 8, sprint: 3, velocity: 0, thrust: 0 } },
      { id: 'wheels_2', name: "Carbon Fiber Wheels", price: 45000, image: '/images/wheels/carbon.png', effect: { grip: 10, sprint: 5, velocity: 2, thrust: 0 } }
    ],
    aero: [
      { id: 'aero_0', name: "GT3 Aero Kit", price: 20000, image: '/images/aero/sport.png', effect: { grip: 10, velocity: 0, thrust: 0, sprint: 0 } },
      { id: 'aero_1', name: "High Downforce Kit", price: 45000, image: '/images/aero/track.png', effect: { grip: 15, velocity: -5, thrust: 0, sprint: 0 } }
    ],
    weight: [
      { id: 'weight_0', name: "Race Weight", price: 0, effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'weight_1', name: "Ultra Light Setup", price: 30000, effect: { sprint: 6, thrust: 5, velocity: 0, grip: 0 } }
    ]
  },
  mclaren: {
    id: 'mclaren',
    name: "McLaren P1",
    baseStats: { velocity: 95, sprint: 90, thrust: 92, grip: 88 },
    engines: [
      { id: 'engine_0', name: "3.8L Twin Turbo V8 Hybrid", price: 0, image: '/images/engines/v8.png', effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'engine_1', name: "Hybrid Boost Mode", price: 100000, image: '/images/engines/v12.png', effect: { thrust: 20, sprint: 10, velocity: 0, grip: 0 } }
    ],
    wheels: [
      { id: 'wheels_0', name: "Pirelli Trofeo R", price: 12000, image: '/images/wheels/stock.png', effect: { grip: 5, velocity: 0, thrust: 0, sprint: 0 } },
      { id: 'wheels_1', name: "Carbon Fiber Wheels", price: 40000, image: '/images/wheels/carbon.png', effect: { grip: 7, sprint: 5, velocity: 0, thrust: 0 } }
    ],
    aero: [
      { id: 'aero_0', name: "Active Aero", price: 20000, image: '/images/aero/stock.png', effect: { grip: 8, velocity: 0, thrust: 0, sprint: 0 } },
      { id: 'aero_1', name: "Track Aero Mode", price: 50000, image: '/images/aero/track.png', effect: { grip: 12, velocity: -3, thrust: 0, sprint: 0 } }
    ],
    weight: [
      { id: 'weight_0', name: "Standard", price: 0, effect: { velocity: 0, thrust: 0, sprint: 0, grip: 0 } },
      { id: 'weight_1', name: "Carbon Monocage", price: 50000, effect: { sprint: 7, thrust: 6, velocity: 0, grip: 0 } }
    ]
  }
};
