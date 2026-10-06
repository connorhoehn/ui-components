import type { StoryObj } from '@storybook/react-vite';
import { StackedRail } from './StackedRail';
declare const meta: {
    title: string;
    component: typeof StackedRail;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * The documents case beside the Org rail (SubNavLayout, the reference), both
 * 220px. Three levels open (Engineering handbook → Onboarding → Day one) and
 * a row with an age plus a presence stack (Runbooks), so the 36px pitch, the
 * indent step and the caret column can be measured
 * (tests/storybook/stacked-rail-geometry.spec.ts). The caption carries a
 * 3-digit count and three actions, and two headings a long label + presence
 * + a ⋯ (Workspace drafts, and Auth migration folded) — the 220px chrome
 * budget (tests/storybook/stacked-rail-actions.spec.ts).
 */
export declare const Documents: Story;
/** The Agent library shape: one caption, kind groups with plain counts. */
export declare const Catalog: Story;
//# sourceMappingURL=StackedRail.stories.d.ts.map