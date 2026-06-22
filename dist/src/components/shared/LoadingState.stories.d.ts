import { StoryObj } from '@storybook/react-vite';
import { default as LoadingState } from './LoadingState';
declare const meta: {
    title: string;
    component: typeof LoadingState;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        spinnerSize: {
            control: "radio";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const CustomLabel: Story;
export declare const WithDescription: Story;
export declare const SmallSpinner: Story;
//# sourceMappingURL=LoadingState.stories.d.ts.map