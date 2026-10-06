import type { StoryObj } from '@storybook/react-vite';
import { MeterRow } from './MeterRow';
declare const meta: {
    title: string;
    component: typeof MeterRow;
    tags: string[];
    args: {
        onClick: () => void;
        title: string;
        label: string;
        note: string;
        meter: import("react").JSX.Element;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        onClick: () => void;
        title?: string;
        label: import("react").ReactNode;
        note?: import("react").ReactNode;
        meter: import("react").ReactNode;
        meterWidth?: 'sm' | 'md';
        className?: string;
        'aria-label'?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WideMeter: Story;
/** A column of rows lines their meters up. */
export declare const Column: Story;
//# sourceMappingURL=MeterRow.stories.d.ts.map