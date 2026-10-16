import { render, screen, fireEvent, within } from '@testing-library/react';
import { MeetingToolbar, deviceMenuSections, type MeetingToolbarItem } from '../MeetingToolbar';
import { MeetingHandIcon, MeetingRoomsIcon, MeetingViewIcon } from '../MeetingIcons';
import { UsersIcon, VideoOffIcon } from '../MediaIcons';

function items(over: Partial<Record<string, Partial<MeetingToolbarItem>>> = {}): MeetingToolbarItem[] {
  return [
    { id: 'people', label: 'People', icon: <UsersIcon />, count: 15, onClick: vi.fn(), ...over.people },
    { id: 'raise', label: 'Raise', icon: <MeetingHandIcon />, pressed: false, onClick: vi.fn(), ...over.raise },
    { id: 'view', label: 'View', icon: <MeetingViewIcon />, priority: 'secondary', onClick: vi.fn(), ...over.view },
    { id: 'rooms', label: 'Rooms', icon: <MeetingRoomsIcon />, active: true, onClick: vi.fn(), ...over.rooms },
  ];
}

describe('MeetingToolbar', () => {
  it('renders labelled buttons with a People count, pressed and active states', () => {
    render(<MeetingToolbar items={items()} onLeave={() => {}} compact={false} />);
    expect(screen.getByRole('toolbar', { name: 'Meeting controls' })).toBeInTheDocument();
    const people = screen.getByTestId('meeting-toolbar-people');
    expect(people).toHaveAccessibleName('People, 15');
    expect(screen.getByTestId('meeting-toolbar-people-count')).toHaveTextContent('15');
    expect(screen.getByTestId('meeting-toolbar-raise')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('meeting-toolbar-rooms')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('meeting-toolbar-rooms-active')).toBeInTheDocument();
    expect(screen.getByTestId('meeting-toolbar-view')).toBeInTheDocument();
  });

  it('fires onClick and onLeave', () => {
    const it = items();
    const onLeave = vi.fn();
    render(<MeetingToolbar items={it} onLeave={onLeave} compact={false} />);
    fireEvent.click(screen.getByTestId('meeting-toolbar-raise'));
    expect(it[1]!.onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('meeting-toolbar-leave'));
    expect(onLeave).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('meeting-toolbar-leave')).toHaveAttribute('data-tone', 'danger');
  });

  it('compact folds secondary items into More, and they stay reachable', () => {
    const it = items();
    render(<MeetingToolbar items={it} onLeave={() => {}} compact />);
    expect(screen.getByTestId('meeting-toolbar')).toHaveAttribute('data-compact', 'true');
    expect(screen.queryByTestId('meeting-toolbar-view')).toBeNull();
    fireEvent.click(screen.getByTestId('meeting-toolbar-more'));
    fireEvent.click(screen.getByTestId('meeting-toolbar-more-view'));
    expect(it[2]!.onClick).toHaveBeenCalledTimes(1);
  });

  it('shows no More button when nothing folds and no extra sections exist', () => {
    render(<MeetingToolbar items={items()} onLeave={() => {}} compact={false} />);
    expect(screen.queryByTestId('meeting-toolbar-more')).toBeNull();
  });

  it('a split item opens its menu from the chevron; disabled carries its reason', () => {
    const onSelect = vi.fn();
    render(
      <MeetingToolbar
        items={[]}
        media={[{
          id: 'camera', label: 'Camera', icon: <VideoOffIcon />, tone: 'off', onClick: vi.fn(),
          menu: deviceMenuSections('Camera', [{ deviceId: 'a', label: 'FaceTime HD' }, { deviceId: 'b', label: '' }], 'a', onSelect),
        }, { id: 'share', label: 'Share', icon: <VideoOffIcon />, disabled: true, disabledReason: 'Sharing is off in this meeting' }]}
        onLeave={() => {}}
        compact={false}
      />,
    );
    expect(screen.getByTestId('meeting-toolbar-camera')).toHaveAttribute('data-tone', 'off');
    fireEvent.click(screen.getByTestId('meeting-toolbar-camera-menu'));
    expect(screen.getByText('FaceTime HD')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Camera 2'));
    expect(onSelect).toHaveBeenCalledWith('b');
    const share = screen.getByTestId('meeting-toolbar-share');
    expect(share).toBeDisabled();
    expect(share).toHaveAttribute('title', 'Sharing is off in this meeting');
  });

  it('an unread badge renders on the icon', () => {
    render(<MeetingToolbar items={[{ id: 'chat', label: 'Chat', icon: <UsersIcon />, badge: 3 }]} onLeave={() => {}} compact={false} />);
    expect(within(screen.getByTestId('meeting-toolbar-chat')).getByTestId('meeting-toolbar-chat-badge')).toHaveTextContent('3');
  });

  it('deviceMenuSections says when there is no device', () => {
    const [section] = deviceMenuSections('Microphone', [], undefined, () => {});
    expect(section!.items[0]).toMatchObject({ label: 'No microphone found', disabled: true });
  });
});

describe('MeetingToolbar keyboard (WAI-ARIA toolbar, 2.458.2)', () => {
  function setup() {
    render(
      <MeetingToolbar
        items={[
          { id: 'people', label: 'People', icon: <UsersIcon />, count: 3, onClick: () => {} },
          { id: 'raise', label: 'Raise', icon: <MeetingHandIcon />, onClick: () => {} },
          { id: 'view', label: 'View', icon: <MeetingViewIcon />, disabled: true },
          { id: 'rooms', label: 'Rooms', icon: <MeetingRoomsIcon />, onClick: () => {} },
        ]}
        onLeave={() => {}}
        compact={false}
      />,
    );
    return screen.getByRole('toolbar', { name: 'Meeting controls' });
  }

  it('is a single tab stop', () => {
    const bar = setup();
    const stops = [...bar.querySelectorAll("button")].filter((b) => !b.disabled && b.tabIndex === 0);
    expect(stops).toHaveLength(1);
    expect(bar).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('arrow keys move focus, skipping disabled buttons; Home and End jump; it wraps', () => {
    const bar = setup();
    const people = screen.getByTestId('meeting-toolbar-people');
    people.focus();
    fireEvent.keyDown(people, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByTestId('meeting-toolbar-raise'));
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByTestId('meeting-toolbar-rooms'));
    fireEvent.keyDown(document.activeElement!, { key: 'End' });
    expect(document.activeElement).toBe(screen.getByTestId('meeting-toolbar-leave'));
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(people);
    fireEvent.keyDown(people, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(screen.getByTestId('meeting-toolbar-leave'));
    fireEvent.keyDown(document.activeElement!, { key: 'Home' });
    expect(document.activeElement).toBe(people);
    // The tab stop follows focus.
    expect([...bar.querySelectorAll("button")].filter((b) => !b.disabled && b.tabIndex === 0)).toEqual([people]);
  });

  it('split chevrons are stops too, so a device menu is reachable from the keyboard', () => {
    render(
      <MeetingToolbar
        items={[]}
        media={[{ id: 'camera', label: 'Camera', icon: <VideoOffIcon />, onClick: () => {}, menu: deviceMenuSections('Camera', [{ deviceId: 'a', label: 'Cam A' }], 'a', () => {}) }]}
        onLeave={() => {}}
        compact={false}
      />,
    );
    const cam = screen.getByTestId('meeting-toolbar-camera');
    cam.focus();
    fireEvent.keyDown(cam, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByTestId('meeting-toolbar-camera-menu'));
  });

  it('a popover item opens an anchored panel instead of firing onClick, and close() shuts it', () => {
    const onClick = vi.fn();
    const onReact = vi.fn();
    render(
      <MeetingToolbar
        items={[{
          id: 'react', label: 'React', icon: <MeetingViewIcon />, onClick, popoverLabel: 'Send a reaction',
          popover: (close) => <button type="button" onClick={() => { onReact('👍'); close(); }}>👍</button>,
        }]}
        onLeave={() => {}}
        compact={false}
      />,
    );
    const react = screen.getByTestId('meeting-toolbar-react');
    expect(react).toHaveAttribute('aria-haspopup', 'dialog');
    expect(react).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('meeting-toolbar-react-popover')).toBeNull();
    fireEvent.click(react);
    expect(onClick).not.toHaveBeenCalled();
    expect(react).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('meeting-toolbar-react-active')).toBeInTheDocument();
    const panel = screen.getByRole('dialog', { name: 'Send a reaction' });
    // Portalled: the toolbar's roving keys never see the panel's buttons.
    expect(screen.getByRole('toolbar').contains(panel)).toBe(false);
    fireEvent.click(within(panel).getByRole('button', { name: '👍' }));
    expect(onReact).toHaveBeenCalledWith('👍');
    expect(screen.queryByTestId('meeting-toolbar-react-popover')).toBeNull();
    expect(react).toHaveAttribute('aria-expanded', 'false');
  });

  it('a popover closes on Escape and on a second click of its button, returning focus', () => {
    render(
      <MeetingToolbar
        items={[{ id: 'react', label: 'React', icon: <MeetingViewIcon />, popover: () => <button type="button">👍</button> }]}
        onLeave={() => {}}
        compact={false}
      />,
    );
    const react = screen.getByTestId('meeting-toolbar-react');
    react.focus();
    fireEvent.click(react);
    const panel = screen.getByTestId('meeting-toolbar-react-popover');
    fireEvent.keyDown(document.activeElement ?? panel, { key: 'Escape' });
    expect(screen.queryByTestId('meeting-toolbar-react-popover')).toBeNull();
    expect(document.activeElement).toBe(react);
    fireEvent.click(react);
    expect(screen.getByTestId('meeting-toolbar-react-popover')).toBeInTheDocument();
    fireEvent.click(react);
    expect(screen.queryByTestId('meeting-toolbar-react-popover')).toBeNull();
  });

  it('a popover item never folds into More, even when secondary; a disabled one cannot open', () => {
    const { rerender } = render(
      <MeetingToolbar
        items={[{ id: 'react', label: 'React', icon: <MeetingViewIcon />, priority: 'secondary', popover: () => <span>panel</span> }]}
        onLeave={() => {}}
        compact
      />,
    );
    expect(screen.getByTestId('meeting-toolbar-react')).toBeInTheDocument();
    expect(screen.queryByTestId('meeting-toolbar-more')).toBeNull();
    rerender(
      <MeetingToolbar
        items={[{ id: 'react', label: 'React', icon: <MeetingViewIcon />, disabled: true, popover: () => <span>panel</span> }]}
        onLeave={() => {}}
        compact
      />,
    );
    fireEvent.click(screen.getByTestId('meeting-toolbar-react'));
    expect(screen.queryByTestId('meeting-toolbar-react-popover')).toBeNull();
  });

  it('phone layout: icon-only, items fold into More except popovers, device and Leave menus move into More', () => {
    const onCamera = vi.fn();
    render(
      <MeetingToolbar
        phone
        items={[
          ...items(),
          { id: 'react', label: 'React', icon: <MeetingViewIcon />, popover: () => <span>picker</span> },
        ]}
        media={[
          { id: 'camera', label: 'Camera', icon: <VideoOffIcon />, onClick: onCamera, menu: deviceMenuSections('Camera', [{ deviceId: 'a', label: 'Cam A' }], 'a', () => {}) },
          { id: 'share', label: 'Share', icon: <UsersIcon />, priority: 'secondary', onClick: vi.fn() },
        ]}
        leaveMenu={[{ items: [{ label: 'End meeting for everyone', onSelect: vi.fn(), 'data-testid': 'end-all' }] }]}
        onLeave={() => {}}
      />,
    );
    const bar = screen.getByTestId('meeting-toolbar');
    expect(bar).toHaveAttribute('data-layout', 'phone');
    // Visible: React (popover), Camera, More, Leave — icon-only, named by label.
    expect(screen.queryByTestId('meeting-toolbar-people')).toBeNull();
    expect(screen.queryByTestId('meeting-toolbar-share')).toBeNull();
    expect(screen.getByTestId('meeting-toolbar-react')).toBeInTheDocument();
    const camera = screen.getByTestId('meeting-toolbar-camera');
    expect(camera).toHaveAccessibleName('Camera');
    expect(within(camera).queryByText('Camera')).toBeNull();
    expect(screen.queryByTestId('meeting-toolbar-camera-menu')).toBeNull();
    fireEvent.click(camera);
    expect(onCamera).toHaveBeenCalled();
    // More holds the folded items, Share, the device list and Leave options.
    fireEvent.click(screen.getByTestId('meeting-toolbar-more'));
    expect(screen.getByTestId('meeting-toolbar-more-people')).toBeInTheDocument();
    expect(screen.getByTestId('meeting-toolbar-more-share')).toBeInTheDocument();
    expect(screen.getByTestId('device-a')).toBeInTheDocument();
    expect(screen.getByTestId('end-all')).toBeInTheDocument();
  });
});

