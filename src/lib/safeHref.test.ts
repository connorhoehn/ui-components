import { describe, it, expect } from 'vitest';
import { safeHref } from './safeHref';

describe('safeHref', () => {
  it.each(['https://x.test/a', 'http://x.test', 'mailto:a@b.test', '/path', '#anchor'])('accepts %s', (u) => {
    expect(safeHref(u)).toBe(u);
  });
  it.each([
    'javascript:alert(1)', 'JAVASCRIPT:alert(1)', 'data:text/html,<script>1</script>',
    'vbscript:x', '//evil.test', '/\\evil.test', 'foo/bar', '', null,
  ])('rejects %s', (u) => {
    expect(safeHref(u as string | null)).toBeNull();
  });
});
