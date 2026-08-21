import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CodeEditor from './CodeEditor';

const meta = {
  title: 'Shared/CodeEditor',
  component: CodeEditor,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CodeEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { value: '', onChange: () => {} },
  render: () => {
    const [value, setValue] = useState('const total = items\n  .map((i) => i.price)\n  .reduce((a, b) => a + b, 0);');
    return <CodeEditor value={value} onChange={setValue} language="javascript" minLines={5} />;
  },
};

export const WithVariablePills: Story = {
  args: { value: '', onChange: () => {} },
  render: () => {
    const [value, setValue] = useState('{{context.trigger.userId}}');
    return (
      <CodeEditor
        value={value}
        onChange={setValue}
        language="template"
        variables={['context.trigger.userId', 'context.steps.llm-1.output']}
      />
    );
  },
};

export const ReadOnly: Story = {
  args: { value: '$.items[*].price', onChange: () => {}, language: 'jsonpath', readOnly: true },
};
