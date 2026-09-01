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
export declare const Small: Story;
export declare const Large: Story;
export declare const Disabled: Story;
export declare const FullWidth: Story;
/** The `code` family, for buttons on a terminal / log / debugger surface.
 *  Every bare `<button className="…">` in those files is there because this
 *  prop did not exist. */
export declare const CodeTone: Story;
//# sourceMappingURL=Button.stories.d.ts.map