import { AuthoringBBox } from '../../../types/pipeline';
export type { AuthoringBBox };
export interface BBoxAuthoringActions {
    boxes: AuthoringBBox[];
    addBox: (box: AuthoringBBox) => void;
    moveBox: (id: string, x: number, y: number) => void;
    resizeBox: (id: string, x: number, y: number, width: number, height: number) => void;
    setLabel: (id: string, label: string) => void;
    deleteBox: (id: string) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}
/**
 * Controlled-state hook for bbox authoring. Caller passes an initial
 * `boxes` array and an `onChange` callback; every mutation commits to
 * the undo stack and calls `onChange` with the new array.
 */
export declare function useBBoxAuthoring(initialBoxes: AuthoringBBox[], onChange: (next: AuthoringBBox[]) => void): BBoxAuthoringActions;
//# sourceMappingURL=useBBoxAuthoring.d.ts.map