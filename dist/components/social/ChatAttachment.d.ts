export interface ChatAttachment {
    /** Correlation id shared with the sender's in-flight transfer. */
    id: string;
    /** Original filename. User content — never used as a path, never trusted. */
    name: string;
    /** Byte length of the stored object. */
    size: number;
    /** Declared MIME type. Advisory: used to pick a layout, never to trust. */
    contentType: string;
    /**
     * Authenticated download URL. Because the download route requires a bearer
     * token, an `<img src>` pointed straight at this will 401 — a resolved
     * object URL should be handed in as `src` by the integration layer.
     */
    url: string;
    /** Intrinsic dimensions when known, so the row reserves space before load. */
    width?: number;
    height?: number;
    /**
     * Tiny inline data-URI placeholder captured by the sender before upload.
     * Lets a recipient see what the image IS while the bytes are still moving.
     */
    preview?: string;
}
export declare function isImageAttachment(a: {
    contentType?: string;
}): boolean;
export { formatBytes } from '../../lib/formatBytes';
export interface AttachmentBubbleProps {
    attachment: ChatAttachment;
    /**
     * Resolved, directly-renderable source for an image (typically an object
     * URL produced by an authenticated fetch). Falls back to `attachment.preview`
     * so the recipient sees the placeholder rather than a broken image while
     * the full-size fetch is in flight.
     *
     * `undefined` means "not resolved yet"; **`null` means it will not resolve**
     * — the fetch failed, the row is gone, the viewer is not permitted. The two
     * cannot be collapsed: with only `undefined` to work with, a picture that
     * can never arrive says "Loading image…" for as long as the thread stays
     * open, which is a promise the component has no way to keep.
     */
    src?: string | null;
    /** Invoked when the viewer activates the attachment (open / download). */
    onOpen?: (attachment: ChatAttachment) => void;
    className?: string;
}
export declare function AttachmentBubble({ attachment, src, onOpen, className }: AttachmentBubbleProps): import("react").JSX.Element;
export type TransferPhase = 'started' | 'transferring' | 'verifying' | 'complete' | 'failed' | 'cancelled';
export interface ChatTransfer {
    transferId: string;
    /**
     * Who is sending, for DISPLAY ONLY. A human-facing name is not an identity:
     * two people can be called "Alex", and one person can rename themselves
     * mid-transfer. Never decide ownership from this field — use `uploader`.
     */
    actor: string;
    /**
     * Authed user id of the sender — the reliable identity for "is this mine".
     * Mirrors realtime-modules' `ChannelTransfer.uploader`. Optional because
     * hosts on older transports may not carry it; when it is absent the panel
     * falls back to the display-name comparison, which is the pre-existing
     * (wrong, but no worse than before) behaviour.
     */
    uploader?: string;
    name: string;
    size: number;
    transferred: number;
    phase: TransferPhase;
    contentType?: string;
    preview?: string;
    error?: string;
}
/**
 * Decides whether an in-flight transfer belongs to the viewer.
 *
 * Identity first, name never. The old test was `transfer.actor ===
 * currentActor` — a comparison of two DISPLAY NAMES — which handed each of two
 * participants called "Alex" a cancel button on the other's upload, and moved
 * ownership of a live transfer the moment somebody renamed themselves. When
 * both sides carry an authed id we compare ids and STOP: we deliberately do
 * not fall back to names on an id mismatch, because a fallback would
 * reintroduce exactly the collision the id exists to rule out.
 *
 * The name comparison survives only for transfers that carry no id at all,
 * where it is the only signal available. A transfer that DOES carry an
 * `uploader` and a viewer who cannot be identified by id is answered "not
 * mine" — the cancel button is withheld rather than offered to a guess.
 */
export declare function isOwnTransfer(transfer: Pick<ChatTransfer, 'actor' | 'uploader'>, currentUserId?: string, currentActor?: string): boolean;
export interface TransferBubbleProps {
    transfer: ChatTransfer;
    /**
     * True when the viewer is the sender. Only the sender gets a cancel
     * affordance — a recipient cancelling someone else's upload is not a
     * feature, and offering the button implies a permission that does not exist.
     */
    mine?: boolean;
    onCancel?: (transferId: string) => void;
    className?: string;
}
export declare function TransferBubble({ transfer, mine, onCancel, className }: TransferBubbleProps): import("react").JSX.Element;
export default AttachmentBubble;
//# sourceMappingURL=ChatAttachment.d.ts.map