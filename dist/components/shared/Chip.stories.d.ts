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
//# sourceMappingURL=Chip.stories.d.ts.map