import { cleanup, createEvent, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { VersionEntry, SnapshotSection } from '../../../hooks/useVersionHistory';
import VersionHistoryPanel from '../VersionHistoryPanel';

afterEach(cleanup);
const noop = () => {};

function entry(overrides: Partial<VersionEntry> = {}): VersionEntry {
  return { timestamp: 1000, age: 5_000, ...overrides };
}

function section(overrides: Partial<SnapshotSection> = {}): SnapshotSection {
  return { id: 's1', type: 'section', title: 'Intro', textContent: '', items: [], ...overrides };
}

function panel(overrides: Partial<React.ComponentProps<typeof VersionHistoryPanel>> = {}) {
  return (
    <VersionHistoryPanel
      versions={[]} loading={false} previewTimestamp={null}
      onFetch={noop} onPreview={noop} onClearPreview={noop} onClose={noop}
      onSaveVersion={noop} onCompare={noop} onClearCompare={noop}
      compareSections={null} compareTimestamp={null} currentSections={[]}
      {...overrides}
    />
  );
}

describe('VersionHistoryPanel — header + empty states', () => {
  it('shows the loading placeholder when loading', () => {
    render(panel({ loading: true }));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('No saved versions yet')).toBeNull();
  });

  it('shows empty banner + title + Save Version action when idle with no versions', () => {
    render(panel());
    expect(screen.getByText('No saved versions yet')).toBeInTheDocument();
    expect(screen.getByText('Version History')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Version' })).toBeInTheDocument();
  });
});

describe('VersionHistoryPanel — version rows', () => {
  it('formats relative time across seconds, minutes, hours, days', () => {
    render(panel({
      versions: [
        entry({ timestamp: 1, age: 30 * 1000 }),
        entry({ timestamp: 2, age: 5 * 60_000 }),
        entry({ timestamp: 3, age: 3 * 3_600_000 }),
        entry({ timestamp: 4, age: 2 * 86_400_000 }),
      ],
    }));
    expect(screen.getByText('30s ago')).toBeInTheDocument();
    expect(screen.getByText('5 min ago')).toBeInTheDocument();
    expect(screen.getByText('3 hours ago')).toBeInTheDocument();
    expect(screen.getByText('2 days ago')).toBeInTheDocument();
  });

  it('renders name + author and suppresses the manual type badge', () => {
    render(panel({ versions: [entry({ name: 'Pre-launch', author: 'Alice', type: 'manual' })] }));
    expect(screen.getByText('Pre-launch')).toBeInTheDocument();
    expect(screen.getByText('by Alice')).toBeInTheDocument();
    expect(screen.queryByText('Auto-save')).toBeNull();
    expect(screen.queryByText('Before restore')).toBeNull();
  });

  it('renders Auto-save and Before-restore type badges', () => {
    render(panel({ versions: [entry({ timestamp: 1, type: 'auto' }), entry({ timestamp: 2, type: 'pre-restore' })] }));
    expect(screen.getByText('Auto-save')).toBeInTheDocument();
    expect(screen.getByText('Before restore')).toBeInTheDocument();
  });
});

describe('VersionHistoryPanel — preview + compare interactions', () => {
  it('calls onPreview with the row timestamp when a version row is clicked', () => {
    const onPreview = vi.fn();
    render(panel({ versions: [entry({ timestamp: 42 })], onPreview }));
    fireEvent.click(screen.getByText('5s ago'));
    expect(onPreview).toHaveBeenCalledWith(42);
  });

  it('shows Compare on inactive rows, Hide Diff on the active row, and toggles via onClearCompare', () => {
    const onClearCompare = vi.fn();
    render(panel({
      versions: [entry({ timestamp: 1 }), entry({ timestamp: 2 })],
      compareTimestamp: 2,
      onClearCompare,
    }));
    expect(screen.getByRole('button', { name: 'Compare' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide Diff' }));
    expect(onClearCompare).toHaveBeenCalledTimes(1);
  });

  it('Compare click fires onCompare and does NOT trigger preview (stopPropagation)', () => {
    const onPreview = vi.fn();
    const onCompare = vi.fn();
    render(panel({ versions: [entry({ timestamp: 9 })], onPreview, onCompare }));
    fireEvent.click(screen.getByRole('button', { name: 'Compare' }));
    expect(onCompare).toHaveBeenCalledWith(9);
    expect(onPreview).not.toHaveBeenCalled();
  });
});

describe('VersionHistoryPanel — close + save version', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('Close routes through onClearPreview + onClearCompare + onClose in order', () => {
    const calls: string[] = [];
    render(panel({
      onClose: () => calls.push('close'),
      onClearPreview: () => calls.push('clearPreview'),
      onClearCompare: () => calls.push('clearCompare'),
    }));
    fireEvent.click(screen.getByRole('button', { name: 'Close panel' }));
    expect(calls).toEqual(['clearPreview', 'clearCompare', 'close']);
  });

  it('Save Version prompts and forwards the trimmed name', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('  Tagged v1  ');
    const onSaveVersion = vi.fn();
    render(panel({ onSaveVersion }));
    fireEvent.click(screen.getByRole('button', { name: 'Save Version' }));
    expect(onSaveVersion).toHaveBeenCalledWith('Tagged v1');
  });

  it('Save Version does NOT fire onSaveVersion when prompt is cancelled or blank', () => {
    const promptSpy = vi.spyOn(window, 'prompt').mockReturnValue(null);
    const onSaveVersion = vi.fn();
    render(panel({ onSaveVersion }));
    fireEvent.click(screen.getByRole('button', { name: 'Save Version' }));
    promptSpy.mockReturnValue('   ');
    fireEvent.click(screen.getByRole('button', { name: 'Save Version' }));
    expect(onSaveVersion).not.toHaveBeenCalled();
  });
});

describe('VersionHistoryPanel — DiffViewer + Restore', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('renders DiffViewer only when compareSections is non-null', () => {
    const { rerender } = render(panel({ compareSections: null }));
    expect(screen.queryByRole('button', { name: /Dismiss/ })).toBeNull();
    rerender(panel({ compareSections: [section()], compareTimestamp: 1, currentSections: [section()] }));
    expect(screen.getByRole('button', { name: /Dismiss/ })).toBeInTheDocument();
  });

  it('omits Restore unless both onRestore and a compareTimestamp are present', () => {
    const { rerender } = render(panel({ compareTimestamp: 1 }));
    expect(screen.queryByRole('button', { name: 'Restore this version' })).toBeNull();
    rerender(panel({ onRestore: noop, compareTimestamp: null }));
    expect(screen.queryByRole('button', { name: 'Restore this version' })).toBeNull();
  });

  it('Restore confirms then routes onRestore(timestamp) + onClearCompare', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const onRestore = vi.fn();
    const onClearCompare = vi.fn();
    render(panel({ onRestore, onClearCompare, compareTimestamp: 555 }));
    fireEvent.click(screen.getByRole('button', { name: 'Restore this version' }));
    expect(onRestore).toHaveBeenCalledWith(555);
    expect(onClearCompare).toHaveBeenCalledTimes(1);
  });

  it('Restore cancel leaves both onRestore and onClearCompare untouched', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const onRestore = vi.fn();
    const onClearCompare = vi.fn();
    render(panel({ onRestore, onClearCompare, compareTimestamp: 555 }));
    fireEvent.click(screen.getByRole('button', { name: 'Restore this version' }));
    expect(onRestore).not.toHaveBeenCalled();
    expect(onClearCompare).not.toHaveBeenCalled();
  });
});

// REGRESSION: the version row was a bare <div> with onClick. Only the nested
// "Compare" button was focusable, so a keyboard user could never preview a
// version — and Space on the row scrolled the panel instead of previewing.
describe('VersionHistoryPanel — version row keyboard activation', () => {
  it('previews the version on Enter', () => {
    const onPreview = vi.fn();
    render(panel({ versions: [entry({ timestamp: 1, age: 30 * 1000 })], onPreview }));

    const row = screen.getByRole('button', { name: /30s ago/ });
    expect(row).toHaveAttribute('tabindex', '0');
    row.focus();
    expect(row).toHaveFocus();

    fireEvent.keyDown(row, { key: 'Enter' });
    expect(onPreview).toHaveBeenCalledWith(1);
  });

  it('previews the version on Space and prevents the page from scrolling', () => {
    const onPreview = vi.fn();
    render(panel({ versions: [entry({ timestamp: 7, age: 30 * 1000 })], onPreview }));

    const row = screen.getByRole('button', { name: /30s ago/ });
    const ev = createEvent.keyDown(row, { key: ' ' });
    fireEvent(row, ev);

    expect(onPreview).toHaveBeenCalledWith(7);
    expect(ev.defaultPrevented).toBe(true);
  });

  it('leaves the nested Compare button as the only handler for its own keys', () => {
    const onPreview = vi.fn();
    const onCompare = vi.fn();
    render(panel({ versions: [entry({ timestamp: 3, age: 30 * 1000 })], onPreview, onCompare }));

    fireEvent.click(screen.getByRole('button', { name: 'Compare' }));
    expect(onCompare).toHaveBeenCalledWith(3);
    expect(onPreview).not.toHaveBeenCalled();
  });
});
