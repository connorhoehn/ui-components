import type { StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';
declare const meta: {
    title: string;
    component: typeof FormField;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        label: string;
        name: string;
        type: "email";
        value: string;
        onChange: (value: string | boolean | number) => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** A required text-family field with a placeholder. */
export declare const Default: Story;
/**
 * `error` swaps the hint for the message and marks the control invalid —
 * the aria wiring comes from shared/FormField underneath.
 */
export declare const WithError: Story;
/** `helpText` renders only while there is no error. */
export declare const WithHelpText: Story;
export declare const Disabled: Story;
/**
 * Every supported `type` in one form. The checkbox branch keeps its own
 * markup because a checkbox label wraps its control.
 */
export declare const EveryType: Story;
//# sourceMappingURL=FormField.stories.d.ts.map