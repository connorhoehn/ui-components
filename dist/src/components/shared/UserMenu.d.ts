import { ReactNode } from 'react';
export interface UserMenuItem {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    /** Render a divider above this item */
    separator?: boolean;
    /** Style this item as destructive */
    danger?: boolean;
}
export interface UserMenuUser {
    name: string;
    email: string;
    avatarUrl?: string;
}
export interface UserMenuProps {
    user: UserMenuUser;
    items: UserMenuItem[];
    className?: string;
    'data-testid'?: string;
}
export declare function UserMenu({ user, items, className, 'data-testid': testId }: UserMenuProps): import("react").JSX.Element;
export default UserMenu;
//# sourceMappingURL=UserMenu.d.ts.map