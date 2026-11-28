// The forms for the layouts added in 2.550.0 (the deck engine's 0.153.0
// format): cards and process items, the matrix, people, funnel stages, the
// image fields, and the icon slot and decoration row the richer layouts share.
//
// The same rules as `SlideLayoutForms`: every input carries the engine's
// character cap as `maxLength` and an accessible name; every list shows its
// count against its bounds, stops offering Add at the cap and Remove at the
// floor, and (new here) can move a row up or down, since order is meaning on
// a process or a funnel. Optional fields are dropped from the object when
// emptied, because the engine refuses an empty string where a field is
// present.
//
// Icons and graphics come from the host (`DeckIconSource`, `DeckGraphicSource`):
// without them the icon slots and the decoration row are not shown, and any
// icon already on the slide is kept untouched.

import { useState } from 'react';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { ChevronIcon } from '../../ui/Icons';
import { Input } from '../../forms/Input';
import FormField from '../../shared/FormField';
import { SectionLabel } from '../../shared/SectionLabel';
import { SegmentedControl } from '../../shared/SegmentedControl';
import { Text } from '../../shared/Text';
import { AddButton, ListHeading, RemoveButton, replaceAt } from './SlideLayoutForms';
import { DeckIconGlyph, DeckIconPicker, type DeckIconSource } from './IconPicker';
import { GraphicPicker, type DeckGraphicSource } from './GraphicPicker';
import {
  DECK_DECORATION_PLACEMENT_LABELS,
  MAX_BULLET_CHARS,
  MAX_FIGURE_VALUE_CHARS,
  MAX_FUNNEL_DETAIL_CHARS,
  MAX_FUNNEL_LABEL_CHARS,
  MAX_FUNNEL_STAGES,
  MAX_IMAGE_URL_CHARS,
  MAX_ITEM_TEXT_CHARS,
  MAX_ITEM_TITLE_CHARS,
  MAX_MATRIX_AXIS_CHARS,
  MAX_PEOPLE,
  MAX_PERSON_DETAIL_CHARS,
  MAX_PERSON_NAME_CHARS,
  MAX_PERSON_ROLE_CHARS,
  MIN_FUNNEL_STAGES,
  MIN_PEOPLE,
  type DeckDecoration,
  type DeckFunnelStage,
  type DeckImage,
  type DeckItem,
  type DeckMatrix,
  type DeckPerson,
  type SlideLayout,
} from './deckSpec';

interface EditorBase {
  readOnly: boolean;
  testIdPrefix: string;
}

/** Set `key` to `value`, or drop it when `value` is empty. */
function withOptional<T extends object, K extends keyof T>(object: T, key: K, value: string | undefined): T {
  const next = { ...object };
  if (value) (next as Record<K, unknown>)[key] = value;
  else delete next[key];
  return next;
}

function move<T>(list: readonly T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list.slice();
  const next = list.slice();
  const [row] = next.splice(from, 1);
  next.splice(to, 0, row!);
  return next;
}

/** Move up, Move down and Remove for one row. */
function RowControls({ noun, index, count, min, onChange, testIdPrefix }: {
  noun: string;
  index: number;
  count: number;
  min: number;
  onChange: (action: 'up' | 'down' | 'remove') => void;
  testIdPrefix: string;
}) {
  return (
    <span className="flex shrink-0 items-center">
      <IconButton aria-label={`Move ${noun} ${index + 1} up`} variant="ghost" size="sm" icon={<ChevronIcon dir="up" size={12} />} disabled={index === 0} onClick={() => onChange('up')} data-testid={`${testIdPrefix}-up-${index}`} />
      <IconButton aria-label={`Move ${noun} ${index + 1} down`} variant="ghost" size="sm" icon={<ChevronIcon dir="down" size={12} />} disabled={index === count - 1} onClick={() => onChange('down')} data-testid={`${testIdPrefix}-down-${index}`} />
      <RemoveButton label={`Remove ${noun} ${index + 1}`} disabled={count <= min} onClick={() => onChange('remove')} testId={`${testIdPrefix}-remove-${index}`} />
    </span>
  );
}

function applyRow<T>(list: readonly T[], index: number, action: 'up' | 'down' | 'remove'): T[] {
  if (action === 'remove') return list.filter((_, i) => i !== index);
  return move(list, index, action === 'up' ? index - 1 : index + 1);
}

// ---------------------------------------------------------------------------
// The icon slot: a button that opens an DeckIconPicker in the row below it
// ---------------------------------------------------------------------------

/** The button half of an icon slot. Shows the icon (or "Icon"), `aria-expanded` while its picker is open. */
export function IconSlotButton({ value, icons, label, open, onToggle, disabled, testId }: {
  value?: string;
  icons: DeckIconSource;
  label: string;
  open: boolean;
  onToggle: () => void;
  disabled?: boolean;
  testId: string;
}) {
  const name = value ? icons.items.find((item) => item.name === value)?.label ?? value : undefined;
  return (
    <Button
      variant="secondary"
      size="sm"
      aria-expanded={open}
      aria-label={name ? `${label}: ${name}` : `${label}: none`}
      disabled={disabled}
      onClick={onToggle}
      className="shrink-0"
      data-testid={testId}
    >
      {value ? <DeckIconGlyph name={value} icons={icons.icons} renderIcon={icons.renderIcon} className="h-4 w-4" /> : null}
      <Text as="span" size="xs">{value ? 'Icon' : 'Add icon'}</Text>
    </Button>
  );
}

/** The picker half: an inline `DeckIconPicker` that closes on a choice. */
function IconSlotPicker({ value, icons, label, onChange, onClose, testId }: {
  value?: string;
  icons: DeckIconSource;
  label: string;
  onChange: (icon: string | undefined) => void;
  onClose: () => void;
  testId: string;
}) {
  return (
    <DeckIconPicker
      items={icons.items}
      icons={icons.icons}
      renderIcon={icons.renderIcon}
      value={value}
      label={label}
      onSelect={(icon) => { onChange(icon); onClose(); }}
      testIdPrefix={testId}
    />
  );
}

// ---------------------------------------------------------------------------
// Items: cards (3 to 4) and process steps (3 to 5)
// ---------------------------------------------------------------------------

/** Card or process-step rows: title, text and icon, with add, remove and reorder inside the layout's bounds. */
export function ItemsEditor({ items, onChange, bounds, noun, icons, readOnly, testIdPrefix }: EditorBase & {
  items: readonly DeckItem[];
  onChange: (items: DeckItem[]) => void;
  bounds: readonly [number, number];
  /** "card" or "step": names the rows. */
  noun: string;
  icons?: DeckIconSource;
}) {
  const [min, max] = bounds;
  const [openIcon, setOpenIcon] = useState<number | null>(null);
  const Noun = noun.charAt(0).toUpperCase() + noun.slice(1);
  return (
    <div className="flex flex-col gap-1.5" data-testid={testIdPrefix}>
      <ListHeading label={`${Noun}s`} count={items.length} min={min} max={max} testId={`${testIdPrefix}-count`} />
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {items.map((item, index) => (
          <li key={index} className="flex flex-col gap-1">
            <span className="flex flex-wrap items-center gap-1 sm:flex-nowrap">
              <Text size="xs" tone="tertiary" tabular className="w-4 shrink-0 text-right">{`${index + 1}.`}</Text>
              <Input
                value={item.title}
                maxLength={MAX_ITEM_TITLE_CHARS}
                placeholder="Title"
                disabled={readOnly}
                aria-label={`${Noun} ${index + 1} title`}
                onChange={(event) => onChange(replaceAt(items, index, { ...item, title: event.target.value }))}
                data-testid={`${testIdPrefix}-title-${index}`}
              />
              <Input
                value={item.text ?? ''}
                maxLength={MAX_ITEM_TEXT_CHARS}
                placeholder="One line (optional)"
                disabled={readOnly}
                aria-label={`${Noun} ${index + 1} text, optional`}
                onChange={(event) => onChange(replaceAt(items, index, withOptional(item, 'text', event.target.value)))}
                data-testid={`${testIdPrefix}-text-${index}`}
              />
              {icons && (
                <IconSlotButton
                  value={item.icon}
                  icons={icons}
                  label={`${Noun} ${index + 1} icon`}
                  open={openIcon === index}
                  onToggle={() => setOpenIcon(openIcon === index ? null : index)}
                  disabled={readOnly}
                  testId={`${testIdPrefix}-icon-${index}`}
                />
              )}
              {!readOnly && (
                <RowControls noun={noun} index={index} count={items.length} min={min} onChange={(action) => { setOpenIcon(null); onChange(applyRow(items, index, action)); }} testIdPrefix={testIdPrefix} />
              )}
            </span>
            {icons && openIcon === index && !readOnly && (
              <IconSlotPicker
                value={item.icon}
                icons={icons}
                label={`Icon for ${noun} ${index + 1}`}
                onChange={(icon) => onChange(replaceAt(items, index, withOptional(item, 'icon', icon)))}
                onClose={() => setOpenIcon(null)}
                testId={`${testIdPrefix}-icon-picker-${index}`}
              />
            )}
          </li>
        ))}
      </ol>
      {!readOnly && (
        <AddButton disabled={items.length >= max} onClick={() => onChange([...items, { title: '' }])} testId={`${testIdPrefix}-add`}>
          {`Add ${noun}`}
        </AddButton>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Matrix: two axes and four quadrants
// ---------------------------------------------------------------------------

const QUADRANT_NAMES = ['Top left', 'Top right', 'Bottom left', 'Bottom right'] as const;

/** A two-by-two: the four axis ends and four quadrants (title, text, icon). */
export function MatrixEditor({ matrix, onChange, icons, readOnly, testIdPrefix }: EditorBase & {
  matrix: DeckMatrix;
  onChange: (matrix: DeckMatrix) => void;
  icons?: DeckIconSource;
}) {
  const [openIcon, setOpenIcon] = useState<number | null>(null);
  const setAxis = (axis: 'x' | 'y', end: 0 | 1, value: string) => {
    const next: [string, string] = [matrix[axis][0], matrix[axis][1]];
    next[end] = value;
    onChange({ ...matrix, [axis]: next });
  };
  const setQuadrant = (index: number, item: DeckItem) => {
    onChange({ ...matrix, quadrants: replaceAt(matrix.quadrants, index, item) as DeckMatrix['quadrants'] });
  };
  const axisInput = (axis: 'x' | 'y', end: 0 | 1, label: string, placeholder: string) => (
    <FormField label={label}>
      {(wiring) => (
        <Input
          {...wiring}
          value={matrix[axis][end]}
          maxLength={MAX_MATRIX_AXIS_CHARS}
          placeholder={placeholder}
          disabled={readOnly}
          onChange={(event) => setAxis(axis, end, event.target.value)}
          data-testid={`${testIdPrefix}-${axis}-${end}`}
        />
      )}
    </FormField>
  );
  return (
    <div className="flex flex-col gap-2" data-testid={testIdPrefix}>
      <SectionLabel as="div">Axes</SectionLabel>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {axisInput('x', 0, 'Horizontal axis, left end', 'Low effort')}
        {axisInput('x', 1, 'Horizontal axis, right end', 'High effort')}
        {axisInput('y', 0, 'Vertical axis, bottom end', 'Low value')}
        {axisInput('y', 1, 'Vertical axis, top end', 'High value')}
      </div>
      <SectionLabel as="div">Quadrants</SectionLabel>
      <ol className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2" data-testid={`${testIdPrefix}-quadrants`}>
        {matrix.quadrants.map((quadrant, index) => (
          <li key={index} className="flex flex-col gap-1 rounded-md border border-border p-2">
            <span className="flex items-center justify-between gap-1">
              <Text size="xs" weight="medium" tone="secondary">{QUADRANT_NAMES[index]}</Text>
              {icons && (
                <IconSlotButton
                  value={quadrant.icon}
                  icons={icons}
                  label={`${QUADRANT_NAMES[index]} quadrant icon`}
                  open={openIcon === index}
                  onToggle={() => setOpenIcon(openIcon === index ? null : index)}
                  disabled={readOnly}
                  testId={`${testIdPrefix}-icon-${index}`}
                />
              )}
            </span>
            <Input
              value={quadrant.title}
              maxLength={MAX_ITEM_TITLE_CHARS}
              placeholder="Title"
              disabled={readOnly}
              aria-label={`${QUADRANT_NAMES[index]} quadrant title`}
              onChange={(event) => setQuadrant(index, { ...quadrant, title: event.target.value })}
              data-testid={`${testIdPrefix}-title-${index}`}
            />
            <Input
              value={quadrant.text ?? ''}
              maxLength={MAX_ITEM_TEXT_CHARS}
              placeholder="One line (optional)"
              disabled={readOnly}
              aria-label={`${QUADRANT_NAMES[index]} quadrant text, optional`}
              onChange={(event) => setQuadrant(index, withOptional(quadrant, 'text', event.target.value))}
              data-testid={`${testIdPrefix}-text-${index}`}
            />
            {icons && openIcon === index && !readOnly && (
              <IconSlotPicker
                value={quadrant.icon}
                icons={icons}
                label={`Icon for the ${QUADRANT_NAMES[index].toLowerCase()} quadrant`}
                onChange={(icon) => setQuadrant(index, withOptional(quadrant, 'icon', icon))}
                onClose={() => setOpenIcon(null)}
                testId={`${testIdPrefix}-icon-picker-${index}`}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// ---------------------------------------------------------------------------
// People (2 to 8)
// ---------------------------------------------------------------------------

/** Team rows (name, role, detail), two to eight, with add, remove and reorder. */
export function PeopleEditor({ people, onChange, readOnly, testIdPrefix }: EditorBase & {
  people: readonly DeckPerson[];
  onChange: (people: DeckPerson[]) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5" data-testid={testIdPrefix}>
      <ListHeading label="People" count={people.length} min={MIN_PEOPLE} max={MAX_PEOPLE} testId={`${testIdPrefix}-count`} />
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {people.map((person, index) => (
          <li key={index} className="flex flex-wrap items-center gap-1 sm:flex-nowrap">
            <Input
              value={person.name}
              maxLength={MAX_PERSON_NAME_CHARS}
              placeholder="Name"
              disabled={readOnly}
              aria-label={`Person ${index + 1} name`}
              onChange={(event) => onChange(replaceAt(people, index, { ...person, name: event.target.value }))}
              data-testid={`${testIdPrefix}-name-${index}`}
            />
            <Input
              value={person.role}
              maxLength={MAX_PERSON_ROLE_CHARS}
              placeholder="Role"
              disabled={readOnly}
              aria-label={`Person ${index + 1} role`}
              onChange={(event) => onChange(replaceAt(people, index, { ...person, role: event.target.value }))}
              data-testid={`${testIdPrefix}-role-${index}`}
            />
            <Input
              value={person.detail ?? ''}
              maxLength={MAX_PERSON_DETAIL_CHARS}
              placeholder="A line about them (optional)"
              disabled={readOnly}
              aria-label={`Person ${index + 1} detail, optional`}
              onChange={(event) => onChange(replaceAt(people, index, withOptional(person, 'detail', event.target.value)))}
              data-testid={`${testIdPrefix}-detail-${index}`}
            />
            {!readOnly && (
              <RowControls noun="person" index={index} count={people.length} min={MIN_PEOPLE} onChange={(action) => onChange(applyRow(people, index, action))} testIdPrefix={testIdPrefix} />
            )}
          </li>
        ))}
      </ol>
      {!readOnly && (
        <AddButton disabled={people.length >= MAX_PEOPLE} onClick={() => onChange([...people, { name: '', role: '' }])} testId={`${testIdPrefix}-add`}>
          Add person
        </AddButton>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Funnel (3 to 5 stages, widest first)
// ---------------------------------------------------------------------------

/** Funnel stages widest first (label, value, detail), three to five, with add, remove and reorder. */
export function FunnelEditor({ stages, onChange, readOnly, testIdPrefix }: EditorBase & {
  stages: readonly DeckFunnelStage[];
  onChange: (stages: DeckFunnelStage[]) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5" data-testid={testIdPrefix}>
      <ListHeading label="Stages, widest first" count={stages.length} min={MIN_FUNNEL_STAGES} max={MAX_FUNNEL_STAGES} testId={`${testIdPrefix}-count`} />
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {stages.map((stage, index) => (
          <li key={index} className="flex flex-wrap items-center gap-1 sm:flex-nowrap">
            <Text size="xs" tone="tertiary" tabular className="w-4 shrink-0 text-right">{`${index + 1}.`}</Text>
            <Input
              value={stage.label}
              maxLength={MAX_FUNNEL_LABEL_CHARS}
              placeholder="What it counts"
              disabled={readOnly}
              aria-label={`Stage ${index + 1} label`}
              onChange={(event) => onChange(replaceAt(stages, index, { ...stage, label: event.target.value }))}
              data-testid={`${testIdPrefix}-label-${index}`}
            />
            <Input
              value={stage.value}
              maxLength={MAX_FIGURE_VALUE_CHARS}
              placeholder="12,400"
              disabled={readOnly}
              aria-label={`Stage ${index + 1} value`}
              onChange={(event) => onChange(replaceAt(stages, index, { ...stage, value: event.target.value }))}
              data-testid={`${testIdPrefix}-value-${index}`}
            />
            <Input
              value={stage.detail ?? ''}
              maxLength={MAX_FUNNEL_DETAIL_CHARS}
              placeholder="A note (optional)"
              disabled={readOnly}
              aria-label={`Stage ${index + 1} detail, optional`}
              onChange={(event) => onChange(replaceAt(stages, index, withOptional(stage, 'detail', event.target.value)))}
              data-testid={`${testIdPrefix}-detail-${index}`}
            />
            {!readOnly && (
              <RowControls noun="stage" index={index} count={stages.length} min={MIN_FUNNEL_STAGES} onChange={(action) => onChange(applyRow(stages, index, action))} testIdPrefix={testIdPrefix} />
            )}
          </li>
        ))}
      </ol>
      {!readOnly && (
        <AddButton disabled={stages.length >= MAX_FUNNEL_STAGES} onClick={() => onChange([...stages, { label: '', value: '' }])} testId={`${testIdPrefix}-add`}>
          Add stage
        </AddButton>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Image: alt, an https URL, and (image-text) the side
// ---------------------------------------------------------------------------

/** An image slot's description, https URL and (image-text) picture side. */
export function ImageEditor({ image, layout, onChange, readOnly, testIdPrefix }: EditorBase & {
  image: DeckImage;
  layout: SlideLayout;
  onChange: (image: DeckImage) => void;
}) {
  return (
    <div className="flex flex-col gap-2" data-testid={testIdPrefix}>
      <FormField label="Image description" hint="Read aloud by screen readers, and shown until the picture loads.">
        {(wiring) => (
          <Input
            {...wiring}
            value={image.alt}
            maxLength={MAX_BULLET_CHARS}
            disabled={readOnly}
            onChange={(event) => onChange({ ...image, alt: event.target.value })}
            data-testid={`${testIdPrefix}-alt`}
          />
        )}
      </FormField>
      <FormField label="Image URL" hint={image.assetId ? 'The slide has an uploaded picture; a URL is used only without one.' : 'An https address the host fetches when it renders.'}>
        {(wiring) => (
          <Input
            {...wiring}
            type="url"
            value={image.url ?? ''}
            maxLength={MAX_IMAGE_URL_CHARS}
            placeholder="https://"
            disabled={readOnly}
            onChange={(event) => onChange(withOptional(image, 'url', event.target.value.trim()))}
            data-testid={`${testIdPrefix}-url`}
          />
        )}
      </FormField>
      {layout === 'image-text' && (
        <div className="flex flex-wrap items-center gap-2">
          <SectionLabel as="div">Picture side</SectionLabel>
          <SegmentedControl
            size="sm"
            aria-label="Picture side"
            value={image.side ?? 'left'}
            disabled={readOnly}
            onChange={(side) => onChange({ ...image, side: side as 'left' | 'right' })}
            options={[
              { value: 'left', label: 'Left', testId: `${testIdPrefix}-side-left` },
              { value: 'right', label: 'Right', testId: `${testIdPrefix}-side-right` },
            ]}
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Decoration: the current graphic, and a GraphicPicker opened in place
// ---------------------------------------------------------------------------

/** The slide's graphic and a GraphicPicker opened in place under it. */
export function DecorationField({ value, graphics, onChange, readOnly, testIdPrefix }: EditorBase & {
  value?: DeckDecoration | 'none';
  graphics: DeckGraphicSource;
  onChange: (value: DeckDecoration | 'none' | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = value === undefined
    ? 'Style default'
    : value === 'none'
      ? 'None'
      : `${graphics.items.find((item) => item.name === value.graphic)?.label ?? value.graphic}${value.placement ? `, ${DECK_DECORATION_PLACEMENT_LABELS[value.placement].toLowerCase()}` : ''}`;
  return (
    <div className="flex flex-col gap-1.5" data-testid={testIdPrefix}>
      <span className="flex flex-wrap items-center gap-2">
        <SectionLabel as="div">Graphic</SectionLabel>
        <Text size="xs" tone="secondary" data-testid={`${testIdPrefix}-current`}>{current}</Text>
        {!readOnly && (
          <Button variant="ghost" size="sm" aria-expanded={open} onClick={() => setOpen(!open)} data-testid={`${testIdPrefix}-toggle`}>
            {open ? 'Done' : 'Change graphic'}
          </Button>
        )}
      </span>
      {open && !readOnly && (
        <GraphicPicker
          items={graphics.items}
          renderGraphic={graphics.renderGraphic}
          value={value}
          onChange={onChange}
          label="Slide graphic"
          testIdPrefix={`${testIdPrefix}-picker`}
        />
      )}
    </div>
  );
}
