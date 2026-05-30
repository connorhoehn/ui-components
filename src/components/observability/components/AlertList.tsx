// AlertList — observability alerts panel.
//
// Wraps <AlertItem> rows in a <Card> with a <CardHeader> showing an
// active-count chip. Supports loading and empty slots.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { Card } from '../../ui/Card';
import CardHeader from '../../shared/CardHeader';
import Chip from '../../shared/Chip';
import AlertItem, { type AlertItemProps, type AlertSeverity } from './AlertItem';

export interface AlertListEntry {
  id: string;
  severity: AlertSeverity;
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  resolved?: boolean;
  action?: ReactNode;
}

export interface AlertListProps {
  items: AlertListEntry[];
  /** Header title. Default: "Alerts". */
  title?: string;
  /** Override the header's right-side meta slot (replaces the default count chip). */
  headerSlot?: ReactNode;
  /** When true, render the loading state instead of the empty/items list. */
  loading?: boolean;
  /** Empty-state slot (rendered when items.length === 0 and !loading). */
  empty?: ReactNode;
  /** Optional max-height on the scrollable region (string CSS value, e.g. "320px"). */
  maxHeight?: string;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const DEFAULT_EMPTY = (
  <div className="text-center text-[12px] text-[var(--color-text-tertiary)] py-8">
    No alerts.
  </div>
);

const DEFAULT_LOADING = (
  <div className="text-center text-[12px] text-[var(--color-text-tertiary)] py-8">
    Loading alerts…
  </div>
);

export function AlertList({
  items,
  title = 'Alerts',
  headerSlot,
  loading = false,
  empty,
  maxHeight,
  className,
  style,
  'data-testid': testId = 'alert-list',
}: AlertListProps) {
  const activeCount = items.filter((a) => !a.resolved).length;

  const defaultMeta =
    activeCount > 0 ? (
      <Chip tone="danger" size="xs" data-testid="alert-list-active-count">
        {activeCount} active
      </Chip>
    ) : null;

  return (
    <Card
      data-testid={testId}
      className={cn('flex flex-col', className)}
      style={style}
    >
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <CardHeader title={title} meta={headerSlot ?? defaultMeta} />
      </div>
      <div
        role="list"
        data-testid={`${testId}-rows`}
        className="flex-1 overflow-y-auto p-2 space-y-1.5"
        style={{ maxHeight }}
      >
        {loading
          ? DEFAULT_LOADING
          : items.length === 0
            ? (empty ?? DEFAULT_EMPTY)
            : items.map((item) => (
                <AlertItem
                  key={`${item.id}-${item.resolved ? 'resolved' : 'active'}`}
                  severity={item.severity}
                  title={item.title}
                  description={item.description}
                  timestamp={item.timestamp}
                  resolved={item.resolved}
                  action={item.action}
                />
              ))}
      </div>
    </Card>
  );
}

export type { AlertSeverity, AlertItemProps };
export { AlertItem };
export default AlertList;
