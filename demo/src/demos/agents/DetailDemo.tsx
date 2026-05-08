import { AgentsLayout, AgentDetailPage } from '../../../../src/components/agents';
import { fixtureTrace } from '../../../../src/components/agents/fixtures/agentsFixture';

export default function DetailDemo() {
  return (
    <div style={{ padding: 24 }}>
      <AgentsLayout>
        <AgentDetailPage
          agentId="orgiq-supervisor"
          trace={fixtureTrace}
          onBack={() => console.log('Navigate back')}
        />
      </AgentsLayout>
    </div>
  );
}
