import type { ReactNode } from 'react';
export type SlideStageWidth = '2xl' | '3xl' | '4xl' | '5xl';
export interface SlideStageProps {
    /** The slide picture or a state. Centred inside the 16:9 frame. */
    children: ReactNode;
    /** The agent is rewriting this slide: label over it, `aria-busy`. */
    generating?: boolean;
    /** Default "Generating…". */
    generatingLabel?: string;
    /** Accessible name of the frame — "Slide 2 of 5: Transcript". */
    label?: string;
    /** Widest the frame grows. Default `4xl`. */
    maxWidth?: SlideStageWidth;
    className?: string;
    'data-testid'?: string;
}
export declare function SlideStage({ children, generating, generatingLabel, label, maxWidth, className, 'data-testid': testId, }: SlideStageProps): import("react").JSX.Element;
export default SlideStage;
//# sourceMappingURL=SlideStage.d.ts.map