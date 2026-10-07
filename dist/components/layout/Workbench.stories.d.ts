import type { StoryObj } from '@storybook/react-vite';
import { Workbench } from './Workbench';
declare const meta: {
    title: string;
    component: typeof Workbench;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        title: import("react").ReactNode;
        subtitle?: import("react").ReactNode;
        kind?: import("../shared").FileKind;
        onClose?: () => void;
        task?: import("react").ReactNode;
        taskLabel?: string;
        tabs: readonly import("./Workbench").WorkbenchTab[];
        activeTab?: string;
        defaultTab?: string;
        onTabChange?: (id: string) => void;
        moreContext?: import("react").ReactNode;
        footer?: import("react").ReactNode;
        label?: string;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The deck workbench with a running task: phase only, no invented percentage. */
export declare const PresentationRunning: Story;
/** A page with no agent task: the task section is simply absent. */
export declare const PageNoTask: Story;
//# sourceMappingURL=Workbench.stories.d.ts.map