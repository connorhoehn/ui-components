// ui-components/src/components/diagram/useResolvedTheme.ts
//
// Resolves the ACTIVE theme by reading the DOM, not React context.
//
// Almost every component in this library paints from `--color-*` tokens and
// lets CSS resolve `[data-theme="dark"]` — no JS involved. Excalidraw cannot:
// it renders to a <canvas> and takes an explicit `theme="light" | "dark"`
// prop. So this is one of the rare places a library component genuinely needs
// to KNOW the theme.
//
// It must still not call `useColorScheme()`. That hook reads
// `ColorSchemeProvider`'s context, and the consuming app stamps `data-theme`
// on <html> itself without ever mounting that provider — so the hook returns
// the context default ('light') forever and the canvas would float light
// while the page around it went dark. `SocialTabContent.tsx` has the
// post-mortem of exactly that bug.
//
// Reading the DOM is correct for the additional reason that `data-theme` is
// scope-aware: `<div data-theme="dark">` flips a subtree. Walking up from our
// own node gets the theme of the scope we are actually rendered in.

import { useEffect, useState, type RefObject } from 'react';

export type ResolvedTheme = 'light' | 'dark';

function readTheme(node: Element | null): ResolvedTheme {
    if (typeof document === 'undefined') return 'light';

    const scoped = node?.closest('[data-theme]') ?? document.querySelector('[data-theme]');
    const attr = scoped?.getAttribute('data-theme');
    if (attr === 'dark') return 'dark';
    if (attr === 'light') return 'light';

    // No explicit choice anywhere — follow the OS, which is what the CSS
    // would do if the app used a prefers-color-scheme block.
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
}

/**
 * The theme currently in force for `ref`'s subtree, kept live.
 *
 * Re-reads on any `data-theme` mutation anywhere in the document (the
 * attribute can be set on <html> or on any ancestor) and on OS theme changes.
 */
export function useResolvedTheme(ref: RefObject<Element | null>): ResolvedTheme {
    const [theme, setTheme] = useState<ResolvedTheme>('light');

    useEffect(() => {
        if (typeof document === 'undefined') return;

        const sync = () => setTheme(readTheme(ref.current));
        sync();

        // `subtree: true` because the attribute may live on <html>, on the app
        // shell, or on a local scope wrapper — we do not get to assume which.
        const observer = new MutationObserver(sync);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
            subtree: true,
        });

        const media = window.matchMedia?.('(prefers-color-scheme: dark)');
        media?.addEventListener?.('change', sync);

        return () => {
            observer.disconnect();
            media?.removeEventListener?.('change', sync);
        };
    }, [ref]);

    return theme;
}
