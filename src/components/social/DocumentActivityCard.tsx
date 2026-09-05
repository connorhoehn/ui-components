// DocumentActivityCard — a document, as it appears inside a conversation.
//
// ## Why a card and not a line of text
//
// "Bob created a document" as grey text is a dead end: you cannot tell what it
// is, whether anyone is in it, or how to get to it without leaving the thread
// to go and look. The card carries the three things that make the event
// actionable — what it is, who is in it RIGHT NOW, and a way in.
//
// ## Why presence is the point
//
// A document with two people editing it is a different object from the same
// document sitting idle, and the difference is the whole reason to look now
// rather than later. Live editors are shown as faces because a count answers
// "how many" and a face answers "who", and "who" is what decides whether you
// join them.
//
// ## Why it opens in a new tab
//
// A document is a place you go INTO. Navigating there in place makes the
// conversation something you have left, with no visible way back — the browser
// button, if you happen to think of it. Opening alongside keeps the thread
// where it was, which is where the reply you were about to write still is.

import { PresenceAvatars } from '../shared/PresenceAvatars';
import { cn } from '../../lib/cn';

export interface DocumentActivityEditor {
  userId: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface DocumentActivityCardProps {
  documentId: string;
  title: string;
  /** Emoji or short glyph from the document's type. */
  icon?: string;
  /** Who created it — a display name, never a raw userId. */
  createdBy?: string;
  /** People in the document right now. Empty means nobody. */
  editors?: readonly DocumentActivityEditor[];
  /**
   * Opens the document. Omit and the card is a record rather than a dead
   * button — a document the viewer cannot reach should not offer a way in.
   */
  onOpen?: (documentId: string) => void;
  className?: string;
  'data-testid'?: string;
}

export function DocumentActivityCard({
  documentId,
  title,
  icon,
  createdBy,
  editors = [],
  onOpen,
  className,
  'data-testid': testId = 'document-activity-card',
}: DocumentActivityCardProps) {
  const live = editors.length > 0;

  return (
    <div
      data-testid={testId}
      data-document-id={documentId}
      data-editing={live ? 'true' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2',
        className,
      )}
    >
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base"
      >
        {icon || '\u{1F4C4}'}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-[13px] font-semibold text-text-primary">
          {title || 'Untitled'}
        </span>
        <span className="truncate text-[11px] text-text-tertiary">
          {live
            // Present tense, because this is the state right now — and it is
            // the reason to open it before finishing the sentence you were
            // typing.
            ? `${describeEditors(editors)} editing now`
            : createdBy
              ? `Created by ${createdBy}`
              : 'Document'}
        </span>
      </span>

      {live && (
        <span className="shrink-0" data-testid={`${testId}-editors`}>
          <PresenceAvatars
            users={editors.map((e) => ({
              id: e.userId,
              // Never the id: an avatar reading "6e" because the userId began
              // "6ea7c8fd" is the same leak as naming someone by their key.
              // A neutral face says "somebody", which is what we know.
              name: e.displayName ?? 'Someone',
              avatarUrl: e.avatarUrl,
              online: true,
            }))}
            maxVisible={3}
            size={22}
          />
        </span>
      )}

      {onOpen && (
        <button
          type="button"
          data-testid={`${testId}-open`}
          onClick={() => onOpen(documentId)}
          className="shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover"
        >
          Open
        </button>
      )}
    </div>
  );
}

/**
 * Names, not ids: "who" is what decides whether you join them.
 *
 * The count is over EVERY editor, named or not. An editor with no resolvable
 * name still gets a face in the row beside this sentence, so counting only
 * the named ones put "Hank Anderson is editing now" next to two avatars — the
 * sentence and the faces disagreeing about how many people were in the
 * document.
 */
function describeEditors(editors: readonly DocumentActivityEditor[]): string {
  const total = editors.length;
  const shown = (editors.map((e) => e.displayName).filter(Boolean) as string[]).slice(0, 2);
  const rest = total - shown.length;

  if (shown.length === 0) return total === 1 ? 'Someone is' : `${total} people are`;
  if (rest === 0) return shown.length === 1 ? `${shown[0]} is` : `${shown[0]} and ${shown[1]} are`;
  const others = rest === 1 ? '1 other' : `${rest} others`;
  return shown.length === 1 ? `${shown[0]} and ${others} are` : `${shown[0]}, ${shown[1]} and ${others} are`;
}

export default DocumentActivityCard;
