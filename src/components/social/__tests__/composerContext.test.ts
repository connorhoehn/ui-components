import { describe, expect, it } from 'vitest';
import { COMPOSER_CONTEXT_KINDS, COMPOSER_CONTEXT_REASONS, composerContextPreset, identityDisplayName, type ComposerContext } from '../composerContext';

const ctx = (kind: ComposerContext['kind'], title = 'Roadmap'): ComposerContext => ({ kind, id: 'x1', title } as ComposerContext);

describe('composerContextPreset', () => {
  it('a conversation: Chat + Agent, no chip, no workflows or page actions; send options, reply, offline', () => {
    const p = composerContextPreset({ kind: 'conversation', id: 'dm-1', title: 'Hank', dm: true });
    expect(p.modes).toEqual(['chat', 'agent']);
    expect(p.defaultMode).toBe('chat');
    expect(p.disabledModes).toEqual([]);
    expect(p.chipLabel).toBeNull();
    expect(p.features).toMatchObject({ contextChip: false, workflows: false, pageActions: false, sendOptions: true, reply: true, offline: true, modelUnavailable: false, typedText: false });
    expect(p.modePlaceholders.chat).toBe('Message Hank…');
    expect(composerContextPreset({ kind: 'conversation', id: 'c', title: 'general' }).modePlaceholders.chat).toBe('Message #general…');
  });

  it('a document: three modes, Terminal off until a loop is attached; chip, workflows (/workflow), page actions; no send options', () => {
    const p = composerContextPreset(ctx('document'));
    expect(p.modes).toEqual(['chat', 'agent', 'terminal']);
    expect(p.defaultMode).toBe('agent');
    expect(p.disabledModes).toEqual(['terminal']);
    expect(p.modeUnavailableReasons.terminal).toBe(COMPOSER_CONTEXT_REASONS.terminal);
    expect(p.chipLabel).toBe('Roadmap');
    expect(p.features).toMatchObject({ contextChip: true, workflows: true, workflowCommand: '/workflow', pageActions: true, sendOptions: false, offline: false, modelUnavailable: true, attachments: 'chat-only' });
    expect(composerContextPreset(ctx('document'), { terminal: true }).disabledModes).toEqual([]);
  });

  it('a work item: as a document, chip "This work item"', () => {
    const p = composerContextPreset(ctx('work-item'));
    expect(p.chipLabel).toBe('This work item');
    expect(p.features.pageActions).toBe(true);
    expect(p.features.sendOptions).toBe(false);
  });

  it('a diagram: Agent off with the reason (or the host’s), starts in Chat; no page actions', () => {
    const p = composerContextPreset(ctx('diagram', 'Flow'));
    expect(p.modes).toEqual(['chat', 'agent']);
    expect(p.disabledModes).toEqual(['agent']);
    expect(p.modeUnavailableReasons.agent).toBe(COMPOSER_CONTEXT_REASONS.diagramAgent);
    expect(p.defaultMode).toBe('chat');
    expect(p.chipLabel).toBe('Flow');
    expect(p.features.pageActions).toBe(false);
    expect(composerContextPreset(ctx('diagram'), { agentUnavailableReason: 'Not yet' }).modeUnavailableReasons.agent).toBe('Not yet');
  });

  it('an initiative: Agent, Chat off unless wired; a search: Agent only', () => {
    const i = composerContextPreset(ctx('initiative'));
    expect(i.disabledModes).toEqual(['chat']);
    expect(composerContextPreset(ctx('initiative'), { chat: true }).disabledModes).toEqual([]);
    const s = composerContextPreset(ctx('search'));
    expect(s.modes).toEqual(['agent']);
    expect(s.features.pageActions).toBe(false);
    expect(s.features.sendOptions).toBe(false);
  });

  it('chat: false turns Chat off with a reason anywhere it is offered', () => {
    const p = composerContextPreset(ctx('document'), { chat: false });
    expect(p.disabledModes).toContain('chat');
    expect(p.modeUnavailableReasons.chat).toBe(COMPOSER_CONTEXT_REASONS.noThread);
  });

  it('page actions only on a document or work item; send options only on a conversation', () => {
    for (const kind of COMPOSER_CONTEXT_KINDS) {
      const p = composerContextPreset(ctx(kind));
      expect(p.features.pageActions).toBe(kind === 'document' || kind === 'work-item');
      expect(p.features.sendOptions).toBe(kind === 'conversation');
      expect(p.features.workflows).toBe(kind !== 'conversation');
    }
  });

  it('is pure: the same context gives an equal preset', () => {
    expect(composerContextPreset(ctx('document'))).toEqual(composerContextPreset(ctx('document')));
  });
});

describe('identityDisplayName', () => {
  it('reads displayName first', () => {
    expect(identityDisplayName({ displayName: 'Connor H', given_name: 'Connor', family_name: 'Hoehn' })).toBe('Connor H');
  });
  it('then given_name + family_name', () => {
    expect(identityDisplayName({ displayName: '  ', given_name: 'Hank', family_name: 'Anderson' })).toBe('Hank Anderson');
    expect(identityDisplayName({ given_name: 'Hank' })).toBe('Hank');
  });
  it('then name, then the email local part, else undefined', () => {
    expect(identityDisplayName({ name: 'Eve' })).toBe('Eve');
    expect(identityDisplayName({ email: 'eve@local.dev' })).toBe('eve');
    expect(identityDisplayName({})).toBeUndefined();
    expect(identityDisplayName(null)).toBeUndefined();
  });
});
