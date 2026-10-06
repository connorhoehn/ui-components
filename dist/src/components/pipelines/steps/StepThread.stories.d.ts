import type { StoryObj } from '@storybook/react-vite';
import { StepThread } from './StepThread';
declare const meta: {
    title: string;
    component: typeof StepThread;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Completed: Story;
export declare const Failed: Story;
export declare const Running: Story;
export declare const LlmWithResponse: Story;
export declare const AgentTrace: Story;
export declare const AgentToolless: Story;
export declare const WithActions: Story;
export declare const ProducedArtifacts: Story;
export declare const ProducedArtifactsWithHostRoute: Story;
export declare const RetriedThenSucceeded: Story;
export declare const RetriesExhausted: Story;
//# sourceMappingURL=StepThread.stories.d.ts.map