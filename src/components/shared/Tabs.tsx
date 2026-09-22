import {
  useCallback,
  useId,
  useMemo,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

export type TabsVariant = 'underline' | 'pill' | 'segmented';

export interface TabItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  /** data-testid rendered on this tab's trigger button. Overrides Tabs' `getItemTestId` for this item. */
  testId?: string;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (id: string) => void;
  variant?: TabsVariant;
  size?: 'sm' | 'md';
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  /** Shared id used to wire <TabPanel> regions to their <tab> triggers. Auto-generated if omitted. */
  idPrefix?: string;
  /** Derives a data-testid per item when the item itself has no `testId`. */
  getItemTestId?: (item: TabItem) => string;
}

const SIZE: Record<'sm' | 'md', string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

function variantContainerClasses(variant: TabsVariant): string {
  switch (variant) {
    case 'underline':
      return 'inline-flex items-center gap-1 border-b border-[var(--color-border)]';
    case 'pill':
      return 'inline-flex items-center gap-1';
    case 'segmented':
      return 'inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5';
  }
}

function variantItemClasses(variant: TabsVariant, active: boolean, disabled: boolean): string {
  if (variant === 'underline') {
    return cn(
      '-mb-px border-b-2 rounded-none',
      active
        ? 'border-[var(--color-primary)] text-[var(--color-text-primary)]'
        : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
      disabled && 'opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]',
    );
  }
  if (variant === 'pill') {
    return cn(
      'rounded-full',
      active
        ? 'bg-[var(--color-primary)] text-white'
        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
    );
  }
  return cn(
    'rounded-md',
    active
      ? 'bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]'
      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]',
    disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
  );
}

export function Tabs({
  items,
  value,
  onValueChange,
  variant = 'underline',
  size = 'md',
  className,
  style,
  'aria-label': ariaLabel,
  idPrefix: idPrefixProp,
  getItemTestId,
}: TabsProps) {
  const autoPrefix = useId();
  const idPrefix = idPrefixProp ?? autoPrefix;
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const enabledIds = useMemo(() => items.filter((i) => !i.disabled).map((i) => i.id), [items]);

  const focusTab = useCallback((id: string) => {
    const el = tabRefs.current.get(id);
    el?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, currentId: string) => {
      if (enabledIds.length === 0) return;
      const idx = enabledIds.indexOf(currentId);
      let nextIdx: number | null = null;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIdx = idx === -1 ? 0 : (idx + 1) % enabledIds.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIdx = idx === -1 ? enabledIds.length - 1 : (idx - 1 + enabledIds.length) % enabledIds.length;
          break;
        case 'Home':
          nextIdx = 0;
          break;
        case 'End':
          nextIdx = enabledIds.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onValueChange(currentId);
          return;
        default:
          return;
      }
      if (nextIdx !== null) {
        e.preventDefault();
        const nextId = enabledIds[nextIdx];
        onValueChange(nextId);
        focusTab(nextId);
      }
    },
    [enabledIds, onValueChange, focusTab],
  );

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(variantContainerClasses(variant), className)}
      style={style}
    >
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              if (el) tabRefs.current.set(item.id, el);
              else tabRefs.current.delete(item.id);
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${item.id}`}
            aria-controls={`${idPrefix}-panel-${item.id}`}
            data-testid={item.testId ?? getItemTestId?.(item)}
            aria-selected={active}
            aria-disabled={item.disabled || undefined}
            tabIndex={active ? 0 : -1}
            disabled={item.disabled}
            onClick={() => !item.disabled && onValueChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            className={cn(
              'inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer',
              SIZE[size],
              variantItemClasses(variant, active, !!item.disabled),
            )}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge !== undefined && item.badge !== null && (
              <span
                className={cn(
                  'ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold',
                  active && variant === 'pill'
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]',
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export interface TabPanelProps {
  /** The tab id this panel is associated with. */
  id: string;
  /** Currently-active tab id. Panel renders only when these match. */
  when: string;
  /** Must match the Tabs `idPrefix` for accessibility wiring. Auto-generated tabs without an idPrefix should pass it through. */
  idPrefix?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function TabPanel({ id, when, idPrefix, className, style, children }: TabPanelProps) {
  if (id !== when) return null;
  return (
    <div
      role="tabpanel"
      id={idPrefix ? `${idPrefix}-panel-${id}` : undefined}
      data-testid={idPrefix ? `${idPrefix}-panel-${id}` : undefined}
      aria-labelledby={idPrefix ? `${idPrefix}-tab-${id}` : undefined}
      tabIndex={0}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

export default Tabs;
