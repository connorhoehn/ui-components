import type { ReactNode } from 'react';
import { type RecordingChipState } from './RecordingChip';
export interface EmbeddedCallPanelProps {
    /** What this call is — a room name, "Alice & Bob", a channel. */
    title: ReactNode;
    /** "3 in call", "Live" — the second thing worth knowing. */
    subtitle?: ReactNode;
    durationSeconds?: number;
    /** Shows the live dot. Default true — an embedded call that is not live is not shown. */
    live?: boolean;
    /**
     * Whether this call records. `armed` = it will (a room with recording on, a
     * DM both people opted into) but nothing is written yet; `active` = writing
     * now. Omitted or neither → no chip, which is the "not recorded" statement.
     */
    recording?: RecordingChipState;
    /** Take the call back out into its floating window. Omitted → no button. */
    onPopOut?: () => void;
    popOutLabel?: string;
    /** The tile area: HangoutLayout / CallParticipantStrip / a stream player. Fills a 16:9 stage. */
    children: ReactNode;
    /** MediaControlsBar or equivalent, rendered under the stage. */
    controls?: ReactNode;
    /**
     * A side panel beside the stage — the call's Chat / People / Devices.
     * Omitted renders nothing (today's output, byte-for-byte). Typically
     * <CallSidePanel> from ./CallSidePanel, fed the same `sidePanelTabs` /
     * `activeSidePanelTab` the floating widget uses, so the docked shape
     * reaches the same destinations instead of forcing a pop-out.
     */
    aside?: ReactNode;
    /** Stage aspect. `video` keeps 16:9; `audio` is a short strip for an audio-only call. */
    stage?: 'video' | 'audio';
    className?: string;
    'data-testid'?: string;
}
export declare function EmbeddedCallPanel({ title, subtitle, durationSeconds, live, recording, onPopOut, popOutLabel, children, controls, aside, stage, className, 'data-testid': testId, }: EmbeddedCallPanelProps): import("react").JSX.Element;
export default EmbeddedCallPanel;
//# sourceMappingURL=EmbeddedCallPanel.d.ts.map