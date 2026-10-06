import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeviceToggleSelect } from '../DeviceToggleSelect';

const base = {
  kind: 'microphone' as const,
  on: true,
  onToggle: () => {},
  devices: [{ deviceId: 'a', label: 'Built-in' }],
  onSelectDevice: () => {},
  permission: 'granted' as const,
};

describe('DeviceToggleSelect deviceMenu', () => {
  it('draws the device caret by default', () => {
    render(<DeviceToggleSelect {...base} />);
    expect(screen.getByTestId('device-toggle-microphone-menu')).toBeTruthy();
  });

  it('is a bare toggle with deviceMenu={false}', () => {
    const onToggle = vi.fn();
    render(<DeviceToggleSelect {...base} onToggle={onToggle} deviceMenu={false} />);
    expect(screen.queryByTestId('device-toggle-microphone-menu')).toBeNull();
    fireEvent.click(screen.getByTestId('device-toggle-microphone'));
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('device-toggle-microphone').className).toContain('rounded-md');
  });
});
