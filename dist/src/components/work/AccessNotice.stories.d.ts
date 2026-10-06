import type { StoryObj } from '@storybook/react-vite';
import { AccessNotice } from './AccessNotice';
declare const meta: {
    title: string;
    component: typeof AccessNotice;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        tone?: import("./AccessNotice").AccessNoticeTone;
        title: string;
        body?: import("react").ReactNode;
        action?: import("./AccessNotice").AccessNoticeAction | null;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
    args: {
        tone: "warning";
        title: string;
        body: string;
        action: {
            label: string;
            onClick: () => void;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Mockup: Story;
export declare const NoAction: Story;
export declare const Info: Story;
export declare const Danger: Story;
export declare const Dark: Story;
//# sourceMappingURL=AccessNotice.stories.d.ts.map