import type { StoryObj } from '@storybook/react-vite';
import CallSettingsDialog from './CallSettingsDialog';
declare const meta: {
    title: string;
    component: typeof CallSettingsDialog;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        open: true;
        onClose: () => void;
        previewStream: null;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Effects tab active, fake preview stream driving the mirrored self-view. */
export declare const EffectsTab: Story;
/** People tab first — the InviteCandidateList picker with its confirm. */
export declare const PeopleTab: Story;
/** Chat tab first — a fake in-call chat body in the new chat slot. */
export declare const ChatTab: Story;
/** No stream — the "Camera off" empty state fills the preview pane. */
export declare const EmptyPreview: Story;
/** Only one slot provided — the People tab disappears entirely. */
export declare const EffectsOnly: Story;
/** Open/close wiring, since the modal portals over the page. */
export declare const Openable: Story;
//# sourceMappingURL=CallSettingsDialog.stories.d.ts.map