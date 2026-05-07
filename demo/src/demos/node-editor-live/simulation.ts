import type { SimulationTimeline } from '../../engine/types';

export const deploymentTimeline: SimulationTimeline = {
  id: 'cicd-deployment',
  name: 'CI/CD Deployment Pipeline',
  description: 'Simulates a full CI/CD deployment workflow from push to production.',
  loop: true,
  events: [
    // --- Run starts ---
    {
      delay: 0,
      message: { type: 'workflow', action: 'run.started', workflowId: 'deploy-1', runId: 'run-001' },
      description: 'Deployment workflow started',
    },

    // --- Push to main ---
    {
      delay: 800,
      message: { type: 'workflow', action: 'step.started', nodeId: 'push-main', status: 'running' },
      description: 'Push to main triggered',
    },
    {
      delay: 400,
      message: { type: 'workflow', action: 'step.completed', nodeId: 'push-main', status: 'completed' },
      description: 'Push event received',
    },

    // --- Run Tests ---
    {
      delay: 300,
      message: { type: 'workflow', action: 'step.started', nodeId: 'run-tests', status: 'running' },
      description: 'Running test suite',
    },
    {
      delay: 600,
      message: { type: 'workflow', action: 'stream', nodeId: 'run-tests', token: '✓ auth.test.ts (42ms)' },
      description: 'Test output: auth',
    },
    {
      delay: 400,
      message: { type: 'workflow', action: 'stream', nodeId: 'run-tests', token: '✓ api.routes.test.ts (87ms)' },
      description: 'Test output: api routes',
    },
    {
      delay: 350,
      message: { type: 'workflow', action: 'stream', nodeId: 'run-tests', token: '✓ database.test.ts (123ms)' },
      description: 'Test output: database',
    },
    {
      delay: 300,
      message: { type: 'workflow', action: 'stream', nodeId: 'run-tests', token: '✓ middleware.test.ts (31ms)' },
      description: 'Test output: middleware',
    },
    {
      delay: 250,
      message: { type: 'workflow', action: 'stream', nodeId: 'run-tests', token: '✓ validation.test.ts (56ms)' },
      description: 'Test output: validation',
    },
    {
      delay: 400,
      message: { type: 'workflow', action: 'stream', nodeId: 'run-tests', token: '✓ All 47 tests passed' },
      description: 'All tests passed',
    },
    {
      delay: 300,
      message: { type: 'workflow', action: 'step.completed', nodeId: 'run-tests', status: 'completed' },
      description: 'Test suite completed',
    },

    // --- Build Docker ---
    {
      delay: 400,
      message: { type: 'workflow', action: 'step.started', nodeId: 'build-docker', status: 'running' },
      description: 'Building Docker image',
    },
    {
      delay: 1200,
      message: { type: 'workflow', action: 'step.completed', nodeId: 'build-docker', status: 'completed', output: { image: 'app:sha-abc1234', size: '142MB' } },
      description: 'Docker image built',
    },

    // --- Security Scan ---
    {
      delay: 400,
      message: { type: 'workflow', action: 'step.started', nodeId: 'security-scan', status: 'running' },
      description: 'Running security scan',
    },
    {
      delay: 1000,
      message: { type: 'workflow', action: 'step.completed', nodeId: 'security-scan', status: 'completed', output: { vulnerabilities: 0, grade: 'A' } },
      description: 'Security scan passed - no vulnerabilities',
    },

    // --- Deploy Staging ---
    {
      delay: 400,
      message: { type: 'workflow', action: 'step.started', nodeId: 'deploy-staging', status: 'running' },
      description: 'Deploying to staging',
    },
    {
      delay: 900,
      message: { type: 'workflow', action: 'step.completed', nodeId: 'deploy-staging', status: 'completed', output: { url: 'https://staging.app.io' } },
      description: 'Staging deployment complete',
    },

    // --- Integration Tests ---
    {
      delay: 400,
      message: { type: 'workflow', action: 'step.started', nodeId: 'integration-tests', status: 'running' },
      description: 'Running integration tests',
    },
    {
      delay: 500,
      message: { type: 'workflow', action: 'stream', nodeId: 'integration-tests', token: '✓ POST /api/users (201)' },
      description: 'Integration test: create user',
    },
    {
      delay: 400,
      message: { type: 'workflow', action: 'stream', nodeId: 'integration-tests', token: '✓ GET /api/users/:id (200)' },
      description: 'Integration test: get user',
    },
    {
      delay: 350,
      message: { type: 'workflow', action: 'stream', nodeId: 'integration-tests', token: '✓ PUT /api/users/:id (200)' },
      description: 'Integration test: update user',
    },
    {
      delay: 300,
      message: { type: 'workflow', action: 'stream', nodeId: 'integration-tests', token: '✓ DELETE /api/users/:id (204)' },
      description: 'Integration test: delete user',
    },
    {
      delay: 350,
      message: { type: 'workflow', action: 'stream', nodeId: 'integration-tests', token: '✓ 12/12 integration tests passed' },
      description: 'All integration tests passed',
    },
    {
      delay: 300,
      message: { type: 'workflow', action: 'step.completed', nodeId: 'integration-tests', status: 'completed' },
      description: 'Integration tests completed',
    },

    // --- Approval Gate ---
    {
      delay: 500,
      message: { type: 'workflow', action: 'step.started', nodeId: 'approval-gate', status: 'running' },
      description: 'Waiting for approval',
    },
    {
      delay: 1500,
      message: { type: 'workflow', action: 'step.completed', nodeId: 'approval-gate', status: 'completed', output: { approver: 'alice@example.com' } },
      description: 'Approved by alice@example.com',
    },

    // --- Deploy Production ---
    {
      delay: 400,
      message: { type: 'workflow', action: 'step.started', nodeId: 'deploy-prod', status: 'running' },
      description: 'Deploying to production',
    },
    {
      delay: 1100,
      message: { type: 'workflow', action: 'step.completed', nodeId: 'deploy-prod', status: 'completed', output: { url: 'https://app.io', version: 'v2.4.1' } },
      description: 'Production deployment complete',
    },

    // --- Health Check ---
    {
      delay: 400,
      message: { type: 'workflow', action: 'step.started', nodeId: 'health-check', status: 'running' },
      description: 'Running health checks',
    },
    {
      delay: 800,
      message: { type: 'workflow', action: 'step.completed', nodeId: 'health-check', status: 'completed', output: { latency: '23ms', status: 'healthy' } },
      description: 'Health check passed',
    },

    // --- Notify Team ---
    {
      delay: 300,
      message: { type: 'workflow', action: 'step.started', nodeId: 'notify-team', status: 'running' },
      description: 'Sending notifications',
    },
    {
      delay: 500,
      message: { type: 'workflow', action: 'step.completed', nodeId: 'notify-team', status: 'completed' },
      description: 'Team notified via Slack',
    },

    // --- Run completed ---
    {
      delay: 600,
      message: { type: 'workflow', action: 'run.completed', runId: 'run-001', status: 'completed', duration: 12400 },
      description: 'Deployment workflow completed successfully',
    },
  ],
};
