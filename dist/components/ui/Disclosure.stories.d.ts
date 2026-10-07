import type { StoryObj } from '@storybook/react-vite';
import { Disclosure } from './Disclosure';
declare const meta: {
    title: string;
    component: typeof Disclosure;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        tone: {
            control: "select";
            options: (string | undefined)[];
        };
        density: {
            control: "select";
            options: string[];
        };
        variant: {
            control: "select";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
/** `density="compact"` tightens padding, drops to `text-xs`, and shrinks
 *  the chevron — for a disclosure nested inside an already-dense panel. */
export declare const Compact: Story;
/** `variant="plain"` drops the outer border and the summary tint — just the
 *  summary row and body, for a borderless toggle inside a list where the
 *  row already has its own separator. Composable with `density="compact"`. */
export declare const Plain: Story;
export declare const OpenByDefault: Story;
export declare const Tones: Story;
/** `summary` takes any node, not just text — useful for a status pill or count
 *  next to the label. */
export declare const RichSummary: Story;
/** Controlled from the host — a "collapse all" button elsewhere in the page
 *  can flip every instance's `open` prop directly. */
export declare const Controlled: Story;
//# sourceMappingURL=Disclosure.stories.d.ts.map