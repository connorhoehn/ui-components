import type { Meta, StoryObj } from '@storybook/react-vite';
import { AssetGallery } from './AssetGallery';
import { Button } from '../ui/Button';
const meta = { title: 'Shared/AssetGallery', component: AssetGallery, tags: ['autodocs'], parameters: { layout: 'padded' } } satisfies Meta<typeof AssetGallery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Cast: Story = { args: { label: 'Cast', variant: 'avatars', items: Array.from({length: 18}, (_, i) => ({id: String(i), title: `Character ${i + 1}`, subtitle: '2 versions'})), onOpen: () => {} } };
export const References: Story = { args: { label: 'Location references', variant: 'images', items: [{id: '1', title: 'Driveway'}, {id:'2',title:'Long descriptive reference title with details in the inspector'}], onOpen: () => {} } };
export const Draggable: Story = { ...References, name: 'Host-owned drag identities', args: { ...References.args, onDragStart: (item, event) => { event.dataTransfer.setData('application/x-example-entity', item.id); event.dataTransfer.effectAllowed='copy'; } } };
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
