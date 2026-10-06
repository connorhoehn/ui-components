import { type PromptContextItem } from '../../hooks/usePromptContext';
export interface PromptContextPickerProps {
    /** The host's document search. An empty query may return recent documents. */
    search: (query: string) => Promise<readonly PromptContextItem[]> | readonly PromptContextItem[];
    /** The prompt-context scope (default 'documents'). */
    scope?: string;
    /** Accessible name of the "+" button. */
    label?: string;
    placeholder?: string;
    /** Milliseconds between the last keystroke and the search. */
    debounceMs?: number;
    'data-testid'?: string;
}
export declare function PromptContextPicker({ search, scope, label, placeholder, debounceMs, 'data-testid': testId, }: PromptContextPickerProps): import("react").JSX.Element;
export default PromptContextPicker;
//# sourceMappingURL=PromptContextPicker.d.ts.map