# Custom Renderers

The document editor uses a **renderer registry** to map section types to React components. Each section in a document has a `sectionType` field (e.g. `'tasks'`, `'rich-text'`, `'timeline'`) that determines which component renders it. You can extend this registry with custom renderers for new section types.

## Prerequisites

- React 19+
- Understanding of the document section model

## How the Registry Works

The registry is a `Map<string, SectionRenderer>` keyed by `"sectionType:viewMode"`. When the document editor needs to render a section, it resolves the renderer using a fallback chain:

1. `sectionType:viewMode` (exact match)
2. `sectionType:*` (any view mode for this type)
3. `*:viewMode` (default renderer for this view mode)
4. `*:*` (universal fallback)

This means you can register a renderer for a specific section type in a specific view mode, or provide a broad fallback.

## ViewMode

```tsx
type ViewMode = 'editor' | 'reader';
```

- `editor` — full editing capabilities, mutation callbacks active
- `reader` — read-only presentation, no editing affordances

## SectionRendererProps

Every renderer receives this props interface. Pick the fields you need:

```tsx
interface SectionRendererProps {
  section: Section;
  viewMode: ViewMode;
  editable: boolean;

  // Y.js rich-text binding
  fragment?: XmlFragment | null;
  ydoc?: Y.Doc | null;
  provider?: CollaborationProvider | null;
  user?: { name: string; color: string };

  // Mutation callbacks (undefined in read-only contexts)
  onUpdateSection?: (patch: Partial<Section>) => void;
  onAddItem?: (item: Omit<TaskItem, 'id'>) => void;
  onUpdateItem?: (itemId: string, patch: Partial<TaskItem>) => void;
  onRemoveItem?: (itemId: string) => void;

  // Collaboration
  participants?: Participant[];
  onUpdateCursorInfo?: (name: string, color: string) => void;

  // Comments
  comments?: CommentThread[];
  commentCount?: number;
  onOpenComments?: (sectionId: string) => void;

  // Navigation: reader -> editor mode at this section
  onNavigateToEditor?: (sectionId: string) => void;
}

type SectionRenderer = React.ComponentType<SectionRendererProps>;
```

## Registering a Custom Renderer

Use `registerRenderer` to add your component to the registry:

```tsx
import { registerRenderer } from '@connorhoehn/ui-components/doc-editor';
import type { SectionRendererProps } from '@connorhoehn/ui-components/doc-editor';

// Register for both view modes
registerRenderer('kanban', 'editor', KanbanEditor);
registerRenderer('kanban', 'reader', KanbanReader);

// Or register once for all view modes
registerRenderer('kanban', '*', KanbanRenderer);
```

## Example: Creating a "kanban" Section Renderer

```tsx
import { registerRenderer } from '@connorhoehn/ui-components/doc-editor';
import type { SectionRendererProps } from '@connorhoehn/ui-components/doc-editor';
import { cssVar } from '@connorhoehn/ui-components';

function KanbanEditor({ section, onUpdateItem, onAddItem }: SectionRendererProps) {
  const columns = ['pending', 'acked', 'done'] as const;

  const itemsByStatus = columns.reduce((acc, status) => {
    acc[status] = section.items.filter((item) => item.status === status);
    return acc;
  }, {} as Record<string, typeof section.items>);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
      gap: cssVar('spaceMd'),
    }}>
      {columns.map((col) => (
        <div key={col} style={{
          background: cssVar('surfaceRaised'),
          borderRadius: cssVar('radiusMd'),
          padding: cssVar('spaceSm'),
        }}>
          <h4 style={{ color: cssVar('textPrimary') }}>{col}</h4>
          {itemsByStatus[col].map((item) => (
            <div
              key={item.id}
              style={{
                background: cssVar('surface'),
                border: `1px solid ${cssVar('borderLight')}`,
                borderRadius: cssVar('radiusSm'),
                padding: cssVar('spaceSm'),
                marginTop: cssVar('spaceXs'),
              }}
            >
              <span>{item.text}</span>
              {onUpdateItem && (
                <button onClick={() => onUpdateItem(item.id, { status: 'done' })}>
                  Done
                </button>
              )}
            </div>
          ))}
          {onAddItem && (
            <button onClick={() => onAddItem({ text: 'New task', status: col, assignee: '', ackedBy: '', ackedAt: '', priority: 'medium', notes: '' })}>
              + Add
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function KanbanReader({ section }: SectionRendererProps) {
  // Simplified read-only view
  return (
    <div style={{ display: 'flex', gap: cssVar('spaceMd') }}>
      {['pending', 'acked', 'done'].map((status) => (
        <div key={status}>
          <strong>{status}</strong>
          <ul>
            {section.items.filter((i) => i.status === status).map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Register both view modes
registerRenderer('kanban', 'editor', KanbanEditor);
registerRenderer('kanban', 'reader', KanbanReader);
```

## Field Type Definitions

For richer integration (appearing in the section-type picker, having an icon and description), register a field type definition alongside your renderer:

```tsx
import { registerFieldType } from '@connorhoehn/ui-components/doc-editor';

registerFieldType({
  type: 'kanban',
  label: 'Kanban Board',
  icon: 'columns',
  description: 'A drag-and-drop board for managing tasks across columns.',
  rendererKeys: {
    editor: ['kanban:editor'],
    reader: ['kanban:reader'],
  },
  rendererLabels: {
    'kanban:editor': 'Kanban Editor',
    'kanban:reader': 'Kanban Reader',
  },
});
```

### FieldTypeDefinition Interface

```tsx
interface FieldTypeDefinition {
  /** Unique key -- matches SectionType for built-ins; UUID for user-defined types */
  type: string;
  label: string;
  icon: string;
  description: string;
  /** Available renderer keys per view mode */
  rendererKeys: Partial<Record<ViewMode, string[]>>;
  /** Human-readable label for each renderer key */
  rendererLabels: Record<string, string>;
  /**
   * When set, renderer resolution uses this type's renderers instead of `type`.
   * User-defined field types set this to the built-in type they wrap.
   */
  rendererType?: string;
}
```

## Wrapping Built-in Renderers

If your custom section type is a variation of a built-in (e.g., a "sprint-tasks" type that uses the same renderer as "tasks"), use `rendererType` to delegate:

```tsx
registerFieldType({
  type: 'sprint-tasks',
  label: 'Sprint Tasks',
  icon: 'zap',
  description: 'Sprint-scoped task list using the standard task renderer.',
  rendererKeys: { editor: ['tasks:editor'], reader: ['tasks:reader'] },
  rendererLabels: { 'tasks:editor': 'Task Editor', 'tasks:reader': 'Task Reader' },
  rendererType: 'tasks', // resolves to the built-in tasks renderer
});
```

## Querying the Registry

For debug UIs or dynamic configuration:

```tsx
import { listRegisteredRenderers, getFieldTypes } from '@connorhoehn/ui-components/doc-editor';

// List all registered renderer entries
const renderers = listRegisteredRenderers();
// → [{ sectionType: 'tasks', viewMode: 'editor', component: ... }, ...]

// List all field type definitions
const fieldTypes = getFieldTypes();
// → [{ type: 'tasks', label: 'Tasks', icon: 'check-square', ... }, ...]
```
