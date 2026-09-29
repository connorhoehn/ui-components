import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocumentActivityCard } from './DocumentActivityCard';
import { DocumentChip } from './DocumentChip';

// A document, as it appears in the thread it was shared into — and what that
// card turns into once the document behind it cannot be reached. The share is
// history, so the card stays; it just stops pretending to be a way in.

const meta: Meta<typeof DocumentActivityCard> = {
  title: 'Social/DocumentActivityCard',
  component: DocumentActivityCard,
  decorators: [
    (Story) => (
      <div className="max-w-[520px] p-4">
        <Story />
      </div>
    ),
  ],
  args: { documentId: 'd1', title: 'Upload path RFC', createdBy: 'Hank Anderson', onOpen: () => {} },
};
export default meta;

type Story = StoryObj<typeof DocumentActivityCard>;

export const Default: Story = {};

export const Editing: Story = {
  args: { editors: [{ userId: 'dev-hank', displayName: 'Hank Anderson' }, { userId: 'dev-bob', displayName: 'Bob Martinez' }] },
};

/** The document was deleted (the server answers 404): muted, labelled, no Open. */
export const Gone: Story = { args: { unavailable: 'gone' } };

/** The document exists but is not shared with the viewer. */
export const Forbidden: Story = { args: { unavailable: 'forbidden' } };

/** The `#` reference chips under a message, live and unavailable side by side. */
export const Chips: Story = {
  render: () => (
    <div className="flex flex-wrap gap-1">
      <DocumentChip documentId="d1" label="Roadmap" onOpen={() => {}} />
      <DocumentChip documentId="d2" label="Old probe" onOpen={() => {}} unavailable="gone" />
      <DocumentChip documentId="d3" label="Hank's notes" onOpen={() => {}} unavailable="forbidden" />
    </div>
  ),
};
