import type { SimulationTimeline } from '../../engine/types';

export const pipelineExecutionTimeline: SimulationTimeline = {
  id: 'pipeline-execution',
  name: 'Pipeline Execution',
  description: 'Simulates a full pipeline run with sequential step execution and LLM streaming.',
  loop: true,
  events: [
    {
      delay: 0,
      message: { type: 'pipeline', action: 'run.started', pipelineId: 'demo-1', runId: 'run-1' },
      description: 'Pipeline run started',
    },
    {
      delay: 1500,
      message: { type: 'pipeline', action: 'step.started', nodeId: 'trigger-1', status: 'running' },
      description: 'Trigger node started',
    },
    {
      delay: 2000,
      message: { type: 'pipeline', action: 'step.completed', nodeId: 'trigger-1', status: 'completed' },
      description: 'Trigger node completed',
    },
    {
      delay: 500,
      message: { type: 'pipeline', action: 'step.started', nodeId: 'transform-1', status: 'running' },
      description: 'Transform node started',
    },
    {
      delay: 3000,
      message: {
        type: 'pipeline',
        action: 'step.completed',
        nodeId: 'transform-1',
        status: 'completed',
        output: { text: 'Extracted 2,847 words' },
      },
      description: 'Transform completed - extracted 2,847 words',
    },
    {
      delay: 500,
      message: { type: 'pipeline', action: 'step.started', nodeId: 'llm-1', status: 'running' },
      description: 'LLM node started',
    },
    {
      delay: 4000,
      message: { type: 'pipeline', action: 'llm.stream.token', nodeId: 'llm-1', token: 'Classification: Invoice' },
      description: 'LLM streaming token output',
    },
    {
      delay: 1000,
      message: { type: 'pipeline', action: 'step.completed', nodeId: 'llm-1', status: 'completed' },
      description: 'LLM node completed',
    },
    {
      delay: 500,
      message: { type: 'pipeline', action: 'step.started', nodeId: 'action-1', status: 'running' },
      description: 'Action node started',
    },
    {
      delay: 1500,
      message: { type: 'pipeline', action: 'step.completed', nodeId: 'action-1', status: 'completed' },
      description: 'Action node completed',
    },
    {
      delay: 500,
      message: { type: 'pipeline', action: 'run.completed', runId: 'run-1', status: 'completed', duration: 14000 },
      description: 'Pipeline run completed in 14s',
    },
  ],
};
