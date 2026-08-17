// src/components/image/ImageThumbnail.tsx
//
// Square / aspect-ratio image preview with skeleton loading state and a
// graceful error fallback. Uses Tailwind utility classes only — no inline style.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ImageThumbnailSize = 'sm' | 'md' | 'lg';
export type ImageThumbnailAspect = 'square' | 'video' | 'auto';

export interface ImageThumbnailProps {
  src: string;
  alt: string;
  size?: ImageThumbnailSize;
  aspectRatio?: ImageThumbnailAspect;
  rounded?: boolean;
  /** Rendered when the image fails to load. Defaults to a broken-image icon. */
  fallback?: ReactNode;
  loading?: 'lazy' | 'eager';
  className?: string;
  'data-testid'?: string;
}

const sizeClasses: Record<ImageThumbnailSize, string> = {
  sm: 'w-16',
  md: 'w-32',
  lg: 'w-48',
};

const aspectClasses: Record<ImageThumbnailAspect, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  auto: '',
};

// Default broken-image icon — no external dependency.
function BrokenImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-text-tertiary"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

export function ImageThumbnail({
  src,
  alt,
  size = 'md',
  aspectRatio = 'square',
  rounded = false,
  fallback,
  loading = 'lazy',
  className,
  'data-testid': testId,
}: ImageThumbnailProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div
      data-testid={testId}
      className={cn(
        'relative overflow-hidden bg-surface-hover',
        sizeClasses[size],
        aspectRatio !== 'auto' && aspectClasses[aspectRatio],
        rounded ? 'rounded-full' : 'rounded-md',
        className,
      )}
    >
      {/* Skeleton shown while loading */}
      {status === 'loading' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-surface-emphasis"
        />
      )}

      {/* Error fallback */}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-hover">
          {fallback ?? <BrokenImageIcon />}
        </div>
      )}

      {/* The image itself — always rendered so load/error events fire */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-200',
          status === 'loaded' ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
}

export default ImageThumbnail;
