import { describe, expect, it } from 'vitest';
import { contextLabelTail } from '../RichChatComposer';

describe('contextLabelTail', () => {
  it('keeps a short scope whole after its separator', () => {
    expect(contextLabelTail('Second Look · catalog')).toBe(' · catalog');
    expect(contextLabelTail('Second Look · Audio')).toBe(' · Audio');
  });
  it('falls back to the last 12 characters without a short scope, and does not split short labels', () => {
    expect(contextLabelTail('A very long reference title without separators')).toBe('t separators');
    expect(contextLabelTail('Short label')).toBe('');
  });
});
