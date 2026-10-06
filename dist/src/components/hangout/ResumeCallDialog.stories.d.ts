import type { StoryObj } from '@storybook/react-vite';
import { ResumeCallDialog } from './ResumeCallDialog';
declare const meta: {
    title: string;
    component: typeof ResumeCallDialog;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const OneParticipant: Story;
export declare const MultipleParticipants: Story;
export declare const LongRunningCall: Story;
export declare const Reconnecting: Story;
export declare const ZeroParticipantsEdgeCase: Story;
//# sourceMappingURL=ResumeCallDialog.stories.d.ts.map