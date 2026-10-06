export interface DocumentPerson {
    userId: string;
    displayName: string;
    avatarUrl?: string;
}
export interface DocumentOwnershipProps {
    /** The document's owner. Omit while it is still loading — renders nothing. */
    owner?: DocumentPerson | null;
    /**
     * Everyone else with access, owner excluded. Shown as stacked avatars, so
     * the answer to "who else is on this" costs no reading.
     */
    collaborators?: readonly DocumentPerson[];
    /** How many avatars before the rest become a +N. Default 3. */
    maxAvatars?: number;
    /** Opens the share surface. Omit and no Share control is offered. */
    onShare?: () => void;
    className?: string;
    'data-testid'?: string;
}
export declare function DocumentOwnership({ owner, collaborators, maxAvatars, onShare, className, 'data-testid': testId, }: DocumentOwnershipProps): import("react").JSX.Element | null;
export default DocumentOwnership;
//# sourceMappingURL=DocumentOwnership.d.ts.map