import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// The real package defines <model-viewer> and pulls in three.js + WebGL; the
// component only needs the import to resolve. Tests drive the element
// themselves: give it `model` / `toBlob` and dispatch `load`.
vi.mock('@google/model-viewer', () => ({}));

import {
  ModelViewer,
  applyModelChannel,
  highlightModelPart,
  isolateModelPart,
  modelAnimationsOf,
  modelChannelsOf,
  modelSceneOf,
  setModelWireframe,
  type ModelMaterialLike,
  type ModelViewerElementLike,
} from '../ModelViewer';

// --- a fake material in model-viewer's public shape ------------------------

function textureInfo(texture: unknown) {
  return {
    texture,
    setTexture: vi.fn(function (this: { texture: unknown }, t: unknown) { this.texture = t; }),
  };
}

function fakeMaterial(maps: { base?: unknown; normal?: unknown; mr?: unknown; emissive?: unknown } = {}) {
  const m = {
    name: 'cube',
    pbrMetallicRoughness: {
      baseColorFactor: [0.8, 0.7, 0.6, 1] as number[],
      metallicFactor: 0.3,
      roughnessFactor: 0.4,
      baseColorTexture: textureInfo(maps.base ?? null),
      metallicRoughnessTexture: textureInfo(maps.mr ?? null),
      setBaseColorFactor: vi.fn(function (rgba: number[]) { m.pbrMetallicRoughness.baseColorFactor = rgba; }),
      setMetallicFactor: vi.fn(function (v: number) { m.pbrMetallicRoughness.metallicFactor = v; }),
      setRoughnessFactor: vi.fn(function (v: number) { m.pbrMetallicRoughness.roughnessFactor = v; }),
    },
    normalTexture: textureInfo(maps.normal ?? null),
    emissiveTexture: textureInfo(maps.emissive ?? null),
    emissiveFactor: [0.1, 0.2, 0.3] as number[],
    setEmissiveFactor: vi.fn(function (rgb: number[]) { m.emissiveFactor = rgb; }),
  };
  return m;
}

const BASE = { id: 'base-tex' };
const NORMAL = { id: 'normal-tex' };

function el(materials: ModelMaterialLike[]): ModelViewerElementLike {
  return { model: { materials }, createTexture: vi.fn(async (uri: string) => ({ uri })) };
}

function viewerElement(container: HTMLElement) {
  const node = container.querySelector('model-viewer') as HTMLElement & ModelViewerElementLike;
  expect(node).not.toBeNull();
  return node;
}

function load(node: HTMLElement & ModelViewerElementLike, materials: ModelMaterialLike[] = []) {
  node.model = { materials };
  act(() => { node.dispatchEvent(new Event('load')); });
}

const root = (container: HTMLElement) => container.querySelector('[data-ui-model-viewer]') as HTMLElement;

describe('modelChannelsOf / applyModelChannel', () => {
  it('lists external channels plus embedded maps, packed metallic-roughness counting for both', () => {
    const m = fakeMaterial({ base: BASE, normal: NORMAL, mr: { id: 'mr' } });
    const opts = modelChannelsOf(el([m]), { emissive: { src: '/glow.png', label: 'Glow' } });
    expect(opts.map((o) => [o.value, o.label, o.source])).toEqual([
      ['baseColor', 'Base colour', 'embedded'],
      ['normal', 'Normal', 'embedded'],
      ['roughness', 'Roughness', 'embedded'],
      ['metallic', 'Metallic', 'embedded'],
      ['emissive', 'Glow', 'external'],
    ]);
    expect(modelChannelsOf(null, { normal: '/n.png' })).toEqual([{ value: 'normal', label: 'Normal', source: 'external', src: '/n.png' }]);
  });

  it('shows an embedded map as base colour, flattens the rest, and Lit restores the originals', async () => {
    const m = fakeMaterial({ base: BASE, normal: NORMAL });
    const e = el([m]);
    await applyModelChannel(e, 'normal');
    expect(m.pbrMetallicRoughness.baseColorTexture.texture).toBe(NORMAL);
    expect(m.normalTexture.texture).toBeNull();
    expect(m.pbrMetallicRoughness.baseColorFactor).toEqual([1, 1, 1, 1]);
    expect(m.pbrMetallicRoughness.metallicFactor).toBe(0);
    expect(m.pbrMetallicRoughness.roughnessFactor).toBe(1);
    expect(m.emissiveFactor).toEqual([0, 0, 0]);

    // Switching channel uses the ORIGINAL maps, not what is on the mesh now.
    await applyModelChannel(e, 'baseColor');
    expect(m.pbrMetallicRoughness.baseColorTexture.texture).toBe(BASE);

    await applyModelChannel(e, 'lit');
    expect(m.pbrMetallicRoughness.baseColorTexture.texture).toBe(BASE);
    expect(m.normalTexture.texture).toBe(NORMAL);
    expect(m.pbrMetallicRoughness.baseColorFactor).toEqual([0.8, 0.7, 0.6, 1]);
    expect(m.pbrMetallicRoughness.metallicFactor).toBe(0.3);
    expect(m.pbrMetallicRoughness.roughnessFactor).toBe(0.4);
    expect(m.emissiveFactor).toEqual([0.1, 0.2, 0.3]);
  });

  it('creates an external map once through el.createTexture and puts it on every material', async () => {
    const a = fakeMaterial({ base: BASE });
    const b = fakeMaterial();
    const e = el([a, b]);
    await applyModelChannel(e, 'roughness', { roughness: '/rough.png' });
    await applyModelChannel(e, 'lit', { roughness: '/rough.png' });
    await applyModelChannel(e, 'roughness', { roughness: '/rough.png' });
    expect(e.createTexture).toHaveBeenCalledTimes(1);
    expect(a.pbrMetallicRoughness.baseColorTexture.texture).toEqual({ uri: '/rough.png' });
    expect(b.pbrMetallicRoughness.baseColorTexture.texture).toEqual({ uri: '/rough.png' });
  });

  it('a material without the map shows the channel constant', async () => {
    const m = fakeMaterial();
    await applyModelChannel(el([m]), 'roughness');
    expect(m.pbrMetallicRoughness.baseColorTexture.texture).toBeNull();
    // roughness factor 0.4 was stashed before the swap set it to 1.
    expect(m.pbrMetallicRoughness.setBaseColorFactor).toHaveBeenLastCalledWith([0.4, 0.4, 0.4, 1]);
  });
});

describe('scene access (parts, wireframe)', () => {
  function sceneElement() {
    const color = () => ({ value: '', set: vi.fn(function (this: { value: string }, v: string) { this.value = v; }) });
    const mat = (name: string) => ({ name, wireframe: false, emissive: color(), emissiveMap: 'map', clone() { return { ...this, emissive: color(), clone: this.clone }; } });
    const legsMesh = { name: 'legs_mesh', isMesh: true, material: mat('legs'), parent: null as unknown };
    const legs = { name: 'legs', children: [legsMesh] };
    legsMesh.parent = legs;
    const body = { name: 'body', isMesh: true, material: mat('body'), parent: null };
    const all = [body, legs, legsMesh];
    const scene = {
      model: { traverse: (fn: (o: unknown) => void) => all.forEach(fn) },
      traverse: (fn: (o: unknown) => void) => all.forEach(fn),
      queueRender: vi.fn(),
    };
    const element = { [Symbol('scene')]: scene } as object;
    return { element, scene, body, legsMesh };
  }

  it('finds the scene on the own "scene" symbol, and returns null without one', () => {
    const { element, scene } = sceneElement();
    expect(modelSceneOf(element)).toBe(scene);
    expect(modelSceneOf({})).toBeNull();
    expect(setModelWireframe({}, true)).toBe(false);
    expect(highlightModelPart({}, 'body', '#f00')).toBe(-1);
  });

  it('highlights meshes by own or ancestor name with an emissive clone, and restores them', () => {
    const { element, scene, body, legsMesh } = sceneElement();
    const originalLegs = legsMesh.material;
    expect(highlightModelPart(element, 'legs', '#ff0000')).toBe(1);
    expect(legsMesh.material).not.toBe(originalLegs);
    expect((legsMesh.material as { emissive: { value: string } }).emissive.value).toBe('#ff0000');
    expect((legsMesh.material as { emissiveMap: unknown }).emissiveMap).toBeNull();
    expect(scene.queueRender).toHaveBeenCalled();
    const originalBody = body.material;
    highlightModelPart(element, 'body', '#00ff00');
    expect(legsMesh.material).toBe(originalLegs);
    expect(body.material).not.toBe(originalBody);
    highlightModelPart(element, null);
    expect(body.material).toBe(originalBody);
  });

  it('isolates one part by hiding every other mesh, and shows them all again', () => {
    const { element, scene, body, legsMesh } = sceneElement();
    expect(isolateModelPart({}, 'legs')).toBe(-1);
    expect(isolateModelPart(element, 'legs')).toBe(1);
    expect((body as { visible?: boolean }).visible).toBe(false);
    expect((legsMesh as { visible?: boolean }).visible).not.toBe(false);
    expect(scene.queueRender).toHaveBeenCalled();
    expect(isolateModelPart(element, 'body')).toBe(1);
    expect((body as { visible?: boolean }).visible).toBe(true);
    expect((legsMesh as { visible?: boolean }).visible).toBe(false);
    expect(isolateModelPart(element, null)).toBe(0);
    expect((legsMesh as { visible?: boolean }).visible).toBe(true);
  });

  it('sets wireframe on every mesh material', () => {
    const { element, body, legsMesh } = sceneElement();
    expect(setModelWireframe(element, true)).toBe(true);
    expect(body.material.wireframe).toBe(true);
    expect(legsMesh.material.wireframe).toBe(true);
  });
});

describe('ModelViewer', () => {
  const parts = [
    { id: 'body', label: 'Body', color: '#ff0000' },
    { id: 'legs', label: 'Legs', color: '#0000ff' },
  ];

  it('renders the element filling a square frame, loading with the poster until load', () => {
    const { container } = render(<ModelViewer src="/cube.glb" poster="/poster.png" />);
    const node = viewerElement(container);
    expect(node).toHaveAttribute('src', '/cube.glb');
    expect(node).toHaveAttribute('alt', '3D model');
    expect(node).toHaveClass('block', 'h-full', 'w-full');
    expect(node.closest('[data-model-viewer-frame]')).toHaveClass('aspect-square');
    expect(root(container)).toHaveAttribute('data-model-viewer-state', 'loading');
    expect(container.querySelector('[data-model-viewer-poster]')).toHaveAttribute('src', '/poster.png');
    expect(screen.getByRole('region', { name: '3D model' })).toBe(root(container));
    load(node);
    expect(root(container)).toHaveAttribute('data-model-viewer-state', 'ready');
    expect(container.querySelector('[data-model-viewer-poster]')).toBeNull();
  });

  it('fit="fill": the frame takes the height the host gives, with no aspect of its own (G174-1)', () => {
    const { container } = render(<ModelViewer src="/m.glb" fit="fill" aspect="square" />);
    const section = container.querySelector('[data-ui-model-viewer]') as HTMLElement;
    const frame = container.querySelector('[data-model-viewer-frame]') as HTMLElement;
    expect(section).toHaveAttribute('data-model-viewer-fit', 'fill');
    expect(section.className).toContain('h-full');
    expect(section.className).toContain('min-h-0');
    expect(frame.className).toContain('flex-1');
    expect(frame.className).not.toContain('aspect-');
  });

  it('fit defaults to the aspect frame, unchanged', () => {
    const { container } = render(<ModelViewer src="/m.glb" />);
    const section = container.querySelector('[data-ui-model-viewer]') as HTMLElement;
    expect(section).toHaveAttribute('data-model-viewer-fit', 'aspect');
    expect(section.className).not.toContain('h-full');
    expect((container.querySelector('[data-model-viewer-frame]') as HTMLElement).className).toContain('aspect-square');
  });

  it('cameraOrbit opens the camera where the host says; none leaves model-viewer its own (G174-2)', () => {
    const { container, rerender } = render(<ModelViewer src="/m.glb" cameraOrbit="180deg 75deg auto" />);
    expect(container.querySelector('model-viewer')).toHaveAttribute('camera-orbit', '180deg 75deg auto');
    rerender(<ModelViewer src="/m.glb" />);
    expect(container.querySelector('model-viewer')).not.toHaveAttribute('camera-orbit');
  });

  it('a reference that goes (or comes) after mount still reaches ready on the element then drawn (G174-4)', () => {
    const onLoad = vi.fn();
    const { container, rerender } = render(<ModelViewer src="/m.glb" poster="/p.png" reference={{ src: '/concept.png' }} onLoad={onLoad} />);
    const first = viewerElement(container);
    rerender(<ModelViewer src="/m.glb" poster="/p.png" onLoad={onLoad} />);
    const second = viewerElement(container);
    expect(second).not.toBe(first);
    expect(root(container)).toHaveAttribute('data-model-viewer-state', 'loading');
    load(second);
    expect(root(container)).toHaveAttribute('data-model-viewer-state', 'ready');
    expect(container.querySelector('[data-model-viewer-poster]')).toBeNull();
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it('draws the reference beside the model in the same frame classes', () => {
    const { container } = render(<ModelViewer src="/cube.glb" aspect="landscape" reference={{ src: '/concept.png' }} />);
    const ref = container.querySelector('[data-model-viewer-reference]') as HTMLElement;
    expect(within(ref).getByRole('img', { name: 'Reference' })).toHaveAttribute('src', '/concept.png');
    expect(within(ref).getByText('Reference')).toBeInTheDocument();
    const frame = container.querySelector('[data-model-viewer-frame]') as HTMLElement;
    expect((ref.firstElementChild as HTMLElement).className).toBe(frame.className);
    expect(ref.parentElement).toHaveClass('grid-cols-1', '@md:grid-cols-2');
  });

  it('parts: hover highlights, click selects, click again deselects, aria-pressed follows', () => {
    const onSelectPart = vi.fn();
    const { container } = render(<ModelViewer src="/cube.glb" parts={parts} onSelectPart={onSelectPart} />);
    const list = screen.getByRole('list', { name: 'Parts' });
    const body = within(list).getByRole('button', { name: 'Body' });
    const legs = within(list).getByRole('button', { name: 'Legs' });
    expect(body).toHaveAttribute('aria-pressed', 'false');
    expect(body.querySelector('circle')).toHaveAttribute('fill', '#ff0000');

    fireEvent.mouseEnter(legs);
    expect(legs).toHaveAttribute('data-highlighted', 'true');
    fireEvent.mouseLeave(legs);
    expect(legs).not.toHaveAttribute('data-highlighted');

    fireEvent.click(body);
    expect(onSelectPart).toHaveBeenLastCalledWith('body');
    expect(body).toHaveAttribute('aria-pressed', 'true');
    expect(root(container)).toHaveAttribute('data-model-viewer-part', 'body');
    fireEvent.click(body);
    expect(onSelectPart).toHaveBeenLastCalledWith(null);
    expect(body).toHaveAttribute('aria-pressed', 'false');
    expect(root(container)).toHaveAttribute('data-model-viewer-part', '');
  });

  it('isolatePart: the selected part is shown alone until it is pressed again', () => {
    const { container } = render(<ModelViewer src="/cube.glb" parts={parts} isolatePart />);
    load(viewerElement(container));
    fireEvent.click(screen.getByRole('button', { name: 'Legs' }));
    expect(root(container)).toHaveAttribute('data-model-viewer-isolated', 'legs');
    fireEvent.click(screen.getByRole('button', { name: 'Legs' }));
    expect(root(container)).toHaveAttribute('data-model-viewer-isolated', '');
  });

  it('isolatePart turned off shows every part again (G151-2)', () => {
    const color = () => ({ value: '', set: vi.fn() });
    const mat = (name: string) => ({ name, wireframe: false, emissive: color(), clone() { return { ...this, emissive: color(), clone: this.clone }; } });
    const body: Record<string, unknown> = { name: 'body', isMesh: true, material: mat('body'), parent: null };
    const legsMesh: Record<string, unknown> = { name: 'legs_mesh', isMesh: true, material: mat('legs'), parent: null };
    const legs = { name: 'legs', children: [legsMesh] };
    legsMesh.parent = legs;
    const all = [body, legs, legsMesh];
    const scene = { traverse: (fn: (o: unknown) => void) => all.forEach(fn), queueRender: vi.fn() };
    const { container, rerender } = render(<ModelViewer src="/cube.glb" parts={parts} selectedPart="legs" isolatePart />);
    const node = viewerElement(container) as unknown as Record<symbol, unknown> & HTMLElement & ModelViewerElementLike;
    node[Symbol('scene')] = scene;
    load(node);
    expect(root(container)).toHaveAttribute('data-model-viewer-isolated', 'legs');
    expect(body.visible).toBe(false);
    rerender(<ModelViewer src="/cube.glb" parts={parts} selectedPart="legs" />);
    expect(root(container)).toHaveAttribute('data-model-viewer-isolated', '');
    expect(body.visible).toBe(true);
  });

  it('animations: the clips the model carries, play and pause, a scrubber and the speed; the turntable stops', () => {
    expect(modelAnimationsOf({ availableAnimations: ['a', 3, 'b'] })).toEqual(['a', 'b']);
    expect(modelAnimationsOf(null)).toEqual([]);
    const { container } = render(
      <ModelViewer src="/rig.glb" animations={{ labels: { 'CAST:tatter/walk': 'Walk' }, autoPlay: false }} data-testid="mv" />,
    );
    const node = viewerElement(container) as HTMLElement & Record<string, unknown>;
    expect(node).toHaveAttribute('auto-rotate');
    const play = vi.fn();
    const pause = vi.fn();
    Object.assign(node, { availableAnimations: ['Range of motion', 'CAST:tatter/walk'], animationName: null, currentTime: 0, timeScale: 1, duration: 2, play, pause });
    load(node);
    expect(node).not.toHaveAttribute('auto-rotate');
    const bar = container.querySelector('[data-model-viewer-animations]') as HTMLElement;
    expect(bar).toHaveAttribute('data-clip', 'Range of motion');
    expect(node.animationName).toBe('Range of motion');
    expect(pause).toHaveBeenCalled();
    fireEvent.click(within(bar).getByRole('button', { name: 'Play' }));
    expect(play).toHaveBeenCalledTimes(1);
    // Choosing a clip plays it (a menu: it fits a narrow inspector).
    fireEvent.click(within(bar).getByRole('combobox', { name: 'Clip' }));
    fireEvent.mouseDown(within(screen.getByRole('listbox')).getByRole('option', { name: /Walk/ }));
    expect(node.animationName).toBe('CAST:tatter/walk');
    expect(play).toHaveBeenCalledTimes(2);
    // The label says what a press does; no aria-pressed on top of a changing label.
    expect(within(bar).getByRole('button', { name: 'Pause' })).not.toHaveAttribute('aria-pressed');
    const scrubber = within(bar).getByRole('slider', { name: 'Where Walk is' });
    expect(scrubber).toHaveAttribute('aria-valuetext', expect.stringMatching(/^Frame \d+ of 49$/));
    fireEvent.change(scrubber, { target: { value: '1' } });
    expect(node.currentTime).toBe(1);
    expect(bar).toHaveAttribute('data-playing', 'false');
    fireEvent.click(within(bar).getByRole('radio', { name: '½×' }));
    expect(node.timeScale).toBe(0.5);
    // A frame on and back, paused; the last frame is held short of the end.
    fireEvent.click(within(bar).getByRole('button', { name: 'On a frame' }));
    expect(node.currentTime).toBeCloseTo(1 + 1 / 24);
    fireEvent.click(within(bar).getByRole('button', { name: 'Back a frame' }));
    expect(node.currentTime).toBeCloseTo(1);
    node.currentTime = 2;
    fireEvent.click(within(bar).getByRole('button', { name: 'On a frame' }));
    expect(node.currentTime).toBeCloseTo(1.999);
  });

  it('honours a controlled selectedPart', () => {
    render(<ModelViewer src="/cube.glb" parts={parts} selectedPart="legs" />);
    expect(screen.getByRole('button', { name: 'Legs' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Body' }));
    expect(screen.getByRole('button', { name: 'Legs' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('channel toggle: options from the channels prop, growing with the loaded model\'s embedded maps', async () => {
    const onChannelChange = vi.fn();
    const { container } = render(
      <ModelViewer src="/cube.glb" channels={{ roughness: { src: '/rough.png', label: 'Rough' } }} onChannelChange={onChannelChange} />,
    );
    const group = () => screen.getByRole('radiogroup', { name: 'Texture channel' });
    expect(within(group()).getAllByRole('radio').map((r) => r.textContent)).toEqual(['Lit', 'Rough']);

    const m = fakeMaterial({ base: BASE, normal: NORMAL });
    const node = viewerElement(container);
    node.createTexture = vi.fn(async (uri: string) => ({ uri }));
    load(node, [m]);
    expect(within(group()).getAllByRole('radio').map((r) => r.textContent)).toEqual(['Lit', 'Base colour', 'Normal', 'Rough']);

    fireEvent.click(within(group()).getByRole('radio', { name: 'Normal' }));
    expect(onChannelChange).toHaveBeenLastCalledWith('normal');
    expect(root(container)).toHaveAttribute('data-model-viewer-channel', 'normal');
    await waitFor(() => expect(m.pbrMetallicRoughness.baseColorTexture.texture).toBe(NORMAL));

    // An external map shows its own thumbnail beside the toggle.
    fireEvent.click(within(group()).getByRole('radio', { name: 'Rough' }));
    expect(screen.getByRole('img', { name: 'Rough map' })).toHaveAttribute('src', '/rough.png');
    await waitFor(() => expect(m.pbrMetallicRoughness.baseColorTexture.texture).toEqual({ uri: '/rough.png' }));

    fireEvent.click(within(group()).getByRole('radio', { name: 'Lit' }));
    await waitFor(() => expect(m.pbrMetallicRoughness.baseColorTexture.texture).toBe(BASE));
    expect(m.normalTexture.texture).toBe(NORMAL);
  });

  it('wireframe toggle is pressed state, controlled when onWireframeChange is passed', () => {
    const { container, rerender } = render(<ModelViewer src="/cube.glb" />);
    load(viewerElement(container));
    const toggle = screen.getByRole('button', { name: 'Wireframe' });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(root(container)).toHaveAttribute('data-model-viewer-wireframe', 'true');

    const onWireframeChange = vi.fn();
    rerender(<ModelViewer src="/cube.glb" wireframe={false} onWireframeChange={onWireframeChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Wireframe' }));
    expect(onWireframeChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Wireframe' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('versions: the current one is marked and each earlier one opens through onOpenVersion', () => {
    const onOpenVersion = vi.fn();
    render(
      <ModelViewer
        src="/cube.glb"
        versions={[
          { id: 'v3', label: 'v3', description: 'Today', current: true },
          { id: 'v2', label: 'v2', description: 'Yesterday' },
          { id: 'v1', label: 'v1' },
        ]}
        onOpenVersion={onOpenVersion}
      />,
    );
    expect(screen.getByText('Current')).toBeInTheDocument();
    const open = screen.getAllByRole('button', { name: /^Open the earlier version/ });
    expect(open).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Open the earlier version, v2' }));
    expect(onOpenVersion).toHaveBeenCalledWith('v2');
  });

  it('a single version draws no list', () => {
    render(<ModelViewer src="/cube.glb" versions={[{ id: 'v1', label: 'v1', current: true }]} />);
    expect(screen.queryByText('Versions')).toBeNull();
  });

  it('an element error shows the compact ErrorState over the poster and calls onError', () => {
    const onError = vi.fn();
    const { container } = render(<ModelViewer src="/missing.glb" poster="/poster.png" onError={onError} />);
    const node = viewerElement(container);
    act(() => {
      node.dispatchEvent(new CustomEvent('error', { detail: { type: 'loadfailure', sourceError: new Error('404') } }));
    });
    expect(root(container)).toHaveAttribute('data-model-viewer-state', 'error');
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('The model could not be loaded: 404');
    expect(alert).not.toHaveClass('min-h-[220px]');
    expect(onError).toHaveBeenCalledWith('The model could not be loaded: 404');
    expect(container.querySelector('[data-model-viewer-poster]')).not.toBeNull();
  });

  it('Snapshot calls the element\'s toBlob for a PNG and hands it to onSnapshot', async () => {
    const onSnapshot = vi.fn();
    const { container } = render(<ModelViewer src="/cube.glb" onSnapshot={onSnapshot} />);
    const node = viewerElement(container);
    const png = new Blob(['x'], { type: 'image/png' });
    node.toBlob = vi.fn(async () => png);
    const button = screen.getByRole('button', { name: 'Snapshot' });
    expect(button).toBeDisabled();
    load(node);
    fireEvent.click(button);
    await waitFor(() => expect(onSnapshot).toHaveBeenCalledWith(png));
    expect(node.toBlob).toHaveBeenCalledWith({ mimeType: 'image/png' });
  });

  it('turns the turntable off under prefers-reduced-motion', () => {
    const original = window.matchMedia;
    window.matchMedia = ((q: string) => ({ matches: q.includes('reduce'), media: q, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
    try {
      const { container } = render(<ModelViewer src="/cube.glb" />);
      expect(viewerElement(container)).not.toHaveAttribute('auto-rotate');
      expect(viewerElement(container)).toHaveAttribute('camera-controls');
    } finally {
      window.matchMedia = original;
    }
    const { container } = render(<ModelViewer src="/cube.glb" />);
    expect(viewerElement(container)).toHaveAttribute('auto-rotate');
  });
});
