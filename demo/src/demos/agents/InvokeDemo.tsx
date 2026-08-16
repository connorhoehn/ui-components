import { useState, useEffect, useRef } from 'react';
import { AgentsLayout, AgentInvokePage } from '../../../../src/components/agents';
import { mockFetchAgUiStream } from './eventSimulator';

/**
 * InvokeDemo — wraps AgentInvokePage with an optional simulated event stream.
 *
 * Simulated mode (default): replaces window.fetch with a stub that emits a
 * scripted sequence of AG-UI events so the demo works without a live backend.
 *
 * Live mode: restores window.fetch and points at the real endpoint.
 * Expect network errors unless a compatible AgentCore runtime is reachable.
 */
export default function InvokeDemo() {
  const [simulated, setSimulated] = useState(true);
  // Keep a stable ref to the original fetch so restores are always accurate.
  const originalFetchRef = useRef<typeof fetch>(window.fetch);

  useEffect(() => {
    if (simulated) {
      window.fetch = mockFetchAgUiStream();
    } else {
      window.fetch = originalFetchRef.current;
    }
    return () => {
      window.fetch = originalFetchRef.current;
    };
  }, [simulated]);

  return (
    <div className="flex flex-col h-full">
      {/* Mode toggle banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 16px',
          background: simulated ? '#f0fdf4' : '#fff7ed',
          borderBottom: `1px solid ${simulated ? '#bbf7d0' : '#fed7aa'}`,
          fontSize: 13,
        }}
      >
        <span className={`w-2 h-2 rounded-full shrink-0 ${simulated ? 'bg-[#22c55e]' : 'bg-[#f97316]'}`}
        />
        <span className={`font-medium ${simulated ? 'text-[#15803d]' : 'text-[#c2410c]'}`}>
          {simulated ? 'Simulated mode — scripted AG-UI event stream' : 'Live mode — requires AgentCore runtime'}
        </span>
        <button
          onClick={() => setSimulated((s) => !s)}
          style={{
            marginLeft: 'auto',
            padding: '4px 12px',
            fontSize: 12,
            fontWeight: 500,
            border: `1px solid ${simulated ? '#86efac' : '#fdba74'}`,
            borderRadius: 6,
            background: '#fff',
            color: simulated ? '#15803d' : '#c2410c',
            cursor: 'pointer',
          }}
        >
          {simulated ? 'Switch to live endpoint' : 'Use simulated stream'}
        </button>
      </div>

      {/* Page content */}
      <div className="p-6 overflow-auto flex-[1]">
        <AgentsLayout>
          <AgentInvokePage defaultAgentId="orgiq-supervisor" />
        </AgentsLayout>
      </div>
    </div>
  );
}
