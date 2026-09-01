import type { StoryObj } from '@storybook/react-vite';
import AlertsPanel, { type Alert } from './AlertsPanel';
declare const meta: {
    title: string;
    component: typeof AlertsPanel;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        alerts: Alert[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Timestamps are ISO in, relative ("2m ago") out. */
export declare const MixedSeverity: Story;
/** With `onDismiss` each row grows a dismiss control. */
export declare const Dismissible: Story;
/** The state operators actually want to see. */
export declare const Empty: Story;
export declare const CriticalOnly: Story;
//# sourceMappingURL=AlertsPanel.stories.d.ts.map