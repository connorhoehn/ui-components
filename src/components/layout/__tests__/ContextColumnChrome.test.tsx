import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContextColumn } from '../ContextColumn';
import Drawer from '../../shared/Drawer';

const panels = [
  { id: 'chat', label: 'Chat', icon: <span />, content: <p>chat</p> },
  { id: 'start', label: 'Start a call', icon: <span />, chrome: 'bare' as const, width: 'drawer-wide' as const, content: <p>start</p> },
  { id: 'settings', label: 'Call settings', icon: <span />, chrome: 'bare' as const, width: 'drawer' as const, content: <p>settings</p> },
];

describe('ContextColumn per-panel chrome and width', () => {
  it('keeps the tab row for an ordinary panel', () => {
    render(<ContextColumn state="open" onStateChange={() => {}} panels={panels} activeId="chat" onActivate={() => {}} />);
    expect(screen.getByTestId('context-column-header')).toBeTruthy();
    expect(screen.getByTestId('context-column').className).toContain('w-80');
  });

  it('drops the tab row for a bare panel and takes its width', () => {
    const { rerender } = render(<ContextColumn state="open" onStateChange={() => {}} panels={panels} activeId="start" onActivate={() => {}} />);
    const col = screen.getByTestId('context-column');
    expect(screen.queryByTestId('context-column-header')).toBeNull();
    expect(col.getAttribute('data-chrome')).toBe('bare');
    expect(col.className).toContain('w-[360px]');
    expect(col.className).toContain('min-[1440px]:w-[400px]');
    expect(screen.getByText('start')).toBeTruthy();
    rerender(<ContextColumn state="open" onStateChange={() => {}} panels={panels} activeId="settings" onActivate={() => {}} />);
    expect(screen.getByTestId('context-column').className).toContain('min-[1440px]:w-[380px]');
  });
});

describe('Drawer docked', () => {
  it('never outgrows its column and takes the class hooks', () => {
    render(
      <Drawer open docked width={400} onClose={() => {}} title="Start a call" headerClassName="border-b-0" titleClassName="text-lg" closeTestId="x" data-testid="d">
        body
      </Drawer>,
    );
    const d = screen.getByTestId('d');
    expect(d.className).toContain('max-w-full');
    expect(screen.getByText('Start a call').className).toContain('text-lg');
    expect(screen.getByTestId('x')).toBeTruthy();
  });
});
