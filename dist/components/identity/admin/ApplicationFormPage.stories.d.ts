import type { StoryObj } from '@storybook/react-vite';
import { ApplicationFormPage } from './ApplicationFormPage';
declare const meta: {
    title: string;
    component: typeof ApplicationFormPage;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        isEdit: false;
        pools: {
            poolId: string;
            poolName: string;
        }[];
        onSubmit: () => Promise<void>;
        onCancel: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * Create: one blank redirect URI, `authorization_code` + `code`, and the
 * default `openid profile email` scope.
 */
export declare const Create: Story;
/** Edit a browser app: multiple redirect URIs and refresh-token support. */
export declare const EditWebApp: Story;
/**
 * A machine-to-machine client: no redirect URIs, `client_credentials` only,
 * and a non-OIDC scope — the grant/response checkbox groups carry the shape.
 */
export declare const MachineToMachine: Story;
/** Validation failure returned by the server. */
export declare const WithError: Story;
//# sourceMappingURL=ApplicationFormPage.stories.d.ts.map