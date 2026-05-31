import { describe, it, expect } from 'vitest';
import {
  hookDocs,
  hookDocsByGroup,
  getHookDoc,
  HOOK_GROUP_ORDER,
  HOOK_GROUP_LABEL,
} from '../hook-docs';

describe('hook-docs registry', () => {
  it('contains 15 documented hooks', () => {
    expect(hookDocs).toHaveLength(15);
  });

  it('every entry has a non-empty signature and example', () => {
    for (const doc of hookDocs) {
      expect(doc.name).toMatch(/^use[A-Z]/);
      expect(doc.signature.length).toBeGreaterThan(0);
      expect(doc.example.length).toBeGreaterThan(0);
      expect(doc.summary.length).toBeGreaterThan(0);
      expect(doc.description.length).toBeGreaterThan(0);
    }
  });

  it('every entry belongs to a known group', () => {
    for (const doc of hookDocs) {
      expect(HOOK_GROUP_ORDER).toContain(doc.group);
      expect(HOOK_GROUP_LABEL[doc.group]).toBeDefined();
    }
  });

  it('hook names are unique', () => {
    const names = hookDocs.map((d) => d.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('related links point to internal routes', () => {
    for (const doc of hookDocs) {
      for (const link of doc.related) {
        expect(link.to.startsWith('/')).toBe(true);
      }
    }
  });

  it('getHookDoc resolves a known name and returns undefined for an unknown one', () => {
    expect(getHookDoc('useChat')?.group).toBe('realtime');
    expect(getHookDoc('useWebSocket')?.group).toBe('connection');
    expect(getHookDoc('useNotARealHook')).toBeUndefined();
  });

  it('hookDocsByGroup partitions exhaustively across HOOK_GROUP_ORDER', () => {
    const grouped = hookDocsByGroup();
    expect(grouped.map((g) => g.group)).toEqual(HOOK_GROUP_ORDER);
    const total = grouped.reduce((acc, g) => acc + g.docs.length, 0);
    expect(total).toBe(hookDocs.length);
  });
});
