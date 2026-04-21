/**
 * Central configuration for TuneX 3D Assets.
 * Models are hosted via GitHub Releases to bypass Git LFS and Cloudinary limits.
 */

const RELEASE_BASE = "https://github.com/sungjinwooo8/TuneX/releases/download/v1.0.0";

export const MODEL_CONFIG = {
  // Main Car Models
  bugatti: `${RELEASE_BASE}/bugatti.glb`,
  ferrari: `${RELEASE_BASE}/ferrari.glb`,
  porsche: `${RELEASE_BASE}/porsche.glb`,
  mercedes: `${RELEASE_BASE}/mercedes.glb`,
  mclaren: `${RELEASE_BASE}/mclaren.glb`,

  // Custom Wheel Models
  carbon_fiber: `${RELEASE_BASE}/carbon_fiber_bugatti.glb`,
  pax_michelin: `${RELEASE_BASE}/stock_mitchlin_pax.glb`,

  // Fallback helper
  getUrl: (key) => {
    const url = MODEL_CONFIG[key];
    if (!url) {
      console.warn(`TuneX: Model key "${key}" not found in configuration.`);
      return `${RELEASE_BASE}/bugatti.glb`; // General fallback
    }
    return url;
  }
};
