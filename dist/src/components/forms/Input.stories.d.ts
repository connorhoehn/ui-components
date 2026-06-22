import { StoryObj } from '@storybook/react-vite';
declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./Input').InputProps & import('react').RefAttributes<HTMLInputElement>>;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        type: {
            control: "radio";
            options: string[];
        };
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
export declare const Small: Story;
export declare const Invalid: Story;
export declare const Disabled: Story;
export declare const WithPrefix: Story;
export declare const WithSuffix: Story;
export declare const SearchType: Story;
export declare const NumberType: Story;
//# sourceMappingURL=Input.stories.d.ts.map