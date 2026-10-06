import type { StoryObj } from '@storybook/react-vite';
import { StepAttempts } from './StepAttempts';
declare const meta: {
    title: string;
    component: typeof StepAttempts;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const SucceededOnThirdTry: Story;
export declare const ExhaustedAllRetries: Story;
export declare const SingleAttemptRendersNothing: Story;
export declare const NoAttempts: Story;
//# sourceMappingURL=StepAttempts.stories.d.ts.map