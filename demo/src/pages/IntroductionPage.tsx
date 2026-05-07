export default function IntroductionPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>
        Introduction
      </h1>
      <p style={{ fontSize: 15, color: '#475569', marginBottom: 32, maxWidth: 640, lineHeight: 1.6 }}>
        A comprehensive React component library for building real-time collaborative applications.
        Built with TypeScript, designed for composability, and optimized for developer experience.
      </p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        What's included
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { title: 'Components', desc: 'Buttons, modals, toasts, charts, editors, and more.' },
          { title: 'Hooks', desc: 'WebSocket, presence, cursors, chat, documents, and UI utilities.' },
          { title: 'Patterns', desc: 'Authentication, theming, real-time providers, and embedding guides.' },
          { title: 'Pages', desc: 'Full-page demos combining components and hooks into complete UIs.' },
        ].map(item => (
          <div key={item.title} style={{
            padding: 20,
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            background: '#f8fafc',
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: '#0f172a' }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        Design Principles
      </h2>
      <ul style={{ fontSize: 14, color: '#334155', lineHeight: 1.8, paddingLeft: 20 }}>
        <li><strong>Composable:</strong> Small, focused components that combine into complex UIs.</li>
        <li><strong>Real-time first:</strong> Built-in WebSocket integration and collaboration primitives.</li>
        <li><strong>Type-safe:</strong> Full TypeScript coverage with exported types for every component.</li>
        <li><strong>Themeable:</strong> Token-based theming with light/dark mode support.</li>
        <li><strong>Accessible:</strong> ARIA attributes and keyboard navigation out of the box.</li>
      </ul>
    </div>
  );
}
