// Context-value stability — render-count regression guards.
//
// A provider that builds its `value` inline (`value={{ a, b }}`) hands every
// consumer a brand-new object on every provider render, so EVERY consumer
// re-renders even when nothing it reads actually changed. Context propagation
// bypasses `React.memo`, so a memoised consumer is no defence.
//
// Each test below renders a `React.memo`-wrapped consumer under a host that
// owns unrelated state. Bumping the host's state re-renders the provider but
// changes nothing in the context value; the memo means the consumer would only
// re-render if the context value identity changed. So the render count is a
// direct measurement of value stability.

import { memo, useState } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ColorSchemeProvider, useColorScheme } from '../ThemeContext';
import { AgentsProvider, useAgentsContext } from '../../components/agents/context/AgentsContext';

describe('ColorSchemeProvider value identity', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('does not re-render consumers when an unrelated ancestor re-renders', () => {
    let consumerRenders = 0;

    const Consumer = memo(function Consumer() {
      consumerRenders += 1;
      const { theme } = useColorScheme();
      return <span data-testid="theme">{theme}</span>;
    });

    function Host() {
      const [tick, setTick] = useState(0);
      return (
        <ColorSchemeProvider>
          <button onClick={() => setTick((t) => t + 1)}>tick:{tick}</button>
          <Consumer />
        </ColorSchemeProvider>
      );
    }

    render(<Host />);
    expect(consumerRenders).toBe(1);

    // Five unrelated host re-renders. The theme never changes, so a stable
    // context value means the memoised consumer never re-renders.
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByText(`tick:${i}`));
    }
    expect(screen.getByText('tick:5')).toBeInTheDocument();
    expect(consumerRenders).toBe(1);
  });

  it('still re-renders consumers when the theme actually changes', () => {
    let consumerRenders = 0;

    const Consumer = memo(function Consumer() {
      consumerRenders += 1;
      const { theme, toggleTheme } = useColorScheme();
      return <button onClick={toggleTheme}>theme:{theme}</button>;
    });

    render(<ColorSchemeProvider><Consumer /></ColorSchemeProvider>);
    expect(consumerRenders).toBe(1);

    fireEvent.click(screen.getByText('theme:light'));
    expect(screen.getByText('theme:dark')).toBeInTheDocument();
    expect(consumerRenders).toBe(2);
  });
});

describe('AgentsProvider value identity', () => {
  it('does not re-render consumers when an unrelated ancestor re-renders', () => {
    let consumerRenders = 0;

    const Consumer = memo(function Consumer() {
      consumerRenders += 1;
      const { agents } = useAgentsContext();
      return <span data-testid="count">{agents.length}</span>;
    });

    function Host() {
      const [tick, setTick] = useState(0);
      return (
        <AgentsProvider>
          <button onClick={() => setTick((t) => t + 1)}>tick:{tick}</button>
          <Consumer />
        </AgentsProvider>
      );
    }

    render(<Host />);
    expect(consumerRenders).toBe(1);
    expect(Number(screen.getByTestId('count').textContent)).toBeGreaterThan(0);

    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByText(`tick:${i}`));
    }
    expect(screen.getByText('tick:5')).toBeInTheDocument();
    expect(consumerRenders).toBe(1);
  });

  it('still re-renders consumers when the selection actually changes', () => {
    let consumerRenders = 0;
    let select: ((id: string | null) => void) | null = null;

    const Consumer = memo(function Consumer() {
      consumerRenders += 1;
      const { selectedAgentId, selectAgent } = useAgentsContext();
      select = selectAgent;
      return <span data-testid="sel">{selectedAgentId ?? 'none'}</span>;
    });

    render(<AgentsProvider><Consumer /></AgentsProvider>);
    expect(consumerRenders).toBe(1);
    expect(screen.getByTestId('sel')).toHaveTextContent('none');

    act(() => { select?.('agent-1'); });
    expect(screen.getByTestId('sel')).toHaveTextContent('agent-1');
    expect(consumerRenders).toBe(2);
  });
});
