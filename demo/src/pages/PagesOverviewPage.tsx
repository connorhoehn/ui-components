import { Link } from 'react-router';
import { navigationTree } from '../navigation';

export default function PagesOverviewPage() {
  const pagesSection = navigationTree.find(s => s.id === 'pages');
  if (!pagesSection) return null;

  const descriptions: Record<string, string> = {
    'pipeline-editor': 'Visual node-based editor for building content moderation and data processing pipelines.',
    'document-workspace': 'Real-time collaborative document editing with comments, TOC, and formatting.',
    'ingest-dashboard': 'Live monitoring dashboard for data ingestion pipelines with metrics and alerts.',
    'observability-shell': 'Observability dashboard with logs, traces, and metrics visualization.',
    'social-panel': 'Chat, reactions, and social interaction panel for collaborative spaces.',
    'collaboration': 'Presence indicators, cursors, and real-time collaboration primitives.',
    'node-editor-live': 'CI/CD deployment workflow visualizer with live WebSocket-driven node state updates.',
    'video-streaming': 'Live video streaming with participant grid, floating reactions, and real-time stream stats.',
  };

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>
        Pages
      </h1>
      <p style={{ fontSize: 15, color: '#475569', marginBottom: 32, lineHeight: 1.6, maxWidth: 640 }}>
        Full-page demos combining multiple components into complete application UIs.
        Each page includes live simulations of WebSocket events driving real-time updates.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {pagesSection.groups.flatMap(g => g.items).map(item => (
          <Link
            key={item.id}
            to={item.path}
            style={{
              display: 'block',
              padding: '20px 24px',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              textDecoration: 'none',
              background: '#fff',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
              {descriptions[item.id] || 'Interactive demo page.'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
