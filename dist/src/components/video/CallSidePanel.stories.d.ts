import type { StoryObj } from '@storybook/react-vite';
import CallSidePanel from './CallSidePanel';
declare const meta: {
    title: string;
    component: typeof CallSidePanel;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        open: true;
        onClose: () => void;
        title: string;
        children: null;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The documented placement: panel as a flex sibling of the video stage. */
export declare const InCallChat: Story;
/** Hosting a dark-tone ConversationList — a DM switcher inside the call. */
export declare const ConversationSwitcher: Story;
/** Wider panel via widthClassName. */
export declare const Wide: Story;
/** Open/close wiring — the stage reflows to full width when closed. */
export declare const Openable: Story;
/** 'window' — the docked right-edge column. Video keeps flex-1. */
export declare const DockedInWindowMode: Story;
/** 'fullscreen' — same column, more room. */
export declare const DockedInFullscreenMode: Story;
/** 'mini' — a full-bleed sheet OVER the stage; a 320px widget cannot split. */
export declare const OverlaySheetInMiniMode: Story;
//# sourceMappingURL=CallSidePanel.stories.d.ts.map