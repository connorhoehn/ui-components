import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabPanel, type TabItem } from '../Tabs';

const ITEMS: TabItem[] = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta', badge: 3 },
  { id: 'c', label: 'Gamma', disabled: true },
  { id: 'd', label: 'Delta' },
];

function Controlled({ initial = 'a' }: { initial?: string }) {
  const [val, setVal] = useState(initial);
  return (
    <>
      <Tabs items={ITEMS} value={val} onValueChange={setVal} aria-label="Sample" idPrefix="t" />
      <TabPanel id="a" when={val} idPrefix="t">A content</TabPanel>
      <TabPanel id="b" when={val} idPrefix="t">B content</TabPanel>
      <TabPanel id="d" when={val} idPrefix="t">D content</TabPanel>
    </>
  );
}

describe('Tabs', () => {
  it('renders tablist with aria-label and one button per item', () => {
    render(<Tabs items={ITEMS} value="a" onValueChange={() => {}} aria-label="Demo" />);
    const list = screen.getByRole('tablist', { name: 'Demo' });
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(4);
  });

  it('marks the active tab aria-selected=true and others false', () => {
    render(<Tabs items={ITEMS} value="b" onValueChange={() => {}} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });

  it('fires onValueChange when a tab is clicked', () => {
    const onChange = vi.fn();
    render(<Tabs items={ITEMS} value="a" onValueChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: /Beta/ }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('does not fire onValueChange when a disabled tab is clicked', () => {
    const onChange = vi.fn();
    render(<Tabs items={ITEMS} value="a" onValueChange={onChange} />);
    const gamma = screen.getByRole('tab', { name: /Gamma/ });
    fireEvent.click(gamma);
    expect(onChange).not.toHaveBeenCalled();
    expect(gamma).toBeDisabled();
  });

  it('ArrowRight moves to the next enabled tab (skipping disabled)', () => {
    render(<Controlled initial="b" />);
    const beta = screen.getByRole('tab', { name: /Beta/ });
    beta.focus();
    fireEvent.keyDown(beta, { key: 'ArrowRight' });
    // 'c' is disabled — should land on 'd'
    expect(screen.getByRole('tab', { name: /Delta/ }).getAttribute('aria-selected')).toBe('true');
  });

  it('ArrowLeft wraps to the last enabled tab from the first', () => {
    render(<Controlled initial="a" />);
    const alpha = screen.getByRole('tab', { name: /Alpha/ });
    alpha.focus();
    fireEvent.keyDown(alpha, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: /Delta/ }).getAttribute('aria-selected')).toBe('true');
  });

  it('Home selects the first enabled tab, End selects the last', () => {
    render(<Controlled initial="b" />);
    const beta = screen.getByRole('tab', { name: /Beta/ });
    beta.focus();
    fireEvent.keyDown(beta, { key: 'End' });
    expect(screen.getByRole('tab', { name: /Delta/ }).getAttribute('aria-selected')).toBe('true');
    const delta = screen.getByRole('tab', { name: /Delta/ });
    fireEvent.keyDown(delta, { key: 'Home' });
    expect(screen.getByRole('tab', { name: /Alpha/ }).getAttribute('aria-selected')).toBe('true');
  });

  it('Enter activates the focused tab', () => {
    const onChange = vi.fn();
    render(<Tabs items={ITEMS} value="a" onValueChange={onChange} />);
    const beta = screen.getByRole('tab', { name: /Beta/ });
    fireEvent.keyDown(beta, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('renders the badge slot when provided', () => {
    render(<Tabs items={ITEMS} value="a" onValueChange={() => {}} />);
    const beta = screen.getByRole('tab', { name: /Beta/ });
    expect(beta.textContent).toContain('3');
  });

  it('sets tabIndex 0 on active tab and -1 on inactive', () => {
    render(<Tabs items={ITEMS} value="b" onValueChange={() => {}} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0].getAttribute('tabindex')).toBe('-1');
    expect(tabs[1].getAttribute('tabindex')).toBe('0');
  });

  it('omits data-testid when neither item.testId nor getItemTestId is provided', () => {
    render(<Tabs items={ITEMS} value="a" onValueChange={() => {}} />);
    for (const tab of screen.getAllByRole('tab')) {
      expect(tab.hasAttribute('data-testid')).toBe(false);
    }
  });

  it('renders item.testId as data-testid on that tab', () => {
    const items: TabItem[] = [
      { id: 'a', label: 'Alpha', testId: 'tab-alpha' },
      { id: 'b', label: 'Beta' },
    ];
    render(<Tabs items={items} value="a" onValueChange={() => {}} />);
    expect(screen.getByTestId('tab-alpha')).toBe(screen.getByRole('tab', { name: 'Alpha' }));
    expect(screen.getByRole('tab', { name: 'Beta' }).hasAttribute('data-testid')).toBe(false);
  });

  it('uses getItemTestId to derive a data-testid when item.testId is absent', () => {
    render(
      <Tabs
        items={ITEMS}
        value="a"
        onValueChange={() => {}}
        getItemTestId={(item) => `derived-${item.id}`}
      />,
    );
    expect(screen.getByTestId('derived-a')).toBe(screen.getByRole('tab', { name: 'Alpha' }));
    expect(screen.getByTestId('derived-b')).toBe(screen.getByRole('tab', { name: /Beta/ }));
  });

  it('prefers item.testId over getItemTestId when both are provided', () => {
    const items: TabItem[] = [{ id: 'a', label: 'Alpha', testId: 'explicit' }];
    render(
      <Tabs
        items={items}
        value="a"
        onValueChange={() => {}}
        getItemTestId={(item) => `derived-${item.id}`}
      />,
    );
    expect(screen.getByTestId('explicit')).toBeInTheDocument();
    expect(screen.queryByTestId('derived-a')).toBeNull();
  });
});

describe('TabPanel', () => {
  it('renders children when id matches `when`', () => {
    render(
      <>
        <TabPanel id="a" when="a" idPrefix="p">visible</TabPanel>
        <TabPanel id="b" when="a" idPrefix="p">hidden</TabPanel>
      </>,
    );
    expect(screen.queryByText('visible')).toBeInTheDocument();
    expect(screen.queryByText('hidden')).toBeNull();
  });

  it('wires aria-labelledby + id when idPrefix is provided', () => {
    render(<TabPanel id="x" when="x" idPrefix="t">content</TabPanel>);
    const panel = screen.getByRole('tabpanel');
    expect(panel.getAttribute('id')).toBe('t-panel-x');
    expect(panel.getAttribute('aria-labelledby')).toBe('t-tab-x');
  });

  it('sets data-testid matching the panel id pattern when idPrefix is provided', () => {
    render(<TabPanel id="x" when="x" idPrefix="t">content</TabPanel>);
    expect(screen.getByTestId('t-panel-x')).toBe(screen.getByRole('tabpanel'));
  });

  it('omits data-testid when idPrefix is not provided', () => {
    render(<TabPanel id="x" when="x">content</TabPanel>);
    expect(screen.getByRole('tabpanel').hasAttribute('data-testid')).toBe(false);
  });
});

describe('Tabs variants', () => {
  it.each<['underline' | 'pill' | 'segmented']>([['underline'], ['pill'], ['segmented']])(
    'renders the %s variant',
    (variant) => {
      render(<Tabs items={ITEMS} value="a" onValueChange={() => {}} variant={variant} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    },
  );
});
