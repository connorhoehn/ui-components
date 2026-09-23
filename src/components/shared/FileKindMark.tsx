// FileKindMark — the small square glyph that says what KIND of file a row is:
// a page, a presentation, a recording, a transcript, a diagram, a folder.
//
// The documents explorer, the workbench header and the composer's context
// chip all need the same mark, and the handoff prototype drew it with a
// 16-property inline style object per call. One component, tone tokens only,
// so the three places cannot drift apart and the mark follows dark mode.
//
// Decorative by default (`aria-hidden`): the file's NAME sits right beside it
// and is what a screen reader should read. Pass `label` when the mark stands
// alone and has to say what it is.

import type { SVGProps } from 'react';
import { cn } from '../../lib/cn';
import { DocumentIcon, FolderIcon, TranscribeIcon, VideoCallIcon, WhiteboardIcon } from '../ui/Icons';

export type FileKind = 'page' | 'presentation' | 'recording' | 'transcript' | 'diagram' | 'folder';

export type FileKindMarkSize = 'sm' | 'md' | 'lg';

export interface FileKindMarkProps {
  kind: FileKind;
  /** `sm` 18px (tree rows), `md` 22px (default, headers), `lg` 28px. */
  size?: FileKindMarkSize;
  /** Accessible name. Omit when the file's name is already beside the mark. */
  label?: string;
  className?: string;
  'data-testid'?: string;
}

/** What each kind is called, for a caller building a "Page · Sprint planning" line. */
export const FILE_KIND_LABELS: Record<FileKind, string> = {
  page: 'Page',
  presentation: 'Presentation',
  recording: 'Recording',
  transcript: 'Transcript',
  diagram: 'Diagram',
  folder: 'Folder',
};

const TONE: Record<FileKind, string> = {
  page: 'bg-info-bg text-info-fg',
  presentation: 'bg-accent-bg text-accent-fg',
  recording: 'bg-danger-bg text-danger-fg',
  transcript: 'bg-warning-bg text-warning-fg',
  diagram: 'bg-success-bg text-success-fg',
  folder: 'bg-surface-hover text-text-secondary',
};

const BOX: Record<FileKindMarkSize, string> = {
  sm: 'h-[18px] w-[18px] rounded',
  md: 'h-[22px] w-[22px] rounded-[5px]',
  lg: 'h-7 w-7 rounded-md',
};

const GLYPH: Record<FileKindMarkSize, number> = { sm: 12, md: 14, lg: 16 };

/** A slide with a title bar — the library's Icons set has no presentation glyph. */
function SlidesGlyph({ size }: { size: number } & Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="12" height="8.5" rx="1" />
      <path d="M4.5 6h5M4.5 8.5h3M8 11.5V14M6 14h4" />
    </svg>
  );
}

export function FileKindMark({ kind, size = 'md', label, className, 'data-testid': testId = 'file-kind-mark' }: FileKindMarkProps) {
  const px = GLYPH[size];
  const glyph = {
    page: <DocumentIcon size={px} />,
    presentation: <SlidesGlyph size={px} />,
    recording: <VideoCallIcon size={px} />,
    transcript: <TranscribeIcon size={px} />,
    diagram: <WhiteboardIcon size={px} />,
    folder: <FolderIcon size={px} />,
  }[kind];
  return (
    <span
      data-testid={testId}
      data-kind={kind}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      className={cn('inline-grid shrink-0 place-items-center', BOX[size], TONE[kind], className)}
    >
      {glyph}
    </span>
  );
}

export default FileKindMark;
