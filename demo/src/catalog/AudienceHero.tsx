import { Link } from 'react-router';
import { Card, Chip } from '@connorhoehnslalom/ui-components/shared';
import { audiencePaths, type AudiencePath } from './audience-paths';

const SPINE_CLASSES: Record<AudiencePath['accent'], string> = {
  indigo: 'bg-indigo-500',
  sky: 'bg-sky-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  slate: 'bg-slate-500',
};

const ICON_BG_CLASSES: Record<AudiencePath['accent'], string> = {
  indigo: 'bg-indigo-50 text-indigo-700',
  sky: 'bg-sky-50 text-sky-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  slate: 'bg-slate-100 text-slate-700',
};

const PRIMARY_LINK_CLASSES: Record<AudiencePath['accent'], string> = {
  indigo: 'text-indigo-700 hover:text-indigo-900',
  sky: 'text-sky-700 hover:text-sky-900',
  emerald: 'text-emerald-700 hover:text-emerald-900',
  amber: 'text-amber-700 hover:text-amber-900',
  slate: 'text-slate-700 hover:text-slate-900',
};

const ICON_GLYPHS: Record<string, string> = {
  chat: '\u{1F4AC}',
  call: '\u{1F4F9}',
  doc: '\u{1F4DD}',
  pipeline: '\u{1F501}',
  admin: '\u{1F6E1}',
};

function AudienceCard({ path }: { path: AudiencePath }) {
  return (
    <Card
      padding="none"
      className="relative flex flex-col gap-4 p-6 hover:shadow-md transition-shadow"
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${SPINE_CLASSES[path.accent]}`}
        aria-hidden="true"
      />
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-md text-xl shrink-0 ${ICON_BG_CLASSES[path.accent]}`}
          aria-hidden="true"
        >
          {ICON_GLYPHS[path.id] ?? '✨'}
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-slate-900 leading-tight m-0">
            {path.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 mb-0">{path.tagline}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed m-0">{path.description}</p>

      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Hooks
        </span>
        <div className="flex flex-wrap gap-1">
          {path.hooks.map((h) => (
            <Chip key={h} tone="neutral" size="xs" mono>
              {h}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Composites
        </span>
        <div className="flex flex-wrap gap-1">
          {path.composites.map((c) => (
            <Chip key={c} tone="info" size="xs" mono>
              {c}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <Link
          to={path.primary.to}
          className={`inline-flex items-center gap-1 text-sm font-semibold no-underline ${PRIMARY_LINK_CLASSES[path.accent]}`}
        >
          {path.primary.label}
          <span aria-hidden="true">&rarr;</span>
        </Link>
        {path.related.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
            {path.related.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs text-slate-500 hover:text-slate-900 hover:underline no-underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export function AudienceHero() {
  return (
    <section aria-labelledby="audience-hero-heading" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Start here
        </span>
        <h2
          id="audience-hero-heading"
          className="text-2xl font-bold text-slate-900 m-0 leading-tight"
        >
          What do you want to build?
        </h2>
        <p className="text-sm text-slate-600 m-0 leading-relaxed">
          Each path opens a working demo with the hooks and composites you would use in
          a real consumer app. Browse the full catalog below for primitives and one-off
          showcases.
        </p>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {audiencePaths.map((path) => (
          <AudienceCard key={path.id} path={path} />
        ))}
      </div>
    </section>
  );
}
