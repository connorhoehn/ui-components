// The call button has four states to express (start / join a named room / in
// call / docked elsewhere), and until `callVariant` existed it had a boolean.
// These tests pin the two things that make the prop safe to adopt: the old
// boolean path is byte-for-byte unchanged when the new props are absent, and
// the in-call state is announced, not just tinted.

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DocumentMeta, Participant } from '../../../types/document';
import DocumentHeader from '../DocumentHeader';
import * as docEditorBarrel from '../index';
import * as videoBarrel from '../../video/index';
// Type-only re-exports have no runtime value to assert, so tsc is the check:
// these aliases fail compilation if a barrel stops exporting the name.
import type { VideoDockSlotProps } from '../index';
import type { CallDockTarget, CallDockDragPayload, CallControlsDensity } from '../../video/index';

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

function setup(overrides: Partial<Props> = {}) {
  const props: Props = {
    meta: baseMeta, mode: 'editor', onModeChange: vi.fn(), participants: [],
    onUpdateMeta: vi.fn(), onExport: vi.fn(), onToggleHistory: vi.fn(),
    onClearDocument: vi.fn(), onToggleVideoCall: vi.fn(), ...overrides,
  };
  return render(<DocumentHeader {...props} />);
}

const callButton = () => screen.getByRole('button', { name: /call/i });

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('DocumentHeader call button — legacy boolean path', () => {
  // REGRESSION PIN. Every existing caller passes only `isCallActive`; if the
  // variant defaulting ever stops deferring to it, their headers change
  // silently. Label AND tone are asserted because either drifting is a break.
  it.each<[boolean | undefined, string, string]>([
    [undefined, 'Call', 'bg-surface'],
    [false, 'Call', 'bg-surface'],
    [true, 'In Call', 'bg-success-bg'],
  ])('isCallActive=%s renders "%s" with the %s tone', (isCallActive, label, tone) => {
    setup({ isCallActive });
    const btn = callButton();
    expect(btn.textContent).toBe(label);
    expect(btn.className).toContain(tone);
  });

  it('still omits the button entirely when onToggleVideoCall is unwired', () => {
    setup({ onToggleVideoCall: undefined, callVariant: 'available' });
    expect(screen.queryByRole('button', { name: /call/i })).toBeNull();
  });
});

describe('DocumentHeader call button — variants', () => {
  it.each<['idle' | 'available' | 'active', string, boolean]>([
    ['idle', 'Call', false],
    ['available', 'Join Call', false],
    ['active', 'In Call', true],
  ])('%s renders "%s" and announces aria-pressed=%s', (callVariant, label, pressed) => {
    setup({ callVariant });
    const btn = callButton();
    expect(btn.textContent).toBe(label);
    expect(btn.getAttribute('aria-pressed')).toBe(String(pressed));
  });

  it('gives each variant its own tone so available never reads as dead', () => {
    const tones = (['idle', 'available', 'active'] as const).map((callVariant) => {
      const { unmount } = setup({ callVariant });
      const cls = callButton().className;
      unmount();
      return cls;
    });
    expect(new Set(tones).size).toBe(3);
    expect(tones[1]).toContain('bg-info-bg');
  });

  it('lets the host name the room while keeping the variant tone', () => {
    setup({ callVariant: 'available', callLabel: 'Join standup' });
    const btn = screen.getByRole('button', { name: 'Join standup' });
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    expect(btn.className).toContain('bg-info-bg');
  });

  // The docked state is the host's word, not a derived one: the widget lives
  // in the gutter but the user is still in the call, so it must stay pressed.
  it('keeps aria-pressed while docked under a custom label', () => {
    setup({ callVariant: 'active', callLabel: 'Docked' });
    expect(screen.getByRole('button', { name: 'Docked' }).getAttribute('aria-pressed')).toBe('true');
  });

  // An explicit variant is the host's considered answer; the boolean is the
  // legacy fallback and must not override it.
  it('prefers callVariant over a contradicting isCallActive', () => {
    setup({ isCallActive: true, callVariant: 'available' });
    expect(callButton().textContent).toBe('Join Call');
  });
});

// These symbols existed but were only reachable by deep import. Assert through
// the barrels so a dropped re-export fails here rather than in a consumer.
describe('barrel re-exports', () => {
  it('doc-editor exposes VideoDockSlot', () => {
    expect(docEditorBarrel.VideoDockSlot).toBeDefined();
  });

  it('video exposes the dock drag-type constant', () => {
    expect(videoBarrel.CALL_DOCK_DRAG_TYPE).toBe('application/x-call-dock');
  });

  it('the dock types are shaped for a host to build a drop handler', () => {
    const target: CallDockTarget = { id: 'gutter', label: 'Document gutter' };
    const payload: CallDockDragPayload = { callId: 'c1', fromDockId: null };
    const density: CallControlsDensity = 'compact';
    const slotProps: Pick<VideoDockSlotProps, 'docked' | 'canAccept'> = { docked: false, canAccept: true };
    expect([target.id, payload.fromDockId, density, slotProps.canAccept])
      .toEqual(['gutter', null, 'compact', true]);
  });
});
