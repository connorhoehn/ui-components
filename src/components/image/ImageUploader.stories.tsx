import { vi } from 'vitest';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageUploader } from './ImageUploader';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
  type UploadedImage,
} from '../pipelines/services';

// ---------------------------------------------------------------------------
// Shared stub services
// ---------------------------------------------------------------------------

const SAMPLE_ID = 'img_sample';
const SAMPLE_SRC = 'https://picsum.photos/seed/uploader/400/400';

const successServices: PipelineEditorServices = {
  getImageUrl: (id) => (id === SAMPLE_ID ? SAMPLE_SRC : `https://cdn.example.com/${id}`),
  uploadImage: vi.fn(async (_input: File | { url: string }): Promise<UploadedImage> => {
    await new Promise((r) => setTimeout(r, 600));
    return { imageId: SAMPLE_ID, width: 400, height: 400, mimeType: 'image/jpeg', sizeBytes: 12345 };
  }),
};

const noUploadServices: PipelineEditorServices = {
  getImageUrl: (id) => `https://cdn.example.com/${id}`,
  // uploadImage intentionally omitted
};

const errorServices: PipelineEditorServices = {
  getImageUrl: (id) => `https://cdn.example.com/${id}`,
  uploadImage: vi.fn(async (_input: File | { url: string }): Promise<UploadedImage> => {
    await new Promise((r) => setTimeout(r, 400));
    throw new Error('Storage quota exceeded. Try a smaller image.');
  }),
};

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Image/ImageUploader',
  component: ImageUploader,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story, context) => {
      const svc =
        context.name === 'NoServicesProvider'
          ? undefined
          : context.name === 'ErrorOnUpload'
            ? errorServices
            : context.name === 'NoUploadServiceWired'
              ? noUploadServices
              : successServices;
      if (!svc) return <Story />;
      return (
        <PipelineEditorServicesProvider services={svc}>
          <div className="w-[400px]">
            <Story />
          </div>
        </PipelineEditorServicesProvider>
      );
    },
  ],
} satisfies Meta<typeof ImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Empty: Story = {
  args: { value: null, onChange: vi.fn() },
};

export const FileOnly: Story = {
  name: 'FileOnly',
  args: { value: null, onChange: vi.fn(), fileOnly: true },
};

export const UrlOnly: Story = {
  name: 'UrlOnly',
  args: { value: null, onChange: vi.fn(), urlOnly: true },
};

export const WithValue: Story = {
  args: {
    value: { imageId: SAMPLE_ID, width: 400, height: 400, mimeType: 'image/jpeg' },
    onChange: vi.fn(),
  },
};

export const ErrorOnUpload: Story = {
  name: 'ErrorOnUpload',
  args: { value: null, onChange: vi.fn() },
};

export const NoUploadServiceWired: Story = {
  name: 'NoUploadServiceWired',
  args: { value: null, onChange: vi.fn() },
};

export const NoUploadWired: Story = {
  name: 'NoUploadWired',
  decorators: [
    (Story) => (
      <PipelineEditorServicesProvider services={noUploadServices}>
        <div className="w-[400px]">
          <Story />
        </div>
      </PipelineEditorServicesProvider>
    ),
  ],
  args: { value: null, onChange: vi.fn() },
};
