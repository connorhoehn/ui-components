# Chat draft continuity

Additive contract for `@connorhoehn/ui-components/social/rich-composer`.

`RichChatComposer` accepts optional controlled `draft: RichChatDraft` and `onDraftChange(next, previous)`. A draft retains rich HTML (including mention and document atoms), staged `File` objects and a picked command argument. Keep these objects in memory, scoped to the signed-in viewer, organization and conversation. Do not serialize files or reuse drafts across identities.

Key each composer by conversation. Store each callback with an object-identity comparison: replace a conversation's draft only when its current value equals `previous`. A send can complete after its original composer unmounts; this comparison prevents it from clearing newer edits. Keep the draft provider above split/full-page route transitions. If a host allows navigation during uploads, retain its sending state per conversation too.

`onSend` still accepts existing synchronous `void` callbacks. It additionally accepts `boolean | Promise<void | boolean>`: return false or reject to keep the draft; resolve after transport acceptance to clear it. Rejection shows a retry message and retains attachments. Pending sends disable editing and duplicate sends in that mounted composer. The host owns durable upload jobs and conversation routing.

No migration is required for existing uncontrolled consumers. The gateway app uses the new props; other consumers can adopt them independently. No transport, storage or authentication is introduced into the UI library.

## Per-message privacy

Additive, and separately opt-in from the rest of this contract. `RichChatComposer` accepts a controlled `privacy?: 'visible' | 'hidden'` (default `'visible'`) and `onPrivacyChange?: (next: 'visible' | 'hidden') => void`. The composer holds no privacy state of its own — it renders `privacy` as given and calls `onPrivacyChange` with the OTHER value when the toggle is pressed; nothing changes on screen until the host applies that value back through `privacy`, the same controlled shape as any other prop here.

Passing `onPrivacyChange` is the entire opt-in. It renders an eye / eye-off toggle in the toolbar next to Attach, with `aria-pressed` and a tooltip from `privacyLabels` (default `{ visible: 'Visible to everyone', hidden: 'Only you' }`), reachable by Tab and toggled with Space or Enter like every other toolbar control. While `privacy === 'hidden'` a "Only you can see this" notice renders above the editor, in the same slot as the slash-command status bar. A host that never passes `onPrivacyChange` sees none of this — no toggle, no hint, and no `privacy` key on its published `RichChatDraft`.

`ComposedMessage.privacy` is unconditional: every send reports the current `privacy` value, `'visible'` by default, whether or not a host has wired the toggle. `RichChatDraft.privacy` rides along with `html`/`files`/`command` — present only once `onPrivacyChange` is supplied — so a host storing one draft object per conversation gets the pick without a second field to key by hand. The composer republishes the draft as soon as the `privacy` prop changes, typically right after the host applies `onPrivacyChange`'s answer, so a press with no accompanying keystroke still lands on a persisted draft. Restoring it on a conversation switch is the host's job, same as `html`/`files`: read `draft.privacy` back and pass it in as `privacy` alongside `draft`.
