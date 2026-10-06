import type { ReactNode } from 'react';
export interface RailSectionAction {
    /** The accessible name and the tooltip — "Create a channel", not "+". */
    label: string;
    /** Defaults to a plus. */
    icon?: ReactNode;
    /** Receives the button itself, so an anchored popover can point at it. */
    onClick: (trigger: HTMLElement) => void;
    'data-testid'?: string;
}
export interface RailSectionHeaderProps {
    label: string;
    /** Right-aligned, in order. Usually one +. */
    actions?: readonly RailSectionAction[];
    /**
     * The heading names the list that follows, and that list already carries
     * the same name — announcing both is the label twice. Sections whose list
     * is NOT separately named should pass false.
     *
     * Ignored once the header is a disclosure: the label is then the control's
     * own name, and a control that is `aria-hidden` cannot be reached or
     * announced at all. See `toggleId` for how the name stays said once.
     */
    presentational?: boolean;
    /**
     * Given together with `onToggleCollapse`, the whole label becomes the
     * disclosure control — a target the width of the heading, the way Teams and
     * Slack fold their rail sections, rather than a 12px chevron people miss.
     *
     * Controlled on purpose. Collapsing a section is a preference, not a
     * transient: the host owns the state so it can persist it and have the rail
     * come back the way it was left.
     */
    collapsed?: boolean;
    /** Fires with the state the host should switch to. */
    onToggleCollapse?: (next: boolean) => void;
    /** Id of the region this header folds away, for `aria-controls`. */
    controls?: string;
    /**
     * Put on the disclosure button itself, so the region it controls can point
     * an `aria-labelledby` back at it instead of repeating the same word in its
     * own `aria-label`. That is what keeps the name said once now that
     * `presentational` can no longer hide the heading.
     */
    toggleId?: string;
    /**
     * Unread hiding under a collapsed section — rendered only while collapsed.
     *
     * Collapsing is only safe to reach for if the rail still tells you when
     * something arrived in what you folded away; without it, hiding a section is
     * the same as muting it by accident.
     */
    collapsedCount?: number;
    /**
     * How many things the section holds — "GUIDES & FINDINGS  11". Plain
     * muted text, the shared rail group count (since 2.397.0; a bordered pill
     * from 2.389.4, a soft neutral chip before) at the right end of the heading, before any actions, shown whenever
     * a number is given (0 included) and whatever the collapsed state. Unlike
     * `collapsedCount` it is a size, not an alert. Since 2.389.0.
     */
    count?: number;
    /** Light-on-dark, for a rail sitting on call chrome. */
    dark?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function RailSectionHeader({ label, actions, presentational, collapsed, onToggleCollapse, controls, toggleId, collapsedCount, count, dark, className, 'data-testid': testId, }: RailSectionHeaderProps): import("react").JSX.Element;
export default RailSectionHeader;
//# sourceMappingURL=RailSectionHeader.d.ts.map