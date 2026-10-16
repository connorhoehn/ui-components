import { render, screen, fireEvent } from '@testing-library/react';
import { RecordingConsentNotice } from '../RecordingConsentNotice';

describe('RecordingConsentNotice', () => {
  it('says who started it, links the policy, and dismisses', () => {
    const onDismiss = vi.fn();
    render(<RecordingConsentNotice open kind="both" startedBy="Digisha Jain" privacyHref="https://example.test/privacy" onDismiss={onDismiss} />);
    const notice = screen.getByRole('status', { name: 'Recording and transcription' });
    expect(notice).toHaveTextContent('Started by Digisha Jain. By attending this meeting, you agree to being included.');
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
