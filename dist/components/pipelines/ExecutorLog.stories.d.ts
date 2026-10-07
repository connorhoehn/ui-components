import type { StoryObj } from '@storybook/react-vite';
import ExecutorLog from './ExecutorLog';
declare const meta: {
    title: string;
    component: typeof ExecutorLog;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        pipelineId: string;
        runId: string;
        onStepClick?: (stepId: string) => void;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * The filter bar, live indicator, empty state and footer with no audit API
 * behind them. The `/api/.../audit` request fails in Storybook, so the hook
 * reports an error: the "Live" dot greys out and the timeline shows the
 * pre-2026-05-07 empty-state copy. Every control is still interactive —
 * chips, actor filter and time presets all toggle against an empty set.
 */
export declare const NoBackend: Story;
//# sourceMappingURL=ExecutorLog.stories.d.ts.map