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
      <h1 className="text-[28px] font-bold mb-2 text-text-primary">
        Pages
      </h1>
      <p className="text-[15px] text-text-secondary mb-8 leading-[1.6] max-w-160">
        Full-page demos combining multiple components into complete application UIs.
        Each page includes live simulations of WebSocket events driving real-time updates.
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
        {pagesSection.groups.flatMap(g => g.items).map(item => (
          <Link className="block py-5 px-6 border border-border rounded-lg no-underline bg-surface transition-[border-color]"
            key={item.id}
            to={item.path}
          >
            <div className="text-[15px] font-semibold text-text-primary mb-[6px]">
              {item.label}
            </div>
            <div className="text-[13px] text-[#64748b] leading-[1.5]">
              {descriptions[item.id] || 'Interactive demo page.'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
