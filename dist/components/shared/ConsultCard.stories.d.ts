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
        context?: string | undefined;
        origin?: readonly string[] | undefined;
        askedAt?: string | undefined;
        status: "pending" | "answered" | "expired" | "withdrawn";
        answer?: string | undefined;
        answeredBy?: string | undefined;
        onAnswer?: ((answer: string) => void) | undefined;
        answerPlaceholder?: string | undefined;
        busy?: boolean | undefined;
        footer?: import("react").ReactNode;
        className?: string | undefined;
        'data-testid'?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Pending: Story;
export declare const Answered: Story;
export declare const Expired: Story;
//# sourceMappingURL=ConsultCard.stories.d.ts.map