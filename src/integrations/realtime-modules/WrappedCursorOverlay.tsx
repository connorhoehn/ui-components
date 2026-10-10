// src/integrations/realtime-modules/WrappedCursorOverlay.tsx
//
// CursorOverlay wired to a useCursor(channel) hook return from
// realtime-modules (the hook is singular there; `RMUseCursorReturn` mirrors it).
// The hook's entries already carry `metadata.userColor` / `userInitials`, so
// each collaborator keeps the colour the service assigned them. Local pointer
// movement is published through `cursor.move`, which the hook throttles.
//
// realtime-modules' `useCursor` (client/useCursor.d.ts) is the supported hook;
// realtime-examples still hand-wires its own `useCursors` (frontend/src/hooks/
// useCursors.ts) into CursorCanvas.tsx — this is the supported replacement.

import { useMemo } from 'react';
import type { ReactNode } from 'react';
import type { RMUseCursorReturn } from './types';
import { adaptCursors } from './adapters';
import { CursorOverlay } from '../../components/collaboration/CursorOverlay';
import type { CursorCoordinates } from '../../components/collaboration/CursorOverlay';

export interface WrappedCursorOverlayProps {
  /** Return value of useCursor(channel) from realtime-modules. */
  cursor: RMUseCursorReturn;
  /**
   * `'fraction'` (default) publishes and reads 0..1 positions so pointers line
   * up across different viewport sizes. `'pixels'` uses raw offsets.
   */
  coordinates?: CursorCoordinates;
  /** Publish the local pointer. Default true; false renders others only. */
  publish?: boolean;
  /** Your own client id; a cursor carrying it is hidden. */
  selfClientId?: string;
  children?: ReactNode;
  className?: string;
}

export function WrappedCursorOverlay({
  cursor,
  coordinates = 'fraction',
  publish = true,
  selfClientId,
  children,
  className,
}: WrappedCursorOverlayProps) {
  const entries = useMemo(
    () => adaptCursors(cursor.cursors).filter((c) => c.clientId !== selfClientId),
    [cursor.cursors, selfClientId],
  );
  const move = cursor.move;
  return (
    <CursorOverlay
      cursors={entries}
      coordinates={coordinates}
      onMove={publish ? (x, y) => move({ x, y }) : undefined}
      className={className}
    >
      {children}
    </CursorOverlay>
  );
}
