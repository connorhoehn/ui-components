import type { StoryObj } from '@storybook/react-vite';
import PermissionDeniedCard from './PermissionDeniedCard';
declare const meta: {
    title: string;
    component: typeof PermissionDeniedCard;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const CameraDenied: Story;
export declare const MicrophoneBlocked: Story;
export declare const ScreenUnavailable: Story;
//# sourceMappingURL=PermissionDeniedCard.stories.d.ts.map