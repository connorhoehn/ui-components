// `useRetryFromStep` returns a no-op outside a run provider, so a component
// that used it rendered a live-looking Retry button that did nothing.
// `useRetryFromStepIfWired` returns `undefined` there instead, so the caller
// can hide the control — but it was internal, and hosts reached for the other
// one and shipped exactly that dead button.

import { describe, expect, it } from 'vitest';
import * as pipelines from '../index';

describe('pipelines entrypoint', () => {
  it('exports useRetryFromStepIfWired alongside useRetryFromStep', () => {
    expect(typeof pipelines.useRetryFromStepIfWired).toBe('function');
    expect(typeof pipelines.useRetryFromStep).toBe('function');
  });
});
