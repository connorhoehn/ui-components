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

import { safeHref } from '../../lib/safeHref';
import { useMemo, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** Tags a message may use. Everything else contributes its text only. */
const ALLOWED = new Set([
  'P', 'BR', 'STRONG', 'B', 'EM', 'I', 'S', 'DEL', 'CODE', 'PRE',
  'UL', 'OL', 'LI', 'BLOCKQUOTE', 'A', 'SPAN',
]);

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
      // The only spans that keep a class are the composer's chips — a
      // mention or a `#` document reference — that is how the stylesheet
      // paints them, and each carries the id the sender picked.
      const isMention = el.classList.contains('mention');
      const isDocRef = !isMention && el.classList.contains('docref');
      return (
        <span
          key={key}
          className={isMention ? 'mention' : isDocRef ? 'docref' : undefined}
          data-mention-id={isMention ? el.getAttribute('data-id') ?? undefined : undefined}
          data-document-id={isDocRef ? el.getAttribute('data-id') ?? undefined : undefined}
        >
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

/**
 * Backtick code, for messages that are PLAIN TEXT.
 *
 * The rich composer emits real `<pre>`/`<code>` markup, which the allow-list
 * above already renders. But not every chat has a rich composer — the in-call
 * chat is a bare input — and someone pasting a stack trace into it got their
 * backticks rendered as backticks. Code is the one thing people paste into a
 * call chat, so it has to work in the SIMPLE composer too.
 *
 * Deliberately just the two code forms, not a markdown engine: ```fences```
 * and `inline`. Everything else stays literal, because a chat that silently
 * eats asterisks and underscores in ordinary prose is worse than one that
 * renders none of it.
 */
const FENCE_OR_INLINE = /```([\s\S]*?)```|`([^`\n]+)`/g;

export function renderBackticks(text: string): ReactNode {
  if (!text || text.indexOf('`') === -1) return text;

  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  FENCE_OR_INLINE.lastIndex = 0;

  while ((m = FENCE_OR_INLINE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const fenced = m[1];
    if (fenced !== undefined) {
      // A fence usually opens with a language tag and a newline; neither is
      // content. Only the FIRST line is eligible, and only when it looks like
      // a bare word — "```const x = 1```" on one line must not lose "const".
      let body = fenced.replace(/^\r?\n/, '');
      const firstBreak = body.indexOf('\n');
      if (firstBreak > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(body.slice(0, firstBreak).trim())) {
        body = body.slice(firstBreak + 1);
      }
      out.push(
        <pre key={`f${m.index}`} className="message-code-block">
          <code>{body.replace(/\n$/, '')}</code>
        </pre>,
      );
    } else {
      out.push(<code key={`i${m.index}`} className="message-code-inline">{m[2]}</code>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  // An unmatched backtick produces one chunk that is the whole string; hand
  // back the string itself so nothing changes for ordinary prose.
  return out.length === 1 && typeof out[0] === 'string' ? out[0] : out;
}

export function MessageBody({ html, text, className, 'data-testid': testId = 'message-body' }: MessageBodyProps) {
  const rendered = useMemo(() => {
    if (!html) return null;
    // A detached document: parsing here never runs scripts and never touches
    // the live DOM, even for markup that would be hostile in it.
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return Array.from(doc.body.childNodes).map((n, i) => toReact(n, `n${i}`));
  }, [html]);

  const plain = useMemo(() => renderBackticks(text ?? ''), [text]);

  return (
    <div data-testid={testId} className={cn('message-body', className)}>
      {rendered ?? plain}
    </div>
  );
}

export default MessageBody;
