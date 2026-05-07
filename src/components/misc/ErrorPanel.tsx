// frontend/src/components/ErrorPanel.tsx
//
// ErrorPanel — always-visible dev tool component that accumulates and displays
// all gateway errors since page load. Newest errors appear first.
//
// Imports ERROR_CODE_DESCRIPTIONS from shared errorCodes module.

import { ERROR_CODE_DESCRIPTIONS } from './errorCodes';
import type { GatewayError } from '../../types/gateway';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface Props {
  errors: GatewayError[];   // all errors since page load, newest first
}

export function ErrorPanel({ errors }: Props) {
  return (
    <div className="border-t border-[#e5e7eb] pt-4 mt-4">
      <h3 className="m-0 mb-2 text-sm">
        Errors{' '}
        <span
          className={cn(
            'font-normal',
            errors.length > 0 ? 'text-danger' : 'text-[#9ca3af]'
          )}
        >
          ({errors.length})
        </span>
      </h3>

      {errors.length === 0 ? (
        <p className="text-[#9ca3af] text-sm">No errors.</p>
      ) : (
        <div className="max-h-[200px] overflow-y-auto">
          {errors.map((error, index) => (
            <div
              key={`${error.timestamp}-${error.code}-${index}`}
              className="bg-danger-bg border border-[#fca5a5] rounded px-3 py-2 mb-1 font-mono"
            >
              <strong className="text-danger">[{error.code}]</strong>{' '}
              <span className="text-[#374151]">
                {ERROR_CODE_DESCRIPTIONS[error.code] ?? error.message}
              </span>
              <div className="text-[#9ca3af] text-[0.7rem]">
                {new Date(error.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
