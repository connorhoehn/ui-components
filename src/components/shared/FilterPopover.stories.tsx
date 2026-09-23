import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterPopover } from './FilterPopover';
import { FilterChip } from './FilterChip';
import { SectionLabel } from './SectionLabel';

const STATUS = ['Draft', 'Published', 'Archived'] as const;
const HEALTH = ['Healthy', 'Failing', 'Stale'] as const;

function Harness({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const [status, setStatus] = useState<Set<string>>(new Set(['Published']));
  const [health, setHealth] = useState<Set<string>>(new Set());
  const toggle = (set: Set<string>, key: string) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    return next;
  };
  return (
    <FilterPopover
      open={initiallyOpen ? undefined : undefined}
      activeCount={status.size + health.size}
      onClear={() => {
        setStatus(new Set());
        setHealth(new Set());
      }}
    >
      <div className="flex flex-col gap-1.5">
        <SectionLabel as="div">Status</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {STATUS.map((s) => (
            <FilterChip key={s} size="sm" active={status.has(s)} onClick={() => setStatus((v) => toggle(v, s))}>
              {s}
            </FilterChip>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <SectionLabel as="div">Health</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {HEALTH.map((h) => (
            <FilterChip key={h} size="sm" active={health.has(h)} onClick={() => setHealth((v) => toggle(v, h))}>
              {h}
            </FilterChip>
          ))}
        </div>
      </div>
    </FilterPopover>
  );
}

const meta = {
  title: 'Shared/FilterPopover',
  component: FilterPopover,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FilterPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One filter active: the button carries a count badge. Click it. */
export const WithActiveCount: Story = {
  args: { children: null, activeCount: 1 },
  render: () => (
    <div className="h-64 w-[520px]">
      <Harness />
    </div>
  ),
};

/** Nothing active, no clear row. */
export const Idle: Story = {
  args: { children: null },
  render: () => (
    <FilterPopover>
      <p className="m-0 text-sm text-text-secondary">Put your filter chips here.</p>
    </FilterPopover>
  ),
};

/** Controlled open, so the panel is visible without a click. */
export const OpenPanel: Story = {
  args: { children: null, open: true },
  render: () => (
    <div className="h-72 w-[520px]">
      <FilterPopover open onOpenChange={() => {}} activeCount={2} onClear={() => {}}>
        <div className="flex flex-col gap-1.5">
          <SectionLabel as="div">Status</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {STATUS.map((s) => (
              <FilterChip key={s} size="sm" active={s !== 'Archived'} onClick={() => {}}>
                {s}
              </FilterChip>
            ))}
          </div>
        </div>
      </FilterPopover>
    </div>
  ),
};
