import type { StoryObj } from '@storybook/react-vite';
import { RecordGraphCard } from './RecordGraphCard';
import type { RecordGraphEdge, RecordGraphRecord } from '../graph/recordGraphLayout';
declare const meta: {
    title: string;
    component: typeof RecordGraphCard;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        records: RecordGraphRecord[];
        edges: RecordGraphEdge[];
        onOpen: () => void;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        records: RecordGraphRecord[];
        edges: RecordGraphEdge[];
        selectedKeys?: string[];
        title?: string;
        summary?: string;
        expanded?: boolean;
        onToggleExpanded?: (next: boolean) => void;
        onOpen?: () => void;
        onSelectionChange?: (keys: string[]) => void;
        onOpenRecord?: (record: RecordGraphRecord) => void;
        onAskSelection?: () => void;
        height?: number;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** One row under an answer: the best-connected records' marks, Expand and Open graph. */
export declare const Collapsed: Story;
/** Expanded inline: the full RecordGraph at 320px, the conversation below undisturbed. */
export declare const Expanded: Story;
/** A selection shared with the Results tab: its marks in the header, framed when expanded. */
export declare const WithSelection: Story;
/** No connections among the records: the card says so and offers no Expand. */
export declare const NoConnections: Story;
//# sourceMappingURL=RecordGraphCard.stories.d.ts.map