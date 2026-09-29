// HangoutRoomsSection bound to the canonical `@connorhoehn/realtime-modules` install.
// Implementation: ../realtime/HangoutRoomsSection (scope-agnostic).
import { createHangoutRoomsSection } from '../realtime/HangoutRoomsSection';
import { HangoutRoomRow } from './HangoutRoomRow';

export type { HangoutRoomsSectionProps } from '../realtime/HangoutRoomsSection';

export const HangoutRoomsSection = createHangoutRoomsSection(HangoutRoomRow);
export default HangoutRoomsSection;
