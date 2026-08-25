import { readFileSync } from 'node:fs';
const sites = `src/integrations/realtime-modules/HangoutRoomRow.tsx:145:onClick
src/integrations/realtime-modules/HangoutRoomsSection.tsx:192:onBrowseAll
src/components/collaboration/SharedTextEditor.tsx:91:onDismissConflict
src/components/video/CallWidget.tsx:206:onDecline
src/components/video/CallWidget.tsx:214:onAnswer
src/components/video/CallWidget.tsx:438:onToggleMute
src/components/video/CallWidget.tsx:464:onEndCall
src/components/video/CallControls.tsx:151:onClick
src/components/video/CallControls.tsx:201:onToggleMute
src/components/video/CallControls.tsx:209:onToggleCamera
src/components/video/CallControls.tsx:217:onUpgradeToVideo
src/components/video/CallControls.tsx:225:onToggleScreenShare
src/components/video/CallControls.tsx:245:onEndCall
src/components/forms/Checkbox.tsx:98:onClick
src/components/doc-editor/ParticipantAvatars.tsx:133:onJumpToUser
src/components/doc-editor/CommentThread.tsx:333:onResolveThread
src/components/doc-editor/VideoCallPanel.tsx:287:onUndock
src/components/doc-editor/DocumentHeader.tsx:160:onToggleMyItems
src/components/doc-editor/DocumentHeader.tsx:184:onUnlock
src/components/doc-editor/DocumentHeader.tsx:192:onFinalize
src/components/layout/SettingsLayout.tsx:222:onSave
src/components/layout/CollapsibleSidebar.tsx:453:onOpenPipeline
src/components/hangout/CallPresenceIndicator.tsx:72:onClick
src/components/agents/components/AgentCard.tsx:41:onClick
src/components/agents/AgentsDashboardPage.tsx:52:onAgentClick
src/components/pipelines/context-inspector/ContextStepList.tsx:47:onStepSelect
src/components/pipelines/nodes/NodeCard.tsx:66:onClick
src/components/pipelines/vision/VisionRunCard.tsx:100:onOpen
src/components/pipelines/vision/ImageWithBBoxOverlay.tsx:101:onClick
src/components/pipelines/vision/PeoplePanel.tsx:68:onSelect
src/components/pipelines/vision/ObjectsPanel.tsx:38:onSelect
src/components/pipelines/canvas/ExecutionLog.tsx:209:onClearFilter
src/components/pipelines/replay/ExecutionTimeline.tsx:143:onNodeClick
src/components/pipelines/StepTimeline.tsx:214:onStepClick
src/components/shared/NotificationCenter.tsx:128:onItemClick
src/components/shared/StatCard.tsx:187:onClick
src/components/shared/ErrorState.tsx:63:onAction
src/components/shared/ProjectCard.tsx:137:onClick
src/components/shared/ThumbnailCard.tsx:127:onClick
src/components/shared/ThumbnailCard.tsx:141:onClick
src/components/shared/EmptyState.tsx:111:onAction
src/components/observability/components/ActiveRunsTable.tsx:179:onRowClick
src/components/observability/components/ChaosPanel.tsx:250:onReset
src/components/social/GroupPanel.tsx:235:onRoomSelect
src/components/social/GroupPanel.tsx:472:onRoomSelect`.split('\n');

for (const s of sites) {
  const [f, ln, prop] = s.split(':');
  const lines = readFileSync(f, 'utf8').split('\n');
  const i = Number(ln) - 1;
  const start = Math.max(0, i - 14);
  const ctx = lines.slice(start, i + 6);
  console.log('\n============ ' + s);
  ctx.forEach((l, k) => console.log(String(start + k + 1).padStart(4) + (start + k === i ? ' >' : '  ') + l));
}
