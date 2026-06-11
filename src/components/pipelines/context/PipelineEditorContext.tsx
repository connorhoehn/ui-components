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

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load on mount / pipelineId change.
  useEffect(() => {
    let cancelled = false;
    setDefinition(null);
    setDirty(false);
    setSelectedNodeId(null);
    setUndoStack([]);
    setRedoStack([]);
    loadPipeline(pipelineId).then((loaded) => {
      if (cancelled) return;
      if (loaded) {
        loaded.nodes = loaded.nodes ?? [];
        loaded.edges = loaded.edges ?? [];
      }
      setDefinition(loaded);
    });
    return () => { cancelled = true; };
  }, [pipelineId]);

  // Debounced autosave. Cancels any pending timer on unmount / new edit.
  useEffect(() => {
    if (!dirty || !definition) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      void savePipeline(definition).then(() => setDirty(false));
    }, SAVE_DEBOUNCE_MS);
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, [definition, dirty]);

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
  const commit = useCallback(
    (
      mutator: (def: PipelineDefinition) => PipelineDefinition,
    ): PipelineDefinition | null => {
      let committed: PipelineDefinition | null = null;
      setDefinition((prev) => {
        if (!prev) return prev;
        pushHistory(prev);
        const next = mutator(prev);
        committed = next;
        return next;
      });
      setDirty(true);
      return committed;
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
      const newIds: string[] = [];
      commit((def) => {
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
        return {
          ...def,
          nodes: [...def.nodes, ...clones],
          edges: [...def.edges, ...clonedEdges],
        };
      });
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
      setDefinition((prev) => {
        if (!prev) return prev;
        const byId = new Map(updates.map((u) => [u.id, u.position]));
        const next = {
          ...prev,
          nodes: prev.nodes.map((n) => {
            const pos = byId.get(n.id);
            return pos ? { ...n, position: pos } : n;
          }),
        };
        savePipelinePositionsOnly(next);
        return next;
      });
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
    void savePipeline(definition).then(() => setDirty(false));
  }, [definition]);

  const publish = useCallback((): void => {
    if (!definition) return;
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    const doPublish = async () => {
      if (dirty) {
        await savePipeline(definition);
        setDirty(false);
      }
      const published = await publishPipelineStorage(definition.id);
      if (published) setDefinition(published);
    };
    void doPublish();
  }, [definition, dirty]);

  const revert = useCallback((): void => {
    void loadPipeline(pipelineId).then((loaded) => {
      setDefinition(loaded);
      setDirty(false);
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

  const undo = useCallback((): void => {
    setUndoStack((stack) => {
      if (stack.length === 0 || !definition) return stack;
      const frame = stack[stack.length - 1];
      setRedoStack((redo) => [
        ...redo,
        { nodes: definition.nodes, edges: definition.edges },
      ]);
      setDefinition({ ...definition, nodes: frame.nodes, edges: frame.edges });
      setDirty(true);
      return stack.slice(0, -1);
    });
  }, [definition]);

  const redo = useCallback((): void => {
    setRedoStack((stack) => {
      if (stack.length === 0 || !definition) return stack;
      const frame = stack[stack.length - 1];
      setUndoStack((undoS) => {
        const next = [
          ...undoS,
          { nodes: definition.nodes, edges: definition.edges },
        ];
        if (next.length > HISTORY_LIMIT) next.shift();
        return next;
      });
      setDefinition({ ...definition, nodes: frame.nodes, edges: frame.edges });
      setDirty(true);
      return stack.slice(0, -1);
    });
  }, [definition]);

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
