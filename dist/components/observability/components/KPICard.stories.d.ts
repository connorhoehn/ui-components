import type { StoryObj } from '@storybook/react-vite';
import KPICard from './KPICard';
declare const meta: {
    title: string;
    component: typeof KPICard;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        title: string;
        value: number;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        title: string;
        value: number | string;
        delta?: {
            value: number;
            direction: "up" | "down";
        } | undefined;
        sparklineData?: number[] | undefined;
        onClick?: (() => void) | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Numbers are locale-formatted; strings pass through verbatim. */
export declare const Plain: Story;
export declare const WithSparkline: Story;
export declare const TrendingUp: Story;
export declare const TrendingDown: Story;
/** Clickable cards draw a primary border on hover and expose `role="button"`. */
export declare const Clickable: Story;
/**
 * A null metric arrives as the em-dash string — never coerced to 0, so an
 * operator can tell "nothing reported" from "nothing happened".
 */
export declare const UnknownValue: Story;
//# sourceMappingURL=KPICard.stories.d.ts.map