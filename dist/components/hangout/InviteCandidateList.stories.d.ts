import type { StoryObj } from '@storybook/react-vite';
import { InviteCandidateList, type InviteCandidate } from './InviteCandidateList';
declare const meta: {
    title: string;
    component: typeof InviteCandidateList;
    tags: string[];
    args: {
        candidates: InviteCandidate[];
        onInvite: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The pre-v2 default: flat multi-select with checkboxes + confirm. */
export declare const MultiSelect: Story;
/** Search + presence grouping — offline people stay pickable. */
export declare const SearchableGrouped: Story;
/** Single-select: click a row to fire onPick — no checkboxes, no confirm. */
export declare const SinglePick: Story;
/** Dark call chrome (the CallSettingsDialog People-tab surface). */
export declare const DarkTone: Story;
/** Grouped empty state — copy that doesn't claim "nobody is online". */
export declare const GroupedEmpty: Story;
//# sourceMappingURL=InviteCandidateList.stories.d.ts.map