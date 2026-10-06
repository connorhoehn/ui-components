export interface LinkDialogValue {
    href: string;
    /** The visible text. Empty means "keep whatever is selected". */
    text: string;
}
export interface LinkDialogProps {
    open: boolean;
    /** Selected text at the time the dialog opened; prefills the label. */
    initialText?: string;
    /** Existing href when editing a link rather than creating one. */
    initialHref?: string;
    onSubmit: (value: LinkDialogValue) => void;
    onRemove?: () => void;
    onClose: () => void;
    'data-testid'?: string;
}
/**
 * Accepts what people actually paste.
 *
 * `example.com` is a URL to everyone except a URL parser, so a bare host gets
 * https://. Anything with a scheme is left alone — including mailto: and
 * relative paths, which a naive prefix would corrupt.
 */
export declare function normalizeHref(raw: string): string;
export declare function LinkDialog({ open, initialText, initialHref, onSubmit, onRemove, onClose, 'data-testid': testId, }: LinkDialogProps): import("react").JSX.Element;
export default LinkDialog;
//# sourceMappingURL=LinkDialog.d.ts.map