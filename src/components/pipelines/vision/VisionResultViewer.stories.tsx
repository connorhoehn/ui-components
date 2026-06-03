import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisionResultViewer } from './VisionResultViewer';
import { VisionRunCard } from './VisionRunCard';
import type { VisionResult } from './types';

// Fixture matches the structured shape the user shared as a real model
// output (CAPTION + setting + 4 PEOPLE bboxes + 9 OBJECTS + tags + exposure
// + WB + edits). Renderer must handle this end-to-end.
const miamiBeach: VisionResult = {
  imageUrl:
    'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=1024&q=80',
  imageWidth: 1024,
  imageHeight: 1024,
  caption: 'Four women in colorful bikinis stroll along a sunny beach, carrying bags and drinks.',
  setting: 'outdoor',
  location: 'beach',
  timeOfDay: 'afternoon',
  mood: 'relaxed and cheerful',
  colors: ['blue', 'yellow', 'pink', 'white'],
  people: [
    {
      index: 1,
      bbox: { x1: 118, y1: 355, x2: 345, y2: 815 },
      ageBucket: 'young_adult',
      gender: 'female',
      faceOrientation: 'toward_camera',
      expression: 'neutral',
      activity: ':: walking on the beach',
      clothing: 'pink skirt, bikini top, white jacket',
    },
    {
      index: 2,
      bbox: { x1: 345, y1: 345, x2: 558, y2: 808 },
      ageBucket: 'young_adult',
      gender: 'female',
      faceOrientation: 'toward_camera',
      expression: 'smiling',
      activity: ':: walking on the beach while holding a drink',
      clothing: 'red swimsuit, patterned cover-up',
    },
    {
      index: 3,
      bbox: { x1: 325, y1: 350, x2: 415, y2: 750 },
      ageBucket: 'young_adult',
      gender: 'female',
      faceOrientation: 'toward_camera',
      expression: 'neutral',
      activity: ':: walking on the beach while taking a selfie',
      clothing: 'hat, bikini',
    },
    {
      index: 4,
      bbox: { x1: 615, y1: 328, x2: 900, y2: 818 },
      ageBucket: 'young_adult',
      gender: 'female',
      faceOrientation: 'away',
      expression: 'neutral',
      activity: ':: walking on the beach while carrying a bag',
      clothing: 'rainbow bikini, sandals',
    },
  ],
  objects: [
    { label: 'beach chair', bbox: { x1: 0, y1: 350, x2: 200, y2: 575 } },
    { label: 'umbrella', bbox: { x1: 260, y1: 260, x2: 325, y2: 375 } },
    { label: 'umbrella', bbox: { x1: 425, y1: 265, x2: 490, y2: 375 } },
    { label: 'handbag', bbox: { x1: 375, y1: 560, x2: 430, y2: 615 } },
    { label: 'handbag', bbox: { x1: 558, y1: 650, x2: 685, y2: 745 } },
    { label: 'handbag', bbox: { x1: 845, y1: 615, x2: 915, y2: 765 } },
    { label: 'sunglasses', bbox: { x1: 195, y1: 360, x2: 265, y2: 390 } },
    { label: 'sunglasses', bbox: { x1: 420, y1: 375, x2: 490, y2: 400 } },
    { label: 'phone', bbox: { x1: 355, y1: 385, x2: 385, y2: 415 } },
  ],
  text: [],
  tags: ['beach', 'women', 'bikini', 'sunny', 'vacation', 'friends', 'ocean', 'sand'],
  exposure: {
    verdict: 'correct',
    evAdjustment: 0,
    rationale: 'Bright, well-lit scene with no underexposed or overexposed areas.',
  },
  whiteBalance: {
    verdict: 'warm',
    kelvinShift: 100,
    rationale: 'Sunny beach scene with warm tones, slightly enhanced for vibrancy.',
  },
  contrast: 'high',
  composition: 'Subjects are centered with negative space on the right, creating a balanced and dynamic frame.',
  edits: [
    'Crop to remove distracting background elements.',
    'Increase saturation slightly for more vivid colors.',
  ],
  model: { endpointId: 'ec2-vision-qwen-2.5-vl', latencyMs: 27_650, tokensOut: 412 },
};

const streetCafe: VisionResult = {
  imageUrl:
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1024&q=80',
  imageWidth: 1024,
  imageHeight: 1024,
  caption: 'Three friends chat and enjoy drinks while sitting outside a cozy cafe.',
  setting: 'outdoor',
  location: 'cafe',
  timeOfDay: 'afternoon',
  mood: 'relaxed and friendly',
  colors: ['black', 'brown', 'beige'],
  people: [
    {
      index: 1,
      bbox: { x1: 28, y1: 266, x2: 338, y2: 997 },
      ageBucket: 'young_adult',
      gender: 'male',
      faceOrientation: 'toward_camera',
      expression: 'smiling',
      activity: ':: sitting and talking',
      clothing: 'beanie, denim jacket with shearling collar',
    },
    {
      index: 2,
      bbox: { x1: 320, y1: 330, x2: 560, y2: 997 },
      ageBucket: 'young_adult',
      gender: 'female',
      faceOrientation: 'toward_camera',
      expression: 'neutral',
      activity: ':: sitting and listening',
      clothing: 'black coat, turtleneck',
    },
    {
      index: 3,
      bbox: { x1: 638, y1: 271, x2: 898, y2: 997 },
      ageBucket: 'young_adult',
      gender: 'female',
      faceOrientation: 'profile_right',
      expression: 'smiling',
      activity: ':: sitting and gesturing while talking',
      clothing: 'black turtleneck, jeans',
    },
  ],
  objects: [
    { label: 'coffee cup', bbox: { x1: 703, y1: 699, x2: 770, y2: 786 } },
    { label: 'table', bbox: { x1: 28, y1: 865, x2: 300, y2: 997 } },
    { label: 'window', bbox: { x1: 175, y1: 0, x2: 997, y2: 838 } },
    { label: 'beverage', bbox: { x1: 220, y1: 828, x2: 288, y2: 888 } },
    { label: 'chair', bbox: { x1: 320, y1: 388, x2: 400, y2: 550 } },
    { label: 'plaid blanket', bbox: { x1: 863, y1: 340, x2: 997, y2: 838 } },
    { label: 'lamp', bbox: { x1: 607, y1: 221, x2: 666, y2: 292 } },
    { label: 'plate', bbox: { x1: 100, y1: 841, x2: 200, y2: 891 } },
  ],
  text: [],
  tags: ['friends', 'cafe', 'conversation', 'outdoor', 'coffee', 'relaxing'],
  exposure: {
    verdict: 'correct',
    evAdjustment: 0,
    rationale: 'Balanced lighting with no clipped highlights or shadows.',
  },
  whiteBalance: {
    verdict: 'warm',
    kelvinShift: 200,
    rationale: 'Warm tones enhance the cozy cafe ambiance.',
  },
  contrast: 'normal',
  composition: 'Three subjects arranged in a balanced triangle, with background depth adding context.',
  edits: [
    'Slightly increase saturation to enhance the warm tones.',
    'Crop to tighter frame to emphasize facial expressions.',
  ],
  model: { endpointId: 'ec2-vision-qwen-2.5-vl', latencyMs: 23_280, tokensOut: 387 },
};

const meta = {
  title: 'Pipelines/Vision/VisionResultViewer',
  component: VisionResultViewer,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof VisionResultViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MiamiBeach: Story = {
  args: { result: miamiBeach },
};

export const StreetCafe: Story = {
  args: { result: streetCafe },
};

export const NoImage: Story = {
  args: {
    result: { ...miamiBeach, imageUrl: undefined, imageDataUrl: undefined },
    showImage: false,
  },
};

export const CaptionOnly: Story = {
  args: {
    result: { caption: 'A cat sitting on a windowsill.', tags: ['cat', 'window'] },
  },
};

export const RawTextVisible: Story = {
  args: {
    result: {
      ...miamiBeach,
      rawText: `### miami_beach  ok=True  latency=27.65s  finish=stop
  CAPTION: Four women in colorful bikinis stroll along a sunny beach...
  setting=outdoor loc=beach tod=afternoon mood=relaxed and cheerful
  ...`,
    },
    showRawText: true,
  },
};

// Inline activity-log demo using the VisionResultViewer meta so we don't
// need to mix two component metas. Renders 4 stacked VisionRunCards
// (completed × 2, running, failed) — what a pipeline page's activity
// stream looks like with the `useVisionResults` hook.
export const ActivityLogExample: Story = {
  args: { result: miamiBeach },
  render: () => (
    <div className="flex max-w-md flex-col gap-2">
      <VisionRunCard status="completed" result={miamiBeach} runId="run-7a2b" />
      <VisionRunCard status="completed" result={streetCafe} runId="run-7a2c" />
      <VisionRunCard
        status="running"
        endpointLabel="ec2-vision-sam-large"
        runId="run-7a2d"
      />
      <VisionRunCard
        status="failed"
        endpointLabel="ec2-vision-llava"
        runId="run-7a2e"
        error="Endpoint unreachable: connection refused"
      />
    </div>
  ),
};
