import type { StoryObj } from '@storybook/react-vite';
import { WorkArea } from './WorkArea';
declare const meta: {
    title: string;
    component: typeof WorkArea;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((S: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        breadcrumbs?: import("react").ReactNode;
        toolbar?: import("react").ReactNode;
        children: import("react").ReactNode;
        status?: import("react").ReactNode;
        padded?: boolean | undefined;
        tone?: import("./WorkArea").WorkAreaTone | undefined;
        className?: string | undefined;
        bodyClassName?: string | undefined;
        'data-testid'?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const BodyOnly: Story;
export declare const FullBleed: Story;
export declare const CodeTone: Story;
//# sourceMappingURL=WorkArea.stories.d.ts.map