import type { ComputeModel, MachineMemoryState, MachineNode, MachineSession } from '../types';
/**
 * One line for the session's memory-sync state. Exported for tests and for
 * hosts that render the same state elsewhere (a settings page, a lab pane).
 *
 *   synced   → "● synced"
 *   pending  → "◐ 14 pending"      (the sidecar's outbox is draining)
 *   offline  → "○ offline — queuing" (writes queue locally; nothing is lost)
 *   disabled → "— sync off"
 */
export declare function memorySummary(memory: MachineMemoryState | undefined): string;
/** `ollama · qwen2.5-coder:14b` / `bedrock · nova-pro`. Bedrock ids go
 *  through the same shortener the pane status line uses. */
export declare function providerSummary(session: MachineSession, models?: ComputeModel[]): string;
export interface MachinePresenceMenuProps {
    /** The user's paired machines with their live sessions. Empty → renders null. */
    nodes: MachineNode[];
    /** Known platform models, so Bedrock ids shorten the way the lab shortens them. */
    models?: ComputeModel[];
    /** Wire to deep-link into the Computer Lab. Omitted → no lab affordance. */
    onOpenLab?: () => void;
    /** Wire to the machines settings surface (pairing, revoke). */
    onManage?: () => void;
    className?: string;
    'data-testid'?: string;
}
export declare function MachinePresenceMenu({ nodes, models, onOpenLab, onManage, className, 'data-testid': testId, }: MachinePresenceMenuProps): import("react").JSX.Element | null;
export default MachinePresenceMenu;
//# sourceMappingURL=MachinePresenceMenu.d.ts.map