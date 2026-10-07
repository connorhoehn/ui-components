import type { StoryObj } from '@storybook/react-vite';
import { MicIcon } from './MediaIcons';
declare const meta: {
    title: string;
    component: typeof MicIcon;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The full set at the default 20px. */
export declare const Gallery: Story;
/** On/off pairs, which is how they are actually consumed — as the two halves
 *  of a CircularIconToggle. */
export declare const OnOffPairs: Story;
/** `size` scales the whole 24×24 viewBox; stroke width scales with it. */
export declare const Sizes: Story;
/** Colour comes entirely from the surrounding `text-*` class — the icons never
 *  name one themselves. */
export declare const InheritsTone: Story;
/** The gallery in the dark theme (icons are currentColor, so they follow the text token). */
export declare const GalleryDark: Story;
//# sourceMappingURL=MediaIcons.stories.d.ts.map