import { StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';
declare const meta: {
    title: string;
    component: typeof CodeBlock;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        language: {
            control: "select";
            options: string[];
        };
        theme: {
            control: "radio";
            options: string[];
        };
        copyButton: {
            control: "boolean";
        };
        showLineNumbers: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const TsxDark: Story;
export declare const TsxLight: Story;
export declare const JsonDark: Story;
export declare const JsonLight: Story;
export declare const BashDark: Story;
export declare const BashLight: Story;
export declare const WithLineNumbers: Story;
export declare const NoCopyButton: Story;
//# sourceMappingURL=CodeBlock.stories.d.ts.map