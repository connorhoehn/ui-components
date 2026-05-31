// demo/src/demos/hook-capability-integration/index.tsx
//
// Interactive showcase of useCapability() + CapabilityBoundary +
// CapabilityDeniedFallback. The capability hook makes a REST call against the
// gateway in live mode, so this demo synthesizes capability hook returns
// locally and lets the user toggle them on/off — keeping the gating semantics
// visible without depending on a running gateway.

import { useState } from 'react';
import type { RMCapabilityHookResult } from '@/integrations/realtime-modules/types';
import { CapabilityBoundary } from '@/integrations/realtime-modules/CapabilityBoundary';
import { CapabilityDeniedFallback } from '@/components/shared/CapabilityDeniedFallback';
import { Switch } from '@/components/shared/Switch';
import { Card } from '@/components/ui/Card';

type CapabilityKey = 'chat' | 'recording' | 'ai-assistant';

interface CapabilityRow {
  key: CapabilityKey;
  label: string;
  icon: string;
  enabledNode: React.ReactNode;
  fallbackCapabilityName: string;
  fallbackDescription: string;
}

function makeHookReturn(
  key: CapabilityKey,
  enabled: boolean,
  isLoading: boolean,
): RMCapabilityHookResult {
  return {
    capability: enabled ? { name: key, enabled: true } : null,
    enabled,
    isLoading,
  };
}

const CAPABILITY_ROWS: CapabilityRow[] = [
  {
    key: 'chat',
    label: 'Chat',
    icon: '💬',
    enabledNode: (
      <div className="rounded-md border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
        <strong>Chat is enabled.</strong> The real app would render
        &lt;ChatPanel /&gt; here.
      </div>
    ),
    fallbackCapabilityName: 'Chat',
    fallbackDescription:
      'Chat is not enabled for this workspace. Ask your admin to enable the "chat" CRD.',
  },
  {
    key: 'recording',
    label: 'Recording',
    icon: '⏺️',
    enabledNode: (
      <div className="rounded-md border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
        <strong>Recording is enabled.</strong> The real app would render the
        recording controls and player here.
      </div>
    ),
    fallbackCapabilityName: 'Recording',
    fallbackDescription:
      'Recording is not provisioned for your plan. Upgrade to enable session recording.',
  },
  {
    key: 'ai-assistant',
    label: 'AI Assistant',
    icon: '🤖',
    enabledNode: (
      <div className="rounded-md border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
        <strong>AI Assistant is enabled.</strong> The real app would render
        the agent chat surface here.
      </div>
    ),
    fallbackCapabilityName: 'AI Assistant',
    fallbackDescription:
      'AI Assistant is in private beta. Request access from your administrator.',
  },
];

function CapabilityShowcaseRow({
  row,
  enabled,
  loading,
  onSetEnabled,
  onPulseLoad,
}: {
  row: CapabilityRow;
  enabled: boolean;
  loading: boolean;
  onSetEnabled: (value: boolean) => void;
  onPulseLoad: () => void;
}) {
  const hook = makeHookReturn(row.key, enabled, loading);
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-lg">{row.icon}</span>
          <h3 className="text-sm font-semibold text-slate-800">{row.label}</h3>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-600">
            useCapability('{row.key}')
          </code>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-slate-600">
            {enabled ? 'Enabled' : 'Disabled'}
          </span>
          <Switch
            checked={enabled}
            onChange={onSetEnabled}
            aria-label={`Toggle ${row.label} capability`}
          />
          <button
            type="button"
            onClick={onPulseLoad}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Pulse loading
          </button>
        </div>
      </div>

      <CapabilityBoundary
        capability={hook}
        loading={
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Resolving capability…
          </div>
        }
        fallback={
          <CapabilityDeniedFallback
            capabilityName={row.fallbackCapabilityName}
            description={row.fallbackDescription}
            actionLabel="Contact admin"
            onAction={() => alert(`Request access for ${row.label}`)}
          />
        }
      >
        {row.enabledNode}
      </CapabilityBoundary>
    </Card>
  );
}

export default function HookCapabilityIntegrationDemo() {
  const [enabledMap, setEnabledMap] = useState<Record<CapabilityKey, boolean>>({
    chat: true,
    recording: false,
    'ai-assistant': false,
  });
  const [loadingMap, setLoadingMap] = useState<Record<CapabilityKey, boolean>>({
    chat: false,
    recording: false,
    'ai-assistant': false,
  });

  const setEnabled = (key: CapabilityKey, value: boolean) =>
    setEnabledMap((prev) => ({ ...prev, [key]: value }));

  const pulseLoad = (key: CapabilityKey) => {
    setLoadingMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoadingMap((prev) => ({ ...prev, [key]: false }));
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-[820px] p-8">
      <h2 className="mb-1 text-xl font-bold text-slate-900">
        useCapability + CapabilityBoundary
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-slate-500">
        Each card wraps its content in{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[12px]">
          {'<CapabilityBoundary>'}
        </code>{' '}
        — flip the switch to flip the synthesized hook return and watch the
        gate swap between content,{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[12px]">
          {'<CapabilityDeniedFallback>'}
        </code>
        , and the loading slot.
      </p>

      <div className="flex flex-col gap-4">
        {CAPABILITY_ROWS.map((row) => (
          <CapabilityShowcaseRow
            key={row.key}
            row={row}
            enabled={enabledMap[row.key]}
            loading={loadingMap[row.key]}
            onSetEnabled={(v) => setEnabled(row.key, v)}
            onPulseLoad={() => pulseLoad(row.key)}
          />
        ))}
      </div>

      <p className="mt-6 text-[12px] italic text-slate-400">
        In live mode each row would replace the synthesized hook return with{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] not-italic">
          useCapability(name)
        </code>{' '}
        from{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] not-italic">
          @connorhoehn/realtime-modules/client
        </code>
        . The gateway resolves the capability from the registered CRD set on
        connect.
      </p>
    </div>
  );
}
