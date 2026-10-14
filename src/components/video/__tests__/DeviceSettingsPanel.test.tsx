import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DeviceSettingsPanel } from '../DeviceSettingsPanel';
import { selectLabels } from '../../../test-utils/selectListbox';

const devices = [
  { deviceId: 'mic-1', kind: 'audioinput', label: 'Headset Microphone' },
  { deviceId: 'mic-2', kind: 'audioinput', label: '' },
  { deviceId: 'cam-1', kind: 'videoinput', label: 'FaceTime HD' },
  { deviceId: 'spk-1', kind: 'audiooutput', label: 'Headset' },
];

beforeEach(() => {
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: { enumerateDevices: vi.fn(async () => devices), addEventListener: vi.fn(), removeEventListener: vi.fn() },
  });
  (HTMLMediaElement.prototype as unknown as { setSinkId: unknown }).setSinkId = vi.fn(async () => undefined);
});
afterEach(() => { cleanup(); delete (HTMLMediaElement.prototype as unknown as { setSinkId?: unknown }).setSinkId; });

describe('DeviceSettingsPanel', () => {
  it('lists devices by kind, names an unlabelled one, and reports a choice', async () => {
    const onChange = vi.fn();
    render(<DeviceSettingsPanel value={{}} onChange={onChange} />);
    await waitFor(() => expect(screen.getByTestId('device-settings-microphone')).toBeTruthy());
    const mic = screen.getByTestId('device-settings-microphone');
    await waitFor(() => expect(selectLabels(mic)).toEqual(['System default', 'Headset Microphone', 'Microphone 2']));
    expect(screen.getByTestId('device-settings-labels-hidden')).toBeTruthy();
    fireEvent.change(mic, { target: { value: 'mic-1' } });
    expect(onChange).toHaveBeenCalledWith({ microphoneId: 'mic-1' });
    expect(screen.getByTestId('device-settings-speaker')).toBeTruthy();
  });

  it('keeps a remembered device that is not connected as its own option', async () => {
    render(<DeviceSettingsPanel value={{ microphoneId: 'mic-gone' }} onChange={() => {}} showCamera={false} />);
    const mic = await screen.findByTestId('device-settings-microphone');
    await waitFor(() => expect(selectLabels(mic)).toContain('Remembered device (not connected)'));
    expect(screen.queryByTestId('device-settings-camera')).toBeNull();
  });

  it('hides the speaker picker where the browser cannot route output', async () => {
    delete (HTMLMediaElement.prototype as unknown as { setSinkId?: unknown }).setSinkId;
    render(<DeviceSettingsPanel value={{}} onChange={() => {}} />);
    await screen.findByTestId('device-settings-microphone');
    expect(screen.queryByTestId('device-settings-speaker')).toBeNull();
  });
});
