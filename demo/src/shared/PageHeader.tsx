interface PageHeaderProps {
  title: string;
  description: string;
  importPath?: string;
}

export function PageHeader({ title, description, importPath }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="m-0 mb-2 text-[28px] font-bold text-text-primary">{title}</h1>
      <p className="m-0 mb-4 max-w-160 text-[15px] leading-[1.6] text-text-secondary">
        {description}
      </p>
      {importPath && (
        <code className="inline-block rounded-md bg-surface-inverse px-3 py-1.5 font-mono text-[13px] text-code-text">
          {importPath}
        </code>
      )}
    </div>
  );
}
