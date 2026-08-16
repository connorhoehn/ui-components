import type { StoryObj } from '@storybook/react-vite';
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./Select").SelectProps & import("react").RefAttributes<HTMLSelectElement>>;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        size: {
            control: "radio";
            options: string[];
        };
        disabled: {
            control: "boolean";
        };
        invalid: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithPlaceholder: Story;
export declare const Small: Story;
export declare const Invalid: Story;
export declare const Disabled: Story;
//# sourceMappingURL=Select.stories.d.ts.map