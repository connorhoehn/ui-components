// The webhook trigger panel must not hand out an invokable-looking URL or a
// signing secret for a relay this deployment does not run.
//
// The reference backend's /hooks/pipeline/:path route logs the delivery and
// answers 202; the bridge that would forward it onto the pipeline event source
// is not wired, so `useWebhookTriggers` is a dormant subscriber and a
// correctly-signed POST starts nothing. The panel nonetheless rendered the full
// URL with a Copy button and a Reveal/Copy pair for the secret — everything an
// integrator needs to build against a dead endpoint and then blame their own
// HMAC.
//
// Delivery is a HOST property, declared through the services seam as
// `webhookRelay: { enabled }`. Undeclared resolves to disabled, which is the
// honest default: the library ships the trigger UI, not the relay.

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import TriggerConfig from '../trigger/TriggerConfig';
import { ToastProvider } from '../../../shared/ToastProvider';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../services';
import {
  PipelineEditorContext,
  type PipelineEditorValue,
} from '../../context/PipelineEditorContext';

const noop = vi.fn();

const WEBHOOK_DATA = {
  type: 'trigger',
  triggerType: 'webhook',
  webhookPath: 'weekly-digest',
} as const;

/**
 * Renders the webhook trigger panel with a minted signing secret on the live
 * definition, optionally inside a services provider.
 *
 * `services` omitted → no provider at all, the "host never wired this" case.
 */
function show(services?: Partial<PipelineEditorServices>) {
  const editorValue = {
    definition: {
      id: 'p1',
      triggerBinding: { event: 'webhook', webhookPath: 'weekly-digest', webhookSecret: 'whsec_deadbeef' },
    },
  } as unknown as PipelineEditorValue;

  const panel = (
    <ToastProvider>
      <PipelineEditorContext.Provider value={editorValue}>
        <TriggerConfig data={WEBHOOK_DATA as never} onChange={noop} />
      </PipelineEditorContext.Provider>
    </ToastProvider>
  );

  return render(
    services ? (
      <PipelineEditorServicesProvider
        services={{ getImageUrl: (id: string) => `/img/${id}`, ...services }}
      >
        {panel}
      </PipelineEditorServicesProvider>
    ) : (
      panel
    ),
  );
}

describe('TriggerConfig — webhook relay gating', () => {
  it('says the endpoint is not active when no host declared a relay', () => {
    show();
    expect(screen.getByTestId('webhook-relay-inactive')).toHaveTextContent(
      /Endpoint not active/,
    );
  });

  it('withholds the URL, the Copy button and the secret while inert', () => {
    show();
    // The path is still editable — it is saved configuration.
    expect(screen.getByDisplayValue('weekly-digest')).toBeInTheDocument();
    // But nothing an integrator could build against.
    expect(screen.queryByText(/hooks\/pipeline\/weekly-digest/)).toBeNull();
    expect(screen.queryByRole('button', { name: 'Copy' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Reveal' })).toBeNull();
    expect(screen.queryByText('whsec_deadbeef')).toBeNull();
    expect(screen.queryByLabelText('webhook secret')).toBeNull();
  });

  it('still withholds them when the host declares the relay disabled', () => {
    show({ webhookRelay: { enabled: false, publicUrlBase: 'https://api.example.com' } });
    expect(screen.getByTestId('webhook-relay-inactive')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Copy' })).toBeNull();
  });

  it('offers the URL and the secret once the host declares the relay live', () => {
    show({ webhookRelay: { enabled: true, publicUrlBase: 'https://api.example.com' } });
    expect(screen.queryByTestId('webhook-relay-inactive')).toBeNull();
    // Built from the host's public origin, not the local dev fallback.
    expect(
      screen.getByText('https://api.example.com/hooks/pipeline/weekly-digest'),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Copy' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Reveal' })).toBeInTheDocument();
  });
});
