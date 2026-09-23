// One star field per region, and the working cue for a composer that stands
// alone. A composer inside a console column must not start a second GL field
// on top of the column's; a composer in an editor's dock has no column, so it
// carries the "an agent is working" density itself.
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type ComposerMode } from '../RichChatComposer';
import { ChatColumnBackdrop } from '../ChatColumnBackdrop';
import { installAnimationFrames, installWebGLStub, setReducedMotion } from '../../shared/__tests__/webglStub';

let webgl: ReturnType<typeof installWebGLStub> | null = null;
let frames: ReturnType<typeof installAnimationFrames>;

beforeEach(() => {
  setReducedMotion(false);
  frames = installAnimationFrames();
  webgl = installWebGLStub();
});
afterEach(() => {
  cleanup();
  webgl?.restore();
  webgl = null;
  frames.restore();
  setReducedMotion(false);
});

const root = () => screen.getByTestId('composer');
const composer = (props: { working?: boolean; mode?: ComposerMode; collapseWhenIdle?: boolean } = {}) => (
  <RichChatComposer
    onSend={vi.fn()}
    data-testid="composer"
    mode={props.mode ?? 'agent'}
    onModeChange={vi.fn()}
    backdropTone="graphite"
    {...(props.working === undefined ? {} : { working: props.working })}
    {...(props.collapseWhenIdle ? { collapseWhenIdle: true } : {})}
  />
);
/** Points in the cloud uploaded to the GPU: the position buffer is xyz per point. */
const uploadedPoints = () => (webgl!.latest()!.buffers[0]?.length ?? 0) / 3;

describe('one field per region', () => {
  it('a standalone composer in Agent paints its own sky', () => {
    render(composer());
    expect(root()).toHaveAttribute('data-console-sky', 'own');
    expect(screen.getByTestId('composer-console-backdrop')).toBeInTheDocument();
    expect(document.querySelectorAll('canvas')).toHaveLength(1);
  });

  it('inside a console column it keeps its tint and border but draws no field of its own', () => {
    render(
      <ChatColumnBackdrop mode="agent" tone="graphite">
        {composer()}
      </ChatColumnBackdrop>,
    );
    expect(root()).toHaveAttribute('data-console-sky', 'inherited');
    // Still the console surface: dark ink, console tokens, a tint to sit on.
    expect(root()).toHaveAttribute('data-console', 'true');
    expect(root().className).toContain('uic-chat-console');
    expect(root().className).toContain('bg-surface-inset');
    // The column's field is the only one: one canvas in the whole region.
    expect(screen.getByTestId('chat-column-backdrop-particles-backdrop')).toBeInTheDocument();
    expect(screen.queryByTestId('composer-console-backdrop')).not.toBeInTheDocument();
    expect(document.querySelectorAll('canvas')).toHaveLength(1);
  });

  it('a column in chat mode is not painting, so an Agent composer inside it paints its own', () => {
    render(
      <ChatColumnBackdrop mode="chat" tone="graphite">
        {composer()}
      </ChatColumnBackdrop>,
    );
    expect(root()).toHaveAttribute('data-console-sky', 'own');
    expect(screen.getByTestId('composer-console-backdrop')).toBeInTheDocument();
  });

  it('in Chat mode there is no sky to own or inherit', () => {
    render(
      <ChatColumnBackdrop mode="agent" tone="graphite">
        {composer({ mode: 'chat' })}
      </ChatColumnBackdrop>,
    );
    expect(root()).not.toHaveAttribute('data-console-sky');
    expect(root().className).not.toContain('bg-surface-inset');
  });
});

describe('working', () => {
  it('a standalone composer gets the denser field while working', () => {
    const { rerender } = render(composer());
    expect(root()).not.toHaveAttribute('data-working');
    expect(uploadedPoints()).toBe(120);

    rerender(composer({ working: true }));
    expect(root()).toHaveAttribute('data-working', 'true');
    expect(uploadedPoints()).toBe(180);
  });

  it('follows the enclosing column’s working state when the host does not pass it', () => {
    render(
      <ChatColumnBackdrop mode="agent" tone="graphite" working>
        {composer()}
      </ChatColumnBackdrop>,
    );
    expect(root()).toHaveAttribute('data-working', 'true');
    // Still one field: the column's, at its working density.
    expect(screen.queryByTestId('composer-console-backdrop')).not.toBeInTheDocument();
    expect(screen.getByTestId('chat-column-backdrop')).toHaveAttribute('data-working', 'true');
  });

  it('an explicit prop wins over the column', () => {
    render(
      <ChatColumnBackdrop mode="agent" tone="graphite" working>
        {composer({ working: false })}
      </ChatColumnBackdrop>,
    );
    expect(root()).not.toHaveAttribute('data-working');
  });

  it('reduced motion: the working field arrives but holds still', () => {
    setReducedMotion(true);
    render(composer({ working: true }));
    expect(screen.getByTestId('composer-console-backdrop')).toHaveAttribute('data-motion', 'static');
    expect(frames.pending).toHaveLength(0);
  });
});

// 2.376.0: the one-row idle composer wears the surface it sits on. A dark pill
// at the foot of a light editor read as an embedded frame; the console sky
// arrives with the caret.
describe('the idle row and the console', () => {
  const input = () => document.querySelector('[data-testid=composer] .ProseMirror') as HTMLElement;

  it('idle in Agent it is plain; the sky comes with the caret', async () => {
    render(composer({ collapseWhenIdle: true }));
    expect(root()).toHaveAttribute('data-collapsed', 'true');
    expect(root()).not.toHaveAttribute('data-console');
    expect(root()).not.toHaveAttribute('data-theme');
    expect(root().className).not.toContain('uic-chat-console');
    expect(screen.queryByTestId('composer-console-backdrop')).not.toBeInTheDocument();
    await act(async () => { input().focus(); fireEvent.focusIn(input()); });
    expect(root()).toHaveAttribute('data-collapsed', 'false');
    expect(root()).toHaveAttribute('data-console', 'true');
    expect(root()).toHaveAttribute('data-console-sky', 'own');
    expect(screen.getByTestId('composer-console-backdrop')).toBeInTheDocument();
  });

  it('inside a column that is painting its sky, the idle row keeps the inherited tint', () => {
    render(
      <ChatColumnBackdrop mode="agent" tone="graphite">
        {composer({ collapseWhenIdle: true })}
      </ChatColumnBackdrop>,
    );
    expect(root()).toHaveAttribute('data-collapsed', 'true');
    expect(root()).toHaveAttribute('data-console', 'true');
    expect(root()).toHaveAttribute('data-console-sky', 'inherited');
    expect(root().className).toContain('bg-surface-inset');
  });
});
