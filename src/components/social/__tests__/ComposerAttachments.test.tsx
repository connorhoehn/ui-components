import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ComposerAttachments, formatBytes } from '../ComposerAttachments';

// Files STAGE in the composer instead of firing on drop. Dropping used to hand
// the file straight to the host, so it left the composer before you could see
// what you had attached, add a second one, or write the sentence explaining it.

afterEach(cleanup);

const img = new File([new Uint8Array(2048)], 'screenshot.png', { type: 'image/png' });
const pdf = new File([new Uint8Array(5_500_000)], 'contract.pdf', { type: 'application/pdf' });

describe('ComposerAttachments', () => {
  it('renders nothing when nothing is staged', () => {
    const { container } = render(<ComposerAttachments files={[]} onRemove={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('shows every staged file with its name and size', () => {
    render(
      <ComposerAttachments
        files={[{ id: 'a', file: img }, { id: 'b', file: pdf }]}
        onRemove={vi.fn()}
      />,
    );
    expect(screen.getAllByTestId('composer-attachment')).toHaveLength(2);
    expect(screen.getByText('screenshot.png')).toBeInTheDocument();
    expect(screen.getByText('2 KB')).toBeInTheDocument();
  });

  it('previews an image and falls back to an icon for anything else', () => {
    render(
      <ComposerAttachments
        files={[{ id: 'a', file: img }, { id: 'b', file: pdf }]}
        onRemove={vi.fn()}
      />,
    );
    // One thumbnail, for the image only.
    expect(screen.getAllByTestId('composer-attachment-thumb')).toHaveLength(1);
  });

  // A row of identical "Remove attachment" buttons is unusable by screen reader
  // once you have four staged.
  it('names each remove button after its file', () => {
    render(<ComposerAttachments files={[{ id: 'a', file: img }]} onRemove={vi.fn()} />);
    expect(screen.getByLabelText('Remove screenshot.png')).toBeInTheDocument();
  });

  it('removes by id, so duplicate filenames stay distinguishable', () => {
    const onRemove = vi.fn();
    const twin = new File([new Uint8Array(10)], 'screenshot.png', { type: 'image/png' });
    render(
      <ComposerAttachments
        files={[{ id: 'first', file: img }, { id: 'second', file: twin }]}
        onRemove={onRemove}
      />,
    );
    fireEvent.click(screen.getAllByLabelText('Remove screenshot.png')[1]);
    expect(onRemove).toHaveBeenCalledWith('second');
  });
});

describe('formatBytes', () => {
  it('reads as a person would say it', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(2048)).toBe('2 KB');
    expect(formatBytes(5_500_000)).toBe('5.2 MB');
  });
});
