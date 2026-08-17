import { Link } from 'react-router';
import { CodeBlock, Chip } from '@connorhoehnslalom/ui-components/shared';
import { HOOK_GROUP_LABEL, type HookDoc as HookDocData } from './hook-docs';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-slate-900 m-0 mt-2 mb-3">
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
        <h1 className="text-2xl font-bold text-slate-900 m-0 font-mono">
          {doc.name}
        </h1>
        <p className="text-base text-slate-600 m-0 leading-relaxed">
          {doc.summary}
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <SectionHeading>Description</SectionHeading>
        <p className="text-sm text-slate-700 leading-relaxed m-0">
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
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-4 py-2 border-b border-slate-200">
                    Name
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-4 py-2 border-b border-slate-200">
                    Type
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-4 py-2 border-b border-slate-200">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {doc.params.map((p) => (
                  <tr key={p.name} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-4 py-2 align-top">
                      <code className="font-mono text-[13px] text-slate-900">{p.name}</code>
                      {p.required && (
                        <span className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-danger-fg">
                          required
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 align-top">
                      <code className="font-mono text-[12px] text-primary-fg">{p.type}</code>
                    </td>
                    <td className="px-4 py-2 align-top text-slate-700">
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
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-4 py-2 border-b border-slate-200">
                    Field
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-4 py-2 border-b border-slate-200">
                    Type
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-4 py-2 border-b border-slate-200">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {doc.returns.map((r) => (
                  <tr key={r.name} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-4 py-2 align-top">
                      <code className="font-mono text-[13px] text-slate-900">{r.name}</code>
                    </td>
                    <td className="px-4 py-2 align-top">
                      <code className="font-mono text-[12px] text-primary-fg">{r.type}</code>
                    </td>
                    <td className="px-4 py-2 align-top text-slate-700">{r.description}</td>
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
