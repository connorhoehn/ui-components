import type { StoryObj } from '@storybook/react-vite';
import MediaEffectsTray from './MediaEffectsTray';
declare const meta: {
    title: string;
    component: typeof MediaEffectsTray;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        filters: import("./MediaEffectsTray").MediaEffectsFilterOption[];
        activeFilterId: string;
        onSelectFilter: (id: string) => void;
        backgrounds: import("./MediaEffectsTray").MediaEffectsBackgroundOption[];
        backgroundMode: "none" | "blur" | "image";
        activeBackgroundUrl: string | null;
        onSelectBackground: (mode: "none" | "blur" | "image", url: string | null) => void;
        faceSprites: import("./MediaEffectsTray").MediaEffectsFilterOption[];
        activeFaceSpriteId: string | null;
        onSelectFaceSprite: (id: string | null) => void;
        disabled?: boolean | undefined;
        compact?: boolean | undefined;
        className?: string | undefined;
        'data-testid'?: string | undefined;
    }>) => import("react").JSX.Element)[];
    args: {
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
/** Everything off — the state a user first opens the tray in. */
export declare const Default: Story;
/** Tighter paddings for popover placement (e.g. anchored to an effects
 *  toggle in MediaControlsBar's `extras` slot). */
export declare const Compact: Story;
/** Engine still loading (or no camera) — every chip dimmed and inert. */
export declare const Disabled: Story;
/** One selection active in each section: a filter, an image background
 *  (thumbnail chip highlighted), and a face sprite. */
export declare const WithActiveSelections: Story;
/** Fully wired, so selections actually move between chips. */
export declare const Interactive: Story;
//# sourceMappingURL=MediaEffectsTray.stories.d.ts.map