import type { ComposerMode } from './RichChatComposer';
/** What the composer is attached to. */
export type ComposerContext = {
    kind: 'conversation';
    id: string;
    title: string; /** A one-to-one DM. */
    dm?: boolean;
} | {
    kind: 'document' | 'work-item' | 'diagram';
    id: string;
    title: string;
} | {
    kind: 'initiative' | 'search';
    id: string;
    title: string;
};
export type ComposerContextKind = ComposerContext['kind'];
export declare const COMPOSER_CONTEXT_KINDS: readonly ComposerContextKind[];
/** Which optional rows and controls a context allows. */
export interface ComposerContextFeatures {
    /** The context chip ("● Roadmap") at the card's row end. */
    contextChip: boolean;
    /** The `Workflow ⌄` menu (and the workflow command). */
    workflows: boolean;
    /**
     * The command a workflow pick writes: `/workflow <label>` with the pick as
     * the command's argument. `null`: the pick writes `/<id> ` (a command per
     * workflow, the initiative/search convention).
     */
    workflowCommand: string | null;
    /** Page actions under `Agent ⌄` — "Make a deck" and the host's `moreActions`. */
    pageActions: boolean;
    /** Send options (the split Send) and "Share a document". */
    sendOptions: boolean;
    /** A reply quote above the row. */
    reply: boolean;
    /** The task strip joined to the composer's top edge. */
    taskStrip: boolean;
    /** The "you are offline" notice. */
    offline: boolean;
    /** The "the model is unreachable" notice. */
    modelUnavailable: boolean;
    /** `chat-only`: attachments only while composing a Chat message. */
    attachments: 'always' | 'chat-only';
    emoji: boolean;
    mentions: boolean;
    /**
     * `onSend` receives what was TYPED (Agent mode's `/agent ` prefix removed,
     * the command re-matched). `false`: the chat router's form, `/agent …`,
     * which a conversation's command registry routes.
     */
    typedText: boolean;
}
export interface ComposerContextPreset {
    kind: ComposerContextKind;
    /** The modes offered here at all. */
    modes: readonly ComposerMode[];
    /** Where a fresh composer starts. */
    defaultMode: ComposerMode;
    /** Offered but off, with `modeUnavailableReasons`. */
    disabledModes: readonly ComposerMode[];
    modeUnavailableReasons: Partial<Record<ComposerMode, string>>;
    modePlaceholders: Partial<Record<ComposerMode, string>>;
    /** The context chip's label, or null for none. */
    chipLabel: string | null;
    /** Accessible name of the composer region. */
    regionLabel: string;
    features: ComposerContextFeatures;
}
/** What the preset needs to know about the host's wiring. */
export interface ComposerContextWiring {
    /** A terminal is attached (`onShellCommand`). Without one, Terminal is off with a reason. */
    terminal?: boolean;
    /** Chat has somewhere to go. Default true except for `initiative`/`search`. */
    chat?: boolean;
    /** The agent is unavailable here — Agent is shown off with this reason. */
    agentUnavailableReason?: string;
}
export declare const COMPOSER_CONTEXT_REASONS: {
    readonly terminal: 'Attach an agent loop to use the terminal here';
    readonly noThread: 'This view has no discussion thread — ask the agent instead';
    readonly diagramAgent: 'The agent cannot edit diagrams yet — describe the change in Chat';
};
/**
 * The preset for a context: its modes, reasons, placeholders, chip and the
 * rows it allows. Pure — the same context always gives the same preset.
 */
export declare function composerContextPreset(context: ComposerContext, wiring?: ComposerContextWiring): ComposerContextPreset;
/** Identity claims a composer may read a name from (an ID token, a BFF session). */
export interface ComposerIdentity {
    displayName?: string | null;
    given_name?: string | null;
    family_name?: string | null;
    name?: string | null;
    email?: string | null;
}
/**
 * The local participant's name from identity claims: `displayName` first
 * (aws-agentcore's BFF tokens), then `given_name` + `family_name` (Cognito,
 * and the gateway's `SKIP_AUTH` bypass), then `name`, then the email's local
 * part. `undefined` when none of them says anything.
 */
export declare function identityDisplayName(identity: ComposerIdentity | null | undefined): string | undefined;
//# sourceMappingURL=composerContext.d.ts.map