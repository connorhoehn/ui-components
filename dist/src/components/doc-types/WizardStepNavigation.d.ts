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
}
export declare function WizardStepNavigation({ step, totalSteps, canAdvance, isEditing, onCancel, onBack, onNext, onExportSchema, }: WizardNavProps): import("react").JSX.Element;
//# sourceMappingURL=WizardStepNavigation.d.ts.map