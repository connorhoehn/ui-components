import type { StoryObj } from '@storybook/react-vite';
import { ConsentPage } from './ConsentPage';
declare const resolve: () => Promise<void>;
declare const meta: {
    title: string;
    component: typeof ConsentPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        clientName: string;
        scopes: string[];
        onAuthorize: typeof resolve;
        onDeny: typeof resolve;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The standard three-scope OIDC grant. */
export declare const Default: Story;
/** Only identity verification is requested. */
export declare const MinimalScope: Story;
/**
 * Unknown scopes fall through to the `Access: <scope>` wording, so custom
 * API scopes still read sensibly without a description table entry.
 */
export declare const CustomScopes: Story;
/** Full trust prompt: logo, redirect disclosure, and long-lived access. */
export declare const Branded: Story;
//# sourceMappingURL=ConsentPage.stories.d.ts.map