export type PresentationInstructScope = 'slide' | 'deck';
export interface PresentationAgentComposerProps {
    scope: PresentationInstructScope;
    onScopeChange: (scope: PresentationInstructScope) => void;
    /** "slide 3" — what "This slide" means right now. */
    slideLabel: string;
    /** True while an instruction is with the agent. Send is off and the line says so. */
    busy: boolean;
    /** Resolves true when the instruction was applied (the draft clears), false to keep it. */
    onSubmit: (instruction: string) => Promise<boolean>;
    /** One-tap instructions. Picking one sends it. */
    suggestions?: readonly string[];
    testIdPrefix: string;
}
export declare function PresentationAgentComposer({ scope, onScopeChange, slideLabel, busy, onSubmit, suggestions, testIdPrefix, }: PresentationAgentComposerProps): import("react").JSX.Element;
export default PresentationAgentComposer;
//# sourceMappingURL=PresentationAgentComposer.d.ts.map