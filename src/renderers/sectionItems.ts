// src/renderers/sectionItems.ts
//
// Internal (deliberately NOT exported from `renderers/index.ts`) helper for
// reading a section's item list defensively.
//
// `Section.items` is typed as a required `TaskItem[]`, and inside the library's
// own Yjs path `useSectionList` normalises it. But the renderers are public
// exports: a host mounts `TasksReaderRenderer` / `ChecklistReaderRenderer` etc.
// against sections fetched from ITS OWN document API, where a section with no
// items is very commonly serialised without the key at all
// (`{"id":"s1","type":"tasks","title":"Tasks"}`). TypeScript's guarantee is
// erased at runtime, so `section.items.length` threw and — with no error
// boundary in the host's tree — blanked the whole document.
//
// A `null` element inside the array is the other observed shape (it is what
// blanked the link-block renderers), so those are dropped rather than allowed
// to throw on the first property read.

import type { Section, TaskItem } from '../types/document';

export function sectionItems(section: Pick<Section, 'items'>): TaskItem[] {
  const raw = section.items;
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is TaskItem => item != null);
}
