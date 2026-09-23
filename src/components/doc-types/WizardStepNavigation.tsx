// frontend/src/components/doc-types/WizardStepNavigation.tsx
//
// Step indicator (dots/labels) and prev/next/finish navigation buttons
// extracted from DocumentTypeWizard.tsx.

import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------

const STEP_LABELS = ['Basic Info', 'Sections', 'View Modes'];

export function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-0 mb-7">
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <div key={n} className="flex items-center">
            <div className={cn(
              'w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold',
              done && 'bg-primary text-on-primary border-2 border-transparent',
              active && 'bg-accent-bg text-accent-fg border-2 border-primary',
              !done && !active && 'bg-surface-hover text-text-tertiary border-2 border-transparent',
            )}>
              {done ? '✓' : n}
            </div>
            <span className={cn(
              'ml-1.5 text-xs whitespace-nowrap',
              active ? 'font-semibold text-text-primary' : 'font-normal text-text-tertiary',
            )}>
              {STEP_LABELS[i]}
            </span>
            {n < total && (
              <div className="w-8 h-px bg-border mx-2.5 shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bottom navigation bar
// ---------------------------------------------------------------------------

export interface WizardNavProps {
  step: number;
  totalSteps: number;
  canAdvance: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onBack: () => void;
  onNext: () => void;
  onExportSchema?: () => void;
  /**
   * Why the last export attempt failed, rendered next to the button.
   *
   * The alternative a library component must NOT reach for is `alert()`: it
   * assumes a host with a modal-capable window, is untestable, and blocks the
   * embedder from styling or suppressing the failure. The message is state
   * the caller owns; this bar only renders it.
   */
  exportError?: string | null;
}

export function WizardStepNavigation({
  step, totalSteps, canAdvance, isEditing,
  onCancel, onBack, onNext, onExportSchema, exportError,
}: WizardNavProps) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-border mt-4 shrink-0">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-transparent border-none text-neutral"
        >
          Cancel
        </button>
        {onExportSchema && (
          <button
            type="button"
            onClick={onExportSchema}
            title="Download JSON Schema"
            className="px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-text-primary border border-border-field"
          >
            Export Schema
          </button>
        )}
        {exportError && (
          <div
            data-testid="export-schema-error"
            role="alert"
            className="text-danger-fg text-[13px] self-center"
          >
            {exportError}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        {step > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-text-primary border border-border-field"
          >
            ← Back
          </button>
        )}
        <button
          type="button"
          data-testid="wizard-next"
          onClick={onNext}
          disabled={!canAdvance}
          className={cn(
            'px-4 py-[7px] text-[13px] font-semibold rounded-[7px] font-inherit border-none bg-primary text-on-primary',
            canAdvance ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-50',
          )}
        >
          {step === totalSteps ? (isEditing ? 'Save Changes' : 'Create Type') : 'Next →'}
        </button>
      </div>
    </div>
  );
}
