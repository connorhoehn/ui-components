import type { StoryObj } from '@storybook/react-vite';
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./JsonPathInput").JsonPathInputProps & import("react").RefAttributes<HTMLInputElement>>;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        size: {
            control: "radio";
            options: string[];
        };
        invalid: {
            control: "boolean";
        };
        disabled: {
            control: "boolean";
        };
        enforcePrefix: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithSamples: Story;
export declare const InvalidWithError: Story;
export declare const SmVsMd: Story;
export declare const EnforcePrefix: Story;
//# sourceMappingURL=JsonPathInput.stories.d.ts.map