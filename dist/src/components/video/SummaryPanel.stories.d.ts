import type { StoryObj } from '@storybook/react-vite';
import { SummaryPanel } from './SummaryPanel';
declare const meta: {
    title: string;
    component: typeof SummaryPanel;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        status: import("./TranscriptPanel").TranscriptStatus;
        markdown?: string | null;
        renderMarkdown?: (md: string) => import("react").ReactNode;
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
/** No summary was requested for this recording. */
export declare const Idle: Story;
/** Summarisation runs after transcription finishes. */
export declare const Processing: Story;
/** Failure state with the upstream message. */
export declare const Failed: Story;
/** Ready with no renderer supplied — raw markdown in a wrapped `<pre>`. */
export declare const ReadyRawMarkdown: Story;
/** Ready with a caller-supplied renderer. This is the intended usage: reuse
 *  whatever markdown renderer the host app already ships. */
export declare const ReadyWithRenderer: Story;
/** The job finished but produced nothing — e.g. a 4-second recording. */
export declare const ReadyButEmpty: Story;
//# sourceMappingURL=SummaryPanel.stories.d.ts.map