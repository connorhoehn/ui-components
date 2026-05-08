import { AgentsLayout, AgentInvokePage } from '../../../../src/components/agents';

export default function InvokeDemo() {
  return (
    <div style={{ padding: 24 }}>
      <AgentsLayout>
        <AgentInvokePage defaultAgentId="orgiq-supervisor" />
      </AgentsLayout>
    </div>
  );
}
