// src/components/pipelines/nodes/__tests__/image-config-a11y.test.tsx
//
// The image/media node config panels must label their controls for real.
//
// ConfigField's <label> carried no `htmlFor` and did not wrap its control, so
// it named nothing: a screen reader read "Contrast multiplier" as loose text
// and then announced the field itself as a bare "spin button". Roughly 60% of
// these controls passed no `aria-label` either, so they had no name at all.
//
// Every assertion here goes through `getByLabelText` / `getByRole(name)` —
// i.e. through the accessibility tree — rather than asserting that some
// attribute is present. An `htmlFor` pointing at a missing id, or an id that
// two fields share, still passes an attribute check and still leaves the
// control unnamed; only resolving the name catches that.
//
// The other half of the contract is that a field has exactly ONE name. Where
// wiring the visible label made a control's own `aria-label` redundant, the
// aria-label was removed, and `labelled()` below fails if one comes back —
// two names is how the rejected blanket `role="group"` fallback broke nine
// tests in the first place.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';

import AdjustBwConfig from '../adjust-bw/AdjustBwConfig';
import AdjustLayerConfig from '../adjust-layer/AdjustLayerConfig';
import CropConfig from '../crop/CropConfig';
import DimensionsConfig from '../dimensions/DimensionsConfig';
import EditPromptConfig from '../edit-prompt/EditPromptConfig';
import FormatConvertConfig from '../format-convert/FormatConvertConfig';
import GenerateConfig from '../generate/GenerateConfig';
import ResizeConfig from '../resize/ResizeConfig';
import SharpenConfig from '../sharpen/SharpenConfig';
import TransformGeoConfig from '../transform-geo/TransformGeoConfig';
import UpscaleConfig from '../upscale/UpscaleConfig';
import VariationConfig from '../variation/VariationConfig';
import WatermarkConfig from '../watermark/WatermarkConfig';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../services/PipelineEditorServicesContext';

// CropConfig and AdjustLayerConfig read the editor graph through
// usePipelineEditor(), which throws with no provider mounted. Everything else
// on the module (including the context object useUpstreamImageRefs reads) is
// kept real.
vi.mock('../../context/PipelineEditorContext', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../context/PipelineEditorContext')>();
  return {
    ...actual,
    usePipelineEditor: () =>
      ({ selectedNodeId: null, definition: null }) as unknown as ReturnType<
        typeof actual.usePipelineEditor
      >,
  };
});

const services: PipelineEditorServices = {
  getImageUrl: (id) => `https://example.test/img/${id}`,
};

beforeEach(() => {
  // AdjustLayerSliderPanel asks the host for a preview render; no test here
  // depends on the response.
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function mount(ui: ReactElement): RenderResult {
  return render(
    <PipelineEditorServicesProvider services={services}>
      {ui}
    </PipelineEditorServicesProvider>,
  );
}

/**
 * The control the visible label text resolves to — and proof that the label
 * is its only name.
 *
 * A required field's label also renders an aria-hidden "●", which lands in the
 * label's textContent but must NOT land in the control's accessible name; pass
 * a pattern plus the name those fields are expected to compute to.
 */
function labelled(label: string | RegExp, accessibleName?: string): HTMLElement {
  const el = screen.getByLabelText(label);
  expect(el).not.toHaveAttribute('aria-label');
  if (accessibleName !== undefined) expect(el).toHaveAccessibleName(accessibleName);
  return el;
}

/** A field wrapping several controls names itself with role="group". */
function group(name: string): HTMLElement {
  return screen.getByRole('group', { name });
}

const noop = () => {};

describe('image node config panels — label ↔ control association', () => {
  it('AdjustBwConfig names its three fields', () => {
    mount(
      <AdjustBwConfig data={{ type: 'image:adjust-bw', contrast: 1 }} onChange={noop} />,
    );

    expect(labelled('Source image path')).toHaveAttribute('type', 'text');
    expect(labelled('Greyscale algorithm')).toHaveAttribute('data-ui-control', 'select');
    expect(labelled('Contrast multiplier')).toHaveAttribute(
      'data-testid',
      'adjust-bw-contrast',
    );
  });

  it('AdjustBwConfig reaches the help text through aria-describedby', () => {
    mount(<AdjustBwConfig data={{ type: 'image:adjust-bw' }} onChange={noop} />);

    expect(labelled('Contrast multiplier')).toHaveAccessibleDescription(
      /Applied after greyscale conversion/,
    );
  });

  it('AdjustLayerConfig names the layer stack as a group, not a control', () => {
    mount(
      <AdjustLayerConfig
        data={{ type: 'image:adjust-layer', layers: [] }}
        onChange={noop}
      />,
    );

    // The slider panel is many controls, so htmlFor has nothing to point at.
    expect(group('Adjustment layers')).toHaveAccessibleDescription(
      /Applied top-to-bottom/,
    );
    expect(labelled('Source image path')).toHaveAttribute('type', 'text');
  });

  it('CropConfig names the path field and groups the visual crop region', () => {
    mount(<CropConfig data={{ type: 'image:crop' }} onChange={noop} />);

    expect(labelled('Bounding-box path')).toHaveAccessibleDescription(
      /JSONPath to a bbox object/,
    );
    // The region is painted on a canvas and read back off chips.
    expect(group('Crop region')).toBeInTheDocument();
  });

  it('DimensionsConfig names its max-edge field', () => {
    mount(<DimensionsConfig data={{ type: 'image:dimensions' }} onChange={noop} />);

    expect(labelled('Max edge')).toHaveAttribute('data-testid', 'dimensions-max-edge');
    expect(labelled('Max edge')).toHaveAccessibleDescription(/Longest-edge cap/);
  });

  it('EditPromptConfig names all four fields', () => {
    mount(
      <EditPromptConfig
        data={{ type: 'image:edit-prompt', prompt: 'a beach' }}
        onChange={noop}
      />,
    );

    expect(labelled('Source image path')).toHaveAttribute('type', 'text');
    expect(labelled('Mask image path')).toHaveAccessibleDescription(/White pixels/);
    expect(labelled(/^Edit prompt/, 'Edit prompt').tagName).toBe('TEXTAREA');
    expect(labelled('Model')).toHaveAttribute('data-ui-control', 'select');
  });

  it('EditPromptConfig points the prompt at its validation error', () => {
    mount(
      <EditPromptConfig data={{ type: 'image:edit-prompt', prompt: '' }} onChange={noop} />,
    );

    // Error replaces help in the same described-by slot, so a blank prompt
    // announces WHY it is rejected rather than just turning red.
    expect(labelled(/^Edit prompt/, 'Edit prompt')).toHaveAccessibleDescription(
      'Edit prompt is required.',
    );
  });

  it('FormatConvertConfig names format and quality', () => {
    mount(
      <FormatConvertConfig
        data={{ type: 'image:format-convert', format: 'jpeg' }}
        onChange={noop}
      />,
    );

    expect(labelled('Output format')).toHaveAttribute('data-ui-control', 'select');
    expect(labelled('Quality')).toHaveAccessibleDescription(/Higher is better quality/);
  });

  it('GenerateConfig names all six fields', () => {
    mount(<GenerateConfig data={{ type: 'image:generate', prompt: 'a dog' }} onChange={noop} />);

    expect(labelled(/^Prompt/, 'Prompt').tagName).toBe('TEXTAREA');
    expect(labelled('Model')).toHaveAttribute('data-ui-control', 'select');
    expect(labelled('Width')).toHaveAttribute('data-testid', 'generate-width');
    expect(labelled('Height')).toHaveAttribute('data-testid', 'generate-height');
    expect(labelled('Seed')).toHaveAttribute('data-testid', 'generate-seed');
    expect(labelled('Number of images')).toHaveAttribute(
      'data-testid',
      'generate-num-images',
    );
  });

  it('GenerateConfig gives width and height distinct controls', () => {
    mount(<GenerateConfig data={{ type: 'image:generate', prompt: 'a dog' }} onChange={noop} />);

    // Two adjacent NumberInputs: a shared or copy-pasted id would silently
    // resolve both labels to the same field.
    expect(labelled('Width')).not.toBe(labelled('Height'));
  });

  it('ResizeConfig names all five fields', () => {
    mount(<ResizeConfig data={{ type: 'image:resize' }} onChange={noop} />);

    expect(labelled('Source image path')).toHaveAttribute('type', 'text');
    expect(labelled('Width')).toHaveAttribute('data-testid', 'resize-width');
    expect(labelled('Height')).toHaveAttribute('data-testid', 'resize-height');
    expect(labelled('Fit mode')).toHaveAttribute('data-ui-control', 'select');
    expect(labelled('Background colour')).toHaveAccessibleDescription(
      /Only applies when fit is contain or fill/,
    );
  });

  it('SharpenConfig names its path field and three numeric fields', () => {
    mount(<SharpenConfig data={{ type: 'image:sharpen' }} onChange={noop} />);

    expect(labelled('Source image path')).toHaveAttribute('type', 'text');
    expect(labelled('Sigma')).toHaveAccessibleDescription(/Gaussian mask sigma/);
    expect(labelled('m1 — flat area level')).toHaveAttribute(
      'data-testid',
      'sharpen-m1',
    );
    expect(labelled('m2 — jagged area level')).toHaveAttribute(
      'data-testid',
      'sharpen-m2',
    );
  });

  it('TransformGeoConfig groups the operation list', () => {
    mount(
      <TransformGeoConfig
        data={{ type: 'image:transform', operations: [{ op: 'rotate', degrees: 90 }] }}
        onChange={noop}
      />,
    );

    // Op cards plus an Add button — a group, not a labelable control.
    expect(group('Operations')).toHaveAccessibleDescription(/Applied top-to-bottom/);
    expect(labelled('Source image path')).toHaveAttribute('type', 'text');
  });

  it('TransformGeoConfig announces the empty-operations error on the group', () => {
    mount(
      <TransformGeoConfig
        data={{ type: 'image:transform', operations: [] }}
        onChange={noop}
      />,
    );

    expect(group('Operations')).toHaveAccessibleDescription(
      'Add at least one operation.',
    );
  });

  it('UpscaleConfig names its three fields', () => {
    mount(<UpscaleConfig data={{ type: 'image:upscale' }} onChange={noop} />);

    expect(labelled('Prompt').tagName).toBe('TEXTAREA');
    expect(labelled('Max edge')).toHaveAttribute('data-testid', 'upscale-max-edge');
    expect(labelled('Source image path')).toHaveAttribute('type', 'text');
  });

  it('VariationConfig names all four fields', () => {
    mount(<VariationConfig data={{ type: 'image:variation' }} onChange={noop} />);

    expect(labelled('Source image path')).toHaveAttribute('type', 'text');
    expect(labelled('Model')).toHaveAttribute('data-ui-control', 'select');
    expect(labelled('Number of variations')).toHaveAccessibleDescription(
      /Always fans out/,
    );
    expect(labelled('Similarity')).toHaveAttribute(
      'data-testid',
      'variation-similarity',
    );
  });

  it('WatermarkConfig names all six fields', () => {
    mount(
      <WatermarkConfig
        data={{ type: 'image:watermark', overlayImageId: 'img_1' }}
        onChange={noop}
      />,
    );

    expect(labelled('Source image path')).toHaveAttribute('type', 'text');
    expect(labelled(/^Overlay image ID/, 'Overlay image ID')).toHaveAccessibleDescription(
      /already stored in the blob store/,
    );
    expect(labelled('Gravity')).toHaveAttribute('data-ui-control', 'select');
    expect(labelled('Opacity')).toHaveAttribute('data-testid', 'watermark-opacity');
    expect(labelled('Offset X')).toHaveAttribute('data-testid', 'watermark-offset-x');
    expect(labelled('Offset Y')).toHaveAttribute('data-testid', 'watermark-offset-y');
  });

  it('WatermarkConfig points the overlay field at its error when blank', () => {
    mount(
      <WatermarkConfig
        data={{ type: 'image:watermark', overlayImageId: '' }}
        onChange={noop}
      />,
    );

    const overlay = labelled(/^Overlay image ID/, 'Overlay image ID');
    expect(overlay).toHaveAccessibleDescription('Overlay image ID is required.');
    expect(overlay).toHaveAttribute('aria-invalid', 'true');
  });

  it('SourceImagePathField ids are unique per instance, so two panels do not collide', () => {
    // The shared field derives its id from useId() rather than a literal.
    // Two panels in one tree with the same literal would leave one label
    // pointing at the other panel's input.
    mount(
      <>
        <DimensionsConfig data={{ type: 'image:dimensions' }} onChange={noop} />
        <VariationConfig data={{ type: 'image:variation' }} onChange={noop} />
      </>,
    );

    const inputs = screen.getAllByLabelText('Source image path');
    expect(inputs).toHaveLength(2);
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });
});
