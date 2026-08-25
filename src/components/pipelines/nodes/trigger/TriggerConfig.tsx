// frontend/src/components/pipelines/nodes/trigger/TriggerConfig.tsx
//
// Config panel for Trigger nodes. See PIPELINES_PLAN.md §18.10.
//
// Fields rendered are conditional on `triggerType`:
//   document.*  → document type dropdown (from localStorage `ws_document_types_v1`)
//   schedule    → cron input + placeholder "Next fires" preview
//   webhook     → path input + read-only full-URL preview
//
// Webhook delivery is a HOST property, declared through the services seam as
// `webhookRelay: { enabled }`. Undeclared means not wired, and this panel then
// says so instead of offering a copyable URL and signing secret for an
// endpoint that answers 202 and starts nothing.

import { useContext, useId, useMemo, useState } from 'react';
import type { TriggerNodeData, TriggerType } from '../../../../types/pipeline';
import { ConfigField, NodeConfigShell } from '../shared';
import { Input } from '../../../forms/Input';
import { Select } from '../../../forms/Select';
import { parseCron, nextFires } from '../../cron/cronUtils';
import { useToast } from '../../../shared/ToastProvider';
import Banner from '../../../shared/Banner';
import { PipelineEditorContext } from '../../context/PipelineEditorContext';
import { useWebhookRelay } from '../../services';

// Webhook path constraint — must mirror the regex enforced by the social-api
// route at /hooks/pipeline/:path. Out of sync = users see a green URL the
// server rejects with 400. Update both sides together.
const WEBHOOK_PATH_RE = /^[a-zA-Z0-9_-]{1,64}$/;

// Public webhook host — defaulted to the local social-api so dev environments
// without VITE_SOCIAL_API_URL still produce a preview URL.
// Port 13001 matches Tiltfile HOST_PORT_SOCIAL_API.
const SOCIAL_API_URL =
  (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ??
  'http://localhost:13001';

export interface TriggerConfigProps {
  data: TriggerNodeData;
  onChange: (patch: Partial<TriggerNodeData>) => void;
}

// Minimal localStorage document-type shape (null-safe, read-only).
interface StoredDocType { id: string; name: string }

function readDocTypes(): StoredDocType[] {
  try {
    const raw = localStorage.getItem('ws_document_types_v1');
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x): x is Record<string, unknown> => typeof x === 'object' && x !== null)
      .filter(x => typeof x.id === 'string' && typeof x.name === 'string')
      .map(x => ({ id: x.id as string, name: x.name as string }));
  } catch {
    return [];
  }
}

const TRIGGER_TYPE_OPTIONS: Array<{ value: TriggerType; label: string }> = [
  { value: 'manual',            label: 'Manual' },
  { value: 'document.finalize', label: 'Document finalize' },
  { value: 'document.submit',   label: 'Document submit' },
  { value: 'document.comment',  label: 'Document comment' },
  { value: 'schedule',          label: 'Schedule' },
  { value: 'webhook',           label: 'Webhook' },
];

export default function TriggerConfig({ data, onChange }: TriggerConfigProps) {
  const uid = useId();
  const { toast } = useToast();
  // Secret is server-minted and lives on `triggerBinding`, not on the node
  // data — but the editor context owns the live definition so we can pull it
  // out for the reveal/copy interaction.
  const editor = useContext(PipelineEditorContext);
  const webhookSecret = editor?.definition?.triggerBinding?.webhookSecret;
  const [secretRevealed, setSecretRevealed] = useState(false);
  const webhookRelay = useWebhookRelay();
  const relayActive = webhookRelay.enabled;
  const webhookOrigin = webhookRelay.publicUrlBase ?? SOCIAL_API_URL;
  const isDoc = data.triggerType.startsWith('document.');
  const docTypes = useMemo(() => (isDoc ? readDocTypes() : []), [isDoc]);

  const docTypeMissing = isDoc && !data.documentTypeId;
  const scheduleMissing = data.triggerType === 'schedule' && !data.schedule;
  const webhookMissing  = data.triggerType === 'webhook'  && !data.webhookPath;

  // Webhook path validity
  const webhookPathRaw = data.webhookPath ?? '';
  const webhookPathInvalid =
    data.triggerType === 'webhook' &&
    webhookPathRaw.length > 0 &&
    !WEBHOOK_PATH_RE.test(webhookPathRaw);
  const webhookFullUrl =
    data.triggerType === 'webhook' && WEBHOOK_PATH_RE.test(webhookPathRaw)
      ? `${webhookOrigin}/hooks/pipeline/${webhookPathRaw}`
      : null;

  const onCopyWebhookUrl = () => {
    if (!webhookFullUrl) return;
    void navigator.clipboard
      .writeText(webhookFullUrl)
      .then(() => toast('Webhook URL copied', { type: 'success' }))
      .catch(() => toast('Could not copy webhook URL', { type: 'error' }));
  };

  const onCopyWebhookSecret = () => {
    if (!webhookSecret) return;
    void navigator.clipboard
      .writeText(webhookSecret)
      .then(() => toast('Webhook secret copied', { type: 'success' }))
      .catch(() => toast('Could not copy webhook secret', { type: 'error' }));
  };

  // Schedule preview — parse the cron and compute the next 3 fires.
  const cronExpr = data.triggerType === 'schedule' ? (data.schedule ?? '') : '';
  const parsedCron = useMemo(
    () => (cronExpr ? parseCron(cronExpr) : null),
    [cronExpr],
  );
  const upcomingFires = useMemo(() => {
    if (!parsedCron) return [];
    return nextFires(parsedCron, new Date(), 3);
  }, [parsedCron]);
  const cronInvalid = data.triggerType === 'schedule' && !!cronExpr && !parsedCron;

  const eventLabel =
    data.triggerType === 'document.finalize' ? 'On finalize' :
    data.triggerType === 'document.submit'   ? 'On submit for review' :
    data.triggerType === 'document.comment'  ? 'On comment added' : '';

  return (
    <NodeConfigShell>
      {/* Trigger type */}
      <ConfigField
        label="Trigger type"
        required
        controlId={`${uid}-trigger-type`}
        render={({ controlId, describedById }) => (
          <Select
            size="sm"
            id={controlId}
            aria-describedby={describedById}
            value={data.triggerType}
            onChange={(e) => onChange({ triggerType: e.target.value as TriggerType })}
            options={TRIGGER_TYPE_OPTIONS}
          />
        )}
      />

      {/* Document type (when document.*) */}
      {isDoc && (
        <ConfigField
          label="Document type"
          required
          error={docTypeMissing ? 'Select a document type.' : undefined}
          help={!docTypeMissing ? 'Which document type should trigger this pipeline.' : undefined}
          controlId={`${uid}-document-type`}
          render={({ controlId, describedById }) => (
            <>
              <Select
                size="sm"
                invalid={docTypeMissing}
                id={controlId}
                aria-describedby={describedById}
                value={data.documentTypeId ?? ''}
                onChange={(e) => onChange({ documentTypeId: e.target.value || undefined })}
                options={[
                  { value: '', label: '— select a document type —' },
                  ...docTypes.map((dt) => ({ value: dt.id, label: dt.name })),
                ]}
              />
              {eventLabel && (
                <div className="text-[11px] text-text-tertiary mt-1.5">
                  Event: <span className="font-semibold text-text-secondary">{eventLabel}</span>
                </div>
              )}
            </>
          )}
        />
      )}

      {/* Schedule (cron) */}
      {data.triggerType === 'schedule' && (
        <ConfigField
          label="Schedule (cron)"
          required
          error={
            scheduleMissing ? 'Cron expression is required.' :
            cronInvalid ? 'Invalid cron expression — supports *, */N, N,M, A-B, exact values.' :
            undefined
          }
          help={!scheduleMissing && !cronInvalid ? '5-field cron: minute hour day month weekday.' : undefined}
          controlId={`${uid}-schedule`}
          render={({ controlId, describedById }) => (
            <>
              <Input
                size="sm"
                mono
                spellCheck={false}
                invalid={scheduleMissing || cronInvalid}
                placeholder="*/15 * * * *"
                id={controlId}
                aria-describedby={describedById}
                value={data.schedule ?? ''}
                onChange={(e) => onChange({ schedule: e.target.value })}
              />
              <div className="mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono">
                {upcomingFires.length > 0 ? (
                  <>
                    <div className="text-text-secondary mb-1">
                      Next 3 fires:
                    </div>
                    {upcomingFires.map((d, i) => (
                      <div key={i}>{d.toLocaleString()}</div>
                    ))}
                  </>
                ) : (
                  <span>Next fires: enter a valid cron expression to preview.</span>
                )}
              </div>
            </>
          )}
        />
      )}

      {/* Webhook */}
      {data.triggerType === 'webhook' && (
        <div className="flex flex-col gap-3">
          <ConfigField
            label="Path"
            required
            error={
              webhookMissing ? 'Webhook path is required.' :
              webhookPathInvalid ? 'Path must be alphanumeric (plus _, -)' :
              undefined
            }
            help={!webhookMissing && !webhookPathInvalid ? 'Alphanumeric, _, or - (max 64 chars). No leading slash.' : undefined}
            controlId={`${uid}-webhook-path`}
            render={({ controlId, describedById }) => (
              <Input
                size="sm"
                mono
                spellCheck={false}
                invalid={webhookMissing || webhookPathInvalid}
                placeholder="weekly-digest"
                id={controlId}
                aria-describedby={describedById}
                value={webhookPathRaw}
                onChange={(e) => onChange({ webhookPath: e.target.value })}
              />
            )}
          />

          {/* Relay not declared → say so, and withhold every affordance that
              would have an integrator build against a dead endpoint. The path
              itself stays editable: it is real saved configuration and starts
              working the moment the host declares a relay. */}
          {!relayActive && (
            <Banner
              variant="warning"
              title="Endpoint not active."
              data-testid="webhook-relay-inactive"
            >
              This deployment has not declared an inbound webhook relay, so a
              POST to this path is accepted and starts no run. The path is
              still saved with the pipeline; the delivery URL and signing
              secret appear once the host wires the relay.
            </Banner>
          )}

          {/* Full URL preview / copy button */}
          {relayActive && (
          <div className="p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2">
            {webhookFullUrl ? (
              <>
                <span className="flex-1">
                  <span className="font-sans text-text-tertiary mr-1">Full URL:</span>
                  {webhookFullUrl}
                </span>
                <button
                  type="button"
                  onClick={onCopyWebhookUrl}
                  className="text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans"
                >
                  Copy
                </button>
              </>
            ) : (
              <span className="font-sans text-text-tertiary">
                Set a path above to see the URL
              </span>
            )}
          </div>
          )}

          {/* Webhook signing secret */}
          {relayActive && (
          <div>
            <label className="text-xs font-semibold text-text-secondary">Signing secret</label>
            <div className="mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2">
              {webhookSecret ? (
                <>
                  <span className="flex-1" aria-label="webhook secret">
                    {secretRevealed ? webhookSecret : '•'.repeat(32)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSecretRevealed((v) => !v)}
                    className="text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans"
                  >
                    {secretRevealed ? 'Hide' : 'Reveal'}
                  </button>
                  <button
                    type="button"
                    onClick={onCopyWebhookSecret}
                    className="text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans"
                  >
                    Copy
                  </button>
                </>
              ) : (
                <span className="font-sans text-text-tertiary">
                  Save the pipeline to mint a signing secret. External callers
                  must send <code>X-Pipeline-Signature-256: sha256=&lt;hmac&gt;</code>.
                </span>
              )}
            </div>
            <div className="text-[11px] text-text-tertiary mt-0.5">
              HMAC-SHA256 of the raw request body. Send as
              {' '}<code>X-Pipeline-Signature-256: sha256=&lt;hex&gt;</code>.
            </div>
          </div>
          )}
        </div>
      )}
    </NodeConfigShell>
  );
}
