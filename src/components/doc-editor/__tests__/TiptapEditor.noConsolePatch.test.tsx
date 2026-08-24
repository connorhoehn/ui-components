// Regression: this module used to reassign the global `console.warn` at
// IMPORT time — permanently, never restoring it — so any app that merely
// imported the doc-editor barrel had its console wrapped by us. A library
// must not do that to its host.
//
// The patch was also unnecessary: StarterKit is configured with
// `history: false`, which is the documented fix for the Tiptap
// "extension-collaboration" warning it was suppressing.

import { describe, it, expect } from 'vitest';

describe('TiptapEditor console hygiene', () => {
  it('importing the module does not replace the global console.warn', async () => {
    const before = console.warn;
    await import('../TiptapEditor');
    expect(console.warn).toBe(before);
  });

  it('importing the doc-editor barrel does not replace it either', async () => {
    const before = console.warn;
    await import('../index');
    expect(console.warn).toBe(before);
  });
});
