import type { StoryObj } from '@storybook/react-vite';
import { CallTileRow, type CallTileParticipant } from './CallTileRow';
declare const meta: {
    title: string;
    component: typeof CallTileRow;
    parameters: {
        layout: string;
    };
    args: {
        participants: CallTileParticipant[];
        localParticipant: CallTileParticipant;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Dock: Story;
export declare const DockDark: Story;
/** 1280 × 720: 132 × 74 tiles. */
export declare const DockCompact: Story;
/** Nine people, six tiles: the last is +4. */
export declare const DockOverflowCollapse: Story;
/** The same nine, scrolling sideways. */
export declare const DockOverflowScroll: Story;
/** Screen share and a reconnecting person. */
export declare const DockSharingAndReconnecting: Story;
/** `highlightedId` on the floating variant: the followed person's ring is the accent. */
export declare const FloatingHighlighted: Story;
export declare const DockHighlightAtRowEdges: Story;
export declare const DockHighlightAtRowEdgesDark: Story;
//# sourceMappingURL=CallTileRow.stories.d.ts.map