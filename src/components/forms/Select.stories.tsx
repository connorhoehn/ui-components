import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const providerOptions = [
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'bedrock', label: 'Bedrock' },
  { value: 'claude-code', label: 'Claude Code (subprocess)' },
];

const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: providerOptions,
    value: 'anthropic',
    onChange: () => {},
  },
};

export const WithPlaceholder: Story = {
  args: {
    options: providerOptions,
    placeholder: 'Choose a provider…',
    value: '',
    onChange: () => {},
  },
};

export const Small: Story = {
  args: {
    options: providerOptions,
    value: 'bedrock',
    size: 'sm',
    onChange: () => {},
  },
};

export const Invalid: Story = {
  args: {
    options: providerOptions,
    value: '',
    invalid: true,
    placeholder: 'Required',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    options: providerOptions,
    value: 'anthropic',
    disabled: true,
    onChange: () => {},
  },
};

/** The compact tone-coloured capsule a status or priority picker wants. */
export const Pill: Story = {
  args: {
    variant: 'pill',
    size: 'sm',
    tone: 'warning',
    value: 'medium',
    options: [
      { value: 'low', label: 'low' },
      { value: 'medium', label: 'medium' },
      { value: 'high', label: 'high' },
    ],
    onChange: () => {},
  },
};

/** One pill per tone — the shape a task row repeats down its right edge. */
export const PillTones: Story = {
  args: { options: providerOptions, value: 'bedrock', onChange: () => {} },
  render: () => (
    <div className="flex items-center gap-2">
      {(['neutral', 'info', 'success', 'warning', 'danger'] as const).map((tone) => (
        <Select
          key={tone}
          variant="pill"
          size="sm"
          tone={tone}
          aria-label={tone}
          value={tone}
          options={[{ value: tone, label: tone }]}
          onChange={() => {}}
        />
      ))}
    </div>
  ),
};

/** 2.391.1: `chevron="custom"` — no native arrow; the library chevron (the call-settings selects). */
export const CustomChevron: Story = {
  args: { options: providerOptions, value: 'anthropic', chevron: 'custom', wrapperClassName: 'w-72', onChange: () => {} },
};
export const CustomChevronDark: Story = {
  ...CustomChevron,
  decorators: [(S) => <div data-theme="dark" className="bg-surface p-4"><S /></div>],
};
