import { useState, type ReactNode } from 'react';
import { CodeBlock } from '@connorhoehnslalom/ui-components/shared';

interface ExampleBlockProps {
  id: string;
  title: string;
  description?: string;
  code: string;
  children: ReactNode;
  background?: string;
}

export function ExampleBlock({
  id,
  title,
  description,
  code,
  children,
  background,
}: ExampleBlockProps) {
  const [showCode, setShowCode] = useState(false);

  const previewClass =
    'border border-border rounded-lg p-6' +
    (background ? '' : ' bg-surface-panel');

  return (
    <div className="mb-10">
      <h3 id={id} className="text-lg font-semibold mb-1.5 text-text-primary">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-text-secondary mb-3 leading-relaxed">
          {description}
        </p>
      )}
      <div
        className={previewClass}
        style={background ? { background } : undefined}
      >
        {children}
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="button"
          className="bg-transparent border border-border rounded px-2.5 py-1 text-xs text-text-secondary cursor-pointer font-[inherit] hover:bg-surface-panel"
          onClick={() => setShowCode((v) => !v)}
        >
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>
      {showCode && (
        <div className="mt-2">
          <CodeBlock code={code} language="tsx" theme="dark" />
        </div>
      )}
    </div>
  );
}
