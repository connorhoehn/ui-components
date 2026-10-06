import { type Attachment } from './attachmentText';
export interface AttachmentBlockProps {
    attachment: Attachment;
    /** False hides the Remove control. Opening is never gated on it. */
    editable?: boolean;
    /** A directly-followable URL. Ignored when `onOpen` is given. */
    href?: string | null;
    /** The host opens it with credentials. Wins over `href`. */
    onOpen?: () => void;
    /**
     * A renderable `src` for an image attachment — an object URL the host
     * resolved, or `null` while it has not / could not. Only consulted when
     * `type` is `image/*`.
     */
    previewSrc?: string | null;
    onRemove?: () => void;
    'data-testid'?: string;
}
export declare function AttachmentBlock({ attachment, editable, href, onOpen, previewSrc, onRemove, 'data-testid': testId, }: AttachmentBlockProps): import("react").JSX.Element;
export default AttachmentBlock;
//# sourceMappingURL=AttachmentBlock.d.ts.map