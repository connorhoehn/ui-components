import type { StoryObj } from '@storybook/react-vite';
import { CodeInput } from './CodeInput';
declare const meta: {
    title: string;
    component: typeof CodeInput;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        onComplete: (code: string) => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * Six digits, the TOTP default. Typing auto-advances, Backspace walks back,
 * and pasting a full code fills every box and fires `onComplete`.
 */
export declare const Default: Story;
/** Error state: every box takes the danger border and the message gets `role="alert"`. */
export declare const WithError: Story;
/** Disabled while a verification request is in flight. */
export declare const Disabled: Story;
/** A shorter code — `length` drives both the box count and the aria labels. */
export declare const FourDigit: Story;
//# sourceMappingURL=CodeInput.stories.d.ts.map