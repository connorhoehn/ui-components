import { StoryObj } from '@storybook/react-vite';
declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./Textarea').TextareaProps & import('react').RefAttributes<HTMLTextAreaElement>>;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        disabled: {
            control: "boolean";
        };
        invalid: {
            control: "boolean";
        };
        autoResize: {
            control: "boolean";
        };
        minRows: {
            control: "number";
        };
        maxRows: {
            control: "number";
        };
        rows: {
            control: "number";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const AutoResize: Story;
export declare const Invalid: Story;
export declare const Disabled: Story;
export declare const TallFixed: Story;
//# sourceMappingURL=Textarea.stories.d.ts.map