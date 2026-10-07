import type { StoryObj } from '@storybook/react-vite';
import { TaskStrip } from './TaskStrip';
import type { AgentTaskStatus } from './TaskStrip';
declare const meta: {
    title: string;
    component: typeof TaskStrip;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        label: string;
        status: AgentTaskStatus;
        phase?: string;
        percent?: number;
        icon?: import("react").ReactNode;
        onPause?: () => void;
        onResume?: () => void;
        onStop?: () => void;
        onOpen?: () => void;
        onDismiss?: () => void;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** What a deck revise can honestly show today: the phase, no percentage. */
export declare const PhaseOnly: Story;
/** Only when the run reports real progress does a bar appear. */
export declare const WithRealPercent: Story;
export declare const Failed: Story;
/** Pause and Resume swap in place; neither renders without a handler. */
export declare const PauseAndResume: Story;
//# sourceMappingURL=TaskStrip.stories.d.ts.map