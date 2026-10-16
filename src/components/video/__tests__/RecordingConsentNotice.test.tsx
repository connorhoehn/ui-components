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
