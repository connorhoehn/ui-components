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
        title?: string;
        subtitle?: string;
        imageUrl?: string;
        matchedSkills: readonly import("./ExpertCard").ExpertSkillMatch[];
        otherSkills?: readonly string[];
        contexts?: readonly string[];
        evidence?: readonly import("./ExpertCard").ExpertEvidenceItem[];
        evidenceLabel?: string;
        onAsk?: () => void;
        askLabel?: string;
        footerExtra?: import("react").ReactNode;
        onOpen?: () => void;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const FullEvidence: Story;
export declare const SparseMatch: Story;
export declare const NoAction: Story;
//# sourceMappingURL=ExpertCard.stories.d.ts.map