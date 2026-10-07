import type { StoryObj } from '@storybook/react-vite';
import { AgentComposerDock } from './AgentComposerDock';
import type { ComposerReference } from './ComposerReferences';
declare const meta: {
    title: string;
    component: typeof AgentComposerDock;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        presentation?: 'compact' | 'document';
        mode?: import("./RichChatComposer").ComposerMode;
        defaultMode?: import("./RichChatComposer").ComposerMode;
        onModeChange?: (mode: import("./RichChatComposer").ComposerMode) => void;
        placeholder?: string;
        modePlaceholders?: Partial<Record<import("./RichChatComposer").ComposerMode, string>>;
        references?: readonly ComposerReference[];
        onRemoveReference?: (id: string) => void;
        commands?: import("./composerCommands").ComposerCommand[];
        workflows?: readonly import("./AgentComposerDock").AgentComposerWorkflow[];
        onWorkflow?: (id: string) => void;
        modes?: readonly import("./RichChatComposer").ComposerMode[];
        disabledModes?: readonly import("./RichChatComposer").ComposerMode[];
        modeUnavailableReasons?: Partial<Record<import("./RichChatComposer").ComposerMode, string>>;
        dock?: import("react").ReactNode;
        draft?: import("./RichChatComposer").RichChatDraft;
        onDraftChange?: (draft: import("./RichChatComposer").RichChatDraft, previous: import("./RichChatComposer").RichChatDraft | undefined) => void;
        defaultDraft?: string | import("./RichChatComposer").RichChatDraft;
        draftKey?: string;
        onSend: (message: import("./RichChatComposer").ComposedMessage, context: import("./AgentComposerDock").AgentComposerSendContext) => boolean | Promise<boolean>;
        onSearchDocuments?: import("./RichChatComposer").RichChatComposerProps['onSearchDocuments'];
        documentMenu?: import("./RichChatComposer").RichChatComposerProps['documentMenu'];
        onSearchPeople?: (query: string) => import("./MentionSuggestions").MentionCandidate[] | Promise<import("./MentionSuggestions").MentionCandidate[]>;
        allowAttachments?: boolean;
        allowEmoji?: boolean;
        disabled?: boolean;
        working?: boolean;
        status?: import("./RichChatComposer").ComposerStatus | null;
        hints?: readonly import("./RichChatComposer").ComposerHint[];
        suggestions?: readonly string[];
        onSuggestion?: (suggestion: string) => void;
        submitLabel?: import("./RichChatComposer").RichChatComposerProps['submitLabel'];
        maxInputHeight?: number | string;
        composerRef?: import("react").Ref<import("./RichChatComposer").RichChatComposerHandle>;
        label?: string;
        inputLabel?: string;
        className?: string;
        'data-testid'?: string;
        composerTestId?: string;
    }>) => import("react").JSX.Element)[];
    args: {
        onSend: () => true;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The Initiative Work page: document toolbar, the initiative chip, a prefill and the Workflow ⌄ menu. */
export declare const DocumentWithWorkflows: Story;
/** The initiatives list's lighter card: compact toolbar and density. */
export declare const Compact: Story;
/** Chat is off with the host's reason (open the Agent ⌄ menu to read it). */
export declare const ChatDisabledWithReason: Story;
/** Search: `#` opens an "Add context" card over the host's records; chips are the selection. */
export declare const SearchLike: Story;
/** A document page on a call: the live `CallDock` (two people) pinned above the document-preset composer via `dock`. */
export declare const WithADockedCallShelf: Story;
/** A devbox terminal: `modes={['terminal']}` offers Terminal alone (no Chat/Agent rows, no default disable). */
export declare const TerminalOnly: Story;
//# sourceMappingURL=AgentComposerDock.stories.d.ts.map