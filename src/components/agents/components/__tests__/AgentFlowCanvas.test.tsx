import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type { AgentDefinition } from '../../../../types/agents';

let capturedNodes: any[] = [];
let capturedEdges: any[] = [];
let capturedOnNodeClick: ((event: any, node: any) => void) | undefined;

vi.mock('@xyflow/react', () => {
  const ReactFlow = (props: any) => {
    capturedNodes = props.nodes;
    capturedEdges = props.edges;
    capturedOnNodeClick = props.onNodeClick;
    return (
      <div data-testid="react-flow-mock">
        {props.children}
        {(props.nodes ?? []).map((n: any) => (
          <div key={n.id} data-testid={`node-${n.id}`} data-x={n.position?.x} />
        ))}
      </div>
    );
  };
  const Background = () => <div data-testid="bg" />;
  const Controls = () => <div data-testid="controls" />;
  const MarkerType = { ArrowClosed: 'arrowclosed' };
  return { ReactFlow, Background, Controls, MarkerType };
});

import { AgentFlowCanvas } from '../AgentFlowCanvas';

function makeAgent(overrides: Partial<AgentDefinition> = {}): AgentDefinition {
  return {
    id: 'a1',
    name: 'A1',
    status: 'healthy',
    protocol: 'direct',
    model: 'gpt-4',
    tools: [],
    guardrails: [],
    endpoint: 'http://x',
    ...overrides,
  };
}

beforeEach(() => {
  capturedNodes = [];
  capturedEdges = [];
  capturedOnNodeClick = undefined;
});

describe('AgentFlowCanvas', () => {
  it('renders one node per agent', () => {
    render(<AgentFlowCanvas agents={[makeAgent({ id: 'a' }), makeAgent({ id: 'b' })]} />);
    expect(capturedNodes).toHaveLength(2);
    expect(capturedNodes.map((n) => n.id).sort()).toEqual(['a', 'b']);
  });

  it('layouts roots/middles/leaves into distinct columns by x position', () => {
    const agents = [
      makeAgent({ id: 'root' }),
      makeAgent({ id: 'mid' }),
      makeAgent({ id: 'leaf' }),
    ];
    const edges = [
      { from: 'root', to: 'mid' },
      { from: 'mid', to: 'leaf' },
    ];
    render(<AgentFlowCanvas agents={agents} edges={edges} />);
    const byId = Object.fromEntries(capturedNodes.map((n) => [n.id, n.position.x]));
    expect(byId.root).toBeLessThan(byId.mid);
    expect(byId.mid).toBeLessThan(byId.leaf);
  });

  it('healthy status uses green background, degraded amber, offline red', () => {
    render(
      <AgentFlowCanvas
        agents={[
          makeAgent({ id: 'h', status: 'healthy' }),
          makeAgent({ id: 'd', status: 'degraded' }),
          makeAgent({ id: 'o', status: 'offline' }),
        ]}
      />,
    );
    const styles = Object.fromEntries(capturedNodes.map((n) => [n.id, n.style]));
    expect(styles.h.background).toBe('var(--color-success-bg)');
    expect(styles.d.background).toBe('var(--color-warning-bg)');
    expect(styles.o.background).toBe('var(--color-danger-bg)');
  });

  it('filters out edges referencing unknown agents', () => {
    render(
      <AgentFlowCanvas
        agents={[makeAgent({ id: 'a' }), makeAgent({ id: 'b' })]}
        edges={[
          { from: 'a', to: 'b' },
          { from: 'a', to: 'ghost' },
          { from: 'missing', to: 'b' },
        ]}
      />,
    );
    expect(capturedEdges).toHaveLength(1);
    expect(capturedEdges[0]).toMatchObject({ source: 'a', target: 'b' });
  });

  it('A2A-source edges are animated, blue, and labelled', () => {
    render(
      <AgentFlowCanvas
        agents={[makeAgent({ id: 'a', protocol: 'a2a' }), makeAgent({ id: 'b' })]}
        edges={[{ from: 'a', to: 'b' }]}
      />,
    );
    const e = capturedEdges[0];
    expect(e.animated).toBe(true);
    expect(e.label).toBe('A2A');
    expect(e.style.stroke).toBe('var(--color-info)');
  });

  it('direct-source edges are not animated, gray, no label', () => {
    render(
      <AgentFlowCanvas
        agents={[makeAgent({ id: 'a', protocol: 'direct' }), makeAgent({ id: 'b' })]}
        edges={[{ from: 'a', to: 'b' }]}
      />,
    );
    const e = capturedEdges[0];
    expect(e.animated).toBe(false);
    expect(e.label).toBeUndefined();
    expect(e.style.stroke).toBe('var(--color-text-tertiary)');
  });

  it('onAgentClick fires with the clicked node id', () => {
    const onAgentClick = vi.fn();
    render(
      <AgentFlowCanvas
        agents={[makeAgent({ id: 'clicked' })]}
        onAgentClick={onAgentClick}
      />,
    );
    capturedOnNodeClick?.({}, { id: 'clicked' });
    expect(onAgentClick).toHaveBeenCalledWith('clicked');
  });

  it('does not throw when onAgentClick is omitted', () => {
    render(<AgentFlowCanvas agents={[makeAgent({ id: 'a' })]} />);
    expect(() => capturedOnNodeClick?.({}, { id: 'a' })).not.toThrow();
  });

  it('renders empty when agents is empty', () => {
    render(<AgentFlowCanvas agents={[]} />);
    expect(capturedNodes).toEqual([]);
    expect(capturedEdges).toEqual([]);
  });

  it('threads className onto the outer wrapper', () => {
    const { container } = render(
      <AgentFlowCanvas agents={[]} className="custom-wrapper" />,
    );
    expect(container.firstChild).toHaveClass('custom-wrapper');
    expect(container.firstChild).toHaveClass('h-[500px]');
  });

  it('renders Background and Controls inside ReactFlow', () => {
    const { getByTestId } = render(<AgentFlowCanvas agents={[makeAgent()]} />);
    expect(getByTestId('bg')).toBeInTheDocument();
    expect(getByTestId('controls')).toBeInTheDocument();
  });
});
