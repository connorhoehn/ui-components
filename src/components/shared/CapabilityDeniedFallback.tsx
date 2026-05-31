// src/components/shared/CapabilityDeniedFallback.tsx
//
// Opinionated EmptyState specialization for the "capability is provisioned but
// not enabled for this tenant/session" case. Useful as the `fallback` slot of
// CapabilityBoundary or as a standalone empty-state when a feature is gated.
//
// Why this exists: capability-denied is a common, recognizable pattern across
// apps (chat-disabled, recording-disabled, agent-disabled, etc.). Shipping it
// as a primitive keeps the copy / iconography consistent and avoids consumers
// hand-rolling lock badges + body strings every time.

import type { ReactNode } from 'react';
import EmptyState from './EmptyState';
import type { EmptyStateAction } from './EmptyState';

export interface CapabilityDeniedFallbackProps {
  /**
   * Capability name as the user would recognize it (e.g. "Chat",
   * "Recording", "AI Assistant"). Used in the default title.
   */
  capabilityName?: string;
  /** Override the default title entirely. */
  title?: string;
  /** Body copy explaining why the feature is unavailable / how to enable it. */
  description?: ReactNode;
  /**
   * Optional CTA — typically a "Request access" or "Upgrade plan" link.
   * For multiple CTAs use `actions` instead.
   */
  actionLabel?: string;
  onAction?: () => void;
  /** Multi-action variant. Takes precedence over actionLabel/onAction. */
  actions?: EmptyStateAction[];
  /** Override the default lock icon. Pass `null` to remove the icon. */
  icon?: ReactNode | null;
  /** Test id (defaults to `capability-denied-fallback`). */
  testId?: string;
}

const DEFAULT_ICON = '🔒';

export function CapabilityDeniedFallback({
  capabilityName,
  title,
  description,
  actionLabel,
  onAction,
  actions,
  icon,
  testId = 'capability-denied-fallback',
}: CapabilityDeniedFallbackProps) {
  const resolvedTitle =
    title ?? (capabilityName ? `${capabilityName} is unavailable` : 'Feature unavailable');
  const resolvedDescription =
    description ??
    (capabilityName
      ? `${capabilityName} is not enabled for this workspace. Contact your administrator to request access.`
      : 'This feature is not enabled for your account. Contact your administrator to request access.');
  const resolvedIcon = icon === null ? undefined : (icon ?? DEFAULT_ICON);

  return (
    <EmptyState
      icon={resolvedIcon}
      title={resolvedTitle}
      description={resolvedDescription}
      actionLabel={actionLabel}
      onAction={onAction}
      actions={actions}
      testId={testId}
    />
  );
}

export default CapabilityDeniedFallback;
