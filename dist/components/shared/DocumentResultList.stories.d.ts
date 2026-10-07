import type { StoryObj } from '@storybook/react-vite';
import { DocumentResultList } from './DocumentResultList';
declare const meta: {
    title: string;
    component: typeof DocumentResultList;
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** "Auth architecture" has a live call: the presence indicator sits at the row's right. */
export declare const RowInACall: Story;
export declare const RowInACallDark: Story;
//# sourceMappingURL=DocumentResultList.stories.d.ts.map