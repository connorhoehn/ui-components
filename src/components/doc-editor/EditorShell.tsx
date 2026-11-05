// EditorShell — the chrome every file in the Documents workspace is edited
// inside, whatever kind of file it is: a crumb trail, the title row (star,
// status pill, collaborators, save state, head actions), the
// Editor / Comments / Versions / History tabs, a toolbar, the editing
// surface, and a floating composer dock over the bottom of that surface.
//
// ## One shell, two surfaces
//
// The page editor and the presentation editor were two unrelated pages with
// two unrelated headers. The handoff keeps the explorer, the workbench and the
// composer where they are and swaps only the SURFACE when a different kind of
// file is selected. So the shell takes the surface as `children` and the
// toolbar as a slot, and says nothing about pages or slides.
//
// ## Optional outer columns
//
// `explorer` and `workbench` are optional columns either side of the editor
// pane, for a host that wants the whole explorer | editor | workbench frame
// from one component. A host already inside `ExplorerLayout` + `ContextColumn`
// leaves both out and gets just the editor pane. Below `lg` the explorer
// stacks above the pane; below `xl` the workbench stacks below it — the same
// "keep the document at least half the width" rule `ExplorerLayout` measured.
//
// ## Tabs are the host's
//
// The shell draws the tab row and wires the surface as its tabpanel; which
// content a tab shows is the host's (`activeTab` + `onTabChange`, typically
// mirrored into the URL). The toolbar and the dock usually only make sense on
// the Editor tab, so the host passes them only then.

import { useId, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';
import { InlineEditableText } from '../forms/InlineEditableText';
import { Breadcrumbs, type BreadcrumbItem } from '../shared/Breadcrumbs';
import { PresenceAvatars, type PresenceUser } from '../shared/PresenceAvatars';
import { Tabs } from '../shared/Tabs';
import { Badge } from '../shared/Badge';
import Chip from '../shared/Chip';
import { FileKindMark, type FileKind } from '../shared/FileKindMark';
import { DocumentSaveStatus, type DocumentSaveState } from './DocumentSaveStatus';
import { ComposerDockPlacementContext } from './FloatingComposerDock';

export interface EditorShellTab {
  id: string;
  label: string;
  /** A count on the tab — open comments. Zero or absent shows none. */
  count?: number;
  disabled?: boolean;
}

/** The handoff's four tabs, for a host that has all of them. */
export const DEFAULT_EDITOR_SHELL_TABS: readonly EditorShellTab[] = [
  { id: 'editor', label: 'Editor' },
  { id: 'comments', label: 'Comments' },
  { id: 'versions', label: 'Versions' },
  { id: 'history', label: 'History' },
];

export interface EditorShellProps {
  /** The trail above the title — "Sprint planning / Sprint review". */
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  /** Makes the title editable in place. Omit for a read-only title. */
  onTitleChange?: (title: string) => void;
  /** Accessible name of the title editor. Default "File name". */
  titleLabel?: string;
  /** Draws a `FileKindMark` before the title. */
  kind?: FileKind;
  /** Renders a star toggle when `onStarredChange` is passed. */
  starred?: boolean;
  onStarredChange?: (starred: boolean) => void;
  /** After the title — normally a `StatusPill` ("Draft", "v4"). */
  statusPill?: ReactNode;
  /**
   * Where the file lives, INLINE after the status pill on the title row
   * ("Release plan  Draft | Sprint planning / Release assets"), each segment
   * clickable. The alternative to `breadcrumbs` above the title for a header
   * that wants one row. With it, the title takes only the width it needs.
   * Since 2.385.0.
   */
  path?: BreadcrumbItem[];
  /**
   * Beside the crumb trail on its row — a type `Chip` and the document id in
   * mono ("› OpenTelemetry everywhere / Story wi-obs-e1-s4"). Since 2.385.0.
   */
  crumbsTrailing?: ReactNode;
  /** A line under the title — the document's description. Since 2.385.0. */
  subtitle?: ReactNode;
  /**
   * A row between the title block and the tabs — a `WorkItemMetaBar`
   * (status · points · owner · priority). Since 2.385.0.
   */
  metaBar?: ReactNode;
  /** Who is here. Rendered with `PresenceAvatars`. */
  participants?: PresenceUser[];
  /** Jump to where a participant is (their cursor, their slide). Since 2.367.0. */
  onParticipantClick?: (id: string) => void;
  /** Follow a participant's view; `followingParticipantId` marks who is followed. Since 2.367.0. */
  onFollowParticipant?: (id: string) => void;
  followingParticipantId?: string | null;
  /** Beside the collaborators — "Owned by Connor Hoehn". */
  meta?: ReactNode;
  saveState?: DocumentSaveState;
  /** Right of the title row — Share, the ⋯ menu, "Open presentation". */
  headActions?: ReactNode;
  /** Omit for no tab row. `DEFAULT_EDITOR_SHELL_TABS` is the handoff's set. */
  tabs?: readonly EditorShellTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  /** Under the tabs — `DocumentToolbar`, a slides toolbar. */
  toolbar?: ReactNode;
  /** The editing surface. */
  children: ReactNode;
  /**
   * The composer row — normally a `FloatingComposerDock`. Always the LAST row
   * of the editor column, flush with its bottom, never scrolling and never
   * overlaid: the surface's scroll box ends at its top edge (a
   * `FloatingComposerDock` inside the shell is pinned, not floated). Nothing
   * renders below it. Since 2.365.0.
   */
  footer?: ReactNode;
  /**
   * An agent's pending edits — normally a `ProposedEditStrip`. Drawn between
   * the scrolling surface and the `footer` dock, in the dock's gutter
   * (`--dock-inset`), never scrolling and never inside the composer (which
   * collapses when idle): a pending edit stays in view while the page it
   * would change scrolls above it. Its own height is capped at 40% of the
   * surface and scrolls past that, and it shrinks (to 4rem) before the page above
   * it drops below 7rem, so a short window keeps some of the document. Since 2.408.0.
   */
  proposal?: ReactNode;
  /**
   * `workspace` (default) paints the surface the neutral grey a page or a
   * slide floats on; `plain` leaves it the panel colour, for a list or a
   * history tab.
   */
  surface?: 'workspace' | 'plain';
  /** Optional left column — the project explorer. */
  explorer?: ReactNode;
  /** Optional right column — normally a `Workbench`. */
  workbench?: ReactNode;
  /** Accessible name of the editor pane. Default "Editor". */
  label?: string;
  /**
   * `document` (default): a file's head — kind mark, title with its pill and
   * folder path, save line, and the head actions on the title row.
   * `work-item` (since 2.386.15): the Work mockup's head — a crumb line
   * ("› OpenTelemetry everywhere / Story wi-obs-e1-s4", from `breadcrumbs` +
   * `crumbsTrailing`) that carries `headActions` (normally just ⋯) at its
   * right, then a 22px title with no kind mark, then the subtitle. The crumb
   * line stays on a short window, since it holds the actions.
   */
  variant?: 'document' | 'work-item';
  /** work-item: the item's type as a soft chip on the crumb line ("Story"). Since 2.386.15. */
  itemType?: string;
  /** work-item: the item's key in mono after the chip ("wi-obs-e1-s4"). Since 2.386.15. */
  itemKey?: string;
  /**
   * The title's size. `md` (default) is today's 20px bold document title (22px
   * in `work-item`). `lg` is a record's headline — 26px semibold — for a page
   * where the title IS the page heading and nothing sits above it but a crumb
   * band. `sm` (since 2.441.6) is a record headline INSIDE a page — a pane
   * of Review/Knowledge records — at the 14/600 heading step, so the page
   * keeps its one 20px title. Hosts must not style the title themselves.
   * Since 2.389.0.
   */
  titleSize?: 'sm' | 'md' | 'lg';
  /**
   * The read-only title's element. Default `h1`. A record headline inside a
   * page (`titleSize="sm"`) may pass `h2` so the page keeps one h1. Since
   * 2.441.6.
   */
  titleAs?: 'h1' | 'h2' | 'h3';
  /**
   * A read-only heading may wrap onto multiple lines. `truncate` (default)
   * keeps the existing single-line title. Editing still uses the fitted
   * single-line title editor. Since 2.409.0.
   */
  titleOverflow?: 'truncate' | 'wrap';
  /**
   * At the right end of the tab row, above the tabs' underline — "Sources 4",
   * "Open in Library ↗". Hangs from the same baseline as the tabs, so it
   * reads as belonging to the row, not the title. Since 2.389.0.
   */
  tabsTrailing?: ReactNode;
  /** Horizontal header inset: `editor` (default) is 20px; `page` aligns
   * with a host page's 24px breadcrumb gutter. Since 2.485.0. */
  headerInset?: 'editor' | 'page';
  className?: string;
  'data-testid'?: string;
}

function StarGlyph({ filled }: { filled: boolean }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" aria-hidden="true">
      <path d="M8 1.9l1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.3l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.9Z" />
    </svg>
  );
}

export function EditorShell({
  breadcrumbs,
  title,
  onTitleChange,
  titleLabel = 'File name',
  kind,
  starred = false,
  onStarredChange,
  statusPill,
  path,
  crumbsTrailing,
  subtitle,
  metaBar,
  participants,
  onParticipantClick,
  onFollowParticipant,
  followingParticipantId,
  meta,
  saveState,
  headActions,
  tabs,
  activeTab,
  onTabChange,
  toolbar,
  children,
  footer,
  proposal,
  surface = 'workspace',
  explorer,
  workbench,
  label = 'Editor',
  variant = 'document',
  itemType,
  itemKey,
  titleSize = 'md',
  titleAs: TitleTag = 'h1',
  titleOverflow = 'truncate',
  tabsTrailing,
  headerInset = 'editor',
  className,
  'data-testid': testId = 'editor-shell',
}: EditorShellProps) {
  const workItem = variant === 'work-item';
  const itemTag = workItem && (itemType || itemKey) ? (
    <>
      {itemType && <Chip size="sm" tone="info" data-testid={`${testId}-item-type`}>{itemType}</Chip>}
      {itemKey && <span className="font-mono text-[12px] text-text-secondary" data-testid={`${testId}-item-key`}>{itemKey}</span>}
    </>
  ) : null;
  const trailing = itemTag || crumbsTrailing != null ? <>{itemTag}{crumbsTrailing}</> : null;
  const crumbsRow = workItem && ((breadcrumbs && breadcrumbs.length > 0) || trailing != null);
  const titleClass = titleSize === 'lg'
    ? 'text-[26px] font-semibold leading-8'
    : titleSize === 'sm'
      ? 'text-sm font-semibold leading-5'
      : workItem ? 'text-[22px] font-bold leading-7' : 'text-xl font-bold leading-6';
  const idPrefix = `${testId}-${useId().replace(/:/g, '')}`;
  const hasTabs = !!tabs && tabs.length > 0;
  const currentTab = hasTabs ? (tabs!.some((t) => t.id === activeTab) ? activeTab! : tabs![0]!.id) : undefined;
  const hasByline = (participants && participants.length > 0) || meta != null || !!saveState;

  const renderTabs = (tabsClassName: string) => (
    <Tabs
      items={tabs!.map((t) => ({
        id: t.id,
        label: t.label,
        ...(t.disabled ? { disabled: true } : {}),
        // work-item: a plain count beside the label ("Discussion 3"), as the Work mockup draws it.
        ...(t.count ? { badge: workItem
          ? <span aria-label={`${t.count} in ${t.label}`}>{t.count}</span>
          : <Badge variant="count" value={t.count} color="muted" aria-label={`${t.count} in ${t.label}`} /> } : {}),
        testId: `${testId}-tab-${t.id}`,
      }))}
      value={currentTab!}
      onValueChange={(id) => onTabChange?.(id)}
      variant="underline"
      {...(workItem ? { badgeStyle: 'plain' as const } : {})}
      // Tabs' own md step (14px/500) — the size of the section band tabs the
      // app shell draws (NavTabs), not a 15px of the header's own (2.407.13).
      size="md"
      itemClassName="px-3.5 pb-1.5 pt-1 leading-5"
      aria-label={`${title} sections`}
      idPrefix={idPrefix}
      className={tabsClassName}
    />
  );

  const pane = (
    <section data-ui-part="" aria-label={label} data-testid={testId} data-surface={surface} className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface">
      <header className={cn('flex flex-col gap-1 border-b border-border pt-3', headerInset === 'page' ? 'px-6' : 'px-5')} data-variant={variant} data-header-inset={headerInset} data-testid={`${testId}-header`}>
        {crumbsRow && (
          <div className="flex h-7 min-w-0 items-center gap-2 text-[13px] text-text-secondary" data-testid={`${testId}-crumbs-row`}>
            <ChevronIcon dir="right" size={12} aria-hidden="true" className="-ml-1 shrink-0 text-text-tertiary" />
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Breadcrumbs items={breadcrumbs} maxItems={4} lastIsCurrent={false} size="sm" className="min-w-0" data-testid={`${testId}-crumbs`} />
            )}
            {breadcrumbs && breadcrumbs.length > 0 && trailing != null && (
              <span aria-hidden="true" className="shrink-0 text-text-tertiary">/</span>
            )}
            {trailing != null && (
              <span className="flex shrink-0 items-center gap-2" data-testid={`${testId}-crumbs-trailing`}>{trailing}</span>
            )}
            <span className="flex-1" />
            {headActions && <div className="flex shrink-0 items-center gap-2" data-testid={`${testId}-actions`}>{headActions}</div>}
          </div>
        )}
        {!workItem && breadcrumbs && breadcrumbs.length > 0 && !crumbsTrailing && (
          // A short window (a 1280×720 laptop leaves ~577 px) gives the crumbs'
          // row to the canvas: the title stays, and the explorer beside the
          // pane already shows where the file lives.
          <Breadcrumbs items={breadcrumbs} maxItems={4} size="sm" className="[@media(max-height:640px)]:hidden" data-testid={`${testId}-crumbs`} />
        )}
        {!workItem && crumbsTrailing && (
          <div className="flex min-w-0 items-center gap-2 text-xs [@media(max-height:640px)]:hidden" data-testid={`${testId}-crumbs-row`}>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Breadcrumbs items={breadcrumbs} maxItems={4} size="sm" className="min-w-0" data-testid={`${testId}-crumbs`} />
            )}
            <span className="flex shrink-0 items-center gap-2" data-testid={`${testId}-crumbs-trailing`}>{crumbsTrailing}</span>
          </div>
        )}
        {/* Wraps: when the title block (floor 18rem) and `headActions` do not both
            fit — a presentation head with revisions, Save, Download and Share
            is ~620px — the actions drop under the title instead of leaving it
            one word per line. */}
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1" data-testid={`${testId}-head-row`}>
          {/* The kind mark stands BESIDE the title and its save line, a 40px
              outline glyph with no tinted box (2.386.5) — so the title, the
              pill and "Saved 3 hours ago" share one left edge, and the mark
              can never sit alone on a row above a wrapped title. */}
          {kind && !workItem && <FileKindMark kind={kind} size="2xl" variant="outline" className="[@media(max-height:640px)]:h-8 [@media(max-height:640px)]:w-8" data-testid={`${testId}-kind`} />}
          {/* A short window (under 640 px tall — a 1280×720 laptop window has a
              577 px viewport) puts the byline BESIDE the title instead of under
              it: one row, ~26 px back for the canvas below (a slide stage). */}
          <div className="flex min-w-0 flex-[1_1_18rem] flex-col gap-0 [@media(max-height:640px)]:flex-row [@media(max-height:640px)]:items-center [@media(max-height:640px)]:gap-3">
            {/* The title sizes to its words (truncating when long), so the
                status pill sits right beside it — with or without a folder
                path after it — rather than at the row's far end (2.385.4).
                Wraps rather than squeezing: with a crowded row the title used to
                take all the shrink (min-w-0) and collapse to a sliver while
                the pills beside it could not shrink at all. */}
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 [@media(max-height:640px)]:flex-1">
              {/* 32px, the size the title row is drawn at (2.385.6): at the
                  22px default the mark read as a bullet beside an 18px title. */}
              {/* Mark + title (+ star) never split across rows (2.385.8): in a
                  ~500 px column the 32px mark used to sit alone on row 1 with
                  the title wrapped under it. The group caps at the row's width
                  and the title truncates inside it; only the pill and folder
                  path wrap to the next row when there is no room. */}
              <span className="flex min-w-0 max-w-full flex-initial flex-nowrap items-center gap-x-2" data-testid={`${testId}-title-group`}>
              {onTitleChange ? (
                <InlineEditableText
                  value={title}
                  onCommit={onTitleChange}
                  label={titleLabel}
                  required
                  fitContent
                  // No `min-w-[10rem]` (2.385.6): it held a short title like
                  // "Release plan" open to 160px and left a gap before the
                  // Draft pill. The button sizes to its words; the input, while
                  // editing, to its value.
                  // work-item: the editor's 1px border + 4px padding pulled
                  // back (visually only: a negative margin shrank the fitted
                  // box and truncated the title) onto the subtitle's edge.
                  className={cn('min-w-0 max-w-full flex-initial py-0', titleClass, workItem && 'relative -left-[5px]')}
                  data-testid={`${testId}-title`}
                />
              ) : (
                <TitleTag className={cn('m-0 min-w-0 max-w-full flex-initial text-text-primary', titleClass,
                  titleOverflow === 'wrap' ? 'whitespace-normal break-words' : 'truncate')} data-testid={`${testId}-title`} data-title-size={titleSize}>{title}</TitleTag>
              )}
              {onStarredChange && (
                <IconButton
                  size="sm"
                  aria-label={starred ? 'Remove star' : 'Star this file'}
                  aria-pressed={starred}
                  title={starred ? 'Starred' : 'Star'}
                  onClick={() => onStarredChange(!starred)}
                  className={starred ? 'shrink-0 text-primary' : 'shrink-0 text-text-tertiary'}
                  data-testid={`${testId}-star`}
                >
                  <StarGlyph filled={starred} />
                </IconButton>
              )}
              </span>
              {statusPill}
              {path && path.length > 0 && (
                <span className="flex min-w-0 flex-1 items-center border-l border-border pl-3" data-testid={`${testId}-path`}>
                  {/* The 12px meta step (Breadcrumbs size="sm"; 13px before 2.441.3) — the "Saved …" line's
                      and the status pill's size; a class on the nav never
                      reached the 14px crumbs inside it (2.407.13). */}
                  <Breadcrumbs items={path} aria-label="Document location" maxItems={4} lastIsCurrent={false} size="sm" className="min-w-0" data-testid={`${testId}-path-crumbs`} />
                </span>
              )}
            </div>
            {subtitle != null && (
              <p className="m-0 min-w-0 truncate text-[15px] leading-5 text-text-secondary [@media(max-height:640px)]:hidden" data-testid={`${testId}-subtitle`}>{subtitle}</p>
            )}
            {hasByline && (
              <div className="flex min-w-0 flex-wrap items-center gap-2 text-[13px] text-text-tertiary [@media(max-height:640px)]:max-w-[50%] [@media(max-height:640px)]:flex-nowrap" data-testid={`${testId}-byline`}>
                {participants && participants.length > 0 && (
                  <PresenceAvatars
                    users={participants}
                    size={22}
                    maxVisible={4}
                    {...(onParticipantClick ? { onUserClick: onParticipantClick } : {})}
                    {...(onFollowParticipant ? { onFollowUser: onFollowParticipant, followingUserId: followingParticipantId ?? null } : {})}
                  />
                )}
                {meta != null && <span className="min-w-0 truncate">{meta}</span>}
                <DocumentSaveStatus state={saveState} className="text-xs" />
              </div>
            )}
          </div>
          {headActions && !crumbsRow && <div className="ml-auto flex shrink-0 flex-wrap items-center gap-3" data-testid={`${testId}-actions`}>{headActions}</div>}
        </div>
        {metaBar != null && (
          <div className={cn('flex min-w-0 items-center', workItem ? (titleSize === 'lg' ? 'pb-2 pt-1' : 'pb-2 pt-3') : 'py-2')} data-testid={`${testId}-meta-bar`}>{metaBar}</div>
        )}
        {tabsTrailing != null ? (
          <div className="-mb-px mt-1 flex min-w-0 items-end gap-3" data-testid={`${testId}-tabs-row`}>
            {hasTabs ? renderTabs('-ml-3 min-w-0 flex-1 border-b-0') : <span className="flex-1" aria-hidden="true" />}
            <div className="flex shrink-0 items-center gap-2 pb-1.5" data-testid={`${testId}-tabs-trailing`}>{tabsTrailing}</div>
          </div>
        ) : hasTabs ? (
          renderTabs('-mb-px -ml-3 mt-1 border-b-0')
        ) : (
          <span className="h-2" aria-hidden="true" />
        )}
      </header>

      {/* Sideways the toolbar row sits in the same gutter as the dock below
          (`--dock-inset`, 1rem unless the host says otherwise), so a bar's
          first control and the composer's left edge fall on the same line. It
          was `px-3` — 4px inside the dock — and the deck page measured exactly
          that offset between the slide tools and the agent composer. */}
      {toolbar && (
        <div className="flex min-w-0 items-center gap-1 border-b border-border px-[var(--dock-inset,1rem)] py-1.5" data-testid={`${testId}-toolbar`}>
          {toolbar}
        </div>
      )}

      {/* The surface is a column: the scroller takes what is left and is the
          ONLY thing that scrolls; the dock is the last row, pinned. Popovers
          the surface draws inline are clipped by the scroller, so they end
          above the composer too. */}
      <div className={cn('relative flex min-h-0 flex-1 flex-col', surface === 'workspace' ? 'bg-workspace' : 'bg-surface')} data-testid={`${testId}-surface`}>
        <div
          {...(hasTabs
            ? { role: 'tabpanel', id: `${idPrefix}-panel-${currentTab}`, 'aria-labelledby': `${idPrefix}-tab-${currentTab}` }
            : {})}
          // A floor: the strip above and the dock below (a toast, a composer)
          // yield to it, so a short window never ends with no page at all.
          className={cn('flex-1 overflow-auto', proposal != null || footer != null ? 'min-h-28' : 'min-h-0')}
          data-testid={`${testId}-scroller`}
        >
          {children}
        </div>
        {proposal != null && (
          <div className="relative z-20 max-h-[40%] min-h-16 shrink overflow-auto px-[var(--dock-inset,1rem)] pb-1 pt-2" data-testid={`${testId}-proposal`}>
            {proposal}
          </div>
        )}
        {footer != null && (
          // The cap lives here, on the surface's own row, so the percentage
          // resolves against the surface; the dock inside fills it and lets
          // what sits above its composer scroll.
          // A pinned dock writes `--dock-floor` here (what in the row cannot
          // scroll: a call dock beside it, its composer card), and the cap
          // never goes below it — the editor shrinks instead of the composer
          // being cut off (2.407.8).
          <div className="relative z-20 flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col" data-testid={`${testId}-dock`}>
            <ComposerDockPlacementContext.Provider value="pinned">{footer}</ComposerDockPlacementContext.Provider>
          </div>
        )}
      </div>
    </section>
  );

  if (!explorer && !workbench) return <div className={cn('flex h-full min-h-0 flex-col', className)}>{pane}</div>;

  return (
    <div className={cn('flex h-full min-h-0 flex-col lg:flex-row', className)} data-testid={`${testId}-frame`}>
      {explorer && (
        <div className="flex max-h-72 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border bg-surface lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r" data-testid={`${testId}-explorer`}>
          {explorer}
        </div>
      )}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row">
        {pane}
        {/* Beside the pane from lg; below that it stacks ABOVE the pane
            (order-first), never below — the composer stays the window's
            last row. */}
        {workbench && (
          <div className="order-first flex max-h-64 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border lg:order-none lg:max-h-none lg:w-80 lg:border-b-0 lg:border-l" data-testid={`${testId}-workbench`}>
            {workbench}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditorShell;
