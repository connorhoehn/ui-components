import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StackDiagram, { LayerStack, type StackLayerSpec } from '../StackDiagram';

const sample: StackLayerSpec[] = [
  { id: 'browser', label: 'Browser',  description: 'React + Vite', tone: 'info' },
  { id: 'gateway', label: 'Gateway',  description: 'Cloudflare Worker', tone: 'success' },
  { id: 'queue',   label: 'Queue',    description: 'SQS',                tone: 'warning' },
  { id: 'worker',  label: 'Worker',   description: 'Lambda',             tone: 'neutral' },
];

describe('StackDiagram', () => {
  it('renders every layer label', () => {
    render(<StackDiagram layers={sample} />);
    expect(screen.getByText('Browser')).toBeInTheDocument();
    expect(screen.getByText('Gateway')).toBeInTheDocument();
    expect(screen.getByText('Queue')).toBeInTheDocument();
    expect(screen.getByText('Worker')).toBeInTheDocument();
  });

  it('renders descriptions when provided', () => {
    render(<StackDiagram layers={sample} />);
    expect(screen.getByText('React + Vite')).toBeInTheDocument();
    expect(screen.getByText('Cloudflare Worker')).toBeInTheDocument();
  });

  it('renders n-1 connectors for n layers', () => {
    render(<StackDiagram layers={sample} />);
    expect(screen.getAllByTestId('stack-diagram-connector')).toHaveLength(sample.length - 1);
  });

  it('uses ↓ as the default vertical arrow connector', () => {
    render(<StackDiagram layers={sample} />);
    expect(screen.getAllByTestId('stack-diagram-connector')[0].textContent).toBe('↓');
  });

  it('uses → when orientation=horizontal with arrow connector', () => {
    render(<StackDiagram layers={sample} orientation="horizontal" />);
    expect(screen.getAllByTestId('stack-diagram-connector')[0].textContent).toBe('→');
  });

  it('uses │ when connector=line and orientation=vertical', () => {
    render(<StackDiagram layers={sample} connector="line" />);
    expect(screen.getAllByTestId('stack-diagram-connector')[0].textContent).toBe('│');
  });

  it('omits connectors when connector=none', () => {
    render(<StackDiagram layers={sample} connector="none" />);
    expect(screen.queryAllByTestId('stack-diagram-connector')).toHaveLength(0);
  });

  it('records tone on each layer via data-tone', () => {
    render(<StackDiagram layers={sample} />);
    const layers = screen.getAllByTestId('stack-diagram-layer');
    expect(layers[0].getAttribute('data-tone')).toBe('info');
    expect(layers[1].getAttribute('data-tone')).toBe('success');
    expect(layers[3].getAttribute('data-tone')).toBe('neutral');
  });

  it('renders icon and meta slots', () => {
    render(
      <StackDiagram
        layers={[
          { id: 'x', label: 'Cache', icon: '🧠', meta: 'v3' },
        ]}
      />,
    );
    expect(screen.getByText('🧠')).toBeInTheDocument();
    expect(screen.getByText('v3')).toBeInTheDocument();
  });

  it('renders zero connectors for a single layer', () => {
    render(<StackDiagram layers={[{ id: 'x', label: 'Only' }]} />);
    expect(screen.queryAllByTestId('stack-diagram-connector')).toHaveLength(0);
  });

  it('exposes data-orientation on the container', () => {
    render(<StackDiagram layers={sample} orientation="horizontal" />);
    expect(screen.getByTestId('stack-diagram').getAttribute('data-orientation')).toBe('horizontal');
  });

  it('LayerStack is an alias for StackDiagram', () => {
    expect(LayerStack).toBe(StackDiagram);
  });
});
