export type SidebarPanel = 'history' | 'myItems' | 'videoHistory';
interface UseSidebarPanelsOptions {
    initialPanel?: SidebarPanel | null;
}
export interface UseSidebarPanelsReturn {
    activePanel: SidebarPanel | null;
    showHistory: boolean;
    showMyItems: boolean;
    showVideoHistory: boolean;
    toggleHistory: () => void;
    toggleMyItems: () => void;
    toggleVideoHistory: () => void;
    openPanel: (panel: SidebarPanel) => void;
    closePanel: () => void;
}
export declare function useSidebarPanels(options?: UseSidebarPanelsOptions): UseSidebarPanelsReturn;
export {};
//# sourceMappingURL=useSidebarPanels.d.ts.map