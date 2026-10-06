import type { ReactNode } from 'react';
export interface WizardStep {
    key: string;
    label: string;
    content: ReactNode;
    /** Default true. false disables Next/Finish while this step is active. */
    canAdvance?: boolean;
}
export interface WizardProps {
    steps: WizardStep[];
    activeKey: string;
    onStep: (key: string) => void;
    onFinish?: () => void;
    finishLabel?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function Wizard({ steps, activeKey, onStep, onFinish, finishLabel, className, 'data-testid': testId, }: WizardProps): import("react").JSX.Element;
export default Wizard;
//# sourceMappingURL=Wizard.d.ts.map