import { CodeBlock } from '@connorhoehnslalom/ui-components/shared';
export default function InstallationPage() {
  return (
    <div>
      <h1 className="text-[28px] font-bold mb-2 text-text-primary">
        Installation
      </h1>
      <p className="text-[15px] text-text-secondary mb-8 leading-[1.6]">
        Install the package and its peer dependencies to get started.
      </p>

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        1. Configure registry (if private)
      </h2>
      <p className="text-[14px] text-text-secondary mb-3">
        Add to your project's <code className="bg-surface-hover py-[2px] px-[6px] rounded text-[13px]">.npmrc</code>:
      </p>
      <CodeBlock
        className="mb-6"
        language="text"
        theme="dark"
        code={`@connorhoehnslalom:registry=https://npm.pkg.github.com
@connorhoehn:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}`}
      />

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        2. Install the package
      </h2>
      <CodeBlock
        className="mb-6"
        language="bash"
        theme="dark"
        code={`npm install @connorhoehnslalom/ui-components`}
      />

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        3. Peer dependencies
      </h2>
      <p className="text-[14px] text-text-secondary mb-3">
        Ensure the following are installed in your project:
      </p>
      <table className="w-full border-collapse text-[14px] mb-8">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="text-left py-2 px-3 text-text-secondary font-semibold">Package</th>
            <th className="text-left py-2 px-3 text-text-secondary font-semibold">Version</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['react', '^18.0.0 || ^19.0.0'],
            ['react-dom', '^18.0.0 || ^19.0.0'],
            ['react-router', '^7.0.0'],
          ].map(([pkg, version]) => (
            <tr className="border-b border-surface-hover" key={pkg}>
              <td className="py-2 px-3 font-mono text-[13px]">{pkg}</td>
              <td className="py-2 px-3 text-neutral">{version}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-[18px] font-semibold mb-3 text-text-primary">
        4. Verify installation
      </h2>
      <CodeBlock
        className="mb-6"
        language="tsx"
        theme="dark"
        code={`import { Button } from '@connorhoehnslalom/ui-components';

// If this compiles, you're good to go!
console.log(Button);`}
      />
    </div>
  );
}
