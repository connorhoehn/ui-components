import { describe, expect, it } from 'vitest';
import { matchComposerCommand } from '../RichChatComposer';

const commands = [
  { trigger: '/doc', label: 'Edit the open document with Haiku' },
  { trigger: '/call', label: 'Start a call' },
];

describe('matchComposerCommand', () => {
  it('matches the trigger alone or followed by the instruction, case-insensitively', () => {
    expect(matchComposerCommand('/doc', commands)?.trigger).toBe('/doc');
    expect(matchComposerCommand('/Doc rename it', commands)?.trigger).toBe('/doc');
    expect(matchComposerCommand('  /call now', commands)?.trigger).toBe('/call');
  });
  it('does not match a longer word, a trigger mid-sentence, or an empty draft', () => {
    expect(matchComposerCommand('/document', commands)).toBeNull();
    expect(matchComposerCommand('use /doc please', commands)).toBeNull();
    expect(matchComposerCommand('', commands)).toBeNull();
    expect(matchComposerCommand('/doc x', undefined)).toBeNull();
  });
});
