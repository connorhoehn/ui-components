import { colors } from '../../constants/styles';

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
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        background: colors.surfaceInset,
        border: `1px solid ${colors.border}`,
        borderRadius: 6,
      }}
    >
      <span style={{ fontSize: 12, color: colors.textSecondary }}>
        {selectionCount} selected
      </span>
      <button
        type="button"
        data-testid="runs-bulk-export"
        onClick={onExport}
        style={{
          padding: '4px 10px',
          fontSize: 12,
          fontWeight: 500,
          border: `1px solid ${colors.border}`,
          background: colors.surface,
          color: colors.textSecondary,
          borderRadius: 4,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Export JSON
      </button>
      <button
        type="button"
        data-testid="runs-bulk-delete"
        onClick={onDelete}
        style={{
          padding: '4px 10px',
          fontSize: 12,
          fontWeight: 500,
          border: `1px solid ${colors.state.failed}`,
          background: colors.surface,
          color: colors.state.failed,
          borderRadius: 4,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Delete
      </button>
      <button
        type="button"
        data-testid="runs-bulk-clear"
        onClick={onClear}
        style={{
          padding: '4px 10px',
          fontSize: 12,
          background: 'none',
          border: 'none',
          color: colors.textSecondary,
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginLeft: 'auto',
        }}
      >
        Clear selection
      </button>
    </div>
  );
}
