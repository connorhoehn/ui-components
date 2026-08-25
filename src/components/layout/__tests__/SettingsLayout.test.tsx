import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SettingsLayout, type SettingsSection } from '../SettingsLayout';

const sections: SettingsSection[] = [
  { id: 'profile', label: 'Profile', description: 'Avatar, name, bio', content: <div>Profile panel</div> },
  { id: 'security', label: 'Security', description: 'Password, MFA', content: <div>Security panel</div> },
  { id: 'tokens', label: 'API tokens', content: <div>Tokens panel</div> },
];

describe('SettingsLayout', () => {
  it('renders title and rail items', () => {
    render(<SettingsLayout title="Account" sections={sections} />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('API tokens')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<SettingsLayout title="Account" subtitle="Manage your workspace" sections={sections} />);
    expect(screen.getByText('Manage your workspace')).toBeInTheDocument();
  });

  it('selects the first section by default', () => {
    render(<SettingsLayout title="Account" sections={sections} />);
    expect(screen.getByText('Profile panel')).toBeInTheDocument();
    expect(screen.queryByText('Security panel')).not.toBeInTheDocument();
  });

  it('switches sections when a rail item is clicked', () => {
    render(<SettingsLayout title="Account" sections={sections} />);
    fireEvent.click(screen.getByText('Security'));
    expect(screen.getByText('Security panel')).toBeInTheDocument();
    expect(screen.queryByText('Profile panel')).not.toBeInTheDocument();
  });

  it('marks the active rail item with data-active', () => {
    render(<SettingsLayout title="Account" sections={sections} />);
    const items = screen.getAllByTestId('settings-layout-rail-item');
    expect(items[0].getAttribute('data-active')).toBe('true');
    expect(items[1].getAttribute('data-active')).toBeNull();
    fireEvent.click(items[1]);
    expect(items[0].getAttribute('data-active')).toBeNull();
    expect(items[1].getAttribute('data-active')).toBe('true');
  });

  it('fires onSectionChange and respects controlled activeSectionId', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <SettingsLayout
        title="Account"
        sections={sections}
        activeSectionId="profile"
        onSectionChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText('Security'));
    expect(onChange).toHaveBeenCalledWith('security');
    expect(screen.getByText('Profile panel')).toBeInTheDocument(); // still controlled
    rerender(
      <SettingsLayout
        title="Account"
        sections={sections}
        activeSectionId="security"
        onSectionChange={onChange}
      />,
    );
    expect(screen.getByText('Security panel')).toBeInTheDocument();
  });

  it('does not render the save bar when not dirty', () => {
    render(<SettingsLayout title="Account" sections={sections} />);
    expect(screen.queryByTestId('settings-layout-save-bar')).not.toBeInTheDocument();
  });

  it('renders the save bar when dirty', () => {
    render(<SettingsLayout title="Account" sections={sections} dirty onSave={() => undefined} />);
    expect(screen.getByTestId('settings-layout-save-bar')).toBeInTheDocument();
    expect(screen.getByText('You have unsaved changes.')).toBeInTheDocument();
    expect(screen.getByTestId('settings-layout-save')).toBeInTheDocument();
  });

  // INVERTED: this case used to render `dirty` with NO `onSave` and assert the
  // Save button was present, pinning a button that swallowed every click and
  // left the bar reading "You have unsaved changes" forever. `onSave` is
  // optional and nothing in the layout can persist anything without it, so the
  // button must not render — same rule the sibling Cancel already followed.
  it('omits the save button when no onSave handler is wired', () => {
    render(<SettingsLayout title="Account" sections={sections} dirty />);
    expect(screen.getByTestId('settings-layout-save-bar')).toBeInTheDocument();
    expect(screen.queryByTestId('settings-layout-save')).toBeNull();
  });

  it('fires onSave and onCancel handlers', () => {
    const onSave = vi.fn();
    const onCancel = vi.fn();
    render(
      <SettingsLayout
        title="Account"
        sections={sections}
        dirty
        onSave={onSave}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByTestId('settings-layout-save'));
    fireEvent.click(screen.getByTestId('settings-layout-cancel'));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('shows a saving state on the save button', () => {
    render(<SettingsLayout title="Account" sections={sections} dirty saving onSave={() => undefined} />);
    const btn = screen.getByTestId('settings-layout-save');
    expect(btn).toHaveTextContent('Saving…');
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });

  it('uses custom save/cancel labels', () => {
    render(
      <SettingsLayout
        title="Account"
        sections={sections}
        dirty
        saveLabel="Apply"
        cancelLabel="Discard"
        onSave={() => undefined}
        onCancel={() => undefined}
      />,
    );
    expect(screen.getByTestId('settings-layout-save')).toHaveTextContent('Apply');
    expect(screen.getByTestId('settings-layout-cancel')).toHaveTextContent('Discard');
  });

  it('renders icon and description in the rail', () => {
    render(<SettingsLayout title="Account" sections={[{ id: 'a', label: 'A', icon: '★', description: 'desc-a', content: 'A' }]} />);
    expect(screen.getByText('★')).toBeInTheDocument();
    expect(screen.getByText('desc-a')).toBeInTheDocument();
  });

  it('exposes data-dirty when dirty', () => {
    render(<SettingsLayout title="Account" sections={sections} dirty />);
    expect(screen.getByTestId('settings-layout').getAttribute('data-dirty')).toBe('true');
  });
});
