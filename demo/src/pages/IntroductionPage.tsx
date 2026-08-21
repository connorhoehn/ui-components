export default function IntroductionPage() {
  return (
    <div>
      <h1 className="text-[28px] font-bold mb-2 text-text-primary">
        Introduction
      </h1>
      <p className="text-[15px] text-text-secondary mb-8 max-w-160 leading-[1.6]">
        A comprehensive React component library for building real-time collaborative applications.
        Built with TypeScript, designed for composability, and optimized for developer experience.
      </p>

      <h2 className="text-[20px] font-semibold mb-3 text-text-primary">
        What's included
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-4 mb-8">
        {[
          { title: 'Components', desc: 'Buttons, modals, toasts, charts, editors, and more.' },
          { title: 'Hooks', desc: 'WebSocket, presence, cursors, chat, documents, and UI utilities.' },
          { title: 'Patterns', desc: 'Authentication, theming, real-time providers, and embedding guides.' },
          { title: 'Pages', desc: 'Full-page demos combining components and hooks into complete UIs.' },
        ].map(item => (
          <div className="p-5 border border-border rounded-lg bg-surface-panel" key={item.title}>
            <h3 className="text-[15px] font-semibold mb-[6px] text-text-primary">{item.title}</h3>
            <p className="text-[13px] text-neutral m-0 leading-[1.5]">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-[20px] font-semibold mb-3 text-text-primary">
        Design Principles
      </h2>
      <ul className="text-[14px] text-[#334155] leading-[1.8] pl-5">
        <li><strong>Composable:</strong> Small, focused components that combine into complex UIs.</li>
        <li><strong>Real-time first:</strong> Built-in WebSocket integration and collaboration primitives.</li>
        <li><strong>Type-safe:</strong> Full TypeScript coverage with exported types for every component.</li>
        <li><strong>Themeable:</strong> Token-based theming with light/dark mode support.</li>
        <li><strong>Accessible:</strong> ARIA attributes and keyboard navigation out of the box.</li>
      </ul>
    </div>
  );
}
