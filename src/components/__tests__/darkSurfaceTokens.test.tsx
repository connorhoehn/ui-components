// Dark-surface token guard.
//
// v2.105.0 made `[data-theme="dark"]` a REAL palette: the design tokens
// re-tone, and a subtree wrapper scopes it (call chrome, code panels).
// That turned two previously-invisible habits into rendering bugs, and
// this file guards against both plus the class of typo that hides them.
//
//  (a) A `var(--color-text-*)` value used as a BACKGROUND. It looked
//      fine while the text token happened to be dark and the surface
//      light; a real dark palette inverts both, and the element paints
//      light-on-light.
//
//  (b) A component branching on `useColorScheme()` to pick colors. That
//      hook returns the CONTEXT DEFAULT ('light') for any host that
//      stamps `data-theme` itself without mounting our
//      <ColorSchemeProvider> — which is exactly what the consuming app
//      does. Components must paint from tokens and let CSS resolve them.
//
//  (c) A `var(--color-something-that-does-not-exist, #literal)`. The
//      fallback silently wins in BOTH palettes, so the element is
//      permanently pinned to one hardcoded color. This is how (a) hides:
//      TranscriptPanel's active-segment highlight was
//      `var(--color-surface-active, rgba(255,255,255,0.06))` — an
//      undefined token, so every theme got a white wash, invisible on
//      the light #ffffff surface it actually rendered against.

import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { render, screen } from '@testing-library/react';
import { TranscriptPanel } from '../video/TranscriptPanel';
import { SummaryPanel } from '../video/SummaryPanel';

const SRC = join(process.cwd(), 'src');

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '__tests__') continue;
      sourceFiles(full, out);
    } else if (/\.(tsx?|css)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function definedColorTokens(): Set<string> {
  const css = readFileSync(join(SRC, 'styles.css'), 'utf8');
  return new Set([...css.matchAll(/^\s*(--color-[a-z0-9-]+)\s*:/gim)].map((m) => m[1]!));
}

// Files that still reference a color token styles.css never defines, so
// they render a hardcoded fallback in both palettes. Each is a real (if
// low-severity) dark-mode hazard; this list is a burndown, and it may
// only ever shrink. Do NOT add to it — define the token, or use one that
// exists.
const UNDEFINED_TOKEN_BURNDOWN = new Set([
  'src/components/layout/DocsShell.tsx',            // --color-bg
  'src/components/shared/SubNavLayout.tsx',         // --color-bg
  'src/components/video/VideoPlayerModal.tsx',      // --color-surface-alt
  'src/components/layout/SettingsLayout.tsx',       // --color-surface-subtle
  'src/components/observability/components/AlertItem.tsx', // --color-surface-subtle
  'src/components/shared/LogStream.tsx',            // --color-surface-subtle
  'src/components/shared/StatCard.tsx',             // --color-primary-soft
  'src/components/shared/ErrorState.tsx',           // --color-state-error
  'src/components/shared/PresenceDot.tsx',          // --color-state-error
  'src/components/video/RecordingRow.tsx',          // --color-state-error
  'src/components/pipelines/StepTimeline.tsx',      // --color-cat-<dynamic>
]);

describe('dark-surface token hygiene', () => {
  it('(a) no component paints a background from a text token', () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(join(SRC, 'components'))) {
      const src = readFileSync(file, 'utf8');
      if (/bg-\[var\(--color-text/.test(src) || /background[a-zA-Z-]*:\s*var\(--color-text/.test(src)) {
        offenders.push(relative(process.cwd(), file));
      }
    }
    expect(offenders).toEqual([]);
  });

  it('(b) no component picks colors by branching on useColorScheme()', () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(join(SRC, 'components'))) {
      // Strip comments first — several files explain in prose why they
      // stopped calling the hook, and that history should stay readable.
      const code = readFileSync(file, 'utf8')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|[^:])\/\/.*$/gm, '$1');
      if (/useColorScheme\s*\(/.test(code)) {
        offenders.push(relative(process.cwd(), file));
      }
    }
    expect(offenders).toEqual([]);
  });

  it('(c) the undefined-color-token burndown only shrinks', () => {
    const defined = definedColorTokens();
    const offenders = new Set<string>();
    for (const file of sourceFiles(SRC)) {
      const src = readFileSync(file, 'utf8');
      for (const m of src.matchAll(/var\((--color-[a-z0-9-]+)/gi)) {
        if (!defined.has(m[1]!)) offenders.add(relative(process.cwd(), file));
      }
    }
    for (const file of offenders) {
      expect(UNDEFINED_TOKEN_BURNDOWN, `${file} references an undefined --color-* token`)
        .toContain(file);
    }
  });

  it('TranscriptPanel and SummaryPanel are off the burndown list entirely', () => {
    for (const file of ['src/components/video/TranscriptPanel.tsx', 'src/components/video/SummaryPanel.tsx']) {
      expect(readFileSync(join(process.cwd(), file), 'utf8')).not.toMatch(/var\(--color-/);
      expect(UNDEFINED_TOKEN_BURNDOWN).not.toContain(file);
    }
  });
});

describe('TranscriptPanel on a dark surface', () => {
  const segments = [
    { startMs: 0, endMs: 1000, speakerId: 'a', speakerLabel: 'Ana', text: 'first' },
    { startMs: 1000, endMs: 2000, speakerId: 'b', speakerLabel: 'Bo', text: 'second' },
  ];

  function renderDark(node: React.ReactNode) {
    return render(<div data-theme="dark">{node}</div>);
  }

  it('paints its surface and border from tokens, not literals', () => {
    renderDark(<TranscriptPanel status="ready" segments={segments} />);
    const section = screen.getByText('Transcript').closest('section') as HTMLElement;
    expect(section.className).toContain('bg-surface');
    expect(section.className).toContain('border-border');
    expect(section.className).not.toMatch(/#[0-9a-f]{3,8}/i);
  });

  it('highlights the active segment with a token that exists in BOTH palettes', () => {
    // The old value was `var(--color-surface-active, rgba(255,255,255,0.06))`
    // — an undefined token, so the white fallback painted in every theme
    // and vanished against the light surface.
    renderDark(<TranscriptPanel status="ready" segments={segments} currentTimeMs={1500} />);
    const active = screen.getByText('second').closest('[data-seg-index]') as HTMLElement;
    expect(active.className).toContain('bg-surface-emphasis');
    expect(active.className).toContain('ring-primary');
    expect(active.className).not.toMatch(/rgba\(255,\s*255,\s*255/);
  });

  it('uses the real danger-border token in the failed state', () => {
    renderDark(<TranscriptPanel status="failed" errorMessage="nope" />);
    const section = screen.getByText(/failed/).closest('section') as HTMLElement;
    expect(section.className).toContain('border-danger-border');
    expect(section.className).not.toContain('#7f1d1d');
  });

  it('SummaryPanel — its sibling in the same recording surface — matches', () => {
    renderDark(<SummaryPanel status="failed" errorMessage="nope" />);
    const section = screen.getByText(/failed/).closest('section') as HTMLElement;
    expect(section.className).toContain('border-danger-border');
    expect(section.className).toContain('bg-surface');
  });

  it('renders identically inside and outside a dark subtree — CSS owns the theme', () => {
    // No provider is mounted here, which is precisely the consuming app's
    // situation. A component that branched on useColorScheme() would
    // produce different markup for these two renders.
    const dark = render(<div data-theme="dark"><TranscriptPanel status="ready" segments={segments} /></div>);
    const darkHtml = (dark.container.firstChild as HTMLElement).innerHTML;
    dark.unmount();

    const light = render(<div><TranscriptPanel status="ready" segments={segments} /></div>);
    expect((light.container.firstChild as HTMLElement).innerHTML).toBe(darkHtml);
  });
});
