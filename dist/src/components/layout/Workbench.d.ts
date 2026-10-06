import { type ReactNode } from 'react';
import { type FileKind } from '../shared/FileKindMark';
export interface WorkbenchTab {
    id: string;
    label: string;
    /** A count on the tab — open comments. Zero or absent shows none. */
    count?: number;
    content: ReactNode;
}
export interface WorkbenchProps {
    /** The selected file or slide — "Sprint review". */
    title: ReactNode;
    /** A second line — "Presentation · Slide 4 of 5". */
    subtitle?: ReactNode;
    /** Draws a `FileKindMark` before the title. */
    kind?: FileKind;
    /** Renders a close button. Omit for a workbench that cannot be closed. */
    onClose?: () => void;
    /** The current agent task — normally an `AgentTaskCard`. Omit when there is none. */
    task?: ReactNode;
    /** Heading over `task`. Default "Current task". */
    taskLabel?: string;
    tabs: readonly WorkbenchTab[];
    /** Controlled active tab. */
    activeTab?: string;
    /** Uncontrolled initial tab. Defaults to the first. */
    defaultTab?: string;
    onTabChange?: (id: string) => void;
    /** Below the active panel — normally a `MoreContextDisclosure`. */
    moreContext?: ReactNode;
    /** Pinned to the bottom — "Open run", "More". */
    footer?: ReactNode;
    /** Accessible name of the column. Default "Workbench". */
    label?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function Workbench({ title, subtitle, kind, onClose, task, taskLabel, tabs, activeTab, defaultTab, onTabChange, moreContext, footer, label, className, 'data-testid': testId, }: WorkbenchProps): import("react").JSX.Element;
export default Workbench;
//# sourceMappingURL=Workbench.d.ts.map