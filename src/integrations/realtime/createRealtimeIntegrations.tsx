// src/integrations/realtime/createRealtimeIntegrations.tsx
//
// One call that binds every hook-bound integration to the realtime-modules
// functions the app hands over — from whatever scope it installed them under.
//
//   import * as client from '@connorhoehn/realtime-modules/client';
//   import * as video from '@connorhoehn/realtime-modules/client/video';
//   import * as hangoutRooms from '@connorhoehn/realtime-modules/client/hangout-rooms';
//   import * as call from '@connorhoehn/realtime-modules/call';
//   export const rt = createRealtimeIntegrations({ ...client, ...video, ...hangoutRooms, ...call });
//
// Call it ONCE at module scope (or use RealtimeIntegrationsProvider): each call
// mints new component identities, and a component whose identity changes every
// render remounts every render.

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { RealtimeClientModules } from './modules';
import { createHangoutRoomRow, type HangoutRoomRowComponent } from './HangoutRoomRow';
import { createHangoutRoomsSection, type HangoutRoomsSectionComponent } from './HangoutRoomsSection';
import {
  createWrappedHangoutRoomsList,
  type WrappedHangoutRoomsListComponent,
} from './WrappedHangoutRoomsList';
import {
  createRealtimeCapabilityProvider,
  type RealtimeCapabilityProviderComponent,
} from './capabilities';
import { createConversationFeaturesFor, type ConversationFeaturesFor } from './WrappedConversationSurface';
import { createWrappedStreamStage, type WrappedStreamStageComponent } from './WrappedStreamStage';
import {
  createWrappedLVSHangoutLayout,
  type WrappedLVSHangoutLayoutComponent,
} from './WrappedLVSHangoutLayout';

/** Every integration that calls a realtime-modules function, bound to one bag. */
export interface RealtimeIntegrations {
  HangoutRoomRow: HangoutRoomRowComponent;
  HangoutRoomsSection: HangoutRoomsSectionComponent;
  WrappedHangoutRoomsList: WrappedHangoutRoomsListComponent;
  RealtimeCapabilityProvider: RealtimeCapabilityProviderComponent;
  conversationFeaturesFor: ConversationFeaturesFor;
  WrappedStreamStage: WrappedStreamStageComponent;
  WrappedLVSHangoutLayout: WrappedLVSHangoutLayoutComponent;
}

/**
 * Bind the hook-bound integrations to `rm`. Props and test ids are identical to
 * the same-named exports of `integrations/realtime-modules` (which is exactly
 * this, applied to the canonical `@connorhoehn/realtime-modules` imports).
 *
 * Hooks are read from `rm` at render time, not captured here.
 */
export function createRealtimeIntegrations(rm: RealtimeClientModules): RealtimeIntegrations {
  const HangoutRoomRow = createHangoutRoomRow(rm);
  const HangoutRoomsSection = createHangoutRoomsSection(HangoutRoomRow);
  return {
    HangoutRoomRow,
    HangoutRoomsSection,
    WrappedHangoutRoomsList: createWrappedHangoutRoomsList(HangoutRoomsSection),
    RealtimeCapabilityProvider: createRealtimeCapabilityProvider(rm),
    conversationFeaturesFor: createConversationFeaturesFor(rm),
    WrappedStreamStage: createWrappedStreamStage(rm),
    WrappedLVSHangoutLayout: createWrappedLVSHangoutLayout(rm),
  };
}

// ── Inject once, read anywhere ──────────────────────────────────────────────

const RealtimeIntegrationsContext = createContext<RealtimeIntegrations | null>(null);

// Keyed on the bag's identity so a provider that re-renders with the same
// `modules` object never re-mints components (which would remount the tree).
const bound = new WeakMap<RealtimeClientModules, RealtimeIntegrations>();

function integrationsFor(modules: RealtimeClientModules): RealtimeIntegrations {
  let hit = bound.get(modules);
  if (!hit) {
    hit = createRealtimeIntegrations(modules);
    bound.set(modules, hit);
  }
  return hit;
}

export interface RealtimeIntegrationsProviderProps {
  /**
   * The realtime-modules functions to bind. Pass a stable object (module
   * scope or memoised) — a new object each render re-binds and remounts.
   */
  modules: RealtimeClientModules;
  children: ReactNode;
}

/** Bind the integrations once for a subtree; read them with `useRealtimeIntegrations()`. */
export function RealtimeIntegrationsProvider({ modules, children }: RealtimeIntegrationsProviderProps) {
  const value = useMemo(() => integrationsFor(modules), [modules]);
  return (
    <RealtimeIntegrationsContext.Provider value={value}>{children}</RealtimeIntegrationsContext.Provider>
  );
}

/**
 * The integrations bound by the nearest RealtimeIntegrationsProvider. Throws
 * outside one: there is no canonical fallback in this entry (that would import
 * the package this entry exists to avoid importing).
 */
export function useRealtimeIntegrations(): RealtimeIntegrations {
  const ctx = useContext(RealtimeIntegrationsContext);
  if (!ctx) {
    throw new Error(
      'useRealtimeIntegrations() needs a <RealtimeIntegrationsProvider modules={…}> above it.',
    );
  }
  return ctx;
}
