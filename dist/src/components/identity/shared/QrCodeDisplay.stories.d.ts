import type { StoryObj } from '@storybook/react-vite';
import { QrCodeDisplay } from './QrCodeDisplay';
declare const meta: {
    title: string;
    component: typeof QrCodeDisplay;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        value: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** No label: the image falls back to `alt="QR Code"` and no caption renders. */
export declare const Default: Story;
/** With a caption — the same string is also the image's alt text. */
export declare const Labelled: Story;
/** Compact, for a side panel rather than a full enrolment page. */
export declare const Small: Story;
/** Oversized, for print or a projected setup walkthrough. */
export declare const Large: Story;
//# sourceMappingURL=QrCodeDisplay.stories.d.ts.map