import { useLocation } from 'react-router';
import { navigationTree } from './nav-tree';
import type { NavSection, NavGroup, NavItem } from './types';

export function useActiveNav() {
  const { pathname } = useLocation();

  let activeSection: NavSection | null = null;
  let activeGroup: NavGroup | null = null;
  let activeItem: NavItem | null = null;

  for (const section of navigationTree) {
    for (const group of section.groups) {
      for (const item of group.items) {
        if (pathname === item.path) {
          activeSection = section;
          activeGroup = group;
          activeItem = item;
          break;
        }
      }
      if (activeItem) break;
    }
    if (activeItem) break;
  }

  if (!activeSection) {
    for (const section of navigationTree) {
      if (pathname.startsWith(section.basePath)) {
        activeSection = section;
        break;
      }
    }
  }

  const breadcrumbs: Array<{ label: string; path: string }> = [];
  if (activeSection) {
    breadcrumbs.push({ label: activeSection.label, path: activeSection.basePath });
    if (activeGroup && activeGroup.label) {
      breadcrumbs.push({ label: activeGroup.label, path: activeSection.basePath });
    }
    if (activeItem) {
      breadcrumbs.push({ label: activeItem.label, path: activeItem.path });
    }
  }

  return { activeSection, activeGroup, activeItem, breadcrumbs };
}
