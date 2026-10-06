import type { StoryObj } from '@storybook/react-vite';
import Chip from './Chip';
declare const meta: {
    title: string;
    component: typeof Chip;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const SoftSuccess: Story;
export declare const SoftDanger: Story;
export declare const SolidInfo: Story;
export declare const Tiny: Story;
export declare const MonoCount: Story;
/** `palette="code"` renders in the permanently-dark terminal family, for
 *  chips inside a log console or terminal pane. The semantic `tone` still
 *  picks the accent — the two axes are independent. It is spelled `palette`
 *  rather than `tone` here only because `tone` was already taken. */
export declare const CodePalette: Story;
/** `translucent` renders the tone colour at 15% opacity behind text in that
 *  same colour, instead of the soft variant's opaque `-bg` token — for a
 *  badge that sits directly on already-tinted chrome (a code pane, a
 *  canvas node) rather than carrying its own opaque card. Matches the
 *  pipeline debugger's status pills. */
export declare const Translucent: Story;
/** `href` renders the chip as an `<a>` with the same classes — a linked tag
 *  rather than a static label. `external` adds `target="_blank"`, matching
 *  `Link`'s prop of the same name; `rel="noopener noreferrer"` is always on. */
export declare const AsLink: Story;
/** A removable token — approvers, tags, filters. */
export declare const Removable: Story;
//# sourceMappingURL=Chip.stories.d.ts.map