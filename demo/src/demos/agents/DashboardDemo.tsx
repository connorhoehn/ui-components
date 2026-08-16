import { AgentsLayout, AgentsDashboardPage } from '../../../../src/components/agents';

export default function DashboardDemo() {
  return (
    <div className="p-6 overflow-auto flex-[1]">
      <AgentsLayout>
        <AgentsDashboardPage
          onAgentClick={(id) => console.log('Navigate to agent:', id)}
        />
      </AgentsLayout>
    </div>
  );
}
