import { Outlet, useLocation, Link } from 'react-router';
import {
  DocsShell,
  DocsSidebar,
  DocsTopNav,
  type DocsSidebarSection,
} from '@connorhoehn/ui-components/layout';
import { Breadcrumbs } from './Breadcrumbs';
import { MockProviders } from '../mock/providers';
import { TocProvider, useToc, TableOfContents, useScrollSpy } from '../shared';
import { navigationTree } from '../navigation';

const TOPNAV_BRAND = 'UI Components';

const TOPNAV_ITEMS = navigationTree.map((s) => ({
  label: s.label,
  to: s.basePath,
}));

const SIDEBAR_SECTIONS: DocsSidebarSection[] = navigationTree.map((section) => ({
  id: section.id,
  label: section.label,
  basePath: section.basePath,
  groups: section.groups.map((group) => ({
    id: group.id,
    label: group.label,
    to: group.path,
    items: group.items.map((item) => ({
      id: item.id,
      label: item.label,
      to: item.path,
    })),
  })),
}));

function isPageDemoPath(pathname: string): boolean {
  return (
    (pathname.startsWith('/pages/') && pathname !== '/pages') ||
    (pathname.startsWith('/workflows/') && pathname !== '/workflows') ||
    (pathname.startsWith('/identity/') && pathname !== '/identity')
  );
}

export function DocsLayout() {
  const { pathname } = useLocation();
  const isPageDemo = isPageDemoPath(pathname);

  return (
    <MockProviders>
      <TocProvider>
        <DocsShell
          topNav={
            <DocsTopNav
              items={TOPNAV_ITEMS}
              activeHref={pathname}
              brand={TOPNAV_BRAND}
              renderLink={(item, props) => (
                <Link to={item.to} {...props}>
                  {props.children}
                </Link>
              )}
            />
          }
          sidebar={
            <DocsSidebar
              sections={SIDEBAR_SECTIONS}
              activeHref={pathname}
              renderLink={({ to }, props) => (
                <Link to={to} {...props}>
                  {props.children}
                </Link>
              )}
            />
          }
          rightRail={!isPageDemo ? <TocRail /> : undefined}
          fullBleed={isPageDemo}
          preContent={!isPageDemo ? <Breadcrumbs /> : undefined}
        >
          <Outlet />
        </DocsShell>
      </TocProvider>
    </MockProviders>
  );
}

function TocRail() {
  const { items } = useToc();
  const ids = items.map((i: { id: string }) => i.id);
  const activeId = useScrollSpy(ids);

  if (items.length === 0) return null;

  return <TableOfContents items={items} activeId={activeId} />;
}
