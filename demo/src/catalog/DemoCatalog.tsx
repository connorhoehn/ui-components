import { useState } from 'react';
import { entries, categories } from './catalog-data';
import { DemoCard } from './DemoCard';

export function DemoCatalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? entries : entries.filter(e => e.category === activeCategory);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Component Demos</h1>
        <p style={{ fontSize: 15, color: '#64748b', maxWidth: 600 }}>
          Interactive demonstrations of the @connorhoehnslalom/ui-components library.
          Each demo showcases a domain module with mock data.
        </p>
      </div>

      {/* Category filter chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: activeCategory === cat.id ? '2px solid #6366f1' : '1px solid #e2e8f0',
              background: activeCategory === cat.id ? '#6366f1' : '#fff',
              color: activeCategory === cat.id ? '#fff' : '#475569',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Demo grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24,
      }}>
        {filtered.map(entry => (
          <DemoCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
