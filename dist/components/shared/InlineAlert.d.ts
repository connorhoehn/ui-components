import React from 'react';
export type InlineAlertTone = 'error' | 'success' | 'info' | 'warning';
export interface InlineAlertProps {
    tone: InlineAlertTone;
    children: React.ReactNode;
    onDismiss?: () => void;
    className?: string;
}
declare function InlineAlert({ tone, children, onDismiss, className }: InlineAlertProps): React.JSX.Element;
export { InlineAlert };
export default InlineAlert;
//# sourceMappingURL=InlineAlert.d.ts.map