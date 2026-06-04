import type { RMCreateRoomInput, RMRoom, RMRoomVisibility } from './types';
export interface NewHangoutRoomDialogProps {
    open: boolean;
    onClose: () => void;
    /** Imperative create — typically `rooms.createRoom` from useHangoutRooms. */
    onCreate: (input: RMCreateRoomInput) => Promise<RMRoom>;
    /** Fires after a successful create; caller may auto-join the room. */
    onCreated?: (room: RMRoom) => void;
    /** Default visibility. Server defaults to 'org' if omitted. */
    defaultVisibility?: RMRoomVisibility;
}
/** Strip non-alphanumeric, lowercase, hyphenate. Mirrors typical
 *  server-side slug generation closely enough for a preview UI. */
export declare function slugifyRoomName(input: string): string;
export declare function NewHangoutRoomDialog({ open, onClose, onCreate, onCreated, defaultVisibility, }: NewHangoutRoomDialogProps): import("react/jsx-runtime").JSX.Element;
export default NewHangoutRoomDialog;
//# sourceMappingURL=NewHangoutRoomDialog.d.ts.map