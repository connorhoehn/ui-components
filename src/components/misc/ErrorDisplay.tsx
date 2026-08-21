// frontend/src/components/ErrorDisplay.tsx
import type { GatewayError } from '../../types/gateway';
import { ERROR_CODE_DESCRIPTIONS } from './errorCodes';

interface Props {
  error: GatewayError | null;
}

export function ErrorDisplay({ error }: Props) {
  if (!error) return null;
  const description = ERROR_CODE_DESCRIPTIONS[error.code] ?? error.message;
  return (
    <div className="bg-danger-bg border border-danger-border rounded px-4 py-3 font-mono mt-2">
      <strong className="text-danger">[{error.code}]</strong>{' '}
      <span className="text-text-primary">{description}</span>
      <div className="text-text-tertiary text-xs mt-1">
        {new Date(error.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}
