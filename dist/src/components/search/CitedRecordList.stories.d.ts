import type { StoryObj } from '@storybook/react-vite';
import { CitedRecordList, type CitedRecordItem } from './CitedRecordList';
declare const meta: {
    title: string;
    component: typeof CitedRecordList;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        records: CitedRecordItem[];
        onOpen: () => void;
        onViewConnections: () => void;
        footnote: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Under an assistant answer: people, work to coordinate, numbered sources. */
export declare const Default: Story;
/** An answer that cites people only: no work section, sources still listed. */
export declare const NoWork: Story;
export declare const Dark: Story;
//# sourceMappingURL=CitedRecordList.stories.d.ts.map