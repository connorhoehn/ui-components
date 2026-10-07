import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocumentActivityCard } from './DocumentActivityCard';
declare const meta: Meta<typeof DocumentActivityCard>;
export default meta;
type Story = StoryObj<typeof DocumentActivityCard>;
export declare const Default: Story;
export declare const Editing: Story;
/** The document was deleted (the server answers 404): muted, labelled, no Open. */
export declare const Gone: Story;
/** The document exists but is not shared with the viewer. */
export declare const Forbidden: Story;
/** The `#` reference chips under a message, live and unavailable side by side. */
export declare const Chips: Story;
//# sourceMappingURL=DocumentActivityCard.stories.d.ts.map