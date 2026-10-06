import type { StoryObj } from '@storybook/react-vite';
import { LinkedItemsSection } from './LinkedItemsSection';
declare const meta: {
    title: string;
    component: typeof LinkedItemsSection;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The mockup's two rows, each with the linked document's own status. */
export declare const Default: Story;
/** A link whose status is unknown shows no pill — not a placeholder. */
export declare const MixedStatus: Story;
export declare const Empty: Story;
export declare const Dark: Story;
//# sourceMappingURL=LinkedItemsSection.stories.d.ts.map