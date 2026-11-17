import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CallNounProvider, useCallNoun } from '../callNoun';
import { AudioVideoSettingsForm, type AudioVideoSettingsFormProps } from '../AudioVideoSettingsForm';
import { HuddleBar } from '../HuddleBar';
import { WrappedAudioVideoSettingsForm, type RMAudioVideoSettingsSource, type RMMediaDevicesSource } from '../../../integrations/realtime-modules/WrappedAudioVideoSettingsForm';

afterEach(cleanup);

const devices: RMMediaDevicesSource = {
  microphones: [], cameras: [], speakers: [],
  permission: { microphone: 'granted', camera: 'granted' }, speakerSelectionSupported: false,
};
const settings: RMAudioVideoSettingsSource = {
  settings: {} as RMAudioVideoSettingsSource['settings'], update: () => {}, previewStream: null, micLevel: 0,
  testMic: async () => {}, testSound: async () => {}, testMicState: 'idle',
};
const formProps: AudioVideoSettingsFormProps = {
  value: settings.settings, onChange: () => {}, devices: { microphones: [], speakers: [], cameras: [] },
  permission: devices.permission, micLevel: 0, previewStream: null, cameraOn: true, speakerSelectionSupported: false,
  onTestMic: () => {}, onTestSound: () => {}, layout: 'prejoin',
};
const line = (noun: string) => `Your camera is on. This is how you’ll appear in the ${noun}.`;

describe('callNoun reaches the device check', () => {
  it('defaults to "huddle"', () => {
    render(<AudioVideoSettingsForm {...formProps} />);
    expect(screen.getByText(line('huddle'))).toBeInTheDocument();
  });

  it('the wrapped form passes its own callNoun to the pre-join setup', () => {
    render(<WrappedAudioVideoSettingsForm devices={devices} settings={settings} cameraOn layout="prejoin" callNoun="interview" />);
    expect(screen.getByText(line('interview'))).toBeInTheDocument();
  });

  it('without a prop, the form and the wrapped form read the nearest CallNounProvider', () => {
    render(
      <CallNounProvider noun="call">
        <AudioVideoSettingsForm {...formProps} data-testid="plain" />
        <WrappedAudioVideoSettingsForm devices={devices} settings={settings} cameraOn layout="prejoin" data-testid="wrapped" />
      </CallNounProvider>,
    );
    expect(screen.getAllByText(line('call'))).toHaveLength(2);
  });

  it('a prop wins over the provider', () => {
    render(<CallNounProvider noun="call"><AudioVideoSettingsForm {...formProps} callNoun="interview" /></CallNounProvider>);
    expect(screen.getByText(line('interview'))).toBeInTheDocument();
  });

  it('HuddleBar reads the provider too', () => {
    render(<CallNounProvider noun="call"><HuddleBar name="Design review" phase="joinable" onJoin={() => {}} /></CallNounProvider>);
    expect(screen.getByRole('button', { name: 'Join Design review call' })).toBeInTheDocument();
  });

  it('useCallNoun: override, then provider, then "huddle"', () => {
    function Probe({ o }: { o?: string }) { return <span data-testid={`p-${o ?? 'none'}`}>{useCallNoun(o)}</span>; }
    render(<><Probe /><CallNounProvider noun="call"><Probe o="interview" /></CallNounProvider></>);
    expect(screen.getByTestId('p-none')).toHaveTextContent('huddle');
    expect(screen.getByTestId('p-interview')).toHaveTextContent('interview');
  });
});
