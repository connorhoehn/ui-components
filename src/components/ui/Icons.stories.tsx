import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import * as Icons from './Icons';

/** Every glyph in the shared set, on its 16-unit grid, with its export name. */
function IconGallery({ size = 16 }: { size?: number }) {
  const entries = (Object.entries(Icons) as Array<[string, unknown]>).filter(
    (e): e is [string, ComponentType<{ size?: number }>] => /Icon$/.test(e[0]) && typeof e[1] === 'function',
  );
  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-2 p-0">
      {entries.map(([name, Glyph]) => (
        <li key={name} className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="text-text-primary"><Glyph size={size} /></span>
          {name}
        </li>
      ))}
    </ul>
  );
}

const meta = {
  title: 'UI/Icons',
  component: IconGallery,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = { args: { size: 16 } };

/** `MusicIcon` (since 2.545.0) beside its media neighbours. */
export const Music: Story = {
  render: () => (
    <span className="flex items-center gap-3 text-text-primary">
      <Icons.MusicIcon /><Icons.PlayCircleIcon /><Icons.PauseCircleIcon /><Icons.MusicIcon size={24} />
    </span>
  ),
};
