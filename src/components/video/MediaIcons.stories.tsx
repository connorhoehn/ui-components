import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactElement } from 'react';
import {
  MicIcon, MicOffIcon,
  VideoIcon, VideoOffIcon,
  ScreenShareIcon, ScreenShareOffIcon,
  PhoneOffIcon, MoreHorizontalIcon, UserPlusIcon,
  SpeakerIcon, MonitorIcon, ExpandIcon, PhoneCallIcon, SettingsGearIcon,
  type IconProps,
} from './MediaIcons';

// All stroke-based and `currentColor`, so they inherit tone from a `text-*`
// class rather than carrying colour of their own.

type IconComponent = (p: IconProps) => ReactElement;

const ICONS: Array<[string, IconComponent]> = [
  ['MicIcon', MicIcon],
  ['MicOffIcon', MicOffIcon],
  ['VideoIcon', VideoIcon],
  ['VideoOffIcon', VideoOffIcon],
  ['ScreenShareIcon', ScreenShareIcon],
  ['ScreenShareOffIcon', ScreenShareOffIcon],
  ['PhoneOffIcon', PhoneOffIcon],
  ['UserPlusIcon', UserPlusIcon],
  ['MoreHorizontalIcon', MoreHorizontalIcon],
  // Document calls (2.391.0)
  ['SpeakerIcon', SpeakerIcon],
  ['MonitorIcon', MonitorIcon],
  ['ExpandIcon', ExpandIcon],
  ['PhoneCallIcon', PhoneCallIcon],
  ['SettingsGearIcon', SettingsGearIcon],
];

const meta = {
  title: 'Video/MediaIcons',
  component: MicIcon,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof MicIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full set at the default 20px. */
export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 text-text-primary">
      {ICONS.map(([name, Icon]) => (
        <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-md border border-border">
          <Icon />
          <span className="text-[11px] font-mono text-text-secondary">{name}</span>
        </div>
      ))}
    </div>
  ),
};

/** On/off pairs, which is how they are actually consumed — as the two halves
 *  of a CircularIconToggle. */
export const OnOffPairs: Story = {
  render: () => (
    <div className="flex flex-col gap-3 text-text-primary">
      {([
        ['Microphone', MicIcon, MicOffIcon],
        ['Camera', VideoIcon, VideoOffIcon],
        ['Screen share', ScreenShareIcon, ScreenShareOffIcon],
      ] as Array<[string, IconComponent, IconComponent]>).map(
        ([label, On, Off]) => (
          <div key={label} className="flex items-center gap-4">
            <span className="w-28 text-xs text-text-secondary">{label}</span>
            <On size={22} />
            <Off size={22} />
          </div>
        ),
      )}
    </div>
  ),
};

/** `size` scales the whole 24×24 viewBox; stroke width scales with it. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 text-text-primary">
      {[14, 18, 24, 32, 48].map((size) => (
        <div key={size} className="flex flex-col items-center gap-1">
          <MicIcon size={size} />
          <span className="text-[10px] font-mono text-text-secondary">{size}</span>
        </div>
      ))}
    </div>
  ),
};

/** Colour comes entirely from the surrounding `text-*` class — the icons never
 *  name one themselves. */
export const InheritsTone: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <span className="text-success"><MicIcon size={24} /></span>
      <span className="text-warning"><ScreenShareIcon size={24} /></span>
      <span className="text-danger"><PhoneOffIcon size={24} /></span>
      <span className="text-text-disabled"><VideoOffIcon size={24} /></span>
    </div>
  ),
};

/** The gallery in the dark theme (icons are currentColor, so they follow the text token). */
export const GalleryDark: Story = {
  ...Gallery,
  decorators: [(S) => <div data-theme="dark" className="bg-surface p-4"><S /></div>],
};
