// validation/__tests__/validatePipeline.test.ts
//
// `validatePipeline` decides `canPublish`, and the editor gates both Publish
// and Run on it. A false error blocks a correct pipeline; a missed error ships
// a broken one. These tests pin the verdicts, not the message strings.

import { describe, it, expect } from 'vitest';
import type {
  NodeData,
  NodeType,
  PipelineDefinition,
  PipelineEdge,
  PipelineNode,
} from '../../../../types/pipeline';
import { validatePipeline } from '../validatePipeline';
import { detectCycles } from '../detectCycles';
import { isValidHandleConnection } from '../handleCompatibility';

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------

const VALID_LLM: NodeData = {
  type: 'llm',
  provider: 'bedrock',
  model: 'claude-sonnet-4-6',
  systemPrompt: 'sys',
  userPromptTemplate: 'user',
  maxTokens: 1024,
  temperature: 0.3,
  streaming: false,
};

function n(id: string, type: NodeType, data?: Partial<NodeData>): PipelineNode {
  const base: Record<string, unknown> =
    type === 'llm'
      ? { ...VALID_LLM }
      : type === 'trigger'
        ? { type: 'trigger', triggerType: 'manual' }
        : type === 'transform'
          ? { type: 'transform', transformType: 'jsonpath', expression: '$.a' }
          : type === 'condition'
            ? { type: 'condition', expression: 'true' }
            : type === 'action'
              ? { type: 'action', actionType: 'notify', config: {} }
              : type === 'fork'
                ? { type: 'fork', branchCount: 2 }
                : type === 'join'
                  ? { type: 'join', mode: 'all', mergeStrategy: 'deep-merge' }
                  : type === 'approval'
                    ? {
                        type: 'approval',
                        approvers: [{ type: 'user', value: 'a' }],
                        requiredCount: 1,
                        timeoutMs: 1000,
                      }
                    : { type };
  return {
    id,
    type,
    position: { x: 0, y: 0 },
    data: { ...base, ...(data ?? {}) } as NodeData,
  };
}

function e(id: string, source: string, sourceHandle: string, target: string, targetHandle = 'in'): PipelineEdge {
  return { id, source, sourceHandle, target, targetHandle };
}

function def(nodes: PipelineNode[], edges: PipelineEdge[], over: Partial<PipelineDefinition> = {}): PipelineDefinition {
  return {
    id: 'p1',
    name: 'P',
    version: 1,
    status: 'draft',
    nodes,
    edges,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdBy: 't',
    ...over,
  } as PipelineDefinition;
}

const codes = (issues: { code: string }[]) => issues.map((i) => i.code);

/** trigger → llm, the smallest error-free graph. */
function minimalValid() {
  return def(
    [n('t', 'trigger'), n('l', 'llm'), n('sink', 'transform', { terminal: true } as Partial<NodeData>)],
    [e('e1', 't', 'out', 'l'), e('e2', 'l', 'out', 'sink'), e('e3', 'l', 'error', 'sink')],
  );
}

describe('validatePipeline — publish-blocking errors', () => {
  it('a minimal wired pipeline publishes clean', () => {
    const result = validatePipeline(minimalValid());
    expect(result.errors).toEqual([]);
    expect(result.canPublish).toBe(true);
    expect(result.isValid).toBe(true);
  });

  it('errors and warnings never disagree with isValid / canPublish', () => {
    const result = validatePipeline(def([], []));
    expect(result.isValid).toBe(false);
    expect(result.canPublish).toBe(false);
    expect(result.errors.every((i) => i.severity === 'error')).toBe(true);
    expect(result.warnings.every((i) => i.severity === 'warning')).toBe(true);
  });

  describe('trigger cardinality', () => {
    it('flags a pipeline with no trigger', () => {
      expect(codes(validatePipeline(def([n('l', 'llm')], [])).errors)).toContain('NO_TRIGGER');
    });

    it('flags every trigger when there is more than one', () => {
      const result = validatePipeline(def([n('t1', 'trigger'), n('t2', 'trigger')], []));
      const multi = result.errors.filter((i) => i.code === 'MULTIPLE_TRIGGERS');
      expect(multi).toHaveLength(2);
      expect(multi.map((i) => i.nodeId).sort()).toEqual(['t1', 't2']);
    });

    it('does not also emit NO_TRIGGER when there are several', () => {
      const result = validatePipeline(def([n('t1', 'trigger'), n('t2', 'trigger')], []));
      expect(codes(result.errors)).not.toContain('NO_TRIGGER');
    });
  });

  describe('cycles', () => {
    it('blocks a two-node cycle and names an edge on it', () => {
      const d = def(
        [n('t', 'trigger'), n('a', 'llm'), n('b', 'transform')],
        [e('e1', 't', 'out', 'a'), e('e2', 'a', 'out', 'b'), e('e3', 'b', 'out', 'a')],
      );
      const cycle = validatePipeline(d).errors.find((i) => i.code === 'CYCLE_DETECTED');
      expect(cycle).toBeDefined();
      expect(['e2', 'e3']).toContain(cycle!.edgeId);
    });

    it('blocks a self-loop', () => {
      const d = def([n('t', 'trigger'), n('a', 'transform')], [e('e1', 't', 'out', 'a'), e('e2', 'a', 'out', 'a')]);
      expect(codes(validatePipeline(d).errors)).toContain('CYCLE_DETECTED');
    });

    it('accepts a diamond — a shared descendant is not a cycle', () => {
      const d = def(
        [n('t', 'trigger'), n('f', 'fork'), n('a', 'transform'), n('b', 'transform'), n('j', 'join')],
        [
          e('e1', 't', 'out', 'f'),
          e('e2', 'f', 'branch-0', 'a'),
          e('e3', 'f', 'branch-1', 'b'),
          e('e4', 'a', 'out', 'j', 'in-0'),
          e('e5', 'b', 'out', 'j', 'in-1'),
        ],
      );
      expect(codes(validatePipeline(d).errors)).not.toContain('CYCLE_DETECTED');
    });

    it('detectCycles ignores an edge pointing at a node that does not exist', () => {
      expect(detectCycles([n('a', 'transform')], [e('e1', 'a', 'out', 'ghost')])).toBeNull();
    });

    it('detectCycles finds a cycle in a component unreachable from any root', () => {
      const nodes = [n('a', 'transform'), n('b', 'transform')];
      const edges = [e('e1', 'a', 'out', 'b'), e('e2', 'b', 'out', 'a')];
      expect(detectCycles(nodes, edges)).not.toBeNull();
    });
  });

  describe('handle compatibility', () => {
    it('rejects an edge into a Trigger — triggers have no inputs', () => {
      const d = def(
        [n('t', 'trigger'), n('l', 'llm')],
        [e('e1', 't', 'out', 'l'), e('e2', 'l', 'out', 't')],
      );
      const invalid = validatePipeline(d).errors.filter((i) => i.code === 'INVALID_HANDLE');
      expect(invalid.map((i) => i.edgeId)).toEqual(['e2']);
    });

    it('rejects an unknown source handle', () => {
      const d = def([n('t', 'trigger'), n('l', 'llm')], [e('e1', 't', 'nonsense', 'l')]);
      expect(codes(validatePipeline(d).errors)).toContain('INVALID_HANDLE');
    });

    it('rejects an edge whose endpoint node was deleted', () => {
      const d = def([n('t', 'trigger')], [e('e1', 't', 'out', 'deleted')]);
      const invalid = validatePipeline(d).errors.filter((i) => i.code === 'INVALID_HANDLE');
      expect(invalid).toHaveLength(1);
      expect(invalid[0].edgeId).toBe('e1');
    });

    it('accepts arbitrary fork branch / join input indices', () => {
      expect(isValidHandleConnection('fork', 'branch-7', 'join', 'in-12')).toBe(true);
      expect(isValidHandleConnection('fork', 'branch-x', 'join', 'in-0')).toBe(false);
      expect(isValidHandleConnection('fork', 'branch-0', 'join', 'in-x')).toBe(false);
    });

    it('treats ag-ui-output as terminal — it has no output handle', () => {
      expect(isValidHandleConnection('ag-ui-output', 'out', 'llm', 'in')).toBe(false);
      expect(isValidHandleConnection('llm', 'out', 'ag-ui-output', 'in')).toBe(true);
    });
  });

  describe('node config requirements', () => {
    it('flags each missing LLM field by name', () => {
      const d = def(
        [n('t', 'trigger'), n('l', 'llm', { model: '  ', systemPrompt: '', userPromptTemplate: '' } as Partial<NodeData>)],
        [e('e1', 't', 'out', 'l')],
      );
      const fields = validatePipeline(d)
        .errors.filter((i) => i.code === 'MISSING_CONFIG')
        .map((i) => i.field);
      expect(fields).toEqual(expect.arrayContaining(['model', 'systemPrompt', 'userPromptTemplate']));
    });

    it('treats a whitespace-only expression as missing', () => {
      const d = def([n('t', 'trigger'), n('c', 'condition', { expression: '   ' } as Partial<NodeData>)], []);
      expect(
        validatePipeline(d).errors.some((i) => i.code === 'MISSING_CONFIG' && i.field === 'expression'),
      ).toBe(true);
    });

    it('requires a fork branchCount of at least 2', () => {
      const one = def([n('t', 'trigger'), n('f', 'fork', { branchCount: 1 } as Partial<NodeData>)], []);
      expect(validatePipeline(one).errors.some((i) => i.field === 'branchCount')).toBe(true);

      const two = def([n('t', 'trigger'), n('f', 'fork', { branchCount: 2 } as Partial<NodeData>)], []);
      expect(validatePipeline(two).errors.some((i) => i.field === 'branchCount')).toBe(false);
    });

    it('requires n for an n_of_m join', () => {
      const bad = def([n('t', 'trigger'), n('j', 'join', { mode: 'n_of_m' } as Partial<NodeData>)], []);
      expect(validatePipeline(bad).errors.some((i) => i.field === 'n')).toBe(true);

      const good = def([n('t', 'trigger'), n('j', 'join', { mode: 'n_of_m', n: 2 } as Partial<NodeData>)], []);
      expect(validatePipeline(good).errors.some((i) => i.field === 'n')).toBe(false);
    });

    it('requires an approver and a positive requiredCount', () => {
      const d = def(
        [n('t', 'trigger'), n('a', 'approval', { approvers: [], requiredCount: 0 } as Partial<NodeData>)],
        [],
      );
      const found = codes(validatePipeline(d).errors);
      expect(found).toContain('APPROVAL_NO_APPROVERS');
      expect(validatePipeline(d).errors.some((i) => i.field === 'requiredCount')).toBe(true);
    });
  });

  describe('join fan-in', () => {
    it('blocks a join with a single incoming edge', () => {
      const d = def(
        [n('t', 'trigger'), n('a', 'transform'), n('j', 'join')],
        [e('e1', 't', 'out', 'a'), e('e2', 'a', 'out', 'j', 'in-0')],
      );
      expect(codes(validatePipeline(d).errors)).toContain('JOIN_INSUFFICIENT_INPUTS');
    });

    it('accepts a join with two incoming edges', () => {
      const d = def(
        [n('t', 'trigger'), n('f', 'fork'), n('a', 'transform'), n('b', 'transform'), n('j', 'join')],
        [
          e('e1', 't', 'out', 'f'),
          e('e2', 'f', 'branch-0', 'a'),
          e('e3', 'f', 'branch-1', 'b'),
          e('e4', 'a', 'out', 'j', 'in-0'),
          e('e5', 'b', 'out', 'j', 'in-1'),
        ],
      );
      expect(codes(validatePipeline(d).errors)).not.toContain('JOIN_INSUFFICIENT_INPUTS');
    });
  });
});

describe('validatePipeline — advisory warnings', () => {
  it('reports a node unreachable from the trigger', () => {
    const d = def(
      [n('t', 'trigger'), n('l', 'llm'), n('lost', 'transform')],
      [e('e1', 't', 'out', 'l')],
    );
    const orphans = validatePipeline(d).warnings.filter((i) => i.code === 'ORPHAN_NODE');
    expect(orphans.map((i) => i.nodeId)).toEqual(['lost']);
  });

  it('skips the orphan check entirely when the trigger count is wrong', () => {
    const d = def([n('t1', 'trigger'), n('t2', 'trigger'), n('lost', 'transform')], []);
    expect(codes(validatePipeline(d).warnings)).not.toContain('ORPHAN_NODE');
  });

  it('walks both condition branches as reachable', () => {
    const d = def(
      [n('t', 'trigger'), n('c', 'condition'), n('yes', 'transform'), n('no', 'transform')],
      [e('e1', 't', 'out', 'c'), e('e2', 'c', 'true', 'yes'), e('e3', 'c', 'false', 'no')],
    );
    expect(codes(validatePipeline(d).warnings)).not.toContain('ORPHAN_NODE');
  });

  it('flags a dead end unless the node opts out with terminal: true', () => {
    const d = def([n('t', 'trigger'), n('a', 'transform')], [e('e1', 't', 'out', 'a')]);
    expect(validatePipeline(d).warnings.filter((i) => i.code === 'DEAD_END').map((i) => i.nodeId)).toEqual(['a']);

    const opted = def(
      [n('t', 'trigger'), n('a', 'transform', { terminal: true } as Partial<NodeData>)],
      [e('e1', 't', 'out', 'a')],
    );
    expect(codes(validatePipeline(opted).warnings)).not.toContain('DEAD_END');
  });

  it('names each unwired fork branch', () => {
    const d = def(
      [n('t', 'trigger'), n('f', 'fork', { branchCount: 3 } as Partial<NodeData>), n('a', 'transform')],
      [e('e1', 't', 'out', 'f'), e('e2', 'f', 'branch-0', 'a')],
    );
    const unused = validatePipeline(d).warnings.filter((i) => i.code === 'UNUSED_FORK_BRANCH');
    expect(unused.map((i) => i.field)).toEqual(['branch-1', 'branch-2']);
  });

  it('flags an unwired condition branch, and the asymmetric false branch separately', () => {
    const d = def(
      [n('t', 'trigger'), n('c', 'condition'), n('yes', 'transform')],
      [e('e1', 't', 'out', 'c'), e('e2', 'c', 'true', 'yes')],
    );
    const found = codes(validatePipeline(d).warnings);
    expect(found).toContain('UNUSED_CONDITION_BRANCH');
    expect(found).toContain('UNREACHABLE_AFTER_CONDITION_FALSE');
  });

  it('does not fire the asymmetry lint when neither branch is wired', () => {
    const d = def([n('t', 'trigger'), n('c', 'condition')], [e('e1', 't', 'out', 'c')]);
    expect(codes(validatePipeline(d).warnings)).not.toContain('UNREACHABLE_AFTER_CONDITION_FALSE');
  });

  it('warns about a missing LLM error handler and stops once one is wired', () => {
    const bare = def([n('t', 'trigger'), n('l', 'llm')], [e('e1', 't', 'out', 'l')]);
    expect(codes(validatePipeline(bare).warnings)).toContain('NO_ERROR_HANDLER');

    const handled = def(
      [n('t', 'trigger'), n('l', 'llm'), n('h', 'transform')],
      [e('e1', 't', 'out', 'l'), e('e2', 'l', 'error', 'h')],
    );
    expect(codes(validatePipeline(handled).warnings)).not.toContain('NO_ERROR_HANDLER');
  });

  it('exempts a fork-branch node that feeds a join — an error edge there would hang the join', () => {
    const d = def(
      [n('t', 'trigger'), n('f', 'fork'), n('a', 'action'), n('b', 'action'), n('j', 'join')],
      [
        e('e1', 't', 'out', 'f'),
        e('e2', 'f', 'branch-0', 'a'),
        e('e3', 'f', 'branch-1', 'b'),
        e('e4', 'a', 'out', 'j', 'in-0'),
        e('e5', 'b', 'out', 'j', 'in-1'),
      ],
    );
    expect(codes(validatePipeline(d).warnings)).not.toContain('NO_ERROR_HANDLER');
  });

  it('still warns for a fork-branch node that reaches no join', () => {
    const d = def(
      [n('t', 'trigger'), n('f', 'fork'), n('a', 'action'), n('b', 'action')],
      [e('e1', 't', 'out', 'f'), e('e2', 'f', 'branch-0', 'a'), e('e3', 'f', 'branch-1', 'b')],
    );
    expect(codes(validatePipeline(d).warnings)).toContain('NO_ERROR_HANDLER');
  });

  it('does not let an error edge count as a path to the join', () => {
    // `a` is under a fork, but only its ERROR handle reaches the join, so the
    // success-path exemption must not apply.
    const d = def(
      [n('t', 'trigger'), n('f', 'fork'), n('a', 'action'), n('b', 'action'), n('j', 'join')],
      [
        e('e1', 't', 'out', 'f'),
        e('e2', 'f', 'branch-0', 'a'),
        e('e3', 'f', 'branch-1', 'b'),
        e('e4', 'b', 'out', 'j', 'in-0'),
        e('e5', 'b', 'out', 'j', 'in-1'),
      ],
    );
    expect(validatePipeline(d).warnings.filter((i) => i.code === 'NO_ERROR_HANDLER').map((i) => i.nodeId)).toContain('a');
  });

  it('warns about an unbounded LLM and an untimed approval', () => {
    const d = def(
      [
        n('t', 'trigger'),
        n('l', 'llm', { maxTokens: 0 } as Partial<NodeData>),
        n('a', 'approval', { timeoutMs: undefined } as Partial<NodeData>),
      ],
      [e('e1', 't', 'out', 'l')],
    );
    const found = codes(validatePipeline(d).warnings);
    expect(found).toContain('LLM_NO_MAX_TOKENS');
    expect(found).toContain('UNGUARDED_APPROVAL_TIMEOUT');
  });

  it('warns about a wide fork only above 5 branches', () => {
    const five = def([n('t', 'trigger'), n('f', 'fork', { branchCount: 5 } as Partial<NodeData>)], []);
    expect(codes(validatePipeline(five).warnings)).not.toContain('LARGE_FORK');

    const six = def([n('t', 'trigger'), n('f', 'fork', { branchCount: 6 } as Partial<NodeData>)], []);
    expect(codes(validatePipeline(six).warnings)).toContain('LARGE_FORK');
  });

  it('warns about a deep chain and terminates on a cyclic graph instead of hanging', () => {
    const nodes = [n('t', 'trigger')];
    const edges: PipelineEdge[] = [];
    let prev = 't';
    for (let i = 0; i < 14; i += 1) {
      const id = `s${i}`;
      nodes.push(n(id, 'transform'));
      edges.push(e(`e${i}`, prev, 'out', id));
      prev = id;
    }
    expect(codes(validatePipeline(def(nodes, edges)).warnings)).toContain('DEEP_CHAIN');

    // Close the chain into a loop: the lint must bail, not spin.
    edges.push(e('loop', prev, 'out', 't'));
    expect(codes(validatePipeline(def(nodes, edges)).warnings)).not.toContain('DEEP_CHAIN');
  });

  it('flags duplicate display names on both offenders', () => {
    const d = def(
      [n('t', 'trigger'), n('a1', 'action'), n('a2', 'action')],
      [],
    );
    const dupes = validatePipeline(d).warnings.filter((i) => i.code === 'DUPLICATE_NODE_NAME');
    expect(dupes.map((i) => i.nodeId).sort()).toEqual(['a1', 'a2']);
  });

  it('prefers an explicit label over the type discriminator when naming', () => {
    const d = def(
      [
        n('t', 'trigger'),
        n('c1', 'condition', { label: 'Same' } as Partial<NodeData>),
        n('c2', 'condition', { label: 'Same' } as Partial<NodeData>),
      ],
      [],
    );
    const dupes = validatePipeline(d).warnings.filter((i) => i.code === 'DUPLICATE_NODE_NAME');
    expect(dupes).toHaveLength(2);
    expect(dupes[0].message).toContain("'Same'");
  });

  it('warns about a high-temperature templated prompt only above 0.8', () => {
    const hot = def(
      [n('t', 'trigger'), n('l', 'llm', { temperature: 0.9, userPromptTemplate: '{{x}}' } as Partial<NodeData>)],
      [],
    );
    expect(codes(validatePipeline(hot).warnings)).toContain('LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT');

    const atBoundary = def(
      [n('t', 'trigger'), n('l', 'llm', { temperature: 0.8, userPromptTemplate: '{{x}}' } as Partial<NodeData>)],
      [],
    );
    expect(codes(validatePipeline(atBoundary).warnings)).not.toContain('LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT');

    const untemplated = def(
      [n('t', 'trigger'), n('l', 'llm', { temperature: 0.9, userPromptTemplate: 'literal' } as Partial<NodeData>)],
      [],
    );
    expect(codes(validatePipeline(untemplated).warnings)).not.toContain(
      'LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT',
    );
  });

  it('warns when a scheduled pipeline is still a draft, and stops once published', () => {
    const draft = def([n('t', 'trigger')], [], { triggerBinding: { event: 'schedule' } });
    expect(codes(validatePipeline(draft).warnings)).toContain(
      'NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED',
    );

    const published = def([n('t', 'trigger')], [], {
      triggerBinding: { event: 'schedule' },
      status: 'published',
    });
    expect(codes(validatePipeline(published).warnings)).not.toContain(
      'NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED',
    );
  });

  it('accepts a fork whose branches converge on one join, and flags one that does not', () => {
    const converging = def(
      [n('t', 'trigger'), n('f', 'fork'), n('a', 'transform'), n('b', 'transform'), n('j', 'join')],
      [
        e('e1', 't', 'out', 'f'),
        e('e2', 'f', 'branch-0', 'a'),
        e('e3', 'f', 'branch-1', 'b'),
        e('e4', 'a', 'out', 'j', 'in-0'),
        e('e5', 'b', 'out', 'j', 'in-1'),
      ],
    );
    expect(codes(validatePipeline(converging).warnings)).not.toContain('FORK_WITHOUT_MATCHING_JOIN');

    const diverging = def(
      [n('t', 'trigger'), n('f', 'fork'), n('a', 'transform'), n('b', 'transform')],
      [e('e1', 't', 'out', 'f'), e('e2', 'f', 'branch-0', 'a'), e('e3', 'f', 'branch-1', 'b')],
    );
    expect(codes(validatePipeline(diverging).warnings)).toContain('FORK_WITHOUT_MATCHING_JOIN');
  });

  it('flags a join with no upstream fork', () => {
    const d = def(
      [n('t', 'trigger'), n('a', 'transform'), n('b', 'transform'), n('j', 'join')],
      [
        e('e1', 't', 'out', 'a'),
        e('e2', 't', 'out', 'b'),
        e('e3', 'a', 'out', 'j', 'in-0'),
        e('e4', 'b', 'out', 'j', 'in-1'),
      ],
    );
    expect(codes(validatePipeline(d).warnings)).toContain('FORK_WITHOUT_MATCHING_JOIN');
  });
});
