import { act, render, screen, fireEvent, renderHook } from '@testing-library/react';
import { RecordingConsentNotice, useConsentDismissal } from '../RecordingConsentNotice';

describe('RecordingConsentNotice', () => {
  it('says who started it, links the policy, and dismisses', () => {
    const onDismiss = vi.fn();
    render(<RecordingConsentNotice open kind="both" startedBy="Rowan Ellery" privacyHref="https://example.test/privacy" onDismiss={onDismiss} />);
    const notice = screen.getByRole('status', { name: 'Recording and transcription' });
    expect(notice).toHaveTextContent('Started by Rowan Ellery. By attending this meeting, you agree to being included.');
    expect(screen.getByTestId('recording-consent-privacy')).toHaveAttribute('href', 'https://example.test/privacy');
    fireEvent.click(screen.getByTestId('recording-consent-dismiss'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('renders nothing when closed, and no name or link when not given', () => {
    const { rerender } = render(<RecordingConsentNotice open={false} kind="recording" onDismiss={() => {}} />);
    expect(screen.queryByTestId('recording-consent')).toBeNull();
    rerender(<RecordingConsentNotice open kind="transcription" onDismiss={() => {}} />);
    expect(screen.getByTestId('recording-consent')).toHaveTextContent(/^TranscriptionStarted\. By attending/);
    expect(screen.queryByTestId('recording-consent-privacy')).toBeNull();
  });
});

describe('useConsentDismissal', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.sessionStorage.clear();
    window.localStorage.clear();
  });

  function Card({ storageKey }: { storageKey: string | null }) {
    const consent = useConsentDismissal(storageKey);
    return <RecordingConsentNotice open={!!storageKey && !consent.dismissed} kind="recording" onDismiss={consent.dismiss} />;
  }

  it('a dismissal survives a remount (a reload) for the same recording, and a new recording asks again', () => {
    const first = render(<Card storageKey="m1:rec-1" />);
    fireEvent.click(screen.getByTestId('recording-consent-dismiss'));
    expect(screen.queryByTestId('recording-consent')).toBeNull();
    first.unmount();
    expect(window.sessionStorage.getItem('ui-components:consent-dismissed:m1:rec-1')).toBe('1');
    const again = render(<Card storageKey="m1:rec-1" />);
    expect(screen.queryByTestId('recording-consent')).toBeNull();
    again.rerender(<Card storageKey="m1:rec-2" />);
    expect(screen.getByTestId('recording-consent')).toBeInTheDocument();
  });

  it('a null key is never dismissed; reset forgets; local storage is opt-in', () => {
    const { result, rerender } = renderHook(({ k }: { k: string | null }) => useConsentDismissal(k, { storage: 'local' }), { initialProps: { k: null as string | null } });
    act(() => result.current.dismiss());
    expect(result.current.dismissed).toBe(false);
    rerender({ k: 'm2:rec-1' });
    act(() => result.current.dismiss());
    expect(result.current.dismissed).toBe(true);
    expect(window.localStorage.getItem('ui-components:consent-dismissed:m2:rec-1')).toBe('1');
    expect(window.sessionStorage.getItem('ui-components:consent-dismissed:m2:rec-1')).toBeNull();
    act(() => result.current.reset());
    expect(result.current.dismissed).toBe(false);
    expect(window.localStorage.getItem('ui-components:consent-dismissed:m2:rec-1')).toBeNull();
  });

  it('storage that throws (private mode, blocked site data) falls back to memory for the page', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('SecurityError'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('QuotaExceededError'); });
    const first = render(<Card storageKey="m3:rec-1" />);
    expect(screen.getByTestId('recording-consent')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('recording-consent-dismiss'));
    expect(screen.queryByTestId('recording-consent')).toBeNull();
    first.unmount();
    render(<Card storageKey="m3:rec-1" />);
    expect(screen.queryByTestId('recording-consent')).toBeNull();
  });
});

describe('RecordingConsentNotice custom wording and actions', () => {
  it('overrides title and sentence and runs both actions', () => {
    const onAcknowledge = vi.fn();
    const onSecondary = vi.fn();
    render(
      <RecordingConsentNotice
        open
        kind="transcription"
        onDismiss={() => {}}
        title="Nova is listening"
        description="Nova transcribes this call."
        acknowledgeLabel="Got it"
        onAcknowledge={onAcknowledge}
        secondaryLabel="Turn off"
        onSecondary={onSecondary}
      />,
    );
    const notice = screen.getByRole('status', { name: 'Nova is listening' });
    expect(notice).toHaveTextContent('Nova transcribes this call.');
    expect(notice).not.toHaveTextContent('By attending');
    fireEvent.click(screen.getByRole('button', { name: 'Got it' }));
    fireEvent.click(screen.getByRole('button', { name: 'Turn off' }));
    expect(onAcknowledge).toHaveBeenCalledTimes(1);
    expect(onSecondary).toHaveBeenCalledTimes(1);
  });

  it('puts the primary action before the dismiss control and does not take focus', () => {
    render(<RecordingConsentNotice open kind="both" onDismiss={() => {}} onAcknowledge={() => {}} acknowledgeLabel="OK" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.map((b) => b.getAttribute('data-testid'))).toEqual(['recording-consent-acknowledge', 'recording-consent-dismiss']);
    expect(document.activeElement).toBe(document.body);
  });

  it('shows no action buttons when none are given', () => {
    render(<RecordingConsentNotice open kind="both" onDismiss={() => {}} />);
    expect(screen.queryByTestId('recording-consent-acknowledge')).toBeNull();
    expect(screen.queryByTestId('recording-consent-secondary')).toBeNull();
  });

  it('carries actions on the line placement too', () => {
    const onAcknowledge = vi.fn();
    render(<RecordingConsentNotice open kind="both" placement="line" description="Heard by Nova" onDismiss={() => {}} onAcknowledge={onAcknowledge} acknowledgeLabel="OK" />);
    fireEvent.click(screen.getByTestId('recording-consent-acknowledge'));
    expect(onAcknowledge).toHaveBeenCalled();
  });
});

describe('RecordingConsentNotice placement="indicator" (2.529.0)', () => {
  it('is a focusable dot whose name and tooltip carry the whole sentence, with no line, close mark or actions', () => {
    render(<RecordingConsentNotice open kind="recording" placement="indicator" onDismiss={() => {}} onAcknowledge={() => {}} privacyHref="https://example.test/privacy" />);
    const wrap = screen.getByTestId('recording-consent');
    expect(wrap).toHaveAttribute('data-placement', 'indicator');
    const dot = screen.getByRole('img', { name: 'Recording. By attending you agree to be included.' });
    expect(dot).toHaveAttribute('tabindex', '0');
    expect(screen.queryByTestId('recording-consent-dismiss')).toBeNull();
    expect(screen.queryByTestId('recording-consent-acknowledge')).toBeNull();
    expect(screen.queryByTestId('recording-consent-privacy')).toBeNull();
    expect(wrap.querySelector('section')).toBeNull();
    act(() => { dot.focus(); });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Recording. By attending you agree to be included.');
  });

  it('announces the sentence once through a polite live region, after it first shows', () => {
    const { rerender } = render(<RecordingConsentNotice open kind="recording" placement="indicator" startedBy="Rowan Ellery" />);
    const region = screen.getByTestId('recording-consent-announce').querySelector('[aria-live]')!;
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(region.textContent).toBe('Recording, started by Rowan Ellery. By attending you agree to be included.');
    rerender(<RecordingConsentNotice open kind="recording" placement="indicator" startedBy="Someone Else" />);
    // Said once: a later prop change does not announce again.
    expect(region.textContent).toBe('Recording, started by Rowan Ellery. By attending you agree to be included.');
    expect(screen.getByRole('img')).toHaveAccessibleName('Recording, started by Someone Else. By attending you agree to be included.');
  });

  it('the default placement is unchanged: the banner with its close mark', () => {
    const onDismiss = vi.fn();
    render(<RecordingConsentNotice open kind="recording" onDismiss={onDismiss} />);
    expect(screen.getByTestId('recording-consent').tagName).toBe('SECTION');
    fireEvent.click(screen.getByTestId('recording-consent-dismiss'));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
