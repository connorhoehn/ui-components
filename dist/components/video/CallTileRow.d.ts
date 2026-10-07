import { type CSSProperties, type ReactNode } from 'react';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';
/** A row participant. The extra flags are read by the `dock` and `grid` variants only. */
export interface CallTileParticipant extends HangoutLayoutParticipant {
    /** Draws the screen-share glyph on the tile (the shared stream is the host's `videoElement`). */
    screenSharing?: boolean;
    /** Veils the tile (last frame kept) while this person's connection recovers. */
    reconnecting?: boolean;
    /**
     * Camera off, but keep `videoElement` MOUNTED (invisible) and draw the
     * initials. A remote person's audio rides the same MediaStream as their
     * video, so unmounting the element on camera-off silences them. `dock`/`grid` only.
     */
    cameraOff?: boolean;
    /** An audio sink (e.g. `<audio autoPlay>`), always mounted and never shown. `dock`/`grid` only. */
    audioElement?: ReactNode;
}
export interface CallTileRowProps {
    participants: CallTileParticipant[];
    /** The viewer's own tile — drawn last, at the controls' side, where a mirror belongs.
     *  The `dock` variant draws it FIRST, as "You", the way a call dock reads left to right. */
    localParticipant?: CallTileParticipant | null;
    activeSpeakerId?: string | null;
    /** Width of one tile; tiles keep 16:9. Default 144. */
    tileWidth?: number;
    /** The call's controls (mute, camera, leave, pop-out…), rendered at the row's end. */
    controls?: ReactNode;
    /** A short label at the row's start — the room, or who is on the call. */
    title?: ReactNode;
    onParticipantClick?: (id: string) => void;
    /**
     * The person being FOLLOWED: a 2px accent ring, distinct from the green
     * speaking ring (both can show at once — the accent wins the ring, the
     * speaking state keeps its corner dot).
     */
    highlightedId?: string | null;
    /**
     * What happens when there are more people than `maxVisible`:
     * `collapse` (default) ends the row with a `+N` tile; `scroll` keeps every
     * tile and lets the row scroll sideways.
     */
    overflow?: 'scroll' | 'collapse';
    /** Tiles before the `+N` tile under `overflow="collapse"`. Default 6. */
    maxVisible?: number;
    /** Tile height for the `dock` variant (tiles are `tileWidth` × `tileHeight`). Default 84. */
    tileHeight?: number;
    /** Prefix of each tile's test id in the `dock` variant (`<prefix>-<id>`). Default `call-tile`. */
    tileTestIdPrefix?: string;
    /**
     * `floating` (default): the tiles stand on their own over the page —
     * rounded, shadowed, no bar behind them — with the controls centred
     * beneath. A row of people over a diagram should look like people over a
     * diagram, not like a panel someone laid along the bottom edge. `bar`
     * keeps them in one dark strip with the controls at the end, for a dock
     * that is itself a panel.
     *
     * `grid` (2.423.0): the call's media panel — the same dock tiles (camera-off
     * initials with the media kept playing, audio sink, name, mic state,
     * speaking/followed ring, reconnecting veil), fluid 16:9 tiles in a grid
     * that reflows with the head count (`gridCols`: 1 → 1 column, 2–4 → 2,
     * 5–9 → 3, 10+ → 4). The viewer's tile is first, inline, as "You" — never
     * a PiP — and nobody is collapsed into `+N`. `tileWidth`, `tileHeight`,
     * `overflow` and `maxVisible` are ignored.
     */
    variant?: 'floating' | 'bar' | 'dock' | 'grid';
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function CallTileRow({ participants, localParticipant, activeSpeakerId, tileWidth, controls, title, onParticipantClick, variant, highlightedId, overflow, maxVisible, tileHeight, tileTestIdPrefix, className, style, 'data-testid': testId, }: CallTileRowProps): import("react").JSX.Element;
export default CallTileRow;
//# sourceMappingURL=CallTileRow.d.ts.map