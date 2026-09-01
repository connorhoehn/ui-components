import { type RefObject } from 'react';
export interface LinkPopoverProps {
    trigger: RefObject<HTMLElement | null>;
    open: boolean;
    onClose: () => void;
    /** Existing href when editing a link, empty when creating one. */
    initialHref?: string;
    onSubmit: (href: string) => void;
    /** Omitted when there is no link to remove. */
    onRemove?: () => void;
    'data-testid'?: string;
}
/**
 * Rejects what must never become an href.
 *
 * `javascript:` and `data:` in a stored document are a script-execution
 * vector for every future reader, not just the author — so this is checked
 * here as well as at the schema layer. Normalised first because
 * `Java\tScript:` and leading control characters are the standard ways to
 * slip past a naive prefix check; browsers ignore those characters when
 * resolving the scheme, so the check has to as well.
 */
export declare function isSafeHref(raw: string): boolean;
/**
 * Adds a scheme to a bare host so `example.dev` links somewhere.
 *
 * Left alone: anything already carrying a scheme, a root-relative path, an
 * anchor, and `mailto:`. Guessing `https://` for `/docs/a` would break an
 * internal link, which is a worse failure than a link the user must fix.
 */
export declare function normaliseHref(raw: string): string;
export default function LinkPopover({ trigger, open, onClose, initialHref, onSubmit, onRemove, 'data-testid': testId, }: LinkPopoverProps): import("react").JSX.Element;
//# sourceMappingURL=LinkPopover.d.ts.map