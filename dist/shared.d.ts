import { ButtonHTMLAttributes } from 'react';
import { CSSProperties } from 'react';
import { HTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { JSX as JSX_2 } from 'react';
import { ReactNode } from 'react';
import { ReactPortal } from 'react';
import { TdHTMLAttributes } from 'react';
import { ThHTMLAttributes } from 'react';

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

export declare type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export declare interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    padding?: CardPadding;
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

export declare function PageSection({ title, description, actions, children, className, }: PageSectionProps): JSX.Element;

export declare interface PageSectionProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
    className?: string;
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

export declare function StackedAreaChart({ series, height, }: {
    series: LineSeries[];
    height?: number;
}): JSX_2.Element;

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

export declare function useCommandPalette(): CommandPaletteController;

export declare interface UserPickerProps {
    value: string[];
    onChange: (userIds: string[]) => void;
    placeholder?: string;
    maxSelect?: number;
}

export declare function useToast(): ToastContextValue;

export { }
