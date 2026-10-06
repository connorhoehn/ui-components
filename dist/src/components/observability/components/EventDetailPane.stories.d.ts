import type { StoryObj } from '@storybook/react-vite';
import EventDetailPane from './EventDetailPane';
import type { EventItem } from './EventTimeline';
declare const meta: {
    title: string;
    component: typeof EventDetailPane;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        event: EventItem;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        event: EventItem | null;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Payload is pretty-printed JSON — this is the debugging surface. */
export declare const FailureEvent: Story;
export declare const SuccessEvent: Story;
/** Nothing selected in the timeline. */
export declare const NoSelection: Story;
/** An event that arrived without a payload still renders its header. */
export declare const NoPayload: Story;
//# sourceMappingURL=EventDetailPane.stories.d.ts.map