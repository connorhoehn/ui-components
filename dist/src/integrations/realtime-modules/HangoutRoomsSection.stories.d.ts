import type { StoryObj } from '@storybook/react-vite';
import type { RMRoom, RMRoomOccupancy, RMUseHangoutRoomsReturn } from './types';
declare const meta: {
    title: string;
    component: import("../realtime").HangoutRoomsSectionComponent;
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
        rooms: RMUseHangoutRoomsReturn;
        occupancyFor?: (slug: string) => RMRoomOccupancy | null;
        occupancyAdapter?: import("@connorhoehn/realtime-modules/client/hangout-rooms").RoomsIndexSubscriber;
        participantId?: string;
        onJoinRoom?: (room: RMRoom) => void;
        onContextMenu?: (room: RMRoom, e: import("react").MouseEvent<HTMLElement>) => void;
        onOpenConversation?: (room: RMRoom) => void;
        onBrowseAll?: () => void;
        maxVisible?: number;
        title?: string;
        storageKey?: string;
        renderCreateDialog?: (props: {
            open: boolean;
            onClose: () => void;
        }) => React.ReactNode;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Loading: Story;
export declare const ErrorState: Story;
export declare const Empty: Story;
export declare const FourRooms: Story;
export declare const OverflowBrowseAll: Story;
//# sourceMappingURL=HangoutRoomsSection.stories.d.ts.map