import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageLightbox, type ImageLightboxImage } from './ImageLightbox';

const IMAGES: ImageLightboxImage[] = [
  { src: 'https://picsum.photos/seed/lightbox-1/1200/800', alt: 'Forest', caption: 'Forest — generated output 1 of 4' },
  { src: 'https://picsum.photos/seed/lightbox-2/800/1200', alt: 'Portrait', caption: 'Portrait orientation' },
  { src: 'https://picsum.photos/seed/lightbox-3/1200/1200', alt: 'Square' },
  { src: 'https://picsum.photos/seed/lightbox-4/1600/700', alt: 'Wide', caption: 'Very wide crop' },
];

const meta = {
  title: 'Shared/ImageLightbox',
  component: ImageLightbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ImageLightbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled harness: a thumb grid that opens the lightbox at the clicked
// index — the way node bodies use it.
function GalleryDemo({ images }: { images: ImageLightboxImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <>
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className="h-20 w-20 overflow-hidden rounded-md border border-slate-200 p-0 cursor-pointer"
            onClick={() => setOpenIndex(i)}
          >
            <img src={img.src} alt={img.alt ?? ''} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <ImageLightbox
        images={images}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}

export const Gallery: Story = {
  args: { images: IMAGES, openIndex: null, onClose: () => {} },
  render: (args) => <GalleryDemo images={args.images} />,
};

export const SingleImage: Story = {
  args: { images: IMAGES.slice(0, 1), openIndex: null, onClose: () => {} },
  render: (args) => <GalleryDemo images={args.images} />,
};

// Omits onNavigate — prev/next/arrows use the internal fallback state.
function UncontrolledDemo({ images }: { images: ImageLightboxImage[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Open lightbox (internal nav state)
      </button>
      <ImageLightbox
        images={images}
        openIndex={open ? 0 : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export const UncontrolledNavigation: Story = {
  args: { images: IMAGES, openIndex: null, onClose: () => {} },
  render: (args) => <UncontrolledDemo images={args.images} />,
};
