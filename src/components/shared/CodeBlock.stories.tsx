import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';

const meta = {
  title: 'Shared/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    language: { control: 'select', options: ['tsx', 'ts', 'json', 'bash', 'text'] },
    theme: { control: 'radio', options: ['dark', 'light'] },
    copyButton: { control: 'boolean' },
    showLineNumbers: { control: 'boolean' },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const TSX_SAMPLE = `import { Button } from '@connorhoehn/ui-components';

export function App() {
  return <Button variant="primary">Hello</Button>;
}`;

const JSON_SAMPLE = `{
  "name": "@connorhoehn/ui-components",
  "version": "2.11.0",
  "scripts": {
    "build": "vite build",
    "test": "vitest run"
  }
}`;

const BASH_SAMPLE = `# Install and start the demo
npm install
npm run demo
# Visit $URL`;

export const TsxDark: Story = {
  args: { code: TSX_SAMPLE, language: 'tsx', theme: 'dark' },
};

export const TsxLight: Story = {
  args: { code: TSX_SAMPLE, language: 'tsx', theme: 'light' },
};

export const JsonDark: Story = {
  args: { code: JSON_SAMPLE, language: 'json', theme: 'dark' },
};

export const JsonLight: Story = {
  args: { code: JSON_SAMPLE, language: 'json', theme: 'light' },
};

export const BashDark: Story = {
  args: { code: BASH_SAMPLE, language: 'bash', theme: 'dark' },
};

export const BashLight: Story = {
  args: { code: BASH_SAMPLE, language: 'bash', theme: 'light' },
};

export const WithLineNumbers: Story = {
  args: { code: TSX_SAMPLE, language: 'tsx', theme: 'dark', showLineNumbers: true },
};

export const NoCopyButton: Story = {
  args: { code: TSX_SAMPLE, language: 'tsx', copyButton: false },
};
