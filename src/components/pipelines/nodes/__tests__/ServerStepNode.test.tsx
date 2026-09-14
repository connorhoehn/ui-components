// src/components/pipelines/nodes/__tests__/ServerStepNode.test.tsx
//
// The card for a consumer-registered step kind. What it pins: the kind is
// legible on the face, and the card has the three ports a plain step has —
// React Flow's bare `default` card, which these kinds fell back to, has none,
// so every edge into or out of a server step failed to resolve.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import ServerStepNode, { serverStepNamespace, type ServerStepNodeData } from '../server-step/ServerStepNode';

type Props = NodeProps<Node<ServerStepNodeData, string>>;

function renderStep(data: ServerStepNodeData) {
  return render(
    <ReactFlowProvider>
      <ServerStepNode {...({ id: 'n1', data, selected: false } as unknown as Props)} />
    </ReactFlowProvider>,
  );
}

describe('ServerStepNode', () => {
  it('names the kind and the label on its face', () => {
    renderStep({ type: 'transcription:transcribe', label: 'Transcribe the audio' });
    expect(screen.getByText('transcription:transcribe')).toBeInTheDocument();
    expect(screen.getByTestId('server-step-label').textContent).toContain('Transcribe the audio');
  });

  it('reads the kind from nodeType when the data carries no type', () => {
    renderStep({ nodeType: 'recording:resolve' });
    expect(screen.getByTestId('server-step-label').textContent).toContain('recording:resolve');
  });

  it('has in, out and error ports', () => {
    const { container } = renderStep({ type: 'document:apply', label: 'Write it', optional: true });
    const ids = [...container.querySelectorAll('.react-flow__handle')].map((h) => h.getAttribute('data-handleid'));
    expect(ids).toEqual(['in', 'out', 'error']);
    expect(screen.getByTestId('server-step-label').textContent).toContain('(optional)');
  });

  it('serverStepNamespace splits on the first colon', () => {
    expect(serverStepNamespace('transcript:merge-reactions')).toBe('transcript');
    expect(serverStepNamespace('plain')).toBeUndefined();
  });
});
