// src/components/photo-editor/adjustRenderer.ts
//
// WebGL2 live preview of a photo edit. The image is uploaded to a texture
// once; a changed op list is one uniform update and one draw call, so a
// slider drag stays at frame rate on a 1568px photo. The fragment shader is
// `adjustRgb` in model.ts, line for line — change one, change the other (the
// test in __tests__/adjustRenderer.test.ts pins the pairing by name).
//
// Blur is not in the shader: the caller applies it as a CSS `blur()` filter on
// the canvas, which is exact and free.

import { hueRotateMatrix, type AdjustParams } from './model';

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = vec2((aPos.x + 1.0) * 0.5, 1.0 - (aPos.y + 1.0) * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uImage;
uniform float uExposure;
uniform float uWarmth;
uniform float uTint;
uniform float uContrast;
uniform vec4 uTone;       // highlights, shadows, whites, blacks
uniform float uSaturation;
uniform float uVibrance;
uniform mat3 uHue;
uniform float uBrightness;
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);
void main() {
  vec4 src = texture(uImage, vUv);
  vec3 c = src.rgb * exp2(uExposure);
  c.r *= 1.0 + 0.2 * uWarmth;
  c.b *= 1.0 - 0.2 * uWarmth;
  c.g *= 1.0 - 0.15 * uTint;
  c = (c - 0.5) * uContrast + 0.5;
  float l = dot(c, LUMA);
  float d = uTone.x * 0.25 * smoothstep(0.5, 1.0, l)
          + uTone.y * 0.25 * (1.0 - smoothstep(0.0, 0.5, l))
          + uTone.z * 0.15 * smoothstep(0.6, 1.0, l)
          + uTone.w * 0.15 * (1.0 - smoothstep(0.0, 0.4, l));
  c += d;
  l = dot(c, LUMA);
  float sat = max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
  float s = uSaturation * (1.0 + uVibrance * (1.0 - clamp(sat, 0.0, 1.0)));
  c = l + (c - l) * s;
  c = uHue * c;
  c *= uBrightness;
  outColor = vec4(clamp(c, 0.0, 1.0), src.a);
}`;

export interface AdjustRenderer {
  /** Upload a (new) source image. Resizes the canvas to the image. */
  setImage(image: TexImageSource & { width: number; height: number }): void;
  render(params: AdjustParams): void;
  dispose(): void;
}

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const sh = gl.createShader(type);
  if (!sh) throw new Error('photo-editor: createShader failed');
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`photo-editor: shader compile failed: ${log ?? ''}`);
  }
  return sh;
}

/** A renderer on this canvas, or null when WebGL2 is unavailable (the caller falls back to CSS filters). */
export function createAdjustRenderer(canvas: HTMLCanvasElement): AdjustRenderer | null {
  const gl = canvas.getContext('webgl2', { premultipliedAlpha: false, preserveDrawingBuffer: true });
  if (!gl) return null;
  let program: WebGLProgram;
  try {
    program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  } catch {
    return null;
  }
  gl.useProgram(program);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const u = (name: string) => gl.getUniformLocation(program, name);
  const loc = {
    exposure: u('uExposure'), warmth: u('uWarmth'), tint: u('uTint'), contrast: u('uContrast'), tone: u('uTone'),
    saturation: u('uSaturation'), vibrance: u('uVibrance'), hue: u('uHue'), brightness: u('uBrightness'),
  };
  let hasImage = false;

  return {
    setImage(image) {
      canvas.width = image.width;
      canvas.height = image.height;
      gl.viewport(0, 0, image.width, image.height);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      hasImage = true;
    },
    render(p) {
      if (!hasImage) return;
      gl.uniform1f(loc.exposure, p.exposureStops);
      gl.uniform1f(loc.warmth, p.warmth);
      gl.uniform1f(loc.tint, p.tint);
      gl.uniform1f(loc.contrast, p.contrast);
      gl.uniform4f(loc.tone, p.highlights, p.shadows, p.whites, p.blacks);
      gl.uniform1f(loc.saturation, p.saturation);
      gl.uniform1f(loc.vibrance, p.vibrance);
      // GLSL mat3 is column-major; hueRotateMatrix is row-major.
      gl.uniformMatrix3fv(loc.hue, true, hueRotateMatrix(p.hueDegrees));
      gl.uniform1f(loc.brightness, p.brightness);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    dispose() {
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    },
  };
}

/**
 * CSS filter fallback. Exact for the five pipeline kinds (brightness /
 * contrast / saturation / hue / blur, which is what CSS filters are); the
 * Light and Color kinds are approximated through brightness and saturate.
 */
export function cssFilterFor(p: AdjustParams): string {
  const parts: string[] = [];
  const bright = p.brightness * Math.pow(2, p.exposureStops) * (1 + 0.1 * (p.shadows + p.highlights));
  if (bright !== 1) parts.push(`brightness(${bright.toFixed(3)})`);
  if (p.contrast !== 1) parts.push(`contrast(${p.contrast.toFixed(3)})`);
  const sat = p.saturation * (1 + 0.5 * p.vibrance);
  if (sat !== 1) parts.push(`saturate(${sat.toFixed(3)})`);
  if (p.hueDegrees) parts.push(`hue-rotate(${p.hueDegrees}deg)`);
  if (p.warmth) parts.push(`sepia(${(Math.max(0, p.warmth) * 0.3).toFixed(3)})`);
  if (p.blurPx > 0) parts.push(`blur(${p.blurPx}px)`);
  return parts.join(' ') || 'none';
}
