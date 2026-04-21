import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Suppress known harmless Three.js warnings
const _origWarn = console.warn;
console.warn = (...args) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  // THREE.Clock deprecation comes from @react-three/fiber internals — not actionable
  if (msg.includes('THREE.Clock') || msg.includes('THREE.THREE.Clock')) return;
  // HLSL shader precision warnings on DirectX — cosmetic, not a real issue
  if (msg.includes('X4122') || msg.includes('Program Info Log')) return;
  _origWarn.apply(console, args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
