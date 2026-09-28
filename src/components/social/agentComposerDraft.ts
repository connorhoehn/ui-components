// Plain-text → `RichChatDraft`, for `AgentComposerDock`'s `defaultDraft` and a
// host that seeds a controlled draft ("/prioritize ", a prefilled question).
//
// Its own file, free of tiptap, so the root barrel can export it statically
// while the dock itself stays behind a lazy boundary there.

import type { RichChatDraft } from './RichChatComposer';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** One paragraph holding `text` (newlines become `<br>`); `''` is an empty draft. */
export function composerDraftOf(text: string): RichChatDraft {
  return { html: text ? `<p>${escapeHtml(text).replace(/\n/g, '<br>')}</p>` : '', files: [] };
}
