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
      {/* Two-state tone banner: success while simulated, caution when live.
          Was a private green/orange hex set; now the same four-role tone
          tokens every library surface uses. */}
      <div
        className={`flex items-center gap-2.5 py-2 px-4 text-[13px] border-b ${
          simulated
            ? 'bg-success-bg border-success-border'
            : 'bg-caution-bg border-caution-border'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${simulated ? 'bg-success' : 'bg-caution'}`}
        />
        <span className={`font-medium ${simulated ? 'text-success-fg' : 'text-caution-fg'}`}>
          {simulated ? 'Simulated mode — scripted AG-UI event stream' : 'Live mode — requires an agent runtime'}
        </span>
        <button
          onClick={() => setSimulated((s) => !s)}
          className={`ml-auto py-1 px-3 text-[12px] font-medium border rounded-md bg-surface cursor-pointer ${
            simulated
              ? 'border-success-border text-success-fg'
              : 'border-caution-border text-caution-fg'
          }`}
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
