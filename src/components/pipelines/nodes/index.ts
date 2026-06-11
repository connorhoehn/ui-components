// src/components/pipelines/nodes/index.ts
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
import ImageSourceNode from './image-source/ImageSourceNode';
import SaveNode from './save/SaveNode';
import ScatterNode from './scatter/ScatterNode';
import ResizeNode from './resize/ResizeNode';
import TransformGeoNode from './transform-geo/TransformGeoNode';
import FormatConvertNode from './format-convert/FormatConvertNode';
import SharpenNode from './sharpen/SharpenNode';
import WatermarkNode from './watermark/WatermarkNode';
import CropNode from './crop/CropNode';
import AdjustBwNode from './adjust-bw/AdjustBwNode';
import AdjustLayerNode from './adjust-layer/AdjustLayerNode';
import DimensionsNode from './dimensions/DimensionsNode';
import UpscaleNode from './upscale/UpscaleNode';
import VisionNode from './vision/VisionNode';
import VisionClassifyNode from './vision-classify/VisionClassifyNode';
import VisionDescribeNode from './vision-describe/VisionDescribeNode';
import VisionTagNode from './vision-tag/VisionTagNode';
import VisionExtractTextNode from './vision-extract-text/VisionExtractTextNode';
import GenerateNode from './generate/GenerateNode';
import VariationNode from './variation/VariationNode';
import EditPromptNode from './edit-prompt/EditPromptNode';

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
  ImageSourceNode,
  SaveNode,
  ScatterNode,
  ResizeNode,
  TransformGeoNode,
  FormatConvertNode,
  SharpenNode,
  WatermarkNode,
  CropNode,
  AdjustBwNode,
  AdjustLayerNode,
  DimensionsNode,
  UpscaleNode,
  VisionNode,
  VisionClassifyNode,
  VisionDescribeNode,
  VisionTagNode,
  VisionExtractTextNode,
  GenerateNode,
  VariationNode,
  EditPromptNode,
};

export { default as BaseNode, type NodeExecutionState } from './BaseNode';

export const nodeTypes = {
  trigger:                   TriggerNode,
  llm:                       LLMNode,
  transform:                 TransformNode,
  condition:                 ConditionNode,
  action:                    ActionNode,
  fork:                      ForkNode,
  join:                      JoinNode,
  approval:                  ApprovalNode,
  agent:                     AgentNode,
  'mcp-tool':                McpToolNode,
  'knowledge-base':          KnowledgeBaseNode,
  'graph-query':             GraphQueryNode,
  memory:                    MemoryNode,
  guardrail:                 GuardrailNode,
  policy:                    PolicyNode,
  'ag-ui-output':            AgUiOutputNode,
  'image-source':            ImageSourceNode,
  'image:save':              SaveNode,
  'scatter':                 ScatterNode,
  'image:resize':            ResizeNode,
  'image:transform':         TransformGeoNode,
  'image:format-convert':    FormatConvertNode,
  'image:sharpen':           SharpenNode,
  'image:watermark':         WatermarkNode,
  'image:crop':              CropNode,
  'image:adjust-bw':         AdjustBwNode,
  'image:adjust-layer':      AdjustLayerNode,
  'image:dimensions':        DimensionsNode,
  'image:upscale':           UpscaleNode,
  'image:vision-analyze':    VisionNode,
  'image:vision-classify':   VisionClassifyNode,
  'image:vision-describe':   VisionDescribeNode,
  'image:vision-tag':        VisionTagNode,
  'image:vision-extract-text': VisionExtractTextNode,
  'image:generate':          GenerateNode,
  'image:variation':         VariationNode,
  'image:edit-prompt':       EditPromptNode,
} as const;
