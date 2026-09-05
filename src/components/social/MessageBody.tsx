// MessageBody — renders a message's rich text, safely.
//
// ## Why this exists
//
// The composer produces HTML (bold, lists, links, mention chips) and the panel
// rendered `message.content` as plain text, so a link the sender created
// arrived as the words they typed with the href thrown away. Rendering the
// HTML is the other half of having a rich composer.
//
// ## Why a bespoke sanitizer rather than dangerouslySetInnerHTML
//
// Message bodies are attacker-controlled: anyone in the channel can send one.
// Passing that to innerHTML is a stored-XSS hole in a product whose entire job
// is showing other people's text. There is no DOMPurify in this dependency
// tree and adding one offline is not possible, so this parses to a DOM in a
// detached document and rebuilds a React tree from an ALLOW-LIST — unknown
// elements degrade to their text, and every attribute is dropped unless named.
//
// An allow-list, not a block-list: the set of dangerous things is open-ended
// (`onerror`, `javascript:`, `<svg><script>`, data: URLs, `<iframe>`), and a
// block-list is a promise to have thought of all of them.

import { useMemo, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** Tags a message may use. Everything else contributes its text only. */
const ALLOWED = new Set([
  'P', 'BR', 'STRONG', 'B', 'EM', 'I', 'S', 'DEL', 'CODE', 'PRE',
  'UL', 'OL', 'LI', 'BLOCKQUOTE', 'A', 'SPAN',
]);

/**
 * Schemes a link may use.
 *
 * `javascript:` is the obvious exclusion; `data:` is the less obvious one —
 * `data:text/html` in an anchor executes in the page's origin on click.
 */
const SAFE_SCHEME = /^(https?:|mailto:)/i;

function safeHref(raw: string | null): string | null {
  if (!raw) return null;
  const v = raw.trim();
  // Relative links stay in-app and cannot carry a scheme.
  if (v.startsWith('/') || v.startsWith('#')) return v;
  return SAFE_SCHEME.test(v) ? v : null;
}

function toReact(node: Node, key: string): ReactNode {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const el = node as Element;
  const children = Array.from(el.childNodes).map((c, i) => toReact(c, `${key}-${i}`));

  // Not on the list: keep what it SAID, drop what it was. Silently dropping
  // the text would let a sender hide content inside an unknown tag.
  if (!ALLOWED.has(el.tagName)) return <span key={key}>{children}</span>;

  switch (el.tagName) {
    case 'BR':
      return <br key={key} />;
    case 'A': {
      const href = safeHref(el.getAttribute('href'));
      // A refused scheme renders as text, so the reader still sees what was
      // sent rather than a link that silently does nothing.
      if (!href) return <span key={key}>{children}</span>;
      return (
        <a
          key={key}
          href={href}
          target="_blank"
          // noopener: window.opener would otherwise let the target navigate
          // this tab. noreferrer keeps the internal URL out of their logs.
          rel="noopener noreferrer nofollow"
          className="text-primary-fg underline underline-offset-2"
        >
          {children}
        </a>
      );
    }
    case 'SPAN': {
      // The only span that keeps a class is a mention chip — that is how the
      // stylesheet paints it, and it carries the id the sender picked.
      const isMention = el.classList.contains('mention');
      return (
        <span key={key} className={isMention ? 'mention' : undefined} data-mention-id={isMention ? el.getAttribute('data-id') ?? undefined : undefined}>
          {children}
        </span>
      );
    }
    default: {
      const Tag = el.tagName.toLowerCase() as 'p';
      return <Tag key={key}>{children}</Tag>;
    }
  }
}

export interface MessageBodyProps {
  /** Rich body from the composer. When absent, `text` is rendered plainly. */
  html?: string;
  /** Plain-text fallback — also what a client that cannot render HTML shows. */
  text: string;
  className?: string;
  'data-testid'?: string;
}

export function MessageBody({ html, text, className, 'data-testid': testId = 'message-body' }: MessageBodyProps) {
  const rendered = useMemo(() => {
    if (!html) return null;
    // A detached document: parsing here never runs scripts and never touches
    // the live DOM, even for markup that would be hostile in it.
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return Array.from(doc.body.childNodes).map((n, i) => toReact(n, `n${i}`));
  }, [html]);

  return (
    <div data-testid={testId} className={cn('message-body', className)}>
      {rendered ?? text}
    </div>
  );
}

export default MessageBody;
