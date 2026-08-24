// frontend/src/components/pipelines/context/PipelineEditorContext.tsx
//
// Per-pipeline editor state: definition, dirty flag, selection, and the
// edit operations invoked by the canvas (add / update / remove nodes and
// edges, drag-to-reposition, duplicate). Persistence is debounced to
// localStorage via `pipelineStorage`. See PIPELINES_PLAN.md §13.1 / §13.4.
//
// History: a bounded undo stack stores prior `{nodes, edges}` snapshots;
// mutations push onto undo and clear redo. Undo pops from undo onto redo.
// Only nodes/edges are tracked — metadata (name, description) changes are
// intentionally out of scope for undo.

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  NodeData,
  NodeType,
  PipelineDefinition,
  PipelineEdge,
  PipelineNode,
} from '../../../types/pipeline';
import {
  loadPipeline as loadPipelineLocal,
  savePipelinePositionsOnly,
} from '../persistence/pipelineStorage';
import {
  loadPipeline,
  publishPipeline as publishPipelineStorage,
  savePipeline,
} from '../persistence/pipelineStorageRemote';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SAVE_DEBOUNCE_MS = 500;
const HISTORY_LIMIT = 50;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HistoryFrame {
  nodes: PipelineNode[];
  edges: PipelineEdge[];
}

export interface PipelineEditorValue {
  definition: PipelineDefinition | null;
  dirty: boolean;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  addNode: (type: NodeType, position: { x: number; y: number }) => string;
  updateNode: (id: string, patch: Partial<PipelineNode>) => void;
  updateNodeData: (id: string, patch: Partial<NodeData>) => void;
  removeNode: (id: string) => void;
  duplicateNodes: (ids: string[]) => string[];
  addEdge: (edge: Omit<PipelineEdge, 'id'>) => string;
  removeEdge: (id: string) => void;
  setPositions: (
    updates: Array<{ id: string; position: { x: number; y: number } }>,
  ) => void;
  save: () => void;
  publish: () => void;
  revert: () => void;
  /**
   * Reason the most recent remote persist failed, or `null` when the last
   * write succeeded. Additive — a rejected `savePipeline` used to be an
   * unhandled promise rejection with no user-visible trace, so the editor
   * showed "Saving…" forever while the server had refused the write.
   * `dirty` stays set while this is non-null: nothing is discarded, and the
   * next edit (or teardown) retries exactly once. Never retried on a timer —
   * a 403 would spin against the server forever.
   */
  saveError: string | null;
  /** Dismiss `saveError`. Does not clear `dirty` and does not retry. */
  clearSaveError: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  /**
   * Rename the pipeline. Metadata-only mutation — not tracked by undo/redo
   * (consistent with the top-level contract that history covers nodes/edges).
   */
  rename: (name: string) => void;
  /** Set the pipeline icon (emoji). Metadata-only, not tracked by undo/redo. */
  setIcon: (icon: string) => void;
  /** Replace the pipeline's tag list. Metadata-only, not tracked by undo/redo. */
  setTags: (tags: string[]) => void;
}

// ---------------------------------------------------------------------------
// Default NodeData factories — keep the discriminated union valid on insert
// ---------------------------------------------------------------------------

function defaultNodeData(type: NodeType): NodeData {
  switch (type) {
    case 'trigger':
      return { type: 'trigger', triggerType: 'manual' };
    case 'llm':
      return {
        type: 'llm',
        provider: 'bedrock',
        model: 'claude-sonnet-4-6',
        systemPrompt: 'You are a helpful assistant.',
        userPromptTemplate: '{{context.input}}',
        temperature: 0.7,
        maxTokens: 4096,
        streaming: true,
      };
    case 'transform':
      return { type: 'transform', transformType: 'jsonpath', expression: '' };
    case 'condition':
      return { type: 'condition', expression: '' };
    case 'action':
      return { type: 'action', actionType: 'notify', config: {} };
    case 'fork':
      return { type: 'fork', branchCount: 2 };
    case 'join':
      return { type: 'join', mode: 'all', mergeStrategy: 'deep-merge' };
    case 'approval':
      return {
        type: 'approval',
        approvers: [],
        requiredCount: 1,
      };
    case 'agent':
      return {
        type: 'agent',
        agentId: '',
        protocol: 'a2a',
        inputTemplate: '{{context.input}}',
        streaming: true,
      };
    case 'guardrail':
      return {
        type: 'guardrail',
        guardrailId: '',
        inputField: 'context.input',
        action: 'block',
      };
    case 'mcp-tool':
      return {
        type: 'mcp-tool',
        gatewayUrl: '',
        toolName: '',
        inputTemplate: '{}',
      };
    case 'knowledge-base':
      return {
        type: 'knowledge-base',
        knowledgeBaseId: '',
        queryTemplate: '{{context.input}}',
        topK: 5,
      };
    case 'graph-query':
      return {
        type: 'graph-query',
        graphId: '',
        query: 'MATCH (n) RETURN n LIMIT 10',
      };
    case 'memory':
      return {
        type: 'memory',
        mode: 'read',
        scope: 'session',
        namespace: 'default',
        keyExpression: '',
      };
    case 'policy':
      return {
        type: 'policy',
        policyStoreId: '',
        principal: '{{context.user.id}}',
        action: '',
        resource: '',
      };
    case 'ag-ui-output':
      return {
        type: 'ag-ui-output',
        sourceField: 'context.output',
        eventType: 'TEXT_MESSAGE_CONTENT',
        terminal: true,
      };
    case 'image-source':
      return { type: 'image-source' };
    case 'image:save':
      return { type: 'image:save' };
    case 'scatter':
      return { type: 'scatter', itemsPath: '' };
    case 'image:resize':
      return { type: 'image:resize' };
    case 'image:transform':
      return { type: 'image:transform', operations: [] };
    case 'image:format-convert':
      return { type: 'image:format-convert', format: 'jpeg' };
    case 'image:sharpen':
      return { type: 'image:sharpen' };
    case 'image:watermark':
      return { type: 'image:watermark', overlayImageId: '' };
    case 'image:crop':
      return { type: 'image:crop' };
    case 'image:adjust-bw':
      return { type: 'image:adjust-bw' };
    case 'image:adjust-layer':
      return { type: 'image:adjust-layer', layers: [] };
    case 'image:dimensions':
      return { type: 'image:dimensions', maxEdge: 1024 };
    case 'image:upscale':
      return { type: 'image:upscale', maxEdge: 1024 };
    case 'image:vision-analyze':
      return { type: 'image:vision-analyze', userPrompt: '', imageRefPath: '$.trigger.imageRef' };
    case 'image:vision-classify':
      return { type: 'image:vision-classify', labels: [], imageRefPath: '$.trigger.imageRef' };
    case 'image:vision-describe':
      return { type: 'image:vision-describe', imageRefPath: '$.trigger.imageRef', userPrompt: 'Describe this image.' };
    case 'image:vision-tag':
      return { type: 'image:vision-tag', imageRefPath: '$.trigger.imageRef' };
    case 'image:vision-extract-text':
      return { type: 'image:vision-extract-text', imageRefPath: '$.trigger.imageRef' };
    case 'image:generate':
      return { type: 'image:generate', prompt: '' };
    case 'image:variation':
      return { type: 'image:variation' };
    case 'image:edit-prompt':
      return { type: 'image:edit-prompt', prompt: '' };
  }
}

function genId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const PipelineEditorContext =
  createContext<PipelineEditorValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface PipelineEditorProviderProps {
  pipelineId: string;
  children: React.ReactNode;
}

export function PipelineEditorProvider({
  pipelineId,
  children,
}: PipelineEditorProviderProps) {
  const [definition, setDefinition] = useState<PipelineDefinition | null>(null);
  const [dirty, setDirty] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [undoStack, setUndoStack] = useState<HistoryFrame[]>([]);
  const [redoStack, setRedoStack] = useState<HistoryFrame[]>([]);

  const [saveError, setSaveError] = useState<string | null>(null);

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The definition that has been edited but not yet handed to `savePipeline`.
  // DELIBERATELY a separate ref from `saveTimerRef`: an earlier bug in this
  // repo tracked "is a write owed?" by looking at the timer handle, so
  // clearing the timer — which every cleanup does — also erased the fact that
  // a write was owed, and the flush silently wrote nothing. The timer answers
  // "when"; this ref answers "what".
  const pendingRemoteRef = useRef<PipelineDefinition | null>(null);

  // The definition as of the latest render, readable from inside an in-flight
  // save's `.then`. Every persist path clears `dirty` only when the definition
  // it actually wrote is still the current one — otherwise an edit made while
  // a save was in flight would be marked clean and silently dropped (the
  // autosave effect's cleanup kills the pending timer the moment `dirty`
  // flips to false, so nothing ever writes it).
  const latestDefinitionRef = useRef<PipelineDefinition | null>(definition);
  latestDefinitionRef.current = definition;

  const clearDirtyIfUnchanged = useCallback((saved: PipelineDefinition) => {
    if (latestDefinitionRef.current === saved) setDirty(false);
  }, []);

  const clearSaveError = useCallback(() => setSaveError(null), []);

  /**
   * The single remote-write path. Takes ownership of `target` up front, so an
   * unmount mid-flight does not write it a second time — the request is
   * already on the wire and completes whether or not React tears the tree
   * down.
   *
   * On failure it re-queues `target` and leaves `dirty` set. That is the whole
   * point: a rejected write must not read like a successful one, and the
   * layout the user arranged must survive it. There is no retry timer — the
   * autosave effect only re-arms on a real edit, so a persistently failing
   * server costs one request per edit plus one at teardown, never a storm.
   */
  const persist = useCallback(
    (target: PipelineDefinition): Promise<void> => {
      pendingRemoteRef.current = null;
      return savePipeline(target).then(
        () => {
          clearDirtyIfUnchanged(target);
          setSaveError(null);
        },
        (err: unknown) => {
          // Re-queue only if nothing newer already claimed the slot; a slow
          // failing write must not overwrite a fresher pending definition
          // with its own stale one.
          if (pendingRemoteRef.current === null) pendingRemoteRef.current = target;
          setSaveError(
            err instanceof Error ? err.message : 'Failed to save the pipeline.',
          );
          // eslint-disable-next-line no-console
          console.error('[PipelineEditor] save failed; changes kept pending', err);
        },
      );
    },
    [clearDirtyIfUnchanged],
  );

  // Load on mount / pipelineId change.
  useEffect(() => {
    let cancelled = false;
    setDefinition(null);
    setDirty(false);
    setSaveError(null);
    setSelectedNodeId(null);
    setUndoStack([]);
    setRedoStack([]);
    loadPipeline(pipelineId)
      .catch((err: unknown) => {
        // `pipelineStorageRemote.loadPipeline` only swallows *transport*
        // failures; anything else (an expired session answering 401, a 403,
        // a 400) rejects. There was no catch here, so the promise rejected
        // unhandled and `definition` stayed null forever — the editor sat on
        // "Loading pipeline…" with no error and no way out, even though a
        // perfectly good cached copy was sitting in localStorage. Fall back
        // to that copy.
        // eslint-disable-next-line no-console
        console.error('[PipelineEditor] load failed, using cached copy', err);
        return loadPipelineLocal(pipelineId);
      })
      .then((loaded) => {
        if (cancelled) return;
        if (loaded) {
          loaded.nodes = loaded.nodes ?? [];
          loaded.edges = loaded.edges ?? [];
        }
        setDefinition(loaded);
      });
    return () => { cancelled = true; };
  }, [pipelineId]);

  // Debounced autosave. Cancels any pending timer on unmount / new edit, so a
  // burst of edits — a drag settle followed by four keyboard nudges, say —
  // coalesces into a single remote write once the burst stops.
  useEffect(() => {
    if (!dirty || !definition) {
      // Not dirty means everything is already on the wire, or the user
      // reverted. Retiring the pending definition here is what stops a
      // `revert()` from being quietly undone by a later teardown flush.
      pendingRemoteRef.current = null;
      return;
    }
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    const target = definition;
    pendingRemoteRef.current = target;
    saveTimerRef.current = setTimeout(() => {
      saveTimerRef.current = null;
      void persist(target);
    }, SAVE_DEBOUNCE_MS);
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, [definition, dirty, persist]);

  // Flush on teardown — unmount, and switching to a different pipeline.
  //
  // Without this the debounce window is a data-loss window: the cleanup above
  // kills the timer, so dragging a node and immediately closing the editor
  // (or navigating to another pipeline) threw the arranged layout away. The
  // pending definition is read from `pendingRemoteRef`, never closed over —
  // a closure over `definition` would make this effect re-run on every edit
  // and write on every one, which is the exact failure mode the debounce
  // exists to prevent.
  useEffect(() => {
    return () => {
      const pending = pendingRemoteRef.current;
      if (pending) void persist(pending);
    };
  }, [pipelineId, persist]);

  // -------------------------------------------------------------------------
  // History helpers
  // -------------------------------------------------------------------------

  const pushHistory = useCallback((prev: PipelineDefinition) => {
    setUndoStack((stack) => {
      const next = [
        ...stack,
        { nodes: prev.nodes, edges: prev.edges },
      ];
      if (next.length > HISTORY_LIMIT) next.shift();
      return next;
    });
    setRedoStack([]);
  }, []);

  // Commit a mutation atomically: push current state onto undo, apply
  // `mutator`, mark dirty. Returns the (possibly updated) definition so
  // callers can read back generated IDs.
  //
  // StrictMode safety: this used to run `pushHistory(prev)`, `mutator(prev)`
  // and the `committed` write *inside* the `setDefinition` updater. React
  // double-invokes updaters in dev, so every edit pushed TWO undo frames —
  // one Ctrl+Z then appeared to do nothing — and `committed` was only ever
  // populated when React happened to eagerly evaluate the updater (it does
  // not when the update queue is non-empty), so `addNode`/`duplicateNodes`
  // silently returned null. Read the current definition from the render-time
  // ref instead and keep the updater out of it entirely: the effects now run
  // exactly once per call.
  const commit = useCallback(
    (
      mutator: (def: PipelineDefinition) => PipelineDefinition,
    ): PipelineDefinition | null => {
      const prev = latestDefinitionRef.current;
      if (!prev) return null;
      const next = mutator(prev);
      // Keep the ref ahead of the next render so back-to-back commits in the
      // same tick chain off each other rather than off a stale definition.
      latestDefinitionRef.current = next;
      pushHistory(prev);
      setDefinition(next);
      setDirty(true);
      return next;
    },
    [pushHistory],
  );

  // -------------------------------------------------------------------------
  // Mutations
  // -------------------------------------------------------------------------

  const addNode = useCallback(
    (type: NodeType, position: { x: number; y: number }): string => {
      const id = genId();
      commit((def) => ({
        ...def,
        nodes: [
          ...def.nodes,
          { id, type, position, data: defaultNodeData(type) },
        ],
      }));
      return id;
    },
    [commit],
  );

  const updateNode = useCallback(
    (id: string, patch: Partial<PipelineNode>): void => {
      commit((def) => ({
        ...def,
        nodes: def.nodes.map((n) => (n.id === id ? { ...n, ...patch } : n)),
      }));
    },
    [commit],
  );

  const updateNodeData = useCallback(
    (id: string, patch: Partial<NodeData>): void => {
      commit((def) => ({
        ...def,
        nodes: def.nodes.map((n) => {
          if (n.id !== id) return n;
          // Preserve the discriminator — `patch` is expected to be a valid
          // partial of the existing node's NodeData variant.
          const mergedData = { ...n.data, ...patch } as NodeData;
          return { ...n, data: mergedData };
        }),
      }));
    },
    [commit],
  );

  const removeNode = useCallback(
    (id: string): void => {
      commit((def) => ({
        ...def,
        nodes: def.nodes.filter((n) => n.id !== id),
        edges: def.edges.filter((e) => e.source !== id && e.target !== id),
      }));
      setSelectedNodeId((cur) => (cur === id ? null : cur));
    },
    [commit],
  );

  const duplicateNodes = useCallback(
    (ids: string[]): string[] => {
      const def = latestDefinitionRef.current;
      if (!def) return [];
      // StrictMode safety: `genId()` and `newIds.push(...)` used to live
      // inside the mutator body. React double-invokes the updater that ran
      // it, so duplicating N nodes returned 2N ids — and the first N referred
      // to clones that were never committed. Callers select the returned ids,
      // so a duplicate could leave the canvas selecting a phantom node.
      // Everything id-generating now happens once, before the commit.
      const newIds: string[] = [];
      const idSet = new Set(ids);
      const idMap = new Map<string, string>();
      const clones: PipelineNode[] = def.nodes
        .filter((n) => idSet.has(n.id))
        .map((n) => {
          const fresh = genId();
          idMap.set(n.id, fresh);
          newIds.push(fresh);
          return {
            ...n,
            id: fresh,
            position: { x: n.position.x + 40, y: n.position.y + 40 },
            data: { ...n.data },
          };
        });
      // Clone edges that are internal to the selection.
      const clonedEdges: PipelineEdge[] = def.edges
        .filter((e) => idSet.has(e.source) && idSet.has(e.target))
        .map((e) => ({
          ...e,
          id: genId(),
          source: idMap.get(e.source) ?? e.source,
          target: idMap.get(e.target) ?? e.target,
        }));
      commit((current) => ({
        ...current,
        nodes: [...current.nodes, ...clones],
        edges: [...current.edges, ...clonedEdges],
      }));
      return newIds;
    },
    [commit],
  );

  const addEdge = useCallback(
    (edge: Omit<PipelineEdge, 'id'>): string => {
      const id = genId();
      commit((def) => ({
        ...def,
        edges: [...def.edges, { id, ...edge }],
      }));
      return id;
    },
    [commit],
  );

  const removeEdge = useCallback(
    (id: string): void => {
      commit((def) => ({
        ...def,
        edges: def.edges.filter((e) => e.id !== id),
      }));
    },
    [commit],
  );

  const setPositions = useCallback(
    (
      updates: Array<{ id: string; position: { x: number; y: number } }>,
    ): void => {
      if (updates.length === 0) return;
      // Two fixes meet here, and both are load-bearing.
      //
      // PURITY: `savePipelinePositionsOnly` is a localStorage write, and it
      // used to sit inside the `setDefinition` updater — which React
      // double-invokes in dev, so every drag wrote twice. The next definition
      // is computed from `latestDefinitionRef` and the write happens out here,
      // where running it once is guaranteed.
      //
      // REMOTE PERSISTENCE: drags used to write ONLY to localStorage. The
      // remote is the source of truth, so an arranged layout survived a reload
      // in the same browser and nowhere else — reopen the pipeline on another
      // machine, or after a cache clear, and every node snapped back. Marking
      // dirty routes the move through the same debounced autosave every other
      // edit uses, which coalesces a burst (drag settle, Shift+Arrow key
      // repeat, auto-arrange) into one write instead of one per event. The
      // synchronous localStorage write stays as the crash floor: it is the
      // only thing that survives the tab being killed inside the debounce
      // window.
      const prev = latestDefinitionRef.current;
      if (!prev) return;
      const byId = new Map(updates.map((u) => [u.id, u.position]));
      const next = {
        ...prev,
        nodes: prev.nodes.map((n) => {
          const pos = byId.get(n.id);
          return pos ? { ...n, position: pos } : n;
        }),
      };
      latestDefinitionRef.current = next;
      savePipelinePositionsOnly(next);
      setDefinition(next);
      setDirty(true);
    },
    [],
  );

  // -------------------------------------------------------------------------
  // Persistence actions
  // -------------------------------------------------------------------------

  const save = useCallback((): void => {
    if (!definition) return;
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    // Explicit save doubles as the manual flush: it takes over whatever the
    // debounce had queued, so no redundant second write follows it.
    void persist(definition);
  }, [definition, persist]);

  const publish = useCallback((): void => {
    if (!definition) return;
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    const target = definition;
    const doPublish = async () => {
      if (dirty) {
        await savePipeline(target);
        clearDirtyIfUnchanged(target);
      }
      const published = await publishPipelineStorage(definition.id);
      if (published) setDefinition(published);
    };
    void doPublish();
  }, [definition, dirty, clearDirtyIfUnchanged]);

  const revert = useCallback((): void => {
    void loadPipeline(pipelineId).then((loaded) => {
      setDefinition(loaded);
      setDirty(false);
      setSaveError(null);
      setUndoStack([]);
      setRedoStack([]);
    });
  }, [pipelineId]);

  // -------------------------------------------------------------------------
  // Metadata mutations (not tracked by undo — per the history contract above,
  // only node/edge changes go on the undo stack).
  // -------------------------------------------------------------------------

  const rename = useCallback((name: string): void => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setDefinition((prev) => {
      if (!prev || prev.name === trimmed) return prev;
      return { ...prev, name: trimmed };
    });
    setDirty(true);
  }, []);

  const setIcon = useCallback((icon: string): void => {
    setDefinition((prev) => {
      if (!prev || prev.icon === icon) return prev;
      return { ...prev, icon };
    });
    setDirty(true);
  }, []);

  const setTags = useCallback((tags: string[]): void => {
    setDefinition((prev) => {
      if (!prev) return prev;
      const a = prev.tags ?? [];
      if (a.length === tags.length && a.every((t, i) => t === tags[i])) return prev;
      return { ...prev, tags: [...tags] };
    });
    setDirty(true);
  }, []);

  // -------------------------------------------------------------------------
  // Undo / redo
  // -------------------------------------------------------------------------

  // StrictMode safety: both of these used to nest `setRedoStack` /
  // `setUndoStack` / `setDefinition` / `setDirty` *inside* the outer stack
  // updater. React double-invokes updaters in dev, so a single undo pushed
  // two identical frames onto the redo stack (and vice versa) — after one
  // undo you needed two redos to get back. Read the stacks from state and
  // enqueue each update once.
  const undo = useCallback((): void => {
    if (undoStack.length === 0 || !definition) return;
    const frame = undoStack[undoStack.length - 1];
    const next = { ...definition, nodes: frame.nodes, edges: frame.edges };
    latestDefinitionRef.current = next;
    setRedoStack((redo) => [
      ...redo,
      { nodes: definition.nodes, edges: definition.edges },
    ]);
    setUndoStack((stack) => stack.slice(0, -1));
    setDefinition(next);
    setDirty(true);
  }, [definition, undoStack]);

  const redo = useCallback((): void => {
    if (redoStack.length === 0 || !definition) return;
    const frame = redoStack[redoStack.length - 1];
    const next = { ...definition, nodes: frame.nodes, edges: frame.edges };
    latestDefinitionRef.current = next;
    setUndoStack((undoS) => {
      const pushed = [
        ...undoS,
        { nodes: definition.nodes, edges: definition.edges },
      ];
      if (pushed.length > HISTORY_LIMIT) pushed.shift();
      return pushed;
    });
    setRedoStack((stack) => stack.slice(0, -1));
    setDefinition(next);
    setDirty(true);
  }, [definition, redoStack]);

  const value = useMemo<PipelineEditorValue>(
    () => ({
      definition,
      dirty,
      selectedNodeId,
      setSelectedNodeId,
      addNode,
      updateNode,
      updateNodeData,
      removeNode,
      duplicateNodes,
      addEdge,
      removeEdge,
      setPositions,
      save,
      publish,
      revert,
      saveError,
      clearSaveError,
      undo,
      redo,
      canUndo: undoStack.length > 0,
      canRedo: redoStack.length > 0,
      rename,
      setIcon,
      setTags,
    }),
    [
      definition,
      dirty,
      selectedNodeId,
      addNode,
      updateNode,
      updateNodeData,
      removeNode,
      duplicateNodes,
      addEdge,
      removeEdge,
      setPositions,
      save,
      publish,
      revert,
      saveError,
      clearSaveError,
      undo,
      redo,
      undoStack.length,
      redoStack.length,
      rename,
      setIcon,
      setTags,
    ],
  );

  return (
    <PipelineEditorContext.Provider value={value}>
      {children}
    </PipelineEditorContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function usePipelineEditor(): PipelineEditorValue {
  const ctx = useContext(PipelineEditorContext);
  if (!ctx) {
    throw new Error(
      'usePipelineEditor must be used within a PipelineEditorProvider',
    );
  }
  return ctx;
}
