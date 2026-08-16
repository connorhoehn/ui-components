import type { StoryObj } from '@storybook/react-vite';
import FormField from './FormField';
declare const meta: {
    title: string;
    component: typeof FormField;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const WithHint: Story;
export declare const WithError: Story;
export declare const Required: Story;
export declare const Inline: Story;
//# sourceMappingURL=FormField.stories.d.ts.map