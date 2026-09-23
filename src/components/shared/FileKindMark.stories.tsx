import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileKindMark, FILE_KIND_LABELS, type FileKind } from './FileKindMark';

const meta = {
  title: 'Shared/FileKindMark',
  component: FileKindMark,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FileKindMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = { args: { kind: 'page' } };

/** Every kind at every size, with the name each one stands for. */
export const AllKinds: Story = {
  args: { kind: 'page' },
  render: () => (
    <ul className="m-0 grid list-none grid-cols-3 gap-3 p-0">
      {(Object.keys(FILE_KIND_LABELS) as FileKind[]).map((kind) => (
        <li key={kind} className="flex items-center gap-2 text-sm text-text-primary">
          <FileKindMark kind={kind} size="sm" />
          <FileKindMark kind={kind} />
          <FileKindMark kind={kind} size="lg" />
          {FILE_KIND_LABELS[kind]}
        </li>
      ))}
    </ul>
  ),
};
