import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { CallTileRow, type CallTileParticipant } from './CallTileRow';
import { StreamVideo } from './StreamVideo';
import { CAST, fakeCameraStream, themed } from './documentCallStoryKit';

// The call as a row. The `dock` variant (2.391.0) is the in-call dock's tile
// row: You first, the followed person ringed in the accent (`highlightedId`),
// camera-off people as initials on the video tile colour, and a +N tile past
// `maxVisible` (`overflow="collapse"`) — or a sideways scroll ("scroll").

function tile(who: keyof typeof CAST, over: Partial<CallTileParticipant> = {}): CallTileParticipant {
  const c = CAST[who];
  const s = over.videoElement === undefined && over.isMuted !== true ? fakeCameraStream(c.userId, c.hue) : null;
  return { id: c.userId, displayName: c.name, videoElement: s ? <StreamVideo stream={s} muted /> : undefined, ...over };
}

const ROW = [tile('alice'), tile('frank'), tile('bob', { isMuted: true, videoElement: undefined })];
const MANY = [
  ...ROW,
  tile('carol'),
  ...['Dan Ortiz', 'Eve Park', 'Gus Lee', 'Hana Ito'].map((n, i) => ({ id: `u${i}`, displayName: n })),
];

const meta = {
  title: 'Video/CallTileRow',
  component: CallTileRow,
  parameters: { layout: 'fullscreen' },
  args: { participants: ROW, localParticipant: tile('connor', { isLocal: true }) },
} satisfies Meta<typeof CallTileRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Dock: Story = {
  args: { variant: 'dock', highlightedId: CAST.alice.userId, activeSpeakerId: CAST.frank.userId, tileWidth: 176, tileHeight: 88 },
  decorators: [themed('light')],
};
export const DockDark: Story = { ...Dock, decorators: [themed('dark')] };
/** 1280 × 720: 132 × 74 tiles. */
export const DockCompact: Story = {
  args: { variant: 'dock', highlightedId: CAST.alice.userId, tileWidth: 132, tileHeight: 74 },
  decorators: [themed('light')],
};
/** Nine people, six tiles: the last is +4. */
export const DockOverflowCollapse: Story = {
  args: { variant: 'dock', participants: MANY, tileWidth: 176, tileHeight: 88, overflow: 'collapse', maxVisible: 6 },
  decorators: [themed('light')],
};
/** The same nine, scrolling sideways. */
export const DockOverflowScroll: Story = {
  args: { variant: 'dock', participants: MANY, tileWidth: 176, tileHeight: 88, overflow: 'scroll', className: 'max-w-[760px]' },
  decorators: [themed('light')],
};
/** Screen share and a reconnecting person. */
export const DockSharingAndReconnecting: Story = {
  args: {
    variant: 'dock',
    participants: [tile('alice', { screenSharing: true }), tile('frank', { reconnecting: true }), ROW[2]!],
    tileWidth: 176,
    tileHeight: 88,
  },
  decorators: [themed('dark')],
};
/** `highlightedId` on the floating variant: the followed person's ring is the accent. */
export const FloatingHighlighted: Story = {
  args: { variant: 'floating', highlightedId: CAST.alice.userId, tileWidth: 160 },
  decorators: [themed('light')],
};

/**
 * 2.395.3: the followed person's ring is drawn INSIDE the tile, so a scrolling
 * row (overflow-x) cannot clip it — here on the first tile and on the last.
 */
function EdgeRings() {
  const last = MANY[MANY.length - 1]!.id;
  // Scroll the second row to its end, so its highlighted LAST tile is in view.
  useEffect(() => {
    const row = document.querySelector<HTMLElement>('[data-testid="row-last"]');
    row?.scrollTo({ left: row.scrollWidth });
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <CallTileRow variant="dock" participants={MANY} localParticipant={tile('connor', { isLocal: true })} highlightedId={CAST.connor.userId} tileWidth={176} tileHeight={88} overflow="scroll" className="max-w-[760px]" data-testid="row-first" tileTestIdPrefix="first" />
      <CallTileRow variant="dock" participants={MANY} highlightedId={last} activeSpeakerId={MANY[0]!.id} tileWidth={176} tileHeight={88} overflow="scroll" className="max-w-[760px]" data-testid="row-last" tileTestIdPrefix="last" />
    </div>
  );
}
export const DockHighlightAtRowEdges: Story = { render: () => <EdgeRings />, decorators: [themed('light')] };
export const DockHighlightAtRowEdgesDark: Story = { render: () => <EdgeRings />, decorators: [themed('dark')] };
