import type { StoryObj } from '@storybook/react-vite';
import { TranscriptPanel, type TranscriptSegment } from './TranscriptPanel';
declare const meta: {
    title: string;
    component: typeof TranscriptPanel;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        status: import("./TranscriptPanel").TranscriptStatus;
        segments?: TranscriptSegment[];
        currentTimeMs?: number | null;
        onSeek?: (timeMs: number) => void;
        title?: string;
        errorMessage?: string;
        errorDetail?: string | null;
        pendingMessage?: string;
        idleState?: import("react").ReactNode;
        className?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Transcription was never enabled for this recording. */
export declare const Idle: Story;
/** Queued but the worker has not picked it up. */
export declare const Pending: Story;
/** Worker running — the caller can name the phase via `pendingMessage`. */
export declare const Processing: Story;
/** Failure, with the upstream error surfaced. */
export declare const Failed: Story;
/** Ready with content. Speaker colour is hashed from `speakerId`, so the same
 *  speaker keeps the same hue across re-renders and across recordings. */
export declare const Ready: Story;
/** Ready, but nobody spoke — distinct from `idle`: the job ran and found
 *  nothing. */
export declare const ReadyButSilent: Story;
/** Time-aligned: pass `currentTimeMs` from the player and the active segment
 *  is highlighted and scrolled into view. `onSeek` makes segments clickable. */
export declare const TimeAlignedWithSeek: Story;
//# sourceMappingURL=TranscriptPanel.stories.d.ts.map