import { StoryObj } from '@storybook/react-vite';
import { default as DropdownMenu } from './DropdownMenu';
declare const meta: {
    title: string;
    component: typeof DropdownMenu;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        align: {
            control: "radio";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const EndAligned: Story;
export declare const SingleSectionNoLabel: Story;
//# sourceMappingURL=DropdownMenu.stories.d.ts.map