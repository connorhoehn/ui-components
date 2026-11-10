// SettingsLayout — sectioned settings page shell with sticky save bar.
//
// Replaces hand-rolled "left rail + right content + bottom action bar"
// layouts in identity / admin / gateway settings pages. Sections are
// data-driven; the layout owns the rail, the scrollable body, the
// section anchoring, and the sticky save bar visibility.
//
// Presentational only: callers wire dirty-state, save handlers, and
// per-section content. The layout owns the chrome.

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface SettingsSection {
  id: string;
  /** Sidebar label. */
  label: ReactNode;
  /** Optional small description shown under the label in the rail. */
  description?: ReactNode;
  /** Optional icon glyph rendered next to the label. */
  icon?: ReactNode;
  /** Section content. */
  content: ReactNode;
}

export interface SettingsLayoutProps {
  /** Page title shown above the rail. */
  title: ReactNode;
  /** Optional secondary line under the title. */
  subtitle?: ReactNode;
  /** Section list. The first section is selected by default. */
  sections: SettingsSection[];
  /** Currently active section id (controlled). When omitted, uncontrolled. */
  activeSectionId?: string;
  /** Notified when the user picks a section. */
  onSectionChange?: (id: string) => void;
  /**
   * When true (or non-null), shows the sticky save bar.
   * The bar exposes Save + Cancel buttons.
   */
  dirty?: boolean;
  /** Save button label. Default "Save changes". */
  saveLabel?: ReactNode;
  /** Cancel button label. Default "Cancel". */
  cancelLabel?: ReactNode;
  /** Save click handler. */
  onSave?: () => void;
  /** Cancel click handler. */
  onCancel?: () => void;
  /** When true, the save button shows a saving state. */
  saving?: boolean;
  /** Optional extra content for the save bar (e.g. dirty-field count). */
  saveBarSlot?: ReactNode;
  /** Width of the rail in px. Default 220. */
  railWidth?: number;
  /**
   * The narrow form (since 2.515.10, like `SubNavLayout narrow` in 2.515.5):
   * the layout is its own size container and under 40rem of its own width
   * the section rail gives the content the whole width. The title (and
   * subtitle) sit above one row of the sections that scrolls sideways
   * (`<nav data-settings-strip>`, "Settings sections (compact)"; items
   * `<testid>-strip-item` with `data-section-id`, the current one
   * `aria-current="page"` and underlined), then the section. A container
   * query, not the viewport, so a settings page inside a narrow column
   * folds too. Omitted: the rail sits beside the content at every width.
   */
  narrow?: boolean;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

export function SettingsLayout({
  title,
  subtitle,
  sections,
  activeSectionId,
  onSectionChange,
  dirty = false,
  saveLabel = 'Save changes',
  cancelLabel = 'Cancel',
  onSave,
  onCancel,
  saving = false,
  saveBarSlot,
  railWidth = 220,
  narrow = false,
  className,
  style,
  'data-testid': testId = 'settings-layout',
}: SettingsLayoutProps) {
  const firstId = sections[0]?.id ?? null;
  const [internalActive, setInternalActive] = useState<string | null>(firstId);
  const active = activeSectionId ?? internalActive;
  const railRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (activeSectionId == null && firstId && internalActive == null) {
      setInternalActive(firstId);
    }
  }, [activeSectionId, firstId, internalActive]);

  const activeSection = sections.find((s) => s.id === active) ?? sections[0];

  const select = (id: string) => {
    if (activeSectionId == null) setInternalActive(id);
    onSectionChange?.(id);
  };

  return (
    <div
      data-testid={testId}
      data-dirty={dirty || undefined}
      data-settings-narrow={narrow ? '' : undefined}
      className={cn(
        'flex flex-col h-full min-h-0 bg-[var(--color-surface,#fff)]',
        narrow && '@container min-w-0',
        className,
      )}
      style={style}
    >
      {/* The narrow form's classes are written out whole (`@max-[40rem]:…`)
          so a consumer's Tailwind scan of dist finds them. */}
      <div className={cn('flex flex-1 min-h-0', narrow && '@max-[40rem]:flex-col')}>
        {narrow && (
          <div className="flex shrink-0 min-w-0 flex-col border-b border-[var(--color-border)] @min-[40rem]:hidden" data-settings-narrow-header="">
            <div className="px-4 pt-3">
              <div className="text-[14px] font-semibold text-[var(--color-text-primary)] leading-tight">{title}</div>
              {subtitle != null && <div className="mt-0.5 text-[11px] text-[var(--color-text-secondary)] leading-snug">{subtitle}</div>}
            </div>
            <nav
              aria-label="Settings sections (compact)"
              data-settings-strip=""
              data-testid={`${testId}-strip`}
              className="flex min-w-0 gap-1 overflow-x-auto overflow-y-hidden px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {sections.map((section) => {
                const isActive = section.id === active;
                return (
                  <button
                    data-ui-part=""
                    key={section.id}
                    type="button"
                    data-testid={`${testId}-strip-item`}
                    data-section-id={section.id}
                    data-active={isActive || undefined}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => select(section.id)}
                    className={cn(
                      'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[12px] font-semibold cursor-pointer',
                      'border-b-[3px] bg-transparent',
                      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                      isActive
                        ? 'border-b-[var(--color-primary,#6366f1)] text-[var(--color-primary,#4338ca)]'
                        : 'border-b-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                    )}
                  >
                    {section.icon != null && <span className="shrink-0" aria-hidden>{section.icon}</span>}
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
        <aside
          ref={railRef}
          role="navigation"
          aria-label="Settings sections"
          data-testid={`${testId}-rail`}
          className={cn('shrink-0 border-r border-[var(--color-border)] overflow-y-auto py-4 px-2', narrow && '@max-[40rem]:hidden')}
          style={{ width: railWidth }}
        >
          <div className="px-3 pb-3 border-b border-[var(--color-border)] mb-3">
            <div className="text-[14px] font-semibold text-[var(--color-text-primary)] leading-tight">
              {title}
            </div>
            {subtitle != null && (
              <div className="mt-0.5 text-[11px] text-[var(--color-text-secondary)] leading-snug">
                {subtitle}
              </div>
            )}
          </div>
          <nav className="flex flex-col gap-0.5">
            {sections.map((section) => {
              const isActive = section.id === active;
              return (
                <button
                  data-ui-part=""
                  key={section.id}
                  type="button"
                  data-testid={`${testId}-rail-item`}
                  data-section-id={section.id}
                  data-active={isActive || undefined}
                  onClick={() => select(section.id)}
                  className={cn(
                    'flex flex-col items-start gap-0.5 px-3 py-2 rounded-md text-left',
                    'border-l-[2px] cursor-pointer',
                    isActive
                      ? 'bg-[var(--color-primary-bg,#eef2ff)] border-l-[var(--color-primary,#6366f1)] text-[var(--color-primary,#4338ca)]'
                      : 'border-l-transparent hover:bg-[var(--color-surface-subtle,#f8fafc)] text-[var(--color-text-primary)]',
                  )}
                >
                  <span className="flex items-center gap-1.5 text-[12px] font-semibold">
                    {section.icon != null && (
                      <span className="shrink-0" aria-hidden>
                        {section.icon}
                      </span>
                    )}
                    {section.label}
                  </span>
                  {section.description != null && (
                    <span
                      className={cn(
                        'text-[10px] leading-snug',
                        isActive
                          ? 'text-[var(--color-primary,#4338ca)] opacity-80'
                          : 'text-[var(--color-text-tertiary)]',
                      )}
                    >
                      {section.description}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        <main
          role="main"
          data-testid={`${testId}-body`}
          className="flex-1 min-w-0 min-h-0 overflow-y-auto"
        >
          <div
            data-testid={`${testId}-section`}
            data-section-id={activeSection?.id}
            className={cn('p-6 max-w-3xl mx-auto', narrow && '@max-[40rem]:p-4')}
          >
            {activeSection?.content}
          </div>
        </main>
      </div>

      {dirty && (
        <div
          role="region"
          aria-label="Unsaved changes"
          data-testid={`${testId}-save-bar`}
          className={cn(
            'sticky bottom-0 left-0 right-0 z-10',
            'flex items-center gap-3 px-4 py-3',
            'border-t border-[var(--color-border)]',
            'bg-[var(--color-surface,#fff)] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]',
          )}
        >
          <span className="text-[12px] text-[var(--color-text-secondary)]">
            You have unsaved changes.
          </span>
          {saveBarSlot != null && <span className="text-[11px] text-[var(--color-text-tertiary)]">{saveBarSlot}</span>}
          <div className="ml-auto flex items-center gap-2">
            {onCancel && (
              <button
                data-ui-part=""
                type="button"
                onClick={onCancel}
                data-testid={`${testId}-cancel`}
                className={cn(
                  'px-3 py-1.5 text-[12px] font-semibold rounded-md',
                  'border border-[var(--color-border)] bg-transparent',
                  'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle,#f8fafc)]',
                  'cursor-pointer',
                )}
                disabled={saving}
              >
                {cancelLabel}
              </button>
            )}
            {/* Guarded on `onSave` for the same reason Cancel is guarded on
                `onCancel` right above: both handlers are optional, so an
                unguarded Save renders a live, enabled primary button that
                swallows the click and leaves the bar reading "You have
                unsaved changes" forever. Nothing else in this component can
                persist anything — if the caller wired no handler there is no
                save to offer. */}
            {onSave && (
              <button
                data-ui-part=""
                type="button"
                onClick={onSave}
                data-testid={`${testId}-save`}
                disabled={saving}
                className={cn(
                  'px-3 py-1.5 text-[12px] font-semibold rounded-md',
                  'bg-[var(--color-primary,#6366f1)] text-white border-none',
                  saving ? 'opacity-70 cursor-progress' : 'cursor-pointer hover:opacity-90',
                )}
              >
                {saving ? 'Saving…' : saveLabel}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsLayout;
