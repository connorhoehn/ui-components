// ui-components/src/components/doc-editor/CommentReplyComposer.tsx
//
// A margin card's reply box (WS-J lane B): the library composer
// (`RichChatComposer`) at compact density instead of a bare textarea, with
//
//   - @mentions            the composer's own people menu, fed from the card's
//                          `mentionUsers` (the same list the old textarea used)
//   - `/resolve [note]`    resolve the thread (the note, if any, is posted first)
//   - `/agent <what>`      hand the comment to the page's agent — same as the
//                          card's "Ask agent"
//   - `/assign @person`    post "Assigned to @Name" (a mention, so they are told)
//   - a mic button         push-to-talk dictation into the field. The HOST owns
//                          the audio (a hook from realtime-modules via the
//                          app); this component only renders its state and
//                          inserts the words it is handed.
//
// Presentational: it sends nothing itself.

import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { RichChatComposer, type ComposedMessage, type RichChatComposerHandle } from '../social/RichChatComposer';
import type { ComposerCommand } from '../social/composerCommands';
import type { MentionCandidate } from '../social/MentionSuggestions';
import type { MentionUser } from '../../hooks/useMentionUsers';
import { DictationButton, type DictationButtonState } from './DictationButton';
import { cn } from '../../lib/cn';

export interface CommentReplyDictation {
  /** Mirrors the dictation hook's state; `unsupported` hides nothing, it says why. */
  state: DictationButtonState;
  /** True only while a microphone track is live. */
  micActive: boolean;
  /** Why pressing will not record (signed out, no transcriber) — shown as the tooltip. */
  unavailableReason?: string;
  start: () => void;
  stop: () => void;
}

export interface CommentReplyComposerHandle {
  focus: () => void;
  /** Inserts words at the caret — where a dictated utterance goes. */
  insertText: (text: string) => void;
}

export interface CommentReplyComposerProps {
  mentionUsers: MentionUser[];
  /** A plain reply. Resolve `false` to keep the draft. */
  onReply: (text: string) => void | boolean | Promise<void | boolean>;
  /** `/resolve` — absent on a reply-to-a-reply or a resolved thread. */
  onResolve?: () => void;
  /** `/agent <instruction>`; absent when no agent can edit the page. */
  onAskAgent?: (instruction: string) => void;
  /** `/assign @person`; absent hides the command. */
  onAssign?: (user: MentionUser) => void;
  onCancel?: () => void;
  dictation?: CommentReplyDictation;
  placeholder?: string;
  className?: string;
  'data-testid'?: string;
}

export const COMMENT_REPLY_COMMANDS = {
  resolve: '/resolve',
  agent: '/agent',
  assign: '/assign',
} as const;

/** What a sent draft asks for. Pure, so the routing is testable without an editor. */
export type CommentReplyIntent =
  | { kind: 'reply'; text: string }
  | { kind: 'resolve'; note: string }
  | { kind: 'agent'; instruction: string }
  | { kind: 'assign'; userId: string | null; name: string }
  | { kind: 'empty' };

export function commentReplyIntent(
  message: Pick<ComposedMessage, 'text'> & { command?: ComposedMessage['command'] },
): CommentReplyIntent {
  const text = message.text.trim();
  if (!text) return { kind: 'empty' };
  const m = /^\/(resolve|agent|assign)\b\s*([\s\S]*)$/i.exec(text);
  if (!m) return { kind: 'reply', text };
  const rest = m[2].trim();
  switch (m[1].toLowerCase()) {
    case 'resolve': return { kind: 'resolve', note: rest };
    case 'agent': return { kind: 'agent', instruction: rest };
    default: {
      const picked = message.command?.trigger === COMMENT_REPLY_COMMANDS.assign ? message.command.argument : undefined;
      const name = (picked?.label ?? rest).replace(/^@/, '').trim();
      return { kind: 'assign', userId: picked?.id ?? null, name };
    }
  }
}

export const CommentReplyComposer = forwardRef<CommentReplyComposerHandle, CommentReplyComposerProps>(function CommentReplyComposer({
  mentionUsers,
  onReply,
  onResolve,
  onAskAgent,
  onAssign,
  onCancel,
  dictation,
  placeholder = 'Reply or type /',
  className,
  'data-testid': testId = 'comment-reply-composer',
}, ref) {
  const composerRef = useRef<RichChatComposerHandle | null>(null);
  useImperativeHandle(ref, () => ({
    focus: () => composerRef.current?.focus(),
    insertText: (text: string) => {
      const handle = composerRef.current;
      if (!handle) return;
      const current = handle.editor?.getText() ?? '';
      handle.insertText(current && !/\s$/.test(current) ? ` ${text}` : text);
    },
  }), []);

  const people = useMemo(() => mentionUsers.filter((u) => u.type === 'user'), [mentionUsers]);
  const searchPeople = useCallback((query: string): MentionCandidate[] => {
    const q = query.trim().toLowerCase();
    return mentionUsers
      .filter((u) => !q || u.displayName.toLowerCase().includes(q))
      .slice(0, 8)
      .map((u) => ({ id: u.userId, label: u.displayName, color: u.color, ...(u.type === 'group' ? { hint: `${u.memberCount ?? 0} people` } : {}) }));
  }, [mentionUsers]);

  const commands = useMemo<ComposerCommand[]>(() => {
    const out: ComposerCommand[] = [];
    // Short labels, no hints or descriptions: the menu opens from a 280px
    // margin card at the window's right edge, and a hint column (and the
    // description's status line) ran past it — measured at 1672 and 1280px.
    if (onResolve) out.push({ trigger: COMMENT_REPLY_COMMANDS.resolve, label: 'Resolve thread' });
    if (onAskAgent) out.push({ trigger: COMMENT_REPLY_COMMANDS.agent, label: 'Ask the agent' });
    if (onAssign) {
      out.push({
        trigger: COMMENT_REPLY_COMMANDS.assign,
        label: 'Assign to…',
        argument: {
          placeholder: 'type a name',
          search: (query: string) => {
            const q = query.replace(/^@/, '').trim().toLowerCase();
            return people
              .filter((u) => !q || u.displayName.toLowerCase().includes(q))
              .slice(0, 8)
              .map((u) => ({ id: u.userId, label: u.displayName, ...(u.online ? { hint: 'online' } : {}) }));
          },
        },
      });
    }
    return out;
  }, [onResolve, onAskAgent, onAssign, people]);

  const onSend = useCallback(async (message: ComposedMessage): Promise<boolean> => {
    const intent = commentReplyIntent(message);
    switch (intent.kind) {
      case 'empty': return false;
      case 'reply': return (await onReply(intent.text)) !== false;
      case 'resolve': {
        if (!onResolve) return (await onReply(message.text.trim())) !== false;
        if (intent.note && (await onReply(intent.note)) === false) return false;
        onResolve();
        return true;
      }
      case 'agent': {
        if (!onAskAgent) return (await onReply(message.text.trim())) !== false;
        onAskAgent(intent.instruction);
        return true;
      }
      case 'assign': {
        const user = intent.userId
          ? people.find((u) => u.userId === intent.userId)
          : people.find((u) => u.displayName.toLowerCase() === intent.name.toLowerCase());
        if (!onAssign || !user) return false;
        onAssign(user);
        return true;
      }
    }
  }, [onReply, onResolve, onAskAgent, onAssign, people]);

  const listening = dictation?.micActive === true;
  return (
    <div
      className={cn('flex flex-col gap-1', className)}
      data-testid={testId}
      onKeyDown={(e) => { if (e.key === 'Escape' && onCancel) { e.stopPropagation(); onCancel(); } }}
    >
      <RichChatComposer
        ref={composerRef}
        onSend={onSend}
        onSearchPeople={searchPeople}
        commands={commands}
        placeholder={listening ? 'Listening… release to insert' : placeholder}
        density="compact"
        toolbar="compact"
        radius="md"
        allowAttachments={false}
        allowEmoji={false}
        submitLabel="Reply"
        {...(dictation ? {
          // Beside Send, not in the strip: a 280px margin card is the
          // composer's narrow size, where the strip folds behind `Aa`.
          submitLead: (
            <DictationButton
              state={dictation.state}
              micActive={dictation.micActive}
              {...(dictation.unavailableReason ? { unavailableReason: dictation.unavailableReason } : {})}
              onStart={dictation.start}
              onStop={dictation.stop}
              data-testid={`${testId}-mic`}
            />
          ),
        } : {})}
        data-testid={`${testId}-input`}
      />
    </div>
  );
});

export default CommentReplyComposer;
