import { render, screen } from '@testing-library/react';
import EditorSidebarManager from '../EditorSidebarManager';
import type { EditorSidebarManagerProps } from '../EditorSidebarManager';
import type { Section } from '../../../types/document';

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
  root = null;
  rootMargin = '';
  thresholds = [];
}

beforeAll(() => {
  if (typeof globalThis.IntersectionObserver === 'undefined') {
    (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
      IntersectionObserverStub;
  }
});

function mkSection(id: string, title: string): Section {
  return { id, type: 'notes', title, collapsed: false, items: [] };
}

function defaults(overrides: Partial<EditorSidebarManagerProps> = {}): EditorSidebarManagerProps {
  return {
    showHistory: false,
    showMyItems: false,
    showVideoHistory: false,
    closePanel: () => {},
    versionHistory: {
      versions: [],
      loading: false,
      previewTimestamp: null,
      fetchVersions: () => {},
      previewVersion: () => {},
      clearPreview: () => {},
      saveVersion: async () => {},
      compareVersion: () => {},
      clearCompare: () => {},
      compareSections: null,
      compareTimestamp: null,
      restoreVersion: async () => {},
      extractSections: () => [],
    } as unknown as EditorSidebarManagerProps['versionHistory'],
    ydoc: null,
    myItems: [],
    onNavigateToSection: () => {},
    videoSessions: { sessions: [], loading: false, fetchSessions: () => {} },
    showTOC: false,
    commentSidebarOpen: false,
    sections: [],
    focusedSectionId: null,
    mode: 'editor',
    ...overrides,
  };
}

describe('EditorSidebarManager (TOC routing)', () => {
  it('renders nothing when every panel flag is off', () => {
    const { container } = render(<EditorSidebarManager {...defaults()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the table of contents when showTOC + editor mode + >1 sections', () => {
    render(
      <EditorSidebarManager
        {...defaults({
          showTOC: true,
          sections: [mkSection('s1', 'Overview'), mkSection('s2', 'Details')],
        })}
      />,
    );
    expect(screen.getByText('Contents')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('suppresses the TOC when the comment sidebar is open', () => {
    render(
      <EditorSidebarManager
        {...defaults({
          showTOC: true,
          commentSidebarOpen: true,
          sections: [mkSection('s1', 'A'), mkSection('s2', 'B')],
        })}
      />,
    );
    expect(screen.queryByText('Contents')).toBeNull();
  });

  it('suppresses the TOC when mode is not editor', () => {
    render(
      <EditorSidebarManager
        {...defaults({
          showTOC: true,
          mode: 'reader',
          sections: [mkSection('s1', 'A'), mkSection('s2', 'B')],
        })}
      />,
    );
    expect(screen.queryByText('Contents')).toBeNull();
  });

  it('suppresses the TOC when only one section exists', () => {
    render(
      <EditorSidebarManager
        {...defaults({ showTOC: true, sections: [mkSection('s1', 'A')] })}
      />,
    );
    expect(screen.queryByText('Contents')).toBeNull();
  });
});
