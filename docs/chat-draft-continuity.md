# Chat draft continuity

Additive contract for `@connorhoehn/ui-components/social/rich-composer`.

`RichChatComposer` accepts optional controlled `draft: RichChatDraft` and `onDraftChange(next, previous)`. A draft retains rich HTML (including mention and document atoms), staged `File` objects and a picked command argument. Keep these objects in memory, scoped to the signed-in viewer, organization and conversation. Do not serialize files or reuse drafts across identities.

Key each composer by conversation. Store each callback with an object-identity comparison: replace a conversation's draft only when its current value equals `previous`. A send can complete after its original composer unmounts; this comparison prevents it from clearing newer edits. Keep the draft provider above split/full-page route transitions. If a host allows navigation during uploads, retain its sending state per conversation too.

`onSend` still accepts existing synchronous `void` callbacks. It additionally accepts `boolean | Promise<void | boolean>`: return false or reject to keep the draft; resolve after transport acceptance to clear it. Rejection shows a retry message and retains attachments. Pending sends disable editing and duplicate sends in that mounted composer. The host owns durable upload jobs and conversation routing.

No migration is required for existing uncontrolled consumers. The gateway app uses the new props; other consumers can adopt them independently. No transport, storage or authentication is introduced into the UI library.
