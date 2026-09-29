// src/integrations/realtime/IncomingCallToast.tsx
//
// "<caller> is calling" with Decline / Accept, pinned to a viewport corner on
// every page of an app shell — the ring from realtime-modules'
// `useIncomingConversationCalls()`:
//
//   const rings = useIncomingConversationCalls({ gateway, self, onAccept });
//   const head = rings.rings[0];
//   {head && <IncomingCallToast ring={head} onAccept={() => rings.accept(head)} onDecline={() => rings.decline(head)} />}
//
// Not `CallStartedBanner`: its answers are Join / Dismiss and its 30 s
// auto-expire calls the dismiss handler — for a ring that would be a decline,
// refusing the call on the caller's screen instead of letting it age out as a
// missed call (the hook's TTL drops it silently). This toast never expires on
// its own. Not `IncomingCallPopover` either: that one is anchored under a
// document toolbar's Call button and carries documents and device toggles; a
// conversation ring can arrive on any page.
//
// Props-driven, no realtime-modules import: `ring` is a structural mirror of
// RM's `IncomingConversationCall`.

import { FloatingCard, type FloatingCardProps } from '../../components/layout/DockedAside';
import Banner from '../../components/shared/Banner';
import { Button } from '../../components/ui/Button';
import { Inline } from '../../components/ui/Stack';
import { PhoneIcon } from '../../components/ui/Icons';
import type { RMIncomingConversationCall } from './conversationCallTypes';

export interface IncomingCallToastProps {
  /** One of `useIncomingConversationCalls().rings` (the head of the queue). */
  ring: RMIncomingConversationCall;
  onAccept: () => void;
  onDecline: () => void;
  /** Viewport corner. Default top-right. */
  corner?: FloatingCardProps['corner'];
  /** Card width in px. Default 360. */
  width?: number;
  className?: string;
  /** Default `incoming-call-toast`; the answers are `incoming-call-accept` / `incoming-call-decline`. */
  'data-testid'?: string;
}

export function incomingCallTitle(ring: RMIncomingConversationCall): string {
  return ring.kind === 'knock' ? `${ring.callerName} asks to join` : `${ring.callerName} is calling`;
}

export function IncomingCallToast({
  ring,
  onAccept,
  onDecline,
  corner = 'top-right',
  width = 360,
  className,
  'data-testid': testId = 'incoming-call-toast',
}: IncomingCallToastProps) {
  const knock = ring.kind === 'knock';
  return (
    <FloatingCard corner={corner} width={width} data-testid={testId} {...(className ? { className } : {})}>
      <Banner
        variant="info"
        layout="stacked"
        icon={<PhoneIcon size={16} />}
        title={incomingCallTitle(ring)}
        action={(
          <Inline gap="sm">
            <Button size="sm" variant="secondary" onClick={onDecline} data-testid="incoming-call-decline">Decline</Button>
            <Button size="sm" variant="success" onClick={onAccept} data-testid="incoming-call-accept">
              {knock ? 'Let in' : 'Accept'}
            </Button>
          </Inline>
        )}
      >
        {ring.audioOnly ? 'Audio call' : 'Video call'}
      </Banner>
    </FloatingCard>
  );
}

export default IncomingCallToast;
