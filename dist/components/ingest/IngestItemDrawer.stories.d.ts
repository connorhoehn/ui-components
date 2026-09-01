import type { StoryObj } from '@storybook/react-vite';
import IngestItemDrawer from './IngestItemDrawer';
import type { IngestItem } from '../../types/ingest';
declare const meta: {
    title: string;
    component: typeof IngestItemDrawer;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        sourceName: string;
        onClose: () => void;
        onRetry: () => Promise<true>;
        onSkip: () => Promise<true>;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        item: IngestItem | null;
        sourceName?: string | undefined;
        onClose: () => void;
        onRetry: (itemId: string) => Promise<boolean | void>;
        onSkip: (itemId: string) => Promise<boolean | void>;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Completed item: full timeline, rule-based mapping at high confidence. */
export declare const Completed: Story;
/** Mid-flight — the timeline stops at the current step. */
export declare const InProgress: Story;
/** Failed after three attempts — retry and skip are the operator's options. */
export declare const Failed: Story;
/** Low-confidence LLM-generated mapping — the review-queue candidate. */
export declare const LowConfidenceMapping: Story;
/** `item: null` closes the drawer — nothing renders. */
export declare const Closed: Story;
//# sourceMappingURL=IngestItemDrawer.stories.d.ts.map