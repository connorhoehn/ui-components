import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { JsonPathInput } from './JsonPathInput';
import type { JsonPathSample } from './JsonPathInput';

const imageSamples: JsonPathSample[] = [
  { label: '$.trigger.imageRef', value: '$.trigger.imageRef' },
  { label: '$.result.image',     value: '$.result.image' },
  { label: '$.frames[0]',        value: '$.frames[0]' },
];

function Controlled(props: React.ComponentProps<typeof JsonPathInput>) {
  const [val, setVal] = useState(props.value ?? '');
  return (
    <div className="w-80">
      <JsonPathInput {...props} value={val} onChange={setVal} />
    </div>
  );
}

const meta = {
  title: 'Forms/JsonPathInput',
  component: JsonPathInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    enforcePrefix: { control: 'boolean' },
  },
} satisfies Meta<typeof JsonPathInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    value: '',
    onChange: () => {},
    placeholder: '$.path.to.value',
    size: 'md',
  },
};

export const WithSamples: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    value: '$.trigger.imageRef',
    onChange: () => {},
    samples: imageSamples,
    size: 'md',
  },
};

export const InvalidWithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    value: 'not.a.path',
    onChange: () => {},
    invalid: true,
    errorMessage: 'JSONPath must start with "$."',
    samples: imageSamples,
    size: 'md',
  },
};

export const SmVsMd: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <p className="text-[11px] text-text-tertiary mb-1">sm</p>
        <Controlled
          size="sm"
          samples={imageSamples}
          value="$.trigger.imageRef"
          onChange={() => {}}
        />
      </div>
      <div>
        <p className="text-[11px] text-text-tertiary mb-1">md</p>
        <Controlled
          size="md"
          samples={imageSamples}
          value="$.trigger.imageRef"
          onChange={() => {}}
        />
      </div>
    </div>
  ),
  args: {
    value: '',
    onChange: () => {},
  },
};

export const EnforcePrefix: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    value: 'oops',
    onChange: () => {},
    enforcePrefix: true,
    size: 'md',
  },
};
