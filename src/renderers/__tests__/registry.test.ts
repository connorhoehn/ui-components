// Renderer registry — the (sectionType × viewMode) fallback chain and the
// user-defined-type delegation are the load-bearing logic: get them wrong
// and a section silently renders with the wrong renderer (or none).

import { describe, it, expect } from 'vitest';
import {
  registerRenderer,
  getRenderer,
  registerFieldType,
  getFieldType,
  getFieldTypes,
  listRegisteredRenderers,
} from '../registry';
import type { SectionRenderer } from '../types';

const mk = (name: string) => (() => null) as unknown as SectionRenderer & { rName?: string };

describe('renderer fallback chain', () => {
  it('resolves exact type:mode first, then type:*, then *:mode, then *:*', () => {
    const exact = mk('exact');
    const typeAny = mk('typeAny');
    const anyMode = mk('anyMode');
    const anyAny = mk('anyAny');

    registerRenderer('chain-t', 'editor', exact);
    registerRenderer('chain-t', '*', typeAny);
    registerRenderer('*', 'editor', anyMode);
    registerRenderer('*', '*', anyAny);

    expect(getRenderer('chain-t', 'editor')).toBe(exact);
    // No chain-t:reader → falls to chain-t:*
    expect(getRenderer('chain-t', 'reader')).toBe(typeAny);
    // Unknown type → *:editor
    expect(getRenderer('chain-unknown', 'editor')).toBe(anyMode);
    // Unknown type + mode with no *:mode → *:*
    expect(getRenderer('chain-unknown', 'reader')).toBe(anyAny);
  });

  it('null/undefined sectionType resolves through the wildcard type', () => {
    const anyAny = mk('anyAny2');
    registerRenderer('*', '*', anyAny);
    expect(getRenderer(null, 'reader')).toBe(anyAny);
    expect(getRenderer(undefined, 'reader')).toBe(anyAny);
  });

  it('user-defined field types delegate to their base rendererType', () => {
    const tasksEditor = mk('tasksEditor');
    registerRenderer('deleg-tasks', 'editor', tasksEditor);
    registerFieldType({
      type: 'custom-uuid-1',
      label: 'Sprint tasks',
      icon: '📋',
      description: 'user-defined wrapper',
      rendererKeys: {},
      rendererLabels: {},
      rendererType: 'deleg-tasks',
    });
    expect(getRenderer('custom-uuid-1', 'editor')).toBe(tasksEditor);
  });
});

describe('field type registry', () => {
  it('registers, fetches and lists definitions', () => {
    registerFieldType({
      type: 'ft-x', label: 'X', icon: 'x', description: '',
      rendererKeys: {}, rendererLabels: {},
    });
    expect(getFieldType('ft-x')?.label).toBe('X');
    expect(getFieldTypes().some((d) => d.type === 'ft-x')).toBe(true);
    expect(getFieldType('missing')).toBeUndefined();
  });

  it('listRegisteredRenderers reports the (type, mode) pairs', () => {
    registerRenderer('list-t', 'reader', mk('lr'));
    const all = listRegisteredRenderers();
    expect(all.some((e) => e.sectionType === 'list-t' && e.viewMode === 'reader')).toBe(true);
  });
});
