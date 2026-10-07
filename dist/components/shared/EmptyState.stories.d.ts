import type { StoryObj } from '@storybook/react-vite';
import EmptyState from './EmptyState';
declare const meta: {
    title: string;
    component: typeof EmptyState;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const WithAction: Story;
export declare const RichDescription: Story;
export declare const CustomAction: Story;
export declare const WithGuidedActions: Story;
/** `tone="code"` for the empty state of a terminal or debugger surface.
 *  Note the 220px min-height: if the region is smaller than that — a rail
 *  section, a filtered list, a quarter-window pane — reach for
 *  `InlinePlaceholder` instead of shrinking this. */
export declare const CodeTone: Story;
/** One quiet line inside a section that already has a heading. */
export declare const Compact: Story;
//# sourceMappingURL=EmptyState.stories.d.ts.map