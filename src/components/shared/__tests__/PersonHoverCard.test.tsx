import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PersonHoverCard } from '../PersonHoverCard';

// The two delays are the whole component. Get them wrong and the card either
// flickers open every time the pointer crosses a name, or cannot be reached
// because it dismisses while you travel toward it.

const PERSON = {
  displayName: 'Nora DaSilva',
  title: 'Staff Engineer',
  email: 'nora@example.com',
  online: true,
};

function setup(props = {}) {
  return render(
    <PersonHoverCard person={PERSON} actions={<button>Message</button>} {...props}>
      Nora DaSilva
    </PersonHoverCard>,
  );
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  vi.useRealTimers();
  cleanup();
});

const trigger = () => screen.getByTestId('person-hover-card-trigger');
const card = () => screen.queryByTestId('person-hover-card');

describe('PersonHoverCard', () => {
  it('does not open while the pointer is merely passing over the name', () => {
    setup();
    fireEvent.mouseEnter(trigger());
    act(() => { vi.advanceTimersByTime(200); });
    fireEvent.mouseLeave(trigger());
    act(() => { vi.advanceTimersByTime(1000); });
    expect(card()).toBeNull();
  });

  it('opens once the pointer settles', () => {
    setup();
    fireEvent.mouseEnter(trigger());
    act(() => { vi.advanceTimersByTime(500); });
    expect(card()).not.toBeNull();
    expect(screen.getByText('Staff Engineer')).toBeInTheDocument();
  });

  // The bug this component exists to avoid: leaving the name starts a close,
  // and arriving in the panel has to cancel it or nothing inside is clickable.
  it('survives the trip from the name into the card', () => {
    setup();
    fireEvent.mouseEnter(trigger());
    act(() => { vi.advanceTimersByTime(500); });

    fireEvent.mouseLeave(trigger());
    act(() => { vi.advanceTimersByTime(100); });   // mid-travel
    fireEvent.mouseEnter(card()!.querySelector('div')!);
    act(() => { vi.advanceTimersByTime(1000); });

    expect(card()).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Message' })).toBeInTheDocument();
  });

  it('closes after leaving the card', () => {
    setup();
    fireEvent.mouseEnter(trigger());
    act(() => { vi.advanceTimersByTime(500); });
    fireEvent.mouseLeave(trigger());
    act(() => { vi.advanceTimersByTime(500); });
    expect(card()).toBeNull();
  });

  // Hover-only would strand keyboard and touch users on a control carrying
  // someone's contact actions.
  it('opens on focus, without any pointer', () => {
    setup();
    fireEvent.focus(trigger());
    expect(card()).not.toBeNull();
  });

  it('announces itself as an expandable dialog trigger', () => {
    setup();
    expect(trigger()).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    fireEvent.focus(trigger());
    expect(trigger()).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders the details slot between identity and actions', () => {
    render(
      <PersonHoverCard
        person={{ displayName: 'Nora DaSilva' }}
        details={<span>Kubernetes · Observability</span>}
        actions={<button type="button">Open</button>}
      >
        Nora DaSilva
      </PersonHoverCard>,
    );
    fireEvent.focus(screen.getByTestId('person-hover-card-trigger'));
    expect(screen.getByText('Kubernetes · Observability')).toBeInTheDocument();
  });

  it('drops the button role when the child is itself interactive', () => {
    // A link inside a role=button span is two nested activation targets;
    // assistive tech announces one confused control and Enter stops
    // following the link.
    render(
      <PersonHoverCard person={{ displayName: 'Nora DaSilva' }} interactiveChild>
        <a href="/people/nora">Nora DaSilva</a>
      </PersonHoverCard>,
    );
    const trigger = screen.getByTestId('person-hover-card-trigger');
    expect(trigger).not.toHaveAttribute('role', 'button');
    expect(trigger).not.toHaveAttribute('tabindex');
    expect(screen.getByRole('link', { name: 'Nora DaSilva' })).toBeInTheDocument();
  });

  it('still opens when the interactive child takes focus', () => {
    render(
      <PersonHoverCard
        person={{ displayName: 'Nora DaSilva', title: 'Staff SRE' }}
        interactiveChild
        openDelay={0}
      >
        <a href="/people/nora">Nora DaSilva</a>
      </PersonHoverCard>,
    );
    // Focus BUBBLES to the wrapper, so tabbing to the link opens the card —
    // which is the only way a keyboard user reaches it once the wrapper has
    // given up its own tab stop to the child.
    fireEvent.focusIn(screen.getByRole('link', { name: 'Nora DaSilva' }));
    expect(screen.getByText('Staff SRE')).toBeInTheDocument();
  });

  it('keeps the button role by default so the card stays keyboard-reachable', () => {
    render(<PersonHoverCard person={{ displayName: 'Nora DaSilva' }}>Nora DaSilva</PersonHoverCard>);
    const trigger = screen.getByTestId('person-hover-card-trigger');
    expect(trigger).toHaveAttribute('role', 'button');
    expect(trigger).toHaveAttribute('tabindex', '0');
  });
});