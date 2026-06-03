export interface CodeInputProps {
    length?: number;
    onComplete: (code: string) => void;
    error?: string | null;
    disabled?: boolean;
    autoFocus?: boolean;
}
export declare function CodeInput({ length, onComplete, error, disabled, autoFocus, }: CodeInputProps): import("react/jsx-runtime").JSX.Element;
export default CodeInput;
//# sourceMappingURL=CodeInput.d.ts.map