// src/components/image/imageMaxWidth.ts
//
// The named widths a picture can be held to (`maxWidth` on `ImageThumbnail`
// and `ImageCompare`), on Tailwind's container scale (`--container-xs` 20rem,
// `-sm` 24rem, `-md` 28rem, `-lg` 32rem), so a page never adds a `max-w-*`
// utility of its own. Since 2.545.0.

export type ImageMaxWidth = 'xs' | 'sm' | 'md' | 'lg';

export const IMAGE_MAX_WIDTH: Record<ImageMaxWidth, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};
