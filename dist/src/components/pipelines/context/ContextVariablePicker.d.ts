import type { ContextPath } from './upstreamContext';
export interface ContextVariablePickerProps {
    /** Paths available at this node, from `availableContextPaths`. */
    paths: readonly ContextPath[];
    /** Referenced but unavailable, from `unresolvedTemplatePaths`. */
    unresolved?: readonly string[];
    /** Called with the `{{path}}` text to insert at the cursor. */
    onInsert: (token: string) => void;
    /** Reveal the contributing node on the canvas. */
    onRevealNode?: (nodeId: string) => void;
    className?: string;
}
export declare function ContextVariablePicker({ paths, unresolved, onInsert, onRevealNode, className, }: ContextVariablePickerProps): import("react").JSX.Element;
export default ContextVariablePicker;
//# sourceMappingURL=ContextVariablePicker.d.ts.map