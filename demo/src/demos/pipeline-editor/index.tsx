// demo/src/demos/pipeline-editor/index.tsx
//
// The REAL pipeline editor, not a picture of one.
//
// This demo used to hand-roll its own <NodePalette> and <PipelineCanvas> over a
// `mockNodes` array. It looked like the editor but nothing worked — no React
// Flow, no editor context, so no dragging from the palette, no node selection,
// no config panel, no edge drawing. A static screenshot with a simulation
// driving the status pills.
//
// It now mounts `PipelineEditorPage`, the library's own frozen export, seeded
// with `createDemoPipeline` so there is something to open. Everything the
// editor can do works here because it IS the editor.

import { useMemo } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router';
import PipelineEditorPage from '@/components/pipelines/PipelineEditorPage';
import { PipelineEditorServicesProvider } from '@/components/pipelines/services/PipelineEditorServicesContext';
import { ToastProvider } from '@connorhoehn/ui-components/shared';
import { EventStreamProvider } from '@/components/pipelines/context/EventStreamContext';
import { PipelineRunsProvider } from '@/components/pipelines/context/PipelineRunsContext';
import {
  createDemoPipeline,
  listPipelines,
  savePipeline,
} from '@/components/pipelines/persistence/pipelineStorage';

/** The name `createDemoPipeline` gives its result — the reuse key below. */
const DEMO_PIPELINE_NAME = 'Document Summary Pipeline (Demo)';

/** Seed a demo pipeline once, then reuse it across visits. */
function useDemoPipelineId(): string {
  return useMemo(() => {
    // Match on the name createDemoPipeline actually produces. Matching on
    // anything else silently never hits, so every visit seeds another copy and
    // localStorage fills up with identical pipelines.
    const existing = listPipelines().find((p) => p.name === DEMO_PIPELINE_NAME);
    if (existing) return existing.id;
    const def = createDemoPipeline('demo-user');
    savePipeline(def);
    return def.id;
  }, []);
}

// The editor renders produced-image thumbnails via this seam. The demo has no
// image backend, so hand back a data URI placeholder rather than a broken src.
const DEMO_SERVICES = {
  getImageUrl: () =>
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">' +
        '<rect width="96" height="96" fill="#f1f5f9"/>' +
        '<text x="48" y="52" font-size="10" text-anchor="middle" fill="#64748b">no image</text>' +
        '</svg>',
    ),
};

function EditorAtId() {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  if (!pipelineId) return null;
  return <PipelineEditorPage />;
}

export default function PipelineEditorDemo() {
  const demoId = useDemoPipelineId();

  return (
    // The editor's node cards read live run state, so the runs + event-stream
    // providers are part of mounting it — the mockup needed none of this
    // because nothing in it was wired to anything.
    <ToastProvider>
      <PipelineEditorServicesProvider services={DEMO_SERVICES}>
      <EventStreamProvider>
        <PipelineRunsProvider>
          <Routes>
            <Route index element={<Navigate to={demoId} replace />} />
            <Route path=":pipelineId" element={<EditorAtId />} />
          </Routes>
        </PipelineRunsProvider>
      </EventStreamProvider>
      </PipelineEditorServicesProvider>
    </ToastProvider>
  );
}
