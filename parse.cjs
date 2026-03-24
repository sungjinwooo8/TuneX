const fs = require('fs');

function parseGLB(filePath) {
  const buffer = fs.readFileSync(filePath);
  const magic = buffer.readUInt32LE(0);
  if (magic !== 0x46546C67) {
    console.log("Not a valid GLB");
    return;
  }
  
  const chunkLength = buffer.readUInt32LE(12);
  const chunkType = buffer.readUInt32LE(16);
  if (chunkType !== 0x4E4F534A) {
    console.log("First chunk is not JSON");
    return;
  }
  
  const jsonBuffer = buffer.subarray(20, 20 + chunkLength);
  const jsonStr = jsonBuffer.toString('utf8');
  const gltf = JSON.parse(jsonStr);

  const nodeNames = gltf.nodes ? gltf.nodes.map(n => n.name).filter(Boolean) : [];
  const materialNames = gltf.materials ? gltf.materials.map(m => m.name).filter(Boolean) : [];
  
  console.log("--- Materials ---");
  console.log(materialNames.join(", "));
  
  console.log("--- Nodes ---");
  console.log(nodeNames.join(", "));
}

parseGLB('public/models/car.glb');
