import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useA2ASession } from '../useA2ASession';
import type { AgentDefinition } from '../../../../types/agents';

const ALICE: AgentDefinition = {
  id: 'alice',
  name: 'Alice',
  status: 'healthy',
  protocol: 'a2a',
  model: 'claude-sonnet-4-6',
  tools: [],
  guardrails: [],
  endpoint: 'https://example/alice',
};

const BOB: AgentDefinition = {
  ...ALICE,
  id: 'bob',
  name: 'Bob',
  endpoint: 'https://example/bob',
};

describe('useA2ASession', () => {
  it('starts inactive when no initial participants are provided', () => {
    const { result } = renderHook(() => useA2ASession());

    expect(result.current.session).toBeNull();
    expect(result.current.messages).toEqual([]);
    expect(result.current.isActive).toBe(false);
  });

  it('auto-starts a session when initial participants are provided', () => {
    const { result } = renderHook(() =>
      useA2ASession({ participants: [ALICE, BOB] }),
    );

    expect(result.current.session).not.toBeNull();
    expect(result.current.session?.participants).toEqual([ALICE, BOB]);
    expect(result.current.session?.status).toBe('active');
    expect(result.current.session?.messages).toEqual([]);
    expect(result.current.isActive).toBe(true);
  });

  it('startSession creates a new session with a unique id', () => {
    const { result } = renderHook(() => useA2ASession());

    act(() => {
      result.current.startSession([ALICE]);
    });
    const firstId = result.current.session?.sessionId;
    expect(firstId).toMatch(/^a2a-/);
    expect(result.current.session?.startedAt).toEqual(
      expect.stringMatching(/\d{4}-\d{2}-\d{2}T/),
    );

    act(() => {
      result.current.startSession([ALICE, BOB]);
    });
    expect(result.current.session?.sessionId).not.toBe(firstId);
    expect(result.current.session?.participants).toHaveLength(2);
    expect(result.current.messages).toEqual([]);
  });

  it('sendMessage appends to messages and the session message log', () => {
    const { result } = renderHook(() =>
      useA2ASession({ participants: [ALICE, BOB] }),
    );

    act(() => {
      result.current.sendMessage('alice', 'bob', 'hello');
    });
    act(() => {
      result.current.sendMessage('bob', 'alice', 'hi back');
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0]).toMatchObject({
      from: 'alice',
      to: 'bob',
      content: 'hello',
      protocol: 'a2a',
    });
    expect(result.current.messages[0].id).toMatch(/^msg-/);
    expect(result.current.session?.messages).toEqual(result.current.messages);
  });

  it('sendMessage is a no-op when no session is active', () => {
    const { result } = renderHook(() => useA2ASession());

    act(() => {
      result.current.sendMessage('alice', 'bob', 'lost in the void');
    });

    expect(result.current.messages).toEqual([]);
    expect(result.current.session).toBeNull();
  });

  it('endSession marks the session as completed and clears isActive', () => {
    const { result } = renderHook(() =>
      useA2ASession({ participants: [ALICE] }),
    );
    expect(result.current.isActive).toBe(true);

    act(() => {
      result.current.endSession();
    });

    expect(result.current.session?.status).toBe('completed');
    expect(result.current.isActive).toBe(false);
  });
});
