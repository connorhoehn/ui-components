// GraphSearchBox — find a person (name/title/department) or a skill and jump
// the org graph to them. A combobox over `searchGraph`: arrow keys move the
// cursor, Enter picks, Escape clears, and a query with no match says so
// instead of silently showing nothing.

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import { Input } from '../../forms/Input';
import EmptyState from '../../shared/EmptyState';
import { SuggestionRow } from '../../shared/SuggestionRow';
import { Stack } from '../../ui/Stack';
import { OverlineLabel } from './graphOverlay';
import { searchGraph } from './graphInsights';
import type { GraphPerson } from './types';

export interface GraphSearchBoxProps {
  people: GraphPerson[];
  /** Single-person pick — select + focus + open detail. */
  onPickPerson: (id: string) => void;
  /** Skill pick — select everyone holding the skill. */
  onPickSkill: (skill: string, personIds: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function GraphSearchBox({
  people, onPickPerson, onPickSkill, placeholder = 'Find a person or skill…', className,
}: GraphSearchBoxProps) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const listId = `graph-search-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const { personMatches, skillMatches } = useMemo(() => searchGraph(people, q), [q, people]);
  const totalRows = personMatches.length + skillMatches.length;
  const hasQuery = q.trim().length > 0;

  function pick(index: number) {
    if (index < personMatches.length) {
      const p = personMatches[index];
      if (!p) return;
      onPickPerson(p.id);
    } else {
      const s = skillMatches[index - personMatches.length];
      if (!s) return;
      onPickSkill(s.skill, s.personIds);
    }
    setQ('');
    setOpen(false);
    setHighlight(0);
  }

  const expanded = open && hasQuery && totalRows > 0;

  return (
    <Stack ref={rootRef} gap="none" className={cn('relative', className)} data-testid="graph-search-box">
      <Input
        type="search"
        role="combobox"
        aria-expanded={expanded}
        aria-controls={expanded ? listId : undefined}
        aria-activedescendant={expanded ? `${listId}-${highlight}` : undefined}
        aria-autocomplete="list"
        aria-label="Find a person or skill"
        placeholder={placeholder}
        value={q}
        className="w-[210px] rounded-full"
        onChange={(e) => { setQ(e.target.value); setOpen(true); setHighlight(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight((h) => Math.min(h + 1, totalRows - 1)); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight((h) => Math.max(h - 1, 0)); }
          else if (e.key === 'Enter' && totalRows > 0) { e.preventDefault(); pick(highlight); }
          else if (e.key === 'Escape') { setOpen(false); setQ(''); }
        }}
      />

      {expanded && (
        <Stack
          gap="none"
          role="listbox"
          id={listId}
          aria-label="Matches"
          className="absolute left-0 top-[calc(100%+6px)] z-[120] max-h-[340px] w-[290px] overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-md"
        >
          {personMatches.map((p, i) => (
            <SuggestionRow
              key={p.id}
              id={`${listId}-${i}`}
              active={highlight === i}
              onHighlight={() => setHighlight(i)}
              onPick={() => pick(i)}
              primary={p.name}
              secondary={`${p.title} · ${p.department}`}
            />
          ))}

          {skillMatches.length > 0 && (
            <Stack gap="none" className="px-3 pb-1 pt-1.5" role="presentation">
              <OverlineLabel>Skills</OverlineLabel>
            </Stack>
          )}
          {skillMatches.map((s, j) => {
            const i = personMatches.length + j;
            return (
              <SuggestionRow
                key={s.skill}
                id={`${listId}-${i}`}
                active={highlight === i}
                onHighlight={() => setHighlight(i)}
                onPick={() => pick(i)}
                primary={s.skill}
                secondary={`${s.personIds.length} people`}
              />
            );
          })}
        </Stack>
      )}

      {open && hasQuery && totalRows === 0 && (
        <Stack
          role="status"
          className="absolute left-0 top-[calc(100%+6px)] z-[120] w-[290px] rounded-lg border border-border bg-surface shadow-md"
        >
          <EmptyState
            size="sm"
            title={`No matches for "${q}"`}
            body="Try a different name, title, department, or skill."
            actionLabel="Clear search"
            onAction={() => { setQ(''); setOpen(false); }}
          />
        </Stack>
      )}
    </Stack>
  );
}
