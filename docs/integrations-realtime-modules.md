# @connorhoehn/ui-components/integrations/realtime-modules

Adapter helpers and wrapped components that bridge the
`@connorhoehn/realtime-modules` hook outputs to
`@connorhoehn/ui-components` component prop shapes.

## Why this exists

The realtime-modules hooks return wire-faithful types that mirror the
gateway's WebSocket frame shapes. The ui-components components were
designed around a slightly different field vocabulary. The gap:

| Hook field | Component prop | Component |
|---|---|---|
| `ChatMessage.message` | `ChatMessage.content` | `ChatPanel` |
| `PresenceEntry.clientId` | `PresenceUser.id` | `PresencePanel`, `PresenceAvatars` |
| `PresenceEntry.metadata.displayName` | `PresenceUser.name` | `PresenceAvatars` |
| `Reaction.position` (opaque) | `EphemeralReaction.{x,y}` (numbers) | `ReactionsOverlay` |
| `ActivityEvent.{displayName,eventType,detail}` | `ActivityFeedItem.{actor,action,subject,kind}` | `ActivityFeed` |
| `HangoutParticipant.audioOn` | `HangoutLayoutParticipant.isMuted` (inverted) | `HangoutLayout` |

Without this subpath, every app writes an inline adapter in every
component — usually forgetting one field (commonly `message` vs `content`
on ChatMessage) and ending up with a custom inline panel instead of
`ChatPanel`.

## Installation

`@connorhoehn/realtime-modules` is a peer dependency listed as optional —
install it if you use this subpath:

```sh
npm install @connorhoehn/realtime-modules
```

## Usage

### Wrapped components (recommended)

Pass the hook return directly. Adaptation happens inside.

```tsx
import { GatewaySocketProvider, useChat, usePresence } from '@connorhoehn/realtime-modules/client';
import {
  WrappedChatPanel,
  WrappedPresencePanel,
} from '@connorhoehn/ui-components/integrations/realtime-modules';

function MyRoom({ channel }: { channel: string }) {
  const chat     = useChat(channel);
  const presence = usePresence(channel);

  return (
    <>
      <WrappedPresencePanel presence={presence} currentClientId={clientId} />
      <WrappedChatPanel     chat={chat} presence={presence} />
    </>
  );
}
```

### WrappedChatPanel

```tsx
<WrappedChatPanel
  chat={useChat(channel)}          // required
  presence={usePresence(channel)}  // optional — drives typingUsers banner
  disabled={false}                 // optional
/>
```

### WrappedPresencePanel

```tsx
<WrappedPresencePanel
  presence={usePresence(channel)}  // required
  currentClientId={clientId}       // required — highlights "you"
/>
```

### WrappedActivityPanel

```tsx
<WrappedActivityPanel
  activity={useActivity(channel)}  // required
  visibleCount={3}                 // optional, default 3
  rotateMs={4200}                  // optional, default 4200ms
/>
```

### WrappedReactionsOverlay

Manages the ephemeral TTL for you — no `setTimeout` in app code.

```tsx
<WrappedReactionsOverlay
  reactions={useReactions(channel)}  // required
  ttlMs={2500}                       // optional, default 2500ms
/>
```

### WrappedFileUploadDrop

```tsx
<WrappedFileUploadDrop
  fileUpload={useFileUpload(channel)}  // required
  accept="image/*,.pdf"
  maxSize={10 * 1024 * 1024}
  multiple
/>
```

### WrappedHangoutLayout

Inject `<video>` elements keyed by `clientId`. The layout decides where to
place each tile.

```tsx
<WrappedHangoutLayout
  hangout={useVideoHangout(channel)}  // required
  localClientId={clientId}            // required — separates local PiP from grid
  videoElements={{
    [participantClientId]: <video ref={videoRef} autoPlay playsInline />,
  }}
  mode="auto"
/>
```

## Adapter functions

Use the adapter functions directly if you need fine-grained control or
are feeding data into a custom component:

```ts
import {
  adaptChatMessage,
  adaptChatMessages,
  adaptPresenceRoster,
  adaptReaction,
  adaptActivityEvents,
  adaptFileUploads,
  adaptHangoutParticipants,
} from '@connorhoehn/ui-components/integrations/realtime-modules';

// single message
const uiMsg = adaptChatMessage(chatHook.messages[0]);

// entire roster → PresenceAvatars users prop
const avatarUsers = adaptPresenceRoster(presenceHook.roster);
```

## Full composition pattern

```tsx
import {
  GatewaySocketProvider,
  useChat, usePresence, useReactions, useActivity,
} from '@connorhoehn/realtime-modules/client';
import {
  WrappedChatPanel,
  WrappedPresencePanel,
  WrappedActivityPanel,
  WrappedReactionsOverlay,
} from '@connorhoehn/ui-components/integrations/realtime-modules';

function CollaborationRoom({ url, channel, clientId }: Props) {
  return (
    <GatewaySocketProvider url={url} channel={channel}>
      <RoomInner channel={channel} clientId={clientId} />
    </GatewaySocketProvider>
  );
}

function RoomInner({ channel, clientId }: { channel: string; clientId: string }) {
  const chat     = useChat(channel);
  const presence = usePresence(channel);
  const activity = useActivity(channel);
  const reactions = useReactions(channel);

  return (
    <div className="grid grid-cols-3 gap-4">
      <WrappedPresencePanel presence={presence} currentClientId={clientId} />
      <WrappedChatPanel     chat={chat} presence={presence} />
      <WrappedActivityPanel activity={activity} />
      <WrappedReactionsOverlay reactions={reactions} />
    </div>
  );
}
```
