import type { StoryObj } from '@storybook/react-vite';
import { ImageLightbox } from './ImageLightbox';
declare const meta: {
    title: string;
    component: typeof ImageLightbox;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Gallery: Story;
export declare const SingleImage: Story;
export declare const UncontrolledNavigation: Story;
//# sourceMappingURL=ImageLightbox.stories.d.ts.map