import type { StoryObj } from '@storybook/react-vite';
import { CallSettingsDrawer } from './CallSettingsDrawer';
import { type AudioVideoSettings } from './AudioVideoSettingsForm';
export declare const DEFAULT_AV: AudioVideoSettings;
declare const meta: {
    title: string;
    component: typeof CallSettingsDrawer;
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Mockup 03b. */
export declare const AudioVideo: Story;
export declare const AudioVideoDark: Story;
/** The microphone blocked in the browser: the alert replaces the select. */
export declare const MicBlocked: Story;
/** Safari: no setSinkId, so no Speakers select — the volume row stays. */
export declare const NoSpeakerSelection: Story;
/** Mockup 04: Warm and Blur picked, not yet applied. */
export declare const Effects: Story;
export declare const EffectsDark: Story;
export declare const Captions: Story;
export declare const CaptionsDark: Story;
/** A-8: the Face effects icon row from RM's sprites (`icon` + plain label, RM ≥ 0.97.4) — glyph in the tile, words under it, then More. */
export declare const EffectsRmFaceLabels: Story;
export declare const EffectsRmFaceLabelsDark: Story;
//# sourceMappingURL=CallSettingsDrawer.stories.d.ts.map