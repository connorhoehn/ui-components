/**
 * AssistantBar — a call assistant's control row in a call's bar (since 2.542.0).
 *
 * One line, all props: the assistant's mark and status (or the app's own
 * status control in `status`), the HoldToTalkButton for someone allowed to
 * take the assistant's ear, and who has its ear now ("Hugo is talking to
 * Milo", for every viewer). Someone else on the floor makes the button busy
 * (disabled, the words beside it); a refused press is shown for a moment by
 * the app (`refusal`). `leading` and `children` carry the app's other items
 * (an invite button, request buttons, a voice chip) before and after.
 *
 * No app logic: who holds the floor, whether this viewer may hold, and what a
 * press does are the app's (e.g. realtime-modules `useAssistantFloor`).
 *
 *   <AssistantBar assistantName="Milo" floor={view.floor} selfId={me}
 *     hold={view.mayHold ? { onStart, onEnd, onCancel, holding } : null}
 *     refusal={refusal} status={<MyStatusMenu />} />
 */
import type { ReactNode } from 'react';
import { Inline } from '../ui/Stack';
import Chip from '../shared/Chip';
import { T } from '../shared/Text';
import { AssistantMark } from '../social/AssistantMark';
import { HoldToTalkButton } from './HoldToTalkButton';
import { cn } from '../../lib/cn';

export interface AssistantBarFloor {
  /** Who has the assistant's ear. */
  userId: string;
  name: string;
}

export interface AssistantBarHold {
  onStart: () => void;
  onEnd: (durationMs: number) => void;
  onCancel: () => void;
  /** This viewer is holding (the app's view of the press, e.g. until the server answers). */
  holding?: boolean;
  /** Space holds too, unless typing. Default true. */
  spaceToTalk?: boolean;
  /** The hold's cap. Default 30 000. */
  maxDurationMs?: number;
  /** Change it to draw the button afresh (e.g. after a refused press). */
  resetKey?: string | number;
  /** Default `Hold to talk to <assistantName>`. */
  label?: string;
  /** Default `Talking to <assistantName>, release to send`. */
  talkingLabel?: string;
}

export interface AssistantBarProps {
  /** The assistant's name, used in every default sentence. */
  assistantName: string;
  /** The app's status control (e.g. a menu whose trigger says "Milo is listening"); replaces the mark and `statusLabel`. */
  status?: ReactNode;
  /** Without `status`: the assistant's mark and these words. Omitted: no mark, no words. */
  statusLabel?: string | null;
  /** Who has the assistant's ear now; null or omitted: nobody. */
  floor?: AssistantBarFloor | null;
  /** This viewer's id, so their own floor reads "You are talking to …". */
  selfId?: string | null;
  /** The hold button's handlers; null or omitted: no button (this viewer may not hold). */
  hold?: AssistantBarHold | null;
  /** A refused press, in words (the app clears it). */
  refusal?: string | null;
  /** The whole row is waiting on the app (the hold button is disabled). */
  disabled?: boolean;
  /** Items before the status (e.g. an invite button). */
  leading?: ReactNode;
  /** Items after the floor (e.g. a voice chip, a badge). */
  children?: ReactNode;
  /** A rule on the left, for a row that follows other bar items. */
  divided?: boolean;
  className?: string;
  /** Root test id; parts get `-hold`, `-floor`, `-refused`. Default `assistant-bar`. */
  'data-testid'?: string;
}

/** "You are talking to Milo" for the person themself, "Hugo is talking to Milo" for everyone else; null with nobody. */
export function assistantFloorWords(assistantName: string, floor: AssistantBarFloor | null | undefined, selfId: string | null | undefined): string | null {
  if (!floor) return null;
  return selfId && floor.userId === selfId ? `You are talking to ${assistantName}` : `${floor.name} is talking to ${assistantName}`;
}

export function AssistantBar({
  assistantName, status, statusLabel, floor = null, selfId = null, hold = null, refusal = null, disabled = false,
  leading, children, divided = false, className, 'data-testid': testId = 'assistant-bar',
}: AssistantBarProps) {
  const holding = !!hold?.holding;
  const words = holding ? `You are talking to ${assistantName}` : assistantFloorWords(assistantName, floor, selfId);
  // Someone else on the floor: the button is busy and says so itself.
  const othersFloor = !holding && !!floor && floor.userId !== selfId;
  const busy = othersFloor && words ? { label: words } : undefined;
  const statusNode = status ?? (statusLabel ? (
    <Inline gap="xs" align="center" wrap={false} data-testid={`${testId}-status`}>
      <AssistantMark size={16} />
      <T size="xs" weight="medium" className="whitespace-nowrap">{statusLabel}</T>
    </Inline>
  ) : null);
  return (
    <Inline gap="xs" align="center" wrap={false} className={cn('shrink-0', divided && 'border-l border-border pl-2', className)}
      data-testid={testId} data-floor={floor?.userId ?? ''} data-holding={String(holding)}>
      {leading}
      {statusNode}
      {hold && (
        <HoldToTalkButton
          key={hold.resetKey ?? 'hold'}
          size="sm"
          spaceToTalk={hold.spaceToTalk ?? true}
          maxDurationMs={hold.maxDurationMs ?? 30_000}
          label={hold.label ?? `Hold to talk to ${assistantName}`}
          talkingLabel={hold.talkingLabel ?? `Talking to ${assistantName}, release to send`}
          {...(busy ? { busy } : {})}
          disabled={disabled}
          onStart={hold.onStart}
          onEnd={hold.onEnd}
          onCancel={hold.onCancel}
          data-testid={`${testId}-hold`}
        />
      )}
      {/* Who has the ear, for everyone (a busy button already says it beside itself). */}
      {words && !(hold && busy) && (
        <Chip size="xs" tone="info" className="whitespace-nowrap" data-testid={`${testId}-floor`}>{words}</Chip>
      )}
      {refusal && <T size="xs" tone="secondary" className="whitespace-nowrap" role="status" data-testid={`${testId}-refused`}>{refusal}</T>}
      {children}
    </Inline>
  );
}
