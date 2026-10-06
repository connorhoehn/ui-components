import type { StoryObj } from '@storybook/react-vite';
import { DocumentCallPanel } from './DocumentCallPanel';
declare const meta: {
    title: string;
    component: typeof DocumentCallPanel;
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Mockup 06: Alice presents Auth architecture; Migration brief is up next. */
export declare const Default: Story;
export declare const DefaultDark: Story;
/** A participant who is not the host, while Alice presents: Present is disabled with the reason. */
export declare const PresentBlocked: Story;
/** Nobody presenting — Present this document is live. */
export declare const NobodyPresenting: Story;
/** Alone, two people still ringing, one who did not answer. */
export declare const WaitingForOthers: Story;
export declare const WaitingForOthersDark: Story;
export declare const Loading: Story;
/** The call-state feed dropped: the lists stay, a warning says so. */
export declare const Reconnecting: Story;
/** 2.395.2: Frank was offline when invited — no ring, a notification: "Offline · notified" (muted, dimmed row). */
export declare const WithNotifiedInvitee: Story;
export declare const WithNotifiedInviteeDark: Story;
//# sourceMappingURL=DocumentCallPanel.stories.d.ts.map