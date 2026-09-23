import { useId, useState } from 'react';
import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import { Tabs, TabPanel } from '../../shared/Tabs';
import { Input } from '../../forms/Input';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { CloseIcon } from '../../ui/Icons';
import { WorkArtifactInspector, resolveArtifactSelection } from './WorkArtifactInspector';
import { WorkComputePane } from './WorkComputePane';
import type {
  WorkActivityAsk, WorkActivityAskAnswer, WorkActivityBanner, WorkActivityNodeDetail,
  WorkActivityReference, WorkGraphNodeData, WorkGraphSelection,
} from './types';

const BANNER_TONE = {
  info: { card: 'border-info-border bg-info-bg', dot: 'bg-info', title: 'text-info-fg' },
  success: { card: 'border-success-border bg-success-bg', dot: 'bg-success', title: 'text-success-fg' },
  error: { card: 'border-danger-border bg-danger-bg', dot: 'bg-danger', title: 'text-danger-fg' },
} as const;

/** The state line a detail pane opens with. One dot, one claim, one qualifier. */
export function WorkPaneBanner({ banner }: { banner: WorkActivityBanner }) {
  const tone = BANNER_TONE[banner.tone];
  return (
    <div role="status" className={cn('flex gap-2 rounded-md border p-2.5', tone.card)} data-testid="work-pane-banner" data-tone={banner.tone}>
      <span aria-hidden="true" className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', tone.dot)} />
      <span className="min-w-0">
        <span className={cn('block text-[13px] font-semibold', tone.title)}>{banner.title}</span>
        {banner.description && <span className="block text-xs text-text-secondary">{banner.description}</span>}
      </span>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h3 className="text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">{label}</h3>
      {children}
    </section>
  );
}

function ReferenceRow({ item, onSelect }: { item: WorkActivityReference; onSelect?: (selection: Exclude<WorkGraphSelection, null>) => void }) {
  const body = (
    <>
      <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-info-bg text-[11px] text-info-fg">▤</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-text-primary">{item.title}</span>
        {item.meta && <span className="block truncate text-xs text-text-tertiary">{item.meta}</span>}
      </span>
      {item.selection && onSelect && <span aria-hidden="true" className="shrink-0 text-text-tertiary">↗</span>}
    </>
  );
  if (!item.selection || !onSelect) return <div className="flex gap-2 rounded-md border border-border p-2">{body}</div>;
  return (
    <button type="button" className="flex w-full gap-2 rounded-md border border-border p-2 text-left hover:border-border-emphasis focus-visible:outline-2 focus-visible:outline-primary" onClick={() => onSelect(item.selection!)}>
      {body}
    </button>
  );
}

/** Transcript rows and the host-owned Ask exchange. Never invents an answer. */
export function WorkTranscriptPanel({ transcript, onSelect }: {
  transcript: NonNullable<WorkActivityNodeDetail['transcript']>;
  onSelect?: (selection: Exclude<WorkGraphSelection, null>) => void;
}) {
  const tabsId = useId();
  const [tab, setTab] = useState('transcript');
  const ask = transcript.ask;
  return (
    <div className="space-y-3" data-testid="work-transcript-panel">
      <Tabs idPrefix={tabsId} aria-label="Transcript views" variant="underline" size="sm" value={tab} onValueChange={setTab} items={[{ id: 'transcript', label: 'Transcript' }, ...(ask ? [{ id: 'ask', label: 'Ask' }] : [])]} />
      <TabPanel idPrefix={tabsId} id="transcript" when={tab} className="space-y-3">
        {transcript.segments.map((segment) => (
          <div key={segment.id} className="space-y-0.5">
            <p className="flex items-baseline gap-2 text-xs"><span className="tabular-nums text-text-tertiary">{segment.at}</span><span className="font-semibold text-text-primary">{segment.speaker}</span></p>
            <p className="text-[13px] leading-snug text-text-secondary">{segment.text}</p>
          </div>
        ))}
        {!transcript.segments.length && <p className="text-sm text-text-secondary">No transcript rows are shared with you.</p>}
      </TabPanel>
      {ask && <TabPanel idPrefix={tabsId} id="ask" when={tab}><AskPanel ask={ask} onSelect={onSelect} /></TabPanel>}
    </div>
  );
}

function AskPanel({ ask, onSelect }: { ask: WorkActivityAsk; onSelect?: (selection: Exclude<WorkGraphSelection, null>) => void }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<WorkActivityAskAnswer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  if (!ask.enabled) return <p className="text-sm text-text-secondary">{ask.unavailableLabel ?? 'Ask is unavailable for this transcript.'}</p>;
  const submit = async () => {
    if (!question.trim() || busy) return;
    setBusy(true); setError(null);
    try { setAnswer(await ask.onAsk(question.trim())); }
    catch { setAnswer(null); setError('That question could not be answered right now.'); }
    finally { setBusy(false); }
  };
  return (
    <div className="space-y-2">
      <label className="block text-xs text-text-secondary" htmlFor="work-ask-input">Ask this transcript</label>
      <div className="flex gap-1.5">
        <Input id="work-ask-input" size="sm" className="flex-1" placeholder={ask.placeholder ?? 'Anything for me?'} value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void submit(); }} />
        <Button size="sm" variant="primary" disabled={busy || !question.trim()} onClick={() => void submit()}>Ask</Button>
      </div>
      {error && <p role="status" className="text-xs text-danger-fg">{error}</p>}
      {answer && (
        <div className="space-y-2 rounded-md border border-border p-2.5" data-testid="work-ask-answer">
          <p className="text-[13px] leading-snug text-text-primary">{answer.text}</p>
          {!!answer.citations?.length && (
            <div className="flex flex-wrap gap-1.5">
              {answer.citations.map((citation) => citation.selection && onSelect
                ? <Button key={citation.id} size="sm" variant="secondary" onClick={() => onSelect(citation.selection!)}>{citation.label} ↗</Button>
                : <Chip key={citation.id} size="sm">{citation.label}</Chip>)}
            </div>
          )}
          {answer.note && <p className="text-[11px] text-text-tertiary">{answer.note}</p>}
        </div>
      )}
    </div>
  );
}

/** Whitespace- and case-folded, so "Gateway · Coverage checks" matches "gateway ·  coverage checks". */
function fold(text: string): string {
  return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

/** A detail line identical to, or contained in, text the pane already shows. */
function alreadySaid(line: string, said: ReadonlyArray<string | undefined>): boolean {
  const needle = fold(line);
  if (!needle) return true;
  // Containment only for a line with some substance: "v2" inside a subtitle
  // is a coincidence, "Gateway · Coverage checks" inside one is a repeat.
  return said.some((text) => !!text && (fold(text) === needle || (needle.length >= 8 && fold(text).includes(needle))));
}

export interface WorkNodePaneProps {
  node: WorkGraphNodeData;
  detail?: WorkActivityNodeDetail;
  selection: Extract<WorkGraphSelection, { kind: 'node' }>;
  onSelectionChange: (selection: WorkGraphSelection) => void;
  onClose: () => void;
  onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
  onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * The detail pane for one selected node: chrome, a state banner, whichever
 * bodies the host supplied data for, and one way to carry the thing back into
 * the conversation. Composition rather than a kind switch — a node that has an
 * artifact AND sources gets both, and a node the viewer may only see the
 * existence of gets chrome and an honest empty body.
 */
export function WorkNodePane({
  node, detail, selection, onSelectionChange, onClose, onOpen, onReference, className, 'data-testid': testId = 'activity-inspector',
}: WorkNodePaneProps) {
  const restricted = node.locked || node.disclosure === 'existence';
  const visible = restricted ? undefined : detail;
  const title = node.locked ? 'Restricted work item' : node.title;
  const sections = visible?.sections;
  // Referencing carries the exact revision and page on screen, never "latest".
  const resolved = visible?.artifact ? resolveArtifactSelection(visible.artifact, selection) : undefined;
  const referenceTarget: Exclude<WorkGraphSelection, null> = resolved?.revision
    ? { ...selection, revisionId: resolved.revision.id, anchorId: resolved.slide?.id ?? selection.anchorId ?? resolved.revision.anchorId }
    : { ...selection };
  // A compute session owns the banner slot: its own card says the state in the
  // words this kind of node has ("Flaky test triage · auth-migration-3 ·
  // AgentCore microVM · started 09:15"), and a second banner above it would
  // say the same thing twice.
  const compute = visible?.compute;
  // The card's own body — the lines and the verbatim excerpt the host already
  // authorized — belongs in the pane too: a composer edit's instruction, its
  // scope and "v6 → v7" were on the card and nowhere in the pane that is
  // supposed to say MORE. Kinds with their own inspector (an artifact, a
  // transcript, a compute session) already show that state their own way, and
  // a line the banner already says is not repeated under it.
  const ownInspector = !!compute || !!visible?.artifact || !!visible?.transcript;
  // Nor is a line the description, the subtitle or the excerpt already says —
  // WORK-144's "Gateway · Coverage checks" was both its description and a line.
  const said = [visible?.banner?.title, visible?.banner?.description, sections?.description, visible?.subtitle, visible?.excerpt];
  const bodyLines = ownInspector
    ? []
    : (visible?.lines ?? []).filter((line, index, all) => all.indexOf(line) === index && !alreadySaid(line, said));
  const excerpt = ownInspector ? undefined : visible?.excerpt;
  const empty = !compute && !visible?.banner && !visible?.artifact && !visible?.transcript && !sections && !visible?.note && !visible?.actions?.length && !excerpt && bodyLines.length === 0;
  return (
    <section aria-label={title} data-testid={testId} className={cn('flex h-full min-h-0 flex-col border-l border-border bg-surface', className)}>
      <header className="flex shrink-0 items-start justify-between gap-2 border-b border-border px-3 py-2">
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-text-primary" data-testid={`${testId}-title`}>{title}</span>
          {visible?.subtitle && <span className="truncate text-xs text-text-tertiary" data-testid={`${testId}-subtitle`}>{visible.subtitle}</span>}
        </span>
        <IconButton size="md" aria-label="Close details" onClick={onClose} data-testid={`${testId}-close`} className="shrink-0"><CloseIcon /></IconButton>
      </header>
      <div className="min-h-0 flex-1 space-y-4 overflow-auto p-3">
        {!compute && visible?.banner && <WorkPaneBanner banner={visible.banner} />}
        {compute && <WorkComputePane compute={compute} {...(visible?.banner ? { banner: visible.banner } : {})} />}
        {excerpt && <p className="text-[13px] italic leading-snug text-text-primary" data-testid={`${testId}-excerpt`}>{`“${excerpt}”`}</p>}
        {bodyLines.length > 0 && (
          <ul className="space-y-0.5 text-[13px] leading-snug text-text-secondary" data-testid={`${testId}-lines`}>
            {bodyLines.map((line, index) => <li key={`${index}-${line}`}>{line}</li>)}
          </ul>
        )}
        {sections?.description && <p className="text-[13px] leading-snug text-text-secondary">{sections.description}</p>}
        {visible?.artifact && <WorkArtifactInspector node={node} artifact={visible.artifact} selection={selection} onSelectionChange={onSelectionChange} onOpen={onOpen} quiet={!!visible.banner} />}
        {visible?.transcript && <WorkTranscriptPanel transcript={visible.transcript} onSelect={onSelectionChange} />}
        {!!sections?.inputs?.length && (
          <Section label="Inputs">
            <div className="flex flex-wrap gap-1.5">
              {sections.inputs.map((item, index) => typeof item === 'string'
                // Two inputs may legitimately read the same; the position keeps
                // them apart when the host has no id to give.
                ? <Chip key={`${index}-${item}`} size="sm">{item}</Chip>
                : <Chip key={item.id} size="sm" title={item.meta}>{item.title}</Chip>)}
            </div>
          </Section>
        )}
        {!!sections?.tools?.length && <Section label="Tools in this run"><div className="flex flex-wrap gap-1.5">{sections.tools.map((item, index) => <Chip key={`${index}-${item}`} size="sm" tone="info">{item}</Chip>)}</div></Section>}
        {!!sections?.sources?.length && <Section label="Sources used"><div className="space-y-1.5">{sections.sources.map((item) => <ReferenceRow key={item.id} item={item} onSelect={onSelectionChange} />)}</div></Section>}
        {sections?.workItem && <Section label="Work item"><ReferenceRow item={sections.workItem} onSelect={onSelectionChange} /></Section>}
        {!!visible?.actions?.length && (
          <div className="flex flex-wrap gap-2">
            {visible.actions.map((action) => <Button key={action.id} size="sm" variant="secondary" onClick={() => { action.onSelect?.(); if (action.selection) onSelectionChange(action.selection); }}>{action.label}</Button>)}
          </div>
        )}
        {visible?.note && <p className="text-xs leading-snug text-text-tertiary">{visible.note}</p>}
        {empty && <p className="text-sm text-text-secondary">{restricted ? 'Only the existence of this work is shared with you.' : 'No further detail is shared with you.'}</p>}
      </div>
      {onReference && !restricted && (
        <div className="shrink-0 border-t border-border p-2">
          <Button size="sm" variant="secondary" fullWidth onClick={() => onReference(referenceTarget)}>Reference in chat</Button>
        </div>
      )}
    </section>
  );
}
