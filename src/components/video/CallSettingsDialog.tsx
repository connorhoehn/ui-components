// CallSettingsDialog — centered in-call settings modal with a split
// layout: live self-preview on the left, a tabbed panel ("Effects" /
// "People") on the right.
//
// Why it exists: camera effects used to live in a floating tray anchored
// over the small docked call widget, which gave the pickers no room and
// left "add people" stranded in a separate dialog. This surface gives
// both jobs real estate in one place, over the same dark chrome the call
// widget uses.
//
// Purely presentational. The tab bodies are SLOTS — the consumer passes
// `effectsContent` (typically a <MediaEffectsTray/> wired to its effects
// engine) and `peopleContent` (typically an <InviteCandidateList/> wired
// to its roster). No realtime hooks are imported here, so the dialog
// stays transport-agnostic. A missing slot hides its tab entirely.
//
// Composition: shared <Modal> (portal, focus trap, Escape + backdrop
// close — identical behavior to InviteToCallDialog / ResumeCallDialog)
// restyled onto the inverse surface via `cardClassName`, plus
// <StreamVideo> for the srcObject wiring of the self-preview.

import { useEffect, useState, type ReactNode } from 'react';

import { cn } from '../../lib/cn';
import Modal from '../shared/Modal';
import { StreamVideo } from './StreamVideo';

export type CallSettingsTab = 'devices' | 'effects' | 'people' | 'chat';

export interface CallSettingsDialogProps {
  open: boolean;
  /** Backdrop click, Escape and the ✕ button all fire this. */
  onClose: () => void;

  /** Live self-preview stream — rendered muted, mirrored, autoplaying.
   *  Pass null for the "Camera off" empty state. */
  previewStream: MediaStream | null;

  /** Tab shown each time the dialog opens. Ignored (falls back to the
   *  first available tab) when that tab's slot is missing. */
  initialTab?: CallSettingsTab;

  /** "Devices" tab body — e.g. a <DeviceSettingsPanel/> wired to the
   *  consumer's device preferences. Omit to hide the tab. */
  devicesContent?: ReactNode;
  /** "Effects" tab body — e.g. a <MediaEffectsTray/> wired to the
   *  consumer's effects engine. Omit to hide the tab. */
  effectsContent?: ReactNode;
  /** "People" tab body — e.g. an <InviteCandidateList/> wired to the
   *  consumer's roster + invite call. Omit to hide the tab. */
  peopleContent?: ReactNode;
  /** "Chat" tab body — e.g. a chat panel wired to the call's channel.
   *  Omit to hide the tab. */
  chatContent?: ReactNode;

  /**
   * Show the small live self-preview on the left. Default true.
   *
   * Pass false when the tab body brings its own (larger) preview — which
   * is exactly what <MediaEffectsPreviewPanel> does. Two self-views side
   * by side, one live and one draft, is the confusing arrangement the
   * preview-before-publish work exists to remove.
   */
  showPreview?: boolean;

  /** Dialog heading. Defaults to "Call settings". */
  title?: string;
  className?: string;
}

const TAB_LABELS: Record<CallSettingsTab, string> = {
  devices: 'Devices',
  effects: 'Effects',
  people: 'People',
  chat: 'Chat',
};

export function CallSettingsDialog({
  open,
  onClose,
  previewStream,
  initialTab = 'effects',
  devicesContent,
  effectsContent,
  peopleContent,
  chatContent,
  showPreview = true,
  title = 'Call settings',
  className,
}: CallSettingsDialogProps) {
  // A tab only exists when its slot was provided.
  const available: CallSettingsTab[] = [
    ...(devicesContent != null ? (['devices'] as const) : []),
    ...(effectsContent != null ? (['effects'] as const) : []),
    ...(peopleContent != null ? (['people'] as const) : []),
    ...(chatContent != null ? (['chat'] as const) : []),
  ];

  const [tab, setTab] = useState<CallSettingsTab>(initialTab);

  // Re-seed the active tab each open so a previous visit's tab choice
  // doesn't leak into the next one.
  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  // Clamp to an available tab (initialTab may point at a missing slot).
  const activeTab: CallSettingsTab | null = available.includes(tab)
    ? tab
    : available[0] ?? null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={title}
      maxWidth={768}
      rawChildren
      backdropTestId="call-settings-backdrop"
      // Theme-invariant call chrome — see --color-call-chrome in styles.css.
      cardClassName="max-w-4xl bg-call-chrome text-white border border-call-chrome-border p-0 overflow-hidden"
    >
      <div
        data-testid="call-settings-dialog"
        className={cn('flex flex-col', className)}
      >
        <header className="flex items-center justify-between gap-3 border-b border-call-chrome-border px-4 py-3">
          <h2 className="m-0 text-sm font-semibold text-white">{title}</h2>
          <button
            data-ui-part=""
            type="button"
            aria-label="Close"
            onClick={onClose}
            data-testid="call-settings-close"
            className="grid h-7 w-7 cursor-pointer place-items-center rounded text-lg leading-none text-white/70 hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </header>

        {/* Split body: preview | tabs. Stacks vertically under 640px. */}
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          {/* ── Left: live self-preview ─────────────────────────────── */}
          {showPreview && (
          <div
            data-testid="call-settings-preview"
            className={cn(
              'relative shrink-0 overflow-hidden bg-video-stage',
              // ~16:9 floor; on desktop the pane takes just over half the card.
              // Wrapping chip sections need the width more than the
              // preview does — 44% keeps the preview generous while every
              // effect option fits without clipping.
              'aspect-video w-full sm:aspect-auto sm:min-h-[320px] sm:w-[44%]',
            )}
          >
            {previewStream ? (
              <>
                <StreamVideo
                  stream={previewStream}
                  muted
                  className="h-full w-full scale-x-[-1] object-cover"
                />
                <span
                  className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white"
                  data-testid="call-settings-preview-label"
                >
                  You
                </span>
              </>
            ) : (
              <div
                data-testid="call-settings-preview-empty"
                className="flex h-full w-full flex-col items-center justify-center gap-1 text-sm text-white/50"
              >
                <span aria-hidden className="text-2xl">📷</span>
                Camera off
              </div>
            )}
          </div>
          )}

          {/* ── Right: tab rail + slot content ──────────────────────── */}
          <div className="flex min-w-0 flex-1 flex-col">
            {available.length > 0 && (
              <div
                role="tablist"
                aria-label="Call settings sections"
                className="flex items-center gap-1 border-b border-call-chrome-border px-3 pt-2"
              >
                {available.map((t) => (
                  <button
                    data-ui-part=""
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={t === activeTab}
                    onClick={() => setTab(t)}
                    data-testid={`call-settings-tab-${t}`}
                    className={cn(
                      'cursor-pointer rounded-t-md border-b-2 px-3 py-1.5 text-[13px] font-medium transition-colors',
                      t === activeTab
                        ? 'border-call-chrome-accent text-white'
                        : 'border-transparent text-white/60 hover:bg-white/5 hover:text-white/90',
                    )}
                  >
                    {TAB_LABELS[t]}
                  </button>
                ))}
              </div>
            )}
            <div
              role="tabpanel"
              data-testid="call-settings-panel"
              className="min-h-0 flex-1 overflow-y-auto p-4 sm:max-h-[460px]"
            >
              {activeTab === 'devices' ? devicesContent : null}
              {activeTab === 'effects' ? effectsContent : null}
              {activeTab === 'people' ? peopleContent : null}
              {activeTab === 'chat' ? chatContent : null}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CallSettingsDialog;
