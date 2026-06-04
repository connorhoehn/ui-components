import type { StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
declare const meta: {
    title: string;
    component: typeof AppShell;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        header: import("react/jsx-runtime").JSX.Element;
        children: import("react/jsx-runtime").JSX.Element;
        toastRegion: null;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const WithSidebar: Story;
export declare const NoSidebar: Story;
export declare const WithApiDegradedBanner: Story;
export declare const LoadingState: Story;
//# sourceMappingURL=AppShell.stories.d.ts.map