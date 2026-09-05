import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LinkDialog, normalizeHref } from '../LinkDialog';

// The link button first delegated to an `onRequestLink` callback, so every host
// that did not pass one got a button that silently did nothing. A control the
// library RENDERS is one the library must be able to complete — hence a real
// dialog, and hence these tests.

afterEach(cleanup);

function setup(props = {}) {
  const onSubmit = vi.fn();
  const onClose = vi.fn();
  const onRemove = vi.fn();
  render(<LinkDialog open onSubmit={onSubmit} onClose={onClose} onRemove={onRemove} {...props} />);
  return { onSubmit, onClose, onRemove };
}

const href = () => screen.getByTestId('link-dialog-href');
const text = () => screen.getByTestId('link-dialog-text');

describe('LinkDialog', () => {
  it('prefills the label from the selection, which is the point of the dialog', () => {
    setup({ initialText: 'the RFC' });
    expect(text()).toHaveValue('the RFC');
  });

  it('submits the url and the display text separately', () => {
    const { onSubmit } = setup({ initialText: 'the RFC' });
    fireEvent.change(href(), { target: { value: 'https://example.com/rfc' } });
    fireEvent.click(screen.getByTestId('link-dialog-submit'));
    expect(onSubmit).toHaveBeenCalledWith({ href: 'https://example.com/rfc', text: 'the RFC' });
  });

  it('applies on Enter from either field', () => {
    const { onSubmit } = setup();
    fireEvent.change(href(), { target: { value: 'example.com' } });
    fireEvent.keyDown(href(), { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalled();
  });

  it('refuses to submit an empty address', () => {
    const { onSubmit } = setup();
    expect(screen.getByTestId('link-dialog-submit')).toBeDisabled();
    fireEvent.click(screen.getByTestId('link-dialog-submit'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('offers Remove only when editing an existing link', () => {
    setup({ initialHref: 'https://example.com' });
    expect(screen.getByTestId('link-dialog-remove')).toBeInTheDocument();
    cleanup();
    setup();
    expect(screen.queryByTestId('link-dialog-remove')).toBeNull();
  });

  it('names itself Edit when a link is already there', () => {
    setup({ initialHref: 'https://example.com' });
    expect(screen.getByTestId('link-dialog-submit')).toHaveTextContent('Update');
  });
});

describe('normalizeHref', () => {
  // `example.com` is a URL to everyone except a URL parser.
  it('adds https to a bare host', () => {
    expect(normalizeHref('example.com')).toBe('https://example.com');
    expect(normalizeHref('  example.com/a?b=1 ')).toBe('https://example.com/a?b=1');
  });

  // A naive prefix would corrupt every one of these.
  it('leaves anything with a scheme alone', () => {
    expect(normalizeHref('https://x.dev')).toBe('https://x.dev');
    expect(normalizeHref('http://x.dev')).toBe('http://x.dev');
    expect(normalizeHref('mailto:a@b.dev')).toBe('mailto:a@b.dev');
  });

  it('leaves in-app paths and anchors alone', () => {
    expect(normalizeHref('/docs/rfc')).toBe('/docs/rfc');
    expect(normalizeHref('#section')).toBe('#section');
  });

  it('treats blank as no link', () => {
    expect(normalizeHref('   ')).toBe('');
  });
});
