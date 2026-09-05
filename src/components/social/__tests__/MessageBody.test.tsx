import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MessageBody } from '../MessageBody';

// Message bodies are attacker-controlled — anyone in the channel can send one.
// These tests are the reason this component parses into a detached document and
// rebuilds from an ALLOW-LIST instead of using dangerouslySetInnerHTML.

afterEach(cleanup);

describe('MessageBody — rendering', () => {
  it('renders plain text when there is no rich body', () => {
    render(<MessageBody text="just words" />);
    expect(screen.getByTestId('message-body')).toHaveTextContent('just words');
  });

  it('renders a link the sender created', () => {
    render(<MessageBody html='<p>see <a href="https://example.com/rfc">the RFC</a></p>' text="see the RFC" />);
    const a = screen.getByRole('link', { name: 'the RFC' });
    expect(a).toHaveAttribute('href', 'https://example.com/rfc');
  });

  it('keeps formatting and lists', () => {
    render(<MessageBody html="<p><strong>ship</strong> it</p><ul><li>one</li><li>two</li></ul>" text="ship it one two" />);
    expect(screen.getByText('ship').tagName).toBe('STRONG');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('keeps a mention chip so it stays styled and identifiable', () => {
    const { container } = render(
      <MessageBody html='<p><span class="mention" data-id="dev-nora">@Nora</span></p>' text="@Nora" />,
    );
    const chip = container.querySelector('.mention');
    expect(chip).not.toBeNull();
    expect(chip).toHaveAttribute('data-mention-id', 'dev-nora');
  });
});

describe('MessageBody — hostile input', () => {
  it('drops a script tag but keeps nothing executable', () => {
    const { container } = render(
      <MessageBody html='<p>hi</p><script>window.__pwned = 1</script>' text="hi" />,
    );
    expect(container.querySelector('script')).toBeNull();
    expect((window as unknown as { __pwned?: number }).__pwned).toBeUndefined();
  });

  it('refuses a javascript: href and renders it as text instead', () => {
    render(<MessageBody html={'<a href="javascript:alert(1)">click</a>'} text="click" />);
    // Still readable — the reader sees what was sent — but not a link.
    expect(screen.getByText('click')).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeNull();
  });

  // data:text/html in an anchor executes in this origin on click.
  it('refuses a data: href', () => {
    render(<MessageBody html={'<a href="data:text/html,<h1>x">click</a>'} text="click" />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('strips event handlers from allowed tags', () => {
    const { container } = render(
      <MessageBody html={'<p onmouseover="window.__pwned=1">hover</p>'} text="hover" />,
    );
    expect(container.querySelector('p')?.getAttribute('onmouseover')).toBeNull();
  });

  it('drops an iframe but keeps surrounding text', () => {
    const { container } = render(
      <MessageBody html={'<p>before</p><iframe src="https://evil.test"></iframe><p>after</p>'} text="before after" />,
    );
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.getByTestId('message-body')).toHaveTextContent('before');
    expect(screen.getByTestId('message-body')).toHaveTextContent('after');
  });

  // Dropping the text as well would let a sender hide content inside a tag
  // nobody renders.
  it('keeps the text of an unknown element', () => {
    render(<MessageBody html={'<marquee>still readable</marquee>'} text="still readable" />);
    expect(screen.getByTestId('message-body')).toHaveTextContent('still readable');
  });

  it('keeps relative links, which cannot carry a scheme', () => {
    render(<MessageBody html={'<a href="/docs/rfc">docs</a>'} text="docs" />);
    expect(screen.getByRole('link', { name: 'docs' })).toHaveAttribute('href', '/docs/rfc');
  });

  it('marks external links noopener, so the target cannot navigate this tab', () => {
    render(<MessageBody html={'<a href="https://x.dev">x</a>'} text="x" />);
    expect(screen.getByRole('link')).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
