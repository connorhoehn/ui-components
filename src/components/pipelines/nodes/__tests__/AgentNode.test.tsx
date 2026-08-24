// src/components/pipelines/nodes/__tests__/AgentNode.test.tsx
//
// Coverage for the `agent` canvas face after the agent-step-contract-v1
// rewrite (2.96.0).
//
// The regression this file exists for: AgentNode used to read
// `data.protocol.toUpperCase()` off the old A2A-invoke shape. Nothing in
// the library ever supplied a `protocol` — no config panel existed for the
// node — so any host that dropped an Agent node from the palette onto a
// canvas got a TypeError instead of a node. These tests render the node
// with contract-shaped data (no `protocol` anywhere) and assert it paints.
//
// The second thing under test is the default-deny signal. An agent with an
// empty allowlist has no tools and is therefore an expensive completion;
// its face must not be indistinguishable from a fully-armed one.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import AgentNode from '../agent/AgentNode';
import type { AgentNodeData } from '../../../../types/pipeline';

type AgentProps = NodeProps<Node<AgentNodeData & Record<string, unknown>, 'agent'>>;

function renderAgent(data: Partial<AgentNodeData> = {}) {
  const full = {
    type: 'agent' as const,
    prompt: 'Summarise the document.',
    model: 'sonnet',
    allowedTools: [],
    ...data,
  };
  return render(
    <ReactFlowProvider>
      <AgentNode
        {...({ id: 'n1', data: full, selected: false } as unknown as AgentProps)}
      />
    </ReactFlowProvider>,
  );
}

describe('AgentNode', () => {
  it('renders contract-shaped data without a `protocol` field', () => {
    // The old face threw here: `data.protocol.toUpperCase()`.
    expect(() => renderAgent()).not.toThrow();
    expect(screen.getByText('Summarise the document.')).toBeInTheDocument();
  });

  it('says "no tools" when the allowlist is empty (default-deny)', () => {
    renderAgent({ allowedTools: [] });
    expect(screen.getByText('sonnet · no tools')).toBeInTheDocument();
  });

  it('says "no tools" when the allowlist is absent entirely', () => {
    renderAgent({ allowedTools: undefined });
    expect(screen.getByText('sonnet · no tools')).toBeInTheDocument();
  });

  it('counts granted tools, singular and plural', () => {
    const { unmount } = renderAgent({ allowedTools: ['Read'] });
    expect(screen.getByText('sonnet · 1 tool')).toBeInTheDocument();
    unmount();

    renderAgent({ allowedTools: ['Read', 'Bash', 'Grep'], model: 'opus' });
    expect(screen.getByText('opus · 3 tools')).toBeInTheDocument();
  });

  it('paints the toolless body in the warning color, not the default', () => {
    const { unmount } = renderAgent({ allowedTools: [] });
    expect(screen.getByText('sonnet · no tools')).toHaveClass('text-warning-fg');
    unmount();

    renderAgent({ allowedTools: ['Read'] });
    expect(screen.getByText('sonnet · 1 tool')).not.toHaveClass('text-warning-fg');
  });

  it('falls back to "No prompt" rather than an empty subtitle', () => {
    renderAgent({ prompt: '' });
    expect(screen.getByText('No prompt')).toBeInTheDocument();
  });

  it('shows only the first line of a multi-line prompt', () => {
    renderAgent({ prompt: 'Read the file\nthen summarise it\nthen post it' });
    expect(screen.getByText('Read the file')).toBeInTheDocument();
    expect(screen.queryByText(/then summarise it/)).not.toBeInTheDocument();
  });
});
