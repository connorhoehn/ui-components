import type { StoryObj } from '@storybook/react-vite';
import { SubNavLayout } from './SubNavLayout';
declare const meta: {
    title: string;
    component: typeof SubNavLayout;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Flat: Story;
export declare const Grouped: Story;
/**
 * A host that already sits inside its own shell `<main id="main-content">`
 * (Observability, Ingest, Identity, Distillation…) passes `contentAs="section"`
 * with `contentLabel` so the content pane names itself instead of adding a
 * second `<main>` landmark. `railLabel` gives the rail nav its own name too.
 */
export declare const NamedLandmarks: Story;
//# sourceMappingURL=SubNavLayout.stories.d.ts.map