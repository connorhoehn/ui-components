import { Link } from 'react-router';
import { CodeBlock, Chip } from '@connorhoehnslalom/ui-components/shared';
import { HOOK_GROUP_LABEL, type HookDoc as HookDocData } from './hook-docs';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-text-primary m-0 mt-2 mb-3">
      {children}
    </h2>
  );
}

export function HookDoc({ doc }: { doc: HookDocData }) {
  return (
    <article className="flex flex-col gap-8 max-w-3xl">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Chip tone="info" size="sm">{HOOK_GROUP_LABEL[doc.group]}</Chip>
        </div>
        <h1 className="text-2xl font-bold text-text-primary m-0 font-mono">
          {doc.name}
        </h1>
        <p className="text-base text-text-secondary m-0 leading-relaxed">
          {doc.summary}
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <SectionHeading>Description</SectionHeading>
        <p className="text-sm text-text-primary leading-relaxed m-0">
          {doc.description}
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading>Signature</SectionHeading>
        <CodeBlock code={doc.signature} language="ts" theme="dark" />
      </section>

      {doc.params.length > 0 && (
        <section className="flex flex-col gap-3">
          <SectionHeading>Parameters</SectionHeading>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-surface-panel">
                <tr>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-neutral px-4 py-2 border-b border-border">
                    Name
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-neutral px-4 py-2 border-b border-border">
                    Type
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-neutral px-4 py-2 border-b border-border">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {doc.params.map((p) => (
                  <tr key={p.name} className="border-b border-border-subtle last:border-b-0">
                    <td className="px-4 py-2 align-top">
                      <code className="font-mono text-[13px] text-text-primary">{p.name}</code>
                      {p.required && (
                        <span className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-danger-fg">
                          required
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 align-top">
                      <code className="font-mono text-[12px] text-primary-fg">{p.type}</code>
                    </td>
                    <td className="px-4 py-2 align-top text-text-primary">
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {doc.returns.length > 0 && (
        <section className="flex flex-col gap-3">
          <SectionHeading>Returns</SectionHeading>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-surface-panel">
                <tr>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-neutral px-4 py-2 border-b border-border">
                    Field
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-neutral px-4 py-2 border-b border-border">
                    Type
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-neutral px-4 py-2 border-b border-border">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {doc.returns.map((r) => (
                  <tr key={r.name} className="border-b border-border-subtle last:border-b-0">
                    <td className="px-4 py-2 align-top">
                      <code className="font-mono text-[13px] text-text-primary">{r.name}</code>
                    </td>
                    <td className="px-4 py-2 align-top">
                      <code className="font-mono text-[12px] text-primary-fg">{r.type}</code>
                    </td>
                    <td className="px-4 py-2 align-top text-text-primary">{r.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <SectionHeading>Example</SectionHeading>
        <CodeBlock code={doc.example} language="tsx" theme="dark" />
      </section>

      {doc.related.length > 0 && (
        <section className="flex flex-col gap-3">
          <SectionHeading>See also</SectionHeading>
          <ul className="flex flex-col gap-2 m-0 p-0 list-none">
            {doc.related.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-primary-fg hover:text-primary-fg hover:underline no-underline"
                >
                  &rarr; {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
