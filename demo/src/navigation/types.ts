export interface NavItem {
  id: string;
  label: string;
  path: string;
}

export interface NavGroup {
  id: string;
  label: string;
  path?: string;    // if provided, the group label itself is a direct link (no sub-items shown)
  items: NavItem[];
}

export interface NavSection {
  id: string;
  label: string;
  basePath: string;
  groups: NavGroup[];
}

export type NavigationTree = NavSection[];
