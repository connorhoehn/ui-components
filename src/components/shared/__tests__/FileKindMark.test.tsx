import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { FileKindMark, FILE_KIND_LABELS, type FileKind } from '../FileKindMark';

afterEach(cleanup);

describe('FileKindMark', () => {
  it('is decorative by default, so the file name beside it is what gets read', () => {
    render(<FileKindMark kind="page" />);
    const mark = screen.getByTestId('file-kind-mark');
    expect(mark).toHaveAttribute('aria-hidden', 'true');
    expect(mark).not.toHaveAttribute('role');
    expect(mark).toHaveAttribute('data-kind', 'page');
  });

  it('names itself when given a label', () => {
    render(<FileKindMark kind="presentation" label="Presentation" />);
    expect(screen.getByRole('img', { name: 'Presentation' })).toBeInTheDocument();
  });

  it('paints each kind from tone tokens, never an inline style', () => {
    const kinds = Object.keys(FILE_KIND_LABELS) as FileKind[];
    for (const kind of kinds) {
      const { unmount } = render(<FileKindMark kind={kind} data-testid={`m-${kind}`} />);
      const mark = screen.getByTestId(`m-${kind}`);
      expect(mark.getAttribute('style')).toBeNull();
      expect(mark.className).toMatch(/bg-\S+/);
      expect(mark.querySelector('svg')).not.toBeNull();
      unmount();
    }
  });

  it('sizes by token', () => {
    render(<FileKindMark kind="recording" size="sm" />);
    expect(screen.getByTestId('file-kind-mark').className).toContain('h-[18px]');
  });
});
