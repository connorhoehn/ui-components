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
export declare function PlayIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
export declare function PauseIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** Arrow leaving a box: "take this out of here" (pop out of a dock). */
export declare function PopOutIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** A cog: "device settings" — which microphone, speaker and camera this call uses. */
export declare function SettingsGearIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** A speaker with sound waves: output volume / "Test sound". */
export declare function SpeakerIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** A monitor: "present this document" / someone is presenting. */
export declare function MonitorIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** Two arrows pointing out to opposite corners: expand / pop the call out. */
export declare function ExpandIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
/** A phone handset: a call, ringing or in progress. */
export declare function PhoneCallIcon({ size, ...rest }: IconProps): import("react").JSX.Element;
//# sourceMappingURL=MediaIcons.d.ts.map