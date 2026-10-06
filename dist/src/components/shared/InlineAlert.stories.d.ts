import type { StoryObj } from '@storybook/react-vite';
import { InlineAlert } from './InlineAlert';
declare const meta: {
    title: string;
    component: typeof InlineAlert;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Error: Story;
export declare const Success: Story;
export declare const Warning: Story;
export declare const InfoDismissible: Story;
/** `palette="code"` for an alert inside a log console or debugger panel. One
 *  panel background across all four severities — the accent border and the
 *  text carry the severity, the way a terminal signals it. */
export declare const CodePalette: Story;
//# sourceMappingURL=InlineAlert.stories.d.ts.map