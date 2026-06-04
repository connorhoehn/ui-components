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
        endIso?: string | undefined;
        durationSec: number;
        participantCount?: number | undefined;
        thumbnailUrl?: string | undefined;
        label?: string | undefined;
        status?: import("./RecordingRow").RecordingStatus | undefined;
        selected?: boolean | undefined;
        onClick?: ((id: string) => void) | undefined;
        actions?: import("react").ReactNode;
        className?: string | undefined;
    }>) => import("react/jsx-runtime").JSX.Element)[];
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