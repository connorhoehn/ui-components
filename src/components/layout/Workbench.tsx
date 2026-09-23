// Workbench — the static right-hand column of the Documents editor: which
// file (or slide) is selected, the agent task working on it, and tabs for its
// comments, activity and details, with the run's actions pinned at the foot.
//
// "Static" means it does not come and go with a selection: picking another
// file changes what it says, not whether it is there. It is CONTENT — a host
// puts it inside `ContextColumn` / `ExplorerLayout`'s aside (or `EditorShell`'s
// `workbench` slot) rather than it being a second right rail with its own
// collapse rules.
//
// Tabs are the library `Tabs` (underline, stretched) with `TabPanel`, so the
// roving arrow keys and the tab/tabpanel wiring are the same as every other
// tabbed surface. Controlled or not: pass `activeTab` + `onTabChange` to own
// it ("View details" in an explorer row menu switches it from outside), or
// `defaultTab` and let the workbench keep it.

import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { CloseIcon } from '../ui/Icons';
import { Tabs, TabPanel } from '../shared/Tabs';
import { Badge } from '../shared/Badge';
import { FileKindMark, type FileKind } from '../shared/FileKindMark';

export interface WorkbenchTab {
  id: string;
  label: string;
  /** A count on the tab — open comments. Zero or absent shows none. */
  count?: number;
  content: ReactNode;
}

export interface WorkbenchProps {
  /** The selected file or slide — "Sprint review". */
  title: ReactNode;
  /** A second line — "Presentation · Slide 4 of 5". */
  subtitle?: ReactNode;
  /** Draws a `FileKindMark` before the title. */
  kind?: FileKind;
  /** Renders a close button. Omit for a workbench that cannot be closed. */
  onClose?: () => void;
  /** The current agent task — normally an `AgentTaskCard`. Omit when there is none. */
  task?: ReactNode;
  /** Heading over `task`. Default "Current task". */
  taskLabel?: string;
  tabs: readonly WorkbenchTab[];
  /** Controlled active tab. */
  activeTab?: string;
  /** Uncontrolled initial tab. Defaults to the first. */
  defaultTab?: string;
  onTabChange?: (id: string) => void;
  /** Below the active panel — normally a `MoreContextDisclosure`. */
  moreContext?: ReactNode;
  /** Pinned to the bottom — "Open run", "More". */
  footer?: ReactNode;
  /** Accessible name of the column. Default "Workbench". */
  label?: string;
  className?: string;
  'data-testid'?: string;
}

export function Workbench({
  title,
  subtitle,
  kind,
  onClose,
  task,
  taskLabel = 'Current task',
  tabs,
  activeTab,
  defaultTab,
  onTabChange,
  moreContext,
  footer,
  label = 'Workbench',
  className,
  'data-testid': testId = 'workbench',
}: WorkbenchProps) {
  const [ownTab, setOwnTab] = useState<string | undefined>(defaultTab);
  const requested = activeTab ?? ownTab;
  const current = tabs.some((t) => t.id === requested) ? requested! : (tabs[0]?.id ?? '');
  const idPrefix = `${testId}-${useId().replace(/:/g, '')}`;
  const select = (id: string) => {
    if (activeTab === undefined) setOwnTab(id);
    onTabChange?.(id);
  };

  return (
    <aside aria-label={label} data-testid={testId} className={cn('flex h-full min-h-0 flex-col bg-surface', className)}>
      <header className="flex min-w-0 items-start gap-2 border-b border-border px-3 py-2.5">
        {kind && <FileKindMark kind={kind} className="mt-0.5" data-testid={`${testId}-kind`} />}
        <div className="min-w-0 flex-1">
          <h2 className="m-0 truncate text-sm font-semibold text-text-primary" data-testid={`${testId}-title`}>{title}</h2>
          {subtitle && <p className="m-0 truncate text-xs text-text-tertiary">{subtitle}</p>}
        </div>
        {onClose && (
          <IconButton size="sm" aria-label="Close workbench" title="Close" onClick={onClose} data-testid={`${testId}-close`}>
            <CloseIcon size={14} />
          </IconButton>
        )}
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {task && (
          <section aria-label={taskLabel} className="flex flex-col gap-1.5 px-3 pt-3" data-testid={`${testId}-task`}>
            <h3 className="m-0 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">{taskLabel}</h3>
            {task}
          </section>
        )}

        {tabs.length > 0 && (
          <>
            <Tabs
              items={tabs.map((t) => ({
                id: t.id,
                label: t.label,
                ...(t.count ? { badge: <Badge variant="count" value={t.count} color="muted" aria-label={`${t.count} in ${t.label}`} /> } : {}),
                testId: `${testId}-tab-${t.id}`,
              }))}
              value={current}
              onValueChange={select}
              variant="underline"
              size="sm"
              stretch
              aria-label={`${label} sections`}
              idPrefix={idPrefix}
              className="mt-3 flex w-full px-1"
            />
            {tabs.map((t) => (
              <TabPanel key={t.id} id={t.id} when={current} idPrefix={idPrefix} className="px-3 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {t.content}
              </TabPanel>
            ))}
          </>
        )}

        {moreContext && <div className="px-3 pb-3">{moreContext}</div>}
      </div>

      {footer && (
        <footer className="flex shrink-0 items-center gap-2 border-t border-border px-3 py-2.5" data-testid={`${testId}-footer`}>
          {footer}
        </footer>
      )}
    </aside>
  );
}

export default Workbench;
