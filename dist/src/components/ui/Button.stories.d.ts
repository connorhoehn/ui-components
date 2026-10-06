import type { StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
declare const meta: {
    title: string;
    component: typeof Button;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        variant: {
            control: "select";
            options: string[];
        };
        size: {
            control: "select";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Ghost: Story;
export declare const Danger: Story;
export declare const DangerSolid: Story;
/** Semantic colour is a `variant`, not a `tone` — `tone` already names the
 *  surface-vs-code family axis (see `CodeTone` below). Soft fill, same
 *  shape as `danger`. */
export declare const Success: Story;
/** Solid fill with the info tokens — same shape as `danger-solid`, for a
 *  secondary call-to-action that isn't `danger` or `success`. */
export declare const Info: Story;
/** Inline text: no border, no background, no fixed padding, inherits the
 *  surrounding font size, underlines on hover. For a Cancel/Change action
 *  next to another control rather than a boxed button. */
export declare const Link: Story;
export declare const Small: Story;
export declare const Large: Story;
export declare const Disabled: Story;
export declare const FullWidth: Story;
/** The `code` family, for buttons on a terminal / log / debugger surface.
 *  Every bare `<button className="…">` in those files is there because this
 *  prop did not exist. */
export declare const CodeTone: Story;
/** Every variant × size — all at the one button weight (semibold). */
export declare const WeightGrid: Story;
//# sourceMappingURL=Button.stories.d.ts.map