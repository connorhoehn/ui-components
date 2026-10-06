import type { StoryObj } from '@storybook/react-vite';
import { StartCallDrawer } from './StartCallDrawer';
declare const meta: {
    title: string;
    component: typeof StartCallDrawer;
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Mockup 01: Alice and Frank ticked and chipped, two review documents, ring on. */
export declare const Default: Story;
export declare const DefaultDark: Story;
/** 1280 × 720: the column is 360px. */
export declare const Narrow: Story;
/** Audio: the camera pre-check is gone. */
export declare const Audio: Story;
/** Microphone and camera blocked in the browser. */
export declare const PermissionDenied: Story;
export declare const PermissionDeniedDark: Story;
export declare const LoadingCollaborators: Story;
export declare const Starting: Story;
export declare const StartFailed: Story;
export declare const StartFailedDark: Story;
//# sourceMappingURL=StartCallDrawer.stories.d.ts.map