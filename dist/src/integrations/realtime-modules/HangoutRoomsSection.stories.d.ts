import { StoryObj } from '@storybook/react-vite';
import { HangoutRoomsSection } from './HangoutRoomsSection';
import { RMRoom, RMRoomOccupancy, RMUseHangoutRoomsReturn } from './types';
declare const meta: {
    title: string;
    component: typeof HangoutRoomsSection;
    tags: string[];
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    decorators: ((Story: import('storybook/internal/csf').PartialStoryFn<import('@storybook/react').ReactRenderer, {
        rooms: RMUseHangoutRoomsReturn;
        occupancyFor?: ((slug: string) => RMRoomOccupancy | null) | undefined;
        occupancyAdapter?: import('@connorhoehnslalom/realtime-modules/client/hangout-rooms').RoomsIndexSubscriber | undefined;
        participantId?: string | undefined;
        onJoinRoom?: ((room: RMRoom) => void) | undefined;
        onContextMenu?: ((room: RMRoom, e: import('react').MouseEvent<HTMLElement>) => void) | undefined;
        onBrowseAll?: (() => void) | undefined;
        maxVisible?: number | undefined;
        title?: string | undefined;
        storageKey?: string | undefined;
        renderCreateDialog?: ((props: {
            open: boolean;
            onClose: () => void;
        }) => React.ReactNode) | undefined;
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