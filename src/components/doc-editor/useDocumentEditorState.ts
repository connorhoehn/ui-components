// frontend/src/components/doc-editor/useDocumentEditorState.ts
//
// Encapsulates the complex state orchestration for DocumentEditorPage:
// current mode, active sidebar panel, video dock state, collaboration status,
// document loading, focus tracking, and follow mode.

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { ViewMode, DocumentMeta, Participant } from '../../types/document';
import type { UseWebSocketReturn } from '../../hooks/useWebSocket';
import type { GatewayMessage } from '../../types/gateway';
import { useCollaborativeDoc } from '../../hooks/useCollaborativeDoc';
import { useDocumentComments } from '../../hooks/useDocumentComments';
import { useDocumentReviews } from '../../hooks/useDocumentReviews';
import { useDocumentItems } from '../../hooks/useDocumentItems';
import { useIdentityContext } from '../../contexts/IdentityContext';
import { useVersionHistory } from '../../hooks/useVersionHistory';
import { loadTypes } from '../../hooks/useDocumentTypes';
import { useMyMentionsAndTasks } from '../../hooks/useMyMentionsAndTasks';
import { useVideoSessions } from '../../hooks/useVideoSessions';
import { useDocumentActions } from './useDocumentActions';
import { useSidebarPanels } from './useSidebarPanels';
import { dedupeSectionsById, templateSectionId } from '../../hooks/templateSections';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitialMode(): ViewMode {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('mode');
    if (m === 'editor' || m === 'ack' || m === 'reader') return m;
  }
  return 'editor';
}

/**
 * Extract plain text from a Y.XmlFragment.
 */
export function xmlFragmentToText(frag: { toString(): string }): string {
  const xml = frag.toString();
  return xml
    .replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseDocumentEditorStateOptions {
  documentId: string;
  documentType?: string;
  ws: UseWebSocketReturn;
  userId: string;
  displayName: string;
  color?: string;
  onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
  activityPublish: (eventType: string, detail: Record<string, unknown>) => void;
  isVideoDocked?: boolean;
  onDockVideo?: () => void;
  onUndockVideo?: () => void;
  onBack?: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useDocumentEditorState({
  documentId,
  documentType,
  ws,
  userId,
  displayName,
  color = 'var(--color-info)',
  onMessage,
  activityPublish,
  isVideoDocked,
  onDockVideo,
  onUndockVideo,
  onBack,
}: UseDocumentEditorStateOptions) {
  const [mode, setMode] = useState<ViewMode>(getInitialMode);
  const {
    showHistory,
    showMyItems,
    showVideoHistory,
    toggleHistory: panelToggleHistory,
    toggleMyItems: panelToggleMyItems,
    toggleVideoHistory: panelToggleVideoHistory,
    closePanel,
  } = useSidebarPanels();
  const [showVideoCall, setShowVideoCall] = useState(isVideoDocked ?? false);

  // Track window width for responsive TOC/video hiding
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1400);
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const showTOC = windowWidth >= 1200;
  const showInlineVideo = windowWidth >= 900;

  // Sticky scroll for video and TOC
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const videoSpacerRef = useRef<HTMLDivElement>(null);
  const tocSpacerRef = useRef<HTMLDivElement>(null);
  const [videoLeft, setVideoLeft] = useState(0);
  const [, setTocLeft] = useState(0);
  const spacerInitialTopRef = useRef<number | null>(null);
  const FIXED_TOP = 146;

  const updatePositions = useCallback(() => {
    if (spacerInitialTopRef.current === null) {
      const spacer = videoSpacerRef.current ?? tocSpacerRef.current;
      if (spacer) {
        spacerInitialTopRef.current = spacer.getBoundingClientRect().top + window.scrollY;
      }
    }
    const threshold = spacerInitialTopRef.current ?? 250;
    const shouldFix = window.scrollY > threshold - FIXED_TOP;
    setSidebarFixed(shouldFix);
    if (videoSpacerRef.current) setVideoLeft(videoSpacerRef.current.getBoundingClientRect().left);
    if (tocSpacerRef.current) setTocLeft(tocSpacerRef.current.getBoundingClientRect().left);
  }, []);

  useEffect(() => {
    const onResize = () => {
      spacerInitialTopRef.current = null;
      updatePositions();
    };
    window.addEventListener('scroll', updatePositions, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', updatePositions);
      window.removeEventListener('resize', onResize);
    };
  }, [updatePositions]);

  useEffect(() => {
    const t = setTimeout(() => {
      spacerInitialTopRef.current = null;
      updatePositions();
    }, 50);
    return () => clearTimeout(t);
  }, [showVideoCall, updatePositions]);

  const [followingUserId, setFollowingUserId] = useState<string | null>(null);
  const [commentSidebarOpen, setCommentSidebarOpen] = useState(false);
  const [commentSectionId, setCommentSectionId] = useState<string | null>(null);

  const { idToken } = useIdentityContext();
  const videoSessions = useVideoSessions(documentId, idToken);

  const {
    meta,
    sections,
    synced,
    updateMeta,
    addSection,
    updateSection,
    addItem: yjsAddItem,
    updateItem: yjsUpdateItem,
    removeItem: yjsRemoveItem,
    getSectionFragment,
    ydoc,
    provider,
    exportJSON,
    participants,
    awareness,
  } = useCollaborativeDoc({
    documentId,
    mode,
    ws,
    userId,
    displayName,
    color,
    onMessage,
  });

  // REST-backed hooks
  const {
    comments,
    addComment: restAddComment,
    resolveThread: restResolveThread,
    unresolveThread: restUnresolveThread,
  } = useDocumentComments({
    documentId,
    idToken,
    sendMessage: ws.sendMessage,
    onMessage,
    connectionState: ws.connectionState,
  });

  const {
    sectionReviews,
    reviewSection: restReviewSection,
  } = useDocumentReviews({
    documentId,
    idToken,
    sendMessage: ws.sendMessage,
    onMessage,
    connectionState: ws.connectionState,
  });

  const sectionIds = useMemo(() => sections.map(s => s.id), [sections]);

  const {
    items: restItems,
    addItem: restAddItem,
    updateItem: restUpdateItem,
    removeItem: restRemoveItem,
    itemErrors,
  } = useDocumentItems({
    documentId,
    sectionIds,
    idToken,
    sendMessage: ws.sendMessage,
    onMessage,
    connectionState: ws.connectionState,
  });

  // Centralized document-events subscription
  useEffect(() => {
    if (ws.connectionState !== 'connected' || !documentId) return;
    ws.sendMessage({
      service: 'document-events',
      action: 'subscribe',
      documentId,
    });
    return () => {
      ws.sendMessage({
        service: 'document-events',
        action: 'unsubscribe',
        documentId,
      });
    };
  }, [documentId, ws.connectionState, ws.sendMessage]);

  // Document actions (demo, clear, export)
  const { demoLoaded, handleLoadDemo, handleClearDocument, handleExport } = useDocumentActions({
    documentId,
    userId,
    ws,
    updateMeta,
    addSection,
    exportJSON,
    getSectionFragment,
    comments,
  });

  // Focus tracking + jump-to-user
  const [focusedSectionId, setFocusedSectionId] = useState<string | null>(null);
  const handleJumpToUser = useCallback((participant: Participant) => {
    const isActive = participant.lastSeen && (Date.now() - participant.lastSeen) < 30000;
    const targetMode: ViewMode =
      participant.mode === 'reviewer' ? 'ack' :
      participant.mode === 'reader' ? 'reader' : 'editor';

    if (mode !== targetMode) {
      setMode(targetMode);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('mode', targetMode);
        window.history.replaceState({}, '', url.toString());
      }
    }

    if (!participant.currentSectionId) return;

    setTimeout(() => {
      const el = document.getElementById(`section-${participant.currentSectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (isActive) {
          el.style.transition = 'box-shadow 0.3s ease';
          el.style.boxShadow = `0 0 0 3px ${participant.color}40`;
          setTimeout(() => { el.style.boxShadow = ''; }, 2000);
        }
      }
    }, 150);
  }, [mode, sections]);

  // Follow mode
  const handleFollowUser = useCallback((participant: Participant) => {
    const targetId = participant.userId || participant.clientId;
    setFollowingUserId((prev) => (prev === targetId ? null : targetId));
  }, []);

  const followedSectionRef = useRef<string | null>(null);
  useEffect(() => {
    if (!followingUserId) {
      followedSectionRef.current = null;
      return;
    }
    const followed = participants.find(
      (p) => (p.userId || p.clientId) === followingUserId,
    );
    if (!followed || !followed.currentSectionId) {
      if (followed && sections.length > 0) {
        const firstEl = document.getElementById(`section-${sections[0].id}`);
        if (firstEl && !followedSectionRef.current) {
          firstEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          followedSectionRef.current = '__initial__';
        }
      }
      return;
    }
    if (followed.currentSectionId === followedSectionRef.current) return;

    followedSectionRef.current = followed.currentSectionId;

    const targetMode: ViewMode =
      followed.mode === 'reviewer' ? 'ack' :
      followed.mode === 'reader' ? 'reader' : 'editor';

    if (mode !== targetMode) {
      setMode(targetMode);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('mode', targetMode);
        window.history.replaceState({}, '', url.toString());
      }
    }

    // Timers are cleaned up: this effect re-runs on every `participants`
    // change, which in a live session is constant, and an uncancelled scroll
    // would keep firing after the user stopped following or left the page.
    const scrollTimer = setTimeout(() => {
      const el = document.getElementById(`section-${followed.currentSectionId}`);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.transition = 'box-shadow 0.3s ease';
      el.style.boxShadow = `0 0 0 3px ${followed.color}40`;
      highlightTimer = setTimeout(() => { el.style.boxShadow = ''; }, 1500);
    }, 100);
    let highlightTimer: ReturnType<typeof setTimeout> | undefined;

    return () => {
      clearTimeout(scrollTimer);
      if (highlightTimer) clearTimeout(highlightTimer);
    };
  }, [followingUserId, participants, mode, sections]);

  const handleStopFollow = useCallback(() => {
    setFollowingUserId(null);
  }, []);

  // Activity helpers
  const handleAddItem = useCallback((sectionId: string, item: Omit<import('../../types/document').TaskItem, 'id'>) => {
    const newItem = { id: crypto.randomUUID(), ...item } as import('../../types/document').TaskItem;
    yjsAddItem(sectionId, newItem);
    restAddItem(sectionId, newItem).catch(() => { /* social-api unavailable */ });
    const section = sections.find(s => s.id === sectionId);
    activityPublish('doc.add_item', { sectionTitle: section?.title, documentId, documentTitle: meta?.title });
  }, [yjsAddItem, restAddItem, sections, activityPublish, documentId, meta?.title]);

  const handleUpdateItem = useCallback((sectionId: string, itemId: string, patch: Partial<import('../../types/document').TaskItem>) => {
    yjsUpdateItem(sectionId, itemId, patch);
    restUpdateItem(sectionId, itemId, patch).catch(() => { /* social-api unavailable */ });
  }, [yjsUpdateItem, restUpdateItem]);

  const handleRemoveItem = useCallback((sectionId: string, itemId: string) => {
    yjsRemoveItem(sectionId, itemId);
    restRemoveItem(sectionId, itemId).catch(() => { /* social-api unavailable */ });
  }, [yjsRemoveItem, restRemoveItem]);

  // Auto-focus first section on load
  useEffect(() => {
    if (sections.length === 0 || focusedSectionId) return;
    const timer = setTimeout(() => {
      const firstId = sections[0].id;
      setFocusedSectionId(firstId);
      awareness.updateSection(firstId);
    }, 500);
    return () => clearTimeout(timer);
  }, [sections, focusedSectionId, awareness]);

  // Section focus (awareness)
  const handleSectionFocus = useCallback((sectionId: string) => {
    setFocusedSectionId(sectionId);
    awareness.updateSection(sectionId);
  }, [awareness]);

  // Comment sidebar
  const sectionListRef = useRef<HTMLDivElement>(null);
  const [commentSidebarTop, setCommentSidebarTop] = useState(0);

  const handleOpenComments = useCallback((sectionId: string) => {
    setCommentSectionId(sectionId);
    setCommentSidebarOpen(true);
    requestAnimationFrame(() => {
      const sectionEl = document.getElementById(`section-${sectionId}`);
      const containerEl = sectionListRef.current;
      if (sectionEl && containerEl) {
        const sectionRect = sectionEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();
        setCommentSidebarTop(sectionRect.top - containerRect.top);
      }
    });
  }, []);

  const handleCloseComments = useCallback(() => {
    setCommentSidebarOpen(false);
  }, []);

  // Section comments (REST-backed)
  const handleAddComment = useCallback((sectionId: string, text: string, parentCommentId?: string | null) => {
    restAddComment(sectionId, text, parentCommentId);
    activityPublish('doc.comment', { sectionId, text: text.slice(0, 50), documentId, documentTitle: meta?.title });

    const mentionMatches = text.match(/@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*/g);
    if (mentionMatches && mentionMatches.length > 0) {
      const mentionedNames = mentionMatches.map(m => m.slice(1).trim());
      const section = sections.find(s => s.id === sectionId);
      activityPublish('doc.mention', {
        sectionId,
        sectionTitle: section?.title ?? '',
        mentionedNames,
        commentText: text.slice(0, 80),
        authorName: displayName,
        documentId,
        documentTitle: meta?.title,
      });
    }
  }, [restAddComment, activityPublish, sections, displayName, documentId, meta?.title]);

  const handleResolveThread = useCallback((sectionId: string, commentId: string) => {
    restResolveThread(sectionId, commentId);
    activityPublish('doc.resolve_thread', { sectionId, commentId, documentId, documentTitle: meta?.title });
  }, [restResolveThread, activityPublish, documentId, meta?.title]);

  const handleUnresolveThread = useCallback((sectionId: string, commentId: string) => {
    restUnresolveThread(sectionId, commentId);
    activityPublish('doc.unresolve_thread', { sectionId, commentId, reopenedBy: displayName, documentId, documentTitle: meta?.title });
  }, [restUnresolveThread, activityPublish, displayName, documentId, meta?.title]);

  // My mentions & tasks
  const myItems = useMyMentionsAndTasks({ sections, comments, displayName, userId });

  const handleNavigateToSection = useCallback((sectionId: string) => {
    setTimeout(() => {
      const el = document.getElementById(`section-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.transition = 'box-shadow 0.3s ease';
        el.style.boxShadow = '0 0 0 3px #3b82f640';
        setTimeout(() => { el.style.boxShadow = ''; }, 2000);
      }
    }, 150);
  }, []);

  const handleToggleMyItems = panelToggleMyItems;
  const handleToggleHistory = panelToggleHistory;
  const handleToggleVideoHistory = panelToggleVideoHistory;

  const handleToggleVideoCall = useCallback(() => {
    setShowVideoCall(v => !v);
    closePanel();
  }, [closePanel]);

  // Cmd+M / Ctrl+M to toggle My Items panel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'm') {
        e.preventDefault();
        handleToggleMyItems();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleToggleMyItems]);

  // Version history
  const versionChannel = `doc:${documentId}`;
  const versionHistory = useVersionHistory({
    channel: versionChannel,
    sendMessage: ws.sendMessage,
    onMessage,
  });

  useEffect(() => {
    if (showHistory) {
      versionHistory.fetchVersions();
    } else {
      versionHistory.clearPreview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHistory]);

  // Auto-populate sections when a new document is empty
  useEffect(() => {
    if (!synced || !documentType || !ydoc) return;

    const yMeta = ydoc.getMap('meta');
    if (yMeta.get('templateApplied')) return;

    const ySections = ydoc.getArray('sections');
    if (ySections.length > 0) return;

    const docTypes = loadTypes();
    const dt = docTypes.find(t => t.name === documentType);
    if (!dt) return;

    ydoc.transact(() => {
      yMeta.set('templateApplied', true);
    });

    const legacyType = (st: string): 'tasks' | 'decisions' | 'notes' | 'summary' | 'custom' => {
      if (st === 'tasks')     return 'tasks';
      if (st === 'decisions') return 'decisions';
      return 'notes';
    };

    updateMeta({
      id: documentId,
      title: meta?.title || dt.name,
      sourceType: 'notes',
      sourceId: '',
      createdBy: userId,
      createdByName: displayName,
      createdAt: new Date().toISOString(),
      aiModel: '',
      status: 'draft',
      documentType: dt.name,
    });

    for (const field of dt.fields) {
      addSection({
        // Deterministic, not random: two clients opening this document at the
        // same moment both pass the guards above (templateApplied is a Y.Map
        // key, not a lock), so they must produce the SAME ids or the document
        // ends up with two indistinguishable copies of every section.
        id: templateSectionId(documentId, field.name),
        type: legacyType(field.sectionType),
        sectionType: field.sectionType,
        title: field.name,
        collapsed: field.defaultCollapsed,
        placeholder: field.placeholder || undefined,
        items: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [synced, documentType, ydoc]);

  // Repair duplicate sections once the document has synced.
  //
  // Convergent and idempotent: post-merge Y.Array order is identical on every
  // client, so "keep the first occurrence of each id" makes each client compute
  // the same deletions with no coordination. Also heals documents that were
  // duplicated before template ids became deterministic.
  useEffect(() => {
    if (!synced || !ydoc) return;
    dedupeSectionsById(ydoc);
  }, [synced, ydoc]);

  // Mode switching
  const handleModeChange = (newMode: ViewMode) => {
    setMode(newMode);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', newMode);
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Fallback meta for the header
  const headerMeta: DocumentMeta = meta ?? {
    id: documentId,
    title: '',
    sourceType: 'notes',
    sourceId: '',
    createdBy: '',
    createdAt: '',
    aiModel: '',
    status: 'draft',
  };

  // Finalize / unlock
  const isFinalized = headerMeta.status === 'final';

  const handleFinalize = useCallback(() => {
    if (window.confirm('Finalize this document? It will become read-only.')) {
      updateMeta({ status: 'final' });
      activityPublish('doc.finalize', { documentId, documentTitle: meta?.title });
    }
  }, [updateMeta, activityPublish, documentId, meta?.title]);

  const handleUnlock = useCallback(() => {
    updateMeta({ status: 'draft' });
    activityPublish('doc.unlock', { documentId, documentTitle: meta?.title });
  }, [updateMeta, activityPublish, documentId, meta?.title]);

  // Auto-dock video on navigate away
  const handleBack = useCallback(() => {
    if (showVideoCall && !isVideoDocked) {
      onDockVideo?.();
    }
    onBack?.();
  }, [showVideoCall, isVideoDocked, onDockVideo, onBack]);

  return {
    // Mode
    mode,
    handleModeChange,
    // Meta
    meta,
    headerMeta,
    isFinalized,
    handleFinalize,
    handleUnlock,
    updateMeta,
    // Sections
    sections,
    updateSection,
    getSectionFragment,
    // Per-section item load failures, keyed by sectionId. Passed through so a
    // section whose items failed to load can say so instead of rendering the
    // same empty state as a section that genuinely has none.
    itemErrors,
    // Document
    ydoc,
    provider,
    synced,
    demoLoaded,
    handleLoadDemo,
    handleClearDocument,
    handleExport,
    // Participants
    participants,
    awareness,
    // Focus
    focusedSectionId,
    handleSectionFocus,
    handleJumpToUser,
    // Follow
    followingUserId,
    handleFollowUser,
    handleStopFollow,
    // Comments
    comments,
    commentSidebarOpen,
    commentSectionId,
    commentSidebarTop,
    sectionListRef,
    handleOpenComments,
    handleCloseComments,
    handleAddComment,
    handleResolveThread,
    handleUnresolveThread,
    // Items
    restItems,
    handleAddItem,
    handleUpdateItem,
    handleRemoveItem,
    // Reviews
    sectionReviews,
    restReviewSection,
    // Sidebar panels
    showHistory,
    showMyItems,
    showVideoHistory,
    handleToggleHistory,
    handleToggleMyItems,
    handleToggleVideoHistory,
    closePanel,
    // Video
    showVideoCall,
    setShowVideoCall,
    handleToggleVideoCall,
    videoSessions,
    isVideoDocked,
    onDockVideo,
    onUndockVideo,
    // Responsive
    showTOC,
    showInlineVideo,
    sidebarFixed,
    videoSpacerRef,
    tocSpacerRef,
    videoLeft,
    FIXED_TOP,
    // My items
    myItems,
    handleNavigateToSection,
    // Version history
    versionHistory,
    // Navigation
    handleBack,
    // Identity
    idToken,
    // Activity
    activityPublish,
    // User
    displayName,
    color,
    userId,
    documentId,
  };
}
