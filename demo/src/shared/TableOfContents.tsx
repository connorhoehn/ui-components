import type { CSSProperties } from 'react';
import type { TocItem } from './TocContext';

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string | null;
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    fontSize: 13,
    lineHeight: 1.8,
  },
  heading: {
    fontSize: 11,
    textTransform: 'uppercase',
    color: 'var(--color-neutral)',
    letterSpacing: '0.05em',
    fontWeight: 600,
    marginBottom: 12,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
};

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  return (
    <nav style={styles.wrapper}>
      <div style={styles.heading}>On this page</div>
      <ul style={styles.list}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          const itemStyle: CSSProperties = {
            paddingLeft: item.level === 3 ? 12 : 0,
            borderLeft: `2px solid ${isActive ? 'var(--color-info)' : 'var(--color-border)'}`,
            paddingTop: 2,
            paddingBottom: 2,
            paddingRight: 0,
            marginLeft: 0,
          };
          const linkStyle: CSSProperties = {
            color: isActive ? 'var(--color-info)' : 'var(--color-text-secondary)',
            fontWeight: isActive ? 500 : 400,
            textDecoration: 'none',
            display: 'block',
            paddingLeft: 10,
          };
          return (
            <li key={item.id} style={itemStyle}>
              <a href={`#${item.id}`} style={linkStyle}>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
