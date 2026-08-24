// Every ConfigField label in the logic / control / integration node panels
// must actually name something.
//
// ConfigField's <label> had neither `htmlFor` nor a wrapped control, so it
// labelled NOTHING: a screen reader reached these inputs and announced "edit
// text" / "spin button" with no name, or — where the panel had added an
// aria-label to compensate — a name that could differ from the words on
// screen ("Memory mode" beside a label reading "Mode"). The help and error
// text underneath was equally unreachable.
//
// The fix is per call site, and comes in two shapes:
//
//   * one labelable control → `controlId` + `render`, so the <label htmlFor>
//     association is real and `describedById` reaches the help/error text;
//   * a radio set, a button row, a chip list, several controls for one
//     setting → a `role="group"` named from the same label text, because
//     `htmlFor` pointing at a <div> associates nothing (browsers and screen
//     readers both ignore it, and so does getByLabelText).
//
// Asserting the ATTRIBUTE is present would prove nothing — an id that points
// at no element still "has an id". These tests query by the visible label
// text and assert they get the control back, which only passes if the
// association resolves.

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import ActionConfig from '../action/ActionConfig';
import ApprovalConfig from '../approval/ApprovalConfig';
import ConditionConfig from '../condition/ConditionConfig';
import ForkConfig from '../fork/ForkConfig';
import GraphQueryConfig from '../graph-query/GraphQueryConfig';
import JoinConfig from '../join/JoinConfig';
import KnowledgeBaseConfig from '../knowledge-base/KnowledgeBaseConfig';
import LLMConfig from '../llm/LLMConfig';
import MemoryConfig from '../memory/MemoryConfig';
import ScatterConfig from '../scatter/ScatterConfig';
import TransformConfig from '../transform/TransformConfig';
import TriggerConfig from '../trigger/TriggerConfig';
import VisionConfig from '../vision/VisionConfig';
import VisionClassifyConfig from '../vision-classify/VisionClassifyConfig';
import VisionDescribeConfig from '../vision-describe/VisionDescribeConfig';
import VisionExtractTextConfig from '../vision-extract-text/VisionExtractTextConfig';

import { ToastProvider } from '../../../shared/ToastProvider';
import { IdentityProvider } from '../../../../contexts/IdentityContext';
import { PresenceProvider } from '../../../../contexts/PresenceContext';
import {
  PipelineEditorContext,
  type PipelineEditorValue,
} from '../../context/PipelineEditorContext';

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/**
 * Query by the field's visible label text.
 *
 * ConfigField renders a required field's marker as an aria-hidden "●" INSIDE
 * the <label>. The accessible name a screen reader computes drops it;
 * getByLabelText matches the label's raw textContent and does not — so the
 * marker is tolerated here. Anchored at both ends so "Mode" cannot match
 * "Model".
 */
function byLabel(label: string): HTMLElement {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return screen.getByLabelText(new RegExp(`^${escaped}\\s*●?$`));
}

/** The group shape: `role="group"` named from the field label. */
function group(name: string): HTMLElement {
  return screen.getByRole('group', { name });
}

const noop = vi.fn();

// ---------------------------------------------------------------------------
// Panels whose only requirement is a data object
// ---------------------------------------------------------------------------

describe('ActionConfig', () => {
  const data = {
    type: 'action' as const,
    actionType: 'update-document' as const,
    config: {},
    idempotent: true,
  };

  it('names the action type and dedup scope selects, and their hint text', () => {
    render(<ActionConfig data={data} onChange={noop} />);
    expect(byLabel('Action type').tagName).toBe('SELECT');
    const dedup = byLabel('Dedup scope');
    expect(dedup.tagName).toBe('SELECT');
    // The hint under this one is the panel's own node, not ConfigField's help.
    expect(dedup).toHaveAccessibleDescription(/Retries skip this action/);
  });

  it('groups the per-subtype configuration and the on-error picker', () => {
    render(<ActionConfig data={data} onChange={noop} />);
    expect(group('Configuration')).toBeInTheDocument();
    expect(group('On error')).toBeInTheDocument();
  });

  it('associates each per-subtype row label with its own control', () => {
    render(<ActionConfig data={data} onChange={noop} />);
    // These inner labels had the same defect as ConfigField's own.
    expect(byLabel('Document ID').tagName).toBe('INPUT');
    expect(byLabel('Document ID')).toHaveAccessibleDescription(
      'Use {{current}} for the triggering document',
    );
    expect(byLabel('Field name').tagName).toBe('INPUT');
  });
});

describe('ConditionConfig', () => {
  it('names the branch label input from its visible label', () => {
    render(
      <ConditionConfig data={{ type: 'condition', expression: 'x > 1' }} onChange={noop} />,
    );
    const input = byLabel('Label (optional — shown on node face)');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAccessibleDescription('A short name so this branch is easy to spot.');
  });

  it('gives the expression editor exactly the name on screen', () => {
    render(
      <ConditionConfig data={{ type: 'condition', expression: 'x > 1' }} onChange={noop} />,
    );
    // <CodeEditor> takes no `id`, so this one keeps its own aria-label — but
    // it now matches the visible label instead of saying "Condition
    // expression", and there is only one name either way.
    expect(byLabel('Expression').tagName).toBe('TEXTAREA');
  });
});

describe('ForkConfig', () => {
  const data = { type: 'fork' as const, branchCount: 3 };

  it('points the branch-count label at the number box and describes it', () => {
    render(<ForkConfig data={data} onChange={noop} />);
    const spin = screen.getByRole('spinbutton', { name: 'Branch count' });
    expect(spin).toHaveValue(3);
    expect(spin).toHaveAccessibleDescription('Between 2 and 8 parallel branches.');
    // The slider edits the same value and keeps the same name.
    expect(screen.getByRole('slider', { name: 'Branch count' })).toBeInTheDocument();
  });

  it('groups the per-branch label inputs', () => {
    render(<ForkConfig data={data} onChange={noop} />);
    const g = group('Branch labels (optional)');
    expect(g).toBeInTheDocument();
    expect(g.querySelectorAll('input')).toHaveLength(3);
  });
});

describe('JoinConfig', () => {
  it('uses the group shape for both radio sets', () => {
    render(
      <JoinConfig
        data={{ type: 'join', mode: 'n_of_m', n: 2, mergeStrategy: 'deep-merge' }}
        onChange={noop}
      />,
    );
    expect(group('Mode')).toContainElement(screen.getByTestId('join-mode'));
    expect(group('Merge strategy')).toContainElement(screen.getByTestId('join-merge'));
    // The dependent count inside the Mode group had no name at all.
    expect(screen.getByRole('spinbutton', { name: 'N' })).toHaveValue(2);
  });
});

describe('TransformConfig', () => {
  const data = {
    type: 'transform' as const,
    transformType: 'jsonpath' as const,
    expression: '$.items',
  };

  it('groups the type radios and names the output key input', () => {
    render(<TransformConfig data={data} onChange={noop} />);
    expect(group('Type')).toContainElement(screen.getByTestId('transform-type'));
    const outputKey = byLabel('Output key (optional)');
    expect(outputKey.tagName).toBe('INPUT');
    expect(outputKey).toHaveAccessibleDescription(/writes to context/);
  });

  it('gives the expression editor the name on screen', () => {
    render(<TransformConfig data={data} onChange={noop} />);
    expect(byLabel('Expression').tagName).toBe('TEXTAREA');
  });
});

describe('GraphQueryConfig', () => {
  const data = { type: 'graph-query' as const, graphId: 'g1', query: 'MATCH (n) RETURN n' };

  it('wires the graph id and query to their labels', () => {
    render(<GraphQueryConfig data={data} onChange={noop} />);
    expect(byLabel('Graph ID')).toHaveValue('g1');
    expect(byLabel('Graph query')).toHaveValue('MATCH (n) RETURN n');
    expect(byLabel('Graph query')).toHaveAccessibleDescription(/Bind values with \$parameters/);
  });

  it('groups the parameter rows and the context pills', () => {
    render(<GraphQueryConfig data={data} onChange={noop} />);
    expect(group('Bind parameters')).toHaveAccessibleDescription(/Each row binds one/);
    expect(group('Available context')).toBeInTheDocument();
  });

  it('wires the timeout and output key', () => {
    render(<GraphQueryConfig data={data} onChange={noop} />);
    expect(byLabel('Timeout')).toHaveAccessibleDescription(
      'Leave empty to use the executor default.',
    );
    expect(byLabel('Output key').tagName).toBe('INPUT');
  });
});

describe('KnowledgeBaseConfig', () => {
  const data = {
    type: 'knowledge-base' as const,
    knowledgeBaseId: 'kb-1',
    queryTemplate: '{{context.trigger.question}}',
    topK: 5,
  };

  it('wires every single-control field', () => {
    render(<KnowledgeBaseConfig data={data} onChange={noop} />);
    expect(byLabel('Knowledge base ID')).toHaveValue('kb-1');
    expect(byLabel('Query template')).toHaveValue('{{context.trigger.question}}');
    expect(byLabel('Top K')).toHaveValue(5);
    expect(byLabel('Score threshold')).toBeInTheDocument();
    expect(byLabel('Output key')).toBeInTheDocument();
  });

  it('routes the error message through aria-describedby when the field is invalid', () => {
    render(<KnowledgeBaseConfig data={{ ...data, topK: 0 }} onChange={noop} />);
    expect(byLabel('Top K')).toHaveAccessibleDescription('Must be between 1 and 100.');
  });

  it('groups the context pills', () => {
    render(<KnowledgeBaseConfig data={data} onChange={noop} />);
    expect(group('Available context')).toBeInTheDocument();
  });
});

describe('LLMConfig', () => {
  const data = {
    type: 'llm' as const,
    provider: 'anthropic' as const,
    model: 'claude-sonnet-4-6',
    systemPrompt: 'be terse',
    userPromptTemplate: 'summarise {{context.doc}}',
    streaming: false,
  };

  it('wires provider, model and system prompt', () => {
    render(<LLMConfig data={data} onChange={noop} />);
    expect(byLabel('Provider').tagName).toBe('SELECT');
    expect(byLabel('Model')).toHaveValue('claude-sonnet-4-6');
    expect(byLabel('System prompt')).toHaveValue('be terse');
  });

  it('groups the context pills and keeps the uncontrollable editors single-named', () => {
    render(<LLMConfig data={data} onChange={noop} />);
    expect(group('Available context')).toBeInTheDocument();
    // CodeEditor accepts no `id`; it already carried a name identical to the
    // visible label, so there is still exactly one.
    expect(byLabel('User prompt template').tagName).toBe('TEXTAREA');
  });

  it('wires the Advanced fields once the section is expanded', () => {
    render(<LLMConfig data={data} onChange={noop} />);
    fireEvent.click(screen.getByRole('button', { name: /Advanced/ }));
    expect(byLabel('Max tokens')).toHaveAccessibleDescription(
      'Upper bound on response length.',
    );
    // <Slider> accepts no `id` either, so it keeps its own name — which is
    // the same string as the visible label.
    expect(byLabel('Temperature')).toHaveAttribute('type', 'range');
  });
});

describe('MemoryConfig', () => {
  const data = {
    type: 'memory' as const,
    mode: 'read' as const,
    scope: 'session' as const,
    namespace: 'support',
    keyExpression: '{{context.trigger.userId}}',
  };

  it('names each control from the label on screen, not a restating aria-label', () => {
    render(<MemoryConfig data={data} onChange={noop} />);
    expect(byLabel('Mode')).toHaveValue('read');
    expect(byLabel('Scope')).toHaveValue('session');
    expect(byLabel('Namespace')).toHaveValue('support');
    expect(byLabel('Key expression')).toHaveValue('{{context.trigger.userId}}');
    expect(byLabel('Output key')).toBeInTheDocument();
    // The old names are gone rather than living on beside the new ones.
    expect(screen.queryByLabelText('Memory mode')).toBeNull();
    expect(screen.queryByLabelText('Memory namespace')).toBeNull();
  });

  it('reaches the mode help text through aria-describedby', () => {
    render(<MemoryConfig data={data} onChange={noop} />);
    expect(byLabel('Mode')).toHaveAccessibleDescription(
      'Look records up and write them into context.',
    );
  });

  it('wires the write-only value field', () => {
    render(<MemoryConfig data={{ ...data, mode: 'write', valueField: 'x' }} onChange={noop} />);
    expect(byLabel('Value field')).toHaveValue('x');
  });
});

// ---------------------------------------------------------------------------
// Panels needing a provider
// ---------------------------------------------------------------------------

describe('ApprovalConfig', () => {
  const identity = {
    userId: 'u-1',
    displayName: 'Tester',
    userEmail: null,
    idToken: null,
    onSignOut: vi.fn(),
  };
  const presence = { presenceUsers: [], currentClientId: null, setTyping: vi.fn() };

  const show = (over: Record<string, unknown> = {}) =>
    render(
      <IdentityProvider value={identity}>
        <PresenceProvider value={presence}>
          <ApprovalConfig
            data={
              {
                type: 'approval',
                approvers: [{ type: 'user', value: 'u-2' }],
                requiredCount: 1,
                ...over,
              } as never
            }
            onChange={noop}
          />
        </PresenceProvider>
      </IdentityProvider>,
    );

  it('groups the approver picker and its chips', () => {
    show();
    expect(group('Approvers')).toHaveAccessibleDescription('Who can approve this step.');
  });

  it('wires the required count and the message textarea', () => {
    show();
    expect(byLabel('Required count')).toHaveAccessibleDescription(
      'How many approvers must say yes.',
    );
    expect(byLabel('Message for approver (optional)').tagName).toBe('TEXTAREA');
  });

  it('groups the timeout amount, unit and action, each separately named', () => {
    show({ timeoutMs: 7_200_000 });
    const g = group('Timeout');
    expect(g).toHaveAccessibleDescription('Leave blank for no timeout.');
    // The amount box had NO accessible name before this migration.
    expect(g).toContainElement(screen.getByRole('spinbutton', { name: 'Timeout value' }));
    expect(g).toContainElement(screen.getByRole('combobox', { name: 'Timeout unit' }));
  });
});

describe('ScatterConfig', () => {
  const editor = {
    definition: null,
    selectedNodeId: null,
  } as unknown as PipelineEditorValue;

  const show = () =>
    render(
      <PipelineEditorContext.Provider value={editor}>
        <ScatterConfig
          data={{ type: 'scatter', itemsPath: '$.items', itemAlias: 'row' }}
          onChange={noop}
        />
      </PipelineEditorContext.Provider>,
    );

  it('groups the schema-aware path picker', () => {
    show();
    expect(group('Items path')).toHaveAccessibleDescription(/JSONPath into context/);
  });

  it('wires the alias and concurrency controls', () => {
    show();
    expect(byLabel('Item alias')).toHaveValue('row');
    expect(byLabel('Max concurrency')).toHaveAccessibleDescription(/default 4/);
  });
});

describe('TriggerConfig', () => {
  const show = (data: Record<string, unknown>) =>
    render(
      <ToastProvider>
        <TriggerConfig data={data as never} onChange={noop} />
      </ToastProvider>,
    );

  it('wires the trigger type select', () => {
    show({ type: 'trigger', triggerType: 'manual' });
    expect(byLabel('Trigger type')).toHaveValue('manual');
  });

  it('wires the document type select and its help text', () => {
    show({ type: 'trigger', triggerType: 'document.finalize', documentTypeId: '' });
    const select = byLabel('Document type');
    expect(select.tagName).toBe('SELECT');
    expect(select).toHaveAccessibleDescription('Select a document type.');
  });

  it('wires the cron and webhook path inputs', () => {
    show({ type: 'trigger', triggerType: 'schedule', schedule: '*/15 * * * *' });
    expect(byLabel('Schedule (cron)')).toHaveValue('*/15 * * * *');
    show({ type: 'trigger', triggerType: 'webhook', webhookPath: 'digest' });
    expect(byLabel('Path')).toHaveValue('digest');
  });
});

// ---------------------------------------------------------------------------
// Vision family
// ---------------------------------------------------------------------------

describe('VisionConfig', () => {
  const data = {
    type: 'image:vision-analyze' as const,
    userPrompt: 'what is this',
    imageRefPath: '$.trigger.imageRef',
  };

  it('wires the model, image path, prompt and schema fields', () => {
    render(<VisionConfig data={data} onChange={noop} />);
    expect(byLabel('Model').tagName).toBe('SELECT');
    expect(byLabel('Image reference path')).toHaveValue('$.trigger.imageRef');
    expect(byLabel('User prompt')).toHaveValue('what is this');
    expect(byLabel('Output schema').tagName).toBe('TEXTAREA');
  });

  it('keeps the suggestion pills as their own named group', () => {
    render(<VisionConfig data={data} onChange={noop} />);
    // The image-path label names the INPUT, not the pills beside it.
    expect(byLabel('Image reference path').tagName).toBe('INPUT');
  });

  it('groups the focus-region canvas when the detection preset is selected', () => {
    render(
      <VisionConfig
        data={{ ...data, outputSchema: { properties: { regions: { type: 'array' } } } }}
        onChange={noop}
      />,
    );
    expect(group('Focus regions')).toHaveAccessibleDescription(/Drag on the image/);
  });
});

describe('VisionClassifyConfig', () => {
  const data = {
    type: 'image:vision-classify' as const,
    imageRefPath: '$.trigger.imageRef',
    labels: ['cat', 'dog'],
  };

  it('groups the label editor and wires the rest', () => {
    render(<VisionClassifyConfig data={data} onChange={noop} />);
    expect(group('Labels')).toHaveAccessibleDescription(
      'The model returns the single best-matching label.',
    );
    expect(byLabel('Model').tagName).toBe('SELECT');
    expect(byLabel('System prompt override').tagName).toBe('TEXTAREA');
    expect(byLabel('Max output tokens')).toHaveValue(256);
  });
});

describe('VisionDescribeConfig', () => {
  it('wires all four fields', () => {
    render(
      <VisionDescribeConfig
        data={{
          type: 'image:vision-describe',
          imageRefPath: '$.trigger.imageRef',
          userPrompt: 'describe it',
        }}
        onChange={noop}
      />,
    );
    expect(byLabel('User prompt')).toHaveValue('describe it');
    expect(byLabel('Model').tagName).toBe('SELECT');
    expect(byLabel('System prompt override').tagName).toBe('TEXTAREA');
    expect(byLabel('Max output tokens')).toHaveValue(512);
  });
});

describe('VisionExtractTextConfig', () => {
  it('wires all three fields', () => {
    render(
      <VisionExtractTextConfig
        data={{ type: 'image:vision-extract-text', imageRefPath: '$.trigger.imageRef' }}
        onChange={noop}
      />,
    );
    const model = byLabel('Model');
    expect(model.tagName).toBe('SELECT');
    expect(model).toHaveAccessibleDescription('Defaults to the more accurate model for OCR.');
    expect(byLabel('System prompt override').tagName).toBe('TEXTAREA');
    expect(byLabel('Max output tokens')).toHaveValue(1024);
  });
});

// ---------------------------------------------------------------------------
// Source guard: grouped fields must borrow the label, not copy it
// ---------------------------------------------------------------------------

// The per-panel tests above prove each group's name is right TODAY. They
// cannot prove it stays right: `aria-label="Mode"` beside a label reading
// "Mode" passes both, and then someone edits the visible label and only one
// of the two moves. That is not hypothetical — it is what these panels were
// already doing when this migration started. MemoryConfig announced "Memory
// mode" next to a label reading "Mode", and GraphQuery/KnowledgeBase
// hardcoded "Graph ID"/"Knowledge base ID" while the visible label comes from
// the host's `nodeVocabulary`, so a host that relabelled the field got two
// contradictory names and no way to notice.
//
// ConfigField hands its label's id to the render prop, so a group can point
// at the real element. This scans for the copy coming back.
// The one group that CANNOT use the id, for a structural reason rather than
// a stylistic one: CropConfig paints its region on a canvas that is a SIBLING
// of the ConfigField (the help text has to render above it), so the group
// wraps the ConfigField instead of living inside its render prop, and the id
// is not in scope. It names itself from the same exported constant the label
// renders, so one edit still moves both. Any NEW entry here needs the same
// kind of reason written down next to it.
const EXEMPT = new Set(['crop/CropConfig.tsx']);

describe('grouped ConfigFields name themselves from the label element', () => {
  it('no role="group" inside a ConfigField render prop carries a literal aria-label', async () => {
    const { readFileSync, readdirSync, statSync } = await import('node:fs');
    const { join } = await import('node:path');

    // Anchored on cwd, not import.meta.url: vitest resolves the latter to a
    // repo-relative path, and node:fs then reads it as absolute.
    const ROOT = join(process.cwd(), 'src/components/pipelines/nodes');
    const files: string[] = [];
    (function walk(dir: string) {
      for (const entry of readdirSync(dir)) {
        if (entry === '__tests__') continue;
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) walk(full);
        else if (entry.endsWith('.tsx')) files.push(full);
      }
    })(ROOT);

    const offenders: string[] = [];
    for (const file of files) {
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, i) => {
        if (!line.includes('role="group"')) return;
        if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) return;
        // The aria-label sits on this line or in the attribute block below it.
        const block = lines.slice(i, i + 5).join('\n').split('>')[0];
        if (!/aria-label=/.test(block)) return;
        const rel = `${file.slice(ROOT.length + 1)}:${i + 1}`;
        if (EXEMPT.has(rel.split(':')[0])) return;
        // Only groups that CAN see the id are in scope: those rendered from
        // inside a ConfigField `render` prop.
        const above = lines.slice(Math.max(0, i - 40), i).join('\n');
        if (!/render=\{\(/.test(above)) return;
        offenders.push(rel);
      });
    }

    expect(offenders, 'use aria-labelledby={labelId} from ConfigField\'s render prop').toEqual([]);
  });
});
