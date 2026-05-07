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

export default function InstallationPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>
        Installation
      </h1>
      <p style={{ fontSize: 15, color: '#475569', marginBottom: 32, lineHeight: 1.6 }}>
        Install the package and its peer dependencies to get started.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        1. Configure registry (if private)
      </h2>
      <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
        Add to your project's <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>.npmrc</code>:
      </p>
      <pre style={codeBlockStyle}>
{`@connorhoehn:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}`}
      </pre>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        2. Install the package
      </h2>
      <pre style={codeBlockStyle}>
{`npm install @connorhoehn/ui-components`}
      </pre>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        3. Peer dependencies
      </h2>
      <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
        Ensure the following are installed in your project:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 32 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#475569', fontWeight: 600 }}>Package</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#475569', fontWeight: 600 }}>Version</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['react', '^18.0.0 || ^19.0.0'],
            ['react-dom', '^18.0.0 || ^19.0.0'],
            ['react-router', '^7.0.0'],
          ].map(([pkg, version]) => (
            <tr key={pkg} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 13 }}>{pkg}</td>
              <td style={{ padding: '8px 12px', color: '#64748b' }}>{version}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#0f172a' }}>
        4. Verify installation
      </h2>
      <pre style={codeBlockStyle}>
{`import { Button } from '@connorhoehn/ui-components';

// If this compiles, you're good to go!
console.log(Button);`}
      </pre>
    </div>
  );
}
