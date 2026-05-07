import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { navigationTree } from '../navigation';
import type { NavSection } from '../navigation';

export function Sidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [hovered, setHovered] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <aside style={{
      position: 'fixed',
      top: 56,
      left: 0,
      bottom: 0,
      width: 240,
      overflowY: 'auto',
      borderRight: '1px solid #e2e8f0',
      background: '#fff',
      padding: '16px 0',
      zIndex: 900,
    }}>
      {navigationTree.map((section: NavSection) => {
        const isCollapsed = collapsed[section.id] ?? false;
        const isSectionActive = pathname.startsWith(section.basePath);

        return (
          <div key={section.id} style={{ marginBottom: 8 }}>
            {/* Section header */}
            <button
              onClick={() => toggleSection(section.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px 20px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isSectionActive ? '#2563eb' : '#64748b',
                gap: 6,
              }}
            >
              <span style={{
                display: 'inline-block',
                fontSize: 10,
                transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                transition: 'transform 0.15s',
              }}>
                &#9660;
              </span>
              {section.label}
            </button>

            {/* Section content */}
            {!isCollapsed && (
              <div>
                {section.groups.map(group => (
                  <div key={group.id} style={{ marginBottom: 4 }}>
                    {/* Group label */}
                    {group.label && (
                      <div style={{
                        padding: '6px 20px 4px 32px',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#475569',
                      }}>
                        {group.label}
                      </div>
                    )}

                    {/* Nav items */}
                    {group.items.map(item => {
                      const active = isActive(item.path);
                      const isHovered = hovered === item.id;
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          onMouseEnter={() => setHovered(item.id)}
                          onMouseLeave={() => setHovered(null)}
                          style={{
                            display: 'block',
                            padding: '6px 20px 6px 28px',
                            fontSize: 13,
                            fontWeight: active ? 500 : 400,
                            color: active ? '#2563eb' : '#334155',
                            textDecoration: 'none',
                            borderLeft: active ? '3px solid #2563eb' : '3px solid transparent',
                            background: active ? '#eff6ff' : (isHovered ? '#f8fafc' : 'transparent'),
                            transition: 'background 0.1s, color 0.1s',
                          }}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
