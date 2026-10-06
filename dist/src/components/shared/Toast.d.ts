export type ToastType = 'info' | 'success' | 'warning' | 'error';
export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    /** Exit state drives fade-out animation before removal from the DOM. */
    exiting?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss: (id: string) => void;
}
declare function Toast({ id, message, type, exiting, actionLabel, onAction, onDismiss }: ToastProps): import("react").JSX.Element;
export default Toast;
//# sourceMappingURL=Toast.d.ts.map