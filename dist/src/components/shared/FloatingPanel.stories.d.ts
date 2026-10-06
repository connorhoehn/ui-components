import type { StoryObj } from '@storybook/react-vite';
import { FloatingPanel } from './FloatingPanel';
declare const meta: {
    title: string;
    component: typeof FloatingPanel;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The headline use: an in-call chat floating next to the call widget on
 *  dark chrome. Drag it by the header; ✕ closes it. */
export declare const DarkCallChat: Story;
/** Light tone for panels floated over regular app surfaces. */
export declare const LightPanel: Story;
//# sourceMappingURL=FloatingPanel.stories.d.ts.map