// src/components/pipelines/nodes/adjust-layer/__tests__/AdjustLayerSliderPanel.test.tsx
//
// Tests:
//   - render with 0 layers shows "No layers" message
//   - add a brightness layer via kind select + Add layer button
//   - slider change calls onChange + triggers preview fetch (mock fetch)
//   - delete removes layer from stack
//   - multi-layer composition renders all rows

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AdjustLayerSliderPanel from '../AdjustLayerSliderPanel';
import type { AdjustLayer } from '../../../../../types/pipeline';

// ---------------------------------------------------------------------------
// Fetch mock
// ---------------------------------------------------------------------------

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ dataUrl: 'data:image/png;base64,AAAA', width: 4, height: 4, mimeType: 'image/png' }),
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  mockFetch.mockReset();
  vi.useRealTimers();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderPanel(
  layers: AdjustLayer[],
  onChange = vi.fn(),
  sourceImageId?: string,
) {
  return render(
    <AdjustLayerSliderPanel
      layers={layers}
      onChange={onChange}
      sourceImageId={sourceImageId}
    />,
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('AdjustLayerSliderPanel', () => {
  it('renders "No layers" message when layers array is empty', () => {
    renderPanel([]);
    expect(screen.getByText(/No layers/i)).toBeInTheDocument();
  });

  it('shows no-source placeholder when sourceImageId is not provided', () => {
    renderPanel([]);
    expect(screen.getByTestId('adjust-layer-no-source')).toBeInTheDocument();
  });

  it('add layer button calls onChange with a new layer appended', () => {
    const onChange = vi.fn();
    renderPanel([], onChange);

    const addBtn = screen.getByTestId('add-layer-btn');
    fireEvent.click(addBtn);

    expect(onChange).toHaveBeenCalledTimes(1);
    const nextLayers = onChange.mock.calls[0][0] as AdjustLayer[];
    expect(nextLayers).toHaveLength(1);
    expect(nextLayers[0].kind).toBe('brightness');
  });

  it('slider change calls onChange with updated value', () => {
    const onChange = vi.fn();
    const sourceImageId = 'img-abc';

    renderPanel(
      [{ kind: 'brightness', value: 1.0 }],
      onChange,
      sourceImageId,
    );

    const slider = screen.getByTestId('layer-slider-0');
    fireEvent.change(slider, { target: { value: '1.5' } });

    // onChange fires synchronously on slider change
    expect(onChange).toHaveBeenCalledTimes(1);
    const updated = onChange.mock.calls[0][0] as AdjustLayer[];
    expect(updated[0]).toMatchObject({ kind: 'brightness', value: 1.5 });
  });

  it('triggers a debounced preview fetch when sourceImageId is provided', async () => {
    const onChange = vi.fn();
    const sourceImageId = 'img-abc';

    renderPanel(
      [{ kind: 'brightness', value: 1.0 }],
      onChange,
      sourceImageId,
    );

    // Initial mount triggers a fetch after 150 ms
    await waitFor(
      () => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/pipeline/preview/adjust-layer'),
          expect.objectContaining({ method: 'POST' }),
        );
      },
      { timeout: 500 },
    );
  });

  it('delete button removes the layer from the stack', () => {
    const onChange = vi.fn();
    const layers: AdjustLayer[] = [
      { kind: 'brightness', value: 1.2 },
      { kind: 'blur', radiusPx: 3 },
    ];
    renderPanel(layers, onChange);

    const removeBtn = screen.getByTestId('layer-remove-0');
    fireEvent.click(removeBtn);

    expect(onChange).toHaveBeenCalledTimes(1);
    const next = onChange.mock.calls[0][0] as AdjustLayer[];
    expect(next).toHaveLength(1);
    expect(next[0].kind).toBe('blur');
  });

  it('renders a row for each layer in multi-layer composition', () => {
    const layers: AdjustLayer[] = [
      { kind: 'brightness', value: 1.0 },
      { kind: 'contrast', value: 0.9 },
      { kind: 'saturation', value: 1.1 },
      { kind: 'hue', degrees: 45 },
      { kind: 'blur', radiusPx: 2 },
    ];
    renderPanel(layers);

    for (let i = 0; i < layers.length; i++) {
      expect(screen.getByTestId(`layer-row-${i}`)).toBeInTheDocument();
    }
  });
});
