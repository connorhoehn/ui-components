import type { SVGProps } from 'react';
export interface GlyphProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    /** Rendered size in px. Default 16 — sized for an `IconButton size="sm"`. */
    size?: number;
}
/** A plus: "make a new one". */
export declare function PlusIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** An X: "close", "dismiss". */
export declare function CloseIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A speech bubble: a conversation, a comment. */
export declare function ChatIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/**
 * A speech bubble with two lines of text: comments ON something — a thread
 * anchored to a page or a slide — as opposed to `ChatIcon`'s conversation.
 * The two sit side by side on the documents rail (the workbench's Comments
 * entry beside the Conversation panel), so they must not be the same glyph;
 * `QuoteIcon` was tried there and read as "55" at 14px. Since 2.384.2.
 */
export declare function CommentIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
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
export declare function SearchIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A tray with an arrow out of it: "share", "post this somewhere". */
export declare function ShareIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A chevron. `dir` is where it points. */
export declare function ChevronIcon({ size, dir, ...rest }: GlyphProps & {
    dir?: 'up' | 'down' | 'left' | 'right';
}): import("react").JSX.Element;
/** A clock: history, "when". */
export declare function HistoryIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A page with a folded corner: a document, a file. */
export declare function DocumentIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/**
 * A board with a shape and a connector on it: a whiteboard.
 *
 * Deliberately not the document glyph with something added. A whiteboard is a
 * different authoring surface, not a document variant — the two sit next to
 * each other in the conversation's Documents tab and have to be told apart at
 * a glance.
 */
export declare function WhiteboardIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A box with an arrow leaving its corner: "open this in its own view". */
export declare function PopOutIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A pencil: "change this". */
export declare function EditIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A bin: "remove this". */
export declare function TrashIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A pushpin: "keep this at the top". */
export declare function PinIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/**
 * A folder: "file this under something of your own".
 *
 * The tab is drawn short and offset left so it reads as a folder rather than
 * as a rectangle with a bite out of it at 14px, which is the size the
 * conversation row menu uses it at.
 */
export declare function FolderIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A bell: "notifications", "activity" — the header's inbox trigger. Since 2.407.37. */
export declare function BellIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A bell with a slash through it: "notify me quietly". */
export declare function BellMutedIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A padlock: "private", "restricted to specific people". */
export declare function LockIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A hooked arrow: forwarded — this came from somewhere else. */
export declare function ForwardIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** An eye: watching, "N people are seeing this". */
export declare function EyeIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** `EyeIcon` with a slash through it: hidden — not visible to others. */
export declare function EyeOffIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A handset: start a voice call. */
export declare function PhoneIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A camera body: start a video call. Distinct from video/MediaIcons' VideoIcon, which is a call CONTROL. */
export declare function VideoCallIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A lightning bolt: activity, "things are happening". */
export declare function ActivityIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** An @ sign: mentions, "someone named you". */
export declare function AtIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A crescent: the dark theme — "switch to (or currently in) dark mode". */
export declare function MoonIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A sun: the light theme — "switch to (or currently in) light mode". */
export declare function SunIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Three stacked bars: "open the menu", or "unfold the rail this collapsed into". */
export declare function MenuIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A microphone on a stand: turn what is being said into text. Distinct from
 *  video/MediaIcons' MicIcon, which is a call's mute CONTROL. */
export declare function TranscribeIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A trunk with a branch leaving it: a flow that splits — a pipeline, a branch. */
export declare function BranchIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Three joined nodes: a graph of connections, "how these relate". */
export declare function GraphIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Bars on a baseline: measurements, "how much of this over time". */
export declare function ChartIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Angle brackets around a slash: source, "the developer-facing thing". */
export declare function CodeIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A jigsaw piece: something that plugs in — a capability, an optional part. */
export declare function PuzzleIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Two arrows chasing each other: something that runs again — a loop, a re-run. */
export declare function RepeatIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A paperclip: a file came along with this. */
export declare function PaperclipIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Two chain links: a hyperlink — "point this at a URL", or "copy the URL". */
export declare function LinkIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A pair of quotation marks: a quoted passage — a blockquote. */
export declare function QuoteIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A smiling face: pick an emoji. The button, not the emoji — a reaction a
 *  person actually left stays the character they chose. */
export declare function SmileyIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A hooked arrow pointing back: reply. ForwardIcon's mirror, because the two
 *  are the same gesture pointed different ways. */
export declare function ReplyIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A circled "i": "more about this" — an estimate's confidence, a footnote. Since 2.385.0. */
export declare function InfoIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** An arrow pointing right: "go on" — a link action, "Prepare run →". Since 2.385.0. */
export declare function ArrowRightIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/**
 * An arrow leaving to the upper right, with no box: "opens somewhere else" —
 * the ↗ after "Repository" on an outlined link button. `PopOutIcon` is the
 * boxed variant ("open in its own view"). Since 2.390.0.
 */
export declare function ExternalLinkIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Two people: "shared with me", a group. Since 2.385.0. */
export declare function PeopleIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** One head and shoulders: "a person" (a subject mask, one member). Since 2.390.0. */
export declare function PersonIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** An arrow pointing up: "send" on a round prompt button. Since 2.390.0. */
export declare function ArrowUpIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Six dots in two columns: a drag handle — "pick this up and move it". Since 2.385.0. */
export declare function GripIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A funnel: "filter this list". Since 2.385.0. */
export declare function FilterIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Three dots and three lines: a bulleted list. Since 2.386.0. */
export declare function ListIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A four-point sparkle with a small companion: the agent. Since 2.386.0. */
export declare function SparkleIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A curved arrow back: "undo". Since 2.386.5. */
export declare function UndoIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A curved arrow forward: "redo". Since 2.386.5. */
export declare function RedoIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A framed picture with a sun and a hill: "image". Since 2.386.5. */
export declare function ImageIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Three dotted lines: "bulleted list". Since 2.386.5. */
export declare function BulletListIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Three numbered lines: "numbered list". Since 2.386.5. */
export declare function NumberedListIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Nested lines: "list style" / multilevel list. Since 2.386.5. */
export declare function ListStyleIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A ticked box: "checklist". Since 2.386.5. */
export declare function ChecklistIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A marker tip over a stroke: "highlight". Since 2.386.5. */
export declare function HighlighterIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Three dots in a row: "more". Since 2.386.5. */
export declare function MoreIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A triangle with an exclamation mark: "warning", "check this first". Since 2.389.0. */
export declare function WarningIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A tray with an arrow leaving it: "upload". Since 2.389.6. */
export declare function UploadIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A tick: "done", "added". Since 2.389.6. */
export declare function CheckIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A plus in a ring: "add this". Since 2.389.6. */
export declare function PlusCircleIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Two sliders: "refine these results". Since 2.389.6. */
export declare function SlidersIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A paper plane: "send" — the light prompt box's Send ("✈ Send"). Since 2.390.0. */
export declare function SendIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** An arrow into a tray: "download". Since 2.390.3. */
export declare function DownloadIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A printer: "print". Since 2.390.3. */
export declare function PrinterIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A play button in a ring: "run". Since 2.390.3. */
export declare function PlayCircleIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Two stacked pages: "make a copy". Since 2.390.3. */
export declare function CopyIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A page with a spark in its corner: "make something new from this". Since 2.390.3. */
export declare function DocumentAddIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A page with a dashed block: "a template". Since 2.390.3. */
export declare function TemplateIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A monitor on a stand: a computer — a provisioned box. Since 2.411.0. */
export declare function DesktopIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** An open laptop: somebody's own machine rather than a provisioned box. Since 2.411.0. */
export declare function LaptopIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A frame split into a main pane and two stacked ones: "split layout". Since 2.411.0. */
export declare function SplitViewIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** Four corners pushed outward: "expand to fill". Since 2.411.0. */
export declare function MaximizeIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A keyboard: shortcuts. Since 2.411.0. */
export declare function KeyboardIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A robot head: an agent at work on a computer. Since 2.411.0. */
export declare function BotIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
/** A cloud: a hosted / cloud computer, beside `MonitorIcon` (a local one) in a fleet indicator. */
export declare function CloudIcon({ size, ...rest }: GlyphProps): import("react").JSX.Element;
//# sourceMappingURL=Icons.d.ts.map