import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { WorkGraph } from '../../src/components/graph/work/WorkGraph';
import type { WorkActivityPresentation, WorkGraphNodeData, WorkGraphEdgeData, WorkGraphSelection, WorkGraphViewport } from '../../src/components/graph/work/types';
import { Button } from '../../src/components/ui/Button';
import { Select } from '../../src/components/forms/Select';
import { ChatSidePanelFrame } from '../../src/components/social/ChatSidePanelRegistry';
import './App.css';

// Explicit fixture host: no credentials, network, real messages, or production events.
const at = Date.parse('2026-09-20T13:42:00Z');
const timestamp = new Date(at).toISOString();
const node = (id: string, title: string, kind: WorkGraphNodeData['kind'], status: WorkGraphNodeData['status']): WorkGraphNodeData => ({ id, title, kind, status, updatedAt: timestamp, disclosure: 'details', capabilities: kind === 'document' ? ['view-document'] : [] });
const edge = (id: string, fromId: string, toId: string, label: string, status: WorkGraphEdgeData['status'] = 'completed'): WorkGraphEdgeData => ({ id, fromId, toId, label, relation: 'produced', status, updatedAt: timestamp, disclosure: 'details', capabilities: [] });
const nodes = [node('meeting', 'Planning sync', 'meeting', 'completed'), node('transcript', 'Planning transcript', 'transcript', 'completed'), node('notes', 'Release plan', 'document', 'completed'), node('generation', 'Generate presentation', 'run', 'running'), node('deck', 'Sprint review', 'document', 'running'), node('item', 'WORK-144 · Coverage', 'task', 'idle'), node('terminal', 'Cloud terminal', 'terminal', 'running'), node('a11y', 'Accessibility checks', 'run', 'running'), node('write', 'API migration notes', 'document', 'waiting'), node('build', 'Preview build', 'run', 'running')];
const edges = [edge('meeting-transcript', 'meeting', 'transcript', 'Transcript'), edge('transcript-generation', 'transcript', 'generation', 'Source'), edge('notes-generation', 'notes', 'generation', 'Input'), edge('generation-deck', 'generation', 'deck', 'Generating', 'running'), edge('item-terminal', 'item', 'terminal', 'Tests', 'running')];
function Slide({ revision }: { revision: string }) { return <div className="flex h-full flex-col justify-between bg-surface p-3 text-text-primary"><span className="text-xs font-semibold">Release readiness</span><span className="text-xs text-text-secondary">Scope · coverage · release risks</span><span className="text-right text-xs text-primary">{revision}</span></div>; }

function Preview() {
  const [count, setCount] = useState(2);
  const [full, setFull] = useState(false);
  const [dark, setDark] = useState(false);
  const [selection, onSelectionChange] = useState<WorkGraphSelection>(null);
  const [viewport, onViewportChange] = useState<WorkGraphViewport>({ x: 0, y: 0, zoom: 1 });
  const [view, onViewChange] = useState<WorkActivityPresentation['view']>({ focusedEffortId: null, expandedSourceEfforts: [] });
  const [window, onWindowChange] = useState<WorkActivityPresentation['window']>({ start: at - 15 * 60_000, end: at, following: true });
  const [reference, setReference] = useState('');
  const efforts: WorkActivityPresentation['efforts'] = [
    { id: 'slides', title: 'Sprint review', nodeIds: ['meeting', 'transcript', 'notes', 'generation', 'deck'], edgeIds: edges.slice(0, 4).map((item) => item.id), contextNodeIds: ['meeting', 'notes'] },
    { id: 'coverage', title: 'Coverage checks', nodeIds: ['item', 'terminal'], edgeIds: ['item-terminal'] },
    { id: 'a11y', title: 'Accessibility', nodeIds: ['a11y'], edgeIds: [] },
    { id: 'writing', title: 'API notes', nodeIds: ['write'], edgeIds: [] },
    { id: 'build', title: 'Preview build', nodeIds: ['build'], edgeIds: [] },
  ].slice(0, count);
  const activeIds = new Set(efforts.flatMap((effort) => effort.nodeIds));
  const activity: WorkActivityPresentation = {
    efforts, mode: full ? 'full' : 'split', window, onWindowChange, view, onViewChange, bounds: { start: at - 102 * 60_000, end: at }, temporalMode: 'recent', activeEdgeIds: ['generation-deck', 'item-terminal'],
    events: [12, 30, 55, 88, 95, 100].map((minutes, index) => ({ at: at - minutes * 60_000, count: index + 1 })),
    details: {
      meeting: { emphasis: 'earlier' }, transcript: { emphasis: 'input' }, notes: { emphasis: 'earlier' }, item: { emphasis: 'input' },
      generation: { fresh: true, tools: ['Slides', 'Charts', 'Files'] }, terminal: { fresh: true }, a11y: { fresh: false }, build: { fresh: true },
      deck: { fresh: true, attentionLabel: 'Connor is reviewing v2', feedbackCount: 2, artifact: { revisions: [{ id: 'v1', label: 'v1', createdAt: timestamp, preview: <Slide revision="v1" /> }, { id: 'v2', label: 'v2', createdAt: timestamp, preview: <Slide revision="v2" /> }], pending: { id: 'v3', label: 'v3', status: 'generating' } } },
    },
    onFeedback: (target) => { setFull(false); setReference(JSON.stringify(target)); },
  };
  return <main className={`${dark ? 'dark' : ''} flex h-screen flex-col bg-surface-panel font-sans text-text-primary`}>
    <header className="flex shrink-0 flex-wrap items-center gap-3 border-b border-border bg-surface p-3 text-sm"><strong>Active Now · component fixtures</strong><span className="text-text-secondary">Sample data · fixed clock · no messages sent</span><Select size="sm" aria-label="Fixture activities" className="w-auto" options={[2, 3, 5].map((value) => ({ value: String(value), label: `${value} activities` }))} value={String(count)} onChange={(event) => { setCount(Number(event.target.value)); onViewChange({ ...view, focusedEffortId: null }); }} /><Button size="sm" variant="secondary" onClick={() => setFull(!full)}>{full ? 'Split size' : 'Full size'}</Button><Button size="sm" variant="secondary" onClick={() => setDark(!dark)}>Theme</Button></header>
    <div className={full ? 'min-h-0 flex-1 p-3' : 'ml-auto min-h-0 w-[min(100%,920px)] flex-1 p-3'}><ChatSidePanelFrame title="Connor’s activity" subtitle="Today · sharing with you" onClose={() => onSelectionChange(null)} onToggleExpanded={() => setFull(!full)} expanded={full}>
      <WorkGraph nodes={nodes.filter((item) => activeIds.has(item.id))} edges={edges} selection={selection} viewport={viewport} onSelectionChange={onSelectionChange} onViewportChange={onViewportChange} activity={activity} timezone="America/New_York" onReference={(target) => { setFull(false); setReference(JSON.stringify(target)); }} />
    </ChatSidePanelFrame></div>
    {reference && <output className="shrink-0 border-t border-border bg-surface px-3 py-2 text-sm">Fixture draft attachment: {reference}</output>}
  </main>;
}
createRoot(document.getElementById('root')!).render(<Preview />);
