// ChannelBindingStrip — one compact row binding a context to a chat channel:
// "Discussion · #channel · latest line · Open in Social", plus Bind / Unbind
// for a manager. Presentational: the host fetches the binding, subscribes for
// `latest`, and performs the writes. `ChannelHeader` is a full conversation
// header; this is the one-line embed for an overview page or a document.

import { useState } from 'react';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import MetaLine from '../shared/MetaLine';
import { Select } from '../forms/Select';
import { cn } from '../../lib/cn';

export interface ChannelBindingChoice { value: string; label: string }

export interface ChannelBindingStripProps {
  /** Leading label, e.g. "Discussion". */
  label: string;
  /** The bound channel; omit when nothing is bound. */
  channel?: { name: string; privacy?: 'public' | 'private' };
  /** Newest line, already summarised ("Mira: shipping Friday"). */
  latest?: string | null;
  /** Shown beside the channel when the viewer is not a member. */
  notice?: string;
  openLabel?: string;
  /** Cross into the channel's own workspace. Hidden when omitted. */
  onOpen?: () => void;
  openDisabled?: boolean;
  /** Channels that could be bound. Binding UI renders only with `onBind`. */
  choices?: readonly ChannelBindingChoice[];
  onBind?: (value: string) => void | Promise<void>;
  /** Unbind button renders only when provided. */
  onUnbind?: () => void | Promise<void>;
  busy?: boolean;
  error?: string | null;
  unboundLabel?: string;
  className?: string;
  'data-testid'?: string;
}

export function ChannelBindingStrip({
  label, channel, latest, notice, openLabel = 'Open in Social', onOpen, openDisabled, choices = [], onBind, onUnbind,
  busy = false, error, unboundLabel = 'No channel bound', className, 'data-testid': testId = 'channel-binding',
}: ChannelBindingStripProps) {
  const [pick, setPick] = useState('');
  return (
    <div className={cn('flex min-w-0 flex-wrap items-center gap-2', className)} data-testid={testId}>
      <span className="text-[12px] font-medium text-text-secondary">{label}</span>
      {channel ? (
        <>
          <Chip tone="accent" size="xs" data-testid={`${testId}-channel`}>
            #{channel.name}{channel.privacy === 'private' ? ' (private)' : ''}
          </Chip>
          {latest && (
            <span className="min-w-0 truncate text-[12px] text-text-tertiary" title={latest} data-testid={`${testId}-latest`}>{latest}</span>
          )}
          {notice && <MetaLine size="xs" tone="tertiary" items={[notice]} />}
          {onOpen && (
            <Button size="sm" variant="ghost" className="h-7 border-0 text-[12px] font-medium" data-testid={`${testId}-open`} onClick={onOpen} disabled={openDisabled}>
              {openLabel}
            </Button>
          )}
          {onUnbind && (
            <Button size="sm" variant="ghost" className="h-7 border-0 text-[12px] font-medium" data-testid={`${testId}-unbind`} disabled={busy} onClick={() => { void onUnbind(); }}>
              Unbind
            </Button>
          )}
        </>
      ) : (
        <>
          <MetaLine size="xs" tone="tertiary" items={[unboundLabel]} />
          {onBind && (
            <>
              <Select
                aria-label="Channel to bind"
                size="sm"
                className="w-48"
                value={pick}
                placeholder="Choose a channel"
                onChange={(e) => setPick(e.target.value)}
                options={choices.map((c) => ({ value: c.value, label: c.label }))}
                data-testid={`${testId}-choice`}
              />
              <Button size="sm" variant="secondary" className="h-7 text-[12px] font-medium" data-testid={`${testId}-bind`} disabled={!pick || busy}
                onClick={() => { void Promise.resolve(onBind(pick)).then(() => setPick('')); }}>
                Bind
              </Button>
            </>
          )}
        </>
      )}
      {error && <span className="text-[12px] text-danger" role="alert" data-testid={`${testId}-error`}>{error}</span>}
    </div>
  );
}

export default ChannelBindingStrip;
