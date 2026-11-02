import type { Meta, StoryObj } from '@storybook/react-vite';
import { AssetGallery } from './AssetGallery';
const meta = { title: 'Shared/AssetGallery', component: AssetGallery, tags: ['autodocs'], parameters: { layout: 'padded' } } satisfies Meta<typeof AssetGallery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Cast: Story = { args: { label: 'Cast', variant: 'avatars', items: Array.from({length: 18}, (_, i) => ({id: String(i), title: `Character ${i + 1}`, subtitle: '2 versions'})), onOpen: () => {} } };
export const References: Story = { args: { label: 'Location references', variant: 'images', items: [{id: '1', title: 'Driveway'}, {id:'2',title:'Long descriptive reference title with details in the inspector'}], onOpen: () => {} } };
export const Draggable: Story = { ...References, name: 'Host-owned drag identities', args: { ...References.args, onDragStart: (item, event) => { event.dataTransfer.setData('application/x-example-entity', item.id); event.dataTransfer.effectAllowed='copy'; } } };
