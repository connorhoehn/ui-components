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

  const referenceSection = navigationTree.find(s => s.id === 'reference');
  const patternItem = referenceSection?.groups
    .flatMap(g => g.items)
    .find(item => item.path === `/patterns/${slug}`);

  const title = patternItem?.label || slug || 'Pattern';
  const description = slug ? patternDescriptions[slug] : undefined;

  return (
    <div>
      <h1 className="text-[28px] font-bold mb-2 text-text-primary">
        {title}
      </h1>
      <p className="text-[15px] text-text-secondary mb-8 leading-[1.6] max-w-160">
        {description || `Pattern documentation for ${title}.`}
      </p>

      <div className="p-6 bg-surface-panel border border-border rounded-lg mb-6">
        <h3 className="text-[16px] font-semibold mb-3 text-text-primary">Overview</h3>
        <p className="text-[14px] text-text-secondary leading-[1.6] m-0">
          This pattern demonstrates best practices for implementing {title.toLowerCase()} in your application.
          It covers setup, configuration, error handling, and testing strategies.
        </p>
      </div>

      <div className="p-4 bg-warning-bg border border-warning-border rounded-lg text-[13px] text-[#92400e] leading-[1.5]">
        Full pattern documentation with code examples and interactive demos coming soon.
      </div>
    </div>
  );
}
