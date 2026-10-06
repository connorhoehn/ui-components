import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExplorerLayout } from './ExplorerLayout';
declare const meta: Meta<typeof ExplorerLayout>;
export default meta;
type Story = StoryObj<typeof ExplorerLayout>;
export declare const GuideRecord: Story;
/**
 * 2.389.4 — the same record with the Sources aside open. `paneHeader` spans
 * the pane only, so the aside's tab row keeps the top of its own column and
 * the crumb band's hung controls (All repositories · Open Library) stay over
 * the record head, clear of the aside.
 */
export declare const GuideRecordSourcesOpen: Story;
export declare const InitiativeOverview: Story;
export declare const InitiativeWorkItem: Story;
export declare const InitiativesMineEmpty: Story;
export declare const InitiativeOverviewV2: Story;
export declare const InitiativeOverviewV2ShellRail: Story;
export declare const DocumentsSurfaceOneTypeScale: Story;
export declare const DocumentsSurfaceOneTypeScaleDark: Story;
/**
 * 2.407.33 — `railWidth="xs"` (220px): the Org rail's own width
 * (SubNavLayout's default), so a documents rail sits at it. The Org rail
 * (SubNavLayout, 220px) is drawn on the left for comparison.
 */
export declare const RailWidthXs: Story;
//# sourceMappingURL=ExplorerLayout.stories.d.ts.map