import { CursorMode } from '../../hooks/useCursors';
export type { CursorMode };
interface CursorModeSelectorProps {
    activeMode: CursorMode;
    onModeChange: (mode: CursorMode) => void;
}
export declare function CursorModeSelector({ activeMode, onModeChange }: CursorModeSelectorProps): import("react").JSX.Element;
//# sourceMappingURL=CursorModeSelector.d.ts.map