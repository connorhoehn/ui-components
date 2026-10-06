import type { StoryObj } from '@storybook/react-vite';
import { NavRail } from './NavRail';
declare const meta: {
    title: string;
    component: typeof NavRail;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Flat: Story;
export declare const WithSlots: Story;
export declare const CodeTone: Story;
export declare const ThreeLevelStack: StoryObj;
//# sourceMappingURL=NavRail.stories.d.ts.map