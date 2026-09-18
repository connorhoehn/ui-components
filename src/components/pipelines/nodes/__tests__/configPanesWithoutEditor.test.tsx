// These three panes ship from this library and render inside a HOST's editor.
// The host has its own PipelineEditorContext — a different module, so a
// different React context object — and never mounts this one. Reaching for the
// throwing `usePipelineEditor` meant each of them threw on render and took the
// whole config panel to its error boundary: selecting a scatter, crop or
// adjust-layer node showed nothing at all.
//
// Rendering with NO provider is exactly the app's situation, so that is what
// these assert. No mock — a mock is what hid this in the first place.

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ScatterConfig from '../scatter/ScatterConfig';
import CropConfig from '../crop/CropConfig';
import AdjustLayerConfig from '../adjust-layer/AdjustLayerConfig';
import { PipelineEditorServicesProvider } from '../../services/PipelineEditorServicesContext';

// The SERVICES provider is a documented host responsibility and the editor page
// really does mount it; only the editor CONTEXT is the library's own. Crop is
// wrapped here for that reason, and for that reason only.
const withServices = (ui: React.ReactNode) => (
  <PipelineEditorServicesProvider services={{ getImageUrl: async () => 'blob:x' }}>
    {ui}
  </PipelineEditorServicesProvider>
);

describe('config panes render without the library’s own editor provider', () => {
  it('ScatterConfig renders', () => {
    expect(() =>
      render(<ScatterConfig data={{ type: 'scatter', itemsPath: '$.items' } as never} onChange={() => {}} />),
    ).not.toThrow();
  });

  it('CropConfig renders', () => {
    expect(() =>
      render(withServices(<CropConfig data={{ type: 'image:crop' } as never} onChange={() => {}} />)),
    ).not.toThrow();
  });

  it('AdjustLayerConfig renders', () => {
    expect(() =>
      render(<AdjustLayerConfig data={{ type: 'image:adjust-layer' } as never} onChange={() => {}} />),
    ).not.toThrow();
  });

  it('ScatterConfig still shows its corrected alias help with no editor around', () => {
    const { getByText } = render(
      <ScatterConfig data={{ type: 'scatter', itemsPath: '$.items' } as never} onChange={() => {}} />,
    );
    expect(getByText(/context\.<alias>/)).toBeTruthy();
  });
});
