import { describe, it, expect, vi, afterEach } from 'vitest';
import { useRef } from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { IncomingCallPopover } from '../IncomingCallPopover';
import MediaEffectsPreviewPanel from '../MediaEffectsPreviewPanel';
import { splitEffectLabel } from '../MediaEffectsTray';
import { WrappedMediaEffectsPreviewPanel } from '../../../integrations/realtime-modules/WrappedMediaEffectsPreviewPanel';
import { ContextColumn, CONTEXT_COLUMN_INSET_VAR } from '../../layout/ContextColumn';
import { ToastProvider } from '../../shared/ToastProvider';

afterEach(cleanup);
const noop = () => {};

function Popover({ initialFocus }: { initialFocus?: 'join' | 'close' }) {
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <button ref={ref} type="button">Call</button>
      <IncomingCallPopover
        open
        anchorRef={ref}
        caller={{ name: 'Connor Hoehn' }}
        title="Auth architecture review"
        documents={[{ id: 'a', title: 'Auth architecture' }]}
        onOpenDocument={noop}
        participants={[]}
        participantCount={1}
        mic={{ on: true, onToggle: noop, devices: [], onSelectDevice: noop, permission: 'granted' }}
        camera={{ on: false, onToggle: noop, devices: [], onSelectDevice: noop, permission: 'granted' }}
        onOpenSettings={noop}
        onJoin={noop}
        onDecline={noop}
        onDismiss={noop}
        {...(initialFocus ? { initialFocus } : {})}
      />
    </>
  );
}

describe('A-9 IncomingCallPopover initialFocus', () => {
  it('focuses Join call by default', async () => {
    render(<Popover />);
    await waitFor(() => expect(document.activeElement).toBe(screen.getByTestId('incoming-call-join')));
  });
  it('leaves focus on the × with initialFocus="close"', async () => {
    render(<Popover initialFocus="close" />);
    await waitFor(() => expect(document.activeElement).toBe(screen.getByTestId('incoming-call-close')));
  });
});

describe('A-8 face effects row', () => {
  it('splits RM emoji labels into glyph and caption', () => {
    expect(splitEffectLabel('🕶️ Sunglasses')).toEqual({ glyph: '🕶️', text: 'Sunglasses' });
    expect(splitEffectLabel('🐶 Dog Ears')).toEqual({ glyph: '🐶', text: 'Dog ears' });
    expect(splitEffectLabel('Plain')).toEqual({ glyph: null, text: 'Plain' });
  });

  it('the surface panel, fed by the controller, draws Sunglasses · Dog ears · More under the select', () => {
    const controller = {
      filterId: 'none', backgroundMode: 'none' as const, backgroundImageUrl: null, faceSpriteId: null,
      filters: [{ id: 'none', label: 'None' }], backgrounds: [],
      faceSprites: [
        { id: 'sunglasses', label: '🕶️ Sunglasses' },
        { id: 'dog-ears', label: '🐶 Dog Ears' },
        { id: 'disguise', label: '🥸 Disguise' },
        { id: 'crown', label: '👑 Crown' },
      ],
      setFilter: noop, setBackgroundMode: noop, setBackgroundImageUrl: noop, setFaceSpriteId: noop,
      draft: { filterId: 'none', backgroundMode: 'none' as const, backgroundImageUrl: null, faceSpriteId: null },
      isDirty: false, previewTrack: null, beginPreview: noop, applyPreview: noop, cancelPreview: noop,
    };
    render(<WrappedMediaEffectsPreviewPanel open controller={controller} onClose={noop} variant="surface" showFooter={false} />);
    expect(screen.getByTestId('effects-face-select')).toBeTruthy();
    expect(screen.getByTestId('effects-face-sunglasses').textContent).toContain('Sunglasses');
    expect(screen.getByTestId('effects-face-dog-ears').textContent).toContain('Dog ears');
    expect(screen.getByTestId('effects-face-more').textContent).toContain('More');
    expect(screen.queryByTestId('effects-face-crown')).toBeNull();
  });

  it('panel prop surface still works directly', () => {
    render(
      <MediaEffectsPreviewPanel variant="surface" showFooter={false} previewActive previewStream={null} isDirty={false}
        onApply={noop} onCancel={noop} filters={[]} activeFilterId="none" onSelectFilter={noop} backgrounds={[]}
        backgroundMode="none" activeBackgroundUrl={null} onSelectBackground={noop}
        faceSprites={[{ id: 's', label: '🕶️ Sunglasses' }]} activeFaceSpriteId={null} onSelectFaceSprite={noop} />,
    );
    expect(screen.getByTestId('effects-face-s')).toBeTruthy();
  });
});

describe('A-11 overlays stay clear of an open ContextColumn', () => {
  it('publishes the open column width and clears it when collapsed', () => {
    const panels = [{ id: 'p', label: 'Call settings', icon: <span />, chrome: 'bare' as const, width: 'drawer' as const, content: <p>x</p> }];
    const spy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 380 } as DOMRect);
    const { rerender } = render(<ContextColumn state="open" onStateChange={noop} panels={panels} activeId="p" onActivate={noop} />);
    expect(document.documentElement.style.getPropertyValue(CONTEXT_COLUMN_INSET_VAR)).toBe('380px');
    rerender(<ContextColumn state="collapsed" onStateChange={noop} panels={panels} activeId="p" onActivate={noop} />);
    expect(document.documentElement.style.getPropertyValue(CONTEXT_COLUMN_INSET_VAR)).toBe('');
    spy.mockRestore();
  });

  it('the toast stack offsets by that width', () => {
    render(<ToastProvider><p>app</p></ToastProvider>);
    expect(screen.getByTestId('toast-stack').className).toContain('right-[calc(1rem+var(--uic-context-column-inset,0px))]');
  });
});
