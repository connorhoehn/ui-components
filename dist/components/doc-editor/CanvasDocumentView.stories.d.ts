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
/**
 * The document pagination was built for: pictures, a table, headings, code and
 * paragraphs long enough to cross a seam.
 *
 * Scroll to each grey band. The thing to look at is the WHITE either side of
 * it: every page has a one-inch margin top and bottom, the same one the first
 * page has always had, and nothing is allowed into it. Pictures, tables,
 * headings and whole paragraphs move down to the next page rather than run to
 * the boundary — so a page ends after its last complete paragraph, which is
 * why some of them end raggedly. That is the trade the margins cost; see the
 * `paginate` prop doc.
 *
 * Turn the `paginate` control off in the toolbar below and the same document
 * becomes one endless sheet.
 */
export declare const Paginated: Story;
/**
 * The same document as one continuous sheet — what every host got before the
 * flow existed, and what a preview pane or a read-only embed may still want.
 */
export declare const Unpaginated: Story;
export declare const PaperLight: Story;
export declare const PaperDark: Story;
/**
 * The document mockup's page (2.385.6 typography): the title near the top of
 * the sheet, the byline muted under it, 20px between sections, a compact
 * checklist. At a 941px-tall window everything down to "Sources:" fits.
 */
export declare const ReleasePlan: Story;
export declare const FollowBarBelowRuler: Story;
export declare const FollowBarBelowRulerDark: Story;
export declare const FollowBarPinnedWhileScrolling: Story;
export declare const FollowBarPinnedWhileScrollingDark: Story;
//# sourceMappingURL=CanvasDocumentView.stories.d.ts.map