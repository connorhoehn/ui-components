import { type ReactNode, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ActivityIcon, ChevronIcon, CloseIcon, EyeIcon, EyeOffIcon, GripIcon, HistoryIcon, SlidersIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { Checkbox } from '../forms/Checkbox';
import { InlinePopover } from './InlinePopover';
import { Stack } from '../ui/Stack';
import { T } from './Text';
import { Tooltip } from './Tooltip';
import { PauseIcon, PlayIcon } from '../video/MediaIcons';
import { readActivityTickerPreferences, activityTickerRotationAllowed, type ActivityTickerPreferences } from './activityTickerModel';
import './activityTicker.css';
export type { ActivityTickerPreferences } from './activityTickerModel';
export interface ActivityTickerItem { category: string; label: string; summary: string; detail: ReactNode; icon?: ReactNode }
export interface ActivityTickerProps {
  items: readonly ActivityTickerItem[];
  categories: readonly { id: string; label: string }[];
  /** Explicitly label host-supplied demonstration data. */
  sample?: boolean;
  /** The host owns the two dock locations; the grip also moves by keyboard click. */
  placement?: 'header' | 'footer';
  onPlacementChange?: (placement: 'header' | 'footer') => void;
  onMoveStart?: () => void;
  onMoveEnd?: () => void;
  activeCall?: boolean;
  /** Scope this key to the current identity/context; null never reads shared storage. */
  preferencesKey?: string | null;
  preferences?: ActivityTickerPreferences;
  onPreferencesChange?: (preferences: ActivityTickerPreferences) => void;
  preferencesHint?: ReactNode;
  renderActions?: (item: ActivityTickerItem | undefined, close: () => void) => ReactNode;
  'data-testid'?: string;
}
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query), update = () => setMatches(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}
function load(key: string | null, categories: readonly string[]) {
  try { return readActivityTickerPreferences(key ? localStorage.getItem(key) : null, categories); }
  catch { return readActivityTickerPreferences(null, categories); }
}

/** Data and authority belong to the host; this component only presents supplied items. */
export function ActivityTicker(props: ActivityTickerProps) {
  return <Ticker key={props.preferencesKey ?? 'unpersisted'} {...props} />;
}

function Ticker({ items, categories, placement = 'footer', onPlacementChange, onMoveStart, onMoveEnd, sample = false, activeCall = false, preferencesKey: storageKey = null,
  preferences, onPreferencesChange, preferencesHint, renderActions, 'data-testid': testId = 'activity-ticker' }: ActivityTickerProps) {
  const categoryIds = categories.map(category => category.id);
  const [localPrefs, setPrefs] = useState<ActivityTickerPreferences>(() => load(storageKey, categoryIds));
  const prefs = preferences ?? localPrefs;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false), [focused, setFocused] = useState(false);
  const [panel, setPanel] = useState<'detail' | 'settings' | null>(null);
  const [pageVisible, setPageVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  const root = useRef<HTMLDivElement>(null), trigger = useRef<HTMLButtonElement>(null), toolbar = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const restore = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef(false);
  const [anchor, setAnchor] = useState<{ left: number; bottom?: number; top?: number } | null>(null);
  const hint = useId();
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const compact = useMediaQuery('(max-width: 1100px)') || activeCall;
  const samples = items.filter(sample => prefs.categories.includes(sample.category));
  const current = samples[index % Math.max(samples.length, 1)];
  const engaged = hovered || focused || panel !== null;
  const sampleWord = sample ? 'sample ' : '';
  const titlePrefix = sample ? 'Sample ' : '';
  useEffect(() => {
    if (!storageKey || preferences) return;
    try { localStorage.setItem(storageKey, JSON.stringify(prefs)); } catch { /* Private mode keeps local controls usable. */ }
  }, [storageKey, prefs, preferences]);
  useEffect(() => {
    const update = () => setPageVisible(typeof document === 'undefined' || !document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  const rotating = !prefs.hidden && activityTickerRotationAllowed({ paused: prefs.paused, quiet: prefs.quiet, engaged, reducedMotion, pageVisible, activeCall, count: samples.length });
  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => setIndex(value => value + 1), prefs.speed === 'fast' ? 6000 : 12000);
    return () => clearInterval(timer);
  }, [rotating, prefs.speed]);
  useEffect(() => () => clearTimeout(leaveTimer.current), []);
  useLayoutEffect(() => {
    if (!engaged || prefs.hidden) { setAnchor(null); return; }
    const position = () => {
      const rect = trigger.current?.getBoundingClientRect();
      if (rect) setAnchor({ left: Math.max(8, Math.min(rect.left, window.innerWidth - 220)), ...(rect.top >= 48 ? { bottom: window.innerHeight - rect.top } : { top: rect.bottom }) });
    };
    position(); window.addEventListener('resize', position); window.addEventListener('scroll', position, true);
    return () => { window.removeEventListener('resize', position); window.removeEventListener('scroll', position, true); };
  }, [engaged, prefs.hidden, compact]);
  function enter() { clearTimeout(leaveTimer.current); setHovered(true); }
  function leave() { clearTimeout(leaveTimer.current); leaveTimer.current = setTimeout(() => setHovered(false), 150); }
  function blur(next: EventTarget | null) {
    setFocused(next instanceof Node && (!!root.current?.contains(next) || !!toolbar.current?.contains(next)));
  }
  function update(next: Partial<ActivityTickerPreferences>) { const value = { ...prefs, ...next }; setPrefs(value); onPreferencesChange?.(value); }
  useLayoutEffect(() => {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    (prefs.hidden ? restore.current : trigger.current)?.focus();
  }, [prefs.hidden]);
  function hide() { pendingFocus.current = true; update({ hidden: true }); setPanel(null); setHovered(false); setFocused(false); }

  return <div ref={root} className="activity-ticker" data-compact={compact || undefined} data-call={activeCall || undefined} data-hidden={prefs.hidden || undefined} data-testid={testId} data-placement={placement}
    onMouseEnter={enter} onMouseLeave={leave} onFocusCapture={() => setFocused(true)} onBlurCapture={event => blur(event.relatedTarget)}>
    {onPlacementChange && <Tooltip content={`Drag Today to the ${placement === 'footer' ? 'header' : 'footer'}, or click to move it`}>
      <IconButton size="sm" variant="ghost" icon={<GripIcon size={14} />} className="shrink-0 cursor-grab active:cursor-grabbing"
        aria-label={`Move Today strip to ${placement === 'footer' ? 'header' : 'footer'}`} draggable
        onDragStart={event => { event.dataTransfer.setData('text/x-activity-ticker', 'today'); event.dataTransfer.effectAllowed = 'move'; onMoveStart?.(); }}
        onDragEnd={onMoveEnd} onClick={() => onPlacementChange(placement === 'footer' ? 'header' : 'footer')}
        data-testid={`${testId}-move`} />
    </Tooltip>}
    {prefs.hidden ? <Tooltip content={`Restore ${sampleWord}Today strip`}><IconButton ref={restore} aria-label={`Restore ${sampleWord}Today strip`} size="sm" icon={<EyeIcon size={14} />} onClick={() => { pendingFocus.current = true; update({ hidden: false }); }} /></Tooltip>
      : <Button ref={trigger} variant="ghost" size="sm" className="activity-ticker-summary" data-dimmed={prefs.dimmed || undefined}
        aria-label={current ? `${sample ? 'Demo today' : 'Today'}: ${current.label}. ${current.summary}` : `${sample ? 'Demo today: no sample' : 'Today: no'} categories selected`}
        aria-describedby={hint} aria-haspopup="dialog" aria-expanded={panel === 'detail'}
        onClick={() => setPanel(value => value === 'detail' ? null : 'detail')}
        onKeyDown={event => { if (event.key === 'ArrowUp') { event.preventDefault(); toolbar.current?.querySelector<HTMLButtonElement>('button')?.focus(); } }}>
        <span aria-hidden="true">{current?.icon ?? <ActivityIcon size={14} />}</span>{sample && <span className="activity-ticker-demo">Demo</span>}
        <span className="activity-ticker-copy">{current ? <><strong>{current.label}</strong><span className="activity-ticker-description"> · {current.summary}</span></> : 'Today · No categories selected'}</span>
      </Button>}
    <span id={hint} className="sr-only">{sample ? 'Sample content. ' : ''}Arrow Up opens the controls. Automatic rotation pauses while focused.</span>
    {anchor && !prefs.hidden && createPortal(<div ref={toolbar} role="toolbar" aria-label={`${titlePrefix}Today controls`} className="activity-ticker-toolbar"
      style={{ left: anchor.left, bottom: anchor.bottom, top: anchor.top }} onMouseEnter={enter} onMouseLeave={leave}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => blur(event.relatedTarget)}>
      <Tooltip content="Hide this strip"><IconButton aria-label={`Hide ${sampleWord}Today strip`} size="sm" icon={<EyeOffIcon size={14} />} onClick={hide} /></Tooltip>
      <Tooltip content={prefs.dimmed ? 'Restore brightness' : 'Dim this strip'}><IconButton aria-label={`Dim ${sampleWord}Today strip`} aria-pressed={prefs.dimmed} size="sm" icon={<EyeIcon size={14} />} onClick={() => update({ dimmed: !prefs.dimmed })} /></Tooltip>
      <Tooltip content={prefs.speed === 'slow' ? 'Slow · every 12 seconds' : 'Fast · every 6 seconds'}><IconButton aria-label={`Rotation speed: ${prefs.speed}`} size="sm" icon={<HistoryIcon size={14} />} onClick={() => update({ speed: prefs.speed === 'slow' ? 'fast' : 'slow' })} /></Tooltip>
      <Tooltip content={prefs.paused ? `Resume ${sampleWord}rotation` : `Pause ${sampleWord}rotation`}><IconButton size="sm" aria-label={prefs.paused ? `Resume ${sampleWord}rotation` : `Pause ${sampleWord}rotation`} aria-pressed={prefs.paused} icon={prefs.paused ? <PlayIcon size={14} /> : <PauseIcon size={14} />} onClick={() => update({ paused: !prefs.paused })} /></Tooltip>
      <Tooltip content={sample ? 'Next sample' : 'Next item'}><IconButton aria-label={sample ? 'Next sample' : 'Next item'} size="sm" disabled={samples.length < 2} icon={<ChevronIcon dir="right" size={14} />} onClick={() => setIndex(value => value + 1)} /></Tooltip>
      <Tooltip content={`${titlePrefix}Today settings`}><IconButton aria-label={`${titlePrefix}Today settings`} size="sm" aria-haspopup="dialog" aria-expanded={panel === 'settings'} icon={<SlidersIcon size={14} />} onClick={() => setPanel(value => value === 'settings' ? null : 'settings')} /></Tooltip>
    </div>, document.body)}
    <InlinePopover trigger={trigger} open={panel !== null} onClose={() => setPanel(null)} placement="bottom-start" aria-label={`${titlePrefix}Today ${panel === 'settings' ? 'settings' : 'details'}`} className="activity-ticker-panel">
      <Stack gap="sm">
        <div className="activity-ticker-panel-heading"><T size="sm" weight="semibold">{panel === 'settings' ? 'Today preferences' : current?.label ?? 'Today'}</T>
          <IconButton aria-label="Close Today panel" size="sm" icon={<CloseIcon size={14} />} onClick={() => setPanel(null)} /></div>
        {sample && <T size="xs" tone="secondary">Demo · Sample content only. No live activity is connected.</T>}
        {panel === 'settings' ? <>
          <T size="xs" weight="semibold">Categories</T>
          {categories.map(category => <label className="activity-ticker-option" key={category.id}><Checkbox checked={prefs.categories.includes(category.id)} onChange={checked => {
            update({ categories: categoryIds.filter(value => value === category.id ? checked : prefs.categories.includes(value)) }); setIndex(0);
          }} />{category.label}</label>)}
          <label className="activity-ticker-option"><Checkbox checked={prefs.quiet} onChange={quiet => update({ quiet })} />Quiet rotation · manual only</label>
          <T size="xs" tone="secondary">{reducedMotion ? `Reduced motion is on. Use ${sample ? 'Next sample' : 'Next item'} to rotate manually.` : 'Rotation pauses on hover, focus, during a huddle, and while a panel is open.'}</T>
          <T size="xs" tone="secondary">{preferencesHint ?? (storageKey ? 'Preferences saved on this browser.' : 'Preferences are not saved.')}</T>
        </> : <>
          <T size="sm">{current?.detail ?? 'Choose a category in Today settings to show items.'}</T>
          {renderActions?.(current, () => setPanel(null))}
        </>}
      </Stack>
    </InlinePopover>
  </div>;
}
