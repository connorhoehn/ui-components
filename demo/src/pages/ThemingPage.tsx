const codeBlockStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#e2e8f0',
  padding: '16px 20px',
  borderRadius: 8,
  fontSize: 13,
  fontFamily: 'ui-monospace, "SF Mono", "Cascadia Code", Menlo, monospace',
  overflowX: 'auto',
  lineHeight: 1.6,
  marginBottom: 24,
};

export default function ThemingPage() {
  return (
    <div>
      <h1 className="text-[28px] font-bold mb-2 text-text-primary">
        Theming
      </h1>
      <p className="text-[15px] text-text-secondary mb-8 leading-[1.6]">
        Customize the look and feel using design tokens. Supports light and dark modes out of the box.
      </p>

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        ThemeProvider setup
      </h2>
      <pre style={codeBlockStyle}>
{`import { ThemeProvider } from '@connorhoehnslalom/ui-components';

function App() {
  return (
    <ThemeProvider mode="light">
      <YourApp />
    </ThemeProvider>
  );
}`}
      </pre>

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        Overriding tokens
      </h2>
      <p className="text-[14px] text-text-secondary mb-3">
        Pass a partial token object to customize specific values:
      </p>
      <pre style={codeBlockStyle}>
{`<ThemeProvider
  mode="light"
  tokens={{
    colors: {
      primary: '#7c3aed',
      primaryHover: '#6d28d9',
      background: '#fafafa',
    },
    radii: {
      md: '8px',
      lg: '12px',
    },
  }}
>
  <YourApp />
</ThemeProvider>`}
      </pre>

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        Dark mode
      </h2>
      <p className="text-[14px] text-text-secondary mb-3">
        Toggle between modes dynamically:
      </p>
      <pre style={codeBlockStyle}>
{`import { useState } from 'react';
import { ThemeProvider } from '@connorhoehnslalom/ui-components';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  return (
    <ThemeProvider mode={mode}>
      <button onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}>
        Toggle theme
      </button>
      <YourApp />
    </ThemeProvider>
  );
}`}
      </pre>

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        Available tokens
      </h2>
      <table className="w-full border-collapse text-[14px] mb-8">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="text-left py-2 px-3 text-text-secondary font-semibold">Category</th>
            <th className="text-left py-2 px-3 text-text-secondary font-semibold">Examples</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['colors', 'primary, secondary, background, surface, text, border'],
            ['spacing', 'xs, sm, md, lg, xl, 2xl'],
            ['radii', 'sm, md, lg, full'],
            ['typography', 'fontFamily, fontSize (sm/md/lg), fontWeight (normal/medium/bold)'],
            ['shadows', 'sm, md, lg'],
          ].map(([cat, examples]) => (
            <tr className="border-b border-surface-hover" key={cat}>
              <td className="py-2 px-3 font-mono text-[13px] font-medium">{cat}</td>
              <td className="py-2 px-3 text-[#64748b]">{examples}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
