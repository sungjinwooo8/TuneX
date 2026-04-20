import fs from 'fs';
const buffer = fs.readFileSync('assets/wheels/carbon fiber buggati.glb');
const chunkLength = buffer.readUInt32LE(12);
const jsonBuffer = buffer.subarray(20, 20 + chunkLength);
const gltf = JSON.parse(jsonBuffer.toString('utf8'));

const mats = gltf.materials ? gltf.materials.map(m => m.name) : [];
const nodes = gltf.nodes ? gltf.nodes.map(n => n.name) : [];

const output = "Materials:\n" + mats.join('\n') + "\n\nNodes:\n" + nodes.join('\n');
fs.writeFileSync('bugatti_info.txt', output);
