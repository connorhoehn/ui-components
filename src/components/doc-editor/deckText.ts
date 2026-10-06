// The pure half of a `/deck <what> [--from …] [--preview]` command: the text
// grammar the composer reads to know what to SEND (the server re-parses and its
// answer wins), the title a deck takes from its prompt, and which recording a
// `--from transcript` deck means. Ported from realtime-examples'
// `chat/commands/deckCommand.ts`; the command wiring stays with the host.

export interface DeckRecordingOption {
  recordingId: string;
  label: string;
  hint?: string;
}

export interface ParsedDeckCommand {
  /** The instruction with the flags removed — what the deck is about. */
  prompt: string;
  preview: boolean;
  from?: 'transcript' | 'documents';
  /**
   * The recording, when `--from` named one directly as `recording:<id>` —
   * the token the picker inserts. Set alongside `from: 'transcript'`.
   */
  recordingId?: string;
}

/**
 * The same grammar `parseDeckCommand` implements on the server, read here only
 * to know what to SEND. Anything unrecognised stays in the prompt rather than
 * being dropped, so a typo reaches the server as text instead of vanishing.
 *
 * `--preview` and `--from` are recognised WHEREVER they fall in the text, not
 * only trailing — every word is scanned, so appending `--preview` after a
 * picked recording (or any other free text) still lands.
 */
export function parseDeckText(argumentText: string): ParsedDeckCommand {
  let preview = false;
  let from: ParsedDeckCommand['from'];
  let recordingId: string | undefined;
  const words = argumentText.trim().split(/\s+/).filter(Boolean);
  const kept: string[] = [];
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index]!;
    const lowered = word.toLowerCase();
    if (lowered === '--preview') { preview = true; continue; }
    if (lowered === '--from' || lowered.startsWith('--from=')) {
      const rawValue = lowered.startsWith('--from=') ? word.slice('--from='.length) : (words[index + 1] ?? '');
      const value = rawValue.toLowerCase();
      if (!lowered.startsWith('--from=')) index += 1;
      // `recording:<id>` is the machine token the picker writes — the id
      // rides the value itself, so which recording survives even if
      // `ctx.argument` does not (the draft was edited further after picking).
      const recordingMatch = /^recording:(.+)$/i.exec(rawValue);
      if (recordingMatch) { from = 'transcript'; recordingId = recordingMatch[1]; }
      else if (value.startsWith('transcript') || value.startsWith('recording') || value.startsWith('meeting')) from = 'transcript';
      else if (value) from = 'documents';
      continue;
    }
    kept.push(word);
  }
  return { prompt: kept.join(' ').trim(), preview, ...(from ? { from } : {}), ...(recordingId ? { recordingId } : {}) };
}

/**
 * "Sprint review — the release risks" → the deck's title and its subject.
 *
 * Only an em dash or en dash ends the title — NOT a bare colon. A colon shows
 * up in ordinary text that has nothing to do with naming a deck (a time like
 * "08:30 AM", a `key:value` option value) and splitting on it there truncates
 * the title mid-sentence. A title that really means "name: subject" keeps its
 * colon; there is no way to tell that case apart from a timestamp without
 * requiring the em/en dash instead, so this only recognises the dash.
 */
export function deckTitleFrom(prompt: string, conversationName?: string): string {
  const match = /^(.+?)\s*(?:—|–)\s*(.+)$/s.exec(prompt.trim());
  const named = match?.[1]?.trim();
  if (named) return named.slice(0, 120);
  const words = prompt.trim().split(/\s+/).slice(0, 8).join(' ');
  return (words || (conversationName ? `${conversationName} deck` : 'Presentation')).slice(0, 120);
}

/**
 * Which recording a `--from transcript` deck reads.
 *
 * The person's own pick first — it is the only unambiguous answer. Failing
 * that, the conversation's single recording, because "the transcript" has one
 * meaning when there is exactly one. With several and no pick, none: guessing
 * which meeting a deck is about is the error worth refusing.
 */
export function recordingIdFor(
  picked: string | undefined,
  recordings: readonly DeckRecordingOption[],
): string | undefined {
  if (picked && recordings.some((item) => item.recordingId === picked)) return picked;
  if (picked) return undefined;
  return recordings.length === 1 ? recordings[0]!.recordingId : undefined;
}
