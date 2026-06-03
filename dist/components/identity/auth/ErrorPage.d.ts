export interface ErrorPageProps {
    title?: string;
    message: string;
    error?: string;
    onRetry?: () => void;
    onBack?: () => void;
}
export declare function ErrorPage({ title, message, error, onRetry, onBack, }: ErrorPageProps): import("react/jsx-runtime").JSX.Element;
export default ErrorPage;
//# sourceMappingURL=ErrorPage.d.ts.map