import type { StoryObj } from '@storybook/react-vite';
import { IncomingCallPopover } from './IncomingCallPopover';
declare const meta: {
    title: string;
    component: typeof IncomingCallPopover;
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Mockup 05 (407px). */
export declare const Default: Story;
export declare const DefaultDark: Story;
/** Mockup 05b (375px): one-line caller, "+1", "3 in call". */
export declare const Compact: Story;
export declare const CompactDark: Story;
/** Already in a call: Switch instead of Join call. */
export declare const Busy: Story;
/** Nobody has joined yet, one document. */
export declare const NobodyYet: Story;
/** Microphone blocked. */
export declare const MicBlocked: Story;
/** 2.395.0: focus lands on Join call by default (Default above); `initialFocus="close"` puts it on the ×. */
export declare const FocusOnClose: Story;
//# sourceMappingURL=IncomingCallPopover.stories.d.ts.map