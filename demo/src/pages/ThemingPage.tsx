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
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>
        Theming
      </h1>
      <p style={{ fontSize: 15, color: '#475569', marginBottom: 32, lineHeight: 1.6 }}>
        Customize the look and feel using design tokens. Supports light and dark modes out of the box.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
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

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        Overriding tokens
      </h2>
      <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
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

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        Dark mode
      </h2>
      <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
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

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        Available tokens
      </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 32 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#475569', fontWeight: 600 }}>Category</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#475569', fontWeight: 600 }}>Examples</th>
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
            <tr key={cat} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 13, fontWeight: 500 }}>{cat}</td>
              <td style={{ padding: '8px 12px', color: '#64748b' }}>{examples}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
