// frontend/src/hooks/useIngestProgress.ts
//
// Real-time ingest sync progress hook. Subscribes to the `ingest:progress`
// WebSocket channel and maintains a rolling buffer of events plus a map of
// currently active syncs.

import { useState, useEffect, useRef, useCallback } from 'react';
import { useWebSocketContext } from '../contexts/WebSocketContext';
import type { GatewayMessage } from '../types/gateway';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface IngestProgressEvent {
  type: string;
  timestamp: string;
  [key: string]: unknown;
}

export interface ActiveSync {
  sourceId: string;
  sourceName: string;
  fileCount: number;
  filesFetched: number;
  itemsMapped: number;
  itemsMaterialized: number;
  startedAt: string;
}

export interface UseIngestProgressResult {
  events: IngestProgressEvent[];
  activeSyncs: Map<string, ActiveSync>;
  clearEvents: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CHANNEL_ID = 'ingest:progress';
const MAX_EVENTS = 50;

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useIngestProgress(): UseIngestProgressResult {
  const { sendMessage, onMessage, connectionState } = useWebSocketContext();

  const [events, setEvents] = useState<IngestProgressEvent[]>([]);
  const [activeSyncs, setActiveSyncs] = useState<Map<string, ActiveSync>>(
    () => new Map(),
  );

  // Refs for stable access inside effects
  const sendMessageRef = useRef(sendMessage);
  useEffect(() => { sendMessageRef.current = sendMessage; }, [sendMessage]);

  // ---- Message handler ----------------------------------------------------
  useEffect(() => {
    const unregister = onMessage((msg: GatewayMessage) => {
      const msgType = (msg.type ?? '') as string;

      // Only process messages on the ingest:progress channel or with
      // recognised ingest event type prefixes (sync.* / item.*).
      const isIngestChannel = msg.channel === CHANNEL_ID;
      const isIngestType = msgType.startsWith('sync.') || msgType.startsWith('item.');
      if (!isIngestChannel && !isIngestType) return;

      const { type: _msgTypeRaw, ...msgRest } = msg as any;
      const event: IngestProgressEvent = {
        ...msgRest,
        type: msgType,
        timestamp: (msg.timestamp as string) ?? new Date().toISOString(),
      };

      // Append to rolling event buffer
      setEvents((prev) => [...prev, event].slice(-MAX_EVENTS));

      // Update active syncs based on event type
      const sourceId = (msg.sourceId ?? msg.source_id ?? '') as string;

      if (msgType === 'sync.started' && sourceId) {
        setActiveSyncs((prev) => {
          const next = new Map(prev);
          next.set(sourceId, {
            sourceId,
            sourceName: (msg.sourceName as string) ?? (msg.source_name as string) ?? sourceId,
            fileCount: (msg.fileCount as number) ?? 0,
            filesFetched: 0,
            itemsMapped: 0,
            itemsMaterialized: 0,
            startedAt: event.timestamp,
          });
          return next;
        });
      } else if (msgType === 'sync.progress' && sourceId) {
        setActiveSyncs((prev) => {
          const existing = prev.get(sourceId);
          if (!existing) return prev;
          const next = new Map(prev);
          next.set(sourceId, {
            ...existing,
            fileCount: (msg.fileCount as number) ?? existing.fileCount,
            filesFetched: (msg.filesFetched as number) ?? existing.filesFetched,
          });
          return next;
        });
      } else if (msgType === 'sync.completed' && sourceId) {
        setActiveSyncs((prev) => {
          const next = new Map(prev);
          next.delete(sourceId);
          return next;
        });
      } else if (msgType === 'sync.failed' && sourceId) {
        setActiveSyncs((prev) => {
          const next = new Map(prev);
          next.delete(sourceId);
          return next;
        });
      } else if (msgType === 'item.mapped' && sourceId) {
        setActiveSyncs((prev) => {
          const existing = prev.get(sourceId);
          if (!existing) return prev;
          const next = new Map(prev);
          next.set(sourceId, {
            ...existing,
            itemsMapped: existing.itemsMapped + 1,
          });
          return next;
        });
      } else if (msgType === 'item.materialized' && sourceId) {
        setActiveSyncs((prev) => {
          const existing = prev.get(sourceId);
          if (!existing) return prev;
          const next = new Map(prev);
          next.set(sourceId, {
            ...existing,
            itemsMaterialized: existing.itemsMaterialized + 1,
          });
          return next;
        });
      } else if (msgType === 'item.failed' && sourceId) {
        setActiveSyncs((prev) => {
          const existing = prev.get(sourceId);
          if (!existing) return prev;
          const next = new Map(prev);
          next.set(sourceId, {
            ...existing,
            filesFetched: existing.filesFetched + 1,
          });
          return next;
        });
      }
    });

    return unregister;
  }, [onMessage]);

  // ---- Subscribe / unsubscribe on connect ---------------------------------
  useEffect(() => {
    if (connectionState !== 'connected') return;

    sendMessageRef.current({
      service: 'ingest',
      action: 'subscribe',
      channelId: CHANNEL_ID,
    });

    return () => {
      sendMessageRef.current({
        service: 'ingest',
        action: 'unsubscribe',
        channelId: CHANNEL_ID,
      });
    };
  }, [connectionState]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- clearEvents --------------------------------------------------------
  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return { events, activeSyncs, clearEvents };
}
