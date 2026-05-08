import { AgentsLayout, AgentsDashboardPage } from '../../../../src/components/agents';

export default function DashboardDemo() {
  return (
    <div style={{ padding: 24 }}>
      <AgentsLayout>
        <AgentsDashboardPage
          onAgentClick={(id) => console.log('Navigate to agent:', id)}
        />
      </AgentsLayout>
    </div>
  );
}
