import type { StoryObj } from '@storybook/react-vite';
import { PipelinesListView } from './PipelinesListView';
import type { PipelinesListEntry } from './catalog';
export declare const ENTRIES: PipelinesListEntry[];
declare const meta: {
    title: string;
    component: typeof PipelinesListView;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The mockup: twelve pipelines in three groups, the docked agent composer below. */
export declare const Directory: Story;
/** The mockup's card: toolbar and groups inside one border + radius; header and composer outside it. */
export declare const Framed: Story;
/** Without a composer: the list takes the whole column. */
export declare const NoFooter: Story;
export declare const Empty: Story;
export declare const Loading: Story;
export declare const LoadError: Story;
//# sourceMappingURL=PipelinesListView.stories.d.ts.map