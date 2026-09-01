import type { StoryObj } from '@storybook/react-vite';
import { CallControls } from './CallControls';
import type { CallStripParticipant } from './CallParticipantStrip';
declare const meta: {
    title: string;
    component: typeof CallControls;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        mode: import("./CallControls").CallControlsMode;
        density?: import("./CallControls").CallControlsDensity | undefined;
        isMuted?: boolean | undefined;
        isCameraOn?: boolean | undefined;
        isScreenSharing?: boolean | undefined;
        onToggleMute?: (() => void) | undefined;
        onToggleCamera?: (() => void) | undefined;
        onToggleScreenShare?: (() => void) | undefined;
        onUpgradeToVideo?: (() => void) | undefined;
        onEndCall?: (() => void) | undefined;
        onAddParticipant?: ((participantId: string) => void) | undefined;
        availableParticipants?: CallStripParticipant[] | undefined;
        currentParticipantIds?: ReadonlyArray<string> | undefined;
        onOpenAddParticipant?: (() => void) | undefined;
        extras?: import("react").ReactNode;
        className?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Audio call, everything nominal. `onUpgradeToVideo` adds the
 *  "switch to video" glyph — omit it and the button disappears. */
export declare const AudioCall: Story;
/** Video call — the camera toggle replaces the upgrade button. */
export declare const VideoCall: Story;
/** Muted mic, camera off, screen currently shared — the "active" glyph state
 *  for all three toggles at once. */
export declare const MutedCameraOffSharing: Story;
/** Passing `onAddParticipant` reveals the add-people button; clicking it opens
 *  the inline picker. `currentParticipantIds` dedupes people already in. */
export declare const WithAddParticipantPicker: Story;
/** Everyone available is already in the call — the picker shows its empty copy
 *  rather than an empty list. */
export declare const AddParticipantPickerEmpty: Story;
//# sourceMappingURL=CallControls.stories.d.ts.map