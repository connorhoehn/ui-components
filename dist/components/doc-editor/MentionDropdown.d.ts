import React from 'react';
import type { MentionUser } from '../../hooks/useMentionUsers';
export interface MentionDropdownProps {
    query: string;
    users: MentionUser[];
    position: {
        top: number;
        left: number;
    };
    onSelect: (user: MentionUser) => void;
    onDismiss: () => void;
}
export interface MentionDropdownHandle {
    /** Forward a keydown event from the parent input. Returns true if the dropdown consumed it. */
    handleKeyDown: (e: React.KeyboardEvent | KeyboardEvent) => boolean;
}
export declare const MentionDropdown: React.ForwardRefExoticComponent<MentionDropdownProps & React.RefAttributes<MentionDropdownHandle>>;
export type { MentionUser };
//# sourceMappingURL=MentionDropdown.d.ts.map