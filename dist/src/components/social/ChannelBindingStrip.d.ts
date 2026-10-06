export interface ChannelBindingChoice {
    value: string;
    label: string;
}
export interface ChannelBindingStripProps {
    /** Leading label, e.g. "Discussion". */
    label: string;
    /** The bound channel; omit when nothing is bound. */
    channel?: {
        name: string;
        privacy?: 'public' | 'private';
    };
    /** Newest line, already summarised ("Mira: shipping Friday"). */
    latest?: string | null;
    /** Shown beside the channel when the viewer is not a member. */
    notice?: string;
    openLabel?: string;
    /** Cross into the channel's own workspace. Hidden when omitted. */
    onOpen?: () => void;
    openDisabled?: boolean;
    /** Channels that could be bound. Binding UI renders only with `onBind`. */
    choices?: readonly ChannelBindingChoice[];
    onBind?: (value: string) => void | Promise<void>;
    /** Unbind button renders only when provided. */
    onUnbind?: () => void | Promise<void>;
    busy?: boolean;
    error?: string | null;
    unboundLabel?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function ChannelBindingStrip({ label, channel, latest, notice, openLabel, onOpen, openDisabled, choices, onBind, onUnbind, busy, error, unboundLabel, className, 'data-testid': testId, }: ChannelBindingStripProps): import("react").JSX.Element;
export default ChannelBindingStrip;
//# sourceMappingURL=ChannelBindingStrip.d.ts.map