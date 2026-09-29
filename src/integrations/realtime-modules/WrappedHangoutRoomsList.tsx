// WrappedHangoutRoomsList bound to the canonical `@connorhoehn/realtime-modules` install.
// Implementation: ../realtime/WrappedHangoutRoomsList (scope-agnostic).
import { createWrappedHangoutRoomsList } from '../realtime/WrappedHangoutRoomsList';
import { HangoutRoomsSection } from './HangoutRoomsSection';

export type { WrappedHangoutRoomsListProps } from '../realtime/WrappedHangoutRoomsList';

export const WrappedHangoutRoomsList = createWrappedHangoutRoomsList(HangoutRoomsSection);
export default WrappedHangoutRoomsList;
