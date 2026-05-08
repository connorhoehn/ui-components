import { Outlet, useLocation } from 'react-router';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { MockProviders } from '../mock/providers';
import { TocProvider, useToc, TableOfContents, useScrollSpy } from '../shared';

export function DocsLayout() {
  const { pathname } = useLocation();
  const isPageDemo = (pathname.startsWith('/pages/') && pathname !== '/pages')
    || (pathname.startsWith('/workflows/') && pathname !== '/workflows')
    || (pathname.startsWith('/identity/') && pathname !== '/identity');

  return (
    <MockProviders>
      <TocProvider>
        <div style={{ minHeight: '100vh' }}>
          <TopNav />
          <Sidebar />
          {!isPageDemo && <TocSidebar />}
          <main style={{
            marginLeft: 240,
            paddingTop: isPageDemo ? 0 : 56,
            minHeight: 'calc(100vh - 56px)',
            display: isPageDemo ? 'flex' : 'block',
            flexDirection: 'column',
          }}>
            {isPageDemo ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <Outlet />
              </div>
            ) : (
              <div style={{ padding: '24px 40px' }}>
                <Breadcrumbs />
                <Outlet />
              </div>
            )}
          </main>
        </div>
      </TocProvider>
    </MockProviders>
  );
}

function TocSidebar() {
  const { items } = useToc();
  const ids = items.map((i: { id: string }) => i.id);
  const activeId = useScrollSpy(ids);

  if (items.length === 0) return null;

  return (
    <div style={{ position: 'fixed', top: 80, right: 40, width: 200 }}>
      <TableOfContents items={items} activeId={activeId} />
    </div>
  );
}
