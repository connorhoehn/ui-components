// The forms for the layouts added in 2.547.0 (the deck engine's 0.152.0
// format): key figures, table, comparison, timeline, agenda and closing.
//
// Built from the same pieces as the older layouts' forms in `SlideForm`:
// `Input` with the engine's character cap as `maxLength`, `FormField` for a
// labelled single field, `SectionLabel` over a list, ghost `Button`s to add a
// row and `IconButton`s to remove one. Every input has an accessible name
// (its `FormField` label, or an `aria-label` naming the row), and every list
// says how many it may hold and stops offering Add at the cap and Remove at
// the floor, so the form cannot produce a count the engine refuses.

import { useState, type ReactNode } from 'react';
import { DeckIconPicker, type DeckIconSource } from './IconPicker';
import { IconSlotButton } from './SlideRichForms';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { Input } from '../../forms/Input';
import { Select } from '../../forms/Select';
import FormField from '../../shared/FormField';
import { SectionLabel } from '../../shared/SectionLabel';
import { Text } from '../../shared/Text';
import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from '../../ui/Table';
import {
  MAX_AGENDA_ITEMS,
  MAX_AGENDA_ITEM_CHARS,
  MAX_CLOSING_LINE_CHARS,
  MAX_COMPARISON_POINTS,
  MAX_COMPARISON_POINT_CHARS,
  MAX_COMPARISON_TITLE_CHARS,
  MAX_CONTACT_CHARS,
  MAX_FIGURES,
  MAX_FIGURE_DELTA_CHARS,
  MAX_FIGURE_LABEL_CHARS,
  MAX_FIGURE_VALUE_CHARS,
  MAX_NEXT_STEPS,
  MAX_NEXT_STEP_CHARS,
  MAX_TABLE_CELL_CHARS,
  MAX_TABLE_COLUMNS,
  MAX_TABLE_ROWS,
  MAX_TIMELINE_DATE_CHARS,
  MAX_TIMELINE_DETAIL_CHARS,
  MAX_TIMELINE_LABEL_CHARS,
  MAX_TIMELINE_STEPS,
  MAX_VERDICT_CHARS,
  MIN_FIGURES,
  MIN_TIMELINE_STEPS,
  type DeckAgenda,
  type DeckClosing,
  type DeckComparison,
  type DeckComparisonSide,
  type DeckFigure,
  type DeckTable,
  type DeckTimelineStep,
} from './deckSpec';

interface EditorBase {
  readOnly: boolean;
  testIdPrefix: string;
}

function RemoveGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
    </svg>
  );
}

/** A list's heading with its count against the cap: "Figures · 2 of 4". */
export function ListHeading({ label, count, max, min, testId }: { label: string; count: number; max: number; min?: number; testId: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <SectionLabel as="div">{label}</SectionLabel>
      <Text size="xs" tone="tertiary" data-testid={testId}>
        {min !== undefined ? `${count} of ${min}–${max}` : `${count} of ${max}`}
      </Text>
    </div>
  );
}

export function RemoveButton({ label, disabled, onClick, testId }: { label: string; disabled?: boolean; onClick: () => void; testId: string }) {
  return (
    <IconButton aria-label={label} variant="ghost" size="sm" icon={<RemoveGlyph />} disabled={disabled} onClick={onClick} data-testid={testId} />
  );
}

export function AddButton({ children, disabled, onClick, testId }: { children: ReactNode; disabled?: boolean; onClick: () => void; testId: string }) {
  return (
    <Button variant="ghost" size="sm" disabled={disabled} onClick={onClick} data-testid={testId} className="self-start">
      {children}
    </Button>
  );
}

export function replaceAt<T>(list: readonly T[], index: number, value: T): T[] {
  const next = list.slice();
  next[index] = value;
  return next;
}

// ---------------------------------------------------------------------------
// A list of short strings (comparison points, agenda items, next steps)
// ---------------------------------------------------------------------------

export function TextListEditor({
  label,
  itemLabel,
  items,
  max,
  maxChars,
  min = 0,
  addLabel,
  onChange,
  readOnly,
  testIdPrefix,
  numbered = false,
}: EditorBase & {
  label: string;
  /** Names one row for a screen reader: `${itemLabel} 2`. */
  itemLabel: string;
  items: readonly string[];
  max: number;
  maxChars: number;
  min?: number;
  addLabel: string;
  onChange: (items: string[]) => void;
  numbered?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1" data-testid={testIdPrefix}>
      <ListHeading label={label} count={items.length} max={max} testId={`${testIdPrefix}-count`} />
      <ol className="m-0 flex list-none flex-col gap-1 p-0">
        {items.map((item, index) => (
          // String arrays have no identity of their own: the index is the key.
          <li key={index} className="flex items-center gap-1">
            <Text size="xs" tone="tertiary" tabular className="w-4 shrink-0 text-right">{numbered ? `${index + 1}.` : '•'}</Text>
            <Input
              value={item}
              maxLength={maxChars}
              disabled={readOnly}
              aria-label={`${itemLabel} ${index + 1}`}
              onChange={(event) => onChange(replaceAt(items, index, event.target.value))}
              data-testid={`${testIdPrefix}-${index}`}
            />
            {!readOnly && (
              <RemoveButton
                label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
                disabled={items.length <= Math.max(min, 0)}
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                testId={`${testIdPrefix}-remove-${index}`}
              />
            )}
          </li>
        ))}
      </ol>
      {!readOnly && (
        <AddButton disabled={items.length >= max} onClick={() => onChange([...items, ''])} testId={`${testIdPrefix}-add`}>
          {addLabel}
        </AddButton>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Key figures
// ---------------------------------------------------------------------------

export function FiguresEditor({ figures, onChange, bounds = [MIN_FIGURES, MAX_FIGURES], icons, readOnly, testIdPrefix }: EditorBase & {
  figures: readonly DeckFigure[];
  onChange: (figures: DeckFigure[]) => void;
  /** The row bounds (since 2.550.0): `[1, 1]` on a big-number slide. Default 2 to 4. */
  bounds?: readonly [number, number];
  /** The icon catalogue (since 2.550.0): an icon slot per figure. */
  icons?: DeckIconSource;
}) {
  const [MIN, MAX] = bounds;
  const [openIcon, setOpenIcon] = useState<number | null>(null);
  const set = (index: number, partial: Partial<DeckFigure>) => {
    const merged: DeckFigure = { ...figures[index]!, ...partial };
    if (!merged.delta) delete merged.delta;
    if (!merged.context) delete merged.context;
    if (!merged.icon) delete merged.icon;
    onChange(replaceAt(figures, index, merged));
  };
  return (
    <div className="flex flex-col gap-1.5" data-testid={testIdPrefix}>
      <ListHeading label="Figures" count={figures.length} min={MIN} max={MAX} testId={`${testIdPrefix}-count`} />
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {figures.map((figure, index) => (
          <li key={index} className="grid grid-cols-1 items-center gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.5fr)_auto_auto]">
            <Input
              value={figure.value}
              maxLength={MAX_FIGURE_VALUE_CHARS}
              placeholder="42%"
              disabled={readOnly}
              aria-label={`Figure ${index + 1} value`}
              onChange={(event) => set(index, { value: event.target.value })}
              data-testid={`${testIdPrefix}-value-${index}`}
            />
            <Input
              value={figure.label}
              maxLength={MAX_FIGURE_LABEL_CHARS}
              placeholder="What it counts"
              disabled={readOnly}
              aria-label={`Figure ${index + 1} label`}
              onChange={(event) => set(index, { label: event.target.value })}
              data-testid={`${testIdPrefix}-label-${index}`}
            />
            <Input
              value={figure.delta ?? ''}
              maxLength={MAX_FIGURE_DELTA_CHARS}
              placeholder="+8 pts (optional)"
              disabled={readOnly}
              aria-label={`Figure ${index + 1} change, optional`}
              onChange={(event) => set(index, { delta: event.target.value })}
              data-testid={`${testIdPrefix}-delta-${index}`}
            />
            <Input
              value={figure.context ?? ''}
              maxLength={MAX_FIGURE_LABEL_CHARS}
              placeholder="vs 71% in Q1 (optional)"
              disabled={readOnly}
              aria-label={`Figure ${index + 1} context, optional`}
              onChange={(event) => set(index, { context: event.target.value })}
              data-testid={`${testIdPrefix}-context-${index}`}
            />
            {icons && (
              <IconSlotButton
                value={figure.icon}
                icons={icons}
                label={`Figure ${index + 1} icon`}
                open={openIcon === index}
                onToggle={() => setOpenIcon(openIcon === index ? null : index)}
                disabled={readOnly}
                testId={`${testIdPrefix}-icon-${index}`}
              />
            )}
            {!readOnly && (
              <RemoveButton
                label={`Remove figure ${index + 1}`}
                disabled={figures.length <= MIN}
                onClick={() => onChange(figures.filter((_, i) => i !== index))}
                testId={`${testIdPrefix}-remove-${index}`}
              />
            )}
            {icons && openIcon === index && !readOnly && (
              <DeckIconPicker
                className="sm:col-span-full"
                items={icons.items}
                icons={icons.icons}
                renderIcon={icons.renderIcon}
                value={figure.icon}
                label={`Icon for figure ${index + 1}`}
                onSelect={(icon) => { set(index, { icon }); setOpenIcon(null); }}
                testIdPrefix={`${testIdPrefix}-icon-picker-${index}`}
              />
            )}
          </li>
        ))}
      </ol>
      {!readOnly && (
        <AddButton
          disabled={figures.length >= MAX}
          onClick={() => onChange([...figures, { value: '', label: '' }])}
          testId={`${testIdPrefix}-add`}
        >
          Add figure
        </AddButton>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------

export function TableEditor({ table, onChange, readOnly, testIdPrefix }: EditorBase & {
  table: DeckTable;
  onChange: (table: DeckTable) => void;
}) {
  const columns = table.header.length;
  const addRow = () => {
    if (table.rows.length >= MAX_TABLE_ROWS) return;
    onChange({ ...table, rows: [...table.rows, table.header.map(() => '')] });
  };
  const removeRow = (rowIndex: number) => {
    if (table.rows.length <= 1) return;
    onChange({ ...table, rows: table.rows.filter((_, i) => i !== rowIndex) });
  };
  const addColumn = () => {
    if (columns >= MAX_TABLE_COLUMNS) return;
    onChange({ header: [...table.header, ''], rows: table.rows.map((row) => [...row, '']) });
  };
  const removeColumn = (columnIndex: number) => {
    if (columns <= 1) return;
    onChange({
      header: table.header.filter((_, i) => i !== columnIndex),
      rows: table.rows.map((row) => row.filter((_, i) => i !== columnIndex)),
    });
  };
  const setCell = (rowIndex: number, columnIndex: number, value: string) => {
    onChange({ ...table, rows: replaceAt(table.rows, rowIndex, replaceAt(table.rows[rowIndex]!, columnIndex, value)) });
  };

  return (
    <div className="flex flex-col gap-1.5" data-testid={testIdPrefix}>
      <div className="flex flex-wrap items-center gap-2">
        <SectionLabel as="div">Table</SectionLabel>
        <Text size="xs" tone="tertiary" data-testid={`${testIdPrefix}-count`}>
          {`${table.rows.length} of ${MAX_TABLE_ROWS} rows · ${columns} of ${MAX_TABLE_COLUMNS} columns · ${MAX_TABLE_CELL_CHARS} characters a cell`}
        </Text>
        {!readOnly && (
          <>
            <Button variant="ghost" size="sm" disabled={table.rows.length >= MAX_TABLE_ROWS} onClick={addRow} data-testid={`${testIdPrefix}-add-row`}>
              Add row
            </Button>
            <Button variant="ghost" size="sm" disabled={columns >= MAX_TABLE_COLUMNS} onClick={addColumn} data-testid={`${testIdPrefix}-add-column`}>
              Add column
            </Button>
          </>
        )}
      </div>
      <div className="overflow-x-auto rounded-md border border-border">
        <Table data-testid={`${testIdPrefix}-grid`}>
          <TableHead>
            <TableRow>
              {table.header.map((cell, columnIndex) => (
                <TableTh key={columnIndex}>
                  <div className="flex items-center gap-1">
                    <Input
                      size="sm"
                      value={cell}
                      maxLength={MAX_TABLE_CELL_CHARS}
                      disabled={readOnly}
                      aria-label={`Column ${columnIndex + 1} heading`}
                      onChange={(event) => onChange({ ...table, header: replaceAt(table.header, columnIndex, event.target.value) })}
                      data-testid={`${testIdPrefix}-header-${columnIndex}`}
                    />
                    {!readOnly && (
                      <RemoveButton
                        label={`Remove column ${columnIndex + 1}`}
                        disabled={columns <= 1}
                        onClick={() => removeColumn(columnIndex)}
                        testId={`${testIdPrefix}-remove-column-${columnIndex}`}
                      />
                    )}
                  </div>
                </TableTh>
              ))}
              {!readOnly && <TableTh><span className="sr-only">Row actions</span></TableTh>}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {table.header.map((_, columnIndex) => (
                  <TableTd key={columnIndex}>
                    <Input
                      size="sm"
                      value={row[columnIndex] ?? ''}
                      maxLength={MAX_TABLE_CELL_CHARS}
                      disabled={readOnly}
                      aria-label={`Row ${rowIndex + 1}, ${table.header[columnIndex] || `column ${columnIndex + 1}`}`}
                      onChange={(event) => setCell(rowIndex, columnIndex, event.target.value)}
                      data-testid={`${testIdPrefix}-cell-${rowIndex}-${columnIndex}`}
                    />
                  </TableTd>
                ))}
                {!readOnly && (
                  <TableTd>
                    <RemoveButton
                      label={`Remove row ${rowIndex + 1}`}
                      disabled={table.rows.length <= 1}
                      onClick={() => removeRow(rowIndex)}
                      testId={`${testIdPrefix}-remove-row-${rowIndex}`}
                    />
                  </TableTd>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Comparison
// ---------------------------------------------------------------------------

export function ComparisonEditor({ comparison, onChange, icons, readOnly, testIdPrefix }: EditorBase & {
  comparison: DeckComparison;
  onChange: (comparison: DeckComparison) => void;
  /** The icon catalogue (since 2.550.0): an icon slot per side. */
  icons?: DeckIconSource;
}) {
  const [openIcon, setOpenIcon] = useState<'left' | 'right' | null>(null);
  const side = (key: 'left' | 'right', name: string) => {
    const value: DeckComparisonSide = comparison[key];
    const setIcon = (icon: string | undefined) => {
      const { icon: _old, ...rest } = value;
      onChange({ ...comparison, [key]: icon ? { ...rest, icon } : rest });
      setOpenIcon(null);
    };
    return (
      <div className="flex flex-col gap-1.5" data-testid={`${testIdPrefix}-${key}`}>
        {icons && (
          <IconSlotButton
            value={value.icon}
            icons={icons}
            label={`${name} side icon`}
            open={openIcon === key}
            onToggle={() => setOpenIcon(openIcon === key ? null : key)}
            disabled={readOnly}
            testId={`${testIdPrefix}-${key}-icon`}
          />
        )}
        {icons && openIcon === key && !readOnly && (
          <DeckIconPicker
            items={icons.items}
            icons={icons.icons}
            renderIcon={icons.renderIcon}
            value={value.icon}
            label={`Icon for the ${name.toLowerCase()} side`}
            onSelect={setIcon}
            testIdPrefix={`${testIdPrefix}-${key}-icon-picker`}
          />
        )}
        <FormField label={`${name} side title`}>
          {(wiring) => (
            <Input
              {...wiring}
              value={value.title}
              maxLength={MAX_COMPARISON_TITLE_CHARS}
              disabled={readOnly}
              onChange={(event) => onChange({ ...comparison, [key]: { ...value, title: event.target.value } })}
              data-testid={`${testIdPrefix}-${key}-title`}
            />
          )}
        </FormField>
        <TextListEditor
          label={`${name} points`}
          itemLabel={`${name} point`}
          items={value.points}
          min={1}
          max={MAX_COMPARISON_POINTS}
          maxChars={MAX_COMPARISON_POINT_CHARS}
          addLabel="Add point"
          onChange={(points) => onChange({ ...comparison, [key]: { ...value, points } })}
          readOnly={readOnly}
          testIdPrefix={`${testIdPrefix}-${key}-points`}
        />
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-3" data-testid={testIdPrefix}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {side('left', 'Left')}
        {side('right', 'Right')}
      </div>
      <FormField label="Verdict" hint={`Optional: the line that settles it. Up to ${MAX_VERDICT_CHARS} characters.`}>
        {(wiring) => (
          <Input
            {...wiring}
            value={comparison.verdict ?? ''}
            maxLength={MAX_VERDICT_CHARS}
            disabled={readOnly}
            onChange={(event) => {
              const { verdict: _drop, ...rest } = comparison;
              onChange(event.target.value ? { ...rest, verdict: event.target.value } : rest);
            }}
            data-testid={`${testIdPrefix}-verdict`}
          />
        )}
      </FormField>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

export function TimelineEditor({ steps, onChange, readOnly, testIdPrefix }: EditorBase & {
  steps: readonly DeckTimelineStep[];
  onChange: (steps: DeckTimelineStep[]) => void;
}) {
  const set = (index: number, partial: Partial<DeckTimelineStep>) => {
    const merged: DeckTimelineStep = { ...steps[index]!, ...partial };
    if (!merged.detail) delete merged.detail;
    onChange(replaceAt(steps, index, merged));
  };
  return (
    <div className="flex flex-col gap-1.5" data-testid={testIdPrefix}>
      <ListHeading label="Steps" count={steps.length} min={MIN_TIMELINE_STEPS} max={MAX_TIMELINE_STEPS} testId={`${testIdPrefix}-count`} />
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {steps.map((step, index) => (
          <li key={index} className="grid grid-cols-1 items-center gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,3fr)_auto]">
            <Input
              value={step.date}
              maxLength={MAX_TIMELINE_DATE_CHARS}
              placeholder="Mar 2027"
              disabled={readOnly}
              aria-label={`Step ${index + 1} date`}
              onChange={(event) => set(index, { date: event.target.value })}
              data-testid={`${testIdPrefix}-date-${index}`}
            />
            <Input
              value={step.label}
              maxLength={MAX_TIMELINE_LABEL_CHARS}
              placeholder="What happens"
              disabled={readOnly}
              aria-label={`Step ${index + 1} label`}
              onChange={(event) => set(index, { label: event.target.value })}
              data-testid={`${testIdPrefix}-label-${index}`}
            />
            <Input
              value={step.detail ?? ''}
              maxLength={MAX_TIMELINE_DETAIL_CHARS}
              placeholder="Detail (optional)"
              disabled={readOnly}
              aria-label={`Step ${index + 1} detail, optional`}
              onChange={(event) => set(index, { detail: event.target.value })}
              data-testid={`${testIdPrefix}-detail-${index}`}
            />
            {!readOnly && (
              <RemoveButton
                label={`Remove step ${index + 1}`}
                disabled={steps.length <= MIN_TIMELINE_STEPS}
                onClick={() => onChange(steps.filter((_, i) => i !== index))}
                testId={`${testIdPrefix}-remove-${index}`}
              />
            )}
          </li>
        ))}
      </ol>
      {!readOnly && (
        <AddButton
          disabled={steps.length >= MAX_TIMELINE_STEPS}
          onClick={() => onChange([...steps, { date: '', label: '' }])}
          testId={`${testIdPrefix}-add`}
        >
          Add step
        </AddButton>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Agenda
// ---------------------------------------------------------------------------

export function AgendaEditor({ agenda, onChange, readOnly, testIdPrefix }: EditorBase & {
  agenda: DeckAgenda;
  onChange: (agenda: DeckAgenda) => void;
}) {
  const setItems = (items: string[]) => {
    // Removing the current item, or one above it, keeps `current` on the same
    // words or clears it; it never points past the end.
    let current = agenda.current;
    if (current !== undefined && current >= items.length) current = undefined;
    onChange(current === undefined ? { items } : { items, current });
  };
  return (
    <div className="flex flex-col gap-2" data-testid={testIdPrefix}>
      <TextListEditor
        label="Agenda items"
        itemLabel="Agenda item"
        items={agenda.items}
        min={1}
        max={MAX_AGENDA_ITEMS}
        maxChars={MAX_AGENDA_ITEM_CHARS}
        addLabel="Add item"
        numbered
        onChange={setItems}
        readOnly={readOnly}
        testIdPrefix={`${testIdPrefix}-items`}
      />
      <FormField label="Current item" hint="Optional: marks where the talk is." className="sm:w-64">
        {(wiring) => (
          <Select
            {...wiring}
            size="sm"
            value={agenda.current === undefined ? '' : String(agenda.current)}
            disabled={readOnly}
            options={[
              { value: '', label: 'None' },
              ...agenda.items.map((item, index) => ({ value: String(index), label: `${index + 1}. ${item || 'Untitled item'}` })),
            ]}
            onChange={(event) => {
              const raw = event.target.value;
              onChange(raw === '' ? { items: agenda.items } : { items: agenda.items, current: Number(raw) });
            }}
            data-testid={`${testIdPrefix}-current`}
          />
        )}
      </FormField>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Closing
// ---------------------------------------------------------------------------

export function ClosingEditor({ closing, onChange, readOnly, testIdPrefix }: EditorBase & {
  closing: DeckClosing;
  onChange: (closing: DeckClosing) => void;
}) {
  const patch = (partial: Partial<DeckClosing>) => {
    const next: DeckClosing = { ...closing, ...partial };
    if (!next.contact) delete next.contact;
    if (!next.nextSteps?.length) delete next.nextSteps;
    onChange(next);
  };
  return (
    <div className="flex flex-col gap-2" data-testid={testIdPrefix}>
      <FormField label="Closing line" required hint={`Up to ${MAX_CLOSING_LINE_CHARS} characters.`}>
        {(wiring) => (
          <Input
            {...wiring}
            value={closing.line}
            maxLength={MAX_CLOSING_LINE_CHARS}
            disabled={readOnly}
            onChange={(event) => patch({ line: event.target.value })}
            data-testid={`${testIdPrefix}-line`}
          />
        )}
      </FormField>
      <TextListEditor
        label="Next steps"
        itemLabel="Next step"
        items={closing.nextSteps ?? []}
        max={MAX_NEXT_STEPS}
        maxChars={MAX_NEXT_STEP_CHARS}
        addLabel="Add next step"
        numbered
        onChange={(nextSteps) => patch({ nextSteps })}
        readOnly={readOnly}
        testIdPrefix={`${testIdPrefix}-steps`}
      />
      <FormField label="Contact" hint={`Optional: who to ask. Up to ${MAX_CONTACT_CHARS} characters.`}>
        {(wiring) => (
          <Input
            {...wiring}
            value={closing.contact ?? ''}
            maxLength={MAX_CONTACT_CHARS}
            disabled={readOnly}
            onChange={(event) => patch({ contact: event.target.value })}
            data-testid={`${testIdPrefix}-contact`}
          />
        )}
      </FormField>
    </div>
  );
}
