import { ReactNode } from 'react';
import { StatusPillState } from '../../shared/StatusPill';
export interface NodeCardProps {
    /** Emoji or short string icon for the node type. */
    icon: string;
    label: string;
    subtitle?: string;
    /** Maps to StatusPill state — drives the pill and border accent. */
    status?: StatusPillState;
    /** Status label shown in the pill. Defaults to a capitalized form of status. */
    statusLabel?: string;
    /** Body content slot (preview text, stats, etc.). */
    body?: ReactNode;
    /** Whether the card appears selected (elevated shadow). */
    selected?: boolean;
    /** Accent color for the left border strip (Tailwind bg-* class). */
    accentClass?: string;
    className?: string;
    onClick?: () => void;
}
export declare function NodeCard({ icon, label, subtitle, status, statusLabel, body, selected, accentClass, className, onClick, }: NodeCardProps): import("react").JSX.Element;
export default NodeCard;
//# sourceMappingURL=NodeCard.d.ts.map