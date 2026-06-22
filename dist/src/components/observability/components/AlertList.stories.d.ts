import { StoryObj } from '@storybook/react-vite';
import { default as AlertList, AlertListEntry } from './AlertList';
declare const meta: {
    title: string;
    component: typeof AlertList;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        items: AlertListEntry[];
        maxHeight: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const MixedSeverity: Story;
export declare const AllActive: Story;
export declare const AllResolved: Story;
export declare const Empty: Story;
export declare const Loading: Story;
export declare const CustomTitle: Story;
//# sourceMappingURL=AlertList.stories.d.ts.map