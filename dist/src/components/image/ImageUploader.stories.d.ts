import type { StoryObj } from '@storybook/react-vite';
import { ImageUploader } from './ImageUploader';
import { type UploadedImage } from '../pipelines/services';
declare const meta: {
    title: string;
    component: typeof ImageUploader;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        value: import("./ImageUploader").ImageUploaderValue | null;
        onChange: (next: UploadedImage | null) => void;
        maxSize?: number;
        accept?: string;
        fileOnly?: boolean;
        urlOnly?: boolean;
        className?: string;
        'data-testid'?: string;
    }>, context: import("storybook/internal/csf").StoryContext<import("@storybook/react").ReactRenderer, {
        value: import("./ImageUploader").ImageUploaderValue | null;
        onChange: (next: UploadedImage | null) => void;
        maxSize?: number;
        accept?: string;
        fileOnly?: boolean;
        urlOnly?: boolean;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Empty: Story;
export declare const FileOnly: Story;
export declare const UrlOnly: Story;
export declare const WithValue: Story;
export declare const ErrorOnUpload: Story;
export declare const NoUploadServiceWired: Story;
export declare const NoUploadWired: Story;
//# sourceMappingURL=ImageUploader.stories.d.ts.map