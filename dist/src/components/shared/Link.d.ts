import { type AnchorHTMLAttributes, type ReactNode } from 'react';
export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    /** Required — a link with nowhere to go is a button. */
    href: string;
    children: ReactNode;
    /**
     * Open in a new tab. Sets `target="_blank"` and forces safe `rel`.
     * Prefer this over passing `target` yourself.
     */
    external?: boolean;
    /**
     * Drop the default `text-primary … hover:underline` styling, for a link that
     * wraps something already styled (a card, an avatar, a whole row).
     */
    unstyled?: boolean;
}
export declare function Link({ href, children, external, unstyled, target, rel, className, ...rest }: LinkProps): import("react").JSX.Element;
//# sourceMappingURL=Link.d.ts.map