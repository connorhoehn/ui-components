// The agent box under the slide stage — the chat's own composer, pinned to
// Agent mode, talking to the deck.
//
// ## Why this is its own module
//
// `RichChatComposer` pulls in `@tiptap/extension-mention` and
// `@tiptap/suggestion`, which are OPTIONAL peers (see `social/rich-composer.ts`
// for the build that broke when they leaked into a barrel). `PresentationEditor`
// is exported from the root entry, so the composer is reached only through
// `React.lazy`, the same indirection `SortableSlideList` uses for `@dnd-kit`:
// an app that never passes `onInstruct` never loads tiptap's mention stack.
//
// ## What it is and is not
//
// It is the chat composer — same surface, same particle backdrop, same
// processes line — so asking the agent to change a slide looks and feels like
// asking it anything else. It is NOT a second chat: nothing here is posted to a
// conversation. The instruction goes to the host's `onInstruct`, which returns
// an edited spec through the editor's ordinary `onChange`.

import { RichChatComposer, type ComposedMessage, type ComposerProcess } from '../../social/RichChatComposer';
import { FollowUpChips } from '../../shared/FollowUpChips';
import SegmentedControl from '../../shared/SegmentedControl';
import { DensityProvider } from '../../shared/Density';

export type PresentationInstructScope = 'slide' | 'deck';

export interface PresentationAgentComposerProps {
  scope: PresentationInstructScope;
  onScopeChange: (scope: PresentationInstructScope) => void;
  /** "slide 3" — what "This slide" means right now. */
  slideLabel: string;
  /** True while an instruction is with the agent. Send is off and the line says so. */
  busy: boolean;
  /** Resolves true when the instruction was applied (the draft clears), false to keep it. */
  onSubmit: (instruction: string) => Promise<boolean>;
  /** One-tap instructions. Picking one sends it. */
  suggestions?: readonly string[];
  testIdPrefix: string;
}

const PLACEHOLDER: Record<PresentationInstructScope, string> = {
  slide: 'Tell the agent what to change on this slide…',
  deck: 'Tell the agent what to change across the deck…',
};

export function PresentationAgentComposer({
  scope,
  onScopeChange,
  slideLabel,
  busy,
  onSubmit,
  suggestions,
  testIdPrefix,
}: PresentationAgentComposerProps) {
  const processes: ComposerProcess[] = busy
    ? [{ id: 'deck-agent', label: scope === 'slide' ? `Agent is editing ${slideLabel}…` : 'Agent is editing the deck…', tone: 'running' }]
    : [];

  const send = async (message: ComposedMessage): Promise<boolean> => {
    const text = message.text.trim();
    if (!text) return false;
    return onSubmit(text);
  };

  return (
    <div className="flex flex-col gap-1.5" data-testid={`${testIdPrefix}-agent`}>
      <div className="flex flex-wrap items-center gap-2">
        <DensityProvider density="compact"><SegmentedControl
          value={scope}
          onChange={(value) => onScopeChange(value as PresentationInstructScope)}
          options={[
            { value: 'slide', label: 'This slide' },
            { value: 'deck', label: 'Whole deck' },
          ]}
          disabled={busy}
          aria-label="What the agent may change"
          data-testid={`${testIdPrefix}-agent-scope`}
        /></DensityProvider>
        {!!suggestions?.length && !busy && (
          <div className="min-w-0" data-testid={`${testIdPrefix}-agent-suggestions`}>
            <FollowUpChips
              suggestions={[...suggestions]}
              onSelect={(suggestion) => { void onSubmit(suggestion); }}
              className="py-0"
            />
          </div>
        )}
      </div>
      <RichChatComposer
        fixedMode="agent"
        modePlaceholders={{ agent: PLACEHOLDER[scope] }}
        processes={processes}
        disabled={busy}
        allowAttachments={false}
        allowEmoji={false}
        hints={[{ key: '↵', label: 'to send' }, { key: '⇧↵', label: 'for a new line' }]}
        onSend={send}
        data-testid={`${testIdPrefix}-agent-composer`}
      />
    </div>
  );
}

export default PresentationAgentComposer;
