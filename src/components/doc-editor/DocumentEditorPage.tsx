// frontend/src/components/doc-editor/DocumentEditorPage.tsx
//
// Top-level page component for the collaborative document editor.
// Composes: DocumentHeader, FollowModeBar, EditorModeSwitch, EditorSidebarManager.
// State orchestration delegated to useDocumentEditorState hook.

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { GatewayMessage } from '../../types/gateway';
import type { UseWebSocketReturn } from '../../hooks/useWebSocket';
import { useDocumentEditorState } from './useDocumentEditorState';
import DocumentHeader from './DocumentHeader';
import FollowModeBar from './FollowModeBar';
import VideoCallPanel from './VideoCallPanel';
import EditorModeSwitch from './EditorModeSwitch';
import EditorSidebarManager from './EditorSidebarManager';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface DocumentEditorPageProps {
  documentId: string;
  documentType?: string;
  ws: UseWebSocketReturn;
  userId: string;
  displayName: string;
  color?: string;
  onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
  activityPublish: (eventType: string, detail: Record<string, unknown>) => void;
  activityEvents: import('../../hooks/useActivityBus').ActivityEvent[];
  onBack?: () => void;
  /** Whether the video call is docked to the left sidebar (managed by AppLayout) */
  isVideoDocked?: boolean;
  /** Dock the video panel to the left sidebar */
  onDockVideo?: () => void;
  /** Undock the video panel from the left sidebar */
  onUndockVideo?: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DocumentEditorPage({
  documentId,
  documentType,
  ws,
  userId,
  displayName,
  color = 'var(--color-info)',
  onMessage,
  activityPublish,
  onBack,
  isVideoDocked,
  onDockVideo,
  onUndockVideo,
}: DocumentEditorPageProps) {
  const state = useDocumentEditorState({
    documentId,
    documentType,
    ws,
    userId,
    displayName,
    color,
    onMessage,
    activityPublish,
    isVideoDocked,
    onDockVideo,
    onUndockVideo,
    onBack,
  });

  const isEmpty = state.sections.length === 0 && !state.demoLoaded;

  // ---- Video portal (single-mount for IVS session persistence) ----
  // The videoHost div is stable across renders — relocated via DOM appendChild
  // so React's portal reconciliation doesn't tear down the IVS stage.
  const [videoHost] = useState<HTMLDivElement | null>(() => {
    if (typeof document === 'undefined') return null;
    const el = document.createElement('div');
    el.style.width = '100%';
    return el;
  });

  useEffect(() => {
    if (!videoHost) return;
    if (!state.showVideoCall) {
      videoHost.parentNode?.removeChild(videoHost);
      return;
    }
    const targetId = state.isVideoDocked ? 'sidebar-video-slot' : 'inline-video-slot';
    const attach = () => {
      const target = document.getElementById(targetId);
      if (target && target !== videoHost.parentNode) {
        target.appendChild(videoHost);
        return true;
      }
      return target === videoHost.parentNode;
    };
    if (attach()) return;
    const interval = setInterval(() => { if (attach()) clearInterval(interval); }, 50);
    const timeout = setTimeout(() => clearInterval(interval), 2000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [videoHost, state.showVideoCall, state.isVideoDocked, state.mode]);

  useEffect(() => () => {
    videoHost?.parentNode?.removeChild(videoHost);
  }, [videoHost]);

  const videoPortal = state.showVideoCall && videoHost ? createPortal(
    <VideoCallPanel
      documentId={documentId}
      userId={userId}
      idToken={state.idToken}
      meta={state.meta}
      updateMeta={state.updateMeta}
      sendMessage={ws.sendMessage}
      isDocked={state.isVideoDocked}
      onClose={() => { state.setShowVideoCall(false); if (state.isVideoDocked) onUndockVideo?.(); }}
      onDockToSidebar={!state.isVideoDocked ? (() => { onDockVideo?.(); }) : undefined}
      onUndock={state.isVideoDocked ? (() => { onUndockVideo?.(); }) : undefined}
      onCallEnd={() => { state.setShowVideoCall(false); onUndockVideo?.(); }}
    />,
    videoHost,
  ) : null;

  // ---- Render ----

  return (
    <div data-testid="document-editor-page" className="flex flex-col h-full">
      {videoPortal}
      <DocumentHeader
        meta={state.headerMeta}
        mode={state.mode}
        onModeChange={state.handleModeChange}
        participants={state.participants}
        onUpdateMeta={state.updateMeta}
        onExport={state.handleExport}
        onToggleHistory={state.handleToggleHistory}
        onToggleVideoCall={state.handleToggleVideoCall}
        onToggleVideoHistory={state.handleToggleVideoHistory}
        isCallActive={!!state.meta?.activeCallSessionId}
        onClearDocument={state.handleClearDocument}
        onJumpToUser={state.handleJumpToUser}
        sections={state.sections.map(s => ({ id: s.id, title: s.title }))}
        onToggleMyItems={state.handleToggleMyItems}
        myItemCount={state.myItems.length}
        commentCount={Object.values(state.comments).reduce((sum, threads) => sum + threads.length, 0)}
        onBack={state.handleBack}
        onFollowUser={state.handleFollowUser}
        followingUserId={state.followingUserId}
        onFinalize={state.handleFinalize}
        onUnlock={state.handleUnlock}
        pastCallsCount={state.videoSessions.sessions.length}
      />
      <FollowModeBar
        followingUserId={state.followingUserId}
        participants={state.participants}
        onStopFollow={state.handleStopFollow}
      />

      <div className="flex-1 overflow-auto p-4">
        <EditorModeSwitch
          mode={state.mode}
          isEmpty={isEmpty}
          isFinalized={state.isFinalized}
          sections={state.sections}
          documentId={documentId}
          displayName={displayName}
          color={color}
          userId={userId}
          ydoc={state.ydoc}
          provider={state.provider}
          getSectionFragment={state.getSectionFragment}
          updateSection={state.updateSection}
          participants={state.participants}
          focusedSectionId={state.focusedSectionId}
          onSectionFocus={state.handleSectionFocus}
          comments={state.comments}
          onAddComment={state.handleAddComment}
          onResolveThread={state.handleResolveThread}
          onUnresolveThread={state.handleUnresolveThread}
          onUpdateCursorInfo={state.awareness.updateCursorInfo}
          onOpenComments={state.handleOpenComments}
          onAddItem={state.handleAddItem}
          onUpdateItem={state.handleUpdateItem}
          onRemoveItem={state.handleRemoveItem}
          restItems={state.restItems}
          itemErrors={state.itemErrors}
          commentSidebarOpen={state.commentSidebarOpen}
          commentSectionId={state.commentSectionId}
          commentSidebarTop={state.commentSidebarTop}
          sectionListRef={state.sectionListRef}
          onCloseComments={state.handleCloseComments}
          showVideoCall={state.showVideoCall}
          isVideoDocked={state.isVideoDocked}
          showInlineVideo={state.showInlineVideo}
          sidebarFixed={state.sidebarFixed}
          videoSpacerRef={state.videoSpacerRef}
          videoLeft={state.videoLeft}
          FIXED_TOP={state.FIXED_TOP}
          showTOC={state.showTOC}
          sectionReviews={state.sectionReviews}
          reviewSection={state.restReviewSection}
          headerMeta={state.headerMeta}
          onLoadDemo={state.handleLoadDemo}
          activityPublish={activityPublish}
        />
      </div>

      <EditorSidebarManager
        showHistory={state.showHistory}
        showMyItems={state.showMyItems}
        showVideoHistory={state.showVideoHistory}
        closePanel={state.closePanel}
        versionHistory={state.versionHistory}
        ydoc={state.ydoc}
        myItems={state.myItems}
        onNavigateToSection={state.handleNavigateToSection}
        videoSessions={state.videoSessions}
        showTOC={state.showTOC}
        commentSidebarOpen={state.commentSidebarOpen}
        sections={state.sections}
        focusedSectionId={state.focusedSectionId}
        mode={state.mode}
      />
    </div>
  );
}
