// StackDiagram — architecture-callout primitive for layered diagrams.
//
// Renders a vertical or horizontal sequence of "layer" boxes, optionally
// separated by arrow connectors. Used in docs/showcase pages to illustrate
// architectural stacks (e.g. "Browser → Gateway → Queue → Worker"). Tones
// are token-driven (primary/success/warning/danger/info/caution/neutral)
// to match <Chip>.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { ChipTone } from './Chip';

export interface StackLayerSpec {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  /** Color tone (matches <Chip> tones). Default 'neutral'. */
  tone?: ChipTone;
  /** Optional right-aligned meta slot (badge, version chip). */
  meta?: ReactNode;
}

export type StackDiagramOrientation = 'vertical' | 'horizontal';
export type StackDiagramConnector = 'arrow' | 'line' | 'none';

export interface StackDiagramProps {
  layers: StackLayerSpec[];
  /** Vertical stacks top-to-bottom (default); horizontal flows left-to-right. */
  orientation?: StackDiagramOrientation;
  /** Connector glyph between layers. Default 'arrow'. */
  connector?: StackDiagramConnector;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const TONE_BG: Record<ChipTone, string> = {
  neutral: 'bg-slate-50',
  success: 'bg-green-50',
  warning: 'bg-amber-50',
  danger:  'bg-red-50',
  info:    'bg-blue-50',
  caution: 'bg-orange-50',
  purple:  'bg-purple-50',
};

const TONE_BORDER: Record<ChipTone, string> = {
  neutral: 'border-slate-200',
  success: 'border-green-300',
  warning: 'border-amber-300',
  danger:  'border-red-300',
  info:    'border-blue-300',
  caution: 'border-orange-300',
  purple:  'border-purple-300',
};

const TONE_LABEL: Record<ChipTone, string> = {
  neutral: 'text-slate-800',
  success: 'text-green-800',
  warning: 'text-amber-800',
  danger:  'text-red-800',
  info:    'text-blue-800',
  caution: 'text-orange-800',
  purple:  'text-purple-800',
};

function Connector({
  orientation,
  variant,
}: {
  orientation: StackDiagramOrientation;
  variant: StackDiagramConnector;
}) {
  if (variant === 'none') return null;
  const isVertical = orientation === 'vertical';
  const glyph = variant === 'arrow' ? (isVertical ? '↓' : '→') : isVertical ? '│' : '─';
  return (
    <div
      data-testid="stack-diagram-connector"
      aria-hidden
      className={cn(
        'flex items-center justify-center text-[var(--color-text-tertiary)]',
        isVertical ? 'h-5 text-base' : 'w-5 text-base',
      )}
    >
      {glyph}
    </div>
  );
}

export function StackDiagram({
  layers,
  orientation = 'vertical',
  connector = 'arrow',
  className,
  style,
  'data-testid': testId = 'stack-diagram',
}: StackDiagramProps) {
  const isVertical = orientation === 'vertical';
  return (
    <div
      data-testid={testId}
      data-orientation={orientation}
      data-connector={connector}
      className={cn(
        'flex',
        isVertical ? 'flex-col items-stretch' : 'flex-row items-stretch flex-wrap',
        className,
      )}
      style={style}
    >
      {layers.map((layer, idx) => {
        const tone = layer.tone ?? 'neutral';
        return (
          <div key={layer.id} className={cn('flex', isVertical ? 'flex-col' : 'flex-col')}>
            <div
              data-testid="stack-diagram-layer"
              data-tone={tone}
              className={cn(
                'rounded-md border px-3 py-2',
                TONE_BG[tone],
                TONE_BORDER[tone],
                !isVertical && 'min-w-[140px]',
              )}
            >
              <div className="flex items-center gap-2">
                {layer.icon != null && (
                  <span className="shrink-0 text-[14px] leading-none" aria-hidden>
                    {layer.icon}
                  </span>
                )}
                <span className={cn('text-[12px] font-semibold', TONE_LABEL[tone])}>
                  {layer.label}
                </span>
                {layer.meta != null && (
                  <span className="ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0">
                    {layer.meta}
                  </span>
                )}
              </div>
              {layer.description != null && (
                <div className="mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]">
                  {layer.description}
                </div>
              )}
            </div>
            {idx < layers.length - 1 && (
              <Connector orientation={orientation} variant={connector} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Alias kept for diagrams better described as a stack of horizontal layers. */
export const LayerStack = StackDiagram;

export default StackDiagram;
