import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { WorkGraph } from '../../src/components/graph/work/WorkGraph';
import type { WorkActivityNodeDetail, WorkActivityPresentation, WorkGraphNodeData, WorkGraphEdgeData, WorkGraphSelection, WorkGraphViewport } from '../../src/components/graph/work/types';
import { Button } from '../../src/components/ui/Button';
import { Select } from '../../src/components/forms/Select';
import './App.css';

// Explicit fixture host: no credentials, network, real messages, or production events.
const at = Date.parse('2026-09-20T13:45:00Z');
const timestamp = new Date(at).toISOString();
const minutes = (value: number) => new Date(at - value * 60_000).toISOString();
const node = (id: string, title: string, kind: WorkGraphNodeData['kind'], status: WorkGraphNodeData['status']): WorkGraphNodeData => ({ id, title, kind, status, updatedAt: timestamp, disclosure: 'details', capabilities: kind === 'document' ? ['view-document'] : [] });
const edge = (id: string, fromId: string, toId: string, label: string, status: WorkGraphEdgeData['status'] = 'completed'): WorkGraphEdgeData => ({ id, fromId, toId, label, relation: 'produced', status, updatedAt: timestamp, disclosure: 'details', capabilities: [] });

const nodes = [
  node('meeting', 'Planning sync', 'meeting', 'completed'),
  node('transcript', 'Transcript', 'transcript', 'completed'),
  node('docs', 'Project documents', 'document', 'completed'),
  node('agent', 'Generate presentation', 'run', 'running'),
  node('deck', 'Sprint review', 'document', 'running'),
  node('workitem', 'WORK-144', 'task', 'idle'),
  node('terminal', 'Cloud terminal', 'terminal', 'running'),
  node('release-source', 'Release plan', 'document', 'completed'),
  node('release-agent', 'Draft release notes', 'agent', 'running'),
  node('preview-source', 'WORK-145', 'task', 'idle'),
  node('preview-terminal', 'Cloud terminal 2', 'terminal', 'running'),
  node('design-source', 'Design brief', 'document', 'completed'),
  node('design-agent', 'Create launch visuals', 'agent', 'running'),
];
const edges = [
  edge('meeting-transcript', 'meeting', 'transcript', 'Transcript'),
  edge('transcript-agent', 'transcript', 'agent', 'Source'),
  edge('docs-agent', 'docs', 'agent', 'Input'),
  edge('generation', 'agent', 'deck', 'Generating', 'running'),
  edge('work-session', 'workitem', 'terminal', 'Tests', 'running'),
  edge('release-input', 'release-source', 'release-agent', 'Input', 'running'),
  edge('preview-input', 'preview-source', 'preview-terminal', 'Input', 'running'),
  edge('design-input', 'design-source', 'design-agent', 'Input', 'running'),
];

/** Stand-in artwork for a slide the host would normally resolve. */
function Slide({ revision, title, page }: { revision: string; title: string; page: number }) {
  return (
    <div className="flex h-full flex-col justify-between bg-surface p-2 text-text-primary">
      <span className="text-[6px] uppercase tracking-widest text-text-tertiary">Sprint review · {revision}</span>
      <span className="text-[13px] font-semibold leading-tight">{title}</span>
      <span className="h-0.5 w-7 bg-primary" />
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-1">
          <span className="block text-[6px] text-text-tertiary">Delivery progress</span>
          <span className="block h-0.5 w-11/12 bg-border" />
          <span className="block h-0.5 w-8/12 bg-border" />
          <span className="block h-0.5 w-10/12 bg-border" />
        </div>
        <div className="flex h-7 items-end gap-0.5">
          <span className="w-1.5 bg-primary/30" />
          <span className="h-3 w-1.5 bg-primary/50" />
          <span className="h-5 w-1.5 bg-primary/70" />
          <span className="h-7 w-1.5 bg-primary" />
        </div>
      </div>
      <span className="flex justify-between text-[5px] tracking-widest text-text-tertiary"><span>PRODUCT &amp; ENGINEERING</span><span>{String(page).padStart(2, '0')} / 12</span></span>
    </div>
  );
}

const SLIDE_TITLES = ['Executive summary', 'Delivery progress', 'Scope and milestones', 'Release readiness', 'Test coverage', 'Risks and mitigations', 'Ownership', 'Rollback plan', 'Customer impact', 'Open questions', 'Next steps', 'Appendix'];
const slides = (revision: string) => SLIDE_TITLES.map((title, index) => ({ id: `${revision}-slide-${index + 1}`, index: index + 1, title, preview: <Slide revision={revision} title={title} page={index + 1} /> }));
const revisions = [
  { id: 'v1', label: 'v1', createdAt: minutes(40), preview: <Slide revision="v1" title="Release readiness" page={4} />, anchorId: 'v1-slide-4', anchorLabel: 'Slide 4', slides: slides('v1') },
  { id: 'v2', label: 'v2', createdAt: minutes(18), preview: <Slide revision="v2" title="Release readiness" page={4} />, anchorId: 'v2-slide-4', anchorLabel: 'Slide 4', slides: slides('v2') },
];

const askAnswer = {
  text: 'Review the release risks in Connor\u2019s updated deck before noon.',
  citations: [
    { id: 'segment', label: '08:42 in transcript' },
    { id: 'deck', label: 'Sprint review', selection: { kind: 'node' as const, id: 'deck' } },
  ],
  note: 'Sample answer for this preview.',
};
const transcript = {
  segments: [
    { id: 's1', at: '08:42', speaker: 'Connor', text: 'Frank, can you review the release risks before noon?', anchorId: 'segment-1' },
    { id: 's2', at: '08:47', speaker: 'Frank', text: 'Yes \u2014 send me the updated deck.', anchorId: 'segment-2' },
  ],
  ask: { enabled: true, placeholder: 'Anything for me?', onAsk: () => askAnswer },
};

const baseDetails: Record<string, WorkActivityNodeDetail> = {
  meeting: {
    emphasis: 'earlier', lines: ['08:30–09:00 · 30 min', 'Recorded · transcript available'],
    participants: [{ id: 'ch', label: 'Connor' }, { id: 'fd', label: 'Frank' }, { id: 'gw', label: 'Grace' }],
    subtitle: 'Meeting transcript · Shared with you',
    banner: { tone: 'success', title: 'Transcript ready', description: 'Planning sync · 08:30–09:00 · 2 speakers' },
    transcript,
  },
  transcript: {
    emphasis: 'input', badge: 'Ready', lines: ['Planning sync · 08:30–09:00', '2 speakers · 1 action item'], excerpt: 'Review release risks before noon',
    subtitle: 'Meeting transcript · Shared with you',
    banner: { tone: 'success', title: 'Transcript ready', description: 'Planning sync · 08:30–09:00 · 2 speakers' },
    transcript,
  },
  docs: {
    emphasis: 'earlier', lines: ['Release plan · rev 6 · 09:08'],
    subtitle: 'Shared with you',
    banner: { tone: 'success', title: 'Project documents', description: 'Shared work context' },
    sections: { description: 'Release plan · Revision 6. Used with the meeting transcript to create the sprint review presentation.' },
  },
  workitem: {
    emphasis: 'input', lines: ['Gateway · Coverage checks'],
    subtitle: 'Shared with you',
    banner: { tone: 'success', title: 'WORK-144', description: 'Shared work context' },
    sections: { description: 'Gateway · WORK-144 feeds the shared cloud terminal for coverage checks.' },
  },
  terminal: {
    fresh: true, badge: 'Tests running', lines: ['Gateway / WORK-144'], footer: { label: 'Cloud session · 09:15', note: 'Shared' },
    subtitle: 'Cloud project · Shared with you',
    banner: { tone: 'info', title: 'Tests running in cloud terminal', description: 'Session started 09:15 · Shared with you' },
    sections: { workItem: { id: 'workitem', title: 'WORK-144', meta: 'Gateway · Coverage checks', selection: { kind: 'node', id: 'workitem' } } },
    note: 'This preview shows the session\u2019s work context. Terminal output depends on an authorized observation capability.',
  },
  'release-source': { emphasis: 'earlier', lines: ['Revision 6 · Shared document'] },
  'release-agent': { fresh: true, lines: ['Document agent · 1 tool'], tools: ['Documents'] },
  'preview-source': { emphasis: 'input', lines: ['Gateway · Preview deployment'] },
  'preview-terminal': { fresh: true, badge: 'Build running', lines: ['Building the preview'], footer: { label: 'Started 09:34', note: 'Shared' } },
  'design-source': { emphasis: 'earlier', lines: ['Product launch · Shared brief'] },
  'design-agent': { fresh: true, lines: ['Design agent · 2 tools'], tools: ['Images', 'Files'] },
};

const EFFORTS: Array<{ id: string; title: string; subtitle: string; nodeIds: string[]; edgeIds: string[]; contextNodeIds?: string[] }> = [
  { id: 'slides', title: 'Sprint review', subtitle: 'v3 generating · v2 available', nodeIds: ['meeting', 'transcript', 'docs', 'agent', 'deck'], edgeIds: ['meeting-transcript', 'transcript-agent', 'docs-agent', 'generation'], contextNodeIds: ['meeting', 'docs'] },
  { id: 'coverage', title: 'Coverage checks', subtitle: 'Gateway · Cloud project', nodeIds: ['workitem', 'terminal'], edgeIds: ['work-session'] },
  { id: 'release-notes', title: 'Release notes', subtitle: 'Document agent · Drafting', nodeIds: ['release-source', 'release-agent'], edgeIds: ['release-input'] },
  { id: 'preview-build', title: 'Preview build', subtitle: 'Cloud terminal · Building', nodeIds: ['preview-source', 'preview-terminal'], edgeIds: ['preview-input'] },
  { id: 'design-assets', title: 'Design assets', subtitle: 'Design agent · Rendering', nodeIds: ['design-source', 'design-agent'], edgeIds: ['design-input'] },
];

// A chain with no declared context is the shape the live host sends: one
// column of five cards, beside a two-card effort.
const CHAIN: Array<{ id: string; title: string; subtitle: string; nodeIds: string[]; edgeIds: string[]; contextNodeIds?: string[] }> = [
  { id: 'slides', title: 'Sprint review', subtitle: 'v3 generating · v2 available', nodeIds: ['meeting', 'transcript', 'docs', 'agent', 'deck'], edgeIds: ['meeting-transcript', 'transcript-agent', 'docs-agent', 'generation'], contextNodeIds: [] },
  { id: 'coverage', title: 'Coverage checks', subtitle: 'Gateway · Cloud project', nodeIds: ['workitem', 'terminal'], edgeIds: ['work-session'] },
];

const WIDTHS: Record<string, string> = { '530': 'w-[530px]', '600': 'w-[600px]', '700': 'w-[700px]', '895': 'w-[895px]' };

function Preview() {
  const [count, setCount] = useState(2);
  const [failing, setFailing] = useState(false);
  const [width, setWidth] = useState('895');
  const [chain, setChain] = useState(false);
  const [full, setFull] = useState(false);
  const [dark, setDark] = useState(false);
  const [selection, onSelectionChange] = useState<WorkGraphSelection>(null);
  const [viewport, onViewportChange] = useState<WorkGraphViewport>({ x: 0, y: 0, zoom: 1 });
  const [view, onViewChange] = useState<WorkActivityPresentation['view']>({ focusedEffortId: null, expandedSourceEfforts: ['slides'] });
  const [window, onWindowChange] = useState<WorkActivityPresentation['window']>({ start: at - 15 * 60_000, end: at, following: true });
  const [reference, setReference] = useState('');

  const deckLine = failing ? 'v3 failed · v2 available' : 'v3 generating · v2 available';
  const efforts = (chain ? CHAIN : EFFORTS.slice(0, count)).map((effort) => effort.id === 'slides' ? { ...effort, subtitle: deckLine } : effort);
  const shown = new Set(efforts.flatMap((effort) => effort.nodeIds));
  const details: Record<string, WorkActivityNodeDetail> = {
    ...baseDetails,
    agent: {
      fresh: true, lines: ['Presentation agent · 3 tools'], tools: ['Slides', 'Charts', 'Files'],
      subtitle: failing ? 'Presentation agent · Failed' : 'Presentation agent · Running',
      banner: failing
        ? { tone: 'error', title: 'Presentation agent failed', description: 'The run stopped before writing v3.' }
        : { tone: 'info', title: 'Presentation agent running', description: 'Creating the next revision of Sprint review' },
      sections: { inputs: ['Planning sync transcript', 'Release plan · rev 6'], tools: ['Slides', 'Charts', 'Files'] },
      actions: [{ id: 'v2', label: 'Inspect available v2', selection: { kind: 'node', id: 'deck', revisionId: 'v2' } }],
    },
    deck: {
      fresh: true, lines: [deckLine], feedbackCount: 2, footer: { label: 'First draft · 09:27', note: 'Shared' },
      subtitle: 'Presentation · Shared with you',
      banner: failing
        ? { tone: 'error', title: 'v3 failed', description: 'v2 is still available · inspect run' }
        : { tone: 'info', title: 'Generating v3', description: 'v2 is available to review while the agent works' },
      sections: {
        sources: [
          { id: 'transcript', title: 'Planning sync transcript', meta: 'Meeting · 08:30–09:00', selection: { kind: 'node', id: 'transcript' } },
          { id: 'docs', title: 'Release plan', meta: 'Project document · Revision 6', selection: { kind: 'node', id: 'docs' } },
        ],
      },
      ...(failing ? { actions: [{ id: 'run', label: 'Inspect run', selection: { kind: 'node' as const, id: 'agent' } }] } : {}),
      artifact: {
        revisions,
        pending: { id: 'v3', label: 'v3', status: failing ? 'failed' : 'generating', ...(failing ? { message: 'The presentation agent stopped before writing v3.' } : {}) },
        onOpenPreview: (revisionId: string, anchorId?: string) => setReference(`Fixture: open ${revisionId}${anchorId ? ` at ${anchorId}` : ''} at full size`),
      },
    },
  };
  const activity: WorkActivityPresentation = {
    efforts, details,
    mode: full ? 'full' : 'split',
    window, onWindowChange, view, onViewChange,
    bounds: { start: at - 105 * 60_000, end: at },
    temporalMode: 'recent',
    now: at,
    activeEdgeIds: failing ? ['work-session', 'release-input', 'preview-input', 'design-input'] : ['generation', 'work-session', 'release-input', 'preview-input', 'design-input'],
    failedEdgeIds: failing ? ['generation'] : [],
    edgeLabels: failing ? {} : { generation: 'generating' },
    events: [0, 3, 5, 12, 25, 37, 45, 75, 92, 100, 105].map((ago, index) => ({ at: at - ago * 60_000, count: (index % 3) + 1 })),
    title: 'Connor’s activity',
    subtitle: window.following ? 'Working now · Sharing with you' : 'Earlier today · Sharing with you',
    expanded: full,
    onExpand: () => setFull(!full),
    onPopOut: () => setReference('Fixture: the host would open the standalone activity route'),
    onClose: () => setReference('Fixture: the host would close the activity panel'),
    onFeedback: (target) => { setFull(false); setReference(JSON.stringify(target)); },
  };
  const graphNodes = nodes
    .filter((item) => shown.has(item.id))
    .map((item) => {
      if (!failing) return item;
      if (item.id === 'agent') return { ...item, status: 'error' as const };
      if (item.id === 'deck') return { ...item, status: 'completed' as const };
      return item;
    });

  return <main className={`${dark ? 'dark' : ''} flex h-screen flex-col bg-surface-panel font-sans text-text-primary`}>
    <header className="flex shrink-0 flex-wrap items-center gap-3 border-b border-border bg-surface p-3 text-sm">
      <strong>Active Now · component fixtures</strong>
      <span className="text-text-secondary">Sample data · fixed clock · no messages sent</span>
      <Select size="sm" aria-label="Fixture run" className="w-auto" options={[{ value: 'complete', label: 'Run complete' }, { value: 'failing', label: 'Run failing' }]} value={failing ? 'failing' : 'complete'} onChange={(event) => setFailing(event.target.value === 'failing')} />
      <Select size="sm" aria-label="Fixture activities" className="w-auto" options={[2, 3, 5].map((value) => ({ value: String(value), label: `${value} activities` }))} value={String(count)} onChange={(event) => { setCount(Number(event.target.value)); onViewChange({ ...view, focusedEffortId: null }); }} />
      <Select size="sm" aria-label="Fixture shape" className="w-auto" options={[{ value: 'context', label: 'Context columns' }, { value: 'chain', label: 'Single column chain' }]} value={chain ? 'chain' : 'context'} onChange={(event) => setChain(event.target.value === 'chain')} />
      <Select size="sm" aria-label="Fixture panel width" className="w-auto" options={Object.keys(WIDTHS).map((value) => ({ value, label: `${value}px pane` }))} value={width} onChange={(event) => setWidth(event.target.value)} />
      <Button size="sm" variant="secondary" onClick={() => setFull(!full)}>{full ? 'Split size' : 'Full size'}</Button>
      <Button size="sm" variant="secondary" onClick={() => setDark(!dark)}>Theme</Button>
    </header>
    <div className={full ? 'min-h-0 flex-1 p-3' : `ml-auto min-h-0 max-w-full flex-1 p-3 ${WIDTHS[width]}`}>
      <div className="h-full min-h-0 overflow-hidden rounded border border-border">
        <WorkGraph nodes={graphNodes} edges={edges} selection={selection} viewport={viewport} onSelectionChange={onSelectionChange} onViewportChange={onViewportChange} activity={activity} timezone="America/New_York" onReference={(target) => { setFull(false); setReference(JSON.stringify(target)); }} />
      </div>
    </div>
    {reference && <output className="shrink-0 border-t border-border bg-surface px-3 py-2 text-sm">Fixture draft attachment: {reference}</output>}
  </main>;
}
createRoot(document.getElementById('root')!).render(<Preview />);
