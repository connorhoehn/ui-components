import { AgentsLayout, AgentFlowPage } from '../../../../src/components/agents';

export default function FlowDemo() {
  return (
    <div className="p-6 overflow-auto flex-[1]">
      <AgentsLayout>
        <AgentFlowPage
          onAgentClick={(id) => console.log('Agent clicked:', id)}
        />
      </AgentsLayout>
    </div>
  );
}
