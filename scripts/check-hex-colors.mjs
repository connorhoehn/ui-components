#!/usr/bin/env node
//
// Guards against ARBITRARY-VALUE hex colour utilities: `bg-[#2563eb]`,
// `text-[#dc2626]`, `border-[#e2e8f0]`, ...
//
// The tones test (src/components/shared/__tests__/tones.test.ts) bans named
// palette classes (`bg-blue-500`) with zero tolerance, but arbitrary values
// slip straight past it — which is how ui/Button shipped a hardcoded
// blue-600 "primary" that ignored --color-primary for months (fixed
// v2.61.0). A hex in a class is a colour the theming system cannot re-tone.
//
// On 2026-08-21 a mechanical pass converted the 665 occurrences whose hex
// exactly equalled a token value (pixel-identical by construction). What is
// left needs judgment — each hex must be mapped to the NEAREST tone/role per
// the table in CLAUDE.md, which may change rendering slightly and so needs
// eyes on it. This ratchet freezes that debt:
//   - a file above its baseline fails (you added a hex colour),
//   - a file below its baseline fails too, asking you to lower the number,
//   - a file not listed must have zero.
//
// Do NOT add entries. If the scale can't express your colour, add a tone
// (four CSS variables + a tones.ts entry) — see src/styles.css.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['src/components', 'src/theme', 'src/renderers', 'demo/src'];
const HEX_RE =
  /\b(?:bg|text|border|ring|from|to|via|fill|stroke|accent|shadow|outline|decoration|divide|caret)-\[#[0-9a-fA-F]{3,8}\]/g;

const BASELINE = {
  'demo/src/components/CollaborationPage.tsx': 43,
  'demo/src/components/DataDisplayPage.tsx': 3,
  'demo/src/components/FormsPage.tsx': 41,
  'demo/src/components/LayoutPage.tsx': 1,
  'demo/src/components/NodeEditorPage.tsx': 12,
  'demo/src/components/RealTimeEditingPage.tsx': 31,
  'demo/src/demos/call-widget-live/index.tsx': 6,
  'demo/src/demos/collaboration/index.tsx': 6,
  'demo/src/demos/hook-chat-integration/index.tsx': 4,
  'demo/src/demos/hook-fileupload-integration/index.tsx': 4,
  'demo/src/demos/hook-presence-integration/index.tsx': 4,
  'demo/src/demos/hook-reactions-integration/index.tsx': 4,
  'demo/src/demos/hook-videohangout-integration/index.tsx': 12,
  'demo/src/demos/ingest-dashboard/IngestActivityLog.tsx': 3,
  'demo/src/demos/ingest-dashboard/index.tsx': 4,
  'demo/src/demos/social-panel/ChatMessages.tsx': 3,
  'demo/src/demos/social-panel/RoomListPanel.tsx': 4,
  'demo/src/demos/social-panel/index.tsx': 1,
  'demo/src/demos/video-streaming/index.tsx': 5,
  'demo/src/demos/wrapped-components/demo.tsx': 2,
  'demo/src/pages/IntroductionPage.tsx': 1,
  'demo/src/pages/PatternPage.tsx': 1,
  'demo/src/pages/QuickStartPage.tsx': 1,
  'demo/src/pages/ThemingPage.tsx': 4,
  'demo/src/shell/DemoLayout.tsx': 1,
  'src/components/agents/AgentInvokePage.tsx': 5,
  'src/components/agents/components/StreamingChatPanel.tsx': 7,
  'src/components/collaboration/CanvasCursorBoard.tsx': 2,
  'src/components/collaboration/CursorModeSelector.tsx': 2,
  'src/components/doc-editor/AckMode.tsx': 9,
  'src/components/doc-editor/ActivityFeed.tsx': 4,
  'src/components/doc-editor/AttachmentsPanel.tsx': 4,
  'src/components/doc-editor/ChunkViewer.tsx': 4,
  'src/components/doc-editor/CommentThread.tsx': 6,
  'src/components/doc-editor/DiffViewer.tsx': 34,
  'src/components/doc-editor/DocumentHeader.tsx': 26,
  'src/components/doc-editor/DocumentListPage.tsx': 9,
  'src/components/doc-editor/EditorModeSwitch.tsx': 2,
  'src/components/doc-editor/EditorToolbar.tsx': 2,
  'src/components/doc-editor/FollowModeBar.tsx': 3,
  'src/components/doc-editor/MentionDropdown.tsx': 1,
  'src/components/doc-editor/MyMentionsPanel.tsx': 4,
  'src/components/doc-editor/NewDocumentModal.tsx': 8,
  'src/components/doc-editor/ParticipantAvatars.tsx': 2,
  'src/components/doc-editor/ReaderMode.tsx': 14,
  'src/components/doc-editor/ReaderSectionCard.tsx': 6,
  'src/components/doc-editor/ReaderSummary.tsx': 2,
  'src/components/doc-editor/ReviewMode.tsx': 20,
  'src/components/doc-editor/ReviewProgress.tsx': 3,
  'src/components/doc-editor/ReviewableItem.tsx': 15,
  'src/components/doc-editor/SectionBlock.tsx': 2,
  'src/components/doc-editor/SectionComments.tsx': 3,
  'src/components/doc-editor/TableOfContents.tsx': 4,
  'src/components/doc-editor/TaskItemRow.tsx': 9,
  'src/components/doc-editor/TiptapEditor.tsx': 1,
  'src/components/doc-editor/VersionHistoryPanel.tsx': 9,
  'src/components/doc-editor/VideoCallPanel.tsx': 17,
  'src/components/doc-editor/VideoHistoryPanel.tsx': 2,
  'src/components/doc-types/DocumentTypeWizard.tsx': 14,
  'src/components/doc-types/DocumentTypesPage.tsx': 8,
  'src/components/doc-types/FieldDefinitionEditor.tsx': 5,
  'src/components/doc-types/WizardStepNavigation.tsx': 4,
  'src/components/field-types/FieldTypesPage.tsx': 13,
  'src/components/identity/shared/IdentityAdminLayout.tsx': 1,
  'src/components/ingest/ConflictsPage.tsx': 3,
  'src/components/ingest/IngestDashboard.tsx': 3,
  'src/components/ingest/MappingReviewPage.tsx': 2,
  'src/components/ingest/SyncMonitorPage.tsx': 6,
  'src/components/layout/ApiDegradedBanner.tsx': 4,
  'src/components/layout/AppLayout.tsx': 9,
  'src/components/layout/CollapsedIconStrip.tsx': 3,
  'src/components/layout/CollapsibleSidebar.tsx': 10,
  'src/components/misc/BigBrotherPanel.tsx': 6,
  'src/components/misc/DisconnectReconnect.tsx': 10,
  'src/components/misc/ErrorBoundary.tsx': 2,
  'src/components/misc/ErrorDisplay.tsx': 3,
  'src/components/misc/ErrorPanel.tsx': 6,
  'src/components/misc/EventLog.tsx': 9,
  'src/components/misc/TabbedEventLog.tsx': 13,
  'src/components/pipelines/CompareStepMatrix.tsx': 4,
  'src/components/pipelines/ContextInspector.tsx': 47,
  'src/components/pipelines/DiffOutputViewer.tsx': 3,
  'src/components/pipelines/DiffStepTable.tsx': 1,
  'src/components/pipelines/EditorModals.tsx': 1,
  'src/components/pipelines/ExecutorLog.tsx': 9,
  'src/components/pipelines/LiveOutputPanel.tsx': 17,
  'src/components/pipelines/PipelineRunDiff.tsx': 3,
  'src/components/pipelines/PipelineRunReplayPage.tsx': 2,
  'src/components/pipelines/PipelineRunsPage.tsx': 1,
  'src/components/pipelines/PipelineRunsPanel.tsx': 3,
  'src/components/pipelines/PipelinesBulkActionBar.tsx': 2,
  'src/components/pipelines/RunDetailDrawer.tsx': 5,
  'src/components/pipelines/RunsTable.tsx': 1,
  'src/components/pipelines/canvas/DebugTab.tsx': 2,
  'src/components/pipelines/canvas/ExecutionLog.tsx': 2,
  'src/components/pipelines/canvas/LogRow.tsx': 2,
  'src/components/pipelines/canvas/QuickInsertPopover.tsx': 1,
  'src/components/pipelines/context-inspector/ContextEditBuffer.tsx': 17,
  'src/components/pipelines/context-inspector/ContextJsonTree.tsx': 12,
  'src/components/pipelines/context-inspector/ContextStepList.tsx': 2,
  'src/components/pipelines/dev/EventPayloadEditor.tsx': 3,
  'src/components/pipelines/dev/SimulatorPanel.tsx': 4,
  'src/components/pipelines/editor/BreakpointPauseOverlay.tsx': 4,
  'src/components/pipelines/nodes/BaseNode.tsx': 9,
  'src/components/pipelines/nodes/RetryPolicyEditor.tsx': 1,
  'src/components/pipelines/nodes/ag-ui-output/AgUiOutputNode.tsx': 1,
  'src/components/pipelines/nodes/image-source/ImageSourceConfig.tsx': 6,
  'src/components/pipelines/nodes/image-source/ImageSourceNode.tsx': 4,
  'src/components/pipelines/nodes/save/SaveConfig.tsx': 7,
  'src/components/pipelines/nodes/save/SaveNode.tsx': 4,
  'src/components/pipelines/nodes/shared/ports.ts': 3,
  'src/components/pipelines/steps/StepThread.tsx': 1,
  'src/components/pipelines/versions/VersionDiffModal.tsx': 2,
  'src/components/shared/ActivityFeed.tsx': 5,
  'src/components/shared/Banner.tsx': 4,
  'src/components/shared/CodeEditor.tsx': 3,
  'src/components/shared/ConfirmDialog.tsx': 2,
  'src/components/shared/ConnectionPill.tsx': 5,
  'src/components/shared/FormField.tsx': 3,
  'src/components/shared/IconPicker.tsx': 1,
  'src/components/shared/NotificationCenter.tsx': 4,
  'src/components/shared/ShortcutsHelp.tsx': 2,
  'src/components/shared/UserPicker.tsx': 5,
  'src/components/social/ActivityPanel.tsx': 3,
  'src/components/social/ChatPanel.tsx': 1,
  'src/components/social/GroupPanel.tsx': 2,
  'src/components/social/RoomList.tsx': 5,
  'src/components/social/SocialTabContent.tsx': 6,
  'src/components/typed-documents/TypedDocumentsPage.tsx': 6,
  'src/components/ui/IconButton.tsx': 4,
  'src/components/ui/Panel.tsx': 1,
  'src/components/video/CallControls.tsx': 1,
  'src/components/video/CallParticipantStrip.tsx': 1,
  'src/components/video/CallStartedBanner.tsx': 2,
  'src/components/video/CallWidget.tsx': 3,
  'src/components/video/ExpandableCallWidget.tsx': 1,
  'src/components/video/HangoutGrid.tsx': 1,
  'src/components/video/HangoutSpotlight.tsx': 1,
  'src/components/video/ParticipantTile.tsx': 4,
  'src/components/video/RecordingPlayer.tsx': 1,
  'src/components/video/StatsCard.tsx': 3,
  'src/components/video/StatusStrip.tsx': 1,
  'src/components/video/VideoGrid.tsx': 1,
};

const counts = new Map();

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '__tests__' && entry.name !== 'node_modules') walk(path);
      continue;
    }
    if (!entry.name.endsWith('.tsx') && !entry.name.endsWith('.ts')) continue;
    const n = [...readFileSync(path, 'utf8').matchAll(HEX_RE)].length;
    if (n > 0) counts.set(path, n);
  }
}

for (const root of ROOTS) walk(root);

const errors = [];
for (const [file, n] of [...counts].sort()) {
  const allowed = BASELINE[file];
  if (allowed === undefined) {
    errors.push(`${file}: ${n} hex colour utilit${n === 1 ? 'y' : 'ies'}. Use the tone/token classes instead.`);
  } else if (n > allowed) {
    errors.push(`${file}: ${n} hex colour utilities, baseline allows ${allowed}. Do not add more.`);
  }
}
for (const [file, allowed] of Object.entries(BASELINE)) {
  const n = counts.get(file) ?? 0;
  if (n < allowed) {
    errors.push(
      `${file}: down to ${n} (baseline says ${allowed}) — nice. ` +
        `Lower it in scripts/check-hex-colors.mjs${n === 0 ? ', or delete the entry.' : '.'}`,
    );
  }
}

const total = [...counts.values()].reduce((a, b) => a + b, 0);
if (errors.length > 0) {
  console.error('check-hex-colors: FAIL\n');
  for (const e of errors) console.error('  ' + e);
  console.error(`\n${counts.size} file(s), ${total} hex colour utilit${total === 1 ? 'y' : 'ies'} remaining.`);
  process.exit(1);
}
console.log(
  `ok check-hex-colors: pass (${counts.size} file(s), ${total} baselined hex colour utilities remaining to burn down).`,
);
