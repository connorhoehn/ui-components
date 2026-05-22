import { ButtonHTMLAttributes } from 'react';
import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { ElementType } from 'react';
import { HTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { JSX as JSX_2 } from 'react';
import { ReactNode } from 'react';
import { ReactPortal } from 'react';
import { TdHTMLAttributes } from 'react';
import { ThHTMLAttributes } from 'react';

export declare function Avatar({ name, size, color, className, style, title, }: AvatarProps): JSX.Element;

export declare function AvatarGroup({ names, maxVisible, size, className, }: AvatarGroupProps): JSX.Element;

export declare interface AvatarGroupProps {
    names: string[];
    maxVisible?: number;
    size?: number;
    className?: string;
}

export declare interface AvatarProps {
    name: string;
    size?: number;
    /** Override the auto-computed color. */
    color?: string;
    className?: string;
    style?: CSSProperties;
    title?: string;
}

export declare function Banner({ variant, title, onDismiss, children, className, style, 'data-testid': testId, }: BannerProps): JSX.Element;

export declare interface BannerProps {
    variant?: BannerVariant;
    /** Bold prefix label shown before children. */
    title?: string;
    onDismiss?: () => void;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type BannerVariant = 'error' | 'warning' | 'info' | 'success';

export declare function BarChart({ data, height, xKey, yKey, color, yFormat, }: {
    data: Array<Record<string, unknown>>;
    height?: number;
    xKey: string;
    yKey: string;
    color?: string;
    yFormat?: (v: number) => string;
}): JSX_2.Element;

export declare function Button({ variant, size, disabled, fullWidth, children, type, className, ...rest }: ButtonProps): JSX.Element;

export declare interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    children: ReactNode;
}

export declare type ButtonSize = 'sm' | 'md' | 'lg';

export declare type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid';

export declare function Card({ children, padding, className, ...rest }: CardProps): JSX.Element;

export declare function CardHeader({ title, subtitle, meta, action, className }: CardHeaderProps): JSX.Element;

export declare interface CardHeaderProps {
    title: string;
    /** Small text below the title. */
    subtitle?: string;
    /** Extra content rendered immediately to the right of the title (badges/chips). */
    meta?: default_2.ReactNode;
    /** Right-aligned action area (buttons, menus). */
    action?: default_2.ReactNode;
    className?: string;
}

export declare type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export declare interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    padding?: CardPadding;
}

/**
 * Chat input with send button. Stateless — value/onChange controlled by parent.
 *
 * - Enter submits (Shift+Enter inserts newline in multiline mode).
 * - Submit disabled when `disabled` or value is empty/whitespace.
 */
export declare function ChatComposer({ value, onChange, onSubmit, disabled, multiline, placeholder, submitLabel, className, style, autoFocus, maxRows, }: ChatComposerProps): JSX.Element;

export declare interface ChatComposerProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled?: boolean;
    /** false: single-line input, true: textarea (default false) */
    multiline?: boolean;
    placeholder?: string;
    /** default '→' */
    submitLabel?: string | ReactNode;
    className?: string;
    style?: CSSProperties;
    autoFocus?: boolean;
    /** for multiline, max rows before scroll (default 4) */
    maxRows?: number;
}

export declare function Chip({ tone, size, solid, mono, children, title, className, style, 'data-testid': testId, 'aria-label': ariaLabel, }: ChipProps): JSX.Element;

export declare interface ChipProps {
    tone?: ChipTone;
    size?: 'sm' | 'xs';
    /** Solid fill (dark bg + white text) instead of soft tint. */
    solid?: boolean;
    /** Monospace font — for count badges. */
    mono?: boolean;
    children: ReactNode;
    title?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
}

export declare type ChipTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'caution' | 'purple';

export declare function CodeEditor({ value, onChange, language: _language, // Phase 1: accepted but not applied yet
    placeholder, minLines, maxLines, readOnly, variables, 'aria-label': ariaLabel, }: CodeEditorProps): JSX.Element;

export declare interface CodeEditorProps {
    value: string;
    onChange: (next: string) => void;
    /** Hint for future syntax highlighting. Phase 1: purely cosmetic / no-op. */
    language?: 'jsonpath' | 'javascript' | 'template' | 'plain';
    placeholder?: string;
    /** Minimum visible lines. Default 4. */
    minLines?: number;
    /** Maximum visible lines before the editor starts scrolling. Default 20. */
    maxLines?: number;
    readOnly?: boolean;
    /** Available context variables — rendered as clickable insert pills. */
    variables?: string[];
    'aria-label'?: string;
}

export declare function CollapsibleSection({ title, defaultOpen, badge, children, className, storageKey, }: CollapsibleSectionProps): JSX.Element;

export declare interface CollapsibleSectionProps {
    title: string;
    defaultOpen?: boolean;
    /** Optional element rendered on the right side of the header (e.g. a count chip). */
    badge?: default_2.ReactNode;
    children: default_2.ReactNode;
    className?: string;
    /** If provided, the open state is persisted to localStorage under this key. */
    storageKey?: string;
}

export declare interface Command {
    id: string;
    label: string;
    group?: string;
    hint?: string;
    keywords?: string[];
    icon?: ReactNode;
    /** Display-only shortcut glyphs rendered right-aligned in the item. */
    shortcut?: string[];
    /** Visibility predicate — when returns false, the command is filtered out. */
    when?: () => boolean;
    /** Action invoked when the item is selected. */
    run: () => void | Promise<void>;
}

export declare function CommandPalette({ placeholder, emptyState, className, }?: CommandPaletteProps): JSX.Element;

export declare interface CommandPaletteController {
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpen: boolean;
    query: string;
}

export declare function CommandPaletteHint({ className }?: CommandPaletteHintProps): JSX.Element;

export declare interface CommandPaletteHintProps {
    className?: string;
}

export declare interface CommandPaletteProps {
    placeholder?: string;
    emptyState?: ReactNode;
    className?: string;
}

export declare function CommandPaletteProvider({ commands, getDynamicCommands, children, }: CommandPaletteProviderProps): JSX.Element;

export declare interface CommandPaletteProviderProps {
    commands: Command[];
    /**
     * Synchronous derivation hook for query-dependent commands (URL paste,
     * UUID detection, etc.). Results are merged with the static `commands`
     * list before cmdk runs its own filter.
     */
    getDynamicCommands?: (query: string) => Command[];
    /**
     * Future hook — currently the keybinding is always cmd/ctrl + K. Accepted
     * for API forward-compat; ignored in v1.
     */
    toggleShortcut?: string[];
    children: ReactNode;
}

export declare function ConfirmDialog({ open, onConfirm, onCancel, title, body, confirmLabel, cancelLabel, confirmDisabled, tone, children, }: ConfirmDialogProps): JSX.Element;

export declare interface ConfirmDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    body?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmDisabled?: boolean;
    /** Visual tone for the confirm button. Defaults to 'info' (primary blue). */
    tone?: 'destructive' | 'caution' | 'info';
    /** Preview slot — extra content rendered between body and footer. */
    children?: React.ReactNode;
}

export declare const DEFAULT_PIPELINE_ICONS: string[];

export declare function Drawer({ open, onClose, title, subtitle, width, children, footer, 'data-testid': testId, }: DrawerProps): default_2.ReactPortal | null;

export declare interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    /** Panel width in pixels. Defaults to 460. */
    width?: number;
    children: default_2.ReactNode;
    footer?: default_2.ReactNode;
    'data-testid'?: string;
}

export declare function EmptyState({ icon, title, body, actionLabel, onAction, testId, actionTestId, }: EmptyStateProps): JSX.Element;

export declare interface EmptyStateProps {
    icon?: string;
    title: string;
    body?: string;
    actionLabel?: string;
    onAction?: () => void;
    /**
     * Optional testid for the container (defaults to "empty-state").
     * Callers with existing tests targeting a specific id can pass it here.
     */
    testId?: string;
    /**
     * Optional testid for the action button (defaults to "empty-state-action").
     */
    actionTestId?: string;
}

export declare function EntityCell({ label, id, href, mono, className, labelClassName, }: EntityCellProps): JSX.Element;

export declare interface EntityCellProps {
    label: string;
    /** Secondary monospace subline (e.g. ID or slug). */
    id?: string;
    /** Makes the label a link. */
    href?: string;
    /** Extra monospace styling on the ID subline (already monospace by default; this is reserved for callers needing emphasis). */
    mono?: boolean;
    className?: string;
    labelClassName?: string;
}

export declare interface EventGlyph {
    icon: string;
    color: string;
    severity: 'info' | 'success' | 'warning' | 'error' | 'neutral';
}

export declare const eventGlyphs: Record<string, EventGlyph>;

export declare interface EventRowProps {
    timestamp: string;
    type: string;
    summary: string;
    severity?: 'info' | 'warning' | 'error' | 'success';
    onClick?: () => void;
    selected?: boolean;
}

export declare function FilterChip({ active, onClick, color, dot, size, children, className, disabled, }: FilterChipProps): JSX.Element;

export declare interface FilterChipProps {
    active: boolean;
    onClick: () => void;
    /** Dot color (for colored department/status dots); also tints the active state. */
    color?: string;
    /** Show a colored dot before the label. */
    dot?: boolean;
    size?: 'sm' | 'xs';
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

/**
 * A strip of clickable follow-up suggestion chips, with optional refresh button.
 */
export declare function FollowUpChips({ suggestions, onSelect, onRefresh, label, className, }: FollowUpChipsProps): JSX.Element;

export declare interface FollowUpChipsProps {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
    /** if provided, shows a ↻ refresh button */
    onRefresh?: () => void;
    /** optional label before chips, e.g. "Follow up:" */
    label?: string;
    className?: string;
}

/**
 * Labeled wrapper around an input control. Wires `<label htmlFor>` →
 * `<input id>`, plus `aria-describedby` for hints/errors and `aria-invalid`
 * for the error state. Use the render-prop API so we don't have to wrap
 * every kind of input the library ships.
 */
export declare function FormField({ label, hint, error, required, layout, children, className, style, 'data-testid': testId, }: FormFieldProps): JSX.Element;

export declare type FormFieldLayout = 'stacked' | 'inline';

export declare interface FormFieldProps {
    label: string;
    /** Helper text shown under the control. */
    hint?: string;
    /** Error message; when present, replaces the hint and adds a danger border. */
    error?: string;
    /** Renders an asterisk after the label. Does NOT enforce validation. */
    required?: boolean;
    layout?: FormFieldLayout;
    /**
     * Pass-through render. The function receives an `id` and the wiring
     * (`aria-describedby` / `aria-invalid`) you should spread onto the input
     * so the label associates correctly:
     *
     *   <FormField label="Name">
     *     {(p) => <input {...p} value={...} onChange={...} />}
     *   </FormField>
     *
     * For controls that take an explicit `id` prop (Switch's `aria-labelledby`),
     * `wiring.labelId` exposes the label's id.
     */
    children: (wiring: {
        id: string;
        labelId: string;
        'aria-describedby'?: string;
        'aria-invalid'?: boolean;
    }) => ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

/**
 * Maps an event type prefix to a category for filter UIs.
 * Used by ExecutionLog + Observability EventsPage to group filters.
 */
export declare function getEventCategory(type: string): 'lifecycle' | 'step' | 'llm' | 'approval' | 'activity' | 'social' | 'other';

/**
 * Look up a glyph for an event type, falling back to a neutral bullet.
 */
export declare function getEventGlyph(type: string): EventGlyph;

export declare function IconButton({ 'aria-label': ariaLabel, icon, children, disabled, variant, size, className, ...rest }: IconButtonProps): JSX.Element;

export declare interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    'aria-label': string;
    icon?: ReactNode;
    children?: ReactNode;
    variant?: 'ghost' | 'primary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export declare interface IconPickerProps {
    value: string;
    onChange: (emoji: string) => void;
    curated?: string[];
}

export declare function InlineAlert({ tone, children, onDismiss, className }: InlineAlertProps): JSX.Element;

export declare interface InlineAlertProps {
    tone: InlineAlertTone;
    children: default_2.ReactNode;
    onDismiss?: () => void;
    className?: string;
}

export declare type InlineAlertTone = 'error' | 'success' | 'info' | 'warning';

export declare function LineChart({ series, height, yFormat, xFormat, }: {
    series: LineSeries[];
    height?: number;
    yFormat?: (v: number) => string;
    xFormat?: (v: number | string) => string;
}): JSX_2.Element;

export declare interface LineSeries {
    label: string;
    data: Array<{
        x: number | string;
        y: number;
    }>;
    color?: string;
}

/**
 * A chat message bubble for user/assistant messages.
 *
 * Stateless — accepts content + tool calls as props. Renders a role label,
 * an optional tool-call strip, and the message body (markdown for assistants
 * when `renderMarkdown` is supplied, plain `whitespace-pre-wrap` otherwise).
 */
export declare function MessageBubble({ role, content, toolCalls, streaming, agentName, userName, renderMarkdown, className, }: MessageBubbleProps): JSX.Element;

export declare interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
    toolCalls?: ToolCallItem[];
    /** shows ThinkingDots when content is empty */
    streaming?: boolean;
    /** label shown for assistant (default 'Assistant') */
    agentName?: string;
    /** label shown for user (default 'You') */
    userName?: string;
    /** inject markdown renderer */
    renderMarkdown?: (content: string) => ReactNode;
    className?: string;
}

export declare function Modal({ open, onClose, title, maxWidth, children, footer, backdropTestId, backdropStyle, cardStyle, zIndex, rawChildren, }: ModalProps): ReactPortal | null;

export declare interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    maxWidth?: number;
    children: React.ReactNode;
    footer?: React.ReactNode;
    /**
     * Optional overrides for the backdrop testid (defaults to "modal-backdrop").
     * Callers that need a specific testid on the backdrop — e.g. existing tests
     * that assert `getByTestId('delete-modal')` and click it to trigger
     * backdrop-close — can pass it through here.
     */
    backdropTestId?: string;
    /**
     * Optional override for the backdrop background. Defaults to the standard
     * rgba(0,0,0,0.45) overlay used across the app.
     */
    backdropStyle?: React.CSSProperties;
    /**
     * Optional override for the inner card container style. Spread over the
     * default 12px-radius, 28px/24px-padded, shadowed white card.
     */
    cardStyle?: React.CSSProperties;
    /**
     * Optional z-index for the backdrop. Defaults to 10000.
     */
    zIndex?: number;
    /**
     * When true, render children directly inside the card without the default
     * text-sm text-text-secondary wrapper div. Useful for modals that manage
     * their own full-layout and need the card to be a flex container.
     */
    rawChildren?: boolean;
}

export declare function nameToColor(name: string): string;

export declare function nameToInitials(name: string): string;

export declare function PageHeader({ title, description, actions, back, badge, className, }: PageHeaderProps): JSX.Element;

export declare interface PageHeaderBack {
    label: string;
    to: string;
    onClick?: (e: default_2.MouseEvent<HTMLAnchorElement>) => void;
}

export declare interface PageHeaderProps {
    title: string;
    description?: string;
    /** Right-aligned action area (buttons, menus). */
    actions?: default_2.ReactNode;
    /** Optional back link rendered above the title. */
    back?: PageHeaderBack;
    /** Badge or status pill rendered to the right of the title. */
    badge?: default_2.ReactNode;
    className?: string;
}

export declare function PageSection({ title, description, actions, children, className, }: PageSectionProps): JSX.Element;

export declare interface PageSectionProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
    className?: string;
}

export declare function ProgressBar({ value, max, color, size, label, showRatio, className, style, 'data-testid': testId, 'aria-label': ariaLabel, }: ProgressBarProps): JSX.Element;

export declare interface ProgressBarProps {
    value: number;
    /** Maximum value. Defaults to 100. */
    max?: number;
    /** Fill color. Defaults to var(--color-primary). */
    color?: string;
    size?: ProgressBarSize;
    label?: ReactNode;
    /** When true (default), shows "{value}/{max}". Otherwise shows percentage. */
    showRatio?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
}

export declare type ProgressBarSize = 'sm' | 'md';

export declare interface QuickPrompt {
    label: string;
    hint?: string;
}

/**
 * Empty-state grid of prompt suggestion cards. Each card is a button calling
 * `onSelect(label)`.
 */
export declare function QuickPromptGrid({ prompts, onSelect, columns, title, className, }: QuickPromptGridProps): JSX.Element;

export declare interface QuickPromptGridProps {
    prompts: QuickPrompt[];
    onSelect: (label: string) => void;
    /** default auto-fit (responsive 220px min column width) */
    columns?: number;
    /** optional heading above, e.g. "Try asking:" */
    title?: string;
    className?: string;
}

export declare function SearchInput({ value, onChange, placeholder, onClear, className, style, autoFocus, 'aria-label': ariaLabel, }: SearchInputProps): JSX.Element;

export declare interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Called after the value is cleared via the clear button. */
    onClear?: () => void;
    className?: string;
    style?: default_2.CSSProperties;
    autoFocus?: boolean;
    'aria-label'?: string;
}

export declare function SegmentedControl({ options, value, onChange, size, className, }: SegmentedControlProps): JSX.Element;

export declare interface SegmentedControlProps {
    options: SegmentOption[];
    value: string;
    onChange: (value: string) => void;
    size?: 'sm' | 'md';
    className?: string;
}

export declare interface SegmentOption {
    label: string;
    value: string;
    icon?: ReactNode;
}

export declare interface ShortcutsHelpProps {
    open: boolean;
    onClose: () => void;
}

export declare function SkeletonCard({ width, height }: SkeletonCardProps): JSX.Element;

export declare interface SkeletonCardProps {
    width?: number | string;
    height?: number | string;
}

export declare function Sparkline({ data, width, height, color }: SparklineProps): JSX.Element;

export declare interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
}

export declare function Spinner({ size, color, className, style, 'aria-label': ariaLabel, 'data-testid': testId, }: SpinnerProps): JSX.Element;

export declare interface SpinnerProps {
    size?: SpinnerSize;
    /** Arc color. Defaults to var(--color-primary). */
    color?: string;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare type SpinnerSize = 'sm' | 'md' | 'lg';

export declare function StackedAreaChart({ series, height, }: {
    series: LineSeries[];
    height?: number;
}): JSX_2.Element;

export declare function StatCard({ label, value, accent, danger, hint, to, as: As, onClick, mono, className, style, 'data-testid': testId, }: StatCardProps): JSX.Element;

export declare interface StatCardProps {
    label: ReactNode;
    value: ReactNode;
    accent?: boolean;
    danger?: boolean;
    hint?: ReactNode;
    /** Destination URL / path. When provided the card renders as a link. */
    to?: string;
    /**
     * Override the link element. Defaults to a plain `<a>` (passes `href`).
     * Pass your router's Link component to get client-side navigation — the `to`
     * prop is forwarded directly so it matches React Router's `<Link to>` API.
     *
     * @example
     * import { Link } from 'react-router';
     * <StatCard to="/admin/capabilities" as={Link} label="…" value={0} />
     */
    as?: ElementType<any>;
    /** Click handler — renders a <button> wrapper if no `to` is given. */
    onClick?: () => void;
    mono?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function StatusDot({ color, pulse, size, label, className, style, title, 'data-testid': testId, 'aria-label': ariaLabel, }: StatusDotProps): JSX.Element;

export declare interface StatusDotProps {
    /** Dot color. Defaults to var(--color-text-tertiary). */
    color?: string;
    pulse?: boolean;
    size?: StatusDotSize;
    label?: ReactNode;
    className?: string;
    style?: CSSProperties;
    title?: string;
    'data-testid'?: string;
    'aria-label'?: string;
}

export declare type StatusDotSize = 'xs' | 'sm' | 'md';

/**
 * Accessible on/off toggle. Renders as a `role="switch"` button so screen
 * readers announce the state. Use inside `FormField` for a labeled row, or
 * pass `aria-label` directly for inline use.
 */
export declare function Switch({ checked, onChange, disabled, size, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, className, style, 'data-testid': testId, }: SwitchProps): JSX.Element;

export declare interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: SwitchSize;
    /** Accessible label — required for screen readers when no visible label is wired. */
    'aria-label'?: string;
    /** When using <FormField label="..."><Switch ...></FormField>, set this to the label's id. */
    'aria-labelledby'?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type SwitchSize = 'sm' | 'md';

export declare function Table({ children, className, ...rest }: TableProps): JSX.Element;

export declare function TableBody({ children, className, ...rest }: TableBodyProps): JSX.Element;

export declare interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

export declare function TableHead({ children, className, ...rest }: TableHeadProps): JSX.Element;

export declare interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

export declare interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children: ReactNode;
}

export declare function TableRow({ children, clickable, className, ...rest }: TableRowProps): JSX.Element;

export declare interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
    clickable?: boolean;
}

export declare function TableTd({ children, className, ...rest }: TableTdProps): JSX.Element;

export declare interface TableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
}

export declare function TableTh({ children, sortable, sortDirection, className, ...rest }: TableThProps): JSX.Element;

export declare interface TableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
}

export declare function TagEditor({ value, onChange, placeholder, suggestions, lowercase, }: TagEditorProps): JSX.Element;

export declare interface TagEditorProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    suggestions?: string[];
    /**
     * Lowercase tags before insertion. Defaults to true to preserve historical
     * behavior. Set false when you need case-sensitive identifiers (e.g. Cedar
     * action names like `ViewSalary`).
     */
    lowercase?: boolean;
}

/**
 * A collapsible `<details>` block for showing chain-of-thought reasoning.
 *
 * Pair with a parser that strips `<thinking>...</thinking>` from the assistant
 * message and feeds the extracted text into `content`.
 */
export declare function ThinkingBlock({ content, streaming, defaultOpen, className, }: ThinkingBlockProps): JSX.Element;

export declare interface ThinkingBlockProps {
    /** the thinking/reasoning text */
    content: string;
    /** if true, show "Thinking…" and ThinkingDots when content empty */
    streaming?: boolean;
    /** default false (collapsed) */
    defaultOpen?: boolean;
    className?: string;
}

/**
 * Animated 3-dot typing/thinking indicator.
 *
 * Uses inline `<style>` for keyframes to avoid global CSS dependency.
 */
export declare function ThinkingDots({ size, color, className }: ThinkingDotsProps): JSX.Element;

export declare interface ThinkingDotsProps {
    /** sm: 4px dots, md: 6px dots (default md) */
    size?: 'sm' | 'md';
    /** dot color, default var(--color-text-tertiary) */
    color?: string;
    className?: string;
}

export declare interface ToastContextValue {
    toast: (message: string, opts?: ToastOptions) => void;
}

export declare interface ToastOptions {
    type?: ToastType;
    durationMs?: number;
    actionLabel?: string;
    onAction?: () => void;
}

export declare interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    /** Exit state drives fade-out animation before removal from the DOM. */
    exiting?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss: (id: string) => void;
}

export declare function ToastProvider({ children }: {
    children: ReactNode;
}): JSX.Element;

export declare type ToastType = 'info' | 'success' | 'warning' | 'error';

export declare interface ToolCall {
    id: string;
    name: string;
    done: boolean;
    args?: string;
}

export declare interface ToolCallItem {
    id: string;
    name: string;
    done: boolean;
    args?: string;
}

/**
 * A single pill rendering one tool call's name + done/pending state.
 */
export declare function ToolCallPill({ name, done, className }: ToolCallPillProps): JSX.Element;

export declare interface ToolCallPillProps {
    name: string;
    done: boolean;
    className?: string;
}

/**
 * A compact strip of tool call pills.
 */
export declare function ToolCallStrip({ toolCalls, className }: ToolCallStripProps): JSX.Element;

export declare interface ToolCallStripProps {
    toolCalls: ToolCall[];
    className?: string;
}

export declare function useCommandPalette(): CommandPaletteController;

export declare interface UserPickerProps {
    value: string[];
    onChange: (userIds: string[]) => void;
    placeholder?: string;
    maxSelect?: number;
}

export declare function useToast(): ToastContextValue;

export { }
