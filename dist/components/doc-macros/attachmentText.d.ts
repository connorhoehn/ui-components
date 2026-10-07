/** The `macro:<name>` discriminator for a file. */
export declare const ATTACHMENT_MACRO_NAME = "attachment";
export interface Attachment {
    /** Original filename. User content — shown, never used as a path. */
    name: string;
    /** Bytes, or `null` when the body does not say. */
    size: number | null;
    /** Declared MIME type, or `''`. Picks a layout; is never trusted. */
    type: string;
    /** Where the bytes are, VERBATIM. */
    url: string;
}
/** The prefix a host-resolved upload carries. */
export declare const UPLOAD_PATH_PREFIX = "/api/uploads/";
/** True for an `url:` the host must fetch with credentials rather than link. */
export declare function isHostedUpload(url: string): boolean;
/** True when the card should try to show the file rather than name it. */
export declare function isImageAttachment(a: {
    type: string;
}): boolean;
/**
 * Parse an attachment body, or `null` when this is not one we can draw.
 *
 * `name:` and `url:` are required — a card with no name is a mystery box and
 * one with no URL is a name lying on the floor. `size:` must be a non-negative
 * integer when present; a body that says `size: large` is declined rather than
 * shown as "NaN B".
 */
export declare function readAttachment(source: string): Attachment | null;
/** True when a node's text is an attachment body we would draw. */
export declare function acceptsAttachment(source: string): boolean;
/**
 * The `href` a reader may follow directly, or `null` when the host must
 * resolve it (a hosted upload) or when it is unsafe (anything `linkHref`
 * refuses). Callers check `isHostedUpload` first to tell the two apart.
 */
export declare function attachmentHref(a: Attachment): string | null;
export interface AttachmentDraft {
    name: string;
    size?: number;
    type?: string;
    url: string;
}
/**
 * The macro body for a file — alphabetical keys, because `sortKeys: true` is
 * what the chassis dumps, and no trailing newline (the closing fence supplies
 * it). `size:` is written plain: js-yaml leaves an integer bare.
 */
export declare function attachmentMacroText(draft: AttachmentDraft): string;
//# sourceMappingURL=attachmentText.d.ts.map