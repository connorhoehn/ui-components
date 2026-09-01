// The one thing about ShellTerminal that cannot be asserted at runtime.
//
// jsdom does not apply stylesheets and the test bundler strips CSS imports, so
// "is xterm's stylesheet loaded" has no observable behaviour in a unit test.
// It also has no observable behaviour in Storybook, which imports the CSS at
// the preview level — which is exactly how it went missing in a real app for a
// release without anything failing.
//
// The failure is purely visual and reads as a broken component rather than a
// missing stylesheet: xterm's IME helper textarea becomes a visible box with a
// browser focus ring and a resize grabber, row positioning drifts, output is
// unpadded. So the import itself is pinned as source.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(resolve(here, '../components/ShellTerminal.tsx'), 'utf8');
const viteConfig = readFileSync(resolve(here, '../../../../vite.config.ts'), 'utf8');

describe('ShellTerminal stylesheet', () => {
  it('imports xterm.css itself, so a host cannot forget it', () => {
    expect(source).toMatch(/import\s+['"]@xterm\/xterm\/css\/xterm\.css['"]/);
  });

  it('and the build externalises it, so the consumer resolves one copy', () => {
    // Bundling it would weld xterm's CSS into the always-loaded
    // ui-components.css for every app, including the ones with no terminal.
    expect(viteConfig).toContain("'@xterm/xterm/css/xterm.css'");
  });
});

describe('terminal background', () => {
  const shell = readFileSync(resolve(here, '../components/ShellTerminal.tsx'), 'utf8');
  const styles = readFileSync(resolve(here, '../../../styles.css'), 'utf8');
  const frame = readFileSync(resolve(here, '../../shared/TitledFrame.tsx'), 'utf8');

  it('reads its own token rather than the darkest step of the code family', () => {
    // `code-bg` (#11111b) belongs behind chrome. A near-black rectangle beside
    // light app chrome reads as a hole punched in the page, not a terminal.
    expect(shell).toContain('--color-terminal-bg');
    expect(shell).not.toMatch(/background: token\('--color-code-bg'/);
  });

  it('flips with the theme — light canvas by day, Catppuccin by night', () => {
    // The terminal follows the app's day/night by product decision (this
    // replaced the earlier always-dark terminal). Both sides must exist, and
    // the whole ramp flips together — a dark canvas under light ink is
    // unreadable, so no token may flip alone.
    expect(styles).toMatch(/--color-terminal-bg:\s*#ffffff/);
    expect(styles).toMatch(/--color-terminal-bg:\s*#1e1e2e/);
    for (const t of ['fg', 'cursor', 'selection']) {
      expect((styles.match(new RegExp(`--color-terminal-${t}:`, 'g')) ?? []).length,
        `--color-terminal-${t} must be defined on both sides`).toBe(2);
    }
  });

  it('is overridable per terminal', () => {
    expect(shell).toMatch(/background\?: string/);
  });

  it('and the pane frame matches it, so there is no seam above the canvas', () => {
    // TitledFrame's code tone shows through the 8px strip above the terminal.
    expect(frame).toContain("frame: 'bg-terminal-bg'");
  });
});
