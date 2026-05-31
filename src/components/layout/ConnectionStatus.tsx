// src/components/layout/ConnectionStatus.tsx
//
// @deprecated since 2.14 — use `ConnectionPill` from
// `@connorhoehn/ui-components/shared`. This alias is scheduled for removal
// in 2.15.

import { ConnectionPill, type ConnectionPillProps } from '../shared/ConnectionPill';

/** @deprecated Use `ConnectionPill` from `/shared`. Alias retained for one minor. */
export type ConnectionStatusProps = Pick<ConnectionPillProps, 'state'>;

/** @deprecated Use `ConnectionPill` from `/shared`. Alias retained for one minor. */
export function ConnectionStatus(props: ConnectionStatusProps) {
  return <ConnectionPill {...props} />;
}
