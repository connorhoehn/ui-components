import { Link } from 'react-router';
import { Card } from '@connorhoehnslalom/ui-components/shared';
import { hookDocsByGroup } from '../hooks-registry/hook-docs';

export default function HooksOverviewPage() {
  const groups = hookDocsByGroup().filter((g) => g.docs.length > 0);
  const total = groups.reduce((acc, g) => acc + g.docs.length, 0);

  return (
    <div className="flex flex-col gap-10 max-w-4xl">
      <header className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral">
          Reference
        </span>
        <h1 className="text-2xl font-bold text-text-primary m-0">Hooks</h1>
        <p className="text-base text-text-secondary m-0 leading-relaxed max-w-2xl">
          {total} documented hooks for WebSocket connections, real-time
          collaboration, document management, and UI utilities. Pick one for a
          full signature, parameter table, and live example.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.group} className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-text-primary m-0">
            {group.label}
          </h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {group.docs.map((doc) => (
              <Link
                key={doc.name}
                to={`/hooks/${doc.name}`}
                className="no-underline group"
              >
                <Card
                  padding="md"
                  className="h-full flex flex-col gap-2 group-hover:border-primary-border group-hover:shadow-sm transition-all"
                >
                  <h3 className="text-sm font-semibold text-text-primary m-0 font-mono">
                    {doc.name}
                  </h3>
                  <p className="text-[13px] text-text-secondary leading-relaxed m-0">
                    {doc.summary}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
