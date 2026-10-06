import type { StoryObj } from '@storybook/react-vite';
import { RecordingRow } from './RecordingRow';
declare const meta: {
    title: string;
    component: typeof RecordingRow;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        id: string;
        startIso: string;
        endIso?: string;
        durationSec: number;
        participantCount?: number;
        thumbnailUrl?: string;
        label?: string;
        status?: import("./RecordingRow").RecordingStatus;
        selected?: boolean;
        onClick?: (id: string) => void;
        actions?: import("react").ReactNode;
        className?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Selected: Story;
export declare const NoThumbnail: Story;
export declare const NoLabel: Story;
export declare const Processing: Story;
export declare const Failed: Story;
export declare const WithActions: Story;
export declare const NonInteractive: Story;
//# sourceMappingURL=RecordingRow.stories.d.ts.map