import '@connorhoehn/ui-components/styles.css';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Modal } from '@connorhoehn/ui-components/shared';
import { AudioVideoSettingsForm, type AudioVideoSettings } from '@connorhoehn/ui-components/video';
const params = new URLSearchParams(location.search);
document.documentElement.dataset.tenant = 'orgiq';
document.documentElement.dataset.theme = params.get('theme') ?? 'light';
const initial: AudioVideoSettings = { noiseSuppression: true, echoCancellation: true, autoGainControl: true, volume: .7, mirrorPreview: true, quality: 'auto', frameRate: 'auto', rememberDevices: false };
function Fixture() {
  const [settings, setSettings] = useState(initial);
  return <div className="h-dvh bg-surface text-text-primary">
    <Modal open title="Native prejoin layout fixture" maxWidth={900} rawChildren onClose={() => undefined}>
      <AudioVideoSettingsForm value={settings} onChange={setSettings} layout="prejoin" selfName="Inert actor" selfAvatarUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%235969bf'/%3E%3C/svg%3E" cameraOn={false} previewStream={null}
        devices={{ microphones: [{ deviceId: 'm1', label: 'Inert microphone' }], cameras: [{ deviceId: 'c1', label: 'Inert camera' }], speakers: [{ deviceId: 's1', label: 'Inert speaker' }] }}
        permission={{ microphone: 'granted', camera: 'granted' }} micLevel={0} speakerSelectionSupported onTestMic={() => undefined} onTestSound={() => undefined} />
      <output data-testid="fixture-settings">{settings.quality}</output>
    </Modal>
  </div>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><Fixture /></StrictMode>);
