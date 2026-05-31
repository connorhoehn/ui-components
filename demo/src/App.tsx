import { Routes, Route, Navigate, useParams, useLocation } from 'react-router';
import { lazy, Suspense } from 'react';
import { DocsLayout } from './shell/DocsLayout';
import { DemoCatalog } from './catalog/DemoCatalog';

// Get Started pages
import IntroductionPage from './pages/IntroductionPage';
import InstallationPage from './pages/InstallationPage';
import QuickStartPage from './pages/QuickStartPage';
import ThemingPage from './pages/ThemingPage';

// Overview & detail pages
import ComponentsOverviewPage from './pages/ComponentsOverviewPage';
import PagesOverviewPage from './pages/PagesOverviewPage';
import PatternsOverviewPage from './pages/PatternsOverviewPage';
import HooksOverviewPage from './pages/HooksOverviewPage';
import HookDocPage from './pages/HookDocPage';
import PatternPage from './pages/PatternPage';

// Component pages (lazy)
const ButtonsPage = lazy(() => import('./components/ButtonsPage'));
const FeedbackPage = lazy(() => import('./components/FeedbackPage'));
const DataDisplayPage = lazy(() => import('./components/DataDisplayPage'));
const FormsPage = lazy(() => import('./components/FormsPage'));
const LayoutPage = lazy(() => import('./components/LayoutPage'));
const NodeEditorPage = lazy(() => import('./components/NodeEditorPage'));
const CollaborationPage = lazy(() => import('./components/CollaborationPage'));
const RealTimeEditingPage = lazy(() => import('./components/RealTimeEditingPage'));
const VideoPage = lazy(() => import('./components/VideoPage'));
const CallWidgetPage = lazy(() => import('./components/CallWidgetPage'));
const PrimitivesPage = lazy(() => import('./components/PrimitivesPage'));
const ChatPage = lazy(() => import('./components/ChatPage'));
const PatternsPage = lazy(() => import('./components/PatternsPage'));
const ShellCompositesPage = lazy(() => import('./components/ShellCompositesPage'));

// Live demo pages (lazy)
const PipelineEditor = lazy(() => import('./demos/pipeline-editor'));
const IngestDashboard = lazy(() => import('./demos/ingest-dashboard'));
const DocumentWorkspace = lazy(() => import('./demos/document-workspace'));
const ObservabilityShell = lazy(() => import('./demos/observability-shell'));
const SocialPanel = lazy(() => import('./demos/social-panel'));
const Collaboration = lazy(() => import('./demos/collaboration'));
const NodeEditorLive = lazy(() => import('./demos/node-editor-live'));
const VideoStreaming = lazy(() => import('./demos/video-streaming'));
const CallWidgetLive = lazy(() => import('./demos/call-widget-live'));
const WrappedComponentsDemo = lazy(() => import('./demos/wrapped-components/demo'));

// Hook integration demos (lazy)
const HookChatIntegration = lazy(() => import('./demos/hook-chat-integration'));
const HookPresenceIntegration = lazy(() => import('./demos/hook-presence-integration'));
const HookReactionsIntegration = lazy(() => import('./demos/hook-reactions-integration'));
const HookFileUploadIntegration = lazy(() => import('./demos/hook-fileupload-integration'));
const HookVideoHangoutIntegration = lazy(() => import('./demos/hook-videohangout-integration'));
const HookHangoutRoomsIntegration = lazy(() => import('./demos/hook-hangoutrooms-integration'));

// Agent demos (lazy)
const AgentDashboard = lazy(() => import('./demos/agents/DashboardDemo'));
const AgentFlow = lazy(() => import('./demos/agents/FlowDemo'));
const AgentInvoke = lazy(() => import('./demos/agents/InvokeDemo'));
const AgentDetail = lazy(() => import('./demos/agents/DetailDemo'));

// Identity demos (lazy)
const IdentityLoginDemo = lazy(() => import('./demos/identity/auth/LoginDemo'));
const IdentityConsentDemo = lazy(() => import('./demos/identity/auth/ConsentDemo'));
const IdentityMfaVerifyDemo = lazy(() => import('./demos/identity/auth/MfaVerifyDemo'));
const IdentityMfaSetupDemo = lazy(() => import('./demos/identity/auth/MfaSetupDemo'));
const IdentityLogoutDemo = lazy(() => import('./demos/identity/auth/LogoutDemo'));
const IdentityDashboardDemo = lazy(() => import('./demos/identity/admin/DashboardDemo'));
const IdentityPoolsDemo = lazy(() => import('./demos/identity/admin/PoolsDemo'));
const IdentityUsersDemo = lazy(() => import('./demos/identity/admin/UsersDemo'));
const IdentityGroupsDemo = lazy(() => import('./demos/identity/admin/GroupsDemo'));
const IdentityApplicationsDemo = lazy(() => import('./demos/identity/admin/ApplicationsDemo'));
const IdentityEmailTemplatesDemo = lazy(() => import('./demos/identity/admin/EmailTemplatesDemo'));
const IdentityMfaDemo = lazy(() => import('./demos/identity/admin/MfaDemo'));
const IdentityAuditDemo = lazy(() => import('./demos/identity/admin/AuditDemo'));
const IdentityFullAdminDemo = lazy(() => import('./demos/identity/admin/FullAdminDemo'));

function Loading() {
  return <div style={{ padding: 40, color: '#64748b' }}>Loading...</div>;
}

function S({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

function RedirectToPages() {
  const { id } = useParams();
  return <Navigate to={`/workflows/${id}`} replace />;
}

function RedirectIdentityToWorkflows() {
  const { pathname, search, hash } = useLocation();
  const target = pathname.replace(/^\/identity/, '/workflows/identity') + search + hash;
  return <Navigate to={target} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        <Route index element={<DemoCatalog />} />

        {/* Get Started */}
        <Route path="get-started">
          <Route index element={<Navigate to="introduction" replace />} />
          <Route path="introduction" element={<IntroductionPage />} />
          <Route path="installation" element={<InstallationPage />} />
          <Route path="quick-start" element={<QuickStartPage />} />
          <Route path="theming" element={<ThemingPage />} />
        </Route>

        {/* Foundations (Components) */}
        <Route path="components">
          <Route index element={<ComponentsOverviewPage />} />
          <Route path="buttons" element={<S><ButtonsPage /></S>} />
          <Route path="feedback" element={<S><FeedbackPage /></S>} />
          <Route path="data-display" element={<S><DataDisplayPage /></S>} />
          <Route path="forms" element={<S><FormsPage /></S>} />
          <Route path="layout" element={<S><LayoutPage /></S>} />
          <Route path="node-editor" element={<S><NodeEditorPage /></S>} />
          <Route path="collaboration" element={<S><CollaborationPage /></S>} />
          <Route path="real-time-editing" element={<S><RealTimeEditingPage /></S>} />
          <Route path="video" element={<S><VideoPage /></S>} />
          <Route path="call-widget" element={<S><CallWidgetPage /></S>} />
          <Route path="primitives" element={<S><PrimitivesPage /></S>} />
          <Route path="chat" element={<S><ChatPage /></S>} />
          <Route path="patterns" element={<S><PatternsPage /></S>} />
          <Route path="shell" element={<S><ShellCompositesPage /></S>} />
        </Route>

        {/* Workflows (domain demos) */}
        <Route path="workflows">
          <Route index element={<PagesOverviewPage />} />
          {/* Pipelines */}
          <Route path="pipeline-editor" element={<S><PipelineEditor /></S>} />
          {/* Agents */}
          <Route path="agents/dashboard" element={<S><AgentDashboard /></S>} />
          <Route path="agents/flow" element={<S><AgentFlow /></S>} />
          <Route path="agents/invoke" element={<S><AgentInvoke /></S>} />
          <Route path="agents/detail" element={<S><AgentDetail /></S>} />
          {/* Documents */}
          <Route path="document-workspace" element={<S><DocumentWorkspace /></S>} />
          <Route path="collaboration" element={<S><Collaboration /></S>} />
          {/* Data */}
          <Route path="ingest-dashboard" element={<S><IngestDashboard /></S>} />
          <Route path="observability" element={<S><ObservabilityShell /></S>} />
          {/* Social */}
          <Route path="social" element={<S><SocialPanel /></S>} />
          <Route path="video-streaming" element={<S><VideoStreaming /></S>} />
          <Route path="call-widget" element={<S><CallWidgetLive /></S>} />
          {/* Hook integrations */}
          <Route path="hook-chat" element={<S><HookChatIntegration /></S>} />
          <Route path="hook-presence" element={<S><HookPresenceIntegration /></S>} />
          <Route path="hook-reactions" element={<S><HookReactionsIntegration /></S>} />
          <Route path="hook-fileupload" element={<S><HookFileUploadIntegration /></S>} />
          <Route path="hook-videohangout" element={<S><HookVideoHangoutIntegration /></S>} />
          <Route path="hook-hangoutrooms" element={<S><HookHangoutRoomsIntegration /></S>} />
          <Route path="wrapped-components" element={<S><WrappedComponentsDemo /></S>} />
          {/* Identity (Auth + Admin) */}
          <Route path="identity">
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<S><IdentityLoginDemo /></S>} />
            <Route path="consent" element={<S><IdentityConsentDemo /></S>} />
            <Route path="mfa-verify" element={<S><IdentityMfaVerifyDemo /></S>} />
            <Route path="mfa-setup" element={<S><IdentityMfaSetupDemo /></S>} />
            <Route path="logout" element={<S><IdentityLogoutDemo /></S>} />
            <Route path="admin" element={<S><IdentityDashboardDemo /></S>} />
            <Route path="admin/pools" element={<S><IdentityPoolsDemo /></S>} />
            <Route path="admin/users" element={<S><IdentityUsersDemo /></S>} />
            <Route path="admin/groups" element={<S><IdentityGroupsDemo /></S>} />
            <Route path="admin/applications" element={<S><IdentityApplicationsDemo /></S>} />
            <Route path="admin/email-templates" element={<S><IdentityEmailTemplatesDemo /></S>} />
            <Route path="admin/mfa" element={<S><IdentityMfaDemo /></S>} />
            <Route path="admin/audit" element={<S><IdentityAuditDemo /></S>} />
            <Route path="admin/full" element={<S><IdentityFullAdminDemo /></S>} />
          </Route>
        </Route>

        {/* Legacy /pages routes → redirect to /workflows */}
        <Route path="pages">
          <Route index element={<Navigate to="/workflows" replace />} />
          <Route path="pipeline-editor" element={<Navigate to="/workflows/pipeline-editor" replace />} />
          <Route path="document-workspace" element={<Navigate to="/workflows/document-workspace" replace />} />
          <Route path="ingest-dashboard" element={<Navigate to="/workflows/ingest-dashboard" replace />} />
          <Route path="observability-shell" element={<Navigate to="/workflows/observability" replace />} />
          <Route path="social-panel" element={<Navigate to="/workflows/social" replace />} />
          <Route path="collaboration" element={<Navigate to="/workflows/collaboration" replace />} />
          <Route path="node-editor-live" element={<S><NodeEditorLive /></S>} />
          <Route path="video-streaming" element={<Navigate to="/workflows/video-streaming" replace />} />
          <Route path="call-widget" element={<Navigate to="/workflows/call-widget" replace />} />
          <Route path="call-widget-live" element={<Navigate to="/workflows/call-widget" replace />} />
          <Route path="shared-components" element={<Navigate to="/components" replace />} />
        </Route>

        {/* Legacy /identity/* → redirect to /workflows/identity/* */}
        <Route path="identity">
          <Route index element={<Navigate to="/workflows/identity" replace />} />
          <Route path="*" element={<RedirectIdentityToWorkflows />} />
        </Route>

        {/* Patterns */}
        <Route path="patterns">
          <Route index element={<PatternsOverviewPage />} />
          <Route path=":slug" element={<PatternPage />} />
        </Route>

        {/* Hooks */}
        <Route path="hooks">
          <Route index element={<HooksOverviewPage />} />
          <Route path=":hookName" element={<HookDocPage />} />
        </Route>
      </Route>

      {/* Backward compat redirects */}
      <Route path="demo/:id" element={<RedirectToPages />} />
    </Routes>
  );
}
