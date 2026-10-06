import type { StoryObj } from '@storybook/react-vite';
import type { RMRoom, RMRoomOccupancy, RMUseHangoutRoomsReturn } from './types';
declare const meta: {
    title: string;
    component: import("../realtime").WrappedHangoutRoomsListComponent;
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
        hangoutRooms: RMUseHangoutRoomsReturn;
        subscribeRoomsIndex?: import("@connorhoehn/realtime-modules/client/hangout-rooms").RoomsIndexSubscriber;
        occupancyFor?: (slug: string) => RMRoomOccupancy | null;
        participantId?: string;
        onJoin?: (slug: string) => void;
        onContextMenu?: (room: RMRoom, e: import("react").MouseEvent<HTMLElement>) => void;
        onBrowseAll?: () => void;
        maxVisible?: number;
        title?: string;
        storageKey?: string;
        renderEmpty?: import("react").ReactNode;
        renderCreateDialog?: (props: {
            open: boolean;
            onClose: () => void;
        }) => import("react").ReactNode;
        wrapWithNetworkShim?: import("./networkShim").NetworkShimOptions;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Empty: Story;
export declare const Loading: Story;
export declare const Populated: Story;
export declare const OneRoomFullOfSelf: Story;
export declare const ErrorState: Story;
export declare const EmptyWithRenderSlot: Story;
//# sourceMappingURL=WrappedHangoutRoomsList.stories.d.ts.map