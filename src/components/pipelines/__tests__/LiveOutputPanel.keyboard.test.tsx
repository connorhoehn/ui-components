import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, createEvent, act } from '@testing-library/react';
import LiveOutputPanel from '../LiveOutputPanel';
import {
  EventStreamProvider,
  useEventStreamContext,
} from '../context/EventStreamContext';

// REGRESSION: each step's section header is a `role="button"` div whose key
// handler fired on Enter or Space but never called preventDefault(). Space's
// browser default on a non-button is "scroll the scroll container", so
// pressing Space to collapse a step both collapsed it AND scrolled the log
// pane out from under the reader in one keystroke.

const RUN_ID = 'run-1';

/** Test-only escape hatch to push synthetic events into the stream. */
let dispatch: ReturnType<typeof useEventStreamContext>['dispatch'];

function CaptureDispatch() {
  dispatch = useEventStreamContext().dispatch;
  return null;
}

function renderPanel() {
  render(
    <EventStreamProvider>
      <CaptureDispatch />
      <LiveOutputPanel runId={RUN_ID} visible />
    </EventStreamProvider>,
  );

  act(() => {
    dispatch('pipeline.llm.stream.opened' as never, {
      runId: RUN_ID,
      stepId: 'step-a',
    } as never);
  });

  return screen.getByRole('button', { name: /step-a/ });
}

describe('LiveOutputPanel — step header keyboard activation', () => {
  it('collapses a step on Space', () => {
    const header = renderPanel();
    expect(header).toHaveTextContent('▼');

    fireEvent.keyDown(header, { key: ' ' });

    expect(header).toHaveTextContent('▶');
  });

  it('preventDefaults Space so the log pane does not also scroll', () => {
    const header = renderPanel();

    const event = createEvent.keyDown(header, { key: ' ' });
    fireEvent(header, event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('still collapses on Enter', () => {
    const header = renderPanel();
    fireEvent.keyDown(header, { key: 'Enter' });
    expect(header).toHaveTextContent('▶');
  });
});
