import type { ReactNode } from 'react';
import type { ToastType } from './Toast';
export interface ToastOptions {
    type?: ToastType;
    durationMs?: number;
    actionLabel?: string;
    onAction?: () => void;
}
export interface ToastContextValue {
    toast: (message: string, opts?: ToastOptions) => void;
}
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useToast(): ToastContextValue;
//# sourceMappingURL=ToastProvider.d.ts.map