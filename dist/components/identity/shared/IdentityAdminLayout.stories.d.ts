import type { StoryObj } from '@storybook/react-vite';
import { IdentityAdminLayout } from './IdentityAdminLayout';
declare const meta: {
    title: string;
    component: typeof IdentityAdminLayout;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        children: import("react").JSX.Element;
        onNavigate: (path: string) => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * The collapsed chrome, rendered directly via `defaultSidebarOpen` — what a
 * host shows when it restores the user's saved preference on mount. The prop
 * is initial-only, so the header toggle still reopens the sidebar.
 */
export declare const SidebarCollapsed: Story;
/**
 * The full admin chrome. The header toggle collapses the sidebar; pass
 * `defaultSidebarOpen={false}` to start there instead.
 */
export declare const Default: Story;
/** A deeper section selected — `activePath` drives the `aria-current` rail. */
export declare const AuditSelected: Story;
/**
 * Embedded in a host that owns its own session UI: no email, no logout, so
 * the header keeps only the sidebar toggle.
 */
export declare const WithoutSessionControls: Story;
//# sourceMappingURL=IdentityAdminLayout.stories.d.ts.map