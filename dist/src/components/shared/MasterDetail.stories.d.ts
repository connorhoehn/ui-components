import type { StoryObj } from '@storybook/react-vite';
import { type MasterDetailProps } from './MasterDetail';
interface Dimension {
    id: string;
    title: string;
    level: number | null;
}
declare function DimensionMasterDetail(props: MasterDetailProps<Dimension>): import("react").JSX.Element;
declare const meta: {
    title: string;
    component: typeof DimensionMasterDetail;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Interactive: Story;
export declare const Empty: Story;
//# sourceMappingURL=MasterDetail.stories.d.ts.map