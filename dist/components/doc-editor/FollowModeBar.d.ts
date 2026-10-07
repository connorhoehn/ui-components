import type { RefObject } from 'react';
import type { Participant } from '../../types/document';
export interface FollowModeBarProps {
    followingUserId: string | null;
    participants: Participant[];
    onStopFollow: () => void;
    /** The followed person's section title — rendered as ` · <location>`. */
    location?: string;
    /**
     * `banner` (default): the centred strip. `bar`: the in-call follow bar
     * ("**Following Alice** · Session flow" … "Stop following"), see FollowBanner.
     */
    appearance?: 'banner' | 'bar';
    /** `false` turns the auto-unlock off (the host ends follow itself). Default true. 2.393.0. */
    autoStop?: boolean;
    /**
     * Listen on this element only (the editor), and only for scrolling or
     * typing — a click on the call dock, the toolbar or a side panel keeps
     * following. Unset: any mousedown/keydown/wheel in the window. 2.393.0.
     */
    autoStopScope?: RefObject<HTMLElement | null>;
    className?: string;
    /** Default `follow-bar`; the stop button is `<id>-stop`. */
    'data-testid'?: string;
}
export default function FollowModeBar({ followingUserId, participants, onStopFollow, location, appearance, autoStop, autoStopScope, className, 'data-testid': testId, }: FollowModeBarProps): import("react").JSX.Element | null;
//# sourceMappingURL=FollowModeBar.d.ts.map