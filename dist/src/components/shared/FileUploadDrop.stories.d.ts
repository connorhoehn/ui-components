import { StoryObj } from '@storybook/react-vite';
import { FileUploadDrop } from './FileUploadDrop';
declare const meta: {
    title: string;
    component: typeof FileUploadDrop;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        onFiles: (files: File[]) => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const ImagesOnly: Story;
export declare const WithMaxSize: Story;
export declare const MultipleFiles: Story;
export declare const PdfOnly: Story;
export declare const Disabled: Story;
//# sourceMappingURL=FileUploadDrop.stories.d.ts.map