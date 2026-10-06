// Icons — small, general-purpose SVG glyphs for controls that are not tied
// to one composite (a "new" button in a rail header, a close in a dialog).
// Stroke-based on currentColor, so they take the button's text colour. The
// call-specific set lives in `video/MediaIcons`; this is the plain set.

import type { SVGProps } from 'react';

export interface GlyphProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Rendered size in px. Default 16 — sized for an `IconButton size="sm"`. */
  size?: number;
}

function base(size: number, rest: Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...rest,
  };
}

/** A plus: "make a new one". */
export function PlusIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  );
}

/** An X: "close", "dismiss". */
export function CloseIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/** A speech bubble: a conversation, a comment. */
export function ChatIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M13.5 10a1.5 1.5 0 0 1-1.5 1.5H5.5L2.5 14V3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5z" />
    </svg>
  );
}

/**
 * A speech bubble with two lines of text: comments ON something — a thread
 * anchored to a page or a slide — as opposed to `ChatIcon`'s conversation.
 * The two sit side by side on the documents rail (the workbench's Comments
 * entry beside the Conversation panel), so they must not be the same glyph;
 * `QuoteIcon` was tried there and read as "55" at 14px. Since 2.384.2.
 */
export function CommentIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2.5 3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 12 10H7l-3 3v-3H4a1.5 1.5 0 0 1-1.5-1.5z" />
      <path d="M5.5 5.5h5M5.5 7.5h3" />
    </svg>
  );
}

/**
 * A magnifier: "search", or "nothing matched what you typed".
 *
 * The same geometry `SearchInput` draws inline in its own gutter, lifted out
 * because the empty state that follows a fruitless search needs the mark too
 * and had been reaching for the 🔍 emoji — which ignores `currentColor` and so
 * stayed bright on muted chrome. Two copies of one circle-and-tail is a
 * drift the type system cannot see, so the field should adopt this next time
 * that file is opened.
 */
export function SearchIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5 14 14" />
    </svg>
  );
}

/** A tray with an arrow out of it: "share", "post this somewhere". */
export function ShareIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 8.5V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5M10.5 4.5 8 2 5.5 4.5M8 2v8" />
    </svg>
  );
}

/** A chevron. `dir` is where it points. */
export function ChevronIcon({ size = 16, dir = 'down', ...rest }: GlyphProps & { dir?: 'up' | 'down' | 'left' | 'right' }) {
  const d = dir === 'down' ? 'M4 6l4 4 4-4' : dir === 'up' ? 'M4 10l4-4 4 4' : dir === 'left' ? 'M10 4 6 8l4 4' : 'M6 4l4 4-4 4';
  return (
    <svg {...base(size, rest)}>
      <path d={d} />
    </svg>
  );
}

/** A clock: history, "when". */
export function HistoryIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 5v3l2 1.5" />
    </svg>
  );
}

/** A page with a folded corner: a document, a file. */
export function DocumentIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M9.5 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.5z" />
      <path d="M9.5 2v3.5H13M6 9h4M6 11.5h4" />
    </svg>
  );
}

/**
 * A board with a shape and a connector on it: a whiteboard.
 *
 * Deliberately not the document glyph with something added. A whiteboard is a
 * different authoring surface, not a document variant — the two sit next to
 * each other in the conversation's Documents tab and have to be told apart at
 * a glance.
 */
export function WhiteboardIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2" y="3" width="12" height="9" rx="1.5" />
      <rect x="4.25" y="5.5" width="3.5" height="2.75" rx="0.5" />
      <circle cx="11" cy="9.25" r="1.5" />
      <path d="M7.75 6.875H9.5" />
    </svg>
  );
}

/** A box with an arrow leaving its corner: "open this in its own view". */
export function PopOutIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M7 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9" />
      <path d="M9.5 2.5H13.5V6.5" />
      <path d="M13.5 2.5 7.5 8.5" />
    </svg>
  );
}

/** A pencil: "change this". */
export function EditIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M11.5 2.5 13.5 4.5 5.5 12.5H3.5V10.5z" />
      <path d="M10 4l2 2" />
    </svg>
  );
}

/** A bin: "remove this". */
export function TrashIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 4.5h10" />
      <path d="M6.5 4.5V3h3v1.5" />
      <path d="M4.5 4.5 5 13h6l.5-8.5" />
      <path d="M7 7v4M9 7v4" />
    </svg>
  );
}

/** A pushpin: "keep this at the top". */
export function PinIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M5.5 2h5" />
      <path d="M6.5 2v3.5L5 8.5h6L9.5 5.5V2" />
      <path d="M8 8.5V14" />
    </svg>
  );
}

/**
 * A folder: "file this under something of your own".
 *
 * The tab is drawn short and offset left so it reads as a folder rather than
 * as a rectangle with a bite out of it at 14px, which is the size the
 * conversation row menu uses it at.
 */
export function FolderIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2 4.5a1 1 0 0 1 1-1h3l1.5 2H13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
    </svg>
  );
}

/** A bell: "notifications", "activity" — the header's inbox trigger. Since 2.407.37. */
export function BellIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M4 11.5h8l-1-1.5V7a3 3 0 0 0-6 0v3z" />
      <path d="M6.8 13.3a1.3 1.3 0 0 0 2.4 0" />
    </svg>
  );
}

/** A bell with a slash through it: "notify me quietly". */
export function BellMutedIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M4.6 11.5h6.8l-.8-1.4V7a2.7 2.7 0 0 0-4.2-2.2" />
      <path d="M5.3 6.3V7v3.1l-.7 1.4" />
      <path d="M6.9 13.2a1.2 1.2 0 0 0 2.2 0" />
      <path d="M2.5 2.5 13.5 13.5" />
    </svg>
  );
}

/** A padlock: "private", "restricted to specific people". */
export function LockIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3.5" y="7.5" width="9" height="6" rx="1.2" />
      <path d="M5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

/** A hooked arrow: forwarded — this came from somewhere else. */
export function ForwardIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 4.5v3a3 3 0 0 0 3 3h6.5" />
      <path d="M10 8.2l2.8 2.3L10 12.8" />
    </svg>
  );
}

/** An eye: watching, "N people are seeing this". */
export function EyeIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M1.8 8s2.4-4 6.2-4 6.2 4 6.2 4-2.4 4-6.2 4S1.8 8 1.8 8z" />
      <circle cx="8" cy="8" r="1.8" />
    </svg>
  );
}

/** `EyeIcon` with a slash through it: hidden — not visible to others. */
export function EyeOffIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2.3 4.6C3.6 6 5.6 7.2 8 7.2s4.4-1.2 5.7-2.6M2.3 11.4c.6-.66 1.28-1.24 2.02-1.72M13.7 11.4a11 11 0 0 1-2.02-1.72M6.3 12.6c.55.13 1.12.2 1.7.2s1.15-.07 1.7-.2" />
      <path d="M2 2l12 12" />
    </svg>
  );
}

/** A handset: start a voice call. */
export function PhoneIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M5.2 2.8 3.4 4.6c-.5.5-.6 1.3-.2 1.9a15 15 0 0 0 6.3 6.3c.6.4 1.4.3 1.9-.2l1.8-1.8-2.6-1.7-1.3 1a11 11 0 0 1-3.4-3.4l1-1.3z" />
    </svg>
  );
}

/** A camera body: start a video call. Distinct from video/MediaIcons' VideoIcon, which is a call CONTROL. */
export function VideoCallIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2" y="4.5" width="8.5" height="7" rx="1.5" />
      <path d="M10.5 8.2 14 6.2v3.6l-3.5-2z" />
    </svg>
  );
}

/** A lightning bolt: activity, "things are happening". */
export function ActivityIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M8.5 2 4 9h3.2l-.7 5L12 7H8.8z" />
    </svg>
  );
}

/** An @ sign: mentions, "someone named you". */
export function AtIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="8.3" r="2.8" />
      <path d="M10.8 8.3v.9a1.9 1.9 0 0 0 3.7 0V8a6.5 6.5 0 1 0-2.8 5.4" />
    </svg>
  );
}

/** A crescent: the dark theme — "switch to (or currently in) dark mode". */
export function MoonIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M14 8.53A6 6 0 1 1 7.47 2 4.67 4.67 0 0 0 14 8.53z" />
    </svg>
  );
}

/** A sun: the light theme — "switch to (or currently in) light mode". */
export function SunIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" />
    </svg>
  );
}

/** Three stacked bars: "open the menu", or "unfold the rail this collapsed into". */
export function MenuIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
    </svg>
  );
}

/** A microphone on a stand: turn what is being said into text. Distinct from
 *  video/MediaIcons' MicIcon, which is a call's mute CONTROL. */
export function TranscribeIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="6" y="1.75" width="4" height="7.5" rx="2" />
      <path d="M3.5 7.5a4.5 4.5 0 0 0 9 0" />
      <path d="M8 12v2M5.5 14h5" />
    </svg>
  );
}

/** A trunk with a branch leaving it: a flow that splits — a pipeline, a branch. */
export function BranchIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="4.5" cy="3.5" r="1.5" />
      <circle cx="4.5" cy="12.5" r="1.5" />
      <circle cx="11.5" cy="3.5" r="1.5" />
      <path d="M4.5 5v6" />
      <path d="M11.5 5v1.5a3 3 0 0 1-3 3H4.5" />
    </svg>
  );
}

/** Three joined nodes: a graph of connections, "how these relate". */
export function GraphIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="3.5" cy="8" r="1.75" />
      <circle cx="12.5" cy="3.5" r="1.75" />
      <circle cx="12.5" cy="12.5" r="1.75" />
      <path d="M5.1 7.2 10.9 4.3M5.1 8.8l5.8 2.9M12.5 5.25v5.5" />
    </svg>
  );
}

/** Bars on a baseline: measurements, "how much of this over time". */
export function ChartIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2.5 13.5h11" />
      <path d="M4.5 13.5V9M8 13.5V4M11.5 13.5V7" />
    </svg>
  );
}

/** Angle brackets around a slash: source, "the developer-facing thing". */
export function CodeIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M5.5 5.5 2.5 8l3 2.5M10.5 5.5 13.5 8l-3 2.5M9.3 3.5 6.7 12.5" />
    </svg>
  );
}

/** A jigsaw piece: something that plugs in — a capability, an optional part. */
export function PuzzleIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3.2 3.2H6.3a1.7 1.7 0 0 0 3.4 0H12.8V6.3a1.7 1.7 0 0 1 0 3.4V12.8H3.2z" />
    </svg>
  );
}

/** Two arrows chasing each other: something that runs again — a loop, a re-run. */
export function RepeatIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 7v-.5A3.5 3.5 0 0 1 6.5 3H12" />
      <path d="M10 1.5 12 3.5 10 5.5" />
      <path d="M13 9v.5a3.5 3.5 0 0 1-3.5 3.5H4" />
      <path d="M6 10.5 4 12.5 6 14.5" />
    </svg>
  );
}

/** A paperclip: a file came along with this. */
export function PaperclipIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M14.3 7.4 8.2 13.5a4 4 0 0 1-5.7-5.7l6.2-6.1a2.7 2.7 0 0 1 3.8 3.8l-6.2 6.1a1.3 1.3 0 0 1-1.9-1.9l5.7-5.6" />
    </svg>
  );
}

/** Two chain links: a hyperlink — "point this at a URL", or "copy the URL". */
export function LinkIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M6.8 11H5.5a3 3 0 0 1 0-6h1.3" />
      <path d="M9.2 5h1.3a3 3 0 0 1 0 6H9.2" />
      <path d="M6 8h4" />
    </svg>
  );
}

/** A pair of quotation marks: a quoted passage — a blockquote. */
export function QuoteIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M6.5 4.5h-3v3h3v1.5a2 2 0 0 1-2 2" />
      <path d="M13 4.5h-3v3h3v1.5a2 2 0 0 1-2 2" />
    </svg>
  );
}

/** A smiling face: pick an emoji. The button, not the emoji — a reaction a
 *  person actually left stays the character they chose. */
export function SmileyIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M6.2 6.6h.01M9.8 6.6h.01" />
      <path d="M5.5 9.3c.6.9 1.5 1.4 2.5 1.4s1.9-.5 2.5-1.4" />
    </svg>
  );
}

/** A hooked arrow pointing back: reply. ForwardIcon's mirror, because the two
 *  are the same gesture pointed different ways. */
export function ReplyIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M13 4.5v3a3 3 0 0 1-3 3H3.5" />
      <path d="M6 8.2 3.2 10.5 6 12.8" />
    </svg>
  );
}

/** A circled "i": "more about this" — an estimate's confidence, a footnote. Since 2.385.0. */
export function InfoIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7.2v3.6" />
      <path d="M8 5.1v.1" />
    </svg>
  );
}

/** An arrow pointing right: "go on" — a link action, "Prepare run →". Since 2.385.0. */
export function ArrowRightIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 8h10" />
      <path d="M9 4l4 4-4 4" />
    </svg>
  );
}

/**
 * An arrow leaving to the upper right, with no box: "opens somewhere else" —
 * the ↗ after "Repository" on an outlined link button. `PopOutIcon` is the
 * boxed variant ("open in its own view"). Since 2.390.0.
 */
export function ExternalLinkIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M4.5 11.5 11.5 4.5" />
      <path d="M5.5 4.5h6v6" />
    </svg>
  );
}

/** Two people: "shared with me", a group. Since 2.385.0. */
export function PeopleIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="6" cy="5.5" r="2.2" />
      <path d="M2 13c.4-2.2 2-3.5 4-3.5s3.6 1.3 4 3.5" />
      <path d="M10.3 3.6a2.2 2.2 0 0 1 0 4" />
      <path d="M11.3 9.7c1.4.4 2.4 1.6 2.7 3.3" />
    </svg>
  );
}

/** One head and shoulders: "a person" (a subject mask, one member). Since 2.390.0. */
export function PersonIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M3 13.5c.5-2.6 2.5-4.2 5-4.2s4.5 1.6 5 4.2" />
    </svg>
  );
}

/** An arrow pointing up: "send" on a round prompt button. Since 2.390.0. */
export function ArrowUpIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M8 13V3" />
      <path d="M4 7l4-4 4 4" />
    </svg>
  );
}

/** Six dots in two columns: a drag handle — "pick this up and move it". Since 2.385.0. */
export function GripIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, { ...rest, fill: 'currentColor', stroke: 'none' })}>
      <circle cx="6" cy="4" r="1.1" />
      <circle cx="10" cy="4" r="1.1" />
      <circle cx="6" cy="8" r="1.1" />
      <circle cx="10" cy="8" r="1.1" />
      <circle cx="6" cy="12" r="1.1" />
      <circle cx="10" cy="12" r="1.1" />
    </svg>
  );
}

/** A funnel: "filter this list". Since 2.385.0. */
export function FilterIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2.5 3.5h11l-4.2 5v4l-2.6 1.2V8.5z" />
    </svg>
  );
}

/** Three dots and three lines: a bulleted list. Since 2.386.0. */
export function ListIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M6 4h7.5M6 8h7.5M6 12h7.5" />
      <path d="M2.75 4h.01M2.75 8h.01M2.75 12h.01" strokeWidth={2} />
    </svg>
  );
}

/** A four-point sparkle with a small companion: the agent. Since 2.386.0. */
export function SparkleIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M7 2.5 8.2 5.8 11.5 7 8.2 8.2 7 11.5 5.8 8.2 2.5 7 5.8 5.8z" />
      <path d="M12.5 10.5v3M11 12h3" />
    </svg>
  );
}

/** A curved arrow back: "undo". Since 2.386.5. */
export function UndoIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M5.5 4 3 6.5 5.5 9" />
      <path d="M3 6.5h6.5a3.5 3.5 0 0 1 0 7H7" />
    </svg>
  );
}

/** A curved arrow forward: "redo". Since 2.386.5. */
export function RedoIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M10.5 4 13 6.5 10.5 9" />
      <path d="M13 6.5H6.5a3.5 3.5 0 0 0 0 7H9" />
    </svg>
  );
}

/** A framed picture with a sun and a hill: "image". Since 2.386.5. */
export function ImageIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2" y="3" width="12" height="10" rx="1.5" />
      <circle cx="6" cy="6.5" r="1.1" />
      <path d="M14 10.5 10.8 7.8 5 13" />
    </svg>
  );
}

/** Three dotted lines: "bulleted list". Since 2.386.5. */
export function BulletListIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M6 4h8M6 8h8M6 12h8" />
      <circle cx="2.8" cy="4" r=".6" fill="currentColor" />
      <circle cx="2.8" cy="8" r=".6" fill="currentColor" />
      <circle cx="2.8" cy="12" r=".6" fill="currentColor" />
    </svg>
  );
}

/** Three numbered lines: "numbered list". Since 2.386.5. */
export function NumberedListIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M6.5 4h7.5M6.5 8h7.5M6.5 12h7.5" />
      <path d="M2.2 2.8 3.2 2.3v3.2" strokeWidth={1.1} />
      <path d="M2.2 7.2c.3-.5 1.8-.6 1.8.3 0 .7-1.8 1.3-1.8 2h1.9" strokeWidth={1.1} />
      <path d="M2.2 11h1.7l-.9 1c.7 0 1 .3 1 .8 0 .8-1.3.9-1.8.4" strokeWidth={1.1} />
    </svg>
  );
}

/** Nested lines: "list style" / multilevel list. Since 2.386.5. */
export function ListStyleIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M5 3.5h9M7.5 8H14M10 12.5h4" />
      <circle cx="2.5" cy="3.5" r=".6" fill="currentColor" />
      <circle cx="5" cy="8" r=".6" fill="currentColor" />
      <circle cx="7.5" cy="12.5" r=".6" fill="currentColor" />
    </svg>
  );
}

/** A ticked box: "checklist". Since 2.386.5. */
export function ChecklistIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="2" />
      <path d="m5.3 8.2 1.9 1.9 3.6-4" />
    </svg>
  );
}

/** A marker tip over a stroke: "highlight". Since 2.386.5. */
export function HighlighterIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="m9.5 2.5 3 3-5 5H4.5v-3z" />
      <path d="M4.5 10.5 3 12h3" />
      <path d="M2 14.5h12" strokeWidth={2} />
    </svg>
  );
}

/** Three dots in a row: "more". Since 2.386.5. */
export function MoreIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, { ...rest, fill: 'currentColor', stroke: 'none' })}>
      <circle cx="3.5" cy="8" r="1.2" />
      <circle cx="8" cy="8" r="1.2" />
      <circle cx="12.5" cy="8" r="1.2" />
    </svg>
  );
}

/** A triangle with an exclamation mark: "warning", "check this first". Since 2.389.0. */
export function WarningIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M7.13 2.5a1 1 0 0 1 1.74 0l5.5 9.75a1 1 0 0 1-.87 1.5H2.5a1 1 0 0 1-.87-1.5z" />
      <path d="M8 6.2v3.3" />
      <path d="M8 11.4v.1" />
    </svg>
  );
}

/** A tray with an arrow leaving it: "upload". Since 2.389.6. */
export function UploadIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M8 10.5V2.5" />
      <path d="M5 5.5l3-3 3 3" />
      <path d="M2.5 10v2.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V10" />
    </svg>
  );
}

/** A tick: "done", "added". Since 2.389.6. */
export function CheckIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

/** A plus in a ring: "add this". Since 2.389.6. */
export function PlusCircleIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5.5v5M5.5 8h5" />
    </svg>
  );
}

/** Two sliders: "refine these results". Since 2.389.6. */
export function SlidersIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2.5 5h6M11.5 5h2M2.5 11h2M7.5 11h6" />
      <circle cx="10" cy="5" r="1.5" />
      <circle cx="6" cy="11" r="1.5" />
    </svg>
  );
}

/** A paper plane: "send" — the light prompt box's Send ("✈ Send"). Since 2.390.0. */
export function SendIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M14 2 7 9" />
      <path d="M14 2 9.5 14l-2.5-5-5-2.5z" />
    </svg>
  );
}

/** An arrow into a tray: "download". Since 2.390.3. */
export function DownloadIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M8 2.5v8" />
      <path d="M5 7.5l3 3 3-3" />
      <path d="M2.5 10v2.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V10" />
    </svg>
  );
}

/** A printer: "print". Since 2.390.3. */
export function PrinterIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M4.5 6V2.5h7V6" />
      <rect x="2" y="6" width="12" height="5.5" rx="1.2" />
      <path d="M4.5 9.5h7v4h-7z" />
    </svg>
  );
}

/** A play button in a ring: "run". Since 2.390.3. */
export function PlayCircleIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M6.8 5.9v4.2L10.2 8z" />
    </svg>
  );
}

/** Two stacked pages: "make a copy". Since 2.390.3. */
export function CopyIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5" />
    </svg>
  );
}

/** A page with a spark in its corner: "make something new from this". Since 2.390.3. */
export function DocumentAddIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M8 14H4.5A1.5 1.5 0 0 1 3 12.5v-9A1.5 1.5 0 0 1 4.5 2h5L13 5.5V8" />
      <path d="M9.5 2v3.5H13" />
      <circle cx="11.75" cy="11.75" r="2.25" />
      <path d="M11.75 10.9v1.7M10.9 11.75h1.7" />
    </svg>
  );
}

/** A page with a dashed block: "a template". Since 2.390.3. */
export function TemplateIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M9.5 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.5z" />
      <path d="M9.5 2v3.5H13" />
      <path d="M5.75 8.5h4.5v3h-4.5z" strokeDasharray="1.4 1.1" />
    </svg>
  );
}

/** A monitor on a stand: a computer — a provisioned box. Since 2.411.0. */
export function DesktopIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2" y="2.75" width="12" height="8.5" rx="1.25" />
      <path d="M6 14h4M8 11.25V14" />
    </svg>
  );
}

/** An open laptop: somebody's own machine rather than a provisioned box. Since 2.411.0. */
export function LaptopIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3.25" y="3.5" width="9.5" height="6.75" rx="1" />
      <path d="M1.75 12.5h12.5" />
    </svg>
  );
}

/** A frame split into a main pane and two stacked ones: "split layout". Since 2.411.0. */
export function SplitViewIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2" y="2.5" width="12" height="11" rx="1.25" />
      <path d="M8 2.5v11M8 8h6" />
    </svg>
  );
}

/** Four corners pushed outward: "expand to fill". Since 2.411.0. */
export function MaximizeIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10" />
    </svg>
  );
}

/** A keyboard: shortcuts. Since 2.411.0. */
export function KeyboardIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="1.75" y="4" width="12.5" height="8" rx="1.25" />
      <path d="M4.5 6.75h.01M7 6.75h.01M9.5 6.75h.01M12 6.75h.01M5.5 9.5h5" strokeWidth={1.4} />
    </svg>
  );
}

/** A robot head: an agent at work on a computer. Since 2.411.0. */
export function BotIcon({ size = 16, ...rest }: GlyphProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3" y="5" width="10" height="8" rx="2" />
      <path d="M8 5V2.75M6 8.75h.01M10 8.75h.01M6.25 11h3.5" />
    </svg>
  );
}
