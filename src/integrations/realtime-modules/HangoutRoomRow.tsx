// HangoutRoomRow bound to the canonical `@connorhoehn/realtime-modules` install.
// Implementation: ../realtime/HangoutRoomRow (scope-agnostic, injected hooks).
import * as hangoutRooms from '@connorhoehn/realtime-modules/client/hangout-rooms';
import { createHangoutRoomRow } from '../realtime/HangoutRoomRow';

export type { HangoutRoomRowProps, HangoutRoomRowModules } from '../realtime/HangoutRoomRow';

// The namespace, not a destructured function: the component reads
// `rm.useRoomOccupancy` at render, so a test's module mock is what runs.
export const HangoutRoomRow = createHangoutRoomRow(hangoutRooms);
export default HangoutRoomRow;
