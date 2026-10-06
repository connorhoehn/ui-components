import type { CSSProperties, ReactNode } from 'react';
export type TitledFrameTone = 'code' | 'surface';
export interface TitledFrameProps {
    /** Text sitting in the top border. Keep it short — it is a label, not a line. */
    title: ReactNode;
    /** Right-aligned content in the top border, e.g. a close control. It never
     *  shrinks: when the border is too short for both, the title truncates. */
    titleAction?: ReactNode;
    /** Plain text of the title, shown as its tooltip — the title truncates, so
     *  a long one is otherwise unreadable. Defaults to `title` when that is a
     *  string. */
    titleText?: string;
    /** Draw the focused border. In a pane grid, exactly one should be true. */
    active?: boolean;
    /**
     * Terminal chrome (`code`, the default) or the app's own surface tokens.
     * `code` is the right choice whenever the frame contains a terminal — a
     * pane that themes with the page but holds a fixed-palette PTY reads as
     * two different applications.
     */
    tone?: TitledFrameTone;
    children: ReactNode;
    /** Fires on mousedown anywhere in the frame — how a pane claims focus. */
    onActivate?: () => void;
    className?: string;
    /** Class for the content region, e.g. padding or `overflow-auto`. */
    bodyClassName?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function TitledFrame({ title, titleAction, titleText, active, tone, children, onActivate, className, bodyClassName, style, 'data-testid': testId, }: TitledFrameProps): import("react").JSX.Element;
export default TitledFrame;
//# sourceMappingURL=TitledFrame.d.ts.map