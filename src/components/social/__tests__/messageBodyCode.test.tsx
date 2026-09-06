import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MessageBody } from '../MessageBody';

afterEach(cleanup);

// Backticks in PLAIN-TEXT messages. The rich composer emits real <pre>/<code>,
// but not every chat has one — the in-call chat is a bare input, and code is
// exactly what people paste into a call.

const body = (text: string) => render(<MessageBody text={text} />);

describe('MessageBody — backtick code', () => {
  it('renders a fenced block', () => {
    const { container } = body('before\n```\nconst x = 1;\n```\nafter');
    const pre = container.querySelector('pre');
    expect(pre).toBeTruthy();
    expect(pre!.textContent).toBe('const x = 1;');
    expect(container.textContent).toContain('before');
    expect(container.textContent).toContain('after');
  });

  it('renders inline code', () => {
    const { container } = body('run `npm test` first');
    const code = container.querySelector('code');
    expect(code?.textContent).toBe('npm test');
    expect(container.querySelector('pre')).toBeNull();
  });

  // A language tag is not content.
  it('drops a leading language tag', () => {
    const { container } = body('```ts\nconst x: number = 1;\n```');
    expect(container.querySelector('pre')!.textContent).toBe('const x: number = 1;');
  });

  // ...but only when it really is a bare tag on its own line.
  it('keeps the first line when it is code, not a language', () => {
    const { container } = body('```\nconst x = 1;\nconst y = 2;\n```');
    expect(container.querySelector('pre')!.textContent).toBe('const x = 1;\nconst y = 2;');
  });

  it('keeps a one-line fence intact', () => {
    const { container } = body('```const x = 1```');
    expect(container.querySelector('pre')!.textContent).toBe('const x = 1');
  });

  it('handles several spans in one message', () => {
    const { container } = body('`a` and `b`');
    expect([...container.querySelectorAll('code')].map((c) => c.textContent)).toEqual(['a', 'b']);
  });

  // Ordinary prose must be untouched — including a lone stray backtick.
  it('leaves text without code alone', () => {
    body("it's fine");
    expect(screen.getByTestId('message-body').textContent).toBe("it's fine");
  });

  it('leaves an unmatched backtick literal', () => {
    const { container } = body('a ` b');
    expect(container.textContent).toBe('a ` b');
    expect(container.querySelector('code')).toBeNull();
  });

  it('does not turn other markdown into markup', () => {
    const { container } = body('*not bold* _not italic_');
    expect(container.textContent).toBe('*not bold* _not italic_');
    expect(container.querySelector('em')).toBeNull();
  });

  // Code is text, not markup: a message is still attacker-controlled.
  it('does not execute markup inside a fence', () => {
    const { container } = body('```\n<img src=x onerror=alert(1)>\n```');
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('pre')!.textContent).toContain('<img src=x');
  });

  // Rich HTML still wins — the composer's own <pre> already round-trips.
  it('leaves a rich-HTML message to the sanitizer', () => {
    const { container } = render(<MessageBody html="<p>hi <code>x</code></p>" text="hi `x`" />);
    expect(container.querySelectorAll('code')).toHaveLength(1);
  });
});
