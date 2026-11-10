import { describe, it, expect } from 'vitest';
import { safeHref, safeDownloadHref } from './safeHref';

describe('safeHref', () => {
  it.each(['https://x.test/a', 'http://x.test', 'mailto:a@b.test', '/path', '#anchor', 'foo/bar', '../up', '?tab=x', 'page.html', 'tel:+15551234', 'sms:+15551234', 'TEL:+1555', 'SMS:1', 'HTTPS://X.TEST', 'MailTo:a@b.test', './rel', '#', '&#106;avascript:x', '&colon;x', 'a&#x3a;b', '/a?b=c#d', '/a\u00e9'])('accepts %s', (u) => {
    expect(safeHref(u)).toBe(u);
  });
  it.each([
    'javascript:alert(1)', 'JAVASCRIPT:alert(1)', 'data:text/html,<script>1</script>',
    'vbscript:x', '//evil.test', '/\\evil.test', 'java\tscript:alert(1)', 'x:y', '', null,
    ' javascript:alert(1)', 'javascript:alert(1) ', '\tjavascript:alert(1)', 'JaVaScRiPt:alert(1)', 'jav\nascript:alert(1)',
    'java\rscript:x', 'java\0script:x', 'javascript\t:x', '/\t/evil.example', '/\n/evil.example', '/\r/evil.example',
    '/\0/evil.example', '/\x7f/evil', '/\\evil.example', '/a\\b', '//evil', '\\\\evil', '\\evil', 'a\\b',
    'javascript://%0aalert(1)', 'javascript://x.test/%0aalert(1)', 'data:text/html;base64,AAAA', 'DATA:text/html,x',
    'data:;base64,AAAA', 'data:image/svg+xml,x', 'ftp://x.test', 'file:///etc/passwd', 'blob:https://x.test/u',
    '  //evil', '\t//evil', '\u0001/x', 'x\u007f',
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
    'data:image/svg+xml;base64,AAAA', 'DATA:IMAGE/SVG+XML;base64,AAAA', 'data:text/xml,x', 'data:application/xml,x',
    'data:text/html;charset=utf-8;base64,AAAA', 'DATA:Text/Html;base64,AAAA', '  data:text/html;base64,AAAA',
    'data:;base64,AAAA', 'data:,x', 'data: text/html,x', 'data:\ttext/html,x', 'data:text/html', 'data:image/png\n;base64,AAAA',
    '/\t/evil.example', '//evil', '/\\evil', 'blob:\t//x', 'java\tscript:x',
  ])('rejects %s', (u) => {
    expect(safeDownloadHref(u as string | null)).toBeNull();
  });
});
