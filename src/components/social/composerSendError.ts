// composerSendError.ts — how a host tells the composer WHY a send failed.
//
// `onSend` rejecting keeps the draft and staged files and shows an alert. The
// alert used to be one fixed sentence ("Unable to send…") whatever went wrong,
// so a 500 from an upload, an invalid upload URL and a dropped socket all read
// the same and the person (and whoever debugged it) learned nothing. A host
// that knows the reason rejects with a ComposerSendError and the alert shows
// its message; any other rejection keeps the generic sentence, because an
// arbitrary Error's message is not written for the person at the keyboard.
//
// Static and tiny on purpose: RichChatComposer is lazy-loaded, and a host
// needs the class in its send handler without pulling the editor chunk.

/** Reject `onSend` with this to show `message` in the composer's alert. */
export class ComposerSendError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'ComposerSendError';
  }
}

/**
 * The person-facing reason carried by a rejected send, or null for the
 * generic alert. Matched by `name`, not `instanceof`: a host and the library
 * can load two copies of this module (a lazy chunk, a linked package), and a
 * reason must survive that.
 */
export function composerSendErrorReason(error: unknown): string | null {
  if (!(error instanceof Error) || error.name !== 'ComposerSendError') return null;
  const reason = error.message.trim();
  return reason || null;
}
