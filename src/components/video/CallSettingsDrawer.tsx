// ui-components/src/components/video/CallSettingsDrawer.tsx
//
// "Call settings": a docked, non-modal drawer in the page's right column
// with three tabs — Audio & video, Effects, Captions. The tab bodies are the
// host's (AudioVideoSettingsForm, the effects preview in its surface
// variant, the captions toggle); the drawer owns the tabs and the footer:
//
//   Audio & video / Captions   "Devices update immediately" · Done
//   Effects                    "2 changes" · Cancel · Apply
//
// Device changes apply on the spot, so the first footer has no Cancel; an
// effect is auditioned privately and only reaches the call on Apply.

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Drawer from '../shared/Drawer';
import { Tabs } from '../shared/Tabs';
import { Button } from '../ui/Button';
import Switch from '../shared/Switch';
import { Select } from '../forms/Select';

export type CallSettingsDrawerTab = 'audio-video' | 'effects' | 'captions';

export interface CallSettingsEffectsFooter {
  /** Settings the open preview changes. 0 disables Apply. */
  changeCount: number;
  onCancel: () => void;
  onApply: () => void;
  applying?: boolean;
}

export interface CallSettingsDrawerProps {
  open: boolean;
  onClose: () => void;
  /** The tab shown when the drawer opens. Default `audio-video`. */
  initialTab?: CallSettingsDrawerTab;
  /** Controlled tab (optional). */
  tab?: CallSettingsDrawerTab;
  onTabChange?: (tab: CallSettingsDrawerTab) => void;
  /** Docked in the page column (default) or floating over it (the incoming-call gear). */
  docked?: boolean;
  audioVideo: ReactNode;
  effects: ReactNode;
  captions: ReactNode;
  /** The Effects tab's footer. Without it the Effects tab shows the Done footer. */
  effectsFooter?: CallSettingsEffectsFooter;
  /** Floating width in px. Docked, the drawer fills its column. */
  width?: number;
  className?: string;
  'data-testid'?: string;
}

const TABS: { id: CallSettingsDrawerTab; label: string }[] = [
  { id: 'audio-video', label: 'Audio & video' },
  { id: 'effects', label: 'Effects' },
  { id: 'captions', label: 'Captions' },
];

export function CallSettingsDrawer({
  open,
  onClose,
  initialTab = 'audio-video',
  tab: tabProp,
  onTabChange,
  docked = true,
  audioVideo,
  effects,
  captions,
  effectsFooter,
  width = 380,
  className,
  'data-testid': testId = 'call-settings-drawer',
}: CallSettingsDrawerProps) {
  const [tabState, setTabState] = useState<CallSettingsDrawerTab>(initialTab);
  useEffect(() => {
    if (open) setTabState(initialTab);
  }, [open, initialTab]);
  const tab = tabProp ?? tabState;
  const selectTab = (t: CallSettingsDrawerTab) => {
    setTabState(t);
    onTabChange?.(t);
  };

  const effectsTab = tab === 'effects' && effectsFooter;
  const footer = effectsTab ? (
    <div className="flex items-center gap-3">
      <span className="mr-auto text-sm text-text-tertiary" data-testid="effects-changes">
        {effectsFooter.changeCount === 0
          ? 'No changes'
          : `${effectsFooter.changeCount} ${effectsFooter.changeCount === 1 ? 'change' : 'changes'}`}
      </span>
      <Button variant="ghost" onClick={effectsFooter.onCancel} data-testid="effects-cancel" className="font-medium">
        Cancel
      </Button>
      <Button
        onClick={effectsFooter.onApply}
        disabled={effectsFooter.changeCount === 0 || effectsFooter.applying}
        data-testid="effects-apply"
      >
        Apply
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <span className="mr-auto text-xs text-text-tertiary">Devices update immediately</span>
      <Button onClick={onClose} data-testid="settings-done">
        Done
      </Button>
    </div>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Call settings"
      docked={docked}
      modal={false}
      backdrop={false}
      trapFocus={false}
      {...(docked ? {} : { width })}
      footer={footer}
      className={cn(className)}
      headerClassName="border-b-0 px-5 pb-2 pt-5"
      titleClassName="text-xl"
      bodyClassName="flex flex-col p-0"
      footerClassName="bg-surface px-5 py-3.5"
      closeTestId={`${testId}-close`}
      data-testid={testId}
    >
      <div className="shrink-0 px-5">
        <Tabs
          items={TABS.map((t) => ({ id: t.id, label: t.label, testId: `call-settings-tab-${t.id}` }))}
          value={tab}
          onValueChange={(id) => selectTab(id as CallSettingsDrawerTab)}
          variant="underline"
          aria-label="Call settings"
          getItemTestId={(item) => `call-settings-tab-${item.id}`}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-3.5 pb-2" data-testid={`${testId}-body`} data-tab={tab}>
        {tab === 'audio-video' && audioVideo}
        {tab === 'effects' && effects}
        {tab === 'captions' && captions}
      </div>
    </Drawer>
  );
}

export interface CallCaptionsSettingsProps {
  enabled: boolean;
  onEnabledChange: (on: boolean) => void;
  language: string;
  onLanguageChange?: (language: string) => void;
  /** Default: English only. */
  languages?: { value: string; label: string }[];
  className?: string;
}

/** The Captions tab body: the live-captions switch and the language. */
export function CallCaptionsSettings({
  enabled,
  onEnabledChange,
  language,
  onLanguageChange,
  languages = [{ value: 'en', label: 'English' }],
  className,
}: CallCaptionsSettingsProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)} data-testid="settings-captions">
      <div className="flex items-center justify-between gap-3">
        <span id="settings-captions-label" className="text-sm text-text-primary">
          Show live captions
        </span>
        <Switch
          checked={enabled}
          onChange={onEnabledChange}
          aria-labelledby="settings-captions-label"
          data-testid="settings-captions-toggle"
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor="settings-captions-language" className="text-sm text-text-primary">
          Language
        </label>
        <Select
          id="settings-captions-language"
          value={language}
          onChange={(e) => onLanguageChange?.(e.target.value)}
          disabled={languages.length < 2 || !onLanguageChange}
          options={languages}
          className="h-9 w-40 text-sm"
          data-testid="settings-captions-language"
        />
      </div>
    </div>
  );
}

export default CallSettingsDrawer;
