export interface RunsBulkActionBarProps {
  selectionCount: number;
  onExport: () => void;
  onDelete: () => void;
  onClear: () => void;
}

export default function RunsBulkActionBar({
  selectionCount,
  onExport,
  onDelete,
  onClear,
}: RunsBulkActionBarProps) {
  return (
    <div
      data-testid="runs-bulk-toolbar"
      className="flex items-center gap-2 px-3 py-2 bg-surface-inset border border-border rounded-md"
    >
      <span className="text-xs text-text-secondary">
        {selectionCount} selected
      </span>
      <button
        type="button"
        data-testid="runs-bulk-export"
        onClick={onExport}
        className="px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]"
      >
        Export JSON
      </button>
      <button
        type="button"
        data-testid="runs-bulk-delete"
        onClick={onDelete}
        className="px-2.5 py-1 text-xs font-medium border border-danger bg-surface text-danger-fg rounded cursor-pointer font-[inherit]"
      >
        Delete
      </button>
      <button
        type="button"
        data-testid="runs-bulk-clear"
        onClick={onClear}
        className="px-2.5 py-1 text-xs bg-none border-none text-text-secondary cursor-pointer font-[inherit] ml-auto"
      >
        Clear selection
      </button>
    </div>
  );
}
