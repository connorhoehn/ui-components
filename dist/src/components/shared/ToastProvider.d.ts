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
/**
 * Non-throwing variant, for components that WANT to toast but must still
 * mount where no provider exists — a widget reused inside a panel or
 * rendered bare in a component test. Callers use `toast?.(…)`; the
 * notification is simply skipped rather than crashing the subtree.
 */
export declare function useToastOptional(): ToastContextValue | null;
//# sourceMappingURL=ToastProvider.d.ts.map