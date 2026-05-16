import { useState } from 'react';
import { cn } from '../../../lib/cn';

export interface AgUiReasoningBlockProps {
  /** Reasoning text accumulated from REASONING_MESSAGE_CONTENT events. */
  reasoning: string;
  /** Whether the parent message is still streaming. Drives the "thinking..." vs "Reasoning" label. */
  isStreaming?: boolean;
  /** Default open state. Defaults to false (collapsed). */
  defaultOpen?: boolean;
  /** Optional className for outer wrapper. */
  className?: string;
}

export function AgUiReasoningBlock({
  reasoning,
  isStreaming = false,
  defaultOpen = false,
  className,
}: AgUiReasoningBlockProps) {
  const [open, setOpen] = useState(defaultOpen);

  // Render nothing when reasoning is empty or only whitespace
  if (!reasoning || !reasoning.trim()) {
    return null;
  }

  const tokenCount = reasoning.split(/\s+/).filter(Boolean).length;

  return (
    <div
      className={cn(
        'border border-dashed border-border-emphasis py-2 px-2.5 rounded max-w-full mb-1.5',
        className,
      )}
    >
      {/* Header toggle button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center w-full bg-transparent border-none p-0 cursor-pointer gap-1.5 text-left"
      >
        {/* Chevron icon */}
        <span className="text-[10px] text-text-secondary select-none leading-none w-3 inline-block shrink-0">
          {open ? '▾' : '▸'}
        </span>

        {/* Label */}
        <span className="text-[12px] font-medium text-text-primary flex-1 select-none">
          {isStreaming ? 'Thinking…' : 'Reasoning'}
        </span>

        {/* Token count chip */}
        <span className="text-[11px] text-text-tertiary bg-surface border border-border rounded-[10px] py-px px-[7px] select-none shrink-0">
          {tokenCount} tok
        </span>
      </button>

      {/* Body — shown when open */}
      {open && (
        <div className="max-h-[240px] overflow-y-auto pt-2">
          <pre className="m-0 font-[inherit] text-[12px] text-text-secondary whitespace-pre-wrap break-words leading-[1.6]">
            {reasoning}
            {isStreaming && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-text-secondary ml-1 align-middle [animation:agui-reasoning-pulse_1.4s_ease-in-out_infinite]" />
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AgUiReasoningBlock;
