import type { StoryObj } from '@storybook/react-vite';
import { WrappedHangoutLayout } from './WrappedHangoutLayout';
import type { RMUseVideoHangoutReturn } from './types';
declare const meta: {
    title: string;
    component: typeof WrappedHangoutLayout;
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
        hangout: RMUseVideoHangoutReturn;
        localClientId?: string | null;
        videoElements?: Record<string, import("react").ReactNode>;
        mode?: import("../..").HangoutMode;
        spotlightContent?: import("react").ReactNode;
        activeSpeakerId?: string | null;
        speakerHysteresisMs?: number;
        onParticipantClick?: (id: string) => void;
        className?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Auto: Story;
export declare const Spotlight: Story;
export declare const JustLocal: Story;
export declare const ObserverView: Story;
export declare const Empty: Story;
//# sourceMappingURL=WrappedHangoutLayout.stories.d.ts.map