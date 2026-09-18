// Every config pane this library exports, rendered the way the APP renders it.
//
// These panes ship from here and are mounted inside a HOST editor. The host has
// its own PipelineEditorContext — a different module, so a different React
// context object — and never mounts this library's provider. Three panes
// (scatter, crop, adjust-layer) reached for the throwing `usePipelineEditor`
// anyway, so each threw on render and took the whole config panel to its error
// boundary: selecting one of those nodes showed nothing at all, with the cause
// two repos away.
//
// The point of doing this as a table rather than for the three known cases:
// the next pane to reach for a host-only context should fail here, in a second,
// rather than as an empty panel someone notices months later. Rendering with NO
// editor provider is exactly the app's situation — mocking it is what hid this
// the first time.
//
// The SERVICES provider is different: mounting it is a documented host
// responsibility and the editor page really does. So it is provided here.

import type { ReactNode } from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PipelineEditorServicesProvider } from '../../services/PipelineEditorServicesContext';

import ImageSourceConfig from '../image-source/ImageSourceConfig';
import SaveConfig from '../save/SaveConfig';
import ScatterConfig from '../scatter/ScatterConfig';
import ResizeConfig from '../resize/ResizeConfig';
import TransformGeoConfig from '../transform-geo/TransformGeoConfig';
import FormatConvertConfig from '../format-convert/FormatConvertConfig';
import SharpenConfig from '../sharpen/SharpenConfig';
import WatermarkConfig from '../watermark/WatermarkConfig';
import CropConfig from '../crop/CropConfig';
import AdjustBwConfig from '../adjust-bw/AdjustBwConfig';
import AdjustLayerConfig from '../adjust-layer/AdjustLayerConfig';
import DimensionsConfig from '../dimensions/DimensionsConfig';
import UpscaleConfig from '../upscale/UpscaleConfig';
import VisionConfig from '../vision/VisionConfig';
import VisionClassifyConfig from '../vision-classify/VisionClassifyConfig';
import VisionDescribeConfig from '../vision-describe/VisionDescribeConfig';
import VisionTagConfig from '../vision-tag/VisionTagConfig';
import VisionExtractTextConfig from '../vision-extract-text/VisionExtractTextConfig';
import GenerateConfig from '../generate/GenerateConfig';
import VariationConfig from '../variation/VariationConfig';
import EditPromptConfig from '../edit-prompt/EditPromptConfig';

type Pane = (props: { data: never; onChange: () => void }) => ReactNode;

// [component, the node type its data carries]
const PANES: Array<[string, Pane, string]> = [
  ['ImageSourceConfig', ImageSourceConfig as Pane, 'image-source'],
  ['SaveConfig', SaveConfig as Pane, 'image:save'],
  ['ScatterConfig', ScatterConfig as Pane, 'scatter'],
  ['ResizeConfig', ResizeConfig as Pane, 'image:resize'],
  ['TransformGeoConfig', TransformGeoConfig as Pane, 'image:transform'],
  ['FormatConvertConfig', FormatConvertConfig as Pane, 'image:format-convert'],
  ['SharpenConfig', SharpenConfig as Pane, 'image:sharpen'],
  ['WatermarkConfig', WatermarkConfig as Pane, 'image:watermark'],
  ['CropConfig', CropConfig as Pane, 'image:crop'],
  ['AdjustBwConfig', AdjustBwConfig as Pane, 'image:adjust-bw'],
  ['AdjustLayerConfig', AdjustLayerConfig as Pane, 'image:adjust-layer'],
  ['DimensionsConfig', DimensionsConfig as Pane, 'image:dimensions'],
  ['UpscaleConfig', UpscaleConfig as Pane, 'image:upscale'],
  ['VisionConfig', VisionConfig as Pane, 'image:vision-analyze'],
  ['VisionClassifyConfig', VisionClassifyConfig as Pane, 'image:vision-classify'],
  ['VisionDescribeConfig', VisionDescribeConfig as Pane, 'image:vision-describe'],
  ['VisionTagConfig', VisionTagConfig as Pane, 'image:vision-tag'],
  ['VisionExtractTextConfig', VisionExtractTextConfig as Pane, 'image:vision-extract-text'],
  ['GenerateConfig', GenerateConfig as Pane, 'image:generate'],
  ['VariationConfig', VariationConfig as Pane, 'image:variation'],
  ['EditPromptConfig', EditPromptConfig as Pane, 'image:edit-prompt'],
];

describe('every exported config pane renders without the library’s own editor provider', () => {
  it.each(PANES)('%s', (_name, Pane, nodeType) => {
    expect(() =>
      render(
        <PipelineEditorServicesProvider services={{ getImageUrl: () => 'blob:x' }}>
          <Pane data={{ type: nodeType } as never} onChange={() => {}} />
        </PipelineEditorServicesProvider>,
      ),
    ).not.toThrow();
  });

  it('covers every pane the package exports', async () => {
    const pkg = await import('../../index');
    const exported = Object.keys(pkg).filter(
      (k) => k.endsWith('Config') && !['ConfigField', 'ConfigSection', 'NodeConfigShell'].includes(k),
    );
    const covered = PANES.map(([name]) => name);
    expect([...exported].sort()).toEqual([...covered].sort());
  });

  it('ScatterConfig still shows its corrected alias help with no editor around', () => {
    const { getByText } = render(
      <ScatterConfig data={{ type: 'scatter', itemsPath: '$.items' } as never} onChange={() => {}} />,
    );
    expect(getByText(/context\.<alias>/)).toBeTruthy();
  });
});
