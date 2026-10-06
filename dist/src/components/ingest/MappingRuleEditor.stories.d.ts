import type { StoryObj } from '@storybook/react-vite';
import MappingRuleEditor from './MappingRuleEditor';
import type { MappingRule } from '../../types/ingest';
declare const meta: {
    title: string;
    component: typeof MappingRuleEditor;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        rules: MappingRule[];
        onChange: () => void;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        rules: MappingRule[];
        onChange: (rules: MappingRule[]) => void;
        readOnly?: boolean;
        idToken?: string | null;
        baseUrl?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Three rules, highest priority first — priority breaks pattern ties. */
export declare const WithRules: Story;
/** No rules yet: everything falls through to the source default pipeline. */
export declare const Empty: Story;
/** A single catch-all rule. */
export declare const SingleCatchAll: Story;
/**
 * Fully controlled: add, edit, reorder and delete all round-trip through
 * `onChange`, so the parent owns the list.
 */
export declare const Interactive: Story;
//# sourceMappingURL=MappingRuleEditor.stories.d.ts.map