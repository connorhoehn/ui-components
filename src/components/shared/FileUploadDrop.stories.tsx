import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUploadDrop } from './FileUploadDrop';

const meta = {
  title: 'Shared/FileUploadDrop',
  component: FileUploadDrop,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    onFiles: (files: File[]) => console.log('Files received:', files.map(f => f.name)),
  },
} satisfies Meta<typeof FileUploadDrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const ImagesOnly: Story = {
  args: {
    accept: 'image/*',
    label: 'Upload an image',
  },
};

export const WithMaxSize: Story = {
  args: {
    maxSize: 5 * 1024 * 1024,
    label: 'Drop a file (max 5 MB)',
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    label: 'Drop files here (multiple allowed)',
  },
};

export const PdfOnly: Story = {
  args: {
    accept: '.pdf',
    label: 'Upload a PDF document',
    maxSize: 10 * 1024 * 1024,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Upload disabled',
  },
};
