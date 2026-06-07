import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { DocumentMeta, Participant, ViewMode } from '../../../types/document';
import DocumentHeader from '../DocumentHeader';
type Props = Parameters<typeof DocumentHeader>[0];

vi.mock('../ParticipantAvatars', () => ({
  default: ({ participants }: { participants: Participant[] }) => (
    <div data-testid="participant-avatars">{participants.length}</div>
  ),
}));
const baseMeta: DocumentMeta = {
  id: 'd1', title: 'My Doc', sourceType: 'notes', sourceId: 's1',
  createdBy: 'u1', createdAt: '2026-01-01T00:00:00Z', aiModel: 'claude', status: 'draft',
};
const meta = (o: Partial<DocumentMeta> = {}): DocumentMeta => ({ ...baseMeta, ...o });

function setup(overrides: Partial<Props> = {}) {
  const props: Props = {
    meta: meta(), mode: 'editor', onModeChange: vi.fn(), participants: [],
    onUpdateMeta: vi.fn(), onExport: vi.fn(), onToggleHistory: vi.fn(),
    onClearDocument: vi.fn(), onToggleMyItems: vi.fn(), ...overrides,
  };
  return { ...render(<DocumentHeader {...props} />), props };
}
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});
describe('DocumentHeader — title + status', () => {
  it('renders title and fires onUpdateMeta on edit', () => {
    const onUpdateMeta = vi.fn();
    setup({ onUpdateMeta });
    const input = screen.getByPlaceholderText(/Untitled document/) as HTMLInputElement;
    expect(input.value).toBe('My Doc');
    fireEvent.change(input, { target: { value: 'Renamed' } });
    expect(onUpdateMeta).toHaveBeenCalledWith({ title: 'Renamed' });
  });
  it('renders the status text in the badge', () => {
    setup({ meta: meta({ status: 'review' }) });
    expect(screen.getByText('review')).toBeInTheDocument();
  });
  it('renders unknown statuses without crashing (falls back to draft palette)', () => {
    setup({ meta: meta({ status: 'archived' as unknown as DocumentMeta['status'] }) });
    expect(screen.getByText('archived')).toBeInTheDocument();
  });
  it.each<[ViewMode, boolean]>([['editor', true], ['reader', false], ['ack', false]])(
    'shows "Auto-saved" in %s mode → %s',
    (mode, shouldShow) => {
      setup({ mode });
      const hit = screen.queryByText('Auto-saved');
      if (shouldShow) expect(hit).toBeInTheDocument();
      else expect(hit).toBeNull();
    },
  );
});
describe('DocumentHeader — last edited timestamp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-07T12:00:00Z'));
  });
  it.each<[string, string, RegExp]>([
    ['<1m', '2026-06-07T11:59:30Z', /Last edited just now/],
    ['Nm', '2026-06-07T11:45:00Z', /Last edited 15m ago/],
    ['Nh', '2026-06-07T07:00:00Z', /Last edited 5h ago/],
    ['Nd', '2026-06-04T12:00:00Z', /Last edited 3d ago/],
  ])('%s ago', (_label, updatedAt, expected) => {
    setup({ meta: meta({ updatedAt }) });
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});
describe('DocumentHeader — counts + ParticipantAvatars', () => {
  it.each<[number, boolean]>([[0, false], [7, true]])(
    'comment badge with count=%s → visible=%s', (count, visible) => {
      setup({ commentCount: count });
      const hit = screen.queryByText(String(count));
      if (visible) expect(hit).toBeInTheDocument();
      else expect(hit).toBeNull();
    },
  );
  it('omits ParticipantAvatars when none', () => {
    setup();
    expect(screen.queryByTestId('participant-avatars')).toBeNull();
  });
  it('renders ParticipantAvatars when participants exist', () => {
    const p: Participant = {
      clientId: 'c1', userId: 'u1', displayName: 'Alice', color: '#000',
      mode: 'editor', currentSectionId: null,
    };
    setup({ participants: [p] });
    expect(screen.getByTestId('participant-avatars').textContent).toBe('1');
  });
});
describe('DocumentHeader — mode buttons', () => {
  it.each<[ViewMode, string]>([
    ['editor', 'Editor'], ['ack', 'Review'], ['reader', 'Read'],
  ])('clicking %s fires onModeChange(%s)', (mode, label) => {
    const onModeChange = vi.fn();
    setup({ onModeChange });
    fireEvent.click(screen.getByRole('button', { name: label }));
    expect(onModeChange).toHaveBeenCalledWith(mode);
  });
});
describe('DocumentHeader — secondary actions', () => {
  it('shows My Items count > 0 and fires the toggle', () => {
    const onToggleMyItems = vi.fn();
    setup({ myItemCount: 3, onToggleMyItems });
    fireEvent.click(screen.getByRole('button', { name: /My Items \(3\)/ }));
    expect(onToggleMyItems).toHaveBeenCalled();
  });
  it('omits the My Items count when 0', () => {
    setup({ myItemCount: 0 });
    expect(screen.getByRole('button', { name: /My Items/ }).textContent).not.toMatch(/\(\d+\)/);
  });
  it('omits the Call button when onToggleVideoCall is undefined', () => {
    setup();
    expect(screen.queryByRole('button', { name: /^(In )?Call$/ })).toBeNull();
  });
  it.each<[boolean, string]>([[false, 'Call'], [true, 'In Call']])(
    'Call button label when isCallActive=%s → "%s"',
    (isCallActive, label) => {
      setup({ onToggleVideoCall: vi.fn(), isCallActive });
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    },
  );
  it('renders Back only when onBack provided and fires it', () => {
    const onBack = vi.fn();
    setup({ onBack });
    fireEvent.click(screen.getByRole('button', { name: /Documents/ }));
    expect(onBack).toHaveBeenCalled();
  });
  it.each<['draft' | 'final', 'Finalize' | 'Unlock', 'onFinalize' | 'onUnlock']>([
    ['draft', 'Finalize', 'onFinalize'],
    ['final', 'Unlock', 'onUnlock'],
  ])('status %s shows %s button and fires %s', (status, label, handlerKey) => {
    const handler = vi.fn();
    setup({ meta: meta({ status }), [handlerKey]: handler });
    fireEvent.click(screen.getByRole('button', { name: label }));
    expect(handler).toHaveBeenCalled();
  });
});
describe('DocumentHeader — More menu', () => {
  const openMenu = () => fireEvent.click(screen.getByRole('button', { name: '⋯' }));

  it('keeps the menu closed by default', () => {
    setup();
    expect(screen.queryByText('History')).toBeNull();
  });
  it('opens on ⋯ click, revealing History + Export options', () => {
    setup();
    openMenu();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Export Markdown')).toBeInTheDocument();
    expect(screen.getByText('Export Pdf')).toBeInTheDocument();
    expect(screen.getByText('Export Json')).toBeInTheDocument();
  });
  it('History fires onToggleHistory and closes the menu', () => {
    const onToggleHistory = vi.fn();
    setup({ onToggleHistory });
    openMenu();
    fireEvent.click(screen.getByText('History'));
    expect(onToggleHistory).toHaveBeenCalled();
    expect(screen.queryByText('History')).toBeNull();
  });
  it('hides Past Calls when pastCallsCount is 0', () => {
    setup({ onToggleVideoHistory: vi.fn(), pastCallsCount: 0 });
    openMenu();
    expect(screen.queryByText(/Past Calls/)).toBeNull();
  });
  it('shows Past Calls and fires onToggleVideoHistory when count > 0', () => {
    const onToggleVideoHistory = vi.fn();
    setup({ onToggleVideoHistory, pastCallsCount: 4 });
    openMenu();
    fireEvent.click(screen.getByText(/Past Calls \(4\)/));
    expect(onToggleVideoHistory).toHaveBeenCalled();
  });
  it.each<[string, 'markdown' | 'pdf' | 'json']>([
    ['Export Markdown', 'markdown'],
    ['Export Pdf', 'pdf'],
    ['Export Json', 'json'],
  ])('%s fires onExport(%s)', (label, format) => {
    const onExport = vi.fn();
    setup({ onExport });
    openMenu();
    fireEvent.click(screen.getByText(label));
    expect(onExport).toHaveBeenCalledWith(format);
  });
  it.each<[boolean, number]>([[true, 1], [false, 0]])(
    'Clear Document — confirm=%s → onClearDocument called %s time(s)',
    (confirmed, callCount) => {
      const onClearDocument = vi.fn();
      vi.spyOn(window, 'confirm').mockReturnValue(confirmed);
      setup({ onClearDocument });
      openMenu();
      fireEvent.click(screen.getByText('Clear Document'));
      expect(onClearDocument).toHaveBeenCalledTimes(callCount);
    },
  );
});
