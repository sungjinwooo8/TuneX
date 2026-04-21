/**
 * Central configuration for TuneX 3D Assets.
 * Assets are now synced from GitHub Releases DURING BUILD via scripts/download-assets.js.
 * This solves CORS issues and keeps the Git repository small.
 */

export const MODEL_CONFIG = {
  // Main Car Models (Referencing local paths because they are synced during build)
  bugatti: "/models/bugatti.glb",
  ferrari: "/models/ferrari.glb",
  porsche: "/models/porsche.glb",
  mercedes: "/models/mercedes.glb",
  mclaren: "/models/mclaren.glb",

  // Custom Wheel Models
  carbon_fiber: "/models/carbon_fiber_bugatti.glb",
  pax_michelin: "/models/stock_mitchlin_pax.glb",

  // Fallback helper
  getUrl: (key) => {
    const url = MODEL_CONFIG[key];
    if (!url) {
      console.warn(`TuneX: Model key "${key}" not found in configuration.`);
      return "/models/bugatti.glb"; // General fallback
    }
    return url;
  }
};
