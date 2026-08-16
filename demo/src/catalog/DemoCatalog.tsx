import { useState } from 'react';
import { FilterChip } from '@connorhoehnslalom/ui-components/shared';
import { entries, categories } from './catalog-data';
import { DemoCard } from './DemoCard';
import { AudienceHero } from './AudienceHero';

export function DemoCatalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered =
    activeCategory === 'all'
      ? entries
      : entries.filter((e) => e.category === activeCategory);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col gap-12">
      <header className="flex flex-col gap-3 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          @connorhoehnslalom/ui-components
        </span>
        <h1 className="text-3xl font-bold text-slate-900 m-0 leading-tight">
          Build real-time apps fast.
        </h1>
        <p className="text-base text-slate-600 m-0 leading-relaxed">
          A React component library for collaborative apps — chat, calls, docs,
          pipelines, and admin consoles. Pick a path below to see the hooks and
          composites you would actually use, or browse the full catalog.
        </p>
      </header>

      <AudienceHero />

      <section aria-labelledby="catalog-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <h2
            id="catalog-heading"
            className="text-xl font-semibold text-slate-900 m-0"
          >
            Browse all demos
          </h2>
          <p className="text-sm text-slate-500 m-0">
            {entries.length} interactive demos across workflows, agents, hook
            integrations, and foundations.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </FilterChip>
          ))}
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <DemoCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
