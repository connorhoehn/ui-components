// Agents domain module — AG-UI streaming, A2A flow, agent management

// Layout & Pages
export { AgentsLayout } from './AgentsLayout';
export { AgentsDashboardPage } from './AgentsDashboardPage';
export { AgentDetailPage } from './AgentDetailPage';
export { AgentFlowPage } from './AgentFlowPage';
export { AgentInvokePage } from './AgentInvokePage';

// Context
export { AgentsProvider, useAgentsContext } from './context/AgentsContext';

// Hooks
export { useAgUiStream } from './hooks/useAgUiStream';
export { useAgentRegistry } from './hooks/useAgentRegistry';
export { useAgentMetrics } from './hooks/useAgentMetrics';
export { useA2ASession } from './hooks/useA2ASession';

// Components
export { AgentCard } from './components/AgentCard';
export { AgentFlowCanvas } from './components/AgentFlowCanvas';
export { StreamingChatPanel } from './components/StreamingChatPanel';
export { ToolCallRenderer } from './components/ToolCallRenderer';
export { TraceTimeline } from './components/TraceTimeline';
export { GuardrailBadge } from './components/GuardrailBadge';
export { PolicyDecisionLog } from './components/PolicyDecisionLog';
export { MemoryInspector } from './components/MemoryInspector';

// Fixtures
export { fixtureAgents, fixtureMetrics, fixtureTrace } from './fixtures/agentsFixture';

// Re-export types
export type {
  AgentDefinition,
  AgentStatus,
  AgentProtocol,
  AgUiEvent,
  AgUiEventType,
  AgUiToolCall,
  AgUiMessage,
  AgUiSession,
  TraceSpan,
  TraceTimeline as TraceTimelineType,
  SpanKind,
  SpanStatus,
  A2AMessage,
  A2ASession,
  AgentMetrics,
} from '../../types/agents';

export type { PolicyDecision } from './components/PolicyDecisionLog';
export type { MemoryEntry } from './components/MemoryInspector';
