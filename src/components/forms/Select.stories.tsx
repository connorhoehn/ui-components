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

/** 2.445.0: the open list is the library's listbox — descriptions, groups, disabled rows, keyboard and type-ahead. */
export const DescriptionsAndGroups: Story = {
  args: {
    'aria-label': 'Model', value: 'nova-pro', onChange: () => {}, className: 'w-72',
    options: [{ value: 'nova-pro', label: 'Nova Pro', description: 'Default for every agent' }, { value: 'nova-lite', label: 'Nova Lite', description: 'Cheaper; shorter context' }],
    groups: [{ label: 'Retired', options: [{ value: 'titan', label: 'Titan Text', description: 'No longer offered', disabled: true }] }],
  },
};
export const DescriptionsAndGroupsDark: Story = {
  ...DescriptionsAndGroups,
  decorators: [(S) => <div data-theme="dark" className="bg-surface p-4"><S /></div>],
};
/** `searchable`: the same options through the library Combobox. */
export const Searchable: Story = {
  args: { 'aria-label': 'Provider', options: providerOptions, value: '', searchable: true, placeholder: 'Search providers', className: 'w-72', onChange: () => {} },
};
/** `native` — opt-in platform element with its reason, for a real need only. */
export const NativeEscapeHatch: Story = {
  args: { 'aria-label': 'Provider', options: providerOptions, value: 'anthropic', native: { reason: 'Mobile OS picker for a long list' }, className: 'w-72', onChange: () => {} },
};
