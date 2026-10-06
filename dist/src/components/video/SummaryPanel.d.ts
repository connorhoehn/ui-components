import { type ReactNode } from 'react';
import type { TranscriptStatus } from './TranscriptPanel';
export interface SummaryPanelProps {
    status: TranscriptStatus;
    /** The raw markdown returned by GET /api/recordings/:id/summary. */
    markdown?: string | null;
    /** Caller-provided renderer. If omitted, the markdown is rendered as
     *  a <pre>-wrapped code block — readable but not pretty. */
    renderMarkdown?: (md: string) => ReactNode;
    /** Optional title above the panel. Defaults to "Summary". */
    title?: string;
    /** Written for a person — see TranscriptPanel.errorMessage. */
    errorMessage?: string;
    /** The raw internal text behind it, shown behind a disclosure. */
    errorDetail?: string | null;
    pendingMessage?: string;
    idleState?: ReactNode;
    className?: string;
}
export declare function SummaryPanel({ status, markdown, renderMarkdown, title, errorMessage, errorDetail, pendingMessage, idleState, className, }: SummaryPanelProps): import("react").JSX.Element;
//# sourceMappingURL=SummaryPanel.d.ts.map