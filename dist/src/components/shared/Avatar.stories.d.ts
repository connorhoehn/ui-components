import type { StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
declare const meta: {
    title: string;
    component: typeof Avatar;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const SingleWord: Story;
export declare const SmallSize: Story;
export declare const LargeSize: Story;
export declare const CustomColor: Story;
export declare const Group: StoryObj;
export declare const GroupSmall: StoryObj;
/** A pale fill needs dark text: `foreground`, or `autoContrast` to derive it. */
export declare const ReadableOnLightFills: Story;
//# sourceMappingURL=Avatar.stories.d.ts.map