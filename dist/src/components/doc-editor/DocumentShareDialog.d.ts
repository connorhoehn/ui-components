import type { DocumentPerson } from './DocumentOwnership';
/** What a person may do with the document. */
export type ShareRole = 'owner' | 'editor' | 'commenter' | 'viewer';
export declare const SHARE_ROLES: readonly ShareRole[];
export interface ShareEntry extends DocumentPerson {
    role: ShareRole;
}
/** How the wider organisation sees this document. */
export type GeneralAccess = 'restricted' | 'org-view' | 'org-edit' | 'link-view';
export interface DocumentShareDialogProps {
    open: boolean;
    onClose: () => void;
    documentTitle?: string;
    /** Everyone with explicit access, owner first. */
    people: readonly ShareEntry[];
    generalAccess?: GeneralAccess;
    /** Name of the org, for the general-access wording. */
    orgName?: string;
    onChangeGeneralAccess?: (next: GeneralAccess) => void;
    onChangeRole?: (userId: string, next: ShareRole) => void;
    /** Invite by email or name. The host resolves it to a person. */
    onInvite?: (query: string) => void;
    /** Copy a link to the document. */
    onCopyLink?: () => void;
    /**
     * One line explaining a limit the reader would otherwise discover by being
     * wrong — most usefully, that this host cannot yet SAVE what the dialog
     * shows.
     *
     * The header says this component renders an answer someone else computed
     * and lies if the host lies. That is the correct division of labour and it
     * leaves a gap: a host with no persistence can omit `onChangeRole` to make
     * the roles read-only, but then the reader sees a permissions dialog that
     * simply refuses to work and is told nothing. Withholding a control is
     * honest; withholding the reason is not.
     */
    notice?: string;
    'data-testid'?: string;
}
export declare function DocumentShareDialog({ open, onClose, documentTitle, people, generalAccess, orgName, onChangeGeneralAccess, onChangeRole, onInvite, onCopyLink, notice, 'data-testid': testId, }: DocumentShareDialogProps): import("react").JSX.Element;
export default DocumentShareDialog;
//# sourceMappingURL=DocumentShareDialog.d.ts.map