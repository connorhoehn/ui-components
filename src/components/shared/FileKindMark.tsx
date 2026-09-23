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
//
// 2.380.0: the pipelines directory groups work by what it produces, so the
// mark learned the kinds a pipeline row can be — `agent` (sparkle),
// `experiment` (flask), `call` (phone), `conversation` (chat bubble), `media`
// (image), `workflow` (branch) — and a `plain` variant: the glyph alone in the
// secondary text colour, no tinted box, for a dense list where twelve coloured
// squares would out-shout the titles.

import type { SVGProps } from 'react';
import { cn } from '../../lib/cn';
import { BranchIcon, ChatIcon, DocumentIcon, FolderIcon, PhoneIcon, TranscribeIcon, VideoCallIcon, WhiteboardIcon } from '../ui/Icons';

export type FileKind =
  | 'page'
  | 'presentation'
  | 'recording'
  | 'transcript'
  | 'diagram'
  | 'folder'
  | 'agent'
  | 'experiment'
  | 'call'
  | 'conversation'
  | 'media'
  | 'workflow';

export type FileKindMarkVariant = 'tinted' | 'plain';

export type FileKindMarkSize = 'sm' | 'md' | 'lg' | 'xl';

export interface FileKindMarkProps {
  kind: FileKind;
  /** `sm` 18px (tree rows), `md` 22px (default), `lg` 28px, `xl` 32px (an editor's title row). */
  size?: FileKindMarkSize;
  /** Accessible name. Omit when the file's name is already beside the mark. */
  label?: string;
  /**
   * `tinted` (default) is the glyph in a coloured box, one colour per kind.
   * `plain` is the glyph alone, secondary ink, same box size — for a list row
   * whose title is the thing to read.
   */
  variant?: FileKindMarkVariant;
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
  agent: 'Agent',
  experiment: 'Experiment',
  call: 'Call',
  conversation: 'Conversation',
  media: 'Media',
  workflow: 'Workflow',
};

const TONE: Record<FileKind, string> = {
  page: 'bg-info-bg text-info-fg',
  presentation: 'bg-accent-bg text-accent-fg',
  recording: 'bg-danger-bg text-danger-fg',
  transcript: 'bg-warning-bg text-warning-fg',
  diagram: 'bg-success-bg text-success-fg',
  folder: 'bg-surface-hover text-text-secondary',
  agent: 'bg-accent-bg text-accent-fg',
  experiment: 'bg-warning-bg text-warning-fg',
  call: 'bg-success-bg text-success-fg',
  conversation: 'bg-info-bg text-info-fg',
  media: 'bg-accent-bg text-accent-fg',
  workflow: 'bg-surface-hover text-text-secondary',
};

const PLAIN = 'bg-transparent text-text-secondary';

const BOX: Record<FileKindMarkSize, string> = {
  sm: 'h-[18px] w-[18px] rounded',
  md: 'h-[22px] w-[22px] rounded-[5px]',
  lg: 'h-7 w-7 rounded-md',
  xl: 'h-8 w-8 rounded-lg',
};

const GLYPH: Record<FileKindMarkSize, number> = { sm: 12, md: 14, lg: 16, xl: 20 };

type GlyphProps = { size: number } & Omit<SVGProps<SVGSVGElement>, 'children'>;

function svgProps(size: number) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };
}

/** A four-point star with a small companion — the agent's mark. */
function SparkleGlyph({ size }: GlyphProps) {
  return (
    <svg {...svgProps(size)}>
      <path d="M7 2.5c.4 2.6 1.6 3.8 4.2 4.2-2.6.4-3.8 1.6-4.2 4.2-.4-2.6-1.6-3.8-4.2-4.2C5.4 6.3 6.6 5.1 7 2.5Z" />
      <path d="M12.5 10.5c.2 1.2.8 1.8 2 2-1.2.2-1.8.8-2 2-.2-1.2-.8-1.8-2-2 1.2-.2 1.8-.8 2-2Z" />
    </svg>
  );
}

/** An Erlenmeyer flask — an experiment. */
function FlaskGlyph({ size }: GlyphProps) {
  return (
    <svg {...svgProps(size)}>
      <path d="M6.5 2h3M7 2v4.2L3.4 12.3A1 1 0 0 0 4.3 14h7.4a1 1 0 0 0 .9-1.7L9 6.2V2" />
      <path d="M5.2 10.5h5.6" />
    </svg>
  );
}

/** A framed picture with a sun and a hill — media. */
function ImageGlyph({ size }: GlyphProps) {
  return (
    <svg {...svgProps(size)}>
      <rect x="2" y="3" width="12" height="10" rx="1.5" />
      <circle cx="6" cy="6.5" r="1.2" />
      <path d="M14 10.5 10.8 7.8 6.5 12M2 12l2.6-2.4 1.8 1.6" />
    </svg>
  );
}

/** A slide with a title bar — the library's Icons set has no presentation glyph. */
function SlidesGlyph({ size }: { size: number } & Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="12" height="8.5" rx="1" />
      <path d="M4.5 6h5M4.5 8.5h3M8 11.5V14M6 14h4" />
    </svg>
  );
}

export function FileKindMark({ kind, size = 'md', variant = 'tinted', label, className, 'data-testid': testId = 'file-kind-mark' }: FileKindMarkProps) {
  const px = GLYPH[size];
  const glyph = {
    page: <DocumentIcon size={px} />,
    presentation: <SlidesGlyph size={px} />,
    recording: <VideoCallIcon size={px} />,
    transcript: <TranscribeIcon size={px} />,
    diagram: <WhiteboardIcon size={px} />,
    folder: <FolderIcon size={px} />,
    agent: <SparkleGlyph size={px} />,
    experiment: <FlaskGlyph size={px} />,
    call: <PhoneIcon size={px} />,
    conversation: <ChatIcon size={px} />,
    media: <ImageGlyph size={px} />,
    workflow: <BranchIcon size={px} />,
  }[kind];
  return (
    <span
      data-testid={testId}
      data-kind={kind}
      data-variant={variant}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      className={cn('inline-grid shrink-0 place-items-center', BOX[size], variant === 'plain' ? PLAIN : TONE[kind], className)}
    >
      {glyph}
    </span>
  );
}

export default FileKindMark;
