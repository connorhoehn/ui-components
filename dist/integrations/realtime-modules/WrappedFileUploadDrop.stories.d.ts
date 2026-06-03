import type { StoryObj } from '@storybook/react-vite';
import { WrappedFileUploadDrop } from './WrappedFileUploadDrop';
import type { RMUseFileUploadReturn } from './types';
declare const meta: {
    title: string;
    component: typeof WrappedFileUploadDrop;
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
        fileUpload: RMUseFileUploadReturn;
        accept?: string | undefined;
        maxSize?: number | undefined;
        multiple?: boolean | undefined;
        disabled?: boolean | undefined;
        label?: string | undefined;
        className?: string | undefined;
        uploadMetadata?: Record<string, unknown> | undefined;
        onError?: ((message: string) => void) | undefined;
    }>) => import("react/jsx-runtime").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Idle: Story;
export declare const Uploading: Story;
export declare const Scanning: Story;
export declare const Mixed: Story;
export declare const Disabled: Story;
//# sourceMappingURL=WrappedFileUploadDrop.stories.d.ts.map