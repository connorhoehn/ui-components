export interface ContextEditBufferProps {
    inputContext: Record<string, unknown>;
    buffer: Record<string, unknown>;
    parseErrors: Record<string, string>;
    newKeyDraft: {
        key: string;
        value: string;
    };
    setNewKeyDraft: (d: {
        key: string;
        value: string;
    }) => void;
    onCommitNewKey: () => void;
    onBeginEditKey: (key: string, currentValue: unknown) => void;
    onSetValue: (key: string, value: unknown) => void;
    onRemoveKey: (key: string) => void;
    onParseError: (key: string, msg: string) => void;
}
export declare function ContextEditBuffer({ inputContext, buffer, parseErrors, newKeyDraft, setNewKeyDraft, onCommitNewKey, onBeginEditKey, onSetValue, onRemoveKey, onParseError, }: ContextEditBufferProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ContextEditBuffer.d.ts.map