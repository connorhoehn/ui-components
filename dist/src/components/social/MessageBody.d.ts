import { type ReactNode } from 'react';
export interface MessageBodyProps {
    /** Rich body from the composer. When absent, `text` is rendered plainly. */
    html?: string;
    /** Plain-text fallback — also what a client that cannot render HTML shows. */
    text: string;
    className?: string;
    'data-testid'?: string;
}
export declare function renderBackticks(text: string): ReactNode;
export declare function MessageBody({ html, text, className, 'data-testid': testId }: MessageBodyProps): import("react").JSX.Element;
export default MessageBody;
//# sourceMappingURL=MessageBody.d.ts.map