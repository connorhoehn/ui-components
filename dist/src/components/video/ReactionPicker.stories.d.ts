import type { StoryObj } from '@storybook/react-vite';
import { ReactionPicker } from './ReactionOverlay';
declare const meta: {
    title: string;
    component: typeof ReactionPicker;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The default eight-emoji set. */
export declare const Default: Story;
/** A trimmed set — pass `emojis` to match your product's reaction vocabulary. */
export declare const CustomEmojis: Story;
/** Floated over a call stage via `className` — the picker positions itself,
 *  so callers don't need a wrapper `<div>` or an inline style. */
export declare const FloatingOverStage: Story;
/** Wired up, so you can see what the caller actually receives. */
export declare const WithLastPick: Story;
//# sourceMappingURL=ReactionPicker.stories.d.ts.map