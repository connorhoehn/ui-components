import type { StoryObj } from '@storybook/react-vite';
import CanvasDocumentView from './CanvasDocumentView';
declare const meta: {
    title: string;
    component: typeof CanvasDocumentView;
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** A document that is already a canvas — the whole page as one editor. */
export declare const Canvas: Story;
/**
 * A legacy sectioned document. The prompt is the whole point: conversion is
 * an explicit act, never something that happens because a page mounted.
 */
export declare const NeedsConversion: Story;
/**
 * The refusal path. `materialize()` declines a non-empty body — that refusal
 * is what stops a double-convert from duplicating the document — so the UI
 * has to show it or the button reads as dead.
 */
export declare const ConversionRefused: Story;
/**
 * The collaborative page: presence avatars in the toolbar, comment threads in
 * the margin beside the text they refer to.
 *
 * The offsets here are hard-coded. Turning a comment's anchor into a pixel
 * offset needs the live ProseMirror view, so this story shows the LAYOUT and
 * the collision stacking — c1 and c2 are deliberately 30px apart to make the
 * push-down visible — not the anchoring, which is the next piece of work.
 */
export declare const WithPresenceAndComments: Story;
/**
 * The gutter switched OFF — the reading view.
 *
 * Two things to look at. The sheet recentres across the full workspace once
 * the margin column stops reserving space for itself, and the toolbar still
 * says "Comments 3 · hidden". That second half is the whole reason the toggle
 * is shaped this way: a switch that removed the threads without a trace would
 * let someone read this page and never learn three people argued about it.
 *
 * The story owns the state, which is exactly what the host must do — the
 * component is controlled so the preference can be persisted, and a component
 * that owned it privately would forget on every navigation.
 */
export declare const GutterHidden: Story;
/** Forms the schema could not express — named, not counted, and kept on the page. */
export declare const WithUnsupportedContent: Story;
//# sourceMappingURL=CanvasDocumentView.stories.d.ts.map