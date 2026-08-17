// ContextVariablePicker.tsx
//
// Insertable `{{context.*}}` pills for a prompt/template field, derived from the
// node's real upstream graph, plus a warning for referenced paths nothing
// provides.
//
// Shared on purpose: LLM, vision and transform panels all author templates
// against run context, and each previously had (or would have grown) its own
// hardcoded variable list. See ./upstreamContext.ts for why that mattered.

import { cn } from '../../../lib/cn';
import type { ContextPath } from './upstreamContext';

const KIND_TONE: Record<ContextPath['kind'], string> = {
  string: 'bg-info-bg text-info-fg border-info-border',
  number: 'bg-accent-bg text-accent-fg border-accent-border',
  boolean: 'bg-warning-bg text-warning-fg border-warning-border',
  object: 'bg-neutral-bg text-neutral-fg border-neutral-border',
  array: 'bg-neutral-bg text-neutral-fg border-neutral-border',
  image: 'bg-success-bg text-success-fg border-success-border',
};

export interface ContextVariablePickerProps {
  /** Paths available at this node, from `availableContextPaths`. */
  paths: readonly ContextPath[];
  /** Referenced but unavailable, from `unresolvedTemplatePaths`. */
  unresolved?: readonly string[];
  /** Called with the `{{path}}` text to insert at the cursor. */
  onInsert: (token: string) => void;
  /** Reveal the contributing node on the canvas. */
  onRevealNode?: (nodeId: string) => void;
  className?: string;
}

export function ContextVariablePicker({
  paths,
  unresolved = [],
  onInsert,
  onRevealNode,
  className,
}: ContextVariablePickerProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)} data-testid="context-variable-picker">
      {paths.length === 0 ? (
        <p className="m-0 text-[11px] text-text-tertiary" data-testid="context-picker-empty">
          No upstream context yet — connect this node to a trigger or an earlier
          step and its outputs will appear here.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-1">
            {paths.map((p) => (
              <button
                key={p.path}
                type="button"
                onClick={() => onInsert(`{{${p.path}}}`)}
                title={`${p.description}\nfrom ${p.source}`}
                className={cn(
                  'rounded-full border px-2 py-0.5 font-mono text-[10px] cursor-pointer',
                  'hover:brightness-95 transition-[filter]',
                  KIND_TONE[p.kind],
                )}
                data-testid={`context-pill-${p.path}`}
              >
                {p.path.replace(/^context\./, '')}
              </button>
            ))}
          </div>
          <p className="m-0 text-[11px] text-text-tertiary">
            Click to insert. Derived from what is actually upstream of this node.
          </p>
        </>
      )}

      {unresolved.length > 0 && (
        <div
          className="rounded-md border border-warning-border bg-warning-bg px-2 py-1.5"
          data-testid="context-unresolved"
        >
          <p className="m-0 text-[11px] font-semibold text-warning-fg">
            {unresolved.length === 1
              ? 'This path is not provided by anything upstream:'
              : `${unresolved.length} paths are not provided by anything upstream:`}
          </p>
          <ul className="m-0 mt-1 list-none p-0">
            {unresolved.map((u) => (
              <li key={u} className="font-mono text-[11px] text-warning-fg">
                {`{{${u}}}`}
              </li>
            ))}
          </ul>
          <p className="m-0 mt-1 text-[10px] text-warning-fg">
            It will resolve to nothing at run time. Wire in the step that
            produces it, or fix the path.
          </p>
        </div>
      )}

      {onRevealNode && paths.length > 0 && (
        <details className="text-[11px] text-text-secondary">
          <summary className="cursor-pointer select-none">Where each value comes from</summary>
          <ul className="m-0 mt-1 list-none p-0">
            {paths.map((p) => (
              <li key={p.path} className="flex items-baseline gap-1.5 py-0.5">
                <button
                  type="button"
                  onClick={() => onRevealNode(p.sourceNodeId)}
                  className="bg-transparent border-none p-0 cursor-pointer text-primary underline font-inherit text-[11px]"
                >
                  {p.source}
                </button>
                <span className="font-mono text-[10px] text-text-tertiary">{p.path}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export default ContextVariablePicker;
