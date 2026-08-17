import { Link } from 'react-router';
import { Card, Chip } from '@connorhoehnslalom/ui-components/shared';
import type { CatalogEntry } from './catalog-data';

const CATEGORY_TONE: Record<string, 'info' | 'purple' | 'neutral' | 'success' | 'caution'> = {
  Workflows: 'info',
  Agents: 'purple',
  'Hook Integrations': 'success',
  Foundations: 'neutral',
  Components: 'neutral',
};

const THUMB_GRADIENT: Record<string, string> = {
  Workflows: 'from-primary-bg to-primary-bg/40',
  Agents: 'from-accent-bg to-accent-bg/40',
  'Hook Integrations': 'from-success-bg to-success-bg/40',
  Foundations: 'from-surface-panel to-surface-hover/40',
};

export function DemoCard({ entry }: { entry: CatalogEntry }) {
  const linkPath = entry.path
    ? entry.path
    : entry.type === 'demo'
    ? `/workflows/${entry.id}`
    : `/components/${entry.id}`;

  const gradient = THUMB_GRADIENT[entry.category] ?? 'from-surface-panel to-surface-hover/40';
  const tone = CATEGORY_TONE[entry.category] ?? 'neutral';
  const glyph = entry.type === 'component' ? '\u{1F9F1}' : '\u{1F5BC}';

  return (
    <Link to={linkPath} className="no-underline group">
      <Card
        padding="none"
        className="h-full flex flex-col group-hover:shadow-md group-hover:-translate-y-0.5 transition-all"
      >
        <div
          className={`h-40 flex items-center justify-center border-b border-border bg-gradient-to-br ${gradient}`}
          aria-hidden="true"
        >
          {entry.thumbnail ? (
            <img
              src={entry.thumbnail}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl opacity-30">{glyph}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 p-5">
          <div className="flex items-center gap-2">
            <Chip tone={tone} size="xs">
              {entry.category}
            </Chip>
          </div>
          <h3 className="text-base font-semibold text-text-primary m-0">
            {entry.title}
          </h3>
          <p className="text-[13px] text-neutral leading-relaxed m-0">
            {entry.description}
          </p>
        </div>
      </Card>
    </Link>
  );
}
