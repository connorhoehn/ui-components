// frontend/src/components/ApiDegradedBanner.tsx
//
// Top-of-content banner shown when the social-api /health rollup reports a
// degraded state. Distinct from the WebSocket "Disconnected" indicator in
// ConnectionStatus — REST can fail while the WS gateway is fine, and vice
// versa. Reusable from any layout that already calls `useApiHealth()`.

import type { ApiHealthSnapshot } from '../../hooks/useApiHealth';
import { cn } from '../../lib/cn';

interface ApiDegradedBannerProps {
  health: ApiHealthSnapshot;
}

export function ApiDegradedBanner({ health }: ApiDegradedBannerProps) {
  if (health.status !== 'degraded') return null;

  const detail = health.failing.length > 0
    ? `Affected: ${health.failing.join(', ')}.`
    : 'Some dependencies are unreachable.';

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="api-degraded-banner"
      className={cn(
        'bg-warning-bg border border-warning rounded-md text-warning-fg',
        'px-3.5 py-2 text-[13px] font-sans flex items-center gap-2.5'
      )}
    >
      <span className="text-base" aria-hidden="true">⚠</span>
      <span className="font-semibold">Backend services degraded — some features unavailable.</span>
      <span className="text-warning-fg font-normal">{detail}</span>
    </div>
  );
}
