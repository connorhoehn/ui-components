import type { StoryObj } from '@storybook/react-vite';
import { CollapsibleSection } from './CollapsibleSection';
declare const meta: {
    title: string;
    component: typeof CollapsibleSection;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const OpenWithBadge: Story;
/** `density="compact"` tightens the header's padding, drops it to
 *  `text-xs`, and shrinks the chevron — for a section nested inside an
 *  already-dense panel (a debugger side rail, a node inspector). */
export declare const Compact: Story;
//# sourceMappingURL=CollapsibleSection.stories.d.ts.map