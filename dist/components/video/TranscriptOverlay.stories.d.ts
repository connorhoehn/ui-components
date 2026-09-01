import type { StoryObj } from '@storybook/react-vite';
import { TranscriptOverlay, type CaptionLine } from './TranscriptOverlay';
declare const meta: {
    title: string;
    component: typeof TranscriptOverlay;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        now: number;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        lines: CaptionLine[];
        maxLines?: number | undefined;
        fadeAfterMs?: number | undefined;
        now?: number | undefined;
        className?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Three lines at different ages — the older ones are visibly dimmer. */
export declare const ThreeSpeakers: Story;
/** A single fresh caption, at full opacity. */
export declare const SingleLine: Story;
/** Interim (still-being-revised) captions render in italics so viewers know
 *  the wording may change. */
export declare const InterimResult: Story;
/** `maxLines` caps the band height — only the most recent N survive. */
export declare const CappedToOneLine: Story;
/** Without a `speakerName` the overlay falls back to a truncated speaker id,
 *  which is what an un-joined SFU participant looks like. */
export declare const UnnamedSpeakers: Story;
/** The fade ramp end to end: fresh (opacity 1), half-faded (0.5), and near
 *  the end of the 3s linger (clamped to the 0.35 floor — anything quiet for
 *  longer than 3s drops from the DOM entirely). Only reproducible because
 *  `now` is pinned — with a live clock all three would have aged out. */
export declare const FadeRamp: Story;
/** A long caption wraps — each wrapped fragment keeps its own padded scrim
 *  backing (`box-decoration-break: clone`) instead of one full-width bar. */
export declare const WrappedLineScrim: Story;
/** No captions at all — the component renders `null`, so the caller needs no
 *  visibility gate of its own. */
export declare const NoCaptions: Story;
//# sourceMappingURL=TranscriptOverlay.stories.d.ts.map