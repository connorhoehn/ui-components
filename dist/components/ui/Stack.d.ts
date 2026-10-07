import { type ElementType, type HTMLAttributes, type ReactNode, type Ref } from 'react';
/** Spacing scale. Matches Tailwind's 4px base: xs=6, sm=8, md=12, lg=16, xl=24. */
export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StackAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between';
export interface StackProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    children?: ReactNode;
    /** Space between children. Default `md` (12px). */
    gap?: StackGap;
    /** Cross-axis alignment (`align-items`). */
    align?: StackAlign;
    /** Main-axis distribution (`justify-content`). */
    justify?: StackJustify;
    /** Allow children to wrap onto more lines. Default false for Stack, true for Inline. */
    wrap?: boolean;
    /** Render as something other than a `<div>` — `ul`, `section`, `label`, … */
    as?: ElementType;
    /**
     * The underlying DOM node.
     *
     * A plain prop rather than `forwardRef` deliberately. The forms primitives in
     * this library use `forwardRef` because they wrap one fixed element, but
     * these two are polymorphic: `forwardRef<T, P>` fixes the instance type at
     * the call site and would either pin every `Stack` to `HTMLDivElement` — a
     * lie the moment you pass `as="ul"` — or force consumers to cast. React 19
     * (our only supported peer, `^19.0.0`) passes `ref` through as an ordinary
     * prop, so the polymorphic typing survives.
     *
     * Typed as `HTMLElement` for the same reason. A consumer holding a
     * `useRef<HTMLDivElement>(null)` still assigns cleanly, and one that passed
     * `as="ul"` is not told it has a div.
     *
     * Anything that follows its own output needs this: reading and setting
     * `scrollTop` on a log tail, measuring a row, focusing a region. Without it a
     * consumer cannot use a layout primitive at all there and hand-rolls a
     * nine-line `forwardRef` wrapper around a bare `<div>` — which is exactly
     * what the aws-agentcore portal did in `components/ScrollRegion.tsx`.
     */
    ref?: Ref<HTMLElement>;
}
/** Vertical flex column with a scale gap. */
export declare function Stack({ children, gap, align, justify, wrap, as: As, className, ref, ...rest }: StackProps): import("react").JSX.Element;
/**
 * Horizontal flex row with a scale gap. Wraps by default — an un-wrapping row
 * of chips is how a toolbar overflows its container on a narrow window, and
 * every consumer that hand-rolled this wrote `flexWrap: 'wrap'` anyway.
 */
export declare function Inline({ children, gap, align, justify, wrap, as: As, className, ref, ...rest }: StackProps): import("react").JSX.Element;
//# sourceMappingURL=Stack.d.ts.map