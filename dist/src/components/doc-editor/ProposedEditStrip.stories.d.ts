import type { StoryObj } from '@storybook/react-vite';
import { ProposedEditStrip } from './ProposedEditStrip';
declare const meta: {
    title: string;
    component: typeof ProposedEditStrip;
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** One ready proposal replacing the selection. */
export declare const Ready: Story;
/** The reply is still arriving: the thinking affordance, Apply off, Cancel on. */
export declare const Streaming: Story;
/** Two proposals: counted heading, Apply all / Discard all. */
export declare const Several: Story;
//# sourceMappingURL=ProposedEditStrip.stories.d.ts.map