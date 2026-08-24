import { cn } from '@/lib/cn';
import type { TocItem } from './TocContext';

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string | null;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  return (
    <nav className="text-[13px] leading-[1.8]">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-neutral">
        On this page
      </div>
      <ul className="m-0 list-none p-0">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li
              key={item.id}
              className={cn(
                'ml-0 border-l-2 py-0.5 pr-0',
                item.level === 3 ? 'pl-3' : 'pl-0',
                isActive ? 'border-info' : 'border-border',
              )}
            >
              <a
                href={`#${item.id}`}
                className={cn(
                  'block pl-2.5 no-underline',
                  isActive ? 'font-medium text-info' : 'font-normal text-text-secondary',
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
