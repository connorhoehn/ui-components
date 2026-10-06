import type { StoryObj } from '@storybook/react-vite';
import { Prose } from './Prose';
declare const meta: {
    title: string;
    component: typeof Prose;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        size: {
            control: "select";
            options: string[];
        };
        tone: {
            control: "select";
            options: (string | undefined)[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
/** `size="sm"` — the same markup, tightened for a dense side panel like the
 *  pipelines editor's "Docs" tab (the original hand-rolled
 *  `.pipeline-docs-pane` stylesheet this component replaces). */
export declare const Compact: Story;
/** `tone` tints headings and links (not body text) — a deprecation notice
 *  or a "what's new" callout inline with regular docs content. */
export declare const Tones: Story;
//# sourceMappingURL=Prose.stories.d.ts.map