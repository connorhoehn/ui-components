// The registry of app-defined leaf kinds. A kind is typed by augmenting
// `PageSpecLeafKinds` (see types.ts) and made renderable either globally
// (`registerLeafKind`) or for a subtree (`PageSpecProvider leaves={…}`); the
// provider wins over the global registry. Built-in kinds cannot be replaced:
// a spec's `button` is always the library Button.
import { createContext, useContext, useMemo, type ComponentType, type ReactNode } from 'react';
import type { BuiltinLeafKind, PageSpecLeafKinds } from './types';

/** The component a registered kind renders: its spec's props, plus the leaf marker to put on its root. */
export type PageSpecLeafComponent<K extends keyof PageSpecLeafKinds> = ComponentType<
  PageSpecLeafKinds[K] & { kind: K; 'data-spec-leaf': K }
>;

/** A map of registered kinds to their components. */
export type PageSpecLeafMap = { [K in keyof PageSpecLeafKinds]?: PageSpecLeafComponent<K> };

const BUILTIN_KINDS: ReadonlySet<string> = new Set<BuiltinLeafKind>([
  'button', 'button-group', 'menu', 'table', 'stats', 'stat-strip', 'key-values', 'status', 'badge', 'text',
  'meta', 'empty', 'banner', 'list', 'form', 'tabs', 'chart', 'activity', 'search', 'custom',
]);

/** True for a kind the library renders itself. */
export function isBuiltinLeafKind(kind: string): kind is BuiltinLeafKind {
  return BUILTIN_KINDS.has(kind);
}

const registry = new Map<string, ComponentType<never>>();

/**
 * Make an app-defined kind renderable everywhere. Returns an unregister function.
 * The kind must be declared on `PageSpecLeafKinds`, and must not be a built-in kind.
 */
export function registerLeafKind<K extends keyof PageSpecLeafKinds>(kind: K, component: PageSpecLeafComponent<K>): () => void {
  const name = kind as string;
  if (isBuiltinLeafKind(name)) throw new Error(`registerLeafKind: "${name}" is a built-in leaf kind and cannot be replaced.`);
  registry.set(name, component as ComponentType<never>);
  return () => {
    if (registry.get(name) === (component as ComponentType<never>)) registry.delete(name);
  };
}

const LeafMapContext = createContext<Readonly<Record<string, ComponentType<never>>> | null>(null);

export interface PageSpecProviderProps {
  /** Components for app-defined kinds, for this subtree. Wins over `registerLeafKind`. */
  leaves: PageSpecLeafMap;
  children?: ReactNode;
}

/** Provides app-defined leaf kinds to every `PageFromSpec` / `renderLeaf` under it. */
export function PageSpecProvider({ leaves, children }: PageSpecProviderProps) {
  const parent = useContext(LeafMapContext);
  for (const kind of Object.keys(leaves)) {
    if (isBuiltinLeafKind(kind)) throw new Error(`PageSpecProvider: "${kind}" is a built-in leaf kind and cannot be replaced.`);
  }
  const merged = useMemo(() => ({ ...(parent ?? {}), ...(leaves as Record<string, ComponentType<never>>) }), [parent, leaves]);
  return <LeafMapContext.Provider value={merged}>{children}</LeafMapContext.Provider>;
}

/** The component for an app-defined kind, or undefined. */
export function useRegisteredLeaf(kind: string): ComponentType<never> | undefined {
  const provided = useContext(LeafMapContext);
  return provided?.[kind] ?? registry.get(kind);
}
