// src/components/layout/DocsSidebar.tsx
//
// Documentation-shell sidebar. Renders collapsible sections of grouped
// nav items with an active-route highlight. Consumer plugs in their own
// link component via renderLink (react-router <Link>, next/link, etc.).

import {
  useState,
  type ReactNode,
  type CSSProperties,
  type AnchorHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';

export interface DocsSidebarItem {
  id: string;
  label: ReactNode;
  to: string;
  badge?: ReactNode;
}

export interface DocsSidebarGroup {
  id: string;
  label?: ReactNode;
  /** When set, the group label itself is rendered as a direct link instead of a section. */
  to?: string;
  items: DocsSidebarItem[];
}

export interface DocsSidebarSection {
  id: string;
  label: ReactNode;
  /** Used to detect "section active" highlighting in section header. */
  basePath?: string;
  groups: DocsSidebarGroup[];
}

type LinkRenderer = (
  item: { to: string; id: string },
  props: AnchorHTMLAttributes<HTMLAnchorElement>,
) => ReactNode;

export interface DocsSidebarProps {
  sections: DocsSidebarSection[];
  /** Current pathname — drives the active-item highlight. */
  activeHref?: string;
  /** Section ids that should start collapsed. */
  defaultCollapsedSections?: string[];
  /** Plug a routing library's Link. Defaults to <a href>. */
  renderLink?: LinkRenderer;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}

function isItemActive(activeHref: string | undefined, to: string): boolean {
  if (!activeHref) return false;
  if (activeHref === to) return true;
  if (to === '/') return false;
  return activeHref.startsWith(to + '/');
}

function defaultRenderLink(
  item: { to: string },
  props: AnchorHTMLAttributes<HTMLAnchorElement>,
): ReactNode {
  return <a {...props} href={item.to}>{props.children}</a>;
}

export function DocsSidebar({
  sections,
  activeHref,
  defaultCollapsedSections,
  renderLink = defaultRenderLink,
  className,
  style,
  'aria-label': ariaLabel = 'Documentation navigation',
}: DocsSidebarProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const id of defaultCollapsedSections ?? []) initial[id] = true;
    return initial;
  });

  const toggle = (id: string) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside
      aria-label={ariaLabel}
      data-testid="docs-sidebar"
      className={cn(
        'w-60 overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-surface,#fff)] py-4',
        className,
      )}
      style={style}
    >
      {sections.map((section) => {
        const isCollapsed = collapsed[section.id] ?? false;
        const isSectionActive =
          activeHref && section.basePath
            ? activeHref.startsWith(section.basePath)
            : false;

        return (
          <div key={section.id} className="mb-2">
            <button
              data-ui-part=""
              type="button"
              onClick={() => toggle(section.id)}
              aria-expanded={!isCollapsed}
              data-testid={`docs-sidebar-section-${section.id}`}
              className={cn(
                'flex w-full items-center gap-1.5 border-0 bg-transparent px-5 py-2 text-[11px] font-bold uppercase tracking-wider cursor-pointer',
                isSectionActive
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)]',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'inline-block text-[10px] transition-transform',
                  isCollapsed ? '-rotate-90' : 'rotate-0',
                )}
              >
                ▼
              </span>
              {section.label}
            </button>

            {!isCollapsed && (
              <div>
                {section.groups.map((group) => (
                  <DocsSidebarGroupRows
                    key={group.id}
                    group={group}
                    activeHref={activeHref}
                    renderLink={renderLink}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}

function DocsSidebarGroupRows({
  group,
  activeHref,
  renderLink,
}: {
  group: DocsSidebarGroup;
  activeHref: string | undefined;
  renderLink: LinkRenderer;
}) {
  if (group.to) {
    const active = isItemActive(activeHref, group.to);
    return (
      <div className="mb-1">
        <DocsSidebarLink
          to={group.to}
          id={group.id}
          label={group.label}
          active={active}
          renderLink={renderLink}
          indented={false}
        />
      </div>
    );
  }
  // A single-item group whose label repeats the item reads as the same word
  // twice in a row ("Social & Chat" above "Social & Chat"). The header carries
  // no information there, so drop it and let the item stand alone.
  const headerIsRedundant =
    group.items.length === 1 && group.items[0].label === group.label;

  return (
    <div className="mb-1">
      {group.label && !headerIsRedundant && (
        <div className="px-5 pt-1.5 pb-1 pl-8 text-[12px] font-semibold text-[var(--color-text-secondary)]">
          {group.label}
        </div>
      )}
      {group.items.map((item) => {
        const active = isItemActive(activeHref, item.to);
        return (
          <DocsSidebarLink
            key={item.id}
            to={item.to}
            id={item.id}
            label={item.label}
            badge={item.badge}
            active={active}
            renderLink={renderLink}
            indented
          />
        );
      })}
    </div>
  );
}

function DocsSidebarLink({
  id,
  to,
  label,
  badge,
  active,
  renderLink,
  indented,
}: {
  id: string;
  to: string;
  label: ReactNode;
  badge?: ReactNode;
  active: boolean;
  renderLink: LinkRenderer;
  indented: boolean;
}) {
  const props: AnchorHTMLAttributes<HTMLAnchorElement> & Record<`data-${string}`, string | undefined> = {
    'aria-current': active ? 'page' : undefined,
    'data-testid': `docs-sidebar-link-${id}`,
    className: cn(
      'flex items-center gap-2 py-1.5 pr-5 text-[13px] no-underline border-l-[3px] transition-colors',
      indented ? 'pl-7' : 'pl-5',
      active
        ? 'border-[var(--color-primary)] bg-[var(--color-primary-bg,#eff6ff)] text-[var(--color-primary)] font-medium'
        : 'border-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover,#f8fafc)]',
    ),
    children: (
      <>
        <span className="flex-1">{label}</span>
        {badge !== undefined && badge !== null && (
          <span className="inline-flex items-center justify-center rounded-full px-1.5 min-w-[18px] text-[10px] font-semibold bg-[var(--color-primary)] text-white">
            {badge}
          </span>
        )}
      </>
    ),
  };
  return <>{renderLink({ to, id }, props)}</>;
}

export default DocsSidebar;
