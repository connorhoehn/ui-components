import type { Meta, StoryObj } from '@storybook/react-vite';
import { AssetGallery } from './AssetGallery';
import { Button } from '../ui/Button';
const meta = { title: 'Shared/AssetGallery', component: AssetGallery, tags: ['autodocs'], parameters: { layout: 'padded' } } satisfies Meta<typeof AssetGallery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Cast: Story = { args: { label: 'Cast', variant: 'avatars', items: Array.from({length: 18}, (_, i) => ({id: String(i), title: `Character ${i + 1}`, subtitle: '2 versions'})), onOpen: () => {} } };
export const References: Story = { args: { label: 'Location references', variant: 'images', items: [{id: '1', title: 'Driveway'}, {id:'2',title:'Long descriptive reference title with details in the inspector'}], onOpen: () => {} } };
export const Draggable: Story = { ...References, name: 'Host-owned drag identities', args: { ...References.args, onDragStart: (item, event) => { event.dataTransfer.setData('application/x-example-entity', item.id); event.dataTransfer.effectAllowed='copy'; } } };
/** Hover or focus a tile for its icon actions; Shift+F10 opens them as a menu (2.504.0). */
export const TileActions: Story = { args: { ...Cast.args, items: Cast.args!.items!.slice(0, 4), tileActions: (item) => [
  { id: 'develop', label: `Develop ${item.title}`, icon: '✎', onClick: () => {} },
  { id: 'art', label: 'Generate reference art', icon: '▣', onClick: () => {} },
] } };
/** Selecting a tile offers Open plus its actions. */
export const MenuOnSelect: Story = { args: { ...TileActions.args, menuOnSelect: true } };
/** In-progress work as the first tiles of the grid, each with its live status. */
export const LiveStatus: Story = { args: { label: 'Artwork', items: [{ id: 'run', title: 'Create artwork', status: { label: 'Running · Generate', tone: 'info' } }, { id: '1', title: 'Driveway' }], onOpen: () => {} } };
export const StatusAndVisibleActions: Story = {
  name: 'Status on the card, actions at rest',
  args: {
    label: 'Generated artwork',
    variant: 'images',
    actionsVisibility: 'always',
    items: [
      { id: '1', title: 'Driveway, dusk', subtitle: 'v3', status: { state: 'success', label: 'Approved' } },
      { id: '2', title: 'Driveway, noon', subtitle: 'v2', status: { state: 'warning', label: 'Needs review' } },
      { id: '3', title: 'Garage interior', subtitle: 'v1', status: { state: 'pending', label: 'Generating' } },
      { id: '4', title: 'Back yard', subtitle: 'v1' },
    ],
    onOpen: () => {},
    actions: () => <Button size="sm" variant="secondary">Use in scene</Button>,
  },
};
/**
 * Cast cards (2.512.0): in `avatars` the status is the caption's first line —
 * a tone dot and the whole word, never "C." — and a member with no picture
 * shows the library's empty tile with the host's `placeholder`.
 */
export const CastWithStatusAndPlaceholder: Story = {
  name: 'Cast: status under the tile, "No picture yet"',
  args: {
    label: 'Cast',
    variant: 'avatars',
    items: [
      { id: 'tatter', title: 'Tatter', subtitle: 'Lead', status: { label: 'Approved', tone: 'success' }, placeholder: 'No picture yet' },
      { id: 'mina', title: 'Mina', subtitle: 'Supporting', status: { label: 'Candidate', tone: 'warning' }, placeholder: 'No picture yet' },
      { id: 'otto', title: 'Otto', subtitle: 'Supporting', status: { label: 'Needs review', tone: 'info' }, placeholder: 'No picture yet' },
      { id: 'pip', title: 'Pip', placeholder: 'No picture yet' },
    ],
    onOpen: () => {},
  },
};
/**
 * Long action labels (2.515.0): `minTileWidth` gives auto-fill columns of at
 * least that width, and the tile's action row wraps — a label longer than the
 * tile wraps inside its button — so nothing runs into the neighbouring tile.
 * The Storymaker cast grid ("Approve for mesh · uses credits", "Cut it out
 * (no credits)") at a 390px phone column and a 1440px desktop column.
 */
const castWithLongActions = {
  label: 'Cast',
  variant: 'avatars' as const,
  actionsVisibility: 'always' as const,
  minTileWidth: 160,
  items: ['Toby', 'Mina', 'Ledger', 'Pip', 'Grandpa Ott', 'The Shopkeeper', 'Rook', 'Bea'].map((title, i) => ({
    id: String(i), title, subtitle: i === 0 ? 'Lead' : 'Candidate', status: { state: i % 2 ? 'warning' : 'success', label: i % 2 ? 'Needs review' : 'Approved' } as const,
  })),
  onOpen: () => {},
  actions: () => (
    <>
      <Button size="sm" variant="primary">Approve for mesh · uses credits</Button>
      <Button size="sm" variant="secondary">Cut it out (no credits)</Button>
    </>
  ),
};
export const LongActionsAt390: Story = {
  name: 'Long tile actions at 390px',
  args: castWithLongActions,
  render: (args) => <div className="w-[390px] max-w-full"><AssetGallery {...args} /></div>,
};
export const LongActionsAt1440: Story = {
  name: 'Long tile actions at 1440px',
  args: castWithLongActions,
  render: (args) => <div className="w-[1440px] max-w-full"><AssetGallery {...args} /></div>,
};
