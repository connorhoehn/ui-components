import type { StoryObj } from '@storybook/react-vite';
import EventTimeline, { type EventItem } from './EventTimeline';
declare const meta: {
    title: string;
    component: typeof EventTimeline;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        events: EventItem[];
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        events: EventItem[];
        selectedId?: string | null | undefined;
        onSelect?: ((id: string) => void) | undefined;
        live?: boolean | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Populated: Story;
/** `live` pins the view to the newest event as the stream appends. */
export declare const Live: Story;
/** Nothing dispatched yet — the usual first-paint state. */
export declare const Empty: Story;
/** Selection is host-owned; the timeline only reports it. */
export declare const Selectable: Story;
//# sourceMappingURL=EventTimeline.stories.d.ts.map