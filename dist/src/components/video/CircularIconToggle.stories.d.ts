import type { StoryObj } from '@storybook/react-vite';
import CircularIconToggle from './CircularIconToggle';
declare const meta: {
    title: string;
    component: typeof CircularIconToggle;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** On: soft emphasis surface, the feature is active. */
export declare const On: Story;
/** Off: red soft by default, matching the Meet convention that "off" for
 *  mic/camera is an alarming state worth noticing. */
export declare const OffDanger: Story;
/** `offTone="neutral"` for controls where off is the *normal* state —
 *  screen-share, for instance, is off almost all the time. */
export declare const OffNeutral: Story;
/** Disabled — used before camera permission is granted. */
export declare const Disabled: Story;
/** The three sizes side by side. */
export declare const Sizes: Story;
/** Click to flip — the honest demonstration of the on/off pair. */
export declare const Interactive: Story;
//# sourceMappingURL=CircularIconToggle.stories.d.ts.map