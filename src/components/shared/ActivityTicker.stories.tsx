import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActivityTicker } from './ActivityTicker';

const meta: Meta<typeof ActivityTicker> = {
  title: 'Shared/ActivityTicker', component: ActivityTicker,
  parameters: { layout: 'fullscreen' },
  args: { sample: true, categories: [{ id: 'automation', label: 'Automation' }], items: [{ category: 'automation', label: 'Automation', summary: '9 agent computers · 0 running · 0 waiting', detail: 'A preview of automation status.' }] },
};
export default meta;
type Story = StoryObj<typeof ActivityTicker>;
export const HeaderAndFooter: Story = {
  render: function MovableTicker(args) {
    const [placement, setPlacement] = useState<'header' | 'footer'>('footer');
    const [moving, setMoving] = useState(false);
    const slot = (location: 'header' | 'footer') => <div
      className={`flex min-h-11 min-w-0 flex-1 items-center rounded-md ${moving ? 'outline-2 outline-dashed outline-primary' : ''}`}
      data-today-drop-zone={location}
      onDragOver={event => { if (moving) event.preventDefault(); }}
      onDrop={event => { if (event.dataTransfer.getData('text/x-activity-ticker') === 'today') { event.preventDefault(); setPlacement(location); setMoving(false); } }}>
      {placement === location ? <ActivityTicker {...args} placement={placement} onPlacementChange={setPlacement}
        onMoveStart={() => setMoving(true)} onMoveEnd={() => setMoving(false)} /> : moving ? <span className="px-3 text-xs">Drop Today in {location}</span> : null}
    </div>;
    return <div className="flex h-[520px] flex-col bg-workspace text-text-primary">
      <header className="flex items-center gap-4 border-b border-border bg-surface px-4"><strong>Work</strong>{slot('header')}</header>
      <main className="flex-1 p-6 text-sm">Drag the grip to either outlined zone. Click it or press Enter to move without dragging.</main>
      <footer className="flex items-center gap-4 border-t border-border bg-surface px-4"><span className="text-sm">Messages</span>{slot('footer')}</footer>
    </div>;
  },
};
