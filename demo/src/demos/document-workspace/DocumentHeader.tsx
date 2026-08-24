import { Button, Chip, SegmentedControl } from '@connorhoehnslalom/ui-components/shared';

interface DocumentHeaderProps {
  title: string;
  status: string;
  lastEditedAgo: string;
  activeMode: string;
  onModeChange: (mode: string) => void;
}

const MODE_OPTIONS = [
  { label: 'Editor', value: 'Editor' },
  { label: 'Review', value: 'Review' },
  { label: 'Read', value: 'Read' },
];

export function DocumentHeader({
  title,
  status,
  lastEditedAgo,
  activeMode,
  onModeChange,
}: DocumentHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface px-6 py-3">
      <div className="mb-2 flex items-center gap-3">
        <span className="cursor-pointer text-[13px] font-medium text-info">
          &larr; Documents
        </span>
        <h1 className="m-0 text-[18px] font-semibold text-text-primary">{title}</h1>
        <Chip tone="success" uppercase>
          {status}
        </Chip>
        <span className="ml-2 text-[12px] text-text-tertiary">{lastEditedAgo}</span>
      </div>
      <div className="flex items-center gap-2">
        <SegmentedControl
          options={MODE_OPTIONS}
          value={activeMode}
          onChange={onModeChange}
          size="sm"
        />
        <div className="flex-[1]" />
        <Button variant="secondary" size="sm">My Items</Button>
        <Button variant="secondary" size="sm">Call</Button>
        <Button variant="primary" size="sm">Finalize</Button>
        <Button variant="secondary" size="sm" aria-label="More actions">
          &hellip;
        </Button>
      </div>
    </header>
  );
}
