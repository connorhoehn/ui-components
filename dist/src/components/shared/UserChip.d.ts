import type { CSSProperties, MouseEvent } from 'react';
import { type PresenceState } from './PresenceDot';
export interface UserChipProps {
    name: string;
    /** Optional display label (e.g. "@alice"); defaults to `name`. */
    label?: string;
    /** Avatar pixel size. Defaults to 20. */
    avatarSize?: number;
    /** Override the avatar background color. */
    avatarColor?: string;
    /** Show a presence indicator after the name. */
    presence?: PresenceState;
    /** Make the whole chip clickable. */
    onClick?: (e: MouseEvent<HTMLElement>) => void;
    className?: string;
    style?: CSSProperties;
    title?: string;
    /**
     * Classes on the name label alone — a host collapses the chip to its
     * avatar in a narrow column with `labelClassName="hidden @2xl:inline"`,
     * and the `title` (the name) still tells you who it is.
     */
    labelClassName?: string;
    'data-testid'?: string;
}
export declare function UserChip({ name, label, avatarSize, avatarColor, presence, onClick, className, style, title, labelClassName, 'data-testid': testId, }: UserChipProps): import("react").JSX.Element;
export default UserChip;
//# sourceMappingURL=UserChip.d.ts.map