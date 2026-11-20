import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Button } from '../../ui/Button';
import Chip from '../../shared/Chip';
import { HuddleBar } from '../HuddleBar';
import { fitByPriority } from '../priorityFit';

describe('fitByPriority', () => {
  const item = (id: string, width: number, priority: number, collapsible = true) => ({ id, width, priority, collapsible });

  it('keeps everything when the row fits', () => {
    expect(fitByPriority([item('a', 100, 1), item('b', 100, 2)], 208, 8, 30)).toEqual([]);
  });

  it('collapses the lowest priority first and counts the overflow control', () => {
    const items = [item('mic', 40, 0, false), item('chat', 100, 60), item('gear', 30, 5), item('end', 120, 80), item('leave', 80, 0, false)];
    // All five: 370 + 4 gaps of 8 = 402.
    expect(fitByPriority(items, 402, 8, 30)).toEqual([]);
    // One px short: the gear goes, and More (30) takes its place: 340 + 30 + 4 * 8 = 402 > 401, so chat goes too.
    expect(fitByPriority(items, 401, 8, 30)).toEqual(['chat', 'gear']);
    expect(fitByPriority(items, 200, 8, 30)).toEqual(['chat', 'gear', 'end']);
  });

  it('between equals the later item goes first, and pinned items never go', () => {
    const items = [item('raise', 50, 30), item('react', 50, 30), item('rooms', 50, 30), item('leave', 80, 0, false)];
    expect(fitByPriority(items, 234, 8, 30)).toEqual(['rooms']);
    expect(fitByPriority(items, 10, 8, 30)).toEqual(['raise', 'react', 'rooms']);
  });

  it('ignores items that draw nothing', () => {
    expect(fitByPriority([item('a', 0, 1), item('b', 100, 2)], 100, 8, 30)).toEqual([]);
    expect(fitByPriority([], -5, 8, 30)).toEqual([]);
  });
});

describe('HuddleBar overflow', () => {
  // jsdom has no layout: every control is 100px wide, the More control 30, and the bar as wide as the test says.
  let barWidth = 0;
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const width = this.dataset.barItem !== undefined ? (this.childElementCount ? 100 : 0) : this.querySelector('[data-testid="huddle-bar-more"]') && !this.dataset.testid ? 30 : 0;
      return { width, height: 0, top: 0, left: 0, right: width, bottom: 0, x: 0, y: 0, toJSON: () => ({}) } as DOMRect;
    });
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
      return this.dataset.testid === 'huddle-bar' ? barWidth : 0;
    });
  });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); });

  const bar = (onEnd = () => {}) => (
    <HuddleBar
      name="System design with Mateo" showContext={false}
      mic={{ on: true, onToggle: () => {} }} camera={{ on: true, onToggle: () => {} }}
      onToggleChat={() => {}} chatLabel="Message" onLeave={() => {}}
      actions={[
        { id: 'time', priority: 55, node: <Chip size="sm">60 min left</Chip>, fact: '60 min left' },
        { id: 'end', priority: 80, node: <Button size="sm">End interview</Button>, menu: { label: 'End interview', onSelect: onEnd } },
        { id: 'gear', priority: 5, node: <Button size="sm">Devices</Button>, menu: { label: 'Device settings' } },
        { id: 'pinned', node: <Button size="sm">Stay</Button> },
      ]}
    />
  );
  const collapsed = () => Array.from(document.querySelectorAll('[data-bar-item][data-collapsed]')).map((el) => (el as HTMLElement).dataset.barItem);

  it('keeps every control on the row when it fits, with no More control', () => {
    barWidth = 2000;
    render(bar());
    expect(collapsed()).toEqual([]);
    expect(screen.getByTestId('huddle-bar-more').closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it('moves the lowest-priority controls into the More menu and never the microphone, camera or Leave', () => {
    // mic, camera, chat, time, end, gear, pinned, leave = 800 + 7 gaps; 560 leaves room for five and More.
    barWidth = 560;
    const onEnd = vi.fn();
    render(bar(onEnd));
    expect(collapsed()).toEqual(['chat', 'action:time', 'action:gear']);
    for (const id of ['mic', 'camera', 'action:pinned', 'leave']) expect(collapsed()).not.toContain(id);
    fireEvent.click(screen.getByTestId('huddle-bar-more'));
    expect(screen.getByTestId('huddle-bar-more-facts')).toHaveTextContent('60 min left');
    expect(screen.getByTestId('huddle-bar-more-chat')).toHaveTextContent('Message');
    expect(screen.getByTestId('huddle-bar-more-gear')).toHaveTextContent('Device settings');
    expect(screen.queryByTestId('huddle-bar-more-end')).toBeNull();
  });

  it('runs a collapsed action from the menu', () => {
    barWidth = 400;
    const onEnd = vi.fn();
    render(bar(onEnd));
    expect(collapsed()).toContain('action:end');
    fireEvent.click(screen.getByTestId('huddle-bar-more'));
    fireEvent.click(screen.getByTestId('huddle-bar-more-end'));
    expect(onEnd).toHaveBeenCalledTimes(1);
  });
});
