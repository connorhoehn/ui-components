import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VisionResultViewer } from '../VisionResultViewer';
import { VisionRunCard } from '../VisionRunCard';
import type { VisionResult } from '../types';

const minimal: VisionResult = {
  caption: 'A cat sitting on a windowsill.',
  tags: ['cat', 'window'],
};

const rich: VisionResult = {
  imageUrl: 'https://example.com/img.jpg',
  imageWidth: 1024,
  imageHeight: 1024,
  caption: 'Four women at the beach.',
  setting: 'outdoor',
  location: 'beach',
  mood: 'cheerful',
  colors: ['blue', 'yellow'],
  people: [
    {
      index: 1,
      bbox: { x1: 100, y1: 100, x2: 300, y2: 800 },
      ageBucket: 'young_adult',
      gender: 'female',
      expression: 'smiling',
      activity: ':: walking',
      clothing: 'pink top',
    },
  ],
  objects: [
    { label: 'umbrella', bbox: { x1: 0, y1: 0, x2: 100, y2: 200 } },
  ],
  tags: ['beach', 'women'],
  exposure: { verdict: 'correct', evAdjustment: 0, rationale: 'Balanced.' },
  edits: ['Increase saturation.'],
  model: { endpointId: 'ec2-vision-qwen', latencyMs: 1234 },
};

describe('VisionResultViewer', () => {
  it('renders caption + tags from a minimal result', () => {
    render(<VisionResultViewer result={minimal} />);
    expect(screen.getByText('A cat sitting on a windowsill.')).toBeInTheDocument();
    expect(screen.getByText('#cat')).toBeInTheDocument();
    expect(screen.getByText('#window')).toBeInTheDocument();
  });

  it('renders all sections from a rich result', () => {
    render(<VisionResultViewer result={rich} />);
    expect(screen.getByText('Four women at the beach.')).toBeInTheDocument();
    expect(screen.getByText(/People \(1\)/)).toBeInTheDocument();
    expect(screen.getByText(/Objects \(1\)/)).toBeInTheDocument();
    // 'umbrella' appears both as a bbox-overlay label and in the objects list
    expect(screen.getAllByText('umbrella').length).toBeGreaterThan(0);
    expect(screen.getByText(/Edits/)).toBeInTheDocument();
    expect(screen.getByText('Increase saturation.')).toBeInTheDocument();
    expect(screen.getByText(/ec2-vision-qwen/)).toBeInTheDocument();
    expect(screen.getByText(/latency 1234ms/)).toBeInTheDocument();
  });

  it('fires onTagClick when a tag chip is clicked', () => {
    const tags: string[] = [];
    render(<VisionResultViewer result={rich} onTagClick={(t) => tags.push(t)} />);
    fireEvent.click(screen.getByText('#beach'));
    expect(tags).toEqual(['beach']);
  });

  it('fires onApplyEdit when Apply is clicked', () => {
    const applied: string[] = [];
    render(<VisionResultViewer result={rich} onApplyEdit={(e) => applied.push(e)} />);
    fireEvent.click(screen.getByText('Apply'));
    expect(applied).toEqual(['Increase saturation.']);
  });
});

describe('VisionRunCard', () => {
  it('shows the running pill before completion', () => {
    render(<VisionRunCard status="running" endpointLabel="ec2-vision-qwen" />);
    expect(screen.getByText('ec2-vision-qwen')).toBeInTheDocument();
    expect(screen.getByText('running')).toBeInTheDocument();
    expect(screen.getByText('Analyzing image…')).toBeInTheDocument();
  });

  it('shows caption + tags + latency once completed', () => {
    render(<VisionRunCard status="completed" result={rich} runId="run-1" />);
    expect(screen.getByText('ok')).toBeInTheDocument();
    expect(screen.getByText('Four women at the beach.')).toBeInTheDocument();
    expect(screen.getByText('#beach')).toBeInTheDocument();
    expect(screen.getByText(/1234ms/)).toBeInTheDocument();
  });

  it('shows the error when failed', () => {
    render(<VisionRunCard status="failed" error="Endpoint unreachable" />);
    expect(screen.getByText('failed')).toBeInTheDocument();
    expect(screen.getByText('Endpoint unreachable')).toBeInTheDocument();
  });

  it('calls onOpen when clicked', () => {
    let opened = false;
    render(
      <VisionRunCard
        status="completed"
        result={rich}
        onOpen={() => {
          opened = true;
        }}
      />,
    );
    fireEvent.click(screen.getByText('Four women at the beach.'));
    expect(opened).toBe(true);
  });
});
