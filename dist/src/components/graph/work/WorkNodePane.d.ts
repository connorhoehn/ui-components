import { type ReactNode } from 'react';
import type { WorkActivityBanner, WorkActivityNodeDetail, WorkGraphNodeData, WorkGraphSelection } from './types';
/** The state line a detail pane opens with. One dot, one claim, one qualifier. */
export declare function WorkPaneBanner({ banner }: {
    banner: WorkActivityBanner;
}): import("react").JSX.Element;
/** Transcript rows and the host-owned Ask exchange. Never invents an answer. */
export declare function WorkTranscriptPanel({ transcript, onSelect }: {
    transcript: NonNullable<WorkActivityNodeDetail['transcript']>;
    onSelect?: (selection: Exclude<WorkGraphSelection, null>) => void;
}): import("react").JSX.Element;
export interface WorkNodePaneProps {
    node: WorkGraphNodeData;
    detail?: WorkActivityNodeDetail;
    selection: Extract<WorkGraphSelection, {
        kind: 'node';
    }>;
    onSelectionChange: (selection: WorkGraphSelection) => void;
    onClose: () => void;
    onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
    /**
     * The canvas's own liveness (`activity.window.following`). With it, a
     * running node whose source lease has lapsed says "updates delayed" here
     * exactly as its card does — the card's accessible name said it while the
     * pane, the place that is supposed to say MORE, said only "Running".
     */
    live?: boolean;
    /**
     * Beside the close button in the pane's header — who else has this node
     * open (`<PresenceAvatars>`), for instance. Never shrinks the title away:
     * the title truncates first.
     */
    headerAccessory?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
/**
 * The detail pane for one selected node: chrome, a state banner, whichever
 * bodies the host supplied data for, and one way to carry the thing back into
 * the conversation. Composition rather than a kind switch — a node that has an
 * artifact AND sources gets both, and a node the viewer may only see the
 * existence of gets chrome and an honest empty body.
 */
export declare function WorkNodePane({ node, detail, selection, onSelectionChange, onClose, onOpen, onReference, live, headerAccessory, className, 'data-testid': testId, }: WorkNodePaneProps): import("react").JSX.Element;
//# sourceMappingURL=WorkNodePane.d.ts.map