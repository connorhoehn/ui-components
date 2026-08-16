import type { StoryObj } from '@storybook/react-vite';
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./NumberInput").NumberInputProps & import("react").RefAttributes<HTMLInputElement>>;
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
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithUnitPx: Story;
export declare const WithUnitDegrees: Story;
export declare const Clamped: Story;
export declare const Disabled: Story;
export declare const Invalid: Story;
//# sourceMappingURL=NumberInput.stories.d.ts.map