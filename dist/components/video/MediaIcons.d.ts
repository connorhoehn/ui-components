import type { SVGProps } from 'react';
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    size?: number;
}
export declare function MicIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
export declare function MicOffIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
export declare function VideoIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
export declare function VideoOffIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
export declare function ScreenShareIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
export declare function ScreenShareOffIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
export declare function PhoneOffIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** Add-a-person. Lives here rather than inside CallControls' private
 *  icon map so the docked and expanded call chromes can both render the
 *  same "add people" affordance. */
export declare function UserPlusIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** Sparkles / magic-wand glyph — the media-effects affordance. Pair with
 *  CircularIconToggle in MediaControlsBar's `extras` slot to open a
 *  MediaEffectsTray. */
export declare function SparklesIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** Chat bubble glyph — the in-call chat affordance. Pair with
 *  CircularIconToggle in a controls `extras` slot to open a chat side
 *  panel (CallSidePanel) or the settings dialog's Chat tab. */
export declare function ChatBubbleIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** Roster glyph (two people, no "+") — the People destination in the
 *  call side-panel dock. Distinct from UserPlusIcon, which means "invite
 *  someone new" rather than "show who is here". */
export declare function UsersIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** CC / captions glyph — the live-captions affordance. */
export declare function CaptionsIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
export declare function MoreHorizontalIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
//# sourceMappingURL=MediaIcons.d.ts.map