// useDeckPresence — who else has this presentation open, and which slide each
// of them is on, shaped for the deck editor's follow bar and filmstrip.
//
// Ported from realtime-examples' `useDeckPresence`, with the presence source
// INJECTED rather than imported: this entry never imports realtime-modules
// (the 2.407.20 pattern). The host passes what `usePresence('doc:<id>', {
// join: true })` and `useGateway()` already return:
//
//   const { roster, updateMetadata } = usePresence(deckPresenceChannel(id), { join: true });
//   const { clientId } = useGateway();
//   const deck = useDeckPresence({ roster, ownClientId: clientId, updateMetadata,
//                                  documentId: id, selectedSlideId });
//   <FollowModeBar participants={deck.participants} … />
//
// Presence metadata carries `deckSlide: { documentId, slideId }` (which slide
// this tab has selected) and `deckEditing: { documentId }` (unsaved edits).
// The gateway keeps ONE presence entry per socket and every `set` replaces it
// whole, so the host's `updateMetadata` must merge (the library's does).

import { useEffect, useMemo } from 'react';
import type { Participant } from '../../types/document';

/** The slice of a gateway presence entry this reads. Structural: any roster entry fits. */
export interface DeckRosterEntry {
  clientId: string;
  status?: string;
  metadata?: Record<string, unknown> | undefined;
  timestamp?: string | number;
  lastSeen?: string | number;
}

export interface DeckViewer {
  /** The person's id (their user id, else the socket's client id). */
  id: string;
  clientId: string;
  name: string;
  avatarUrl?: string;
  idle?: boolean;
  /** "editing this deck" / "on this deck" / "viewing this deck". */
  detail: string;
  /** The title of the slide they are on, when `slideTitle` knows it. */
  location?: string;
  slideId?: string;
  editing?: boolean;
}

export interface DeckPresence {
  /** Everyone else on the deck, one per person (their most recent tab), by name. */
  viewers: DeckViewer[];
  /** The same people as `FollowModeBar` participants (`currentSectionId` = their slide id). */
  participants: Participant[];
  /** Slide id → the people on it, for the filmstrip. */
  slideViewers: Record<string, DeckViewer[]>;
  /** I have unsaved edits to this deck in another tab. */
  editingElsewhere: boolean;
}

export const EMPTY_DECK_PRESENCE: DeckPresence = {
  viewers: [],
  participants: [],
  slideViewers: {},
  editingElsewhere: false,
};

export const deckPresenceChannel = (documentId: string): string => `doc:${documentId}`;

interface DeckSlideMeta { documentId?: unknown; slideId?: unknown }
interface DeckEditingMeta { documentId?: unknown }

const FALLBACK_COLOR = 'var(--color-primary)';
const MODES: ReadonlySet<string> = new Set(['editor', 'reviewer', 'reader']);

function ownUserIdOf(roster: readonly DeckRosterEntry[], ownClientId: string | null): string | null {
  const own = roster.find((entry) => entry.clientId === ownClientId);
  const id = own?.metadata?.userId;
  return typeof id === 'string' && id ? id : null;
}

/** The roster as viewers: others only, one per person, the newest entry winning. */
export function deckViewersOf(
  roster: readonly DeckRosterEntry[],
  documentId: string,
  ownClientId: string | null,
  slideTitle: (slideId: string) => string | undefined = () => undefined,
): DeckViewer[] {
  const ownUserId = ownUserIdOf(roster, ownClientId);
  const byPerson = new Map<string, { entry: DeckRosterEntry; viewer: DeckViewer }>();
  for (const entry of roster) {
    if (entry.clientId === ownClientId || entry.status === 'offline') continue;
    const meta = entry.metadata ?? {};
    const userId = typeof meta.userId === 'string' && meta.userId ? meta.userId : null;
    if (userId && userId === ownUserId) continue; // my other tab
    const id = userId ?? entry.clientId;
    const deck = meta.deckSlide as DeckSlideMeta | null | undefined;
    const slideId = deck && deck.documentId === documentId && typeof deck.slideId === 'string' ? deck.slideId : undefined;
    const title = slideId ? slideTitle(slideId) : undefined;
    const editing = (meta.deckEditing as DeckEditingMeta | null | undefined)?.documentId === documentId;
    const viewer: DeckViewer = {
      id,
      clientId: entry.clientId,
      name: typeof meta.displayName === 'string' && meta.displayName ? meta.displayName : 'Someone',
      ...(typeof meta.avatarUrl === 'string' && meta.avatarUrl ? { avatarUrl: meta.avatarUrl } : {}),
      ...(entry.status === 'away' ? { idle: true } : {}),
      detail: editing ? 'editing this deck' : slideId ? 'on this deck' : 'viewing this deck',
      ...(title ? { location: title } : {}),
      ...(slideId ? { slideId } : {}),
      ...(editing ? { editing: true } : {}),
    };
    const seen = byPerson.get(id);
    const stamp = (e: DeckRosterEntry) => String(e.lastSeen ?? e.timestamp ?? '');
    if (!seen || stamp(entry) > stamp(seen.entry)) byPerson.set(id, { entry, viewer });
  }
  return [...byPerson.values()].map(({ viewer }) => viewer).sort((a, b) => a.name.localeCompare(b.name));
}

/** True when another tab of mine (same user, another socket) has unsaved edits to this deck. */
export function editingInMyOtherTab(
  roster: readonly DeckRosterEntry[],
  documentId: string,
  ownClientId: string | null,
): boolean {
  const ownUserId = ownUserIdOf(roster, ownClientId);
  if (!ownUserId) return false;
  return roster.some((entry) => entry.clientId !== ownClientId && entry.status !== 'offline'
    && entry.metadata?.userId === ownUserId
    && (entry.metadata?.deckEditing as DeckEditingMeta | null | undefined)?.documentId === documentId);
}

/** A viewer as the `FollowModeBar` participant it follows. */
export function deckViewerToParticipant(viewer: DeckViewer, entry?: DeckRosterEntry): Participant {
  const meta = entry?.metadata ?? {};
  const mode = typeof meta.mode === 'string' && MODES.has(meta.mode) ? (meta.mode as Participant['mode']) : viewer.editing ? 'editor' : 'reader';
  return {
    clientId: viewer.clientId,
    userId: viewer.id,
    displayName: viewer.name,
    color: typeof meta.color === 'string' && meta.color ? meta.color : FALLBACK_COLOR,
    mode,
    currentSectionId: viewer.slideId ?? null,
    ...(viewer.idle ? { idle: true } : {}),
  };
}

export interface UseDeckPresenceOptions {
  /** The `doc:<documentId>` channel's roster (from realtime-modules `usePresence`). */
  roster: readonly DeckRosterEntry[];
  /** This socket's client id (`useGateway().clientId`). */
  ownClientId: string | null;
  /** Merges into this socket's presence metadata (`usePresence(...).updateMetadata`). Keep it referentially stable. */
  updateMetadata: (metadata: Record<string, unknown>) => void;
  documentId: string;
  /** The slide on this tab's stage; `null` for none. */
  selectedSlideId: string | null;
  /** "Slide 3 · Delivery", for the byline card. Keep it referentially stable. */
  slideTitle?: (slideId: string) => string | undefined;
  /** This tab has unsaved edits — peers' Save warns while it does. */
  editing?: boolean;
}

/**
 * Publishes this tab's slide and editing state, and derives everyone else's.
 * Leaving (unmount) clears both so peers are told.
 */
export function useDeckPresence(options: UseDeckPresenceOptions): DeckPresence {
  const { roster, ownClientId, updateMetadata, documentId, selectedSlideId, slideTitle, editing = false } = options;

  useEffect(() => {
    updateMetadata({ deckSlide: selectedSlideId ? { documentId, slideId: selectedSlideId } : null });
  }, [documentId, selectedSlideId, updateMetadata]);
  useEffect(() => {
    updateMetadata({ deckEditing: editing ? { documentId } : null });
  }, [documentId, editing, updateMetadata]);
  useEffect(() => () => updateMetadata({ deckSlide: null, deckEditing: null }), [updateMetadata]);

  return useMemo(() => {
    const viewers = deckViewersOf(roster, documentId, ownClientId, slideTitle);
    const slideViewers: Record<string, DeckViewer[]> = {};
    for (const viewer of viewers) {
      if (viewer.slideId) (slideViewers[viewer.slideId] ??= []).push(viewer);
    }
    const participants = viewers.map((viewer) =>
      deckViewerToParticipant(viewer, roster.find((entry) => entry.clientId === viewer.clientId)));
    return {
      viewers,
      participants,
      slideViewers,
      editingElsewhere: editingInMyOtherTab(roster, documentId, ownClientId),
    };
  }, [roster, documentId, ownClientId, slideTitle]);
}
