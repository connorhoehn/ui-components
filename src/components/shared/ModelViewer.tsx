// src/components/shared/ModelViewer.tsx
//
// A generated 3D model (GLB/glTF) on a turntable, for judging it the way
// ImageCompare judges an image: beside its reference (the concept art) in one
// shared frame, so the two are exactly the same height. Under the view sit the
// inspection controls — which texture map is on the mesh (Lit, Base colour,
// Normal, ...), a wireframe toggle, the model's named parts and its earlier
// versions.
//
// The 3D view is Google's `<model-viewer>` custom element (an OPTIONAL peer,
// with three.js under it). It is loaded with a dynamic `import()` the first
// time a ModelViewer mounts, so an app that imports `/shared` and never draws
// a model never fetches either package. Until the element has loaded the
// model, the `poster` is shown; if the peer is missing or the model fails,
// a compact ErrorState sits over the poster.
//
// Texture channels go through model-viewer's public material API
// (`applyModelChannel`). Part highlights and wireframe need the three.js scene,
// which model-viewer 4.x keeps on an own symbol property described `'scene'`
// (`modelSceneOf`). That is not a public API: when it is not reachable the
// parts list and the wireframe button still work (and still report through
// `onSelectPart` / `onWireframeChange`), the mesh simply does not change.
//
// Tokens only. The one caller colour, `ModelPart.color`, reaches the page as
// an SVG `fill` attribute on the swatch and as the mesh's emissive colour.

import { createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Button } from '../ui/Button';
import { Slider } from '../forms/Slider';
import { Select } from '../forms/Select';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';
import ErrorState from './ErrorState';
import { GroupedList, type GroupedListRow } from './GroupedList';
import { SegmentedControl } from './SegmentedControl';
import { Spinner } from './Spinner';
import { StatusPill } from './StatusPill';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ModelChannel = 'baseColor' | 'normal' | 'roughness' | 'metallic' | 'emissive';
/** What the mesh shows: the lit model, or one texture map flat on it. */
export type ModelChannelView = 'lit' | ModelChannel;
export interface ModelChannelMap {
  src: string;
  label?: string;
}
export type ModelChannels = Partial<Record<ModelChannel, string | ModelChannelMap>>;

export interface ModelPart {
  id: string;
  label: string;
  /** Swatch and highlight colour — any CSS colour three.js can parse (hex, rgb(), a name). */
  color: string;
  /** Mesh/node name in the GLB. Default `id`. */
  node?: string;
}

export interface ModelVersion {
  id: string;
  label: string;
  description?: string;
  current?: boolean;
}

export type ModelViewerAspect = 'square' | 'landscape' | 'portrait' | 'wide';

export interface ModelAnimationOptions {
  /** A person's name per clip (`{ 'CAST:tatter/walk': 'Walk' }`); the clip's own name otherwise. */
  labels?: Readonly<Record<string, string>>;
  /** A second line per clip in the clip menu (`"48 frames · 2.0 s"`). */
  descriptions?: Readonly<Record<string, string>>;
  defaultClip?: string;
  /** Default true; never under prefers-reduced-motion. */
  autoPlay?: boolean;
  /** Frames per second the "frame N of M" readout counts in. Default 24. */
  fps?: number;
}

/** model-viewer's public animation API — the part `ModelAnimationBar` drives. */
export interface ModelAnimationLike {
  availableAnimations?: readonly string[];
  animationName?: string | null;
  currentTime: number;
  timeScale: number;
  duration: number;
  play(options?: { repetitions?: number; pingpong?: boolean }): void;
  pause(): void;
}

export interface ModelViewerProps {
  /** GLB/glTF URL. */
  src: string;
  /** Shown while loading and as the fallback when the view cannot render. */
  poster?: string;
  /** Accessible name of the 3D view. Default "3D model". */
  alt?: string;
  /** Region label. Default "3D model". */
  label?: string;
  /**
   * An image drawn beside the model in the same frame (the concept art): two
   * up from a 28rem container, stacked below that. `label` default "Reference".
   */
  reference?: { src: string; label?: string; alt?: string };
  /** The frame's aspect — same classes as ImageCompare. Default `square`. */
  aspect?: ModelViewerAspect;
  /**
   * How the frame gets its height. `aspect` (default): from its width, by
   * `aspect`. `fill`: the viewer is as tall as the box its host gives it
   * (`h-full`), the controls under the view keep their own height and the
   * frame takes what is left, so the view and its controls are one unit
   * that ends where the host's box ends and nothing sits below the fold.
   * The host's box needs a height of its own (a page template's body, a
   * `flex-1 min-h-0` cell); `aspect` is ignored. Since 2.520.1 (G174-1).
   */
  fit?: 'aspect' | 'fill';
  /**
   * model-viewer `camera-orbit`: where the camera opens (`"0deg 75deg auto"`
   * is the model's front, its +Z; `"180deg 75deg auto"` its back). Default:
   * model-viewer's own. Since 2.520.1 (G174-2).
   */
  cameraOrbit?: string;
  /** Turntable. Default true; always off under prefers-reduced-motion. */
  autoRotate?: boolean;
  /** Orbit with the pointer. Default true. */
  cameraControls?: boolean;
  /** model-viewer `environment-image`. Default `neutral`. */
  environment?: string;
  /** External texture maps (URLs) to view on the mesh. */
  channels?: ModelChannels;
  /** Controlled channel. */
  channel?: ModelChannelView;
  /** Initial channel when uncontrolled. Default `lit`. */
  defaultChannel?: ModelChannelView;
  onChannelChange?: (channel: ModelChannelView) => void;
  /** Named parts of the model, listed under the view; hover/focus highlights, click selects. */
  parts?: readonly ModelPart[];
  /** Controlled selected part (`null` = none). */
  selectedPart?: string | null;
  onSelectPart?: (id: string | null) => void;
  /**
   * The selected part is shown alone: every other part's meshes are hidden
   * until it is pressed again (`isolateModelPart`). Default false (the
   * selected part is only highlighted). Since 2.520.0 (G151-2).
   */
  isolatePart?: boolean;
  /**
   * The model's own glTF animations, played under the view: a clip menu
   * (two or more), play and pause, a frame back or on, the speed, and a
   * scrubber read as "Frame N of M". `labels` names a
   * clip for a person; `defaultClip` is the one it opens on (default the
   * first); `autoPlay` (default true, never under prefers-reduced-motion).
   * The turntable stops while a clip is shown. Since 2.520.0 (G151-1).
   */
  animations?: boolean | ModelAnimationOptions;
  /** Wireframe. Controlled when `onWireframeChange` is passed, else the initial value. */
  wireframe?: boolean;
  onWireframeChange?: (on: boolean) => void;
  /** Two or more show a compact list under the view, the current one marked. */
  versions?: readonly ModelVersion[];
  onOpenVersion?: (id: string) => void;
  /** Shows a "Snapshot" button; receives a PNG of the current view. */
  onSnapshot?: (png: Blob) => void;
  onLoad?: () => void;
  onError?: (message: string) => void;
  /** The frame's surface: `default` (surface), `inset` (inset surface), `dark` (the media stage). */
  tone?: 'default' | 'inset' | 'dark';
  /** No border or rounded frame — for use inside a card. */
  frameless?: boolean;
  className?: string;
  'data-testid'?: string;
}

// ---------------------------------------------------------------------------
// Structural view of <model-viewer> — what the helpers below touch. Duck
// typed so tests drive them with a plain object and the library never imports
// model-viewer's or three's types.
// ---------------------------------------------------------------------------

export interface ModelTextureInfoLike {
  readonly texture: unknown;
  setTexture(texture: unknown): void;
}

export interface ModelMaterialLike {
  readonly name?: string;
  readonly pbrMetallicRoughness: {
    readonly baseColorFactor: ArrayLike<number>;
    readonly metallicFactor: number;
    readonly roughnessFactor: number;
    readonly baseColorTexture: ModelTextureInfoLike | null;
    readonly metallicRoughnessTexture: ModelTextureInfoLike | null;
    setBaseColorFactor(rgba: [number, number, number, number]): void;
    setMetallicFactor(value: number): void;
    setRoughnessFactor(value: number): void;
  };
  readonly normalTexture: ModelTextureInfoLike | null;
  readonly emissiveTexture: ModelTextureInfoLike | null;
  readonly emissiveFactor: ArrayLike<number>;
  setEmissiveFactor(rgb: [number, number, number]): void;
}

export interface ModelViewerElementLike {
  model?: { readonly materials: readonly ModelMaterialLike[] } | null;
  createTexture?(uri: string): Promise<unknown>;
  toBlob?(options?: { mimeType?: string }): Promise<Blob>;
}

/** One option of the channel toggle. */
export interface ModelChannelOption {
  value: ModelChannel;
  label: string;
  /** `external`: a URL from the `channels` prop. `embedded`: a map inside the model. */
  source: 'external' | 'embedded';
  /** The external map's URL. */
  src?: string;
}

export const MODEL_CHANNEL_ORDER: readonly ModelChannel[] = ['baseColor', 'normal', 'roughness', 'metallic', 'emissive'];

export const MODEL_CHANNEL_LABEL: Record<ModelChannel, string> = {
  baseColor: 'Base colour',
  normal: 'Normal',
  roughness: 'Roughness',
  metallic: 'Metallic',
  emissive: 'Emissive',
};

function externalMap(channels: ModelChannels | undefined, c: ModelChannel): ModelChannelMap | null {
  const v = channels?.[c];
  if (!v) return null;
  return typeof v === 'string' ? { src: v } : v;
}

const hasTexture = (t: ModelTextureInfoLike | null | undefined) => t != null && t.texture != null;

/** The embedded texture behind a channel, from one material's ORIGINAL maps. */
function embeddedOf(stash: MaterialStash, c: ModelChannel): unknown {
  switch (c) {
    case 'baseColor': return stash.base;
    case 'normal': return stash.normal;
    // glTF packs both into one texture: G = roughness, B = metallic.
    case 'roughness':
    case 'metallic': return stash.mr;
    case 'emissive': return stash.emissive;
  }
}

/**
 * The channels a model can show: every key of `channels` (external URLs) plus
 * every map embedded in the loaded model's materials (`el.model.materials`),
 * in a fixed order. The packed metallic-roughness texture counts for both
 * Roughness and Metallic. An external map wins over an embedded one.
 */
export function modelChannelsOf(el: ModelViewerElementLike | null | undefined, channels?: ModelChannels): ModelChannelOption[] {
  const materials = el?.model?.materials ?? [];
  const embedded = new Set<ModelChannel>();
  for (const m of materials) {
    const s = stashFor(m);
    for (const c of MODEL_CHANNEL_ORDER) if (embeddedOf(s, c) != null) embedded.add(c);
  }
  const out: ModelChannelOption[] = [];
  for (const c of MODEL_CHANNEL_ORDER) {
    const ext = externalMap(channels, c);
    if (ext) out.push({ value: c, label: ext.label ?? MODEL_CHANNEL_LABEL[c], source: 'external', src: ext.src });
    else if (embedded.has(c)) out.push({ value: c, label: MODEL_CHANNEL_LABEL[c], source: 'embedded' });
  }
  return out;
}

interface MaterialStash {
  base: unknown;
  normal: unknown;
  mr: unknown;
  emissive: unknown;
  baseColorFactor: [number, number, number, number];
  metallic: number;
  roughness: number;
  emissiveFactor: [number, number, number];
}

// Keyed on the material object, so a stash outlives re-renders and a new model
// (new material objects) starts fresh. Taken ONCE, before the first swap.
const STASH = new WeakMap<object, MaterialStash>();

function stashFor(m: ModelMaterialLike): MaterialStash {
  let s = STASH.get(m);
  if (!s) {
    const pbr = m.pbrMetallicRoughness;
    const f = pbr.baseColorFactor;
    const e = m.emissiveFactor;
    s = {
      base: hasTexture(pbr.baseColorTexture) ? pbr.baseColorTexture!.texture : null,
      normal: hasTexture(m.normalTexture) ? m.normalTexture!.texture : null,
      mr: hasTexture(pbr.metallicRoughnessTexture) ? pbr.metallicRoughnessTexture!.texture : null,
      emissive: hasTexture(m.emissiveTexture) ? m.emissiveTexture!.texture : null,
      baseColorFactor: [f[0] ?? 1, f[1] ?? 1, f[2] ?? 1, f[3] ?? 1],
      metallic: pbr.metallicFactor,
      roughness: pbr.roughnessFactor,
      emissiveFactor: [e[0] ?? 0, e[1] ?? 0, e[2] ?? 0],
    };
    STASH.set(m, s);
  }
  return s;
}

const TEXTURES = new WeakMap<object, Map<string, Promise<unknown>>>();

function externalTexture(el: ModelViewerElementLike, src: string): Promise<unknown> | null {
  if (typeof el.createTexture !== 'function') return null;
  let cache = TEXTURES.get(el);
  if (!cache) TEXTURES.set(el, (cache = new Map()));
  let p = cache.get(src);
  if (!p) {
    p = el.createTexture(src);
    // A failed load must not poison the cache for a retry.
    p.catch(() => cache!.delete(src));
    cache.set(src, p);
  }
  return p;
}

/**
 * Show one texture map flat on the mesh, or (`lit`) put the model back.
 *
 * Every material's original textures and factors are stashed once; a channel
 * then sets `baseColorTexture` to the channel's map (an external URL through
 * `el.createTexture`, else the material's own embedded map), base colour
 * factor white, metallic 0, roughness 1, and clears the normal,
 * metallic-roughness and emissive maps so nothing else shades it. A material
 * without that map shows the channel's constant (its factor) instead. `lit`
 * restores the stash. Safe to call repeatedly in any order.
 */
export async function applyModelChannel(
  el: ModelViewerElementLike | null | undefined,
  channel: ModelChannelView,
  channels?: ModelChannels,
): Promise<void> {
  const materials = el?.model?.materials;
  if (!el || !materials?.length) return;
  const stashes = materials.map((m) => stashFor(m));

  if (channel === 'lit') {
    materials.forEach((m, i) => {
      const s = stashes[i]!;
      const pbr = m.pbrMetallicRoughness;
      // Base first, normal and metallic-roughness after: model-viewer sets a
      // texture's colour space by the slot it is put in, so an embedded data
      // map shown as base colour (sRGB) goes back to linear here.
      pbr.baseColorTexture?.setTexture(s.base);
      pbr.setBaseColorFactor(s.baseColorFactor);
      pbr.setMetallicFactor(s.metallic);
      pbr.setRoughnessFactor(s.roughness);
      pbr.metallicRoughnessTexture?.setTexture(s.mr);
      m.emissiveTexture?.setTexture(s.emissive);
      m.setEmissiveFactor(s.emissiveFactor);
      m.normalTexture?.setTexture(s.normal);
    });
    return;
  }

  const ext = externalMap(channels, channel);
  const shared = ext ? await externalTexture(el, ext.src) : null;
  materials.forEach((m, i) => {
    const s = stashes[i]!;
    const pbr = m.pbrMetallicRoughness;
    const texture = ext ? shared ?? null : embeddedOf(s, channel) ?? null;
    m.normalTexture?.setTexture(null);
    pbr.metallicRoughnessTexture?.setTexture(null);
    m.emissiveTexture?.setTexture(null);
    m.setEmissiveFactor([0, 0, 0]);
    pbr.setMetallicFactor(0);
    pbr.setRoughnessFactor(1);
    pbr.baseColorTexture?.setTexture(texture);
    pbr.setBaseColorFactor(texture != null ? [1, 1, 1, 1] : constantOf(s, channel));
  });
}

/** What a channel reads as where a material has no map for it. */
function constantOf(s: MaterialStash, c: ModelChannel): [number, number, number, number] {
  switch (c) {
    case 'baseColor': return s.baseColorFactor;
    case 'normal': return [0.5, 0.5, 1, 1]; // a flat tangent-space normal
    case 'roughness': return [s.roughness, s.roughness, s.roughness, 1];
    case 'metallic': return [s.metallic, s.metallic, s.metallic, 1];
    case 'emissive': return [...s.emissiveFactor, 1];
  }
}

// ---------------------------------------------------------------------------
// three.js scene access (parts, wireframe). Duck typed; three is never imported.
// ---------------------------------------------------------------------------

interface ColorLike { set(value: string): unknown }
interface MaterialLike3 {
  wireframe?: boolean;
  emissive?: ColorLike;
  emissiveMap?: unknown;
  emissiveIntensity?: number;
  needsUpdate?: boolean;
  clone(): MaterialLike3;
}
interface ObjectLike3 {
  name?: string;
  parent?: ObjectLike3 | null;
  isMesh?: boolean;
  material?: MaterialLike3 | MaterialLike3[];
  traverse?(fn: (o: ObjectLike3) => void): void;
}
export interface ModelSceneLike extends ObjectLike3 {
  /** The loaded glTF root (model-viewer 4.x `ModelScene.model`). */
  model?: ObjectLike3 | null;
  queueRender?(): void;
}

/**
 * The three.js scene inside a `<model-viewer>`: model-viewer 4.x keeps it on
 * an own symbol property whose description is `'scene'` (`$scene` in
 * model-viewer-base). Not public API — `null` when absent, and every caller
 * treats that as "leave the view unchanged".
 */
export function modelSceneOf(el: unknown): ModelSceneLike | null {
  if (el == null || typeof el !== 'object') return null;
  const sym = Object.getOwnPropertySymbols(el).find((s) => s.description === 'scene');
  const scene = sym ? (el as Record<symbol, unknown>)[sym] : null;
  return scene && typeof (scene as ObjectLike3).traverse === 'function' ? (scene as ModelSceneLike) : null;
}

function meshesOf(scene: ModelSceneLike): ObjectLike3[] {
  const root = scene.model && typeof scene.model.traverse === 'function' ? scene.model : scene;
  const out: ObjectLike3[] = [];
  root.traverse!((o) => { if (o.isMesh && o.material) out.push(o); });
  return out;
}

const materialsOf = (mesh: ObjectLike3): MaterialLike3[] =>
  Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];

/** GLTFLoader's PropertyBinding.sanitizeNodeName: spaces to `_`, `[].:/` dropped. */
const sanitizeNodeName = (name: string) => name.replace(/\s/g, '_').replace(/[[\].:/]/g, '');

function underNode(o: ObjectLike3, node: string): boolean {
  const names = new Set([node, sanitizeNodeName(node)]);
  for (let cur: ObjectLike3 | null | undefined = o; cur; cur = cur.parent) {
    if (cur.name && names.has(cur.name)) return true;
  }
  return false;
}

/** Wireframe on (or off) for every mesh material of the model. Returns false when the scene is unreachable. */
export function setModelWireframe(el: unknown, on: boolean): boolean {
  const scene = modelSceneOf(el);
  if (!scene) return false;
  for (const mesh of meshesOf(scene)) {
    for (const mat of materialsOf(mesh)) {
      if (mat.wireframe !== on) { mat.wireframe = on; mat.needsUpdate = true; }
    }
  }
  scene.queueRender?.();
  return true;
}

// The original material of every mesh wearing a highlight clone.
const HIGHLIGHTED = new WeakMap<object, Map<ObjectLike3, ObjectLike3['material']>>();

/**
 * Highlight one part: every mesh whose name, or an ancestor's, is `node` gets a
 * clone of its material with `emissive` set to `color`. Any earlier highlight
 * is put back first; `node = null` only puts it back. Returns the number of
 * meshes highlighted, or -1 when the scene is unreachable.
 */
export function highlightModelPart(el: unknown, node: string | null, color?: string): number {
  const scene = modelSceneOf(el);
  if (!scene) return -1;
  const prev = HIGHLIGHTED.get(scene);
  if (prev) {
    for (const [mesh, original] of prev) mesh.material = original;
    prev.clear();
  }
  let count = 0;
  if (node) {
    const map = prev ?? new Map();
    HIGHLIGHTED.set(scene, map);
    for (const mesh of meshesOf(scene)) {
      if (!underNode(mesh, node)) continue;
      const original = mesh.material;
      const tint = (m: MaterialLike3) => {
        const c = m.clone();
        if (c.emissive && color) {
          try { c.emissive.set(color); } catch { /* an unparseable colour leaves the clone as is */ }
          c.emissiveMap = null;
          c.emissiveIntensity = 0.6;
        }
        c.needsUpdate = true;
        return c;
      };
      mesh.material = Array.isArray(original) ? original.map(tint) : tint(original!);
      map.set(mesh, original);
      count += 1;
    }
  }
  scene.queueRender?.();
  return count;
}

// The visibility every mesh had before an isolation hid it.
const ISOLATED = new WeakMap<object, Map<ObjectLike3, boolean>>();

/**
 * Show one part alone: every mesh not under `node` (by its own or an
 * ancestor's name) is hidden; `node = null` shows them all again. Returns the
 * number of meshes hidden, or -1 when the scene is unreachable.
 */
export function isolateModelPart(el: unknown, node: string | null): number {
  const scene = modelSceneOf(el);
  if (!scene) return -1;
  const prev = ISOLATED.get(scene) ?? new Map<ObjectLike3, boolean>();
  ISOLATED.set(scene, prev);
  for (const [mesh, visible] of prev) (mesh as { visible?: boolean }).visible = visible;
  prev.clear();
  let hidden = 0;
  if (node) {
    for (const mesh of meshesOf(scene)) {
      if (underNode(mesh, node)) continue;
      const m = mesh as { visible?: boolean };
      prev.set(mesh, m.visible ?? true);
      m.visible = false;
      hidden += 1;
    }
  }
  scene.queueRender?.();
  return hidden;
}

/** The clips a loaded `<model-viewer>` can play (its `availableAnimations`), or none. */
export function modelAnimationsOf(el: unknown): string[] {
  const list = (el as ModelAnimationLike | null)?.availableAnimations;
  return Array.isArray(list) ? list.filter((n): n is string => typeof n === 'string') : [];
}

const SPEEDS = [
  { value: '0.25', label: '¼×' },
  { value: '0.5', label: '½×' },
  { value: '1', label: '1×' },
];

/** The clip switch, play and pause, the scrubber and the speed under a ModelViewer. */
function ModelAnimationBar({
  el,
  clips,
  options,
  reducedMotion,
  testId,
}: {
  el: ModelAnimationLike;
  clips: readonly string[];
  options: ModelAnimationOptions;
  reducedMotion: boolean;
  testId?: string;
}) {
  const [clip, setClip] = useState(options.defaultClip && clips.includes(options.defaultClip) ? options.defaultClip : clips[0]);
  const [playing, setPlaying] = useState((options.autoPlay ?? true) && !reducedMotion);
  const [speed, setSpeed] = useState('1');
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const fps = options.fps ?? 24;

  useEffect(() => {
    el.animationName = clip;
    el.currentTime = 0;
    setDuration(el.duration || 0);
  }, [el, clip]);
  useEffect(() => { el.timeScale = Number(speed); }, [el, speed]);
  useEffect(() => {
    if (playing) el.play();
    else el.pause();
  }, [el, playing, clip]);
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      setTime(el.currentTime || 0);
      setDuration(el.duration || 0);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [el, playing]);

  const seek = (t: number) => {
    setPlaying(false);
    el.pause();
    el.currentTime = t;
    setTime(t);
  };
  // A frame back or on, paused. The last frame is held just short of the end:
  // model-viewer wraps a looped clip set to its duration back to 0.
  const step = (frames: number) => {
    const d = el.duration || 0;
    seek(Math.min(Math.max(0, (el.currentTime || 0) + frames / fps), Math.max(0, d - 0.001)));
  };
  const total = Math.max(1, Math.round(duration * fps) + 1);
  const current = Math.min(total, Math.round(time * fps) + 1);
  const labelOf = (name: string) => options.labels?.[name] ?? name;
  const where = `Frame ${current} of ${total}`;
  return (
    <div data-model-viewer-animations data-clip={clip} data-playing={playing ? 'true' : 'false'} className="flex min-w-0 flex-col gap-2">
      {/* A menu, not a segmented row: three clip names overflow a narrow
          inspector, and a menu fits any width. */}
      {clips.length > 1 && (
        <Select
          size="sm"
          aria-label="Clip"
          value={clip}
          onChange={(e) => { setClip(e.target.value); setPlaying(!reducedMotion); }}
          options={clips.map((c) => ({ value: c, label: labelOf(c), description: options.descriptions?.[c] }))}
          data-testid={testId ? `${testId}-clip` : undefined}
        />
      )}
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Button size="sm" variant="secondary" onClick={() => setPlaying((p) => !p)} data-model-viewer-play>
          {playing ? 'Pause' : 'Play'}
        </Button>
        <IconButton size="sm" variant="ghost" aria-label="Back a frame" icon={<ChevronIcon dir="left" />} onClick={() => step(-1)} data-testid={testId ? `${testId}-back` : undefined} />
        <IconButton size="sm" variant="ghost" aria-label="On a frame" icon={<ChevronIcon dir="right" />} onClick={() => step(1)} data-testid={testId ? `${testId}-on` : undefined} />
        <SegmentedControl size="sm" aria-label="Speed" value={speed} onChange={setSpeed} options={SPEEDS} data-testid={testId ? `${testId}-speed` : undefined} />
      </div>
      <Slider
        aria-label={`Where ${labelOf(clip)} is`}
        aria-valuetext={where}
        min={0}
        max={duration || 0}
        step={1 / fps}
        value={Math.min(time, duration)}
        onChange={seek}
        readout={() => where}
        className="min-w-0"
        data-testid={testId ? `${testId}-scrubber` : undefined}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// The custom element loader
// ---------------------------------------------------------------------------

let modelViewerModule: Promise<unknown> | null = null;

/** Loads `@google/model-viewer` (which defines `<model-viewer>`) once per page. */
export function loadModelViewerElement(): Promise<unknown> {
  if (!modelViewerModule) {
    modelViewerModule = import('@google/model-viewer').catch((err: unknown) => {
      modelViewerModule = null;
      throw err;
    });
  }
  return modelViewerModule;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ASPECT: Record<ModelViewerAspect, string> = {
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-video',
};

const TONE: Record<NonNullable<ModelViewerProps['tone']>, string> = {
  default: 'bg-surface',
  inset: 'bg-surface-inset',
  dark: 'bg-video-stage',
};

type LoadState = 'loading' | 'ready' | 'error';

function errorMessage(detail: unknown): string {
  const d = detail as { type?: string; sourceError?: { message?: string } } | undefined;
  if (d?.type === 'webglcontextlost') return 'The 3D view lost its WebGL context.';
  const why = d?.sourceError?.message;
  return why ? `The model could not be loaded: ${why}` : 'The model could not be loaded.';
}

export function ModelViewer({
  src,
  poster,
  alt = '3D model',
  label = '3D model',
  reference,
  aspect = 'square',
  fit = 'aspect',
  cameraOrbit,
  autoRotate = true,
  cameraControls = true,
  environment = 'neutral',
  channels,
  channel: channelProp,
  defaultChannel = 'lit',
  onChannelChange,
  parts,
  selectedPart: selectedProp,
  onSelectPart,
  isolatePart = false,
  animations,
  wireframe: wireframeProp,
  onWireframeChange,
  versions,
  onOpenVersion,
  onSnapshot,
  onLoad,
  onError,
  tone = 'default',
  frameless = false,
  className,
  'data-testid': testId,
}: ModelViewerProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<LoadState>('loading');
  const [error, setError] = useState<string | null>(null);
  // Bumped on every `load` so embedded channels are re-read for a new model.
  const [loadCount, setLoadCount] = useState(0);

  const [channelState, setChannelState] = useState<ModelChannelView>(defaultChannel);
  const channel = channelProp ?? channelState;
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const selected = selectedProp !== undefined ? selectedProp : selectedState;
  const [hovered, setHovered] = useState<string | null>(null);
  const [wireState, setWireState] = useState<boolean>(wireframeProp ?? false);
  const wireframe = onWireframeChange ? wireframeProp ?? false : wireState;

  const cbs = useRef({ onLoad, onError });
  cbs.current = { onLoad, onError };

  const fail = useCallback((message: string) => {
    setState('error');
    setError(message);
    cbs.current.onError?.(message);
  }, []);

  // Load the element definition. Mounting is what triggers it, never importing.
  useEffect(() => {
    let live = true;
    loadModelViewerElement().catch(() => {
      if (live) fail('The 3D viewer is not available: install @google/model-viewer and three.');
    });
    return () => { live = false; };
  }, [fail]);

  // A new src starts over; so does a new element (see `hasReference` below).
  const hasReference = !!reference;
  useEffect(() => {
    setState('loading');
    setError(null);
  }, [src, hasReference]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleLoad = () => {
      setState('ready');
      setError(null);
      setLoadCount((n) => n + 1);
      cbs.current.onLoad?.();
    };
    const handleError = (event: Event) => fail(errorMessage((event as CustomEvent).detail));
    el.addEventListener('load', handleLoad);
    el.addEventListener('error', handleError);
    return () => {
      el.removeEventListener('load', handleLoad);
      el.removeEventListener('error', handleError);
    };
    // `hasReference`: with a reference the view sits in a figure, so the
    // element is another node when the reference comes or goes; listen on
    // the one drawn now, and start over (it loads its file again). G174-4.
  }, [fail, hasReference]);

  // Callers pass `channels` inline; key it by content so a re-render with an
  // equal object does not re-apply textures.
  const channelsKey = JSON.stringify(channels ?? {});
  const channelsRef = useRef(channels);
  channelsRef.current = channels;

  const options = useMemo(
    () => modelChannelsOf(state === 'ready' ? (ref.current as ModelViewerElementLike | null) : null, channelsRef.current),
    // loadCount: a new model can carry different maps.
    [channelsKey, state, loadCount],
  );

  const highlightedId = hovered ?? selected;
  const highlightedPart = parts?.find((p) => p.id === highlightedId) ?? null;
  const highlightNode = highlightedPart ? highlightedPart.node ?? highlightedPart.id : null;
  const highlightColor = highlightedPart?.color;

  // One serial sync of the mesh with (channel, wireframe, highlight): put any
  // highlight back, apply the channel to the original materials, set
  // wireframe on them, then clone the highlighted part's materials (the clone
  // copies the channel and wireframe). Serial so a slow external texture
  // cannot land after a later choice.
  const chain = useRef<Promise<void>>(Promise.resolve());
  useEffect(() => {
    if (state !== 'ready') return;
    const el = ref.current as (HTMLElement & ModelViewerElementLike) | null;
    if (!el) return;
    const node = highlightNode;
    const color = highlightColor;
    const maps = channelsRef.current;
    chain.current = chain.current
      .then(async () => {
        highlightModelPart(el, null);
        await applyModelChannel(el, channel, maps);
        setModelWireframe(el, wireframe);
        if (node) highlightModelPart(el, node, color);
      })
      .catch(() => { /* a failed texture leaves the previous view; the toggle stays usable */ });
  }, [state, loadCount, channel, channelsKey, wireframe, highlightNode, highlightColor]);

  // The selected part alone (isolatePart): hover still only highlights.
  const selectedPartRow = parts?.find((p) => p.id === selected) ?? null;
  const isolateNode = isolatePart && selectedPartRow ? selectedPartRow.node ?? selectedPartRow.id : null;
  // Turning `isolatePart` off (or choosing no part) shows every mesh again;
  // a viewer that never isolated never touches visibility.
  const isolatedRef = useRef(false);
  useEffect(() => {
    if (state !== 'ready') return;
    if (!isolateNode && !isolatedRef.current) return;
    isolateModelPart(ref.current, isolateNode);
    isolatedRef.current = isolateNode != null;
  }, [state, loadCount, isolateNode]);

  const clips = useMemo(
    () => (animations && state === 'ready' ? modelAnimationsOf(ref.current) : []),
    [animations, state, loadCount],
  );
  const animationOptions: ModelAnimationOptions = typeof animations === 'object' ? animations : {};

  const chooseChannel = (next: string) => {
    const c = next as ModelChannelView;
    if (channelProp === undefined) setChannelState(c);
    onChannelChange?.(c);
  };

  const toggleWireframe = () => {
    const next = !wireframe;
    if (!onWireframeChange) setWireState(next);
    onWireframeChange?.(next);
  };

  const togglePart = (id: string) => {
    const next = selected === id ? null : id;
    if (selectedProp === undefined) setSelectedState(next);
    onSelectPart?.(next);
  };

  const snapshot = async () => {
    const el = ref.current as ModelViewerElementLike | null;
    if (!el?.toBlob || !onSnapshot) return;
    const png = await el.toBlob({ mimeType: 'image/png' });
    onSnapshot(png);
  };

  const activeOption = options.find((o) => o.value === channel);
  const fill = fit === 'fill';
  const frameClass = cn(
    'relative block w-full overflow-hidden',
    // `fill`: the frame takes the height the controls leave; never under 8rem.
    fill ? 'min-h-32 flex-1' : ASPECT[aspect],
    TONE[tone],
    !frameless && 'rounded-lg border border-border',
  );
  const rotate = autoRotate && !reducedMotion && clips.length === 0;
  const showControls = options.length > 0 || state === 'ready' || onSnapshot;

  const versionRows: GroupedListRow[] = (versions ?? []).map((v) => ({
    id: v.id,
    groupId: 'versions',
    title: v.label,
    subline: v.description,
    current: v.current,
    pill: v.current ? <StatusPill size="sm" state="success" label="Current" /> : undefined,
    actions: v.current || !onOpenVersion ? undefined : (
      <Button
        size="sm"
        variant="secondary"
        aria-label={`Open the earlier version, ${v.label}`}
        data-model-viewer-open-version={v.id}
        onClick={() => onOpenVersion(v.id)}
      >
        Open the earlier version
      </Button>
    ),
  }));

  const view = (
    <div data-model-viewer-frame className={frameClass}>
      {createElement('model-viewer', {
        ref,
        src,
        alt,
        className: 'block h-full w-full',
        'camera-controls': cameraControls ? '' : undefined,
        'camera-orbit': cameraOrbit,
        'auto-rotate': rotate ? '' : undefined,
        'environment-image': environment,
        'interaction-prompt': 'none',
        loading: 'eager',
        'data-model-viewer-element': '',
      })}
      {state !== 'ready' && poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          draggable={false}
          data-model-viewer-poster
          className="pointer-events-none absolute inset-0 block h-full w-full object-contain"
        />
      )}
      {state === 'loading' && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Spinner size="md" aria-label="Loading the 3D model" />
        </span>
      )}
      {state === 'error' && (
        <div data-model-viewer-error className="absolute inset-0 flex items-center justify-center bg-surface/80 p-2">
          <ErrorState compact title="Could not show the model" body={error ?? undefined} testId="model-viewer-error" />
        </div>
      )}
    </div>
  );

  return (
    <section
      aria-label={label}
      data-ui-model-viewer=""
      data-model-viewer-state={state}
      data-model-viewer-channel={channel}
      data-model-viewer-wireframe={wireframe ? 'true' : 'false'}
      data-model-viewer-part={selected ?? ''}
      data-model-viewer-isolated={isolateNode ?? ''}
      data-testid={testId}
      data-model-viewer-fit={fit}
      className={cn('@container flex min-w-0 flex-col gap-3', fill && 'h-full min-h-0', className)}
    >
      {reference ? (
        <div className={cn('grid min-w-0 grid-cols-1 gap-3 @md:grid-cols-2', fill && 'min-h-0 flex-1')}>
          <figure className={cn('m-0 flex min-w-0 flex-col gap-1.5', fill && 'min-h-0')}>
            {view}
            <figcaption className="truncate text-sm font-medium text-text-primary">{label}</figcaption>
          </figure>
          <figure data-model-viewer-reference className={cn('m-0 flex min-w-0 flex-col gap-1.5', fill && 'min-h-0')}>
            <span className={frameClass}>
              <img
                src={reference.src}
                alt={reference.alt ?? reference.label ?? 'Reference'}
                draggable={false}
                className="block h-full w-full object-contain"
              />
            </span>
            <figcaption className="truncate text-sm font-medium text-text-primary">{reference.label ?? 'Reference'}</figcaption>
          </figure>
        </div>
      ) : (
        view
      )}

      {showControls && (
        <div data-model-viewer-toolbar className="flex min-w-0 flex-wrap items-center gap-2">
          {options.length > 0 && (
            <SegmentedControl
              size="sm"
              aria-label="Texture channel"
              value={channel}
              onChange={chooseChannel}
              options={[{ value: 'lit', label: 'Lit' }, ...options.map((o) => ({ value: o.value, label: o.label }))]}
              data-testid={testId ? `${testId}-channel` : undefined}
            />
          )}
          {activeOption?.source === 'external' && activeOption.src && (
            <img
              src={activeOption.src}
              alt={`${activeOption.label} map`}
              data-model-viewer-channel-map
              className="block size-7 shrink-0 rounded border border-border bg-surface-inset object-cover"
            />
          )}
          {activeOption?.source === 'embedded' && (channel === 'roughness' || channel === 'metallic') && (
            <span data-model-viewer-channel-note className="text-xs text-text-secondary">
              Packed map: roughness in green, metallic in blue
            </span>
          )}
          <span className="ml-auto flex shrink-0 items-center gap-2">
            <Button size="sm" variant="ghost" aria-pressed={wireframe} onClick={toggleWireframe} data-model-viewer-wireframe-toggle>
              Wireframe
            </Button>
            {onSnapshot && (
              <Button size="sm" variant="secondary" onClick={snapshot} disabled={state !== 'ready'} data-model-viewer-snapshot>
                Snapshot
              </Button>
            )}
          </span>
        </div>
      )}

      {clips.length > 0 && ref.current && (
        <ModelAnimationBar
          key={`${src}#${loadCount}`}
          el={ref.current as unknown as ModelAnimationLike}
          clips={clips}
          options={animationOptions}
          reducedMotion={reducedMotion}
          testId={testId}
        />
      )}

      {parts && parts.length > 0 && (
        <ul aria-label="Parts" data-model-viewer-parts className="m-0 flex min-w-0 list-none flex-wrap gap-1.5 p-0">
          {parts.map((part) => (
            <li key={part.id}>
              <Button
                size="sm"
                variant="ghost"
                aria-pressed={selected === part.id}
                data-model-viewer-part-button={part.id}
                data-highlighted={highlightedId === part.id ? 'true' : undefined}
                onClick={() => togglePart(part.id)}
                onMouseEnter={() => setHovered(part.id)}
                onMouseLeave={() => setHovered((h) => (h === part.id ? null : h))}
                onFocus={() => setHovered(part.id)}
                onBlur={() => setHovered((h) => (h === part.id ? null : h))}
              >
                <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 shrink-0">
                  <circle cx="6" cy="6" r="5.5" fill={part.color} />
                </svg>
                {part.label}
              </Button>
            </li>
          ))}
        </ul>
      )}

      {versions && versions.length >= 2 && (
        <GroupedList
          size="sm"
          groups={[{ id: 'versions', title: 'Versions', count: versions.length }]}
          rows={versionRows}
          onOpenRow={(row) => {
            const v = versions.find((x) => x.id === row.id);
            if (v && !v.current) onOpenVersion?.(v.id);
          }}
          data-testid={testId ? `${testId}-versions` : undefined}
        />
      )}
    </section>
  );
}

export default ModelViewer;
