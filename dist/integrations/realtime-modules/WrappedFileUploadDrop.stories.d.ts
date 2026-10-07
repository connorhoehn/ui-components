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
        accept?: string;
        maxSize?: number;
        multiple?: boolean;
        disabled?: boolean;
        label?: string;
        className?: string;
        uploadMetadata?: Record<string, unknown>;
        onError?: (message: string) => void;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Idle: Story;
export declare const Uploading: Story;
export declare const Scanning: Story;
export declare const Mixed: Story;
export declare const Disabled: Story;
//# sourceMappingURL=WrappedFileUploadDrop.stories.d.ts.map