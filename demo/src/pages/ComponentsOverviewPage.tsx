import { Link } from 'react-router';
import { navigationTree } from '../navigation';

export default function ComponentsOverviewPage() {
  const componentsSection = navigationTree.find(s => s.id === 'foundations');
  if (!componentsSection) return null;

  return (
    <div>
      <h1 className="text-[28px] font-bold mb-2 text-text-primary">
        Components
      </h1>
      <p className="text-[15px] text-text-secondary mb-8 leading-[1.6] max-w-160">
        Interactive UI components for building real-time collaborative applications.
        Each component is fully typed, themeable, and designed for composition.
      </p>

      {componentsSection.groups.map(group => (
        <div className="mb-8" key={group.id}>
          <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
            {group.label}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-3">
            {group.items.map(item => (
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
