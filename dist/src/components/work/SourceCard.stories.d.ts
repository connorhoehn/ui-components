import type { StoryObj } from '@storybook/react-vite';
import { SourceCard } from './SourceCard';
declare const meta: {
    title: string;
    component: typeof SourceCard;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        id: string;
        title: string;
        kind?: import("../shared").FileKind;
        timestamp?: string | number | Date | null;
        excerpt?: import("react").ReactNode;
        onOpen?: (id: string) => void;
        href?: string;
        current?: boolean;
        meta?: string;
        layout?: 'card' | 'row';
        now?: number;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
    args: {
        id: string;
        title: string;
        timestamp: number;
        excerpt: string;
        now: number;
        onOpen: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Card: Story;
export declare const Current: Story;
export declare const AsLink: Story;
/** The Knowledge record's Sources panel, List view (mockup). */
export declare const List: Story;
export declare const EmptyList: Story;
export declare const Dark: Story;
/** 2.389.0 — a "Based on" row: whole-row control, tiled mark, meta line, chevron. */
export declare const BasedOnRow: Story;
//# sourceMappingURL=SourceCard.stories.d.ts.map