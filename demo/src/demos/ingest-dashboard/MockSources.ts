export const mockSources = [
  {
    id: 'src-1',
    name: 'PostgreSQL - Users DB',
    type: 'postgresql',
    status: 'syncing',
    lastSync: '2026-05-07T10:30:00Z',
    recordsProcessed: 45230,
    errorCount: 0,
  },
  {
    id: 'src-2',
    name: 'S3 - Document Bucket',
    type: 's3',
    status: 'idle',
    lastSync: '2026-05-07T09:15:00Z',
    recordsProcessed: 12800,
    errorCount: 3,
  },
  {
    id: 'src-3',
    name: 'Kafka - Events Stream',
    type: 'kafka',
    status: 'error',
    lastSync: '2026-05-07T08:45:00Z',
    recordsProcessed: 98400,
    errorCount: 12,
  },
  {
    id: 'src-4',
    name: 'REST API - Partner Feed',
    type: 'rest',
    status: 'syncing',
    lastSync: '2026-05-07T10:28:00Z',
    recordsProcessed: 5620,
    errorCount: 1,
  },
];

export const mockDLQEntries = [
  {
    id: 'dlq-1',
    sourceId: 'src-3',
    timestamp: '2026-05-07T08:45:12Z',
    error: 'Schema validation failed: missing required field "user_id"',
    payload: { event_type: 'user_action', action: 'click' },
  },
  {
    id: 'dlq-2',
    sourceId: 'src-2',
    timestamp: '2026-05-07T09:12:33Z',
    error: 'File format not supported: .heic',
    payload: { key: 'uploads/photo_2026.heic', size: 4200000 },
  },
];
