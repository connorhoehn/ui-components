// frontend/src/components/pipelines/nodes/BaseNode.tsx
//
// Shared visual wrapper for all pipeline node components (per §18.4.4).
// Renders a rounded card with a state-colored border, a header row
// (icon + subtitle + status dot), an optional body preview, an optional
// footer slot (used by LLMNode for the expandable response), and a
// `children` slot for React Flow <Handle> elements.
//
// When `state === 'failed'` and the caller supplies `onRetry`, a small
// "⟳ Retry from here" pill is rendered inline below the header per
// §18.4.4 / §17.6. Clicking it stops propagation so it doesn't select
// the node on the React Flow canvas.
//
// Accessibility: the card itself carries `role="button"`, an aria-label
// composed from icon/subtitle/state, `aria-selected` mirroring the
// React-Flow selection state, `data-node-state` for execution state, and
// a `tabIndex` so keyboard users can land on it. A `:focus-visible` outline
// (drawn from `colors.primary`) is added so keyboard focus is obvious.

import { useState, type MouseEvent, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import type { NodeCategory } from './categories';
import { useIsNodeTypeExecutable } from '../services/PipelineEditorServicesContext';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type NodeExecutionState =
  | 'idle'
  | 'pending'
  | 'running'
  | 'awaiting'
  | 'completed'
  | 'failed'
  | 'skipped';

export interface BaseNodeProps {
  icon: string;
  subtitle?: string;
  state: NodeExecutionState;
  body?: ReactNode;
  footer?: ReactNode;
  selected?: boolean;
  /**
   * When provided AND `state === 'failed'`, renders a small "⟳ Retry from
   * here" pill inline below the header. The click handler is invoked with
   * propagation stopped so the canvas doesn't also receive a node-select.
   * Per PIPELINES_PLAN.md §18.4.4 / §17.6.
   */
  onRetry?: () => void;
  /**
   * The node's type, so the card can mark itself when the host's executor has
   * no handler for it. Optional: without it the card simply isn't marked.
   */
  nodeType?: string;
  /** Show a red breakpoint dot in the top-left corner of the card. */
  hasBreakpoint?: boolean;
  /** Highlight the card with an orange border/glow (run is paused here). */
  pausedAtBreakpoint?: boolean;
  /**
   * Optional override for the accessible name. When omitted we synthesize one
   * from `subtitle` + `state`. Callers (per node-type) can pass a richer
   * string (e.g. "LLM node, Claude Opus 4, system prompt: …") for screen
   * reader users.
   */
  ariaLabel?: string;
  /**
   * Node-category visual channel (NODE-VISUALS-AUDIT §3.1). When provided,
   * renders a 3px category-colored left accent bar plus a shaped/tinted
   * 20px icon chip in the header. Orthogonal to `state`, which keeps sole
   * ownership of the card border + background. When omitted, rendering is
   * byte-for-byte identical to the pre-category BaseNode.
   */
  category?: NodeCategory;
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Per-state visual tokens
// ---------------------------------------------------------------------------

interface StateTokens {
  card: string;
  dot: string;
}

const STATE_TOKENS: Record<NodeExecutionState, StateTokens> = {
  idle:      { card: 'border border-border-field bg-surface',                    dot: 'bg-state-idle' },
  pending:   { card: 'border border-dashed border-info-border bg-info-bg',  dot: 'bg-state-pending' },
  running:   { card: 'border-2 border-info bg-info-bg',              dot: 'bg-info' },
  awaiting:  { card: 'border-2 border-warning bg-warning-bg',              dot: 'bg-warning' },
  completed: { card: 'border border-success bg-success-bg',                dot: 'bg-success' },
  failed:    { card: 'border-2 border-danger bg-danger-bg',              dot: 'bg-danger' },
  skipped:   { card: 'border border-dashed border-border-field bg-surface-inset opacity-50', dot: 'bg-state-idle' },
};

// ---------------------------------------------------------------------------
// Per-category visual tokens (NODE-VISUALS-AUDIT §3.1)
//
// Category is an additive channel: a 3px left accent bar in the category
// color, plus a 20px icon chip whose SHAPE encodes the category —
//   source            → circle
//   transform / sink  → rounded square
//   control           → diamond (rotated square; glyph counter-rotated)
//   ai                → rounded square with a subtle violet gradient
//   human             → pill (rounded-full, slightly wider)
// Execution state keeps sole ownership of border + background above.
// ---------------------------------------------------------------------------

interface CategoryTokens {
  /** Accent-bar background color. */
  bar: string;
  /** Icon-chip shape + tint classes. */
  chip: string;
  /** Extra classes on the glyph inside the chip (e.g. counter-rotation). */
  glyph?: string;
}

const CATEGORY_TOKENS: Record<NodeCategory, CategoryTokens> = {
  source:    { bar: 'bg-cat-source',    chip: 'w-5 h-5 rounded-full bg-cat-source/15' },
  transform: { bar: 'bg-cat-transform', chip: 'w-5 h-5 rounded-md bg-cat-transform/15' },
  ai:        { bar: 'bg-cat-ai',        chip: 'w-5 h-5 rounded-md bg-gradient-to-br from-cat-ai/25 to-cat-ai/5' },
  control:   { bar: 'bg-cat-control',   chip: 'w-5 h-5 rounded-[4px] bg-cat-control/15 rotate-45', glyph: '-rotate-45' },
  sink:      { bar: 'bg-cat-sink',      chip: 'w-5 h-5 rounded-md bg-cat-sink/15' },
  human:     { bar: 'bg-cat-human',     chip: 'w-7 h-5 rounded-full bg-cat-human/15' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BaseNode(props: BaseNodeProps) {
  const isExecutable = useIsNodeTypeExecutable();
  const isPreview = props.nodeType ? !isExecutable(props.nodeType) : false;
  const { icon, subtitle, state, body, footer, selected, onRetry, hasBreakpoint, pausedAtBreakpoint, ariaLabel, category, children } = props;
  // `state` is a 7-value union that every one of the ~37 node components feeds
  // from a live `pipeline.step.*` websocket status or a `_state` read out of a
  // stored definition — both cast, neither validated. A status this build does
  // not have ('queued', 'retrying', 'timeout') made `tokens.card` throw from
  // inside React Flow's node render, which takes the CANVAS down and with it
  // the whole editor route. The line below already guards the category map;
  // the state map did not. Unknown states fall back to idle styling — the node
  // still draws, and `state` is still what the runtime said it was.
  const tokens = STATE_TOKENS[state] ?? STATE_TOKENS.idle;
  const catTokens = category ? CATEGORY_TOKENS[category] : undefined;
  const reduceMotion = usePrefersReducedMotion();
  const [retryHover, setRetryHover] = useState(false);

  // The retry pill is purely additive: it only renders when the caller supplied
  // an `onRetry` AND the node is currently in the failed state. Per §17.6 the
  // click must NOT also bubble up as a node-select on the React Flow canvas.
  const showRetry = state === 'failed' && typeof onRetry === 'function';
  const handleRetryClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onRetry?.();
  };

  // §18.12 motion system: pending/running pulse on the dot draws attention
  // while the node waits to execute or is executing. The status color itself
  // still communicates the state — the animation is purely additive. When
  // the user prefers reduced motion we skip the pulse entirely and rely on
  // color + the per-state border weight to convey state.
  const pulseAnim =
    !reduceMotion && state === 'pending'
      ? 'animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]'
      : !reduceMotion && state === 'running'
        ? 'animate-[basenode-pulse_1500ms_linear_infinite]'
        : '';

  const hasDividerAfterHeader = !!(body || footer || showRetry);
  const hasDividerAfterRetry = !!(body || footer);

  // Synthesize a sensible default aria-label when the caller didn't supply one.
  const defaultAriaLabel = subtitle ? `${subtitle}, state: ${state}` : `Node, state: ${state}`;

  return (
    <div
      data-ui-part=""
      className={cn(
        'w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        pausedAtBreakpoint
          ? 'border-2 border-warning bg-warning-bg shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]'
          : tokens.card,
        !pausedAtBreakpoint && selected && 'shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]',
        !pausedAtBreakpoint && !selected && 'shadow-[0_1px_2px_rgba(15,23,42,0.06)]',
        reduceMotion && 'transition-none',
      )}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel ?? defaultAriaLabel}
      aria-selected={!!selected}
      data-state={state}
      data-node-state={state}
      data-node-category={category}
      data-pipeline-node="true"
    >
      {catTokens && (
        <span
          aria-hidden="true"
          data-testid="category-accent"
          className={cn(
            'absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[7px] pointer-events-none',
            catTokens.bar,
          )}
        />
      )}
      {hasBreakpoint && (
        <span
          aria-label="breakpoint"
          data-testid="breakpoint-dot"
          className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-danger border-[1.5px] border-white z-[1]"
        />
      )}
      <div className={cn(
        'flex items-center gap-2 h-7 px-2.5',
        hasDividerAfterHeader && 'border-b border-border',
      )}>
        {catTokens ? (
          <span
            aria-hidden="true"
            data-testid="category-chip"
            className={cn('flex items-center justify-center shrink-0', catTokens.chip)}
          >
            <span className={cn('text-xs leading-none', catTokens.glyph)}>{icon}</span>
          </span>
        ) : (
          <span className="text-sm leading-none shrink-0" aria-hidden="true">{icon}</span>
        )}
        <span className="flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap">{subtitle}</span>
        {isPreview && (
          <span
            data-testid="node-preview-badge"
            title="This deployment has no executor for this node type — the step will not run."
            className="shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[8px] font-semibold uppercase tracking-wide text-warning-fg"
          >
            preview
          </span>
        )}
        <span
          className={cn('w-2 h-2 rounded-full shrink-0', tokens.dot, pulseAnim)}
          aria-label={`state: ${state}`}
        />
      </div>
      {showRetry && (
        <div className={cn(
          'flex px-2.5 py-1.5',
          hasDividerAfterRetry && 'border-b border-border',
        )}>
          <button
            data-ui-part=""
            type="button"
            className={cn(
              'cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-danger text-danger-fg transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
              retryHover ? 'bg-danger-bg' : 'bg-transparent',
              reduceMotion && 'transition-none',
            )}
            onClick={handleRetryClick}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseEnter={() => setRetryHover(true)}
            onMouseLeave={() => setRetryHover(false)}
            aria-label="Retry from here"
          >
            ⟳ Retry from here
          </button>
        </div>
      )}
      {body !== undefined && body !== null && (
        <div className="px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary">{body}</div>
      )}
      {footer !== undefined && footer !== null && (
        <div className="border-t border-border px-2.5 py-1.5 text-xs text-text-secondary">{footer}</div>
      )}
      {children}
    </div>
  );
}
