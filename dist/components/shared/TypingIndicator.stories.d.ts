import type { StoryObj } from '@storybook/react-vite';
import TypingIndicator from './TypingIndicator';
declare const meta: {
    title: string;
    component: typeof TypingIndicator;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        size: {
            control: "radio";
            options: string[];
        };
        compact: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const OneUser: Story;
export declare const TwoUsers: Story;
export declare const ThreeUsers: Story;
export declare const ManyUsers: Story;
export declare const Compact: Story;
export declare const Empty: Story;
//# sourceMappingURL=TypingIndicator.stories.d.ts.map