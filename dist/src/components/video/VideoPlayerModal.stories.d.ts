import type { StoryObj } from '@storybook/react-vite';
import { VideoPlayerModal } from './VideoPlayerModal';
declare const meta: {
    title: string;
    component: typeof VideoPlayerModal;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        onClose: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** One capture, with a title block and the download footer. */
export declare const SingleSource: Story;
/** Multiple segments add a switcher row. Segment 3 has no `label`, so it falls
 *  back to "Segment 3"; sizes surface as the button's tooltip. */
export declare const MultipleSegments: Story;
/** Chromeless: no title, no subtitle, no download — just the player and the
 *  backdrop. Use for private channels. */
export declare const Minimal: Story;
/** Both composition slots in use. */
export declare const WithHeaderAndFooterSlots: Story;
/** Every source filtered out (empty URLs) — the modal says so rather than
 *  rendering a broken player. */
export declare const NoPlayableSources: Story;
/** The real usage: mounted conditionally by the caller. Escape and a backdrop
 *  click both fire `onClose`. */
export declare const OpenedFromButton: Story;
//# sourceMappingURL=VideoPlayerModal.stories.d.ts.map