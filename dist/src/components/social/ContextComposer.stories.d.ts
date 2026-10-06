import type { StoryObj } from '@storybook/react-vite';
import { ContextComposer } from './ContextComposer';
import type { ComposerContext } from './composerContext';
declare const meta: {
    title: string;
    component: typeof ContextComposer;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        context: ComposerContext;
        onSend: () => true;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** A DM: Chat + Agent, no chip, no Workflow, no page actions; Share a document and send options on the strip. */
export declare const Conversation: Story;
export declare const ConversationWithDock: Story;
/** A page: Agent ⌄ with Terminal off until a loop is attached, the page chip, Workflow ⌄, Make a deck under Agent ⌄. */
export declare const Document: Story;
export declare const DocumentWithDock: Story;
/** A work item's brief: as a document, chip "This work item". */
export declare const WorkItem: Story;
export declare const WorkItemWithDock: Story;
/** A diagram: Agent off with its reason, starts in Chat. */
export declare const Diagram: Story;
export declare const DiagramWithDock: Story;
/** An initiative (aws-agentcore): Agent, Chat off unless wired. */
export declare const Initiative: Story;
export declare const InitiativeWithDock: Story;
/** Search (aws-agentcore): Agent only. */
export declare const Search: Story;
export declare const SearchWithDock: Story;
/** Host rows: a reply quote, the offline notice, a task strip — each forces the full card. */
export declare const WithReplyAndTask: Story;
/** Try it: switch contexts; focus, type and blur to watch the row expand and fold back. */
export declare const Interactive: Story;
/** One mode (a call chat, a document's chat): the mode is a static label — "Chat", no ⌄, no menu. */
export declare const SingleMode: Story;
/** Private vs shared questions (a transcript's Ask column): the eye toggle on the strip, and `#` to cite a document. */
export declare const Privacy: Story;
/**
 * One Send, one compact size (2.407.9): a conversation (split Send with its
 * caret) and a document (plain Send) side by side, idle and expanded. Both idle
 * rows are the small social row (42px) and both cards carry the same compact
 * Send, with the arrow (and the conversation's caret).
 */
export declare const SendOneSize: Story;
/**
 * A page with a call docked above its expanded composer, in EditorShell's
 * footer, at 1280×720 (the viewport the composer check caught it at). The
 * footer row used to cap at half the surface, so the call dock kept its height
 * and the composer card was cut off below its input; now the row never caps
 * below what cannot scroll and the editor above gives up the height.
 */
export declare const PageUnderCallDock: Story;
/**
 * A document page's composer as a host wires it: the draft and the mode are
 * the host's state (`draft` + `onDraftChange`, `mode` + `onModeChange`), Agent
 * first, and the page re-renders with every keystroke. The fast-typing
 * Storybook spec types into this one at delay 0.
 */
export declare const ControlledAgent: Story;
//# sourceMappingURL=ContextComposer.stories.d.ts.map