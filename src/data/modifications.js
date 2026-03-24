export const modificationsData = {
  engine: [
    { id: 'v6', name: '3.0L V6 Twin-Turbo', image: '/images/engines/v6.png', hp: 300, torque: 400, weightImpact: 180, gripImpact: 0, dragCoefficientImpact: 0, price: 1200000 },
    { id: 'v8', name: '4.0L V8 Hybrid', image: '/images/engines/v8.png', hp: 550, torque: 650, weightImpact: 220, gripImpact: 0, dragCoefficientImpact: 0, price: 1800000 },
    { id: 'v12', name: '8.0L W16 Quad-Turbo', image: '/images/engines/v12.png', hp: 800, torque: 900, weightImpact: 300, gripImpact: 0, dragCoefficientImpact: 0, price: 2400000 },
  ],
  wheels: [
    { id: 'stock', name: 'Stock Alloys', image: '/images/wheels/stock.png', hp: 0, torque: 0, weightImpact: 0, gripImpact: 0, dragCoefficientImpact: 0, color: '#e5e7eb', price: 0 },
    { id: 'sport', name: 'Sport Alloys', image: '/images/wheels/sport.png', hp: 0, torque: 0, weightImpact: -15, gripImpact: 10, dragCoefficientImpact: 0, color: '#f8fafc', price: 15000 },
    { id: 'carbon', name: 'Carbon Fiber', image: '/images/wheels/carbon.png', hp: 0, torque: 0, weightImpact: -35, gripImpact: 25, dragCoefficientImpact: 0, color: '#18181b', price: 45000 },
  ],
  aero: [
    { id: 'stock', name: 'Stock Body', image: '/images/aero/stock.png', hp: 0, torque: 0, weightImpact: 0, gripImpact: 0, dragCoefficientImpact: 0, price: 0 },
    { id: 'sport', name: 'Street Aero Kit', image: '/images/aero/sport.png', hp: 0, torque: 0, weightImpact: 15, gripImpact: 12, dragCoefficientImpact: 0.02, price: 25000 },
    { id: 'track', name: 'Track Aero Kit', image: '/images/aero/track.png', hp: 0, torque: 0, weightImpact: 25, gripImpact: 30, dragCoefficientImpact: 0.05, price: 80000 },
  ],
  weight: [
    { id: 'stock', name: 'Standard Interior', image: '/images/weight/stock.png', hp: 0, torque: 0, weightImpact: 0, gripImpact: 0, dragCoefficientImpact: 0, price: 0 },
    { id: 'stripped', name: 'Stripped Interior', image: '/images/weight/stripped.png', hp: 0, torque: 0, weightImpact: -150, gripImpact: 0, dragCoefficientImpact: 0, price: 10000 },
    { id: 'carbon_tub', name: 'Full Carbon Tub', image: '/images/weight/carbon.png', hp: 0, torque: 0, weightImpact: -300, gripImpact: 0, dragCoefficientImpact: 0, price: 120000 },
  ]
};

export const baseStats = {
  weight: 1500, // kg
  grip: 60, // baseline index out of 100
};
