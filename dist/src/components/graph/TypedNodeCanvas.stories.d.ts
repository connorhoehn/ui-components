import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypedNodeCanvas } from './TypedNodeCanvas';
declare const meta: Meta<typeof TypedNodeCanvas>;
export default meta;
type Story = StoryObj<typeof TypedNodeCanvas>;
/** The Activity tier graph (mockup): three tiers and the Library, a running compaction animated. */
export declare const TierGraph: Story;
/** The same graph as its list equivalent. */
export declare const ListFallback: Story;
/** No moving dot — what a reader with reduced motion sees. */
export declare const Static: Story;
export declare const Empty: Story;
export declare const Dark: Story;
//# sourceMappingURL=TypedNodeCanvas.stories.d.ts.map