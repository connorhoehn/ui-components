// PersonPicker — choose ONE person from a known list (a beneficiary, a
// delegate, an assignee). The library's person picker for forms: the
// Combobox's keyboard and FormField contract (`id`, `aria-describedby`,
// `aria-invalid`, `aria-required`, `invalid`), with each option drawn as an
// avatar, the person's name, an optional right-aligned tag ("You") and an
// optional detail line (a title, a team, the workspaces they hold). The
// chosen person's avatar sits at the start of the field while it is idle.
//
// Unlike UserPicker (multi-select over presence + profile search, which
// accepts typed free text as a user id), PersonPicker never commits a value
// that is not one of `people`: a host hands in exactly the people the chooser
// may pick, so a form cannot submit an id the server would refuse as unknown.
// A host that searches a large directory passes `onQueryChange` and refreshes
// `people` as results arrive.

import { Avatar } from './Avatar';
import { Combobox, type ComboboxOption } from './Combobox';

export interface PersonPickerPerson {
  /** The value committed on choice (a user id). */
  id: string;
  name: string;
  /** A second line: a title, a team, what they hold. Matched by the filter. */
  detail?: string;
  /** A short right-aligned tag on the name line ("You", "Manager"). Matched by the filter. */
  tag?: string;
  avatarUrl?: string;
  /** Shown but not choosable (e.g. someone the rules exclude), with the reason in `detail`. */
  disabled?: boolean;
}

export interface PersonPickerProps {
  people: readonly PersonPickerPerson[];
  /** The chosen person's id, or '' for none. */
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
  /** Shown when the query matches nobody. */
  emptyMessage?: string;
  /** Cap on rendered suggestions (default 50: a person list is long and searched). */
  maxOptions?: number;
  size?: 'sm' | 'md';
  /** The list is still loading: the field is disabled and says so. */
  loading?: boolean;
  disabled?: boolean;
  /** Called as the query changes, for hosts that search a directory server-side. */
  onQueryChange?: (query: string) => void;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
  invalid?: boolean;
  className?: string;
  'data-testid'?: string;
}

const AVATAR_PX = { sm: 18, md: 20 } as const;

export function PersonPicker({
  people, value, onChange, placeholder = 'Search people', emptyMessage = 'Nobody matches',
  maxOptions = 50, size = 'md', loading = false, disabled, onQueryChange, className, ...wiring
}: PersonPickerProps) {
  const px = AVATAR_PX[size];
  const options: ComboboxOption[] = people.map((p) => ({
    value: p.id,
    label: p.name,
    ...(p.tag ? { meta: p.tag } : {}),
    ...(p.detail ? { description: p.detail } : {}),
    ...(p.disabled ? { disabled: true } : {}),
    leading: <Avatar name={p.name} src={p.avatarUrl} size={px} showTitle={false} />,
  }));
  const chosen = people.find((p) => p.id === value);
  return (
    <Combobox
      {...wiring}
      className={className}
      options={options}
      value={value}
      onChange={onChange}
      size={size}
      maxOptions={maxOptions}
      emptyMessage={emptyMessage}
      placeholder={loading ? 'Loading people…' : placeholder}
      disabled={disabled || loading}
      {...(onQueryChange ? { onQueryChange } : {})}
      leading={chosen ? <Avatar name={chosen.name} src={chosen.avatarUrl} size={px} showTitle={false} /> : undefined}
    />
  );
}

export default PersonPicker;
