import type { Meta, StoryObj } from '@storybook/react-vite';
import { AssetGallery } from './AssetGallery';
const meta = { title: 'Shared/AssetGallery', component: AssetGallery, tags: ['autodocs'], parameters: { layout: 'padded' } } satisfies Meta<typeof AssetGallery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Cast: Story = { args: { label: 'Cast', variant: 'avatars', items: Array.from({length: 18}, (_, i) => ({id: String(i), title: `Character ${i + 1}`, subtitle: '2 versions'})), onOpen: () => {} } };
export const References: Story = { args: { label: 'Location references', variant: 'images', items: [{id: '1', title: 'Driveway'}, {id:'2',title:'Long descriptive reference title with details in the inspector'}], onOpen: () => {} } };
export const Draggable: Story = { ...References, name: 'Host-owned drag identities', args: { ...References.args, onDragStart: (item, event) => { event.dataTransfer.setData('application/x-example-entity', item.id); event.dataTransfer.effectAllowed='copy'; } } };
/** Hover or focus a tile for its icon actions; Shift+F10 opens them as a menu (2.503.0). */
export const TileActions: Story = { args: { ...Cast.args, items: Cast.args!.items!.slice(0, 4), tileActions: (item) => [
  { id: 'develop', label: `Develop ${item.title}`, icon: '✎', onClick: () => {} },
  { id: 'art', label: 'Generate reference art', icon: '▣', onClick: () => {} },
] } };
/** Selecting a tile offers Open plus its actions. */
export const MenuOnSelect: Story = { args: { ...TileActions.args, menuOnSelect: true } };
/** In-progress work as the first tiles of the grid, each with its live status. */
export const LiveStatus: Story = { args: { label: 'Artwork', items: [{ id: 'run', title: 'Create artwork', status: { label: 'Running · Generate', tone: 'info' } }, { id: '1', title: 'Driveway' }], onOpen: () => {} } };
