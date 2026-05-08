import { Routes, Route, Navigate, useParams } from 'react-router';
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

// Live demo pages (lazy)
const PipelineEditor = lazy(() => import('./demos/pipeline-editor'));
const IngestDashboard = lazy(() => import('./demos/ingest-dashboard'));
const DocumentWorkspace = lazy(() => import('./demos/document-workspace'));
const ObservabilityShell = lazy(() => import('./demos/observability-shell'));
const SocialPanel = lazy(() => import('./demos/social-panel'));
const Collaboration = lazy(() => import('./demos/collaboration'));
const NodeEditorLive = lazy(() => import('./demos/node-editor-live'));
const VideoStreaming = lazy(() => import('./demos/video-streaming'));
const CallWidgetDemo = lazy(() => import('./demos/video-streaming/CallWidgetDemo'));
const CallWidgetLive = lazy(() => import('./demos/call-widget-live'));
const SharedComponents = lazy(() => import('./demos/shared-components'));

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
  return <Navigate to={`/pages/${id}`} replace />;
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

        {/* Components */}
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
        </Route>

        {/* Pages (live demos) */}
        <Route path="pages">
          <Route index element={<PagesOverviewPage />} />
          <Route path="pipeline-editor" element={<S><PipelineEditor /></S>} />
          <Route path="document-workspace" element={<S><DocumentWorkspace /></S>} />
          <Route path="ingest-dashboard" element={<S><IngestDashboard /></S>} />
          <Route path="observability-shell" element={<S><ObservabilityShell /></S>} />
          <Route path="social-panel" element={<S><SocialPanel /></S>} />
          <Route path="collaboration" element={<S><Collaboration /></S>} />
          <Route path="node-editor-live" element={<S><NodeEditorLive /></S>} />
          <Route path="video-streaming" element={<S><VideoStreaming /></S>} />
          <Route path="call-widget" element={<S><CallWidgetDemo /></S>} />
          <Route path="call-widget-live" element={<S><CallWidgetLive /></S>} />
          <Route path="shared-components" element={<S><SharedComponents /></S>} />
        </Route>

        {/* Identity */}
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
