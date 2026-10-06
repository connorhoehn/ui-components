import type { StoryObj } from '@storybook/react-vite';
import { EditorShell } from './EditorShell';
declare const meta: {
    title: string;
    component: typeof EditorShell;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** A long record headline in the space left beside desktop navigation. */
export declare const WrappedRecordTitle: Story;
/** Page variant: document toolbar slot, white page on the grey workspace, dock. */
export declare const PageVariant: Story;
/**
 * Page variant with an agent's two pending edits in the `proposal` slot: drawn
 * between the page and the dock, so the composer can collapse while they wait.
 */
export declare const PageWithProposedEdits: Story;
/** Presentation variant inside the full explorer | editor | workbench frame. */
export declare const PresentationVariantFramed: Story;
/** 2.389.0 — a record whose title IS the page heading: `titleSize="lg"` and "Sources 4" on the tab row. */
export declare const RecordHeadline: Story;
//# sourceMappingURL=EditorShell.stories.d.ts.map