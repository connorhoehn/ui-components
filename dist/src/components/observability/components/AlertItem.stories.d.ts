import type { StoryObj } from '@storybook/react-vite';
import AlertItem from './AlertItem';
declare const meta: {
    title: string;
    component: typeof AlertItem;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        severity: "warning";
        title: string;
        description: string;
        timestamp: string;
    };
    argTypes: {
        severity: {
            control: "radio";
            options: string[];
        };
        resolved: {
            control: "boolean";
        };
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        severity: import("./AlertItem").AlertSeverity;
        title: import("react").ReactNode;
        description?: import("react").ReactNode;
        timestamp?: import("react").ReactNode;
        resolved?: boolean;
        action?: import("react").ReactNode;
        className?: string;
        style?: import("react").CSSProperties;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Critical: Story;
export declare const Warning: Story;
export declare const Info: Story;
/** Resolved rows drop their severity tint and dim, keeping history readable. */
export declare const Resolved: Story;
/** Title-only — description and timestamp are both optional. */
export declare const TitleOnly: Story;
/** The `action` slot right-aligns a host-wired control. */
export declare const WithAction: Story;
//# sourceMappingURL=AlertItem.stories.d.ts.map