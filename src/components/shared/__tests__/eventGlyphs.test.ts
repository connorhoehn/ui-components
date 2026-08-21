import { describe, it, expect } from 'vitest';
import {
  eventGlyphs,
  getEventGlyph,
  getEventCategory,
} from '../eventGlyphs';

describe('eventGlyphs map', () => {
  it('contains the canonical pipeline lifecycle entries used by EventRow / LogRow', () => {
    expect(eventGlyphs['pipeline.run.started'].severity).toBe('info');
    expect(eventGlyphs['pipeline.run.completed'].severity).toBe('success');
    expect(eventGlyphs['pipeline.run.failed'].severity).toBe('error');
    expect(eventGlyphs['pipeline.run.cancelled'].severity).toBe('neutral');
  });

  it('contains the canonical pipeline step entries used by replay Scrubber', () => {
    expect(eventGlyphs['pipeline.step.completed'].severity).toBe('success');
    expect(eventGlyphs['pipeline.step.failed'].severity).toBe('error');
  });

  it('contains the canonical doc + social entries used by ActivityFeed', () => {
    expect(eventGlyphs['doc.comment']).toBeDefined();
    expect(eventGlyphs['doc.review_approved'].severity).toBe('success');
    expect(eventGlyphs['social.like'].severity).toBe('success');
    expect(eventGlyphs['social.post.created']).toBeDefined();
  });
});

describe('getEventGlyph', () => {
  it('returns the mapped glyph for a known event type', () => {
    const g = getEventGlyph('pipeline.run.failed');
    expect(g.icon).toBe('✕');
    expect(g.severity).toBe('error');
  });

  it('returns a neutral fallback bullet for an unknown event type', () => {
    const g = getEventGlyph('unknown.event.type');
    expect(g.icon).toBe('•');
    expect(g.severity).toBe('neutral');
    expect(g.color).toBe('var(--color-text-tertiary)');
  });

  it('returns the same fallback shape for an empty type string', () => {
    const g = getEventGlyph('');
    expect(g.icon).toBe('•');
    expect(g.severity).toBe('neutral');
  });
});

describe('getEventCategory', () => {
  it('routes pipeline.run.* and pipeline.join.* to lifecycle', () => {
    expect(getEventCategory('pipeline.run.started')).toBe('lifecycle');
    expect(getEventCategory('pipeline.run.failed')).toBe('lifecycle');
    expect(getEventCategory('pipeline.join.waiting')).toBe('lifecycle');
  });

  it('routes pipeline.step.* to step', () => {
    expect(getEventCategory('pipeline.step.started')).toBe('step');
    expect(getEventCategory('pipeline.step.failed')).toBe('step');
  });

  it('routes pipeline.llm.* to llm', () => {
    expect(getEventCategory('pipeline.llm.prompt')).toBe('llm');
    expect(getEventCategory('pipeline.llm.token')).toBe('llm');
  });

  it('routes pipeline.approval.* to approval', () => {
    expect(getEventCategory('pipeline.approval.requested')).toBe('approval');
    expect(getEventCategory('pipeline.approval.recorded')).toBe('approval');
  });

  it('routes doc.* to activity', () => {
    expect(getEventCategory('doc.add_item')).toBe('activity');
    expect(getEventCategory('doc.comment')).toBe('activity');
    expect(getEventCategory('doc.review_approved')).toBe('activity');
  });

  it('routes social.* to social', () => {
    expect(getEventCategory('social.follow')).toBe('social');
    expect(getEventCategory('social.like')).toBe('social');
    expect(getEventCategory('social.post.created')).toBe('social');
  });

  it('falls back to other for unrecognized prefixes', () => {
    expect(getEventCategory('unknown.thing')).toBe('other');
    expect(getEventCategory('')).toBe('other');
    expect(getEventCategory('pipeline.unknown')).toBe('other');
  });
});
