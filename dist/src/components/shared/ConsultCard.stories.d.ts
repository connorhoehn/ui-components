import type { StoryObj } from '@storybook/react-vite';
import { ConsultCard } from './ConsultCard';
declare const meta: {
    title: string;
    component: typeof ConsultCard;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        question: string;
        context?: string;
        origin?: readonly string[];
        askedAt?: string;
        status: 'pending' | 'answered' | 'expired' | 'withdrawn';
        answer?: string;
        answeredBy?: string;
        onAnswer?: (answer: string) => void;
        answerPlaceholder?: string;
        busy?: boolean;
        footer?: import("react").ReactNode;
        flush?: boolean;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Pending: Story;
export declare const Answered: Story;
export declare const Expired: Story;
//# sourceMappingURL=ConsultCard.stories.d.ts.map