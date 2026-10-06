import type { StoryObj } from '@storybook/react-vite';
import { KeyValue } from './KeyValue';
declare const meta: {
    title: string;
    component: typeof KeyValue;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        items: import("./KeyValue").KeyValueItem[];
        layout?: import("./KeyValue").KeyValueLayout;
        labelWidth?: string;
        divided?: boolean;
        className?: string;
        'aria-label'?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
    args: {
        items: {
            label: string;
            value: string;
        }[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The run inspector's facts (Activity mockup). */
export declare const Row: Story;
export declare const Stack: Story;
export declare const Grid: Story;
export declare const MonoWithTooltip: Story;
export declare const Dark: Story;
//# sourceMappingURL=KeyValue.stories.d.ts.map