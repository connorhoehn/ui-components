import React, { useMemo } from 'react';
import { colors } from '../../../constants/styles';
import type { NodeType, PipelineEdge, StepExecution } from '../../../types/pipeline';
import { StepThread } from './StepThread';

export interface StepTreeProps {
  steps: Record<string, StepExecution>;
  nodeDataMap: Record<string, { type: NodeType; data: Record<string, unknown> }>;
  edges?: PipelineEdge[];
  /** When provided, each step renders a "Retry from here" action. */
  onRetryFromStep?: (stepId: string) => void;
  /**
   * hub#2223: when provided, each step renders a "Resume from here" action
   * that calls back with the step's nodeId. The caller (the run-detail page)
   * gates whether this is set based on run.status === 'failed'.
   */
  onResumeFromStep?: (stepId: string) => void;
}

export interface StepTreeNode {
  stepId: string;
  step: StepExecution;
  branch?: string;
  children: StepTreeNode[];
}

export function StepTree({ steps, nodeDataMap, edges, onRetryFromStep, onResumeFromStep }: StepTreeProps) {
  const tree = useMemo(() => {
    const sorted = Object.entries(steps).sort(([, a], [, b]) => {
      const aT = a.completedAt ? Date.parse(a.completedAt) - (a.durationMs ?? 0) : 0;
      const bT = b.completedAt ? Date.parse(b.completedAt) - (b.durationMs ?? 0) : 0;
      return aT - bT;
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

    // Build forward adjacency: nodeId → [{target, handle}]
    const outEdges = new Map<string, { target: string; handle: string }[]>();
    for (const edge of edges) {
      if (!outEdges.has(edge.source)) outEdges.set(edge.source, []);
      outEdges.get(edge.source)!.push({ target: edge.target, handle: edge.sourceHandle });
    }

    const claimed = new Set<string>();

    // Walk forward from a node along 'out' edges, collecting the linear chain.
    // Stops at dead-ends or already-claimed nodes. Returns StepTreeNodes with
    // children populated recursively for any branching nodes encountered.
    function walkChain(startNodeId: string): StepTreeNode[] {
      const chain: StepTreeNode[] = [];
      let current: string | null = startNodeId;
      while (current) {
        const match = sorted.find(([id]) => baseNodeId(id) === current && !claimed.has(id));
        if (!match) break;
        const [stepId, step] = match;
        claimed.add(stepId);
        const node: StepTreeNode = { stepId, step, children: [] };

        // If this node is a branching node, collect its branch children
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

        // Follow the 'out' edge to the next sequential node
        const nexts = outEdges.get(base)?.filter((e) => e.handle === 'out');
        current = nexts && nexts.length === 1 ? nexts[0].target : null;
      }
      return chain;
    }

    // Find roots: nodes with no incoming edges from other executed nodes, OR
    // use the sorted order and walk from the first unclaimed.
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

    // Any remaining unclaimed steps (e.g. disconnected nodes)
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
            stepId={node.stepId}
            step={node.step}
            index={thisIdx}
            nodeType={resolveNode(node.stepId)?.type ?? 'unknown'}
            nodeConfig={resolveNode(node.stepId)?.data}
            onRetryFromStep={onRetryFromStep}
            onResumeFromStep={onResumeFromStep}
          />
          {node.children.length > 0 && (
            <div style={{ marginLeft: 36, paddingLeft: 20, borderLeft: `2px dashed ${colors.border}`, marginBottom: 4 }}>
              {Array.from(branches.entries()).map(([branch, children], branchIdx) => (
                <div key={branch}>
                  <div style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: colors.textTertiary,
                    textTransform: 'uppercase',
                    padding: '4px 0 2px',
                    marginTop: branchIdx === 0 ? 4 : 8,
                  }}>
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
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        left: 15,
        top: 24,
        bottom: 24,
        width: 2,
        background: colors.border,
        borderRadius: 1,
      }} />
      {renderNodes(tree, 0)}
    </div>
  );
}
