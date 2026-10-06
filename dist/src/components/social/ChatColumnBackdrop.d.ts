import { type ReactNode } from 'react';
import { type BackdropTone } from '../shared/backdropTone';
import type { ComposerMode } from './RichChatComposer';
export interface ChatColumnBackdropProps {
    /**
     * The composer's mode. `chat` is the ordinary light column; `agent` and
     * `terminal` are the console.
     */
    mode?: ComposerMode;
    /**
     * True while a loop is mid-turn. Denser, faster, and the cloud leans toward
     * the pointer — the same "this is working" signal the lab shell uses, said by
     * the whole column instead of one pane.
     */
    working?: boolean;
    /**
     * The sky. `auto` (default): graphite on a light theme, night on a dark one
     * (see `resolveBackdropTone`). The resolved tone is stamped on this element
     * as `data-backdrop-tone`, so a composer inside it inherits the SAME sky
     * instead of deciding again. `none` never darkens the column.
     */
    tone?: BackdropTone;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}
/**
 * Wraps the message list + composer so the column as a whole changes state with
 * the mode. Layout is identical in both states — only colour and the backdrop
 * change — so nothing reflows across the transition.
 */
export declare function ChatColumnBackdrop({ mode, working, tone: toneProp, className, children, 'data-testid': testId, }: ChatColumnBackdropProps): import("react").JSX.Element;
export default ChatColumnBackdrop;
//# sourceMappingURL=ChatColumnBackdrop.d.ts.map