import type { StoryObj } from '@storybook/react-vite';
import { ExpertCard } from './ExpertCard';
declare const meta: {
    title: string;
    component: typeof ExpertCard;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        name: string;
        title?: string | undefined;
        subtitle?: string | undefined;
        imageUrl?: string | undefined;
        matchedSkills: readonly import("./ExpertCard").ExpertSkillMatch[];
        otherSkills?: readonly string[] | undefined;
        contexts?: readonly string[] | undefined;
        evidence?: readonly import("./ExpertCard").ExpertEvidenceItem[] | undefined;
        evidenceLabel?: string | undefined;
        onAsk?: (() => void) | undefined;
        askLabel?: string | undefined;
        footerExtra?: import("react").ReactNode;
        onOpen?: (() => void) | undefined;
        className?: string | undefined;
        'data-testid'?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const FullEvidence: Story;
export declare const SparseMatch: Story;
export declare const NoAction: Story;
//# sourceMappingURL=ExpertCard.stories.d.ts.map