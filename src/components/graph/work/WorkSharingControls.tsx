import { useId } from 'react';
import { Button } from '../../ui/Button';
import { Checkbox } from '../../forms/Checkbox';
import { Input } from '../../forms/Input';
import { InlineAlert } from '../../shared/InlineAlert';
import type {
  WorkGraphDisclosure,
  WorkGraphEdgeData,
  WorkGraphNodeData,
  WorkSharingControlsProps,
  WorkSharingFormValue,
} from './types';

const DISCLOSURES: Array<{ value: WorkGraphDisclosure; label: string }> = [
  { value: 'existence', label: 'Existence only' },
  { value: 'summary', label: 'Summary' },
  { value: 'details', label: 'Details' },
];

function nodeLabel(node: WorkGraphNodeData): string {
  return node.locked ? 'Restricted work item' : (node.title.trim() || 'Untitled work item');
}

function edgeLabel(edge: WorkGraphEdgeData): string {
  return edge.label?.trim() || `${edge.relation} relationship`;
}

function withSelection(
  value: WorkSharingFormValue,
  field: 'selectedNodeIds' | 'selectedEdgeIds',
  id: string,
  checked: boolean,
): WorkSharingFormValue {
  const selected = value[field];
  return {
    ...value,
    [field]: checked
      ? (selected.includes(id) ? selected : [...selected, id])
      : selected.filter((selectedId) => selectedId !== id),
  };
}

function audienceDescription(value: WorkSharingFormValue): string[] {
  if (value.audience.kind === 'organization') return ['Everyone in your organization'];
  if (value.audience.kind === 'people') return value.audience.personIds;
  return value.audience.conversationIds;
}

export function WorkSharingControls({
  state,
  value,
  availableNodes,
  availableEdges,
  saving = false,
  error,
  conflict = false,
  onChange,
  onStart,
  onPause,
  onResume,
  onStop,
}: WorkSharingControlsProps) {
  const idPrefix = useId();
  const audience = audienceDescription(value);
  const stateLabel = state === 'off' ? 'Off' : state.charAt(0).toUpperCase() + state.slice(1);

  return (
    <section aria-labelledby="work-sharing-heading" className="space-y-5 rounded-lg border border-border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 id="work-sharing-heading" className="text-base font-semibold text-text-primary">Share work activity</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Sharing is voluntary. Only the audience, work, relationships, and detail selected here are shared.
          </p>
        </div>
        <span className="rounded-full border border-border bg-surface-inset px-2.5 py-1 text-xs font-medium text-text-secondary">
          {stateLabel}
        </span>
      </div>

      {error ? <InlineAlert tone="error">{error}</InlineAlert> : null}
      {conflict ? (
        <InlineAlert tone="warning">
          Sharing changed elsewhere. Review the current settings before trying again.
        </InlineAlert>
      ) : null}
      {saving ? <p role="status" aria-live="polite" className="text-sm text-text-secondary">Saving sharing settings…</p> : null}

      <fieldset disabled={saving} className="space-y-2">
        <legend className="text-sm font-semibold text-text-primary">Audience</legend>
        <p className="text-xs text-text-tertiary">
          {value.audience.kind === 'people'
            ? 'Selected people'
            : value.audience.kind === 'conversation'
              ? 'Selected conversations'
              : 'Organization'}
        </p>
        {audience.length > 0 ? (
          <ul aria-label="Current sharing audience" className="flex flex-wrap gap-2">
            {audience.map((entry) => (
              <li key={entry} className="max-w-full break-all rounded-md border border-border bg-surface-inset px-2 py-1 text-xs text-text-secondary">
                {entry}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-text-secondary">No audience selected.</p>
        )}
        <p className="text-xs text-text-tertiary">Audience choices are provided by the host application.</p>
      </fieldset>

      <fieldset disabled={saving} className="space-y-2">
        <legend className="text-sm font-semibold text-text-primary">Work items</legend>
        {availableNodes.length === 0 ? <p className="text-sm text-text-secondary">No work items are available.</p> : (
          <div className="space-y-2">
            {availableNodes.map((node) => {
              const id = `${idPrefix}-node-${node.id}`;
              return (
                <label key={node.id} htmlFor={id} className="flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary">
                  <Checkbox
                    id={id}
                    checked={value.selectedNodeIds.includes(node.id)}
                    disabled={saving}
                    onChange={(checked) => onChange(withSelection(value, 'selectedNodeIds', node.id, checked))}
                  />
                  <span className="min-w-0 break-words">
                    <span className="block font-medium">{nodeLabel(node)}</span>
                    <span className="text-xs text-text-tertiary">{node.kind}</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </fieldset>

      <fieldset disabled={saving} className="space-y-2">
        <legend className="text-sm font-semibold text-text-primary">Relationships</legend>
        {availableEdges.length === 0 ? <p className="text-sm text-text-secondary">No relationships are available.</p> : (
          <div className="space-y-2">
            {availableEdges.map((edge) => {
              const id = `${idPrefix}-edge-${edge.id}`;
              return (
                <label key={edge.id} htmlFor={id} className="flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary">
                  <Checkbox
                    id={id}
                    checked={value.selectedEdgeIds.includes(edge.id)}
                    disabled={saving}
                    onChange={(checked) => onChange(withSelection(value, 'selectedEdgeIds', edge.id, checked))}
                  />
                  <span className="min-w-0 break-words">
                    <span className="block font-medium">{edgeLabel(edge)}</span>
                    <span className="text-xs text-text-tertiary">{edge.relation}</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm font-medium text-text-primary">
          <span>Detail shared</span>
          <select
            value={value.disclosure}
            disabled={saving}
            onChange={(event) => onChange({ ...value, disclosure: event.target.value as WorkGraphDisclosure })}
            className="h-9 w-full rounded-md border border-border-emphasis bg-surface-panel px-2.5 text-sm text-text-primary outline-none focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {DISCLOSURES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label className="space-y-1 text-sm font-medium text-text-primary">
          <span>Live sharing expires</span>
          <Input
            type="datetime-local"
            value={value.expiresAt}
            disabled={saving}
            onChange={(event) => onChange({ ...value, expiresAt: event.target.value })}
          />
        </label>
      </div>

      <fieldset disabled={saving} className="space-y-3 rounded-md border border-border p-3">
        <legend className="px-1 text-sm font-semibold text-text-primary">Earlier work</legend>
        <label htmlFor={`${idPrefix}-history`} className="flex items-start gap-2 text-sm text-text-primary">
          <Checkbox
            id={`${idPrefix}-history`}
            checked={value.history !== undefined}
            disabled={saving}
            onChange={(checked) => onChange({
              ...value,
              history: checked ? { dayFrom: '', dayThrough: '', expiresAt: value.expiresAt } : undefined,
            })}
          />
          <span>
            <span className="block font-medium">Share selected history</span>
            <span className="block text-xs text-text-tertiary">Historical work is never included unless you select this option.</span>
          </span>
        </label>
        {value.history ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="space-y-1 text-sm font-medium text-text-primary">
              <span>First day</span>
              <Input type="date" value={value.history.dayFrom} disabled={saving} onChange={(event) => onChange({ ...value, history: { ...value.history!, dayFrom: event.target.value } })} />
            </label>
            <label className="space-y-1 text-sm font-medium text-text-primary">
              <span>Last day</span>
              <Input type="date" value={value.history.dayThrough} disabled={saving} onChange={(event) => onChange({ ...value, history: { ...value.history!, dayThrough: event.target.value } })} />
            </label>
            <label className="space-y-1 text-sm font-medium text-text-primary">
              <span>History access expires</span>
              <Input type="datetime-local" value={value.history.expiresAt} disabled={saving} onChange={(event) => onChange({ ...value, history: { ...value.history!, expiresAt: event.target.value } })} />
            </label>
          </div>
        ) : null}
      </fieldset>

      <div className="flex flex-wrap gap-2">
        {(state === 'off' || state === 'stopped' || state === 'expired') ? (
          <Button disabled={saving} onClick={onStart}>{state === 'off' ? 'Start sharing' : 'Start sharing again'}</Button>
        ) : null}
        {state === 'active' ? <Button variant="secondary" disabled={saving} onClick={onPause}>Pause sharing</Button> : null}
        {state === 'paused' ? <Button disabled={saving} onClick={onResume}>Resume sharing</Button> : null}
        {(state === 'active' || state === 'paused') ? <Button variant="danger" disabled={saving} onClick={onStop}>Stop sharing</Button> : null}
      </div>
    </section>
  );
}

export default WorkSharingControls;
