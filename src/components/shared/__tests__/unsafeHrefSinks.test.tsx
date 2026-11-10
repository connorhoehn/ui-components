import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Section } from '../../../types/document';
import FileUploadReaderRenderer from '../../../renderers/file-upload/FileUploadReaderRenderer';
import LinkBlockReaderRenderer from '../../../renderers/link-block/LinkBlockReaderRenderer';
import { AgentRunCard, agentRunResultFromMetadata } from '../../social/AgentRunCard';
import { Link } from '../Link';
import { renderCommentText } from '../../doc-editor/CommentThread';

afterEach(cleanup);

const BAD = ['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,<script>alert(1)</script>', 'vbscript:msgbox(1)'];

const section = (metadata: Record<string, unknown>): Section => ({
  id: 's1', type: 'custom', title: 'S', collapsed: false, items: [], sectionType: 'x', metadata,
});

/** No anchor in the tree carries an href, and nothing opened a window. */
function expectNoNavigableLink(container: HTMLElement, opened: ReturnType<typeof vi.fn>) {
  for (const a of Array.from(container.querySelectorAll('a'))) {
    expect(a.getAttribute('href')).toBeNull();
  }
  expect(opened).not.toHaveBeenCalled();
}

describe.each(BAD)('untrusted URL %s', (bad) => {
  const open = vi.fn();
  afterEach(() => open.mockClear());
  const spy = () => vi.spyOn(window, 'open').mockImplementation(open as never);

  it('FileUploadReaderRenderer renders the file name with no link', () => {
    spy();
    const { container, queryByTestId } = render(
      <FileUploadReaderRenderer section={section({ fileName: 'x.bin', fileDataUrl: bad })} viewMode="reader" editable={false} />,
    );
    expect(queryByTestId('file-upload-link-s1')).toBeNull();
    expect(container).toHaveTextContent('x.bin');
    expectNoNavigableLink(container, open);
  });

  it('LinkBlockReaderRenderer renders the label as text', () => {
    spy();
    const { container } = render(
      <LinkBlockReaderRenderer section={section({ links: [{ label: 'Click me', url: bad }] })} viewMode="reader" editable={false} />,
    );
    expect(container).toHaveTextContent('Click me');
    expectNoNavigableLink(container, open);
  });

  it('AgentRunCard renders no link for a link result, live or from metadata', () => {
    spy();
    const { container } = render(
      <AgentRunCard runId="r1" instruction="x" agentName="A" status={{ phase: 'completed', result: { kind: 'link', href: bad, label: 'Open it' } }} />,
    );
    expectNoNavigableLink(container, open);
    expect(agentRunResultFromMetadata({ kind: 'link', href: bad })).toBeNull();
  });

  it('Link drops the href', () => {
    spy();
    const { container } = render(<Link href={bad}>go</Link>);
    expectNoNavigableLink(container, open);
  });

  it('renderCommentText never links a non-path', () => {
    const { container } = render(<>{renderCommentText(`see [x](${bad})`)}</>);
    expect(container.querySelector('a')).toBeNull();
  });
});

describe('legitimate values keep working', () => {
  it('file upload offers a pdf data URL and a blob URL as a download', () => {
    for (const url of ['data:application/pdf;base64,abc', 'blob:https://x.test/id']) {
      const { getByTestId } = render(
        <FileUploadReaderRenderer section={section({ fileName: 'a', fileDataUrl: url })} viewMode="reader" editable={false} />,
      );
      expect(getByTestId('file-upload-link-s1')).toHaveAttribute('href', url);
      cleanup();
    }
  });

  it('link block and agent run link keep https links', () => {
    const { getByText } = render(
      <LinkBlockReaderRenderer section={section({ links: [{ label: 'Docs', url: 'https://x.test/d' }] })} viewMode="reader" editable={false} />,
    );
    expect(getByText('Docs').closest('a')).toHaveAttribute('href', 'https://x.test/d');
    expect(agentRunResultFromMetadata({ kind: 'link', href: '/runs/1' })).toEqual({ kind: 'link', href: '/runs/1' });
  });
});
