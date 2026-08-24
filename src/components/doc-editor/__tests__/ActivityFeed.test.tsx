import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ActivityFeed from '../ActivityFeed';
import type { ActivityEvent } from '../../../hooks/useActivityBus';
import type { Participant } from '../../../types/document';

function mkEvent(overrides: Partial<ActivityEvent> = {}): ActivityEvent {
  return {
    id: 'e1',
    eventType: 'doc.ack',
    detail: {},
    timestamp: '2026-06-07T12:00:00Z',
    userId: 'u1',
    displayName: 'Jane Doe',
    color: '#f00',
    source: 'local',
    ...overrides,
  };
}

function mkParticipant(overrides: Partial<Participant> = {}): Participant {
  return {
    clientId: 'c1',
    userId: 'u1',
    displayName: 'Jane Doe',
    color: '#f00',
    mode: 'editor',
    currentSectionId: null,
    ...overrides,
  };
}

// The collapse/expand header is a real <button> (disclosure) — see the
// REGRESSION test at the bottom of this file.
const header = () => screen.getByRole('button', { name: /Activity/ });

describe('ActivityFeed', () => {
  it('renders expanded by default with ▼ marker and no count chip when events are empty', () => {
    render(<ActivityFeed events={[]} participants={[]} />);
    expect(screen.getByText('▼')).toBeInTheDocument();
    expect(screen.queryByText('▶')).not.toBeInTheDocument();
    expect(screen.queryByText(/\(\d+\)/)).not.toBeInTheDocument();
  });

  it('shows "(N)" count chip when events is non-empty', () => {
    render(<ActivityFeed events={[mkEvent(), mkEvent({ id: 'e2' })]} participants={[]} />);
    expect(screen.getByText(/\(2\)/)).toBeInTheDocument();
  });

  it('clicking the header collapses to ▶ and hides participant bar + entries', () => {
    render(<ActivityFeed events={[mkEvent()]} participants={[mkParticipant()]} />);
    expect(screen.getByText('Active:')).toBeInTheDocument();
    fireEvent.click(header());
    expect(screen.getByText('▶')).toBeInTheDocument();
    expect(screen.queryByText('Active:')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
  });

  it('clicking the header twice returns to expanded', () => {
    render(<ActivityFeed events={[mkEvent()]} participants={[]} />);
    fireEvent.click(header());
    fireEvent.click(header());
    expect(screen.getByText('▼')).toBeInTheDocument();
  });

  it('hides "Active:" bar when participants is empty', () => {
    render(<ActivityFeed events={[mkEvent()]} participants={[]} />);
    expect(screen.queryByText('Active:')).not.toBeInTheDocument();
  });

  it('renders one Active: chip per participant with mode label', () => {
    render(<ActivityFeed events={[]} participants={[
      mkParticipant({ clientId: 'a', displayName: 'Alice', mode: 'editor' }),
      mkParticipant({ clientId: 'b', displayName: 'Bob', mode: 'reviewer' }),
    ]} />);
    expect(screen.getByText(/Alice \(editing\)/)).toBeInTheDocument();
    expect(screen.getByText(/Bob \(reviewing\)/)).toBeInTheDocument();
  });

  it('maps modeLabel: editor/reviewer/reader/fallback', () => {
    const { rerender } = render(<ActivityFeed events={[]} participants={[mkParticipant({ mode: 'reader' })]} />);
    expect(screen.getByText(/\(reading\)/)).toBeInTheDocument();
    rerender(<ActivityFeed events={[]} participants={[mkParticipant({ mode: 'unknown' as Participant['mode'] })]} />);
    expect(screen.getByText(/\(online\)/)).toBeInTheDocument();
  });

  it('renders empty state when events is empty', () => {
    render(<ActivityFeed events={[]} participants={[]} />);
    expect(screen.getByText(/No activity yet/)).toBeInTheDocument();
  });

  it('renders one row per event with initials avatar', () => {
    render(<ActivityFeed events={[
      mkEvent({ id: 'e1', displayName: 'Jane Doe' }),
      mkEvent({ id: 'e2', displayName: 'Alice' }),
    ]} participants={[]} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('falls back to "Unknown" → "U" initials when displayName is missing', () => {
    render(<ActivityFeed events={[mkEvent({ displayName: undefined })]} participants={[]} />);
    expect(screen.getByText('U')).toBeInTheDocument();
    expect(screen.getAllByText('Unknown').length).toBeGreaterThan(0);
  });

  it('icon mapping covers ack/reject/add/comment/join/leave/pipeline/unknown', () => {
    const events: ActivityEvent[] = [
      mkEvent({ id: '1', eventType: 'doc.ack' }),
      mkEvent({ id: '2', eventType: 'doc.reject' }),
      mkEvent({ id: '3', eventType: 'doc.add_item' }),
      mkEvent({ id: '4', eventType: 'doc.comment' }),
      mkEvent({ id: '5', eventType: 'presence.join' }),
      mkEvent({ id: '6', eventType: 'presence.leave' }),
      mkEvent({ id: '7', eventType: 'pipeline.run.completed' }),
      mkEvent({ id: '8', eventType: 'totally.unknown' }),
    ];
    render(<ActivityFeed events={events} participants={[]} />);
    const body = document.body.textContent || '';
    expect(body).toContain('✅');
    expect(body).toContain('❌');
    expect(body).toContain('➕');
    expect(body).toContain('💬');
    expect(body).toContain('🟢');
    expect(body).toContain('🔴');
    expect(body).toContain('✓');
    expect(body).toContain('•');
  });

  it('doc.ack description interpolates itemText and " in <documentTitle>" when set', () => {
    render(<ActivityFeed events={[
      mkEvent({ id: 'a', eventType: 'doc.ack', detail: { itemText: 'Sign waiver', documentTitle: 'Onboarding' } }),
      mkEvent({ id: 'b', eventType: 'doc.ack', detail: { itemText: 'Send invite' } }),
    ]} participants={[]} />);
    expect(screen.getByText(/acknowledged "Sign waiver" in Onboarding/)).toBeInTheDocument();
    const second = screen.getByText(/acknowledged "Send invite"/);
    expect(second.textContent).not.toContain(' in ');
  });

  it('pipeline.run.completed includes duration when present and omits when absent', () => {
    render(<ActivityFeed events={[
      mkEvent({ id: 'a', eventType: 'pipeline.run.completed', detail: { durationMs: 1234 } }),
      mkEvent({ id: 'b', eventType: 'pipeline.run.completed', detail: {} }),
    ]} participants={[]} />);
    expect(screen.getByText(/pipeline run completed in 1234ms/)).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent?.trim() === '✓ pipeline run completed')).toBeInTheDocument();
  });

  it('pipeline.run.failed appends error or falls back to "unknown error"', () => {
    render(<ActivityFeed events={[
      mkEvent({ id: 'a', eventType: 'pipeline.run.failed', detail: { error: 'OOM' } }),
      mkEvent({ id: 'b', eventType: 'pipeline.run.failed', detail: {} }),
    ]} participants={[]} />);
    expect(screen.getByText(/pipeline run failed: OOM/)).toBeInTheDocument();
    expect(screen.getByText(/pipeline run failed: unknown error/)).toBeInTheDocument();
  });

  it('unknown event with detail.description uses that string', () => {
    render(<ActivityFeed events={[
      mkEvent({ eventType: 'totally.custom', detail: { description: 'did a thing' } }),
    ]} participants={[]} />);
    expect(screen.getByText(/did a thing/)).toBeInTheDocument();
  });

  it('unknown event without detail.description falls back to the eventType', () => {
    render(<ActivityFeed events={[
      mkEvent({ eventType: 'totally.custom', detail: {} }),
    ]} participants={[]} />);
    expect(screen.getByText(/totally\.custom/)).toBeInTheDocument();
  });

  it('renders a timestamp string in the event row', () => {
    render(<ActivityFeed events={[mkEvent({ timestamp: '2026-06-07T12:34:56Z' })]} participants={[]} />);
    expect(screen.getAllByText(/\d{1,2}:\d{2}/).length).toBeGreaterThan(0);
  });

  // REGRESSION: the collapse/expand header was a <div> with onClick — not
  // focusable, no role, and no aria-expanded, so a keyboard or screen-reader
  // user could neither collapse the panel nor tell whether it was collapsed.
  it('exposes the header as a disclosure button with aria-expanded', () => {
    render(<ActivityFeed events={[mkEvent()]} participants={[mkParticipant()]} />);

    const btn = header();
    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn).toHaveAttribute('aria-expanded', 'true');

    // A <div> header cannot take focus; a <button> can.
    btn.focus();
    expect(btn).toHaveFocus();

    fireEvent.click(btn);
    expect(header()).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Active:')).not.toBeInTheDocument();
  });
});
