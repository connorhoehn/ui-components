// PageFromSpec — renders a `PageSpec` through the matching page template.
//
// Dispatch only: every layout rule (one viewport, the header's collapsed
// search, counts and pagers hidden when empty, tabs instead of stacked cards)
// belongs to the template. This file turns spec data into the template's
// props and never draws layout of its own.
import { CollectionPage } from '../CollectionPage';
import { MasterDetailPage } from '../MasterDetailPage';
import { DetailPage } from '../DetailPage';
import { DashboardPage } from '../DashboardPage';
import { SettingsPage } from '../SettingsPage';
import { PageFrame } from '../PageFrame';
import { renderLeaf, renderLeaves, renderSections } from './render';
import type {
  TableLeaf, CollectionPageSpec, DashboardPageSpec, DetailPageSpec, FramePageSpec, LeafSpec, MasterDetailPageSpec, PageSpec, SettingsPageSpec,
} from './types';

/** Typed identity for authoring a spec: `const page = definePage({ template: 'collection', … })`. */
export function definePage<S extends PageSpec>(spec: S): S {
  return spec;
}

/** Typed identity for a `table` leaf, so `columns` and `keyField` check against the row type. */
export function tableLeaf<T>(leaf: Omit<TableLeaf<T>, 'kind'>): TableLeaf<T> {
  return { kind: 'table', ...leaf };
}

/** Spreads `{ key: value }` only when `value` is set, so a template default is never overridden by `undefined`. */
function opt<K extends string, V>(key: K, value: V | null | undefined): { [P in K]?: V } {
  return (value == null ? {} : { [key]: value }) as { [P in K]?: V };
}

const badgeOf = (badge: LeafSpec | undefined) => (badge ? renderLeaf(badge) : null);

function header(spec: Pick<CollectionPageSpec, 'title' | 'description' | 'breadcrumbs' | 'badge' | 'back' | 'density' | 'titleAs' | 'data-testid'>) {
  return {
    title: spec.title,
    ...opt('description', spec.description),
    ...opt('breadcrumbs', spec.breadcrumbs),
    ...opt('badge', badgeOf(spec.badge)),
    ...opt('back', spec.back),
    ...opt('density', spec.density),
    ...opt('titleAs', spec.titleAs),
    ...opt('data-testid', spec['data-testid']),
  };
}

function Collection({ spec }: { spec: CollectionPageSpec }) {
  const { toolbar, empty, detail } = spec;
  return (
    <CollectionPage
      {...header(spec)}
      data-page-spec="collection"
      gutter={spec.gutter ?? 'page'}
      {...opt('headerActions', renderLeaves(spec.actions))}
      {...(toolbar ? (() => {
        const { filterPanel, ...rest } = toolbar;
        return { toolbar: { ...rest, ...(filterPanel ? { filterPanel: { ...filterPanel, content: renderLeaves(filterPanel.content) } } : {}) } };
      })() : {})}
      {...opt('toolbarPlacement', spec.toolbarPlacement)}
      {...opt('table', spec.table)}
      {...(spec.loading ? { loading: true } : {})}
      {...opt('error', spec.error)}
      {...opt('onRetry', spec.onRetry)}
      {...(empty ? { empty: { title: empty.title, ...opt('description', empty.description), ...opt('action', empty.action ? renderLeaf(empty.action) : null) } } : {})}
      {...opt('isEmpty', spec.isEmpty)}
      {...(detail !== undefined ? { detail: detail ? { ...detail, content: renderSections(detail.content, { size: 'sm' }) } : null } : {})}
    >
      {renderSections(spec.sections)}
    </CollectionPage>
  );
}

function MasterDetail({ spec }: { spec: MasterDetailPageSpec }) {
  const { list } = spec;
  const record = spec.detail ? renderSections(spec.detail) : null;
  return (
    <MasterDetailPage
      {...header(spec)}
      data-page-spec="master-detail"
      gutter={spec.gutter ?? 'page'}
      {...opt('actions', renderLeaves(spec.actions))}
      list={{
        label: list.label,
        ...opt('title', list.title),
        ...opt('count', list.count),
        ...opt('back', list.back),
        ...opt('actions', renderLeaves(list.actions)),
        ...opt('header', renderLeaves(list.header)),
        body: renderLeaves(list.body),
        ...opt('footer', renderLeaves(list.footer)),
      }}
      {...opt('emptyDetail', renderLeaves(spec.emptyDetail))}
      {...opt('aside', renderLeaves(spec.aside))}
      {...opt('footer', renderLeaves(spec.footer))}
      {...opt('body', spec.body)}
      {...opt('dockedBody', spec.dockedBody)}
      {...opt('fold', spec.fold)}
      {...opt('railWidth', spec.railWidth)}
    >
      {record}
    </MasterDetailPage>
  );
}

function Detail({ spec }: { spec: DetailPageSpec }) {
  return (
    <DetailPage
      title={spec.title}
      data-page-spec="detail"
      gutter={spec.gutter ?? 'page'}
      {...opt('badge', badgeOf(spec.badge))}
      {...opt('description', spec.description)}
      {...opt('meta', spec.meta ? renderLeaf(spec.meta) : null)}
      {...opt('actions', renderLeaves(spec.actions))}
      {...opt('breadcrumbs', spec.breadcrumbs)}
      {...opt('titleAs', spec.titleAs)}
      {...(spec.tabs ? {
        tabs: spec.tabs.map((tab) => ({
          id: tab.id, label: tab.label, ...opt('badge', tab.badge), ...(tab.disabled ? { disabled: true } : {}),
          content: renderSections(tab.content, { size: 'sm' }),
        })),
      } : {})}
      {...opt('activeTab', spec.activeTab)}
      {...opt('onTabChange', spec.onTabChange)}
      {...opt('aside', renderLeaves(spec.aside))}
      {...opt('data-testid', spec['data-testid'])}
    >
      {renderSections(spec.sections)}
    </DetailPage>
  );
}

function Dashboard({ spec }: { spec: DashboardPageSpec }) {
  return (
    <DashboardPage
      {...header(spec)}
      data-page-spec="dashboard"
      gutter={spec.gutter ?? 'page'}
      {...opt('actions', renderLeaves(spec.actions))}
      {...opt('stats', spec.stats)}
      {...opt('columns', spec.columns)}
      {...(spec.panels ? {
        panels: spec.panels.map((panel) => ({
          id: panel.id, title: panel.title, ...opt('span', panel.span),
          ...opt('action', renderLeaves(panel.action)),
          content: renderLeaves(panel.content),
        })),
      } : {})}
    />
  );
}

function Settings({ spec }: { spec: SettingsPageSpec }) {
  return (
    <SettingsPage
      data-page-spec="settings"
      title={spec.title}
      gutter={spec.gutter ?? 'page'}
      sections={spec.sections.map((section) => ({
        id: section.id, label: section.label, ...opt('description', section.description),
        content: renderSections(section.content, { size: 'sm' }),
      }))}
      {...opt('subtitle', spec.subtitle)}
      {...opt('breadcrumbs', spec.breadcrumbs)}
      {...opt('activeSectionId', spec.activeSectionId)}
      {...opt('onSectionChange', spec.onSectionChange)}
      {...opt('dirty', spec.dirty)}
      {...opt('saveLabel', spec.saveLabel)}
      {...opt('cancelLabel', spec.cancelLabel)}
      {...opt('onSave', spec.onSave)}
      {...opt('onCancel', spec.onCancel)}
      {...opt('saving', spec.saving)}
      {...opt('railWidth', spec.railWidth)}
      {...opt('data-testid', spec['data-testid'])}
    />
  );
}

function Frame({ spec }: { spec: FramePageSpec }) {
  return (
    <PageFrame
      {...header(spec)}
      data-page-spec="frame"
      gutter={spec.gutter ?? 'page'}
      {...opt('actions', renderLeaves(spec.actions))}
      {...opt('trailControls', renderLeaves(spec.trailControls))}
      {...(spec.trailLink !== undefined ? { trailLink: spec.trailLink } : {})}
      {...opt('collapsed', spec.collapsed)}
      {...opt('onToggleCollapsed', spec.onToggleCollapsed)}
      {...opt('body', spec.body)}
      {...opt('dockedBody', spec.dockedBody)}
      {...opt('bodyGutter', spec.bodyGutter)}
      {...opt('footer', renderLeaves(spec.footer))}
    >
      {renderSections(spec.sections)}
    </PageFrame>
  );
}

export interface PageFromSpecProps {
  spec: PageSpec;
}

/**
 * Use this to build a page from data: a `PageSpec` (template → regions → sections → leaves) rendered through the matching page template, every leaf a library component.
 *
 * Emits `data-page-spec="<template>"` on the template root and `data-spec-leaf="<kind>"` on each leaf.
 *
 * @example
 * <PageFromSpec spec={definePage({
 *   template: 'collection', title: 'Runs',
 *   actions: [{ kind: 'button', variant: 'primary', label: 'New run', onClick: onNew }],
 *   toolbar: { label: 'Run controls', search: { value: q, onChange: setQ } },
 *   table: { data: runs, keyField: (r) => r.id, columns, onRowClick: open },
 *   empty: { title: 'No runs yet' },
 * })} />
 */
export function PageFromSpec({ spec }: PageFromSpecProps) {
  switch (spec.template) {
    case 'collection': return <Collection spec={spec} />;
    case 'master-detail': return <MasterDetail spec={spec} />;
    case 'detail': return <Detail spec={spec} />;
    case 'dashboard': return <Dashboard spec={spec} />;
    case 'settings': return <Settings spec={spec} />;
    case 'frame': return <Frame spec={spec} />;
  }
}

export default PageFromSpec;
