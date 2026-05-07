import { useState } from 'react';
import Chip from '@/components/shared/Chip';
import EmptyState from '@/components/shared/EmptyState';
import SkeletonCard from '@/components/shared/SkeletonCard';
import CodeEditor from '@/components/shared/CodeEditor';
import type { ChipTone } from '@/components/shared/Chip';

export function FormControlsDemo() {
  const [editorValue, setEditorValue] = useState(
    '{\n  "name": "{{ user_name }}",\n  "active": true\n}'
  );

  return (
    <section style={{ marginBottom: 48 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Other Primitives</h3>
      <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>
        Chip badges, skeleton loaders, empty states, and the code editor.
      </p>

      {/* Chips */}
      <div style={{ marginBottom: 32 }}>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
          Chip
        </h4>
        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
          Soft tone (default):
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {(['neutral', 'success', 'warning', 'danger', 'info', 'caution', 'purple'] as ChipTone[]).map(tone => (
            <Chip key={tone} tone={tone}>{tone}</Chip>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
          Solid variant:
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {(['neutral', 'success', 'warning', 'danger', 'info', 'caution', 'purple'] as ChipTone[]).map(tone => (
            <Chip key={tone} tone={tone} solid>{tone}</Chip>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
          Extra-small size + mono:
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Chip tone="info" size="xs" mono>42</Chip>
          <Chip tone="success" size="xs" mono>128</Chip>
          <Chip tone="danger" size="xs" mono>3</Chip>
        </div>
      </div>

      {/* Skeleton Card */}
      <div style={{ marginBottom: 32 }}>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
          SkeletonCard
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
          <SkeletonCard height={48} />
          <SkeletonCard height={80} />
          <SkeletonCard height={32} width={200} />
        </div>
      </div>

      {/* Empty State */}
      <div style={{ marginBottom: 32 }}>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
          EmptyState
        </h4>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8 }}>
          <EmptyState
            icon="📭"
            title="No items yet"
            body="Create your first item to get started. Items will appear here once added."
            actionLabel="Create Item"
            onAction={() => alert('Create item clicked!')}
          />
        </div>
      </div>

      {/* Code Editor */}
      <div style={{ marginBottom: 32 }}>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
          CodeEditor
        </h4>
        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
          Monospace editor with line numbers, tab indentation, and variable pill insertion.
        </p>
        <div style={{ maxWidth: 500 }}>
          <CodeEditor
            value={editorValue}
            onChange={setEditorValue}
            language="template"
            placeholder="Enter JSON template..."
            minLines={5}
            variables={['user_name', 'user_email', 'timestamp']}
            aria-label="Template editor"
          />
        </div>
      </div>
    </section>
  );
}
