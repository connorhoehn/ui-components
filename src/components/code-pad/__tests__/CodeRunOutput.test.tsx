import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CodeRunOutput, codeRunStatusLabel, type CodeRunStatus } from '../CodeRunOutput';

afterEach(cleanup);

const announcer = () => within(screen.getByTestId('code-run-output-announcer')).getByRole('status');
const lineTexts = () => screen.getAllByTestId('code-run-output-log-line').map((el) => el.textContent);

describe('CodeRunOutput', () => {
  it('shows the empty message and no status chip before anything has run', () => {
    render(<CodeRunOutput status={null} emptyMessage="Press Run to see output here." />);
    expect(screen.getByTestId('code-run-output-log-empty').textContent).toBe('Press Run to see output here.');
    expect(screen.queryByTestId('code-run-output-status')).toBeNull();
    expect(announcer().textContent).toBe('');
  });

  it('names every status with a plain word', () => {
    const all: CodeRunStatus[] = ['queued', 'compiling', 'running', 'succeeded', 'failed', 'compile_error', 'timed_out', 'memory_exceeded', 'cancelled', 'internal_error'];
    const words = all.map((s) => {
      render(<CodeRunOutput status={s} />);
      const word = screen.getByTestId('code-run-output-status').textContent;
      expect(word).toBe(codeRunStatusLabel(s));
      expect(word).not.toMatch(/_/);
      cleanup();
      return word;
    });
    expect(new Set(words).size).toBe(all.length);
  });

  it('puts compiler output first, then output, then labelled error output', () => {
    render(<CodeRunOutput status="failed" compileOutput={'warning: unused x\n'} stdout={'one\ntwo\n'} stderr={'Traceback\nValueError'} />);
    expect(lineTexts()).toEqual(['Compiler output', 'warning: unused x', 'Output', 'one', 'two', 'Error output', 'Traceback', 'ValueError']);
    const errorLines = screen.getAllByTestId('code-run-output-log-line').filter((el) => el.getAttribute('data-level') === 'error');
    expect(errorLines.map((el) => el.textContent)).toEqual(['Traceback', 'ValueError']);
  });

  it('keeps blank lines and does not add one for a trailing newline', () => {
    render(<CodeRunOutput status="succeeded" stdout={'a\n\nb\n'} />);
    expect(lineTexts()).toEqual(['Output', 'a', ' ', 'b']);
  });

  it('says where a stream was cut at the limit', () => {
    render(<CodeRunOutput status="succeeded" stdout="lots" stderr="more" truncated={{ stdout: true, stderr: true }} />);
    expect(screen.getByTestId('code-run-stdout-cut').textContent).toMatch(/Cut at the output limit/);
    expect(screen.getByTestId('code-run-stderr-cut')).toBeTruthy();
    expect(lineTexts().indexOf(screen.getByTestId('code-run-stdout-cut').textContent)).toBeLessThan(lineTexts().indexOf('Error output'));
  });

  it('tells a quiet run what is happening instead of an empty console', () => {
    const { rerender } = render(<CodeRunOutput status="queued" />);
    expect(screen.getByTestId('code-run-output-log-empty').textContent).toBe('Waiting to start.');
    rerender(<CodeRunOutput status="succeeded" />);
    expect(screen.getByTestId('code-run-output-log-empty').textContent).toBe('The program printed nothing.');
  });

  it('shows who ran it, the runtime, time, memory and exit code once known, and the actions at the end', () => {
    const { rerender } = render(
      <CodeRunOutput status="running" runBy="Ada" languageLabel="Python" runtimeVersion="3.12" actions={<button type="button">Cancel</button>} />,
    );
    expect(screen.getByTestId('code-run-output-facts').textContent).toBe('Run by Ada · Python 3.12');
    rerender(
      <CodeRunOutput status="failed" runBy="Run by Ada" languageLabel="Python" exitCode={1} timeMs={420} peakMemoryMb={33.6} actions={<button type="button">Run again</button>} />,
    );
    expect(screen.getByTestId('code-run-output-facts').textContent).toBe('Run by Ada · Python · 420 ms · 34 MB · Exit code 1');
    const header = screen.getByTestId('code-run-output-header');
    expect(header.lastElementChild).toBe(screen.getByTestId('code-run-output-actions'));
    expect(within(header).getByRole('button', { name: 'Run again' })).toBeTruthy();
    rerender(<CodeRunOutput status="succeeded" exitCode={0} timeMs={2345} />);
    expect(screen.getByTestId('code-run-output-facts').textContent).toBe('2.35 s · Exit code 0');
  });

  it('announces the status change, not the lines', () => {
    const { rerender } = render(<CodeRunOutput status="running" stdout="1" />);
    const status = announcer();
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.textContent).toBe('The code is running.');
    expect(screen.getByTestId('code-run-output-log-scroll').getAttribute('aria-live')).toBe('off');
    rerender(<CodeRunOutput status="running" stdout={'1\n2\n3'} />);
    expect(announcer().textContent).toBe('The code is running.');
    // The status chip is not a second live region.
    expect(screen.getAllByRole('status')).toHaveLength(1);
    rerender(<CodeRunOutput status="timed_out" stdout={'1\n2\n3'} />);
    expect(announcer().textContent).toBe('The run took too long and was stopped.');
  });

  it('keeps line keys stable as output grows, so earlier lines are not remounted', () => {
    const { rerender } = render(<CodeRunOutput status="running" stdout="first" />);
    const first = screen.getAllByTestId('code-run-output-log-line')[1];
    rerender(<CodeRunOutput status="running" stdout={'first\nsecond'} />);
    expect(screen.getAllByTestId('code-run-output-log-line')[1]).toBe(first);
  });

  it('draws a frame by default and none when flush', () => {
    const { rerender } = render(<CodeRunOutput status={null} />);
    expect(screen.getByTestId('code-run-output').className).not.toContain('border-0');
    rerender(<CodeRunOutput status={null} variant="flush" data-testid="out" className="h-full" />);
    const root = screen.getByTestId('out');
    expect(root.className).toContain('border-0');
    expect(root.className).toContain('h-full');
  });

  it('imports nothing that loads the editor', () => {
    const source = readFileSync(resolve(import.meta.dirname, '../CodeRunOutput.tsx'), 'utf8');
    const specifiers = [...source.matchAll(/^import[^'"]*['"]([^'"]+)['"]/gm)].map((m) => m[1]);
    expect(specifiers.length).toBeGreaterThan(0);
    for (const s of specifiers) {
      expect(s).not.toMatch(/codemirror|y-codemirror|@lezer|^\.\/CodePad|^\.\/languages|^\.\/theme|^yjs$/);
    }
  });
});
