// frontend/src/types/gateway.ts

import type { PipelineEventMap } from './pipeline';

/** Connection lifecycle states */
export type ConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected';

/** Error received from the gateway (matches server error-codes.js format) */
export interface GatewayError {
  /** Standardized error code (e.g. AUTH_TOKEN_EXPIRED, AUTHZ_CHANNEL_DENIED) */
  code: string;
  /** Human-readable description for display */
  message: string;
  timestamp: string;
}

/** A raw message received over the WebSocket */
export interface GatewayMessage {
  type: string;       // e.g. 'session', 'chat', 'presence', 'cursor', 'reaction', 'error'
  action?: string;    // e.g. 'joined', 'sent', 'message'
  channel?: string;
  error?: GatewayError;
  [key: string]: unknown;
}

/** Server welcome message (type === 'session') */
export interface SessionMessage extends GatewayMessage {
  type: 'session';
  clientId: string;
  sessionToken: string;
  restored: boolean;
}

/**
 * Wire-form event type carried on the gateway's `pipeline:event` frame.
 *
 * Most events use the same name on the wire as in `PipelineEventMap` (the
 * gateway bridge canonicalises distributed-core's colon-form `:` to dot-form
 * `.` to align with the in-app map keys). One known divergence:
 *
 *  - `pipeline.run.resume-from-step` (wire, kebab) ↔
 *    `pipeline.run.resumeFromStep` (in-app, camel)
 *
 * The kebab form is the canonical wire name post-DC-deprecation-window
 * (hub#2209). `WebSocketEventAdapter` normalises it back to the camelCase
 * in-app key before dispatch, so subscribers continue to key on
 * `PipelineEventMap`. The type below admits both shapes so that frame
 * decoders don't fail typecheck on receipt of the kebab form.
 */
export type PipelineWireEventType = keyof PipelineEventMap | 'pipeline.run.resume-from-step';

/** Pipeline event frame received via WebSocket (type === 'pipeline:event') */
export interface PipelineEventFrame extends GatewayMessage {
  type: 'pipeline:event';
  eventType: PipelineWireEventType;
  payload: unknown;
  seq?: number;
  sourceNodeId?: string;
  emittedAt?: number;
  channel?: string;
}

/** Runtime configuration read from env vars */
export interface GatewayConfig {
  wsUrl: string;
  cognitoToken: string;
  defaultChannel: string;
}
