import { render, screen, fireEvent } from '@testing-library/react';
import { CallPresenceIndicator } from '../CallPresenceIndicator';

const participants = [
  { userId: 'u-a', name: 'Alice Chen' },
  { userId: 'u-b', name: 'Bob Martinez' },
];

describe('CallPresenceIndicator', () => {
  it('renders nothing when nobody is on the call', () => {
    render(<CallPresenceIndicator participants={[]} />);
    expect(screen.queryByTestId('call-presence-indicator')).toBeNull();
  });

  it('shows the participant count', () => {
    render(<CallPresenceIndicator participants={participants} />);
    expect(screen.getByTestId('call-presence-count')).toHaveTextContent('2');
    expect(screen.getByTestId('call-presence-indicator')).toHaveAttribute('data-participant-count', '2');
  });

  it('an explicit count overrides the number of resolved names', () => {
    render(<CallPresenceIndicator participants={participants} count={5} />);
    expect(screen.getByTestId('call-presence-count')).toHaveTextContent('5');
  });

  it('becomes a button when clickable', () => {
    const onClick = vi.fn();
    render(<CallPresenceIndicator participants={participants} onClick={onClick} label="global-hangout" />);
    const el = screen.getByTestId('call-presence-indicator');
    expect(el.tagName).toBe('BUTTON');
    fireEvent.click(el);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
