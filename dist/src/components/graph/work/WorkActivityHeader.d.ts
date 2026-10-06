import type { WorkActivityHeaderProps } from './types';
/**
 * The one header row an activity panel gets: who and what on the left, the
 * three ways out on the right. Hosts that already sit inside
 * `ChatSidePanelFrame` get the same chrome from the frame and should not
 * render this as well — it exists so a host outside that frame (a standalone
 * route, a popped-out window) has no hand-rolled markup to write.
 *
 * A host that can show a second body — the person's Computer Lab beside their
 * activity graph — wires `onViewChange` and gets a segmented switch on its own
 * row beneath the title, with a quiet clause saying what the body holds. The
 * row is a SECOND row rather than another control in the title row because it
 * chooses what the panel is, while everything on the title row chooses where
 * the panel is; mixing the two put a body switch next to the close button.
 * Without `onViewChange` nothing about this header changes.
 */
export declare function WorkActivityHeader({ title, subtitle, expanded, onExpand, onPopOut, onClose, actions, view, onViewChange, viewNote, effortCount, maxEfforts, onMaxEffortsChange, className, 'data-testid': testId, }: WorkActivityHeaderProps): import("react").JSX.Element;
export default WorkActivityHeader;
//# sourceMappingURL=WorkActivityHeader.d.ts.map