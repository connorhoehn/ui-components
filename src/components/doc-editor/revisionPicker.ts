// The revision picker's options, shared by PresentationView and
// PresentationEditor: newest first, the head marked "latest", and — when the
// host holds only a page of a long history — one last entry that asks for the
// next older page instead of naming a revision.

/** A page of revisions is not the whole history: how many more exist, and how to ask for them. */
export interface OlderRevisions {
  /** Revisions older than the oldest one in hand. */
  count: number;
  /** The next page is on its way. */
  loading?: boolean;
  /** Ask the host for the next older page. */
  onLoad: () => void;
}

/** The option value that stands for "the next older page", never a revision id. */
export const OLDER_REVISIONS_VALUE = '__older-revisions__';

export function revisionPickerOptions(
  revisions: readonly { id: string; label: string }[],
  older?: OlderRevisions,
): Array<{ value: string; label: string; disabled?: boolean }> {
  const options: Array<{ value: string; label: string; disabled?: boolean }> = [...revisions]
    .reverse()
    .map((revision, index) => ({ value: revision.id, label: index === 0 ? `${revision.label} · latest` : revision.label }));
  if (older && older.count > 0) {
    options.push(older.loading
      ? { value: OLDER_REVISIONS_VALUE, label: 'Loading older versions…', disabled: true }
      : { value: OLDER_REVISIONS_VALUE, label: `Older versions (${older.count})…` });
  }
  return options;
}

/** A pick from the picker: the older-page entry loads, anything else selects. */
export function pickRevision(value: string, onSelect: ((revisionId: string) => void) | undefined, older?: OlderRevisions): void {
  if (value === OLDER_REVISIONS_VALUE) {
    if (older && !older.loading) older.onLoad();
    return;
  }
  onSelect?.(value);
}
