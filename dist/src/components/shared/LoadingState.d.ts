import type { ReactNode } from 'react';
import { type SpinnerSize } from './Spinner';
export interface LoadingStateProps {
    /** Primary label. Defaults to "Loading…". */
    label?: string;
    /** Optional secondary copy below the label. */
    description?: ReactNode;
    spinnerSize?: SpinnerSize;
    spinnerColor?: string;
    testId?: string;
}
declare function LoadingState({ label, description, spinnerSize, spinnerColor, testId, }: LoadingStateProps): import("react").JSX.Element;
export default LoadingState;
//# sourceMappingURL=LoadingState.d.ts.map