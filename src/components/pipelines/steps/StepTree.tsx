import React, { useMemo, type ReactNode } from 'react';
import type { NodeType, PipelineEdge, StepExecution } from '../../../types/pipeline';
import { StepThread } from './StepThread';

export interface StepTreeProps {
  steps: Record<string, StepExecution>;
  nodeDataMap: Record<string, { type: NodeType; data: Record<string, unknown> }>;
  edges?: PipelineEdge[];
  onRetryFromStep?: (stepId: string) => void;
  onResumeFromStep?: (stepId: string) => void;
  /** Forwarded to every step: click-through for the artifacts a step produced. */
  onArtifactClick?: (imageId: string) => void;
  /**
   * Extra content for a step, rendered in its row under the summary and
   * outside the disclosure — the thing that step PRODUCED (a deck, a meeting,
   * an agenda). Called for every step; return `null` for the ones with
   * nothing to show.
   *
   * Hosts were rendering those cards in a section above the tree, which put
   * the output of step 4 above step 1 and left the row that made it showing
   * only a duration.
   */
  renderStepDetail?: (step: StepExecution, stepId: string) => ReactNode;
}

export interface StepTreeNode {
  stepId: string;
  step: StepExecution;
  branch?: string;
  children: StepTreeNode[];
}

/**
 * Execution start of a step, in epoch ms, for ordering the tree.
 *
 * `StepExecution.startedAt` is the field that means this; the ordering used to
 * reconstruct it as `completedAt - durationMs` and fall back to `0` — the Unix
 * epoch — whenever `completedAt` was absent. Every step that had not finished
 * therefore sorted BEFORE every step that had, so on a live run the step the
 * operator was waiting on rendered above the steps that already completed, then
 * visibly jumped down into place when the completion event landed. A cancelled
 * run showed the same inversion for the killed step.
 *
 * A step whose start is genuinely unknown sorts LAST (it has not run) rather
 * than to the epoch, and ties keep insertion order because `Array#sort` is
 * stable.
 */
function stepStartMs(step: StepExecution): number {
  if (step.startedAt) {
    const t = Date.parse(step.startedAt);
    if (Number.isFinite(t)) return t;
  }
  if (step.completedAt) {
    const done = Date.parse(step.completedAt);
    if (Number.isFinite(done)) return done - (step.durationMs ?? 0);
  }
  return Number.POSITIVE_INFINITY;
}

export function StepTree({ steps, nodeDataMap, edges, onRetryFromStep, onResumeFromStep, onArtifactClick, renderStepDetail }: StepTreeProps) {
  const tree = useMemo(() => {
    const sorted = Object.entries(steps).sort(([, a], [, b]) => {
      const aT = stepStartMs(a);
      const bT = stepStartMs(b);
      // Not `aT - bT`: both can be Infinity, and Infinity - Infinity is NaN,
      // which lets the engine emit an arbitrary permutation.
      if (aT === bT) return 0;
      return aT < bT ? -1 : 1;
    });

    if (!edges || edges.length === 0) {
      return sorted.map(([stepId, step]) => ({
        stepId,
        step,
        children: [],
      }));
    }

    const baseNodeId = (key: string) => {
      const colonIdx = key.lastIndexOf(':');
      if (colonIdx > 0) {
        const suffix = key.slice(colonIdx + 1);
        if (/^\d+$/.test(suffix)) return key.slice(0, colonIdx);
      }
      return key;
    };

    const branchingTypes = new Set<NodeType>(['fork', 'condition', 'approval']);
    const branchingNodes = new Set<string>();
    for (const [id] of sorted) {
      const base = baseNodeId(id);
      const t = nodeDataMap[base]?.type;
      if (t && branchingTypes.has(t)) branchingNodes.add(base);
    }

    const isBranchHandle = (handle: string) =>
      handle.startsWith('branch-') ||
      handle === 'true' || handle === 'false' ||
      handle === 'approved' || handle === 'rejected';

    const branchEdges: { forkId: string; branch: string; targetNodeId: string }[] = [];
    for (const edge of edges) {
      if (branchingNodes.has(edge.source) && isBranchHandle(edge.sourceHandle)) {
        branchEdges.push({ forkId: edge.source, branch: edge.sourceHandle, targetNodeId: edge.target });
      }
    }

    const outEdges = new Map<string, { target: string; handle: string }[]>();
    for (const edge of edges) {
      if (!outEdges.has(edge.source)) outEdges.set(edge.source, []);
      outEdges.get(edge.source)!.push({ target: edge.target, handle: edge.sourceHandle });
    }

    const claimed = new Set<string>();

    function walkChain(startNodeId: string): StepTreeNode[] {
      const chain: StepTreeNode[] = [];
      let current: string | null = startNodeId;
      while (current) {
        const match = sorted.find(([id]) => baseNodeId(id) === current && !claimed.has(id));
        if (!match) break;
        const [stepId, step] = match;
        claimed.add(stepId);
        const node: StepTreeNode = { stepId, step, children: [] };

        const base = baseNodeId(stepId);
        if (branchingNodes.has(base)) {
          const myBranchEdges = branchEdges.filter((be) => be.forkId === base);
          for (const { branch, targetNodeId } of myBranchEdges) {
            const branchChain = walkChain(targetNodeId);
            for (const child of branchChain) {
              child.branch = child.branch ?? branch;
            }
            if (branchChain.length > 0) {
              branchChain[0].branch = branch;
              node.children.push(...branchChain);
            }
          }
        }

        chain.push(node);

        const nexts = outEdges.get(base)?.filter((e) => e.handle === 'out');
        current = nexts && nexts.length === 1 ? nexts[0].target : null;
      }
      return chain;
    }

    const hasIncoming = new Set<string>();
    for (const edge of edges) {
      hasIncoming.add(edge.target);
    }
    const rootNodeId = sorted.find(([id]) => !hasIncoming.has(baseNodeId(id)))?.[1]
      ? sorted.find(([id]) => !hasIncoming.has(baseNodeId(id)))![0]
      : sorted[0]?.[0];

    let rootNodes: StepTreeNode[] = [];
    if (rootNodeId) {
      rootNodes = walkChain(baseNodeId(rootNodeId));
    }

    for (const [stepId, step] of sorted) {
      if (claimed.has(stepId)) continue;
      rootNodes.push({ stepId, step, children: [] });
    }

    return rootNodes;
  }, [steps, nodeDataMap, edges]);

  const resolveNode = (stepId: string) => {
    if (nodeDataMap[stepId]) return nodeDataMap[stepId];
    const colonIdx = stepId.lastIndexOf(':');
    if (colonIdx > 0 && /^\d+$/.test(stepId.slice(colonIdx + 1))) {
      return nodeDataMap[stepId.slice(0, colonIdx)];
    }
    return undefined;
  };

  function renderNodes(nodes: StepTreeNode[], startIdx: number) {
    let counter = startIdx;
    return nodes.map((node) => {
      const thisIdx = counter++;
      const branches = new Map<string, StepTreeNode[]>();
      for (const child of node.children) {
        const key = child.branch ?? 'default';
        if (!branches.has(key)) branches.set(key, []);
        branches.get(key)!.push(child);
      }
      return (
        <React.Fragment key={node.stepId}>
          <StepThread
            onArtifactClick={onArtifactClick}
            stepId={node.stepId}
            step={node.step}
            index={thisIdx}
            nodeType={resolveNode(node.stepId)?.type ?? 'unknown'}
            nodeConfig={resolveNode(node.stepId)?.data}
            onRetryFromStep={onRetryFromStep}
            onResumeFromStep={onResumeFromStep}
            renderStepDetail={renderStepDetail}
          />
          {node.children.length > 0 && (
            <div className="ml-9 pl-5 border-l-2 border-dashed border-border mb-1">
              {Array.from(branches.entries()).map(([branch, children], branchIdx) => (
                <div key={branch}>
                  <div className={`text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${branchIdx === 0 ? 'mt-1' : 'mt-2'}`}>
                    {branch.replace('-', ' ')}
                  </div>
                  {renderNodes(children, counter)}
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      );
    });
  }

  return (
    <div className="relative">
      <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" />
      {renderNodes(tree, 0)}
    </div>
  );
}
