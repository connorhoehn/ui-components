import { type ReactNode } from 'react';
import type * as RMVideo from '@connorhoehn/realtime-modules/client/video';
import type { RMConversationCallParticipant, RMConversationCallSource } from './conversationCallTypes';
/** The realtime-modules functions ConversationCallDock calls (spread `/client/video`). */
export interface ConversationCallDockModules {
    conversationCallDockProps: typeof RMVideo.conversationCallDockProps;
    useAudioVideoSettings: typeof RMVideo.useAudioVideoSettings;
}
export interface ConversationCallDockProps {
    /** `useConversationCall()`'s result, as-is. */
    call: RMConversationCallSource;
    /** The conversation's name (`#general`, `Alice Chen`, an initiative). */
    title: string;
    /** Opens the host's People panel (the dock's People button). */
    onOpenPeople: () => void;
    /** The People panel is open (the button reads pressed). */
    peopleOpen?: boolean;
    /**
     * The host's own settings surface. Omitted, the dock opens its built-in
     * "Call devices" dialog (AudioVideoSettingsForm bound to useAudioVideoSettings).
     */
    onOpenSettings?: () => void;
    onPopOut?: () => void;
    /** Host controls in the controls row, before the gear (reactions, recording chip). */
    extras?: ReactNode;
    /** Extra rows in the camera menu ("Blur background…"). */
    cameraMenuItems?: {
        label: string;
        onSelect: () => void;
    }[];
    /** Override a participant's camera tile; `undefined` draws their initials. Default: StreamVideo on their stream. */
    tile?: (p: RMConversationCallParticipant) => ReactNode | undefined;
    /** An info line above the shelf while the call is on (e.g. who the call could not ring). */
    notice?: ReactNode;
    /** Name shown on the settings preview. */
    selfName?: string;
    /** 132 × 74 tiles instead of 176 × 88. */
    compact?: boolean;
    className?: string;
    /** The dock's test id; the notice is `<id>-notice`, the settings dialog `<id>-settings`. Default `conversation-call-dock`. */
    'data-testid'?: string;
}
export type ConversationCallDockComponent = (props: ConversationCallDockProps) => React.JSX.Element | null;
/** Bind ConversationCallDock to injected realtime-modules functions. Call once, at module scope. */
export declare function createConversationCallDock(rm: ConversationCallDockModules): ConversationCallDockComponent;
//# sourceMappingURL=ConversationCallDock.d.ts.map