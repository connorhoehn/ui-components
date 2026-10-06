import type { StoryObj } from '@storybook/react-vite';
import { ProcedureSteps } from './ProcedureSteps';
declare const meta: {
    title: string;
    component: typeof ProcedureSteps;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        steps: import("./ProcedureSteps").ProcedureStep[];
        numbered?: boolean;
        size?: 'sm' | 'md';
        onSelectStep?: (id: string) => void;
        emptyLabel?: string;
        className?: string;
        'aria-label'?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
    args: {
        'aria-label': string;
        steps: {
            id: string;
            title: string;
        }[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** A guide's steps, read once in the record body (Knowledge mockup). */
export declare const Numbered: Story;
/** The procedure's Runs tab: each step's latest outcome (Overview mockup). */
export declare const WithOutcomes: Story;
export declare const WithBodies: Story;
export declare const Selectable: Story;
export declare const Unnumbered: Story;
export declare const Empty: Story;
export declare const Dark: Story;
//# sourceMappingURL=ProcedureSteps.stories.d.ts.map