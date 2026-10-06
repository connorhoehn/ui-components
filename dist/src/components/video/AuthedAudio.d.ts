export interface AuthedAudioProps {
    src: string;
    getAuthToken: () => string | null | Promise<string | null>;
    /** Fires once, when playback first starts — "mark as listened". */
    onFirstPlay?: () => void;
    /** Fetch immediately rather than on the Play click. */
    eager?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function AuthedAudio({ src, getAuthToken, onFirstPlay, eager, className, 'data-testid': testId }: AuthedAudioProps): import("react").JSX.Element;
export default AuthedAudio;
//# sourceMappingURL=AuthedAudio.d.ts.map