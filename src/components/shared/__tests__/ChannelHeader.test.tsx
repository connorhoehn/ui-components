import { render, screen, fireEvent } from '@testing-library/react';
import { ChannelHeader } from '../ChannelHeader';

describe('ChannelHeader', () => {
  it('renders channel name', () => {
    render(<ChannelHeader name="general" />);
    expect(screen.getByText('general')).toBeInTheDocument();
  });

  it('renders member count', () => {
    render(<ChannelHeader name="general" memberCount={12} />);
    expect(screen.getByText('12 members')).toBeInTheDocument();
  });

  it('renders singular member label', () => {
    render(<ChannelHeader name="dm" memberCount={1} />);
    expect(screen.getByText('1 member')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ChannelHeader name="general" description="Company-wide updates" />);
    expect(screen.getByText('Company-wide updates')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    render(<ChannelHeader name="general" actions={<button>Settings</button>} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('calls onMembersClick when member count is clicked', () => {
    const onMembersClick = vi.fn();
    render(<ChannelHeader name="general" memberCount={5} onMembersClick={onMembersClick} />);
    fireEvent.click(screen.getByText('5 members'));
    expect(onMembersClick).toHaveBeenCalledTimes(1);
  });

  it('renders online status dot when online=true', () => {
    render(<ChannelHeader name="Alice" online />);
    expect(screen.getByLabelText('Online')).toBeInTheDocument();
  });

  it('renders offline status dot when online=false', () => {
    render(<ChannelHeader name="Alice" online={false} />);
    expect(screen.getByLabelText('Offline')).toBeInTheDocument();
  });

  it('does not render status dot when online is undefined', () => {
    render(<ChannelHeader name="Alice" />);
    expect(screen.queryByLabelText('Online')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Offline')).not.toBeInTheDocument();
  });

  it('renders avatarUrl image when provided', () => {
    render(<ChannelHeader name="Alice" avatarUrl="https://example.com/avatar.png" />);
    const img = screen.getByRole('img', { name: 'Alice' });
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png');
  });

  it('renders a <div> by default', () => {
    const { container } = render(<ChannelHeader name="general" data-testid="ch" />);
    expect(screen.getByTestId('ch').tagName).toBe('DIV');
    expect(container.querySelector('header')).toBeNull();
  });

  it('renders a <header> when as="header"', () => {
    render(<ChannelHeader name="general" as="header" data-testid="ch" />);
    expect(screen.getByTestId('ch').tagName).toBe('HEADER');
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});


// A fact about the channel is not a control.
//
// The member count rendered a DISABLED <button> whenever no handler was
// supplied, which a screen reader announces as "12 members, button, dimmed" —
// a broken control rather than a number. It is a number.
describe('ChannelHeader — the member count', () => {
  it('is static text when there is nowhere to go', () => {
    render(<ChannelHeader name="general" memberCount={12} />);
    expect(screen.getByTestId('channel-header-members').tagName).toBe('SPAN');
    expect(screen.queryByRole('button', { name: /member/i })).toBeNull();
  });

  it('is a button, named for what it opens, when there is', () => {
    render(<ChannelHeader name="general" memberCount={12} onMembersClick={() => {}} />);
    const el = screen.getByTestId('channel-header-members');
    expect(el.tagName).toBe('BUTTON');
    expect(el.getAttribute('aria-label')).toMatch(/^12 members —/);
  });

  it('reads the same either way', () => {
    const { unmount } = render(<ChannelHeader name="general" memberCount={1} />);
    expect(screen.getByTestId('channel-header-members')).toHaveTextContent('1 member');
    unmount();
    render(<ChannelHeader name="general" memberCount={1} onMembersClick={() => {}} />);
    expect(screen.getByTestId('channel-header-members')).toHaveTextContent('1 member');
  });
});

describe('ChannelHeader tab row', () => {
  it('never shrinks the tabs below their width at full size', () => {
    render(<ChannelHeader name="general" tabs={<span data-testid="t">Chat Documents Pinned Calls</span>} />);
    expect(screen.getByTestId('t').parentElement!.className).toContain('flex-[1_0_auto]');
  });
  it('keeps the shrinking row in the small variant', () => {
    render(<ChannelHeader name="general" size="sm" tabs={<span data-testid="t">Chat</span>} />);
    expect(screen.getByTestId('t').parentElement!.className).toContain('min-w-0');
  });
});
