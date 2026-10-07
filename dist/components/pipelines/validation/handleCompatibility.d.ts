import type { NodeType } from '../../../types/pipeline';
/** True iff (sourceType, sourceHandle) → (targetType, targetHandle) is a valid edge per §5. */
export declare function isValidHandleConnection(sourceType: NodeType, sourceHandle: string, targetType: NodeType, targetHandle: string): boolean;
//# sourceMappingURL=handleCompatibility.d.ts.map