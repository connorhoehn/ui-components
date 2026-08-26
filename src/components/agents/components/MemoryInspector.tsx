import { useState } from 'react';
import { cn } from '../../../lib/cn';
import { Input } from '../../forms/Input';

export interface MemoryEntry {
  id: string;
  scope: 'session' | 'long-term';
  namespace?: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt?: string;
  ttl?: number;
}

interface MemoryInspectorProps {
  entries: MemoryEntry[];
  className?: string;
  onDelete?: (id: string) => void;
}

export function MemoryInspector({ entries, className, onDelete }: MemoryInspectorProps) {
  const [filter, setFilter] = useState<'all' | 'session' | 'long-term'>('all');
  const [search, setSearch] = useState('');

  const filtered = entries.filter((e) => {
    if (filter !== 'all' && e.scope !== filter) return false;
    if (search && !e.key.toLowerCase().includes(search.toLowerCase()) && !e.value.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sessionCount = entries.filter((e) => e.scope === 'session').length;
  const longTermCount = entries.filter((e) => e.scope === 'long-term').length;

  return (
    <div className={cn('border border-border rounded-lg overflow-hidden bg-surface', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-surface-panel">
        <span className="text-xs font-medium text-text-primary">Memory Inspector</span>
        <span className="text-[10px] text-text-tertiary">
          {sessionCount} session · {longTermCount} long-term
        </span>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border-subtle">
        <Input
          aria-label="Search keys/values"
          size="sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search keys/values..."
          className="flex-1 text-[11px]"
        />
        <div className="flex text-[10px] border border-border rounded overflow-hidden">
          {(['all', 'session', 'long-term'] as const).map((f) => (
            <button
              key={f}
              className={cn(
                'px-2 py-0.5 transition-colors',
                filter === f ? 'bg-info text-white' : 'text-neutral hover:bg-surface-hover',
              )}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="px-3 py-6 text-center text-xs text-text-tertiary">
          {entries.length === 0 ? 'No memory entries' : 'No matches'}
        </div>
      ) : (
        <div className="max-h-[300px] overflow-y-auto divide-y divide-border-subtle">
          {filtered.map((entry) => (
            <div key={entry.id} className="px-3 py-2 group">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'text-[9px] uppercase px-1 py-0.5 rounded font-medium',
                      entry.scope === 'session' ? 'bg-info-bg text-info-fg' : 'bg-accent-bg text-accent-fg',
                    )}
                  >
                    {entry.scope}
                  </span>
                  {entry.namespace && (
                    <span className="text-[10px] text-text-tertiary font-mono">{entry.namespace}/</span>
                  )}
                  <span className="text-[11px] font-medium text-text-primary font-mono">{entry.key}</span>
                </div>
                {onDelete && (
                  <button
                    // focus-visible, not just hover: the delete control was opacity-0 with
                    // only a group-hover reveal, so tabbing to it focused an
                    // invisible button.
                    className="text-[10px] text-danger-fg hover:text-danger-fg opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                    onClick={() => onDelete(entry.id)}
                  >
                    delete
                  </button>
                )}
              </div>
              <pre className="text-[11px] text-text-secondary font-mono whitespace-pre-wrap break-all max-h-[60px] overflow-y-auto">
                {formatValue(entry.value)}
              </pre>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text-tertiary">
                <span>Created {formatTimestamp(entry.createdAt)}</span>
                {entry.ttl && <span>· TTL {entry.ttl}s</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatValue(str: string): string {
  try {
    return JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return str;
  }
}

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}
