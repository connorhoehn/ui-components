import type { StoryObj } from '@storybook/react-vite';
import { NetworkQualityBadge, type NetworkQuality } from './NetworkQualityBadge';
declare const meta: {
    title: string;
    component: typeof NetworkQualityBadge;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        quality: NetworkQuality;
        className?: string;
        style?: import("react").CSSProperties;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** 4 bars, success tone. */
export declare const Good: Story;
/** 3 bars, warning tone — labelled "Fair" rather than "Medium". */
export declare const Medium: Story;
/** 2 bars, caution tone. */
export declare const Poor: Story;
/** 1 bar, danger tone — the only state whose label is a full sentence
 *  ("No Connection") rather than a one-word grade. */
export declare const Dead: Story;
/** Docked into a stage corner via `className`. The badge is positioned by the
 *  caller's classes rather than an inline style or a wrapper `<div>`. */
export declare const DockedTopRight: Story;
/** The whole scale side by side, which is how you actually judge whether the
 *  bar counts and tones read as an ordered ramp. */
export declare const AllQualities: Story;
//# sourceMappingURL=NetworkQualityBadge.stories.d.ts.map