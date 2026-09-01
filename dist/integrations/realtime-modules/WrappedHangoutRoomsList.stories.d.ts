import type { StoryObj } from '@storybook/react-vite';
import { WrappedHangoutRoomsList } from './WrappedHangoutRoomsList';
import type { RMRoom, RMRoomOccupancy, RMUseHangoutRoomsReturn } from './types';
declare const meta: {
    title: string;
    component: typeof WrappedHangoutRoomsList;
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
        subscribeRoomsIndex?: import("@connorhoehn/realtime-modules/client/hangout-rooms").RoomsIndexSubscriber | undefined;
        occupancyFor?: ((slug: string) => RMRoomOccupancy | null) | undefined;
        participantId?: string | undefined;
        onJoin?: ((slug: string) => void) | undefined;
        onContextMenu?: ((room: RMRoom, e: import("react").MouseEvent<HTMLElement>) => void) | undefined;
        onBrowseAll?: (() => void) | undefined;
        maxVisible?: number | undefined;
        title?: string | undefined;
        storageKey?: string | undefined;
        renderEmpty?: import("react").ReactNode;
        renderCreateDialog?: ((props: {
            open: boolean;
            onClose: () => void;
        }) => import("react").ReactNode) | undefined;
        wrapWithNetworkShim?: import("./networkShim").NetworkShimOptions | undefined;
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