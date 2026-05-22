// src/integrations/realtime-modules/__tests__/notification-adapter.test.ts

import { describe, it, expect } from 'vitest';
import { adaptNotification, adaptNotifications } from '../adapters';
import type { RMNotificationEntry } from '../types';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const TS = '2026-05-22T10:00:00.000Z';

const rmNotification: RMNotificationEntry = {
  id: 'notif-1',
  type: 'mention',
  title: 'Alice mentioned you',
  body: 'In channel #general',
  timestamp: TS,
  read: false,
  channel: 'general',
  payload: { action: 'view', icon: '💬' },
};

// ---------------------------------------------------------------------------
// adaptNotification
// ---------------------------------------------------------------------------

describe('adaptNotification', () => {
  it('preserves required fields: id, title, timestamp', () => {
    const result = adaptNotification(rmNotification);
    expect(result.id).toBe('notif-1');
    expect(result.title).toBe('Alice mentioned you');
    expect(result.timestamp).toBe(TS);
  });

  it('preserves optional body', () => {
    const result = adaptNotification(rmNotification);
    expect(result.body).toBe('In channel #general');
  });

  it('maps type → category', () => {
    const result = adaptNotification(rmNotification);
    expect(result.category).toBe('mention');
  });

  it('preserves read flag when set to false', () => {
    const result = adaptNotification(rmNotification);
    expect(result.read).toBe(false);
  });

  it('preserves read flag when set to true', () => {
    const result = adaptNotification({ ...rmNotification, read: true });
    expect(result.read).toBe(true);
  });

  it('defaults read to false when undefined', () => {
    const noRead: RMNotificationEntry = { ...rmNotification, read: undefined };
    const result = adaptNotification(noRead);
    expect(result.read).toBe(false);
  });

  it('lifts icon from payload.icon when it is a string', () => {
    const result = adaptNotification(rmNotification);
    expect(result.icon).toBe('💬');
  });

  it('leaves icon undefined when payload has no icon', () => {
    const noIcon: RMNotificationEntry = {
      ...rmNotification,
      payload: { action: 'view' },
    };
    const result = adaptNotification(noIcon);
    expect(result.icon).toBeUndefined();
  });

  it('leaves icon undefined when payload is absent', () => {
    const noPayload: RMNotificationEntry = { ...rmNotification, payload: undefined };
    const result = adaptNotification(noPayload);
    expect(result.icon).toBeUndefined();
  });

  it('handles missing optional body', () => {
    const noBody: RMNotificationEntry = { ...rmNotification, body: undefined };
    const result = adaptNotification(noBody);
    expect(result.body).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// adaptNotifications
// ---------------------------------------------------------------------------

describe('adaptNotifications', () => {
  it('returns empty array for empty input', () => {
    expect(adaptNotifications([])).toEqual([]);
  });

  it('maps each entry in order', () => {
    const entries: RMNotificationEntry[] = [
      rmNotification,
      { ...rmNotification, id: 'notif-2', title: 'Second notification', type: 'alert' },
    ];
    const results = adaptNotifications(entries);
    expect(results).toHaveLength(2);
    expect(results[0].id).toBe('notif-1');
    expect(results[1].id).toBe('notif-2');
    expect(results[1].category).toBe('alert');
  });

  it('applies default read=false to all entries without read', () => {
    const entries: RMNotificationEntry[] = [
      { ...rmNotification, id: 'a', read: undefined },
      { ...rmNotification, id: 'b', read: undefined },
    ];
    const results = adaptNotifications(entries);
    expect(results[0].read).toBe(false);
    expect(results[1].read).toBe(false);
  });
});
