export const codeBlockClass =
  'm-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto';

export const proseBlockClass =
  'px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto';

export const thClass =
  'text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase';

export const tdClass =
  'px-2 py-[5px] text-[11px] text-text-secondary align-top';

export function eventChipClass(color: string): string {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold`;
}

export function eventChipStyle(color: string): { background: string; color: string } {
  return {
    background: color + '18',
    color,
  };
}
