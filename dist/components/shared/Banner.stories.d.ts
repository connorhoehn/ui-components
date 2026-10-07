import type { StoryObj } from '@storybook/react-vite';
import Banner from './Banner';
declare const meta: {
    title: string;
    component: typeof Banner;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        variant: {
            control: "select";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Error: Story;
export declare const Warning: Story;
export declare const Info: Story;
export declare const Success: Story;
export declare const Dismissible: Story;
export declare const NoTitle: Story;
/** 2.389.0 — a full-width notice in a document body: icon · title over body · trailing action. */
export declare const Callout: Story;
/** 2.389.0 — the tone's default glyph on an ordinary inline banner. */
export declare const WithIcon: Story;
/**
 * 2.389.4 — every tone's callout on its pale `--color-{tone}-callout` surface,
 * so the four read as one family (and none as a saturated slab).
 */
export declare const CalloutTones: Story;
//# sourceMappingURL=Banner.stories.d.ts.map