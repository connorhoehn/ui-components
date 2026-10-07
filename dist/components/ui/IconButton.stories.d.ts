import type { StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
declare const meta: {
    title: string;
    component: typeof IconButton;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        variant: {
            control: "select";
            options: string[];
        };
        size: {
            control: "select";
            options: string[];
        };
        tone: {
            control: "radio";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Ghost: Story;
export declare const Primary: Story;
export declare const Danger: Story;
export declare const Sizes: Story;
/** The `code` family — pane chrome on a terminal surface. These controls sit
 *  in a `TitledFrame`'s title row, where the surface-family ghost renders as a
 *  light smear on black. */
export declare const CodeTone: Story;
//# sourceMappingURL=IconButton.stories.d.ts.map