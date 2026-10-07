import type { StoryObj } from '@storybook/react-vite';
import { ImageThumbnail } from './ImageThumbnail';
declare const meta: {
    title: string;
    component: typeof ImageThumbnail;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        size: {
            control: "radio";
            options: string[];
        };
        aspectRatio: {
            control: "radio";
            options: string[];
        };
        rounded: {
            control: "boolean";
        };
        loading: {
            control: "radio";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Small: Story;
export declare const Large: Story;
export declare const VideoAspect: Story;
export declare const RoundedAvatar: Story;
export declare const BrokenSrc: Story;
export declare const CustomFallback: Story;
export declare const AllSizes: StoryObj;
//# sourceMappingURL=ImageThumbnail.stories.d.ts.map