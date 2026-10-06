import type { StoryObj } from '@storybook/react-vite';
import HealthCell from './HealthCell';
declare const meta: {
    title: string;
    component: typeof HealthCell;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        status: "healthy";
        label: string;
    };
    argTypes: {
        status: {
            control: "radio";
            options: string[];
        };
        dense: {
            control: "boolean";
        };
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        status: import("./HealthCell").HealthStatus;
        label: import("react").ReactNode;
        reason?: import("react").ReactNode;
        dense?: boolean;
        className?: string;
        style?: import("react").CSSProperties;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** No `reason` — the sub-line falls back to the status word. */
export declare const Healthy: Story;
export declare const Degraded: Story;
export declare const Down: Story;
/** Nothing has reported yet — neutral surface, no alarm. */
export declare const Unknown: Story;
/** Tighter padding for packed grids. */
export declare const Dense: Story;
export declare const AllStatuses: Story;
//# sourceMappingURL=HealthCell.stories.d.ts.map