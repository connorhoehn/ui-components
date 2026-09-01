import type { StoryObj } from '@storybook/react-vite';
import { NodeThumbStrip } from './NodeThumbStrip';
declare const meta: {
    title: string;
    component: typeof NodeThumbStrip;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        images: import("./NodeThumbStrip").NodeThumbStripImage[];
        max?: number | undefined;
        'data-testid'?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const SingleImage: Story;
export declare const FullRowNoOverflow: Story;
export declare const WithOverflow: Story;
export declare const CustomMax: Story;
//# sourceMappingURL=NodeThumbStrip.stories.d.ts.map