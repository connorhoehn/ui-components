import { StoryObj } from '@storybook/react-vite';
import { default as PresenceDot } from './PresenceDot';
declare const meta: {
    title: string;
    component: typeof PresenceDot;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        state: {
            control: "radio";
            options: string[];
        };
        size: {
            control: "radio";
            options: string[];
        };
        pulse: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Online: Story;
export declare const Away: Story;
export declare const Busy: Story;
export declare const Offline: Story;
export declare const WithLabel: Story;
export declare const Large: Story;
export declare const Gallery: Story;
//# sourceMappingURL=PresenceDot.stories.d.ts.map