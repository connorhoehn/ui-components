// Build a CommandPalette command list from the demo's navigation tree.
//
// Walks every leaf NavItem and turns it into a Command grouped by its
// parent NavSection (Get Started, Foundations, Workflows, Reference …).
// Each command's run() navigates to the item's path via react-router.
//
// Keywords are derived from the section + group label so a search like
// "video" matches both `/components/video` (Foundations → Video) and
// `/workflows/video-streaming` (Workflows → Video Streaming) without
// either needing a hand-curated keyword list.

import type { Command } from '@connorhoehn/ui-components/shared';
import type { NavigationTree } from './types';

type Navigate = (to: string) => void;

export function buildNavCommands(
  tree: NavigationTree,
  navigate: Navigate,
): Command[] {
  const commands: Command[] = [];

  for (const section of tree) {
    for (const group of section.groups) {
      const groupHint = group.label ? `${section.label} · ${group.label}` : section.label;

      // The group itself may be a direct link (group.path) when it has no
      // expanded sub-items in the sidebar. Surface that as its own command.
      if (group.path) {
        commands.push({
          id: `nav-${section.id}-${group.id}`,
          label: group.label || section.label,
          group: section.label,
          hint: groupHint,
          keywords: dedupe([section.label, group.label, group.id]),
          run: () => navigate(group.path!),
        });
      }

      for (const item of group.items) {
        commands.push({
          id: `nav-${section.id}-${group.id}-${item.id}`,
          label: item.label,
          group: section.label,
          hint: groupHint,
          keywords: dedupe([
            section.label,
            group.label,
            item.label,
            item.id,
            // Strip the leading slash so a search like "buttons" matches
            // /components/buttons even though the path has the prefix.
            item.path.replace(/^\//, ''),
          ]),
          run: () => navigate(item.path),
        });
      }
    }
  }

  return commands;
}

function dedupe(items: Array<string | undefined | null>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const it of items) {
    if (!it) continue;
    const trimmed = it.trim();
    if (!trimmed) continue;
    if (seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out;
}
