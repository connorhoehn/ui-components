// One byte-count formatter for the whole library. Lived in
// `social/ChatAttachment` until a document attachment needed it too, and the
// `./diagram` entry should not pull the chat surface to print "1.2 MB".
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
