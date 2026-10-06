import { type DocumentTypeCookbook } from './index';
export interface CookbookPickerProps {
    /** Fired with the chosen cookbook. Persistence is the caller's business. */
    onPick: (cookbook: DocumentTypeCookbook) => void;
    /** Disables every action while an install is in flight. */
    busy?: boolean;
    /** Label on each card's action button. Default `Install`. */
    actionLabel?: string;
    /**
     * Names of types the host ALREADY has, lower-cased by the host or not — the
     * comparison here is case- and whitespace-insensitive.
     *
     * Opt-in, because "installed" only means something on the types ADMIN page.
     * The same picker also opens the new-document dialog, where you are starting
     * a document rather than installing a type and every cookbook is a valid
     * choice however many you have already used.
     *
     * Measured before this existed: the admin page offered "Add this type" for
     * all fourteen cookbooks including the three already installed, and clicking
     * one produced a SECOND type with the same name, same icon and same field
     * count — indistinguishable from the first in the type list, the create
     * dialog and the document chip.
     */
    installedNames?: readonly string[];
    /** Fired instead of `onPick` when an installed cookbook's card is actioned. */
    onOpenInstalled?: (cookbook: DocumentTypeCookbook) => void;
    /** Focus the search box shortly after mount. Default `false`. */
    autoFocusSearch?: boolean;
    /**
     * Testid stem for the search box, grid and empty state (`<prefix>-search`,
     * `-grid`, `-empty`). Defaults to `cookbooks`, which is what the modal's
     * existing specs address — a second mount of this picker on the same screen
     * MUST pass its own prefix or those selectors match twice.
     */
    idPrefix?: string;
    /** Testid stem for the per-card ids (`<prefix>-card-<id>`, `-use-<id>`, `-cat-<slug>`). */
    cardPrefix?: string;
    /**
     * `fixed` keeps the modal's original three 220px columns; `fluid` fills the
     * width it is given, which is what the Document Types page needs.
     */
    layout?: 'fixed' | 'fluid';
    /** Height cap on the scrolling grid. Default `max-h-[60vh]`. */
    gridHeightClassName?: string;
}
export declare function CookbookPicker({ onPick, busy, actionLabel, autoFocusSearch, idPrefix, cardPrefix, layout, gridHeightClassName, installedNames, onOpenInstalled, }: CookbookPickerProps): import("react").JSX.Element;
export default CookbookPicker;
//# sourceMappingURL=CookbookPicker.d.ts.map