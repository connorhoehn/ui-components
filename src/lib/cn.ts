import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge files an unlabelled arbitrary `font-[…]` under font-WEIGHT,
// but Tailwind v4 compiles `font-[inherit]` to `font-family: inherit`. So
// `cn('font-semibold', 'font-[inherit]')` silently dropped the weight: every
// library Button rendered at the inherited 400 instead of its intended 600
// (realtime-examples' type audit). Filing `font-[inherit]` as a family class
// makes the merge agree with the stylesheet.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { 'font-family': [{ font: ['[inherit]'] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
