import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScopeHeader } from './ScopeHeader';
declare const meta: Meta<typeof ScopeHeader>;
export default meta;
type Story = StoryObj<typeof ScopeHeader>;
export declare const Mockup: Story;
/** A scope with no tracked children yet: nothing on the stats line, no placeholder numbers. */
export declare const NoData: Story;
export declare const Dark: Story;
/**
 * A module header (Distillation): tabs carry a count and an attention dot,
 * and a repository selector sits in the `controls` slot before the link.
 */
export declare const DotsAndControls: Story;
/**
 * 2.389.0 — `variant="crumbs"`: just the crumb line, with the repository
 * select and the Library link hung between it and the record headline below.
 */
export declare const CrumbsOnly: Story;
/**
 * 2.405.2 — `variant="inline"`: crumbs, the title as the emphasised last
 * segment, the view tabs and a compact control on ONE 48px row, so the body
 * below (a graph) takes the height a four-row header used to.
 */
export declare const InlineCrumbsTitleTabsControls: Story;
/**
 * 2.406.4 — a long trail in the inline row: the crumbs truncate inside their
 * caps and give up width before the title; squeezed further, the middle
 * crumbs collapse to "…". The row stays 48px at any width.
 */
export declare const InlineLongTrail: Story;
/**
 * 2.407.2 — the squeeze order at 1536, 1280 and 1024 (the header's column):
 * the controls leave the row first (into a "Filters ▾" popover here; into
 * the ⋯ menu when `controlsMenu` is given), then the crumbs fold to "…";
 * the title truncates at half the row at most (2.407.10). The tabs keep
 * their labels.
 */
export declare const InlineSqueezeOrder: Story;
/**
 * 2.407.10 — one type scale and a paragraph-length title. The crumbs (and a
 * folded "…") draw the rails' item type (`RAIL_ITEM_TEXT`, 13px/500) in
 * secondary ink, the "›" 13px tertiary; the title stays 18px/600. A whole
 * prompt as the title is capped at half the row and truncates (full text in
 * its `title` tooltip), so "Org ›" stays whole ahead of it — before, a
 * squeezed crumb painted under the start of the title.
 */
export declare const InlineLongTitle: Story;
//# sourceMappingURL=ScopeHeader.stories.d.ts.map