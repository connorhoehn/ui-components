import type { StoryObj } from '@storybook/react-vite';
import MappingReviewPage from './MappingReviewPage';
declare const meta: {
    title: string;
    component: typeof MappingReviewPage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Four low-confidence mappings under the 0.7 threshold, worst last. */
export declare const Loaded: Story;
/** A stricter threshold pulls more items into review. */
export declare const HighThreshold: Story;
/** One item, no type guess at all — the operator must pick. */
export declare const UnmappedOnly: Story;
/** Mapper is confident about everything — queue drained. */
export declare const Empty: Story;
export declare const Loading: Story;
//# sourceMappingURL=MappingReviewPage.stories.d.ts.map