import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogueSegment } from './DialogueSegment';
import { InfoIcon, PlayCircleIcon, RepeatIcon } from '../ui/Icons';
const meta = { title: 'Social/DialogueSegment', component: DialogueSegment, tags: ['autodocs'] } satisfies Meta<typeof DialogueSegment>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Editor: Story = {
  args: { author: 'Peb', text: 'I like this spot.', metadata: 'Scene 2 · 00:32' },
  render: (args) => {
    const [status, setStatus] = useState('');
    return <div className="max-w-xl"><DialogueSegment {...args} status={status} actions={[
      { id: 'play', label: 'Play line', icon: <PlayCircleIcon />, onClick: () => setStatus('Playing') },
      { id: 'rework', label: 'Queue for rework', icon: <RepeatIcon />, onClick: () => setStatus('Queued') },
      { id: 'inspect', label: 'Inspect line', icon: <InfoIcon />, onClick: () => setStatus('Full text available') },
    ]} /></div>;
  },
};
export const MissingTake: Story = { args: { author: 'Map', text: "I'm Mape. I fell from a tree too! Do you want to play?", metadata: 'No take', actions: [{ id: 'play', label: 'No playable take', icon: <PlayCircleIcon />, disabled: true, onClick: () => {} }, { id: 'rework', label: 'Queue for rework', icon: <RepeatIcon />, onClick: () => {} }] } };
export const LongLine: Story = { ...Editor, args: { ...Editor.args, text: 'A very long line stays on one text line. Its full contents remain available to assistive technology, the title tooltip, and a host-provided inspector.' } };
