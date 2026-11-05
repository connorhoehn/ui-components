import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SettingsPage } from './SettingsPage';

const sections = [
  { id: 'general', label: 'General', content: <p>general form</p> },
  { id: 'members', label: 'Members', content: <p>members form</p> },
];

describe('SettingsPage', () => {
  it('wraps SettingsLayout with the trail and the template marker', () => {
    const { container } = render(<SettingsPage title="Workspace" breadcrumbs={[{ label: 'Admin', href: '/a' }, { label: 'Workspace' }]} sections={sections} />);
    const root = container.querySelector('[data-page-template="settings"]')!;
    expect(root.className).toContain('h-full');
    expect(screen.getByText('Admin')).toBeTruthy();
    expect(screen.getByTestId('settings-page-layout').className).toContain('flex-1');
    expect(screen.getByText('general form')).toBeTruthy();
  });

  it('passes section switching and the dirty save bar through', () => {
    const onSave = vi.fn();
    render(<SettingsPage title="Workspace" sections={sections} dirty onSave={onSave} />);
    fireEvent.click(screen.getByText('Members'));
    expect(screen.getByText('members form')).toBeTruthy();
    fireEvent.click(screen.getByTestId('settings-page-layout-save'));
    expect(onSave).toHaveBeenCalled();
  });
});
