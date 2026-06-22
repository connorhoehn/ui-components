import { StoryObj } from '@storybook/react-vite';
import { DataTableProps } from './DataTable';
interface Run {
    id: string;
    pipeline: string;
    status: 'running' | 'succeeded' | 'failed' | 'pending';
    duration: number;
    owner: string;
    startedAt: string;
}
declare function RunsDataTable(props: DataTableProps<Run>): import("react").JSX.Element;
declare const meta: {
    title: string;
    component: typeof RunsDataTable;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const Searchable: Story;
export declare const Paginated: Story;
export declare const SearchableAndPaginated: Story;
export declare const WithRowActions: Story;
export declare const Loading: Story;
export declare const Empty: Story;
//# sourceMappingURL=DataTable.stories.d.ts.map