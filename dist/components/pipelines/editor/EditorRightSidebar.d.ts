export interface EditorRightSidebarProps {
    pipelineId: string;
    selectedNodeId: string | null;
    sidebarTab: 'config' | 'runs';
    onTabChange: (tab: 'config' | 'runs') => void;
}
export default function EditorRightSidebar({ pipelineId, selectedNodeId, sidebarTab, onTabChange, }: EditorRightSidebarProps): import("react").JSX.Element;
//# sourceMappingURL=EditorRightSidebar.d.ts.map