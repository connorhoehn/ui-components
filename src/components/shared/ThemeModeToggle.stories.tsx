import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ThemeModeToggle, type ThemeMode } from './ThemeModeToggle';

const meta = {
  title: 'Shared/ThemeModeToggle',
  component: ThemeModeToggle,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ThemeModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press it: the glyph and aria-pressed follow the mode. */
export const Default: Story = {
  args: { mode: 'light', onModeChange: () => {} },
  render: (args) => {
    const [mode, setMode] = useState<ThemeMode>(args.mode);
    return <ThemeModeToggle {...args} mode={mode} onModeChange={setMode} />;
  },
};

export const Dark: Story = {
  args: { mode: 'dark', onModeChange: () => {} },
};
