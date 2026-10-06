import type { StoryObj } from '@storybook/react-vite';
import Modal from './Modal';
declare const meta: {
    title: string;
    component: typeof Modal;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithTitle: Story;
export declare const WithFooter: Story;
export declare const Interactive: Story;
//# sourceMappingURL=Modal.stories.d.ts.map