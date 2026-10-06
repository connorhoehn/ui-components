export declare function StepIndicator({ step, total }: {
    step: number;
    total: number;
}): import("react").JSX.Element;
export interface WizardNavProps {
    step: number;
    totalSteps: number;
    canAdvance: boolean;
    isEditing: boolean;
    onCancel: () => void;
    onBack: () => void;
    onNext: () => void;
    onExportSchema?: () => void;
    /**
     * Why the last export attempt failed, rendered next to the button.
     *
     * The alternative a library component must NOT reach for is `alert()`: it
     * assumes a host with a modal-capable window, is untestable, and blocks the
     * embedder from styling or suppressing the failure. The message is state
     * the caller owns; this bar only renders it.
     */
    exportError?: string | null;
}
export declare function WizardStepNavigation({ step, totalSteps, canAdvance, isEditing, onCancel, onBack, onNext, onExportSchema, exportError, }: WizardNavProps): import("react").JSX.Element;
//# sourceMappingURL=WizardStepNavigation.d.ts.map