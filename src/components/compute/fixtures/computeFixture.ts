// Sample fleet for stories, demos and tests.
//
// Deliberately not plausible-looking production data: the labels say
// `demo-` so a screenshot can never be mistaken for a real fleet, and every
// surface that renders these is expected to say `source === 'fixture'`.

import type {
  Computer, ComputeModel, ComputeProject, ComputeRuntimeStatus, MachineNode, WorkspaceSnapshot,
} from '../types';

/** Sessions must be ≥33 chars, so the fixtures are too — short ids hide bugs. */
const session = (seed: string) => `demo-session-${seed}-0000000000000000`.slice(0, 40);

export const fixtureComputers: Computer[] = [
  {
    id: 'demo-1',
    label: 'demo-alpha',
    sessionId: session('alpha'),
    createdAt: '2026-08-26T14:02:00.000Z',
    status: 'running',
    projectId: 'proj-auth',
    project: 'Auth migration',
    spendUsd: 12.4,
    tokensUsed: 41_000,
    currentTask: 'Scaffold the FastAPI service and commit it',
    lastActivityAt: '2026-08-26T14:31:00.000Z',
    stopsInMs: 41 * 60_000,
  },
  {
    id: 'demo-2',
    label: 'demo-bravo',
    sessionId: session('bravo'),
    createdAt: '2026-08-26T13:10:00.000Z',
    status: 'waiting',
    projectId: 'proj-auth',
    project: 'Auth migration',
    spendUsd: 4.1,
    tokensUsed: 12_800,
    currentTask: 'Which migration tool should this use?',
    lastActivityAt: '2026-08-26T14:20:00.000Z',
    stopsInMs: 4 * 60_000,
    lastResult: { subtype: 'success', turns: 11, durationMs: 214_000, costUsd: 0.0431 },
  },
  {
    id: 'demo-3',
    label: 'demo-charlie',
    sessionId: session('charlie'),
    createdAt: '2026-08-26T09:44:00.000Z',
    status: 'idle',
    projectId: 'proj-search',
    project: 'Search relevance',
    spendUsd: 61.2,
    tokensUsed: 902_000,
    lastActivityAt: '2026-08-26T12:02:00.000Z',
    stopsInMs: 52 * 60_000,
    lastResult: { subtype: 'success', turns: 4, durationMs: 61_000, costUsd: 0.0072 },
  },
  {
    id: 'demo-4',
    label: 'demo-delta',
    sessionId: session('delta'),
    createdAt: '2026-08-25T18:20:00.000Z',
    status: 'stopped',
  },
];

/**
 * Sample projects. Deliberately uneven — one comfortably inside its budget,
 * one where the recurring upkeep has eaten most of the allocation, and one
 * with no budget at all — because a demo where every meter reads 40% teaches
 * nothing about what the meters are for.
 */
export const fixtureProjects: ComputeProject[] = [
  {
    id: 'proj-auth',
    name: 'Auth migration',
    budgetUsd: 1_200,
    spentUsd: 412.55,
    maintenanceUsd: 96,
    tokensUsed: 84_200,
    tokenBudget: 400_000,
    botCount: 3,
    periodResetsAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'proj-search',
    name: 'Search relevance',
    budgetUsd: 400,
    spentUsd: 361.4,
    // Upkeep is most of what was allocated — the case the meter's note exists
    // to make visible, because "90% spent" hides it.
    maintenanceUsd: 288,
    tokensUsed: 1_240_000,
    botCount: 5,
    periodResetsAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'proj-platform',
    name: 'Platform upkeep',
    tokensUsed: 6_400,
    botCount: 1,
  },
];

export const fixtureRuntimeStatus: ComputeRuntimeStatus = {
  deployed: true,
  runtimeName: 'demo-devbox',
  runtimeArn: null,
  commandAllowlist: ['ls', 'cat', 'git', 'find', 'grep'],
  fullExecEnabled: true,
  perTaskModel: true,
  defaultModel: 'us.anthropic.claude-haiku-4-5-20251001-v1:0',
  allowedModels: [
    'us.anthropic.claude-haiku-4-5-20251001-v1:0',
    'us.anthropic.claude-sonnet-5',
    'us.anthropic.claude-opus-4-8',
  ],
};

/**
 * Models the reference container accepts.
 *
 * These are Bedrock inference-profile ids, not first-party model names: the
 * box runs the agent with `CLAUDE_CODE_USE_BEDROCK=1`, so `--model` goes
 * straight to Bedrock. The ids must match the runtime's allowlist exactly —
 * anything off it falls back to the default *silently*, so a mismatch is
 * invisible: you pick the expensive model and quietly get the cheap one.
 */
export const fixtureModels: ComputeModel[] = [
  {
    id: 'us.anthropic.claude-haiku-4-5-20251001-v1:0',
    label: 'Haiku',
    hint: 'default · cheapest · fine for most tasks',
  },
  { id: 'us.anthropic.claude-sonnet-5', label: 'Sonnet', hint: 'harder multi-step work' },
  { id: 'us.anthropic.claude-opus-4-8', label: 'Opus', hint: 'the expensive one — reach for it deliberately' },
];

/**
 * Sample machines for MachinePresenceMenu. Deliberately uneven, like the
 * projects above: one healthy machine mixing local and platform models, and
 * one stale workstation whose sidecar is queuing offline — the two states the
 * menu exists to distinguish.
 */
export const fixtureMachines: MachineNode[] = [
  {
    id: 'demo-machine-1',
    label: 'demo-macbook',
    status: 'connected',
    platform: 'darwin/arm64',
    sessions: [
      {
        id: session('local-a'),
        harness: 'claude-code',
        projectId: 'proj-auth',
        projectName: 'Auth migration',
        branch: 'feat/oidc-callback',
        worktree: '~/dev/auth/.claude/worktrees/oidc-callback',
        intent: 'wire the OIDC callback to the session mint',
        modelProvider: 'bedrock',
        model: 'us.anthropic.claude-sonnet-5',
        contextUsed: 0.42,
        memory: { mode: 'synced', pullCursorAgeS: 12 },
      },
      {
        id: session('local-b'),
        harness: 'claude-code',
        projectId: 'proj-search',
        projectName: 'Search relevance',
        branch: 'main',
        intent: 'nightly re-embedding batch over the corpus',
        modelProvider: 'ollama',
        model: 'qwen2.5-coder:14b',
        contextUsed: 0.87,
        memory: { mode: 'pending', pendingOps: 14 },
      },
    ],
  },
  {
    id: 'demo-machine-2',
    label: 'demo-workstation',
    status: 'stale',
    platform: 'linux/x86_64',
    sessions: [
      {
        id: session('local-c'),
        harness: 'claude-code',
        projectName: 'Platform upkeep',
        branch: 'main',
        intent: 'consolidation pass over duplicate findings',
        modelProvider: 'ollama',
        model: 'qwen2.5-coder:32b',
        memory: { mode: 'offline', pendingOps: 203 },
      },
    ],
  },
];

export const fixtureWorkspace: WorkspaceSnapshot = {
  truncated: false,
  git: ['a1b2c3d scaffold service', 'e4f5a6b add tests', ' M src/main.py'],
  tree: [
    {
      name: 'src',
      path: 'src',
      kind: 'dir',
      children: [
        { name: 'main.py', path: 'src/main.py', kind: 'file', children: [] },
        { name: 'models.py', path: 'src/models.py', kind: 'file', children: [] },
      ],
    },
    {
      name: 'tests',
      path: 'tests',
      kind: 'dir',
      children: [{ name: 'test_main.py', path: 'tests/test_main.py', kind: 'file', children: [] }],
    },
    { name: '.git', path: '.git', kind: 'dir', pruned: true, children: [] },
    { name: 'node_modules', path: 'node_modules', kind: 'dir', pruned: true, children: [] },
    { name: 'README.md', path: 'README.md', kind: 'file', children: [] },
    { name: 'pyproject.toml', path: 'pyproject.toml', kind: 'file', children: [] },
  ],
};
