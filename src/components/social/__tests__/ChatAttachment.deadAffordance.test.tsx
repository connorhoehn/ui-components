// An attachment nobody can open is not a control.
//
// The frame was a button either way, with `onClick` merely undefined when no
// handler was given — so it announced "Download report.pdf, button", took a
// tab stop, and did nothing when pressed. Every attachment in this product was
// in that state, because no host passes `onOpen`.
//
// Same rule MessageActionBar states for Forward and Pin: a control the product
// will not honour is not rendered disabled, it is not rendered.
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AttachmentBubble } from '../ChatAttachment';

afterEach(cleanup);

const file = { id: 'a1', name: 'report.pdf', size: 2048, contentType: 'application/pdf', url: '/api/uploads/a1' };
const image = { id: 'a2', name: 'shot.png', size: 4096, contentType: 'image/png', url: '/api/uploads/a2' };

describe('AttachmentBubble — when it cannot be opened', () => {
  it('offers no button for a file', () => {
    render(<AttachmentBubble attachment={file} />);
    expect(screen.queryByRole('button')).toBeNull();
    // The file is still identified — it is the ACTION that is absent.
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
  });

  it('offers no button for an image, and still shows the picture', () => {
    render(<AttachmentBubble attachment={image} src="blob:x" />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByTestId('attachment-bubble-image')).toBeInTheDocument();
  });

  it('promises nothing in its accessible names', () => {
    render(<AttachmentBubble attachment={file} />);
    expect(screen.queryByLabelText(/^Download/)).toBeNull();
  });
});

describe('AttachmentBubble — when it can', () => {
  it('is a real control for a file', () => {
    const onOpen = vi.fn();
    render(<AttachmentBubble attachment={file} onOpen={onOpen} />);
    fireEvent.click(screen.getByRole('button', { name: 'Download report.pdf' }));
    expect(onOpen).toHaveBeenCalledWith(file);
  });

  it('is a real control for an image', () => {
    const onOpen = vi.fn();
    render(<AttachmentBubble attachment={image} src="blob:x" onOpen={onOpen} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open image shot.png' }));
    expect(onOpen).toHaveBeenCalledWith(image);
  });
});
