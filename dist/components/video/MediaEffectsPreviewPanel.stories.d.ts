import type { StoryObj } from '@storybook/react-vite';
import MediaEffectsPreviewPanel from './MediaEffectsPreviewPanel';
declare const meta: {
    title: string;
    component: typeof MediaEffectsPreviewPanel;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        previewActive: true;
        previewStream: null;
        isDirty: false;
        onApply: () => void;
        onCancel: () => void;
        filters: {
            id: string;
            label: string;
        }[];
        activeFilterId: string;
        onSelectFilter: () => void;
        backgrounds: {
            id: string;
            label: string;
            url: string;
        }[];
        backgroundMode: "none";
        activeBackgroundUrl: null;
        onSelectBackground: () => void;
        faceSprites: {
            id: string;
            label: string;
        }[];
        activeFaceSpriteId: null;
        onSelectFaceSprite: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The default flow: pick effects, watch "Live" stay unchanged until Apply. */
export declare const AuditionThenApply: Story;
/** Engine never started a session — the surface is read-only and safe. */
export declare const NoSessionIsInert: Story;
/** Hosted in the settings dialog with its small live preview suppressed. */
export declare const InsideCallSettingsDialog: Story;
//# sourceMappingURL=MediaEffectsPreviewPanel.stories.d.ts.map