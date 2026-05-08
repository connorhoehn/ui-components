import { AgentsLayout, AgentFlowPage } from '../../../../src/components/agents';

export default function FlowDemo() {
  return (
    <div style={{ padding: 24 }}>
      <AgentsLayout>
        <AgentFlowPage
          onAgentClick={(id) => console.log('Agent clicked:', id)}
        />
      </AgentsLayout>
    </div>
  );
}
