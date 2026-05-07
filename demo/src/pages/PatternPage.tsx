import { useParams } from 'react-router';
import { navigationTree } from '../navigation';

const patternDescriptions: Record<string, string> = {
  'websocket-provider': 'How to configure the WebSocketProvider with authentication, reconnection strategies, and channel management.',
  'auth-integration': 'Integrating identity providers (OAuth, SAML) with the IdentityContext for secure sessions.',
  'theming': 'Advanced theming patterns: dynamic token generation, CSS variable mapping, and runtime theme switching.',
  'custom-renderers': 'Extending components with custom render functions for cells, nodes, and list items.',
  'simulations': 'Using the mock engine to simulate WebSocket traffic, latency, and failure scenarios for testing.',
  'embedding-modules': 'Embedding individual modules (chat, presence, editor) into existing applications as micro-frontends.',
};

export default function PatternPage() {
  const { slug } = useParams();

  const patternsSection = navigationTree.find(s => s.id === 'patterns');
  const patternItem = patternsSection?.groups
    .flatMap(g => g.items)
    .find(item => item.path === `/patterns/${slug}`);

  const title = patternItem?.label || slug || 'Pattern';
  const description = slug ? patternDescriptions[slug] : undefined;

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>
        {title}
      </h1>
      <p style={{ fontSize: 15, color: '#475569', marginBottom: 32, lineHeight: 1.6, maxWidth: 640 }}>
        {description || `Pattern documentation for ${title}.`}
      </p>

      <div style={{
        padding: 24,
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        marginBottom: 24,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>Overview</h3>
        <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: 0 }}>
          This pattern demonstrates best practices for implementing {title.toLowerCase()} in your application.
          It covers setup, configuration, error handling, and testing strategies.
        </p>
      </div>

      <div style={{
        padding: 16,
        background: '#fffbeb',
        border: '1px solid #fde68a',
        borderRadius: 8,
        fontSize: 13,
        color: '#92400e',
        lineHeight: 1.5,
      }}>
        Full pattern documentation with code examples and interactive demos coming soon.
      </div>
    </div>
  );
}
