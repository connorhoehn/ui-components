export const mockMetrics = {
  cpu: {
    label: 'CPU Usage',
    unit: '%',
    current: 42,
    history: [35, 38, 41, 39, 44, 42, 45, 43, 41, 42],
    threshold: 80,
  },
  memory: {
    label: 'Memory',
    unit: 'GB',
    current: 12.4,
    history: [11.2, 11.5, 11.8, 12.0, 12.1, 12.3, 12.4, 12.4, 12.3, 12.4],
    threshold: 16,
  },
  requestRate: {
    label: 'Request Rate',
    unit: 'req/s',
    current: 1240,
    history: [980, 1050, 1120, 1180, 1200, 1250, 1230, 1210, 1240, 1240],
    threshold: 2000,
  },
};

export const mockAlerts = [
  {
    id: 'alert-1',
    severity: 'warning',
    message: 'Memory usage approaching threshold on node-3',
    timestamp: '2026-05-07T10:25:00Z',
    acknowledged: false,
  },
  {
    id: 'alert-2',
    severity: 'info',
    message: 'Pipeline "doc-processing" completed successfully',
    timestamp: '2026-05-07T10:20:00Z',
    acknowledged: true,
  },
  {
    id: 'alert-3',
    severity: 'critical',
    message: 'Kafka consumer lag exceeding 10,000 messages',
    timestamp: '2026-05-07T10:15:00Z',
    acknowledged: false,
  },
];

export const mockActiveRuns = [
  {
    id: 'run-1',
    pipelineId: 'demo-pipeline-1',
    pipelineName: 'Document Processing',
    status: 'running',
    startedAt: '2026-05-07T10:00:00Z',
    progress: 67,
  },
  {
    id: 'run-2',
    pipelineId: 'demo-pipeline-2',
    pipelineName: 'User Sync',
    status: 'running',
    startedAt: '2026-05-07T10:05:00Z',
    progress: 34,
  },
  {
    id: 'run-3',
    pipelineId: 'demo-pipeline-3',
    pipelineName: 'Analytics Rollup',
    status: 'queued',
    startedAt: '2026-05-07T10:28:00Z',
    progress: 0,
  },
];
