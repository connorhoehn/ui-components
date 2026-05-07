// src/components/pipelines/editor/EditorRightSidebar.tsx
//
// Right side panel showing config or run details. Displays a tab bar
// (Config | Runs) and the active panel content.

import { cn } from '../../../lib/cn';
import ConfigPanel from '../canvas/ConfigPanel';
import PipelineRunsPanel from '../PipelineRunsPanel';

export interface EditorRightSidebarProps {
  pipelineId: string;
  selectedNodeId: string | null;
  sidebarTab: 'config' | 'runs';
  onTabChange: (tab: 'config' | 'runs') => void;
}

export default function EditorRightSidebar({
  pipelineId,
  selectedNodeId,
  sidebarTab,
  onTabChange,
}: EditorRightSidebarProps) {
  return (
    <div
      className={cn(
        'w-[350px] shrink-0 border-l border-border bg-surface',
        'flex flex-col overflow-hidden',
      )}
      data-testid="right-sidebar"
    >
      {/* Hide tab row when a node is selected and config tab is active */}
      {!(selectedNodeId !== null && sidebarTab === 'config') && (
        <div className="h-[38px] flex border-b border-border shrink-0">
          <button
            type="button"
            className={cn(
              'flex-1 border-none bg-transparent text-xs font-semibold',
              'cursor-pointer font-inherit px-2',
              sidebarTab === 'config'
                ? 'text-text-primary border-b-2 border-b-primary'
                : 'text-text-secondary border-b-2 border-b-transparent',
            )}
            onClick={() => onTabChange('config')}
            data-testid="sidebar-tab-config"
          >
            Config
          </button>
          <button
            type="button"
            className={cn(
              'flex-1 border-none bg-transparent text-xs font-semibold',
              'cursor-pointer font-inherit px-2',
              sidebarTab === 'runs'
                ? 'text-text-primary border-b-2 border-b-primary'
                : 'text-text-secondary border-b-2 border-b-transparent',
            )}
            onClick={() => onTabChange('runs')}
            data-testid="sidebar-tab-runs"
          >
            Runs
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {sidebarTab === 'config' && (
          selectedNodeId !== null ? (
            <ConfigPanel />
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center">
              Select a node to configure
            </div>
          )
        )}
        {sidebarTab === 'runs' && (
          <PipelineRunsPanel
            pipelineId={pipelineId}
            onClose={() => onTabChange('config')}
          />
        )}
      </div>
    </div>
  );
}
