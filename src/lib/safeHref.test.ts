import { describe, it, expect } from 'vitest';
import { safeHref, safeDownloadHref } from './safeHref';

describe('safeHref', () => {
  it.each(['https://x.test/a', 'http://x.test', 'mailto:a@b.test', '/path', '#anchor', 'foo/bar', '../up', '?tab=x', 'page.html'])('accepts %s', (u) => {
    expect(safeHref(u)).toBe(u);
  });
  it.each([
    'javascript:alert(1)', 'JAVASCRIPT:alert(1)', 'data:text/html,<script>1</script>',
    'vbscript:x', '//evil.test', '/\\evil.test', 'java\tscript:alert(1)', 'x:y', '', null,
  ])('rejects %s', (u) => {
    expect(safeHref(u as string | null)).toBeNull();
  });
});

describe('safeDownloadHref', () => {
  it.each(['blob:https://x.test/uuid', 'data:image/png;base64,AAAA', 'data:application/pdf;base64,AAAA', 'https://x.test/f.zip', '/files/a'])('accepts %s', (u) => {
    expect(safeDownloadHref(u)).toBe(u);
  });
  it.each([
    'javascript:alert(1)', 'vbscript:x', 'data:text/html,<script>1</script>', 'data:text/html;base64,AAAA',
    'data:image/svg+xml,<svg onload=1>', 'data:application/xhtml+xml,x', '', null, undefined,
  ])('rejects %s', (u) => {
    expect(safeDownloadHref(u as string | null)).toBeNull();
  });
});
