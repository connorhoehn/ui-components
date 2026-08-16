import { Link } from 'react-router';
import { navigationTree } from '../navigation';

export default function PatternsOverviewPage() {
  const referenceSection = navigationTree.find((s) => s.id === 'reference');
  const patternGroups = referenceSection?.groups.filter((g) =>
    g.items.length > 0 && g.items.every((item) => item.path.startsWith('/patterns/')),
  ) ?? [];
  if (patternGroups.length === 0) return null;

  return (
    <div>
      <h1 className="text-[28px] font-bold mb-2 text-text-primary">
        Patterns
      </h1>
      <p className="text-[15px] text-text-secondary mb-8 leading-[1.6] max-w-160"
      >
        Recommended integration patterns for WebSocket connections, authentication,
        theming, custom renderers, and embedding modules in your application.
      </p>

      {patternGroups.map((group) => (
        <div className="mb-8" key={group.id}>
          {group.label && (
            <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
              {group.label}
            </h2>
          )}
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-3"
          >
            {group.items.map((item) => (
              <Link className="block py-[14px] px-[18px] border border-border rounded-lg no-underline text-text-primary text-[14px] font-medium transition-[border-color] bg-surface"
                key={item.id}
                to={item.path}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
