import type { ReactNode } from 'react';
export interface HangoutLayoutParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isLocal?: boolean;
    /** Pre-rendered video element — typically `<video ref={…} autoPlay playsInline />`. */
    videoElement?: ReactNode;
}
export type HangoutMode = 'auto' | 'spotlight';
//# sourceMappingURL=HangoutLayoutTypes.d.ts.map