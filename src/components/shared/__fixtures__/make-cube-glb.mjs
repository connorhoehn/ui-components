// Writes a tiny textured cube GLB (glTF 2.0 binary): 24 vertices with UVs, a
// 4x4 PNG base colour and a 4x4 PNG normal map embedded, no normals (the
// loader shades it flat). `--parts` writes two named nodes (body, legs) with
// their own materials so a parts map can highlight one.
// Usage: node make-cube-glb.mjs out.glb [--parts]
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
function png(pixels /* [[r,g,b]] 16 */) {
  const raw = Buffer.alloc(4 * (1 + 4 * 3));
  for (let y = 0; y < 4; y++) {
    raw[y * 13] = 0;
    for (let x = 0; x < 4; x++) pixels[y * 4 + x].forEach((v, i) => (raw[y * 13 + 1 + x * 3 + i] = v));
  }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(4, 0);
  ihdr.writeUInt32BE(4, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8-bit RGB
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}
// A 4-px checker: warm orange and teal, so a texture swap is visible.
const A = [235, 120, 40], B = [30, 150, 150];
const baseColor = png(Array.from({ length: 16 }, (_, i) => (((i >> 2) + i) % 2 ? A : B)));
const normal = png(Array.from({ length: 16 }, () => [128, 128, 255]));

const faces = [
  [[1, 0, 0], [0, 0, -1], [0, 1, 0]], [[-1, 0, 0], [0, 0, 1], [0, 1, 0]],
  [[0, 1, 0], [1, 0, 0], [0, 0, -1]], [[0, -1, 0], [1, 0, 0], [0, 0, 1]],
  [[0, 0, 1], [1, 0, 0], [0, 1, 0]], [[0, 0, -1], [-1, 0, 0], [0, 1, 0]],
];
function cube(cx, cy, cz, s) {
  const pos = [], uv = [], idx = [];
  faces.forEach(([n, u, v], f) => {
    for (const [a, b] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      pos.push(cx + s * (n[0] + a * u[0] + b * v[0]), cy + s * (n[1] + a * u[1] + b * v[1]), cz + s * (n[2] + a * u[2] + b * v[2]));
      uv.push((a + 1) / 2, 1 - (b + 1) / 2);
    }
    idx.push(f * 4, f * 4 + 1, f * 4 + 2, f * 4, f * 4 + 2, f * 4 + 3);
  });
  return { pos, uv, idx };
}
const parts = process.argv.includes("--parts");
const shapes = parts ? [["body", cube(0, 0.75, 0, 0.5)], ["legs", cube(0, 0.125, 0, 0.125)]] : [["cube", cube(0, 0.5, 0, 0.5)]];

const chunks = [];
let offset = 0;
const views = [], accessors = [];
const pad4 = (b) => Buffer.concat([b, Buffer.alloc((4 - (b.length % 4)) % 4)]);
function view(buf, target) {
  const b = pad4(buf);
  views.push({ buffer: 0, byteOffset: offset, byteLength: buf.length, ...(target ? { target } : {}) });
  chunks.push(b);
  offset += b.length;
  return views.length - 1;
}
const meshes = [], nodes = [], materials = [];
const imgBase = view(baseColor), imgNormal = view(normal);
shapes.forEach(([name, { pos, uv, idx }], i) => {
  const min = [0, 1, 2].map((k) => Math.min(...pos.filter((_, j) => j % 3 === k)));
  const max = [0, 1, 2].map((k) => Math.max(...pos.filter((_, j) => j % 3 === k)));
  const p = view(Buffer.from(new Float32Array(pos).buffer), 34962);
  const t = view(Buffer.from(new Float32Array(uv).buffer), 34962);
  const x = view(Buffer.from(new Uint16Array(idx).buffer), 34963);
  accessors.push({ bufferView: p, componentType: 5126, count: pos.length / 3, type: "VEC3", min, max });
  accessors.push({ bufferView: t, componentType: 5126, count: uv.length / 2, type: "VEC2" });
  accessors.push({ bufferView: x, componentType: 5123, count: idx.length, type: "SCALAR" });
  materials.push({ name, pbrMetallicRoughness: { baseColorTexture: { index: 0 }, metallicFactor: 0, roughnessFactor: 0.8 }, normalTexture: { index: 1 } });
  meshes.push({ name, primitives: [{ attributes: { POSITION: i * 3, TEXCOORD_0: i * 3 + 1 }, indices: i * 3 + 2, material: i }] });
  nodes.push({ name, mesh: i });
});
const bin = Buffer.concat(chunks);
const gltf = {
  asset: { version: "2.0", generator: "storymaker make-cube-glb" },
  scene: 0,
  scenes: [{ nodes: nodes.map((_, i) => i) }],
  nodes, meshes, materials,
  samplers: [{ magFilter: 9728, minFilter: 9728 }],
  images: [{ bufferView: imgBase, mimeType: "image/png" }, { bufferView: imgNormal, mimeType: "image/png" }],
  textures: [{ source: 0, sampler: 0 }, { source: 1, sampler: 0 }],
  accessors,
  bufferViews: views,
  buffers: [{ byteLength: bin.length }],
};
const json = Buffer.from(JSON.stringify(gltf));
const jsonPadded = Buffer.concat([json, Buffer.alloc((4 - (json.length % 4)) % 4, 0x20)]);
const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonPadded.length + 8 + bin.length, 8);
const jh = Buffer.alloc(8); jh.writeUInt32LE(jsonPadded.length, 0); jh.writeUInt32LE(0x4e4f534a, 4);
const bh = Buffer.alloc(8); bh.writeUInt32LE(bin.length, 0); bh.writeUInt32LE(0x004e4942, 4);
const out = Buffer.concat([header, jh, jsonPadded, bh, bin]);
writeFileSync(process.argv[2], out);
writeFileSync(process.argv[2].replace(/\.glb$/, "-basecolor.png"), baseColor);
console.log(process.argv[2], out.length, "bytes");
