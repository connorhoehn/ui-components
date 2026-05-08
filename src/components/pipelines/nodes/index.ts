// frontend/src/components/pipelines/nodes/index.ts
//
// Registry of React Flow node components for the pipeline editor canvas.
// Consumed by the editor via `<ReactFlow nodeTypes={nodeTypes} />`.

import TriggerNode from './trigger/TriggerNode';
import LLMNode from './llm/LLMNode';
import TransformNode from './transform/TransformNode';
import ConditionNode from './condition/ConditionNode';
import ActionNode from './action/ActionNode';
import ForkNode from './fork/ForkNode';
import JoinNode from './join/JoinNode';
import ApprovalNode from './approval/ApprovalNode';
import AgentNode from './agent/AgentNode';
import McpToolNode from './mcp-tool/McpToolNode';
import KnowledgeBaseNode from './knowledge-base/KnowledgeBaseNode';
import GraphQueryNode from './graph-query/GraphQueryNode';
import MemoryNode from './memory/MemoryNode';
import GuardrailNode from './guardrail/GuardrailNode';
import PolicyNode from './policy/PolicyNode';
import AgUiOutputNode from './ag-ui-output/AgUiOutputNode';

export {
  TriggerNode,
  LLMNode,
  TransformNode,
  ConditionNode,
  ActionNode,
  ForkNode,
  JoinNode,
  ApprovalNode,
  AgentNode,
  McpToolNode,
  KnowledgeBaseNode,
  GraphQueryNode,
  MemoryNode,
  GuardrailNode,
  PolicyNode,
  AgUiOutputNode,
};

export { default as BaseNode, type NodeExecutionState } from './BaseNode';

export const nodeTypes = {
  trigger:          TriggerNode,
  llm:              LLMNode,
  transform:        TransformNode,
  condition:        ConditionNode,
  action:           ActionNode,
  fork:             ForkNode,
  join:             JoinNode,
  approval:         ApprovalNode,
  agent:            AgentNode,
  'mcp-tool':       McpToolNode,
  'knowledge-base': KnowledgeBaseNode,
  'graph-query':    GraphQueryNode,
  memory:           MemoryNode,
  guardrail:        GuardrailNode,
  policy:           PolicyNode,
  'ag-ui-output':   AgUiOutputNode,
} as const;
