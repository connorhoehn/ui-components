import type { StoryObj } from '@storybook/react-vite';
import type { RMRoomOccupancy } from './types';
declare const meta: {
    title: string;
    component: import("../realtime").HangoutRoomRowComponent;
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
        participantId?: string;
        occupancy?: RMRoomOccupancy | null;
        subscribeRoomsIndex?: import("@connorhoehn/realtime-modules/client/hangout-rooms").RoomsIndexSubscriber;
        onClick?: () => void;
        onContextMenu?: (e: import("react").MouseEvent<HTMLElement>) => void;
        onOpenConversation?: () => void;
        kebab?: React.ReactNode;
        className?: string;
        'data-testid'?: string;
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