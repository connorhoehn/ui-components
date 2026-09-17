import { JSX } from 'react';

export declare function AdminDashboardPage({ stats, pools, onNavigate, loading }: AdminDashboardPageProps): JSX.Element;

export declare interface AdminDashboardPageProps {
    stats: {
        userPools: number;
        clients: number;
        totalUsers: number;
    };
    pools: Array<{
        poolId: string;
        poolName: string;
        createdAt: string;
    }>;
    onNavigate: (path: string) => void;
    loading?: boolean;
}

export declare function ApplicationFormPage({ application, isEdit, pools, onSubmit, onCancel, error, }: ApplicationFormPageProps): JSX.Element;

export declare interface ApplicationFormPageProps {
    application?: {
        clientId?: string;
        clientName: string;
        poolId: string;
        redirectUris: string[];
        postLogoutRedirectUris?: string[];
        grantTypes: string[];
        responseTypes?: string[];
        scope?: string;
    };
    isEdit: boolean;
    pools: Array<{
        poolId: string;
        poolName: string;
    }>;
    onSubmit: (data: {
        clientName: string;
        poolId: string;
        redirectUris: string[];
        postLogoutRedirectUris: string[];
        grantTypes: string[];
        responseTypes: string[];
        scope: string;
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

export declare function ApplicationListPage({ applications, onCreateApp, onCreateAppWithPool, onEditApp, onDeleteApp, loading, }: ApplicationListPageProps): JSX.Element;

export declare interface ApplicationListPageProps {
    applications: Array<{
        clientId: string;
        clientName: string;
        poolId: string;
        poolName?: string;
        redirectUris: string[];
    }>;
    onCreateApp: () => void;
    onCreateAppWithPool: () => void;
    onEditApp: (clientId: string) => void;
    onDeleteApp: (clientId: string) => Promise<void>;
    loading?: boolean;
}

export declare function ApplicationPoolFormPage({ onSubmit, onCancel, error }: ApplicationPoolFormPageProps): JSX.Element;

export declare interface ApplicationPoolFormPageProps {
    onSubmit: (data: {
        clientName: string;
        poolName: string;
        redirectUris: string[];
        grantTypes?: string[];
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

export declare function AuditPage({ records, onQuery, onViewEntity, onReplay, loading, totalRecords, }: AuditPageProps): JSX.Element;

export declare interface AuditPageProps {
    records: Array<{
        timestamp: number;
        actor: {
            id?: string;
            email?: string;
        } | string;
        entityType: string;
        entityId: string;
        operation: string;
    }>;
    onQuery: (params: {
        entityType?: string;
        entityId?: string;
        fromTime?: number;
        toTime?: number;
        limit?: number;
    }) => Promise<void>;
    onViewEntity: (entityType: string, entityId: string) => void;
    onReplay: (entityId: string, atTime: number) => Promise<Record<string, unknown> | null>;
    loading?: boolean;
    totalRecords?: number;
}

export declare function CodeInput({ length, onComplete, error, disabled, autoFocus, }: CodeInputProps): JSX.Element;

export declare interface CodeInputProps {
    length?: number;
    onComplete: (code: string) => void;
    error?: string | null;
    disabled?: boolean;
    autoFocus?: boolean;
}

export declare interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'right' | 'center';
}

export declare function ConsentPage({ clientName, scopes, redirectUri, onAuthorize, onDeny, logoUrl, }: ConsentPageProps): JSX.Element;

export declare interface ConsentPageProps {
    clientName: string;
    scopes: string[];
    redirectUri?: string;
    onAuthorize: () => Promise<void>;
    onDeny: () => Promise<void>;
    logoUrl?: string;
}

export declare function DiagnosticsPage({ diagnostics, rates, dlq, onRedrive, onPurge, onRefresh, loading, }: DiagnosticsPageProps): JSX.Element;

export declare interface DiagnosticsPageProps {
    diagnostics?: Record<string, unknown>;
    rates?: Record<string, unknown>;
    dlq?: Array<{
        id: string;
        payload: unknown;
        error: string;
        failedAt: string;
        retryCount: number;
    }>;
    onRedrive: (id: string) => Promise<void>;
    onPurge: (id: string) => Promise<void>;
    onRefresh: () => void;
    loading?: boolean;
}

export declare function EmailTemplateFormPage({ template, isEdit, onSubmit, onCancel, error, }: EmailTemplateFormPageProps): JSX.Element;

export declare interface EmailTemplateFormPageProps {
    template?: {
        templateId?: string;
        name: string;
        subject: string;
        htmlBody: string;
        textBody: string;
        variables: string[];
    };
    isEdit: boolean;
    onSubmit: (data: {
        name: string;
        subject: string;
        htmlBody: string;
        textBody: string;
        variables: string[];
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

export declare function EmailTemplateListPage({ templates, onCreateTemplate, onEditTemplate, onDeleteTemplate, onTestSend, loading, }: EmailTemplateListPageProps): JSX.Element;

export declare interface EmailTemplateListPageProps {
    templates: Array<{
        templateId: string;
        name: string;
        subject: string;
    }>;
    onCreateTemplate: () => void;
    onEditTemplate: (templateId: string) => void;
    onDeleteTemplate: (templateId: string) => Promise<void>;
    onTestSend: (templateId: string, email: string) => Promise<void>;
    loading?: boolean;
}

export declare function EntityTable<T extends Record<string, unknown>>({ columns, data, keyField, onRowClick, actions, emptyMessage, emptyIcon, loading, }: EntityTableProps<T>): JSX.Element;

export declare interface EntityTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyField: string;
    onRowClick?: (item: T) => void;
    actions?: (item: T) => React.ReactNode;
    emptyMessage?: string;
    emptyIcon?: string;
    loading?: boolean;
}

export declare function ErrorPage({ title, message, error, onRetry, onBack, }: ErrorPageProps): JSX.Element;

export declare interface ErrorPageProps {
    title?: string;
    message: string;
    error?: string;
    onRetry?: () => void;
    onBack?: () => void;
}

export declare function FormField({ label, name, type, value, onChange, error, required, placeholder, options, helpText, disabled, }: FormFieldProps): JSX.Element;

export declare interface FormFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'number';
    value: string | boolean | number;
    onChange: (value: string | boolean | number) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    options?: Array<{
        value: string;
        label: string;
    }>;
    helpText?: string;
    disabled?: boolean;
}

export declare function GroupFormPage({ group, isEdit, members, availableUsers, onSubmit, onAddMember, onRemoveMember, onCancel, error, }: GroupFormPageProps): JSX.Element;

export declare interface GroupFormPageProps {
    group?: {
        groupId?: string;
        groupName: string;
        description?: string;
        permissions: string[];
    };
    isEdit: boolean;
    poolId: string;
    members?: Array<{
        userId: string;
        email: string;
    }>;
    availableUsers?: Array<{
        userId: string;
        email: string;
    }>;
    onSubmit: (data: {
        groupName: string;
        description: string;
        permissions: string[];
    }) => Promise<void>;
    onAddMember?: (userId: string) => Promise<void>;
    onRemoveMember?: (userId: string) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

export declare function GroupListPage({ groups, poolName, onCreateGroup, onEditGroup, onDeleteGroup, loading, }: GroupListPageProps): JSX.Element;

export declare interface GroupListPageProps {
    groups: Array<{
        groupId: string;
        groupName: string;
        description?: string;
        permissions: string[];
    }>;
    poolId: string;
    poolName: string;
    onCreateGroup: () => void;
    onEditGroup: (groupId: string) => void;
    onDeleteGroup: (groupId: string) => Promise<void>;
    loading?: boolean;
}

export declare function IdentityAdminLayout({ children, activePath, adminEmail, onNavigate, onLogout, defaultSidebarOpen, }: IdentityAdminLayoutProps): JSX.Element;

export declare interface IdentityAdminLayoutProps {
    children: React.ReactNode;
    activePath?: string;
    adminEmail?: string;
    onNavigate: (path: string) => void;
    onLogout?: () => void;
    /**
     * Whether the sidebar starts open. Optional and **initial-only** — the
     * layout still owns the state afterwards, so the header toggle keeps
     * working. Omit it and the sidebar starts open, which is the historical
     * behaviour.
     *
     * It exists because the collapsed rail was previously reachable only by
     * clicking the toggle: a host cannot restore the user's saved preference
     * on mount, a story cannot show the collapsed chrome, and a test has to
     * click before it can assert on it.
     */
    defaultSidebarOpen?: boolean;
}

export declare function LoginPage({ uid, interactionUrl, clientName, logoUrl, error, onLogin, onRegister, onForgotPassword, registrationEnabled, forgotPasswordEnabled, defaultTab, }: LoginPageProps): JSX.Element;

export declare interface LoginPageProps {
    uid: string;
    interactionUrl: string;
    clientName?: string;
    logoUrl?: string;
    error?: string | null;
    onLogin: (email: string, password: string) => Promise<void>;
    onRegister: (data: {
        email: string;
        password: string;
        givenName?: string;
        familyName?: string;
        enableMfa?: boolean;
    }) => Promise<void>;
    onForgotPassword: (email: string) => Promise<void>;
    registrationEnabled?: boolean;
    forgotPasswordEnabled?: boolean;
    /**
     * Tab the page opens on. Optional and **initial-only** — the page still
     * owns the tab afterwards, so the tab bar keeps working unchanged. Omit it
     * and the page opens on `'signin'`, which is the historical behaviour.
     *
     * It exists because the register and forgot-password forms were previously
     * reachable only by clicking their tab: an OIDC host cannot honour a
     * `?screen_hint=signup` deep link, a story cannot show either form, and a
     * test has to click a tab before it can assert on the form behind it.
     *
     * A tab that the corresponding `*Enabled` flag has switched off is ignored
     * and `'signin'` is used instead, so this prop can never render a form the
     * host has disabled.
     */
    defaultTab?: LoginTab;
}

/** The three authentication forms the page can show. */
declare type LoginTab = 'signin' | 'register' | 'forgot';

export declare function LogoutPage({ onConfirm, onCancel, clientName }: LogoutPageProps): JSX.Element;

export declare interface LogoutPageProps {
    onConfirm: () => void;
    onCancel?: () => void;
    clientName?: string;
}

export declare function MfaDashboardPage({ devices, userEmail, mfaEnabled, onAddDevice, onRenameDevice, onRemoveDevice, loading, }: MfaDashboardPageProps): JSX.Element;

export declare interface MfaDashboardPageProps {
    devices: MfaDevice[];
    userEmail?: string;
    mfaEnabled: boolean;
    onAddDevice: () => void;
    onRenameDevice: (deviceId: string, newName: string) => Promise<void>;
    onRemoveDevice: (deviceId: string) => Promise<void>;
    loading?: boolean;
}

export declare interface MfaDevice {
    deviceId: string;
    deviceName: string;
    deviceType: string;
    isVerified: boolean;
    createdAt: string;
    lastUsed?: string;
}

export declare function MfaManagementPage({ metrics, users, pools, onRefresh, loading, }: MfaManagementPageProps): JSX.Element;

export declare interface MfaManagementPageProps {
    metrics?: {
        totalUsers: number;
        mfaEnabled: number;
        mfaDisabled: number;
        adoptionRate: number;
    };
    users?: Array<{
        userId: string;
        email: string;
        mfaEnabled: boolean;
        deviceCount: number;
        /**
         * Pool the user belongs to. Optional and additive.
         *
         * The "Filter by pool" control is only rendered when at least one row
         * carries this, because without it the page has no way to tell which pool
         * a row belongs to — which is exactly why the control used to be inert.
         */
        poolId?: string;
    }>;
    pools?: Array<{
        poolId: string;
        poolName: string;
        userCount: number;
    }>;
    onRefresh: () => void;
    loading?: boolean;
}

export declare function MfaSetupPage({ onSetup, onVerify, onComplete, userEmail, initialStep, initialSetupResult, initialDeviceName, }: MfaSetupPageProps): JSX.Element;

export declare interface MfaSetupPageProps {
    onSetup: (deviceName: string) => Promise<MfaSetupResult>;
    onVerify: (deviceId: string, code: string) => Promise<{
        success: boolean;
        backupCodes?: string[];
    }>;
    onComplete: () => void;
    userEmail?: string;
    /**
     * Step the wizard opens on. Optional and **initial-only** — the page keeps
     * owning the step afterwards, so Back/Continue still work exactly as they
     * do without the prop. Omit it and the wizard opens on `'name'`, which is
     * the historical behaviour.
     *
     * It exists because every step past the first was previously reachable
     * only by clicking through the one before it: a host cannot deep-link a
     * user back into a half-finished enrolment (`/mfa/setup?step=scan` after a
     * reload), a story cannot show the scan or backup screens, and a test has
     * to drive the whole flow to assert on the last one.
     *
     * `'scan'` renders the QR code, so it needs `initialSetupResult` as well;
     * without it the wizard falls back to `'name'` rather than rendering an
     * empty card.
     */
    initialStep?: MfaSetupStep;
    /**
     * Seeds the enrolment payload that `onSetup` would normally have returned,
     * so `initialStep` can open on a step that needs it — `'scan'` (QR code +
     * secret) and `'backup'` (the backup-code grid). Initial-only: a later
     * real `onSetup` call replaces it.
     *
     * Use it when the host already holds the payload (resuming an enrolment
     * after a reload) or when a story/test wants a specific step rendered
     * directly instead of clicking to it.
     */
    initialSetupResult?: MfaSetupResult;
    /**
     * Seeds the device-name field, so a wizard opened at a later
     * `initialStep` still shows the name the user typed on step 1 (it appears
     * as the QR caption). Initial-only — the field stays editable.
     */
    initialDeviceName?: string;
}

/** The enrolment payload the identity server returns from `onSetup`. */
declare interface MfaSetupResult {
    deviceId: string;
    qrCode: string;
    secret: string;
    backupCodes: string[];
}

/** The four wizard steps, in the order the user walks them. */
declare type MfaSetupStep = 'name' | 'scan' | 'verify' | 'backup';

/** Which challenge the page presents: authenticator code or backup code. */
declare type MfaVerifyMode = 'totp' | 'backup';

export declare function MfaVerifyPage({ onVerify, onVerifyBackup, error, defaultMode, }: MfaVerifyPageProps): JSX.Element;

export declare interface MfaVerifyPageProps {
    onVerify: (code: string) => Promise<void>;
    onVerifyBackup: (code: string) => Promise<void>;
    error?: string | null;
    /**
     * Challenge the page opens on. Optional and **initial-only** — the page
     * still owns the mode afterwards, so the two "use … instead" links keep
     * flipping it. Omit it and the page opens on `'totp'`, which is the
     * historical behaviour.
     *
     * It exists because the backup-code form was previously reachable only by
     * clicking "Use a backup code instead": a host that already knows the user
     * has lost their authenticator cannot land them on the right challenge, a
     * story cannot show that form, and a test has to click before asserting.
     */
    defaultMode?: MfaVerifyMode;
}

declare interface PasswordPolicy {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
}

export declare function PoolFormPage({ pool, isEdit, onSubmit, onCancel, error }: PoolFormPageProps): JSX.Element;

export declare interface PoolFormPageProps {
    pool?: {
        poolId?: string;
        poolName: string;
        customAttributes: Record<string, string>;
        settings: PoolSettings;
    };
    isEdit: boolean;
    onSubmit: (data: {
        poolName: string;
        customAttributes: Record<string, string>;
        settings: PoolSettings;
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

export declare function PoolListPage({ pools, onCreatePool, onEditPool, onDeletePool, onViewPool, loading, }: PoolListPageProps): JSX.Element;

export declare interface PoolListPageProps {
    pools: Array<{
        poolId: string;
        poolName: string;
        clientId: string;
        createdAt: string;
    }>;
    onCreatePool: () => void;
    onEditPool: (poolId: string) => void;
    onDeletePool: (poolId: string) => Promise<void>;
    onViewPool: (poolId: string) => void;
    loading?: boolean;
}

export declare function PoolScopedLayout({ children, poolId, poolName, activeSection, onNavigate, onBack, }: PoolScopedLayoutProps): JSX.Element;

export declare interface PoolScopedLayoutProps {
    children: React.ReactNode;
    poolId: string;
    poolName: string;
    activeSection?: 'users' | 'groups' | 'mfa';
    onNavigate: (path: string) => void;
    onBack: () => void;
}

declare interface PoolSettings {
    passwordPolicy?: PasswordPolicy;
    mfaConfiguration: 'OFF' | 'OPTIONAL' | 'REQUIRED';
    accountRecovery?: {
        email: boolean;
        sms: boolean;
    };
}

export declare function QrCodeDisplay({ value, size, label }: QrCodeDisplayProps): JSX.Element;

export declare interface QrCodeDisplayProps {
    value: string;
    size?: number;
    label?: string;
}

export declare function SetupGuidePage({ status, onNavigate }: SetupGuidePageProps): JSX.Element;

export declare interface SetupGuidePageProps {
    status: {
        hasUserPools: boolean;
        poolCount: number;
        hasClients: boolean;
        clientCount: number;
        hasAdminUser: boolean;
        totalUsers: number;
        adminEmails: string[];
        smtpConfigured: boolean;
        smtpHost?: string;
        issuer: string;
        issuerConfigured: boolean;
        wellKnownUrl?: string;
        firstPoolId?: string;
        firstClientId?: string;
    };
    onNavigate: (path: string) => void;
}

export declare function StatusBadge({ status, variant }: StatusBadgeProps): JSX.Element;

export declare interface StatusBadgeProps {
    status: string;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export declare function UserFormPage({ user, isEdit, customAttributeDefinitions, onSubmit, onCancel, error, }: UserFormPageProps): JSX.Element;

export declare interface UserFormPageProps {
    user?: {
        userId?: string;
        email: string;
        givenName?: string;
        familyName?: string;
        nickname?: string;
        picture?: string;
        website?: string;
        customAttributes?: Record<string, unknown>;
    };
    isEdit: boolean;
    poolId: string;
    customAttributeDefinitions?: Record<string, string>;
    onSubmit: (data: {
        email: string;
        givenName?: string;
        familyName?: string;
        nickname?: string;
        picture?: string;
        website?: string;
        customAttributes?: Record<string, unknown>;
    }) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

export declare function UserListPage({ users, poolName, onCreateUser, onEditUser, onDeleteUser, loading, }: UserListPageProps): JSX.Element;

export declare interface UserListPageProps {
    users: Array<{
        userId: string;
        email: string;
        givenName?: string;
        familyName?: string;
        status: string;
        createdAt: string;
    }>;
    poolId: string;
    poolName: string;
    onCreateUser: () => void;
    onEditUser: (userId: string) => void;
    onDeleteUser: (userId: string) => Promise<void>;
    loading?: boolean;
}

export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}
