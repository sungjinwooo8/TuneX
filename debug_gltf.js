import fs from 'fs';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// A mock DOM environment is needed for some Three.js loaders, but we can try without first.
// Actually GLTFLoader in Node often requires jsdom or similar. 
// A better way is using a headless browser (Puppeteer) or a simpler glTF parser script.
