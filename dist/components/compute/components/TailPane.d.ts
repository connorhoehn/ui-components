import type { PaneKindContext } from '../lib/paneKinds';
import type { Computer } from '../types';
export interface TailPaneProps {
    computer: Computer;
    /** Publish a handle so the lab can put the keyboard here. */
    registerPane?: PaneKindContext['registerPane'];
    className?: string;
}
export declare function TailPane({ computer, registerPane, className }: TailPaneProps): import("react").JSX.Element;
//# sourceMappingURL=TailPane.d.ts.map