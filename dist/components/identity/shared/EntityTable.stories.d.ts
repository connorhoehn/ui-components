import type { StoryObj } from '@storybook/react-vite';
import { type Column, type EntityTableProps } from './EntityTable';
interface UserRow extends Record<string, unknown> {
    userId: string;
    email: string;
    givenName: string;
    status: string;
    createdAt: string;
}
declare function UserEntityTable(props: EntityTableProps<UserRow>): import("react").JSX.Element;
declare const meta: {
    title: string;
    component: typeof UserEntityTable;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        columns: Column<UserRow>[];
        data: UserRow[];
        keyField: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Sortable columns, a rendered cell, and a right-aligned column. */
export declare const Default: Story;
/** Rows are clickable and each carries an action cluster. */
export declare const WithRowActions: Story;
/**
 * The empty state is identity's own contract — a Card with an emoji and a
 * message, not an in-table row.
 */
export declare const Empty: Story;
/** Loading wins over the empty branch, so skeleton rows render instead. */
export declare const Loading: Story;
//# sourceMappingURL=EntityTable.stories.d.ts.map