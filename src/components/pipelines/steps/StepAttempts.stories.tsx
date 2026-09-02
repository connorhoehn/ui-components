import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepAttempts } from './StepAttempts';
import type { StepAttempt } from '../../../types/pipeline';

const meta = {
  title: 'Pipelines/Steps/StepAttempts',
  component: StepAttempts,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StepAttempts>;

export default meta;
type Story = StoryObj<typeof meta>;

// Fixed timestamps on purpose — a story that reads the clock produces a new
// visual snapshot on every run.
const RUN = 'run-8f21:llm-summarise';

const RECOVERED: StepAttempt[] = [
  {
    attemptNumber: 1,
    startedAt: '2026-08-16T10:00:00.000Z',
    completedAt: '2026-08-16T10:00:04.200Z',
    durationMs: 4200,
    error: 'connect ETIMEDOUT 10.4.2.19:443',
    errorCategory: 'NetworkError',
    retryAfterMs: 1000,
    idempotencyKey: `${RUN}:1`,
  },
  {
    attemptNumber: 2,
    startedAt: '2026-08-16T10:00:05.200Z',
    completedAt: '2026-08-16T10:00:35.200Z',
    durationMs: 30_000,
    error: 'model call exceeded the 30s deadline',
    errorCategory: 'TimeoutError',
    retryAfterMs: 4000,
    idempotencyKey: `${RUN}:2`,
  },
  {
    attemptNumber: 3,
    startedAt: '2026-08-16T10:00:39.200Z',
    completedAt: '2026-08-16T10:00:41.100Z',
    durationMs: 1900,
    idempotencyKey: `${RUN}:3`,
  },
];

const EXHAUSTED: StepAttempt[] = [
  {
    attemptNumber: 1,
    startedAt: '2026-08-16T11:00:00.000Z',
    completedAt: '2026-08-16T11:00:00.310Z',
    durationMs: 310,
    error: 'field "documentId" is required',
    errorCategory: 'ValidationError',
    retryAfterMs: 500,
    idempotencyKey: 'run-b104:validate:1',
  },
  {
    attemptNumber: 2,
    startedAt: '2026-08-16T11:00:00.810Z',
    completedAt: '2026-08-16T11:00:01.080Z',
    durationMs: 270,
    error: 'field "documentId" is required',
    errorCategory: 'ValidationError',
    retryAfterMs: 2000,
    idempotencyKey: 'run-b104:validate:2',
  },
  {
    attemptNumber: 3,
    startedAt: '2026-08-16T11:00:03.080Z',
    completedAt: '2026-08-16T11:00:03.400Z',
    durationMs: 320,
    error: 'field "documentId" is required',
    errorCategory: 'ValidationError',
    idempotencyKey: 'run-b104:validate:3',
  },
];

const SINGLE_SUCCESS: StepAttempt[] = [
  {
    attemptNumber: 1,
    startedAt: '2026-08-16T12:00:00.000Z',
    completedAt: '2026-08-16T12:00:00.850Z',
    durationMs: 850,
    idempotencyKey: 'run-c7de:crop:1',
  },
];

export const SucceededOnThirdTry: Story = {
  name: 'Succeeded on the third try',
  args: { attempts: RECOVERED },
};

export const ExhaustedAllRetries: Story = {
  name: 'Exhausted all retries',
  args: { attempts: EXHAUSTED },
};

export const SingleAttemptRendersNothing: Story = {
  name: 'Single successful attempt (renders nothing)',
  args: { attempts: SINGLE_SUCCESS },
  parameters: {
    docs: {
      description: {
        story:
          'A step that succeeded first try has no retry history worth a section, so the component returns null — this story is deliberately blank.',
      },
    },
  },
};

export const NoAttempts: Story = {
  name: 'No attempt history (renders nothing)',
  args: { attempts: [] },
};
