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

  it('renders as a real <button> when onOpen is provided (keyboard a11y)', () => {
    const { container } = render(
      <VisionRunCard status="completed" result={rich} onOpen={() => {}} />,
    );
    const button = container.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.getAttribute('type')).toBe('button');
  });

  it('renders as a non-interactive <article> when onOpen is omitted', () => {
    const { container } = render(<VisionRunCard status="completed" result={rich} />);
    expect(container.querySelector('article')).not.toBeNull();
    // No top-level button when there's no click target.
    const buttons = container.querySelectorAll('button');
    // chips are spans, no button expected
    expect(buttons.length).toBe(0);
  });

  it('shows the full caption (no slice-truncation) and relies on line-clamp', () => {
    const longCap =
      'This is a very long caption that previously was sliced before render, hurting screen readers. The component now hands the full text to the DOM and lets CSS line-clamp handle visual truncation.';
    render(
      <VisionRunCard
        status="completed"
        result={{ ...rich, caption: longCap }}
      />,
    );
    // Full text in DOM (not sliced) — SR sees everything.
    expect(screen.getByText(longCap)).toBeInTheDocument();
  });
});

describe('ImageWithBBoxOverlay — bbox guards (vision wave 1)', () => {
  it('skips boxes when imageWidth = 0 (degenerate dims)', () => {
    const { container } = render(
      <VisionResultViewer
        result={{
          imageUrl: 'https://example.com/x.jpg',
          imageWidth: 0,
          imageHeight: 1024,
          caption: 'c',
          objects: [{ label: 'cat', bbox: { x1: 0, y1: 0, x2: 100, y2: 100 } }],
        }}
      />,
    );
    // The overlay container exists but no bbox <button> is rendered.
    const overlayButtons = container.querySelectorAll('button[title="cat"]');
    expect(overlayButtons.length).toBe(0);
  });

  it('skips inverted / NaN bboxes', () => {
    const { container } = render(
      <VisionResultViewer
        result={{
          imageUrl: 'https://example.com/x.jpg',
          imageWidth: 100,
          imageHeight: 100,
          caption: 'c',
          objects: [
            { label: 'inv', bbox: { x1: 50, y1: 50, x2: 10, y2: 10 } }, // inverted
            { label: 'nan', bbox: { x1: NaN, y1: 0, x2: 50, y2: 50 } }, // NaN
          ],
        }}
      />,
    );
    expect(container.querySelectorAll('button[title="inv"]').length).toBe(0);
    expect(container.querySelectorAll('button[title="nan"]').length).toBe(0);
  });

  it('renders bboxes with aria-label for screen readers', () => {
    const { container } = render(
      <VisionResultViewer
        result={{
          imageUrl: 'https://example.com/x.jpg',
          imageWidth: 100,
          imageHeight: 100,
          caption: 'c',
          objects: [{ label: 'umbrella', bbox: { x1: 0, y1: 0, x2: 50, y2: 50 } }],
        }}
      />,
    );
    const button = container.querySelector('button[title="umbrella"]');
    expect(button?.getAttribute('aria-label')).toBe('Object bounding box: umbrella');
  });
});

describe('EditRecommendationsPanel — label-prefix verdicts (vision wave 1, A11Y)', () => {
  it('prefixes correct/normal/neutral verdicts with "OK · " for color-blind users', () => {
    render(
      <VisionResultViewer
        result={{
          caption: 'c',
          exposure: { verdict: 'correct', evAdjustment: 0, rationale: 'r' },
        }}
      />,
    );
    expect(screen.getByText('OK · correct')).toBeInTheDocument();
  });

  it('prefixes off-verdicts with "ADJUST · "', () => {
    render(
      <VisionResultViewer
        result={{
          caption: 'c',
          exposure: { verdict: 'overexposed', evAdjustment: -0.5, rationale: 'r' },
        }}
      />,
    );
    expect(screen.getByText('ADJUST · overexposed')).toBeInTheDocument();
  });
});
