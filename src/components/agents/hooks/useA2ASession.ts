import { useState, useCallback, useRef } from 'react';
import type { A2AMessage, A2ASession, AgentDefinition } from '../../../types/agents';

interface UseA2ASessionOptions {
  baseUrl?: string;
  participants?: AgentDefinition[];
}

interface UseA2ASessionReturn {
  session: A2ASession | null;
  messages: A2AMessage[];
  isActive: boolean;
  startSession: (participants: AgentDefinition[]) => void;
  sendMessage: (from: string, to: string, content: string) => void;
  endSession: () => void;
}

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useA2ASession({
  baseUrl: _baseUrl,
  participants: initialParticipants,
}: UseA2ASessionOptions = {}): UseA2ASessionReturn {
  const [session, setSession] = useState<A2ASession | null>(null);
  const [messages, setMessages] = useState<A2AMessage[]>([]);
  const sessionIdRef = useRef<string | null>(null);

  const startSession = useCallback((participants: AgentDefinition[]) => {
    const id = `a2a-${createId()}`;
    sessionIdRef.current = id;
    const newSession: A2ASession = {
      sessionId: id,
      participants,
      messages: [],
      startedAt: new Date().toISOString(),
      status: 'active',
    };
    setSession(newSession);
    setMessages([]);
  }, []);

  const sendMessage = useCallback(
    (from: string, to: string, content: string) => {
      if (!session) return;

      const msg: A2AMessage = {
        id: `msg-${createId()}`,
        from,
        to,
        content,
        protocol: 'a2a',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, msg]);
      setSession((prev) =>
        prev ? { ...prev, messages: [...prev.messages, msg] } : prev,
      );
    },
    [session],
  );

  const endSession = useCallback(() => {
    setSession((prev) => (prev ? { ...prev, status: 'completed' } : prev));
    sessionIdRef.current = null;
  }, []);

  // Initialize with participants if provided
  if (initialParticipants && !session) {
    startSession(initialParticipants);
  }

  return {
    session,
    messages,
    isActive: session?.status === 'active',
    startSession,
    sendMessage,
    endSession,
  };
}
