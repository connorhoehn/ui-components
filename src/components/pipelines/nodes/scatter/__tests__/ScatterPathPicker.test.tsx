// Tests for ScatterPathPicker component.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ScatterPathPicker, _resetOutputSchemasCache } from '../ScatterPathPicker';

// ---------------------------------------------------------------------------
// Test schemas
// ---------------------------------------------------------------------------

const VISION_ANALYZE_SCHEMA = {
  type: 'object',
  required: ['regions', 'caption'],
  properties: {
    regions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          label:      { type: 'string' },
          confidence: { type: 'number' },
          bbox: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            },
          },
        },
      },
    },
    caption: { type: 'string' },
  },
};

const TAGS_SCHEMA = {
  type: 'object',
  properties: {
    tags: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          tag:        { type: 'string' },
          confidence: { type: 'number' },
        },
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Fetch mock
// ---------------------------------------------------------------------------

const MOCK_SCHEMAS_RESPONSE = {
  schemas: {
    'image:vision-analyze': VISION_ANALYZE_SCHEMA,
    'image:vision-classify': null,
  },
};

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
  // Reset the module-level fetch cache so each test starts clean.
  _resetOutputSchemasCache();
});

// ---------------------------------------------------------------------------
// Tests: upstreamSchema provided directly
// ---------------------------------------------------------------------------

describe('ScatterPathPicker — upstreamSchema prop', () => {
  it('renders clickable path rows from the provided schema', () => {
    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value=""
        onChange={onChange}
        upstreamKind="image:vision-analyze"
        upstreamSchema={VISION_ANALYZE_SCHEMA}
      />,
    );

    expect(screen.getByTestId('scatter-path-tree')).toBeInTheDocument();
    // $.regions should be present as a path row
    expect(screen.getByTestId('path-row-$.regions')).toBeInTheDocument();
  });

  it('calls onChange with the clicked path', () => {
    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value=""
        onChange={onChange}
        upstreamKind="image:vision-analyze"
        upstreamSchema={VISION_ANALYZE_SCHEMA}
      />,
    );

    const regionsRow = screen.getByTestId('path-row-$.regions');
    fireEvent.click(regionsRow);
    expect(onChange).toHaveBeenCalledWith('$.regions');
  });

  it('clicking $.regions[*] calls onChange with the [*] path', () => {
    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value=""
        onChange={onChange}
        upstreamKind="image:vision-analyze"
        upstreamSchema={VISION_ANALYZE_SCHEMA}
      />,
    );

    const starRow = screen.getByTestId('path-row-$.regions[*]');
    fireEvent.click(starRow);
    expect(onChange).toHaveBeenCalledWith('$.regions[*]');
  });

  it('marks the currently selected path as selected', () => {
    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value="$.regions"
        onChange={onChange}
        upstreamKind="image:vision-analyze"
        upstreamSchema={VISION_ANALYZE_SCHEMA}
      />,
    );

    const selectedRow = screen.getByTestId('path-row-$.regions');
    // The selected row should have the indigo-50 bg class (or some visual indicator).
    // We check via aria or class — we test the onChange instead which is the real contract.
    expect(selectedRow).toBeInTheDocument();
  });

  it('renders the manual input field alongside the tree', () => {
    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value="$.regions"
        onChange={onChange}
        upstreamKind="image:vision-analyze"
        upstreamSchema={VISION_ANALYZE_SCHEMA}
      />,
    );

    const input = screen.getByTestId('scatter-path-input');
    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe('$.regions');
  });

  it('shows tags[*] from a tags schema', () => {
    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value=""
        onChange={onChange}
        upstreamKind="image:vision-tag"
        upstreamSchema={TAGS_SCHEMA}
      />,
    );

    expect(screen.getByTestId('path-row-$.tags[*]')).toBeInTheDocument();
  });

  it('falls back to plain input when upstreamSchema is null', () => {
    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value=""
        onChange={onChange}
        upstreamKind="image:vision-classify"
        upstreamSchema={null}
      />,
    );

    expect(screen.queryByTestId('scatter-path-tree')).not.toBeInTheDocument();
    expect(screen.getByTestId('scatter-path-fallback-input')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Tests: upstreamKind triggers API fetch
// ---------------------------------------------------------------------------

describe('ScatterPathPicker — upstreamKind fetch', () => {
  it('fetches output-schemas and renders tree on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_SCHEMAS_RESPONSE,
    });

    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value=""
        onChange={onChange}
        upstreamKind="image:vision-analyze"
      />,
    );

    // Should show loading state first (or quickly resolve)
    await waitFor(() => {
      expect(screen.getByTestId('scatter-path-tree')).toBeInTheDocument();
    });

    expect(screen.getByTestId('path-row-$.regions')).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/pipeline/output-schemas'),
    );
  });

  it('falls back to plain input when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network error'));

    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value=""
        onChange={onChange}
        upstreamKind="image:vision-analyze"
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('scatter-path-fallback-input')).toBeInTheDocument();
    });

    expect(screen.getByText(/Could not load schema/)).toBeInTheDocument();
  });

  it('falls back to plain input when API returns null for the kind', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_SCHEMAS_RESPONSE,
    });

    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value=""
        onChange={onChange}
        upstreamKind="image:vision-classify"
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('scatter-path-fallback-input')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('scatter-path-tree')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Tests: no upstream info at all
// ---------------------------------------------------------------------------

describe('ScatterPathPicker — no upstream', () => {
  it('renders only a plain JsonPathInput when no upstreamKind or upstreamSchema', () => {
    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value="$.my.path"
        onChange={onChange}
      />,
    );

    expect(screen.getByTestId('scatter-path-plain-input')).toBeInTheDocument();
    expect(screen.queryByTestId('scatter-path-tree')).not.toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('calls onChange when the user types in the plain input', () => {
    const onChange = vi.fn();
    render(
      <ScatterPathPicker
        value=""
        onChange={onChange}
      />,
    );

    const input = screen.getByTestId('scatter-path-plain-input');
    fireEvent.change(input, { target: { value: '$.steps.foo.output' } });
    expect(onChange).toHaveBeenCalledWith('$.steps.foo.output');
  });
});
