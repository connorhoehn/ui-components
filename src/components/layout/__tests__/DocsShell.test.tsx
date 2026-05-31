import { render, screen, fireEvent } from '@testing-library/react';
import { DocsShell } from '../DocsShell';
import { DocsSidebar, type DocsSidebarSection } from '../DocsSidebar';
import { DocsTopNav } from '../DocsTopNav';

const SECTIONS: DocsSidebarSection[] = [
  {
    id: 'getting-started',
    label: 'Getting started',
    basePath: '/getting-started',
    groups: [
      {
        id: 'intro',
        items: [
          { id: 'install', label: 'Installation', to: '/getting-started/install' },
          { id: 'quick-start', label: 'Quick start', to: '/getting-started/quick-start' },
        ],
      },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    basePath: '/foundations',
    groups: [
      {
        id: 'tokens',
        label: 'Tokens',
        items: [
          { id: 'colors', label: 'Colors', to: '/foundations/colors' },
          { id: 'typography', label: 'Typography', to: '/foundations/typography' },
        ],
      },
    ],
  },
];

const TOPNAV_ITEMS = [
  { label: 'Docs', to: '/getting-started' },
  { label: 'Components', to: '/components' },
];

describe('DocsSidebar', () => {
  it('marks the active item with aria-current=page', () => {
    render(
      <DocsSidebar
        sections={SECTIONS}
        activeHref="/foundations/colors"
      />,
    );
    const active = screen.getByTestId('docs-sidebar-link-colors');
    expect(active).toHaveAttribute('aria-current', 'page');
    const inactive = screen.getByTestId('docs-sidebar-link-typography');
    expect(inactive).not.toHaveAttribute('aria-current');
  });

  it('collapses a section when its header is clicked', () => {
    render(<DocsSidebar sections={SECTIONS} />);
    // Both Install link and Colors link visible to start
    expect(screen.getByTestId('docs-sidebar-link-install')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('docs-sidebar-section-getting-started'));
    expect(screen.queryByTestId('docs-sidebar-link-install')).not.toBeInTheDocument();
    // Other section untouched
    expect(screen.getByTestId('docs-sidebar-link-colors')).toBeInTheDocument();
  });

  it('honors defaultCollapsedSections', () => {
    render(
      <DocsSidebar
        sections={SECTIONS}
        defaultCollapsedSections={['foundations']}
      />,
    );
    expect(screen.queryByTestId('docs-sidebar-link-colors')).not.toBeInTheDocument();
    expect(screen.getByTestId('docs-sidebar-link-install')).toBeInTheDocument();
  });

  it('uses a custom renderLink', () => {
    render(
      <DocsSidebar
        sections={SECTIONS}
        renderLink={(item, props) => (
          <button type="button" {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} data-testid={`custom-${item.id}`}>
            {props.children}
          </button>
        )}
      />,
    );
    expect(screen.getByTestId('custom-install').tagName).toBe('BUTTON');
  });
});

describe('DocsTopNav', () => {
  it('renders brand + items + search placeholder by default', () => {
    render(
      <DocsTopNav
        items={TOPNAV_ITEMS}
        brand="UI Components"
        activeHref="/components"
      />,
    );
    expect(screen.getByTestId('docs-topnav-brand')).toHaveTextContent('UI Components');
    expect(screen.getByTestId('docs-topnav-search-placeholder')).toBeInTheDocument();
    const componentsLink = screen.getByTestId('topnav-link-/components');
    expect(componentsLink).toHaveAttribute('aria-current', 'page');
  });

  it('renders provided search slot instead of placeholder', () => {
    render(
      <DocsTopNav
        items={TOPNAV_ITEMS}
        brand="UI Components"
        search={<button data-testid="custom-search">Find…</button>}
      />,
    );
    expect(screen.getByTestId('custom-search')).toBeInTheDocument();
    expect(screen.queryByTestId('docs-topnav-search-placeholder')).not.toBeInTheDocument();
  });

  it('omits placeholder when showSearchPlaceholder=false', () => {
    render(
      <DocsTopNav
        items={TOPNAV_ITEMS}
        brand="UI Components"
        showSearchPlaceholder={false}
      />,
    );
    expect(screen.queryByTestId('docs-topnav-search-placeholder')).not.toBeInTheDocument();
  });
});

describe('DocsShell', () => {
  it('composes topnav + sidebar + main content', () => {
    render(
      <DocsShell
        topNav={<DocsTopNav items={TOPNAV_ITEMS} brand="UI" />}
        sidebar={<DocsSidebar sections={SECTIONS} />}
      >
        <h1>Hello docs</h1>
      </DocsShell>,
    );
    expect(screen.getByTestId('docs-shell')).toBeInTheDocument();
    expect(screen.getByTestId('docs-topnav')).toBeInTheDocument();
    expect(screen.getByTestId('docs-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('docs-shell-main')).toHaveTextContent('Hello docs');
  });

  it('renders right rail when not full-bleed', () => {
    render(
      <DocsShell
        topNav={<div />}
        sidebar={<div />}
        rightRail={<nav data-testid="toc">TOC</nav>}
      >
        content
      </DocsShell>,
    );
    expect(screen.getByTestId('docs-shell-right-rail')).toBeInTheDocument();
  });

  it('omits right rail in full-bleed mode', () => {
    render(
      <DocsShell
        topNav={<div />}
        sidebar={<div />}
        rightRail={<nav data-testid="toc">TOC</nav>}
        fullBleed
      >
        content
      </DocsShell>,
    );
    expect(screen.queryByTestId('docs-shell-right-rail')).not.toBeInTheDocument();
  });
});
