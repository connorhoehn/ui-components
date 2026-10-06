import { type LegacyDocumentHeaderProps } from './LegacyDocumentHeader';
import { type WorkspaceDocumentHeaderProps } from './WorkspaceDocumentHeader';
export type { DocumentHeaderCallVariant } from './LegacyDocumentHeader';
export type { LifecycleErrorView } from './WorkspaceDocumentHeader';
/**
 * The existing selectable-mode contract remains compatible. New document hosts
 * omit onModeChange: mode is a server-derived fact, and the shared workspace
 * composition owns lifecycle confirmation, ownership and contextual actions.
 */
export type DocumentHeaderProps = LegacyDocumentHeaderProps | (WorkspaceDocumentHeaderProps & {
    onModeChange?: never;
});
export default function DocumentHeader(props: DocumentHeaderProps): import("react").JSX.Element;
//# sourceMappingURL=DocumentHeader.d.ts.map