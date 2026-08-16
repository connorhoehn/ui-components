import type { StoryObj } from '@storybook/react-vite';
import { HangoutRoomRow } from './HangoutRoomRow';
import type { RMRoomOccupancy } from './types';
declare const meta: {
    title: string;
    component: typeof HangoutRoomRow;
    tags: string[];
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        slug: string;
        name: string;
        participantId?: string | undefined;
        occupancy?: (RMRoomOccupancy | null) | undefined;
        subscribeRoomsIndex?: import("@connorhoehn/realtime-modules/client/hangout-rooms").RoomsIndexSubscriber | undefined;
        onClick?: (() => void) | undefined;
        onContextMenu?: ((e: import("react").MouseEvent<HTMLElement>) => void) | undefined;
        kebab?: import("react").ReactNode;
        className?: string | undefined;
        'data-testid'?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const EmptyRoom: Story;
export declare const JustYou: Story;
export declare const SmallGroup: Story;
export declare const LargerGroup: Story;
export declare const ObserverView: Story;
export declare const NoOccupancyYet: Story;
//# sourceMappingURL=HangoutRoomRow.stories.d.ts.map