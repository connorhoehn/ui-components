import type { IngestItem } from '../../types/ingest';
export interface IngestItemDrawerProps {
    item: IngestItem | null;
    sourceName?: string;
    onClose: () => void;
    onRetry: (itemId: string) => Promise<boolean | void>;
    onSkip: (itemId: string) => Promise<boolean | void>;
}
export default function IngestItemDrawer({ item, sourceName, onClose, onRetry, onSkip }: IngestItemDrawerProps): import("react").JSX.Element | null;
//# sourceMappingURL=IngestItemDrawer.d.ts.map