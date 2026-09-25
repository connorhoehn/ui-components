// Story-only kit for the document-call stories (not exported from the
// package): a canvas "camera" per person so tiles and previews show moving
// video without a real device, the mockup's cast, and a theme root that
// flips <html data-theme> so portalled menus and popovers follow it too.

import { useLayoutEffect, type ReactNode } from 'react';
import type { Decorator } from '@storybook/react-vite';
import { cn } from '../../lib/cn';

const streams = new Map<string, MediaStream>();

/**
 * A 640×400 canvas stream: a soft backdrop and a head-and-shoulders figure in
 * the person's hue, breathing slightly so a frozen frame is obvious. Cached
 * per key. Returns null where canvas capture is unavailable (jsdom).
 */
export function fakeCameraStream(key: string, hue = 210): MediaStream | null {
  if (typeof document === 'undefined') return null;
  const cached = streams.get(key);
  if (cached) return cached;
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  if (!ctx || typeof (canvas as HTMLCanvasElement & { captureStream?: unknown }).captureStream !== 'function') return null;
  let t = 0;
  const draw = () => {
    t += 1;
    const bg = ctx.createLinearGradient(0, 0, 640, 400);
    bg.addColorStop(0, `hsl(${hue}, 25%, 72%)`);
    bg.addColorStop(1, `hsl(${(hue + 40) % 360}, 20%, 38%)`);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 640, 400);
    // A window/shelf so filters and blur read on the thumbnails.
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(40, 40, 150, 190);
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(470, 120, 130, 12);
    const bob = Math.sin(t / 12) * 3;
    ctx.fillStyle = `hsl(${hue}, 35%, 30%)`;
    ctx.beginPath();
    ctx.ellipse(320, 420 + bob, 170, 120, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `hsl(28, 45%, 68%)`;
    ctx.beginPath();
    ctx.ellipse(320, 190 + bob, 70, 88, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `hsl(${(hue + 180) % 360}, 25%, 22%)`;
    ctx.beginPath();
    ctx.ellipse(320, 125 + bob, 74, 40, 0, Math.PI, Math.PI * 2);
    ctx.fill();
  };
  draw();
  setInterval(draw, 1000 / 15);
  const stream = (canvas as HTMLCanvasElement & { captureStream(fps?: number): MediaStream }).captureStream(15);
  streams.set(key, stream);
  return stream;
}

export const CAST = {
  connor: { userId: 'dev-connor', name: 'Connor Hoehn', hue: 205 },
  alice: { userId: 'dev-alice', name: 'Alice Chen', hue: 330 },
  frank: { userId: 'dev-frank', name: 'Frank Davis', hue: 30 },
  bob: { userId: 'dev-bob', name: 'Bob Martinez', hue: 150 },
  carol: { userId: 'dev-carol', name: 'Carol Johnson', hue: 270 },
} as const;

export const DEVICES = {
  microphones: [
    { deviceId: 'mbp-mic', label: 'MacBook Pro Microphone' },
    { deviceId: 'airpods', label: 'AirPods Pro' },
  ],
  speakers: [
    { deviceId: 'mbp-speakers', label: 'MacBook Pro Speakers' },
    { deviceId: 'airpods-out', label: 'AirPods Pro' },
  ],
  cameras: [
    { deviceId: 'facetime', label: 'FaceTime HD Camera' },
    { deviceId: 'continuity', label: 'iPhone Camera' },
  ],
};

export type StoryTheme = 'light' | 'dark';

/** Flips <html data-theme> (so portals follow) and paints the story canvas. */
export function ThemeRoot({
  theme,
  children,
  className,
}: {
  theme: StoryTheme;
  children: ReactNode;
  className?: string;
}) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const prev = root.getAttribute('data-theme');
    root.setAttribute('data-theme', theme);
    // Storybook's preview wraps every story in <ThemeProvider preset="light">,
    // which writes the light --color-* values INLINE on <html>. Inline wins
    // over the [data-theme="dark"] rule, so portalled menus and popovers would
    // stay light. Lift those inline values (after the provider's effect has
    // run) while a dark story is showing; the subtree below also carries
    // data-theme, so it flips either way.
    let lifted: [string, string][] = [];
    const timer = window.setTimeout(() => {
      if (theme !== 'dark') return;
      const names: string[] = [];
      for (let i = 0; i < root.style.length; i++) {
        const n = root.style.item(i);
        if (n.startsWith('--color-')) names.push(n);
      }
      lifted = names.map((n) => [n, root.style.getPropertyValue(n)]);
      for (const n of names) root.style.removeProperty(n);
    }, 0);
    return () => {
      window.clearTimeout(timer);
      for (const [n, v] of lifted) root.style.setProperty(n, v);
      if (prev == null) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', prev);
    };
  }, [theme]);
  return (
    <div data-theme={theme} data-story-theme={theme} className={cn('min-h-screen bg-workspace p-6 text-text-primary', className)}>
      {children}
    </div>
  );
}

/** Story decorator: `decorators: [themed('dark')]`. */
export function themed(theme: StoryTheme, className?: string): Decorator {
  const ThemedDecorator: Decorator = (Story) => (
    <ThemeRoot theme={theme} {...(className ? { className } : {})}>
      <Story />
    </ThemeRoot>
  );
  return ThemedDecorator;
}

// ── Shared scene data (the mockups' call) ──────────────────────────────────

export const REVIEW_DOCS = [
  { id: 'doc-auth', title: 'Auth architecture' },
  { id: 'doc-brief', title: 'Migration brief' },
];

export const noop = () => {};
