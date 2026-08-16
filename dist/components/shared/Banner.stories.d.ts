import type { StoryObj } from '@storybook/react-vite';
import Banner from './Banner';
declare const meta: {
    title: string;
    component: typeof Banner;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        variant: {
            control: "select";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Error: Story;
export declare const Warning: Story;
export declare const Info: Story;
export declare const Success: Story;
export declare const Dismissible: Story;
export declare const NoTitle: Story;
//# sourceMappingURL=Banner.stories.d.ts.map