import { useState } from 'react';
import { cn } from '../../../lib/cn';

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
    <div className={cn('border border-slate-200 rounded-lg overflow-hidden bg-white', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-slate-50">
        <span className="text-xs font-medium text-slate-700">Memory Inspector</span>
        <span className="text-[10px] text-slate-400">
          {sessionCount} session · {longTermCount} long-term
        </span>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search keys/values..."
          className="flex-1 text-[11px] px-2 py-1 border border-slate-200 rounded outline-none focus:border-blue-400"
        />
        <div className="flex text-[10px] border border-slate-200 rounded overflow-hidden">
          {(['all', 'session', 'long-term'] as const).map((f) => (
            <button
              key={f}
              className={cn(
                'px-2 py-0.5 transition-colors',
                filter === f ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-slate-100',
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
        <div className="px-3 py-6 text-center text-xs text-slate-400">
          {entries.length === 0 ? 'No memory entries' : 'No matches'}
        </div>
      ) : (
        <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-100">
          {filtered.map((entry) => (
            <div key={entry.id} className="px-3 py-2 group">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'text-[9px] uppercase px-1 py-0.5 rounded font-medium',
                      entry.scope === 'session' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700',
                    )}
                  >
                    {entry.scope}
                  </span>
                  {entry.namespace && (
                    <span className="text-[10px] text-slate-400 font-mono">{entry.namespace}/</span>
                  )}
                  <span className="text-[11px] font-medium text-slate-700 font-mono">{entry.key}</span>
                </div>
                {onDelete && (
                  <button
                    className="text-[10px] text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onDelete(entry.id)}
                  >
                    delete
                  </button>
                )}
              </div>
              <pre className="text-[11px] text-slate-600 font-mono whitespace-pre-wrap break-all max-h-[60px] overflow-y-auto">
                {formatValue(entry.value)}
              </pre>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
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
