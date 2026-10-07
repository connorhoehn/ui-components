import type { StoryObj } from '@storybook/react-vite';
import { InlinePlaceholder } from './InlinePlaceholder';
declare const meta: {
    title: string;
    component: typeof InlinePlaceholder;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        size: {
            control: "radio";
            options: string[];
        };
        align: {
            control: "radio";
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
export declare const Default: Story;
/** The list case: a filter that matched nothing. Left-aligned so it reads as
 *  a row of the list it replaced, not as a banner. */
export declare const FilteredList: Story;
/** The pane case: the placeholder owns the region, so it centres. `sm` is the
 *  larger of the two scales. */
export declare const CenteredPane: Story;
/** With an action. One control beside the line — if you want a heading and a
 *  list of next steps, the region is big enough for `EmptyState`. */
export declare const WithAction: Story;
/** `tone="code"` on a terminal surface — the reason this primitive exists.
 *  Four files in compute/ hand-rolled exactly this line. */
export declare const CodeTone: Story;
//# sourceMappingURL=InlinePlaceholder.stories.d.ts.map